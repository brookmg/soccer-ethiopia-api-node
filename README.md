<p align="center">
	<img src="https://github.com/brookmg/Soccer-Ethiopia-API/blob/master/soccer_ethiopia_api.png?raw=true" alt="Soccer Ethiopia" /><br>
	<h1 align="center"> Soccer Ethiopia API Node</h1>
	<h4 align="center"> This is an nodejs api that serve the latest Ethiopian premier league standing data </h4>
</p>

#### The data is fetched from [Soccer Ethiopia](http://soccerethiopia.net). And this is an unoffical api.

#### We are currently in development, you won't find this in npm 

#### Get the latest standing data as json
```javascript
	const team_standing = require('./team_standing');
	team_standing.getTeamStandingDataJson().then(data => console.log("OBJ" , data));
```

#### Get the latest standing data as an array
```javascript
	const team_standing = require('./team_standing');
	team_standing.getTeamStandingData().then(data => console.log("OBJ" , data));
```

## Features in this lib:
- [x] Latest teams' standing data
- [ ] League schedule
- [ ] Team details
- [ ] Player details
- [ ] Top players list
- [ ] News