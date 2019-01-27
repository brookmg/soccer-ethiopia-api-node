// DON'T JUDGE 
const cheerio = require('cheerio');
const http = require('http');

const SOCCER_ETHIOPIA_CLUB_STANDING_URL = "http://www.soccerethiopia.net/football/table/2018-19-premier-league-standing";

function getLatestClubStandingData(response) {
    let $ = cheerio.load(response);
    let returnable = [];
    $('.sp-league-table').each(function (i, element) {
        element.children.forEach(function (e, i , arr) {
            console.log("item " + i, e.innerHTML);
        });

        console.log('\n')
    });

    //    .each(function (i, e){
    //    console.log(e.text())
    //    // e('tr').each(function (i , e) {
    //     //     if (i > 0) {    //the first element is just the header
    //     //         e('td').each(function (i , e) {
    //     //             returnable.push({i: i, obj: e});
    //     //         })
    //     //     }
    //     // })
    // });

}