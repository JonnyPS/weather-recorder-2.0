const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 5000;
const path = require("path");
const CronJob = require('cron').CronJob;
const axios = require('axios');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('abcd');

app.use(cors())
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, '/build')));

const STATIC_PATH = path.resolve('../client/build');

let createTables = () => {
	db.serialize(function() {
		let createTable = `
			CREATE TABLE IF NOT EXISTS Bristol (
				id INTEGER PRIMARY KEY,
				Location text, 
				Sunrise INT,
				Sunset INT,
				DayTemp NUMERIC,
				MinTemp NUMERIC,
				MaxTemp NUMERIC,
				NightTemp NUMERIC,
				EveTemp NUMERIC,
				MornTemp NUMERIC,
				Feels_Like_Day NUMERIC,
				Feels_Like_Night NUMERIC,
				Feels_Like_Eve NUMERIC,
				Feels_Like_Morn NUMERIC,
				Humidity NUMERIC,
				WindSpeed NUMERIC,
				WindDeg NUMERIC,
				Weather_Main TEXT,
				Weather_Description TEXT,
				Icon TEXT,
				Clouds NUMERIC,
				Pop NUMERIC,
				Rain NUMERIC,
				UVI NUMERIC,
				Snow NUMERIC,
				Timestamp INT
			)`;

		let copyTable = `
			CREATE TABLE IF NOT EXISTS London AS
			SELECT *
			FROM Bristol
		`;
		// create first table (Bristol)
		db.run(createTable, (error) => {
			error ? console.log( 'TABLE CREATION Error ------', error ) : console.log('Table successfully created - Bristol');
		})
		// create second table (London)
		db.run(copyTable, (error) => {
			error ? console.log( 'Error ------', error ) : console.log('Table successfully created - London');
		});
	});
	// db.close();
};


let makeRequestsToWeatherApiBristol = () => {
	console.log('makeRequestsToWeatherApiBristol');
	const task = new CronJob('1 0 * * *', () => {
	axios.get("https://api.openweathermap.org/data/2.5/onecall?lat=51.46&lon=-2.6&exclude=minutely,hourly,current&units=metric&appid=fe46f64d11af51352d4aea674767e906", {
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(response => {
			// console.log(response.data)
			postDataToDB(
				"Bristol",
				response
			)
		})
	}, true, "Europe/London")
  task.start();
}

let makeRequestsToWeatherApiLondon = () => {
	console.log('makeRequestsToWeatherApiLondon');
	const task = new CronJob('1 0 * * *', () => {
	axios.get("https://api.openweathermap.org/data/2.5/onecall?lat=51.51&lon=-0.13&exclude=minutely,hourly,current&units=metric&appid=fe46f64d11af51352d4aea674767e906", {
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(response => {
			// console.log(response.data)
			postDataToDB(
				"London",
				response
			)
		})
	}, true, "Europe/London")
  task.start();
}

let postDataToDB = (tableName, response) => {
	console.log(`Posting data to Database (${tableName})`)

	let location = tableName;
	let sunrise = response.data.daily[0].sunrise;
	let sunset = response.data.daily[0].sunset;
	let dayTemp = response.data.daily[0].temp.day;
	let minTemp = response.data.daily[0].temp.min;
	let maxTemp = response.data.daily[0].temp.max;
	let nightTemp = response.data.daily[0].temp.night;
	let eveTemp = response.data.daily[0].temp.eve;
	let mornTemp = response.data.daily[0].temp.morn;
	
	let feelsLike_day = response.data.daily[0].feels_like.day;
	let feelsLike_night = response.data.daily[0].feels_like.night;
	let feelsLike_eve = response.data.daily[0].feels_like.eve;
	let feelsLike_morn = response.data.daily[0].feels_like.morn;

	let humidity = response.data.daily[0].humidity;
	let wind = response.data.daily[0].wind_speed;
	let windDir = response.data.daily[0].wind_deg;
	let main = response.data.daily[0].weather[0].main;
	let description = response.data.daily[0].weather[0].description;

	let icon = response.data.daily[0].weather[0].icon;
	let cloudCover = response.data.daily[0].clouds;
	let pop = response.data.daily[0].pop; // probability of precipitation
	let rain = response.data.daily[0].rain;
	let uvi = response.data.daily[0].uvi;
	let snow = response.data.daily[0].snow;
	let timestamp = response.data.daily[0].dt;

	const dataInto = `INSERT INTO ${ tableName } (
		Location, 
		Sunrise,
		Sunset,
		DayTemp,
		MinTemp,
		MaxTemp,
		NightTemp,
		EveTemp,
		MornTemp,
		Feels_Like_Day,
		Feels_Like_Night,
		Feels_Like_Eve,
		Feels_Like_Morn,
		Humidity,
		WindSpeed,
		WindDeg,
		Weather_Main,
		Weather_Description,
		Icon,
		Clouds,
		Pop,
		Rain,
		UVI,
		Snow,
		Timestamp
		) 
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)
	`;
	const values = [
		location, 
		sunrise, 
		sunset, 
		dayTemp, 
		minTemp, 
		maxTemp, 
		nightTemp, 
		eveTemp, 
		mornTemp, 
		feelsLike_day, 
		feelsLike_night, 
		feelsLike_eve, 
		feelsLike_morn, 
		humidity, 
		wind, 
		windDir, 
		main, 
		description, 
		icon,
		cloudCover, 
		pop, 
		rain, 
		uvi,
		snow,
		timestamp
	];

	db.run(dataInto, values, (error) => {
		!error ? console.log(`Data posted successfully into ${ tableName } table`) : console.log(error);
	})
}

createTables();
makeRequestsToWeatherApiBristol();
makeRequestsToWeatherApiLondon();

// set up routes on the backend....

app.get('/weather-bristol', (req, res) => {
	const query = `SELECT * from Bristol`;
	db.all(query, (err, rows) => {
		if (err) {
			console.error(err);
			return;
		}
		console.log('selecting from Bristol.....')
		let allRows = rows.map(function (row) {  
			return row;
		}) 
		console.log('allRows = ', allRows)
		res.json({rows: allRows})
    // res.json({res: 'get the weather'});
	});
});

app.get('/weather-london', (req, res) => {
	const query = `SELECT * from London`;
	db.all(query, (err, rows) => {
		if (err) {
			console.error(err);
			return;
		}
		console.log('selecting from London.....')
		let allRows = rows.map(function (row) {  
			return row;
		}) 
		console.log('allRows = ', allRows)
		res.json({rows: allRows})
    // res.json({res: 'get the weather'});
	});
});

app.get('/backend-view', (req, res) => {
	res.send('welcome to the backend!')
})

app.get('/frontend-view', (req, res) => {
	console.log(__dirname)
	res.sendFile(path.join(__dirname + '/build/index.html'));
})

app.use(express.static(STATIC_PATH));
app.get('/*', function (req, res) {
   res.sendFile(path.join(STATIC_PATH, 'index.html'));
 });

// app.get('*', (req, res) => {
// 	res.send('Whoops! looks like you found a blank page...')
// })


app.listen(port, () => console.log(`App listening on port ${port}!`));