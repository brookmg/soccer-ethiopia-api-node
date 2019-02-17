const cheerio = require('cheerio');
const http = require('http');

const testing = false;
const SOCCER_ETHIOPIA_CLUB_STANDING_URL = "http://www.soccerethiopia.net/football/table/2018-19-premier-league-standing";

/**
 * A function to process the data from the website. The returned array of object will be similar to
 * <pre>
 * [{
 *      team_name: 'ኢትዮጵያ ቡና',
 *      team_logo: 'http://www.soccerethiopia.net/wp-content/uploads/2016/02/Bunna-128x128.png',
 *      rank: '3',
 *      played: '6',
 *      won: '3',
 *      draw: '2',
 *      lost: '1',
 *      goal_scored: '6',
 *      goal_received: '3',
 *      diff: '3',
 *      points: '11'
 * }]
 * </pre>
 * @param response {String} - row data from the website
 * @return {Array} - of objects with the required fields
 * @api Public
 */
function getLatestClubStandingData(response) {
    let $ = cheerio.load(response);
    let returnable = [];
    let singleRow = Object.create(null);
    let tables = $('.sp-league-table');
    let rows = tables.find('tr');

    for (let i = 0; i < rows.length; i++) {
        let thisRow = rows.toArray()[i];
        if (thisRow.children[1].children[0].children) {
            Object.assign(singleRow,
                {
                    team_name: thisRow.children[1].children[0].children[1].data,
                    team_logo: thisRow.children[1].children[0].children[0].children[0].attribs['src'],
                    rank: thisRow.children[0].children[0].data,
                    played: thisRow.children[2].children[0].data,
                    won: thisRow.children[3].children[0].data,
                    draw: thisRow.children[4].children[0].data,
                    lost: thisRow.children[5].children[0].data,
                    goal_scored: thisRow.children[6].children[0].data,
                    goal_received: thisRow.children[7].children[0].data,
                    diff: thisRow.children[8].children[0].data,
                    points: thisRow.children[9].children[0].data,
                });
            returnable.push(singleRow);
            singleRow = Object.create(null);
        }

    }

    return returnable;
}

/**
 * @return {string}
 * @api Public
 */
function readStandingDataFromFile () {
    const fx = require('fs');
    try {
        return fx.readFileSync('./dummy_file.html', 'utf-8');
    } catch (e) {
        console.error("file_" , e);
        return ""
    }
}

async function readStandingDataFromWeb () {
    return new Promise(resolve => http.get(SOCCER_ETHIOPIA_CLUB_STANDING_URL, res => {
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

/**
 * Entry point for team_standing api
 * @return {Array}
 */
exports.getTeamStandingData = async function () {
    if (testing)
        return new Promise(resolve => resolve(getLatestClubStandingData(readStandingDataFromFile()))).catch(e => console.error(e));
    else {
        return readStandingDataFromWeb().then(data => getLatestClubStandingData(data)).catch(err => console.log(err));
    }
};

/**
 * Entry point for team_standing api
 * @return {string} - json array from the array returned by `getTeamStandingData`
 */
exports.getTeamStandingDataJson = async function () {
    return JSON.stringify(await this.getTeamStandingData());
};
