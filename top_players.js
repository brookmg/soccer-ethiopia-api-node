const cheerio = require('cheerio');
const http = require('http');

const testing = false;
const SOCCER_ETHIOPIA_TOP_PLAYERS_URL = "http://www.soccerethiopia.net/ethpl-2012";

/**
 * A function to process the data from the website. The returned array of object will be similar to
 * [{
 *      "player" : "ሙጂብ ቃሲም",
 *      "team" : "ፋሲል ከነማ",
 *      "goals" : "9",
 *      "place" : "1"
 * }]
 * @param response from the website
 * @return {Array} - of objects containing detail about the top players
 */
function getTopPlayersData(response) {
    let returnable = []
    let $ = cheerio.load(response);

    let tables = $("table")
    tables.each((i, e) => {
        let strongTags = $('strong' , e)
        let thisIsTheOne = false;

        strongTags.each((sI , sE) => {
            if($(sE).text() === 'ጎል አስቆጣሪዎች') {
                thisIsTheOne = true;
            }
        })

        // now get the contents and work with them
        if (thisIsTheOne) {
            let trs = $('tr' , e)
            let place = 1;

            trs.each((tI , tE) => {
                let tds = $('td' , tE)
                if (tds.length == 3) {
                    // 1st is the name of the player
                    // 2nd is the club
                    // 3rd is the goals

                    if ($(tds.get(0)).text() == 'ተጫዋች') return;

                    let playerItem = {
                        player: $(tds.get(0)).text(),
                        team: $(tds.get(1)).text(),
                        goals: $(tds.get(2)).text(),
                        place: place++
                    }

                    returnable.push(playerItem)
                }
            })
        }
    })


    return returnable
}

/**
 * if (testing) -> read from offline file
 * @return {string}
 * @api Public
 */
function readTopPlayersFromFile () {
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
async function readTopPlayersFromWeb () {
    return new Promise(resolve => http.get(SOCCER_ETHIOPIA_TOP_PLAYERS_URL, res => {
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
 * Entry point to the api
 * @return {Array} 
 */
exports.getTopPlayersList = async function() {
    if (testing) {
        return new Promise(resolve => resolve(getTopPlayersData(readTopPlayersFromFile())));
    } else {
        return readTopPlayersFromWeb().then(data => getTopPlayersData(data));
    }
}

/**
 * Entry point to the api
 * @return {String} json
 */
exports.getTopPlayersListJSON = async function() {
    return JSON.stringify(await this.getTopPlayersList())
}