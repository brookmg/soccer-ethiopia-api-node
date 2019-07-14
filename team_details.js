const cheerio = require('cheerio');
const http = require('http');

const testing = false;

const teams = [
    {
        id: 0,
        teamLink: 'http://www.soccerethiopia.net/football/team/ethiopia-bunna',
        teamName: 'ኢትዮጵያ ቡና',
        teamLogo: 'http://www.soccerethiopia.net/wp-content/uploads/2016/02/Bunna-128x128.png',
        teamStartedOn: -1,
        teamCapital: ''  
    }, 
    {
        id: 1,
        teamLink: 'http://www.soccerethiopia.net/football/team/kidus-giorgis',
        teamName: 'ቅዱስ ጊዮርጊስ',
        teamLogo: 'http://www.soccerethiopia.net/wp-content/uploads/2015/10/KG-128x128.png',
        teamStartedOn: -1,
        teamCapital: ''  
    }, 
    {
        id: 2,
        teamLink: 'http://www.soccerethiopia.net/football/team/hawassa-ketema',
        teamName: 'ሀዋሳ ከተማ',
        teamLogo: 'http://www.soccerethiopia.net/wp-content/uploads/2016/05/Hawassa-128x128.png',
        teamStartedOn: -1,
        teamCapital: ''  
    }, 
    {
        id: 3,
        teamLink: 'http://www.soccerethiopia.net/football/team/sidama-bunna',
        teamName: 'ሲዳማ ቡና',
        teamLogo: 'http://www.soccerethiopia.net/wp-content/uploads/2016/05/Sidama-128x128.png',
        teamStartedOn: -1,
        teamCapital: ''  
    }, 
    {
        id: 4,
        teamLink: 'http://www.soccerethiopia.net/football/team/wolwalo-au',
        teamName: 'ወልዋሎ ዓ.ዩ.',
        teamLogo: 'http://www.soccerethiopia.net/wp-content/uploads/2016/11/Welwalo-128x128.png',
        teamStartedOn: -1,
        teamCapital: ''  
    }, 
    {
        id: 5,
        teamLink: 'http://www.soccerethiopia.net/football/team/fasil-kenema',
        teamName: 'ፋሲል ከነማ',
        teamLogo: 'http://www.soccerethiopia.net/wp-content/uploads/2016/05/Fasil-128x128.png',
        teamStartedOn: -1,
        teamCapital: ''  
    }, 
    {
        id: 6,
        teamLink: 'http://www.soccerethiopia.net/football/team/bahir-dar-ketema',
        teamName: 'ባህር ዳር ከተማ',
        teamLogo: 'http://www.soccerethiopia.net/wp-content/uploads/2016/11/BDK-123x128.png',
        teamStartedOn: -1,
        teamCapital: ''  
    }, 
    {
        id: 7,
        teamLink: 'http://www.soccerethiopia.net/football/team/mekelle-70-enderta',
        teamName: 'መቐለ 70 እንደርታ',
        teamLogo: 'http://www.soccerethiopia.net/wp-content/uploads/2016/11/MK-105x128.png',
        teamStartedOn: -1,
        teamCapital: ''  
    }, 
    {
        id: 8,
        teamLink: 'http://www.soccerethiopia.net/football/team/adama-ketema',
        teamName: 'አዳማ ከተማ',
        teamLogo: 'http://www.soccerethiopia.net/wp-content/uploads/2016/05/Adama-1-128x128.png',
        teamStartedOn: -1,
        teamCapital: ''  
    }, 
    {
        id: 9,
        teamLink: 'http://www.soccerethiopia.net/football/team/wolaitta-dicha',
        teamName: 'ወላይታ ድቻ',
        teamLogo: 'http://www.soccerethiopia.net/wp-content/uploads/2016/05/Dicha-128x128.png',
        teamStartedOn: -1,
        teamCapital: ''  
    }, 
    {
        id: 10,
        teamLink: 'http://www.soccerethiopia.net/football/team/diredawa-ketema',
        teamName: 'ድሬዳዋ ከተማ',
        teamLogo: 'http://www.soccerethiopia.net/wp-content/uploads/2016/05/DDK-128x128.png',
        teamStartedOn: -1,
        teamCapital: ''  
    }, 
    {
        id: 11,
        teamLink: 'http://www.soccerethiopia.net/football/team/mekelakeya',
        teamName: 'መከላከያ',
        teamLogo: 'http://www.soccerethiopia.net/wp-content/uploads/2016/02/Mekelakeya-128x128.png',
        teamStartedOn: -1,
        teamCapital: ''  
    }, 
    {
        id: 12,
        teamLink: 'http://www.soccerethiopia.net/football/team/jimma-aba-jifar',
        teamName: 'ጅማ አባ ጅፋር',
        teamLogo: 'http://www.soccerethiopia.net/wp-content/uploads/2016/11/JAJ-1-128x128.png',
        teamStartedOn: -1,
        teamCapital: ''  
    }, 
    {
        id: 13,
        teamLink: 'http://www.soccerethiopia.net/football/team/shire-endaselassie',
        teamName: 'ስሑል ሽረ',
        teamLogo: 'http://www.soccerethiopia.net/wp-content/uploads/2016/11/Shire-128x118.png',
        teamStartedOn: -1,
        teamCapital: ''  
    }, 
    {
        id: 14,
        teamLink: 'http://www.soccerethiopia.net/football/team/debub-police',
        teamName: 'ደቡብ ፖሊስ',
        teamLogo: 'http://www.soccerethiopia.net/wp-content/uploads/2016/11/dP-125x128.png',
        teamStartedOn: -1,
        teamCapital: ''  
    }, 
    {
        id: 15,
        teamLink: 'http://www.soccerethiopia.net/football/team/dedebit',
        teamName: 'ደደቢት',
        teamLogo: 'http://www.soccerethiopia.net/wp-content/uploads/2016/02/Dedebit-128x128.png',
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
    let possibleCandidates = $('.tablepress-id-006')
    let actualTable = null;

    for (let i = 0; i < possibleCandidates.length; i++) {
        let tempBlock = cheerio.load(possibleCandidates[i]);
        if (cheerio.load(tempBlock('tr')[0]).text() == '\nፕሮፋይል\n') {
            actualTable = cheerio.load(possibleCandidates[i]);
            break;
        }
    }

    if (actualTable != null) {
        let rows = actualTable('tr');

        rows.toArray().forEach(row => {
            const tableData = cheerio.load(row)('td');
            if (tableData.length == 3) {
                incompleteTeamItem = extractDataFromTableData(tableData , incompleteTeamItem);
            }
        })
    } else {
        console.log('Error parsing webpage - table not found')
    }

    return incompleteTeamItem;
}

// FUCK JAVASCRIPT!
function replaceCharFromString(mainString, characterToReplace) {
    return mainString.split(characterToReplace).join('');
}

exports.getTeamItemFromId = async function(id) {
    return getTeamDetailFromWeb(teams[id])
        .then(data => processTeamDetailFromResponse(data))
        .catch(err => console.log(err));
}

exports.getTeamItemFromName = async function(name) {
    for (let i = 0; i < teams.length; i++) {
        if (teams[i].teamName.indexOf(name) != -1) {
            return getTeamDetailFromWeb(teams[i])
                .then(data => processTeamDetailFromResponse(data, teams[i]))
                .catch(err => console.log(err));
        }
    }
    return null;
}



