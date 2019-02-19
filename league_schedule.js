const cheerio = require('cheerio');
const http = require('http');
const fs = require('fs');

const testing = true;
const SOCCER_ETHIOPIA_LEAGUE_SCHEDULE_URL = "http://www.soccerethiopia.net/ethpl-2011";

exports.getAllLeagueSchedule = function () {

};

/**
 * if (testing) -> read from offline file
 * @return {string}
 * @api Public
 */
function readScheduleFromFile () {
    const fx = require('fs');
    try {
        return fx.readFileSync('./dummy_schedule.html', 'utf-8');
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