const team_standing = require('./team_standing');
const league_schedule = require('./league_schedule');
const team_details = require('./team_details')
const top_players = require('./top_players')

exports.GameStatus = league_schedule.GameStatus;
exports.getAllLeagueSchedule = () => league_schedule.getAllLeagueScheduleJSON();
exports.getAllLeagueScheduleJSON = () => league_schedule.getAllLeagueScheduleJSON();
exports.getTeamStanding = () => team_standing.getTeamStandingData();
exports.getTeamStandingJSON = () => team_standing.getTeamStandingDataJson();
exports.getThisWeekLeagueSchedule = () => league_schedule.getThisWeekLeagueSchedule();
exports.getThisWeekLeagueScheduleJSON = () => league_schedule.getThisWeekLeagueScheduleJSON();
exports.getTeamDetail = (teamName) => team_details.getTeamItemFromName(teamName);
exports.getTeamDetailUsingId = (id) => team_details.getTeamItemFromId(id);
exports.getTeamDetailJSON = (teamName) => team_details.getTeamItemFromNameJSON(teamName);
exports.getTeamDetailUsingIdJSON = (id) => team_details.getTeamItemFromIDJSON(id);
exports.getTopPlayersList = () => top_players.getTopPlayersList();
exports.getTopPlayersListJSON = () => top_players.getTopPlayersListJSON();
