const team_standing = require('./team_standing');
const league_schedule = require('./league_schedule');

exports.GameStatus = league_schedule.GameStatus;
exports.getAllLeagueSchedule = league_schedule.getAllLeagueScheduleJSON();
exports.getAllLeagueScheduleJSON = league_schedule.getAllLeagueScheduleJSON();
exports.getTeamStanding = team_standing.getTeamStandingData();
exports.getTeamStandingJSON = team_standing.getTeamStandingDataJson();