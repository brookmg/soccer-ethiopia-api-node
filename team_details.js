const cheerio = require('cheerio');
const http = require('https');

const testing = false;

const teams = [
    {
        id: 0,
        teamLink: 'https://www.soccerethiopia.net/football/team/ethiopia-bunna',
        teamName: 'ኢትዮጵያ ቡና',
        teamLogo: 'https://www.soccerethiopia.net/wp-content/uploads/2016/02/Bunna-128x128.png',
        teamStartedOn: -1,
        teamCapital: ''  
    }, 
    {
        id: 1,
        teamLink: 'https://www.soccerethiopia.net/football/team/kidus-giorgis',
        teamName: 'ቅዱስ ጊዮርጊስ',
        teamLogo: 'https://www.soccerethiopia.net/wp-content/uploads/2015/10/KG-128x128.png',
        teamStartedOn: -1,
        teamCapital: ''  
    }, 
    {
        id: 2,
        teamLink: 'https://www.soccerethiopia.net/football/team/hawassa-ketema',
        teamName: 'ሀዋሳ ከተማ',
        teamLogo: 'https://www.soccerethiopia.net/wp-content/uploads/2016/05/Hawassa-128x128.png',
        teamStartedOn: -1,
        teamCapital: ''  
    }, 
    {
        id: 3,
        teamLink: 'https://www.soccerethiopia.net/football/team/sidama-bunna',
        teamName: 'ሲዳማ ቡና',
        teamLogo: 'https://www.soccerethiopia.net/wp-content/uploads/2016/05/Sidama-128x128.png',
        teamStartedOn: -1,
        teamCapital: ''  
    }, 
    {
        id: 4,
        teamLink: 'https://www.soccerethiopia.net/football/team/wolwalo-au',
        teamName: 'ወልዋሎ ዓ.ዩ.',
        teamLogo: 'https://www.soccerethiopia.net/wp-content/uploads/2016/11/Welwalo-128x128.png',
        teamStartedOn: -1,
        teamCapital: ''  
    }, 
    {
        id: 5,
        teamLink: 'https://www.soccerethiopia.net/football/team/fasil-kenema',
        teamName: 'ፋሲል ከነማ',
        teamLogo: 'https://www.soccerethiopia.net/wp-content/uploads/2016/05/Fasil-128x128.png',
        teamStartedOn: -1,
        teamCapital: ''  
    }, 
    {
        id: 6,
        teamLink: 'https://www.soccerethiopia.net/football/team/bahir-dar',
        teamName: 'ባህር ዳር ከተማ',
        teamLogo: 'https://www.soccerethiopia.net/wp-content/uploads/2016/11/BDK-123x128.png',
        teamStartedOn: -1,
        teamCapital: ''  
    }, 
    {
        id: 7,
        teamLink: 'https://www.soccerethiopia.net/football/team/mekelle-70-enderta',
        teamName: 'መቐለ 70 እንደርታ',
        teamLogo: 'https://www.soccerethiopia.net/wp-content/uploads/2016/11/MK-105x128.png',
        teamStartedOn: -1,
        teamCapital: ''  
    }, 
    {
        id: 8,
        teamLink: 'https://www.soccerethiopia.net/football/team/adama-ketema',
        teamName: 'አዳማ ከተማ',
        teamLogo: 'https://www.soccerethiopia.net/wp-content/uploads/2016/05/Adama-1-128x128.png',
        teamStartedOn: -1,
        teamCapital: ''  
    }, 
    {
        id: 9,
        teamLink: 'https://www.soccerethiopia.net/football/team/wolaitta-dicha',
        teamName: 'ወላይታ ድቻ',
        teamLogo: 'https://www.soccerethiopia.net/wp-content/uploads/2016/05/Dicha-128x128.png',
        teamStartedOn: -1,
        teamCapital: ''  
    }, 
    {
        id: 10,
        teamLink: 'https://www.soccerethiopia.net/football/team/diredawa-ketema',
        teamName: 'ድሬዳዋ ከተማ',
        teamLogo: 'https://www.soccerethiopia.net/wp-content/uploads/2016/05/DDK-128x128.png',
        teamStartedOn: -1,
        teamCapital: ''  
    }, 
    {
        id: 11,
        teamLink: 'https://www.soccerethiopia.net/football/team/mekelakeya',
        teamName: 'መከላከያ',
        teamLogo: 'https://www.soccerethiopia.net/wp-content/uploads/2016/02/Mekelakeya-128x128.png',
        teamStartedOn: -1,
        teamCapital: ''  
    }, 
    {
        id: 12,
        teamLink: 'https://www.soccerethiopia.net/football/team/jimma-aba-jifar',
        teamName: 'ጅማ አባ ጅፋር',
        teamLogo: 'https://www.soccerethiopia.net/wp-content/uploads/2016/11/JAJ-1-128x128.png',
        teamStartedOn: -1,
        teamCapital: ''  
    }, 
    {
        id: 13,
        teamLink: 'https://www.soccerethiopia.net/football/team/shire',
        teamName: 'ስሑል ሽረ',
        teamLogo: 'https://www.soccerethiopia.net/wp-content/uploads/2016/11/Shire-128x118.png',
        teamStartedOn: -1,
        teamCapital: ''  
    }, 
    {
        id: 14,
        teamLink: 'https://www.soccerethiopia.net/football/team/debub-police',
        teamName: 'ደቡብ ፖሊስ',
        teamLogo: 'https://www.soccerethiopia.net/wp-content/uploads/2016/11/dP-125x128.png',
        teamStartedOn: -1,
        teamCapital: ''  
    }, 
    {
        id: 15,
        teamLink: 'https://www.soccerethiopia.net/football/team/dedebit',
        teamName: 'ደደቢት',
        teamLogo: 'https://www.soccerethiopia.net/wp-content/uploads/2016/02/Dedebit-128x128.png',
        teamStartedOn: -1,
        teamCapital: ''  
    },
    {
        id: 16,
        teamLink: 'https://www.soccerethiopia.net/football/team/ሀድያ-ሆሳዕና',
        teamName: 'ሀዲያ ሆሳዕና',
        teamLogo: 'https://www.soccerethiopia.net/wp-content/uploads/2016/11/24483-128x128.png',
        teamStartedOn: -1,
        teamCapital: ''
    },
    {
        id: 17,
        teamLink: 'https://www.soccerethiopia.net/football/team/sebeta',
        teamName: 'ሰበታ ከተማ',
        teamLogo: 'https://www.soccerethiopia.net/wp-content/uploads/2016/11/sebeta.png',
        teamStartedOn: -1,
        teamCapital: ''
    },
    {
        id: 18,
        teamLink: 'https://www.soccerethiopia.net/football/team/ወልቂጤ-ከተማ',
        teamName: 'ወልቂጤ ከተማ',
        teamLogo: 'https://www.soccerethiopia.net/wp-content/uploads/2016/11/sebeta.png',
        teamStartedOn: -1,
        teamCapital: ''
    }
];

