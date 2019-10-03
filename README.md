<p align="center">
	<img src="https://github.com/brookmg/Soccer-Ethiopia-API/blob/master/soccer_ethiopia_api.png?raw=true" alt="Soccer Ethiopia" /><br>
	<h1 align="center"> Soccer Ethiopia API Node</h1>
	<h4 align="center"> This is a NodeJs api that serve the latest Ethiopian premier league standing data </h4>
</p>

#
[![npm package](https://nodei.co/npm/soccer-ethiopia-api.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/soccer-ethiopia-api/)

#### The data is fetched from [Soccer Ethiopia](http://soccerethiopia.net). And this is an unoffical api.

## Installation
```batch
npm i soccer-ethiopia-api
```

* Get the latest standing data
```javascript
const soccer_et = require('soccer-ethiopia-api'); //require soccer-et module

soccer_et.getTeamStandingJSON().then(data => console.log("OBJ" , data)); // Get the latest standing data as json
soccer_et.getTeamStanding().then(data => console.log("OBJ" , data)); // Get the latest standing data as an array
```

* Get the league schedule
```javascript
const soccer_et = require('soccer-ethiopia-api');   //require soccer-et module

soccer_et.getAllLeagueScheduleJSON().then(data => console.log("OBJ" , data)); // Get the league schedule as json (All of it)
soccer_et.getAllLeagueSchedule().then(data => console.log("OBJ" , data)); // Get the league schedule as an array (All of it)
soccer_et.getThisWeekLeagueScheduleJSON().then(data => console.log("OBJ" , data)); // Get this week's league schedule as json
soccer_et.getThisWeekLeagueSchedule().then(data => console.log("OBJ" , data)); // Get this week's league schedule as an array
```

* Get full detail about a team using it's predefined id or it's name
```javascript
const soccer_et = require('soccer-ethiopia-api');

soccer_et.getTeamDetail('ኢትዮጵያ ቡና').then(detail => console.log("OBJ" , detail)); // Get the team detail of 'ኢትዮጵያ ቡና' as an object
soccer_et.getTeamDetailJSON('ኢትዮጵያ ቡና').then(detail => console.log("OBJ" , detail)); // Get the team detail of 'ኢትዮጵያ ቡና' as json 
```

## Features in this lib:
- [x] Latest teams' standing data
- [x] League schedule
- [x] This week's league schedule
- [x] Team details
- [ ] Player details
- [ ] Top players list
- [ ] News
