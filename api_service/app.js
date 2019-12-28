const express = require('express')
const app = express()
const fetch = require('node-fetch')
const config = require('./config.json')


app.get('/', (req, res) => {
    res.send("API Service")
})

app.get('/send', (req, res) => {
    res.send("Sent")
})

app.get('/getGoAlertAll', (req, res) => {
    fetch('https://api.gotransit.com/Api/serviceupdate/en/all')
        .then(re => re.json())
        .then(body => res.send(body))
    console.log("Get all GO alerts")
})

app.get('/getGoAlert/:id', (req, res) => {
    fetch('https://api.gotransit.com/Api/serviceupdate/en/all')
        .then(data => data.json())
        .then(json => json.Trains.Train)
        .then(train => {
            retValue = train.filter(it => it.CorridorCode === req.params.id)[0]
            console.log("Get GO alerts for " + req.params.id + JSON.stringify(retValue))
            res.send(JSON.stringify(retValue))
        })
        .catch(error => {
            console.log(error)
            res.send(`{ "error": "Nothing found for code ${req.params.id}" }`)
        })
})

app.listen(config.port, () => {
    console.log(`listening on ${config.port}`)
})