async function getTeamDetailFromWeb(teamItem) {
    return new Promise(resolve => {
        http.get(teamItem.teamLink, res => {
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
        })
    }).catch(error => console.log(error));
}

function extractDataFromTableData(tableData, incompleteTeamItem) {
    let trimmedString = replaceCharFromString(cheerio.load(tableData[0]).text(), ' ');
    let teamDataContent = cheerio.load(tableData[2])
    switch (trimmedString) {
        case "ሙሉስም": {
            incompleteTeamItem.teamFullName = teamDataContent.text();
            break;
        }

        case "ተመሰረተ": {
            incompleteTeamItem.teamStartedOn = Number(teamDataContent.text());
            break;
        }

        case "መቀመጫከተማ": {
            incompleteTeamItem.teamCapital = teamDataContent.text();
            break;
        }

        case "ቀደምትስያሜዎች": {
            let previousNames = teamDataContent.text().split('\n')
            incompleteTeamItem.previousNames = previousNames
            break;
        }

        case "ስታድየም": {
            incompleteTeamItem.teamStadium = teamDataContent.text();
            break;
        }

        case "ፕሬዝዳንት": {
            incompleteTeamItem.teamPresident = teamDataContent.text();
            break;
        }

        case "ም/ፕሬዝዳንት": {
            incompleteTeamItem.teamVicePresident = teamDataContent.text();
            break;
        }

        case "ስራአስኪያጅ": {
            incompleteTeamItem.teamManager = teamDataContent.text();
            break;
        }

        case "ዋናአሰልጣኝ": {
            incompleteTeamItem.teamCoach = teamDataContent.text();
            break;
        }

        case "ረዳትአሰልጣኝ": {
            incompleteTeamItem.teamViceCoach = teamDataContent.text();
            break;
        }

        case "ቴክኒክዳ.": {
            incompleteTeamItem.teamTechniqueDirector = teamDataContent.text();
            break;
        }

        case "የግብጠባቂዎች": {
            incompleteTeamItem.teamGoalKeeper = teamDataContent.text();
            break;
        }

        case "ቡድንመሪ": {
            incompleteTeamItem.teamAlpha = teamDataContent.text();
            break;
        }

        case "ወጌሻ": {
            incompleteTeamItem.teamNurse = teamDataContent.text();
            break;
        }
    }

    return incompleteTeamItem;
}

