const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const request = require('request');
//const apiKey = '1022b6a54d090f6c6e9198b313e15e71';
const accessToken = '0df5dc9a451071f06dfa5207725021ba56c75e85'
const id = "20905149"

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));




app.get('/', function (req, res) {
    let url = `https://www.strava.com/api/v3/athlete?access_token=${accessToken}`
    request(url, function (err, response, body) {
      if(err){
        res.render('index', {athlete: null, error: 'Error, error'});
      } else {
        let athlete = JSON.parse(body)
        if(athlete == undefined){
          res.render('index', {athlete: null, error: 'Error, undefinded'});
        } else {
          let athleteData = `It's ${athlete.firstname} from ${athlete.city}!`;
          res.render('index', {athlete: athleteData, error: null});
        }
      }
    });
})

app.post('/stats', function (req, res) {
    let url = `https://www.strava.com/api/v3/athletes/20905149/stats?access_token=${accessToken}`
    request(url, function (err, response, body) {
      if(err){
        res.render('stats', {athlete: null, error: 'Error, error'});
      } else {
        let athlete = JSON.parse(body)
        if(athlete == undefined){
          res.render('stats', {athlete: null, error: 'Error, undefinded'});
        } else {
          let runStats = `Przebiegłeś ${(athlete.recent_run_totals.distance/1000).toFixed(2)}km, a biegałeś ${athlete.recent_run_totals.count} razy!`;
          let rideStats = `Na rowerze przejechałeś ${(athlete.recent_ride_totals.distance/1000).toFixed(2)}km, a jeżdziłeś ${athlete.recent_ride_totals.count} razy!`;
          res.render('stats', {runStats: runStats,rideStats:rideStats, error: null});
        }
      }
    });
  })

app.listen(4000, function () {
  console.log('Example app listening on port 4000!')
})