const team_standing = require('./team_standing');
const league_schedule = require('./league_schedule');
const team_details = require('./team_details')

exports.GameStatus = league_schedule.GameStatus;
exports.getAllLeagueSchedule = () => league_schedule.getAllLeagueScheduleJSON();
exports.getAllLeagueScheduleJSON = () => league_schedule.getAllLeagueScheduleJSON();
exports.getTeamStanding = () => team_standing.getTeamStandingData();
exports.getTeamStandingJSON = () => team_standing.getTeamStandingDataJson();
exports.getThisWeekLeagueSchedule = () => league_schedule.getThisWeekLeagueSchedule();
exports.getThisWeekLeagueScheduleJSON = () => league_schedule.getThisWeekLeagueScheduleJSON();
exports.getTeamDetail = (teamName) => team_details.getTeamItemFromName(teamName);
exports.getTeamDetailUsingId = (id) => team_details.getTeamItemFromId(id);