function processTeamDetailFromResponse(response, incompleteTeamItem) {
    let $ = cheerio.load(response);
    let possibleCandidates = $('#tablepress-006');
    let actualTable = null;

    for (let i = 0; i < possibleCandidates.length; i++) {
        let tempBlock = cheerio.load(possibleCandidates[i]);
        if (
            cheerio.load(tempBlock('tr')[0]).text() === 'ፕሮፋይል' || 
            cheerio.load(tempBlock('tr')[0]).text() === '\nፕሮፋይል\n'
            ) {
            actualTable = cheerio.load(possibleCandidates[i]);
            break;
        }
    }

    if (actualTable != null) {
        let rows = actualTable('tr');

        rows.toArray().forEach(row => {
            const tableData = cheerio.load(row)('td');
            if (tableData.length === 3) {
                incompleteTeamItem = extractDataFromTableData(tableData , incompleteTeamItem);
            }
        })
    } else {
        console.log('Error parsing webpage - table not found')
    }

    return incompleteTeamItem;
}
  
function replaceCharFromString(mainString, characterToReplace) {
    return mainString.split(characterToReplace).join('');
}

/**
 * Entry point for team_details api feature
 * given a id of a team (ex: 0), will return the detail of that team
 * example output:
 * <pre>
 *   { 
 *       id: 0,
 *       teamLink: 'https://www.soccerethiopia.net/football/team/ethiopia-bunna',
 *       teamName: 'ኢትዮጵያ ቡና',
 *       teamLogo: 'https://www.soccerethiopia.net/wp-content/uploads/2016/02/Bunna-128x128.png',
 *       teamStartedOn: 1968,
 *       teamCapital: 'አዲስ አበባ',
 *       teamFullName: 'ኢትዮጵያ ቡና ስፖርት ክለብ',
 *       previousNames: [ 'ንጋት ኮከብ', 'ቡና ገበያ' ],
 *       teamStadium: 'አዲስ አበባ ስታድየም',
 *       teamPresident: '፻ አለቃ ፈቃደ ማሞ',
 *       teamVicePresident: '–',
 *       teamManager: 'በያን ሁሴን',
 *       teamCoach: 'ዲዲዬ ጎሜስ',
 *       teamViceCoach: 'ገብረኪዳን ነጋሽ',
 *       teamTechniqueDirector: '–',
 *       teamGoalKeeper: 'ጸጋዘዓብ አስገዶም',
 *       teamAlpha: 'ዘሪሁን ግርማ',
 *       teamNurse: 'ሰለሞን ኃይለማርያም' 
 *   }
 * </pre> 
 * @param name - name of the team
 * @return {Object}
 * @api Public
 */

exports.getTeamItemFromId = async function(id) {
    return getTeamDetailFromWeb(teams[id])
        .then(data => processTeamDetailFromResponse(data, teams[id]))
        .catch(err => console.log(err));
};

/**
 * Entry point for team_details api feature
 * given a name of a team (ex: 'ኢትዮጵያ ቡና'), will return the detail of that team
 * example output:
 * <pre>
 *   { 
 *       id: 0,
 *       teamLink: 'https://www.soccerethiopia.net/football/team/ethiopia-bunna',
 *       teamName: 'ኢትዮጵያ ቡና',
 *       teamLogo: 'https://www.soccerethiopia.net/wp-content/uploads/2016/02/Bunna-128x128.png',
 *       teamStartedOn: 1968,
 *       teamCapital: 'አዲስ አበባ',
 *       teamFullName: 'ኢትዮጵያ ቡና ስፖርት ክለብ',
 *       previousNames: [ 'ንጋት ኮከብ', 'ቡና ገበያ' ],
 *       teamStadium: 'አዲስ አበባ ስታድየም',
 *       teamPresident: '፻ አለቃ ፈቃደ ማሞ',
 *       teamVicePresident: '–',
 *       teamManager: 'በያን ሁሴን',
 *       teamCoach: 'ዲዲዬ ጎሜስ',
 *       teamViceCoach: 'ገብረኪዳን ነጋሽ',
 *       teamTechniqueDirector: '–',
 *       teamGoalKeeper: 'ጸጋዘዓብ አስገዶም',
 *       teamAlpha: 'ዘሪሁን ግርማ',
 *       teamNurse: 'ሰለሞን ኃይለማርያም' 
 *   }
 * </pre> 
 * @param name - name of the team
 * @return {Object}
 * @api Public
 */
exports.getTeamItemFromName = async function(name) {
    for (let i = 0; i < teams.length; i++) {

        if (teams[i].teamName.indexOf(name) !== -1) {
            return getTeamDetailFromWeb(teams[i])
                .then(data => processTeamDetailFromResponse(data, teams[i]))
                .catch(err => console.log(err));
        }
    }
    return null;
};

exports.getTeamItemFromNameJSON = async function(name) {
    return JSON.stringify(await this.getTeamItemFromName(name));
};

exports.getTeamItemFromIDJSON = async function(id) {
    return JSON.stringify(await this.getTeamItemFromId(id));
};