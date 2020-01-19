const cheerio = require('cheerio');
const http = require('http');

const testing = false;
const SOCCER_ETHIOPIA_LEAGUE_SCHEDULE_URL = "http://www.soccerethiopia.net/ethpl-2012";
const GameStatus = {STATUS_TOOK_PLACE: 0, STATUS_CANCELLED: 1, STATUS_POSTPONED: 2, STATUS_NORMAL: 3};
exports.GameStatus = GameStatus;

/**
 * Entry point for league_schedule api
 * @return {Array}
 */
exports.getAllLeagueSchedule = async function () {
    if (testing) {
        return new Promise(resolve => resolve(getScheduleData(readScheduleFromFile())));
    } else {
        return readScheduleFromWeb().then(data => getScheduleData(data));
    }
};

/**
 * Entry point for league_schedule api
 * @return {string} - json
 */
exports.getAllLeagueScheduleJSON = async function () {
    return JSON.stringify(await this.getAllLeagueSchedule());
};

function isItScheduleRelatedTable($, table, parent) {
    var tds = $("td", table);
    parent = tds.parent()
    var result = cheerio.load(tds[0]).text().includes("ሳምንት") &&
        (!parent.hasClass("textwidget"));
    return result;
}

/**
 * Returns all the content found in tables with class '.tablepress-id-006', repeated or not
 * @param response
 * @return {Array}
 */
function getBaseScheduleData (response, thisWeekOnly = false) {
    let $ = cheerio.load(response);
    let returnable = [];
    let tables = $("table");
    let i = 0;

    // rewrite this function with .each method in cheerio
    tables.each( (i , e) => {
        if (!isItScheduleRelatedTable($, e)) return;

        if (thisWeekOnly && $(e).parent().get(0).attribs['class'] === 'read_div') return; 

        const rows = $('tr' , e);
        let currentGameDate = "";

        rows.each( (ir , row ) => {
            const tds = $('td' , row);
            let team_one = Object.create(null);
            let team_two = Object.create(null);
            let game_status = GameStatus.STATUS_NORMAL;
            let game_time = "";
            if (tds.length === 1) currentGameDate = tds.text();
            else if (tds.length === 3) {
                const td0 = cheerio.load(tds[0]);
                const td1 = cheerio.load(tds[1]);
                const td2 = cheerio.load(tds[2]);

                let t1 = {name: td0.text()};
                let t2 = {name: td2.text()};
                game_status = getGameStatus(td1.text());

                if (game_status === GameStatus.STATUS_NORMAL) {
                    t1.score = 0;
                    t2.score = 0;
                    game_time = td1.text();
                } else if (game_status === GameStatus.STATUS_TOOK_PLACE) {
                    t1.score = td1.text().split("-")[0];
                    t2.score = td1.text().split("-")[1];
                } else {    //maybe if postponed
                    game_time = td1.text();
                }

                team_one = t1;
                team_two = t2;
            }

            if (!Number.isInteger(Number.parseInt(currentGameDate[0])) && team_one.name !== undefined) {
                let singleScheduleItem = {
                    team_one: team_one,
                    team_two: team_two,
                    game_time: game_time,
                    game_status: game_status,
                    week: i + 1,
                    game_date: currentGameDate
                };
                returnable.push(singleScheduleItem);
            }
        })

    });

    return returnable;
}

/**
 * A function to process the data from the website. The returned array of object will be similar to
 * [{
 *      team_one: {name: "ሲዳማ ቡና",score: 0},
 *      team_two: {name: "ፋሲል ከነማ",score: 0},
 *      game_time: "09:00",
 *      game_status: 0,
 *      week: 1,
 *      game_date: "ቅዳሜ ጥቅምት 17 ቀን 2011",
 * }]
 * @param response from the website
 * @return {Array} - of objects containing detail about each game
 */
function getScheduleData (response) {
    return getBaseScheduleData(response).filter(function (item, i) {
        return (item.week !== 16);  //the last table is repeated
    });
}

/**
 * Entry point for league_schedule api (this week's schedule)
 * @return {Array}
 */
exports.getThisWeekLeagueSchedule = async () => {
    if (testing) {
        return new Promise(resolve => resolve(getThisWeekScheduleData(readScheduleFromFile())));
    } else {
        return readScheduleFromWeb().then(response => getThisWeekScheduleData(response));
    }
};

/**
 * Entry point for league_schedule api (this week's schedule)
 * @return {string} - json
 */
exports.getThisWeekLeagueScheduleJSON = async function () {
    return JSON.stringify(await this.getThisWeekLeagueSchedule());
};

/**
 * A function to process the data from the website. The returned array of object will be similar to
 * [{
 *      team_one: {name: "ሲዳማ ቡና",score: 0},
 *      team_two: {name: "ፋሲል ከነማ",score: 0},
 *      game_time: "09:00",
 *      game_status: 0,
 *      week: 1,
 *      game_date: "ቅዳሜ ጥቅምት 17 ቀን 2011",
 * }]
 * @param response from the website
 * @return {Array} - of objects containing detail about each game
 */
function getThisWeekScheduleData(response) {
    let mainList = getBaseScheduleData(response, true);
    // clean up repeated entries

    mainList = mainList.filter(function (item, index, self) {
        return index === self.findIndex(
            (t) => (
                t.team_one.name === item.team_one.name &&
                t.team_two.name === item.team_two.name &&
                t.game_date === item.game_date
            )
        );
    });

    let thisWeek = mainList.filter( item => true );

    for (let i = 0; i < thisWeek.length; i++) {
        if (mainList[i].team_one.name === thisWeek[0].team_one.name && mainList[i].team_two.name === thisWeek[0].team_two.name) {
            thisWeek.forEach(item => item.week = mainList[i].week); //change the week property for all the items in thisWeek array
            break;
        }
    }

    return thisWeek;
}

/**
 * A function to get status of the game given the string between the names of the teams
 * @param inBetweenData - string located between the two teams
 * @return {number} - numbers located in GameStatus
 */
function getGameStatus (inBetweenData) {
    if (inBetweenData.indexOf("PP") > -1) return GameStatus.STATUS_POSTPONED;
    else if (inBetweenData.indexOf("-") > -1) return GameStatus.STATUS_TOOK_PLACE;
    else return GameStatus.STATUS_NORMAL;
}

/**
 * if (testing) -> read from offline file
 * @return {string}
 * @api Public
 */
function readScheduleFromFile () {
    const fx = require('fs');
    try {
        return fx.readFileSync('./ethpl_2012.html', 'utf-8');
    } catch (e) {
        console.error("file_" , e);
        return ""
    }
}

/**
 * if (!testing) -> read data from website
 * @return {Promise<String>}
 */
async function readScheduleFromWeb () {
    return new Promise(resolve => http.get(SOCCER_ETHIOPIA_LEAGUE_SCHEDULE_URL, res => {
        let data = "";
        res.on("error", err => {
            resolve(err.reason);
        });

        res.on('data', d => {
            data += d;
        });

        res.on("end" , () => {
            resolve(data);
        })
    })).catch(err => console.log(err));
}