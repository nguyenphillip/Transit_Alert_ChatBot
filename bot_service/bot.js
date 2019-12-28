const Discord = require('discord.js')
const client = new Discord.Client()
const schedule = require('node-schedule')
const fetch = require('node-fetch')
const config = require('./config.json')

let channel = client.channels.get(config.channelId)

function dailyMessage(date){
    console.log("Message at: " + date)
    let channel = client.channels.get(config.channelId)
    sendGoAlert("RH", channel)
}

function sendGoAlert(code, channel) {
    fetch(`http://api-service:8080/getGoAlert/${code}`)
        .then(data => data.json())
        .then(json => {
            console.log("API Got data: " + JSON.stringify(json))
            const embed = formatJSON(json)
            channel.send(embed)
        })
        .catch(error =>{
            console.log(error)
            channel.send("It looks like there's an issue with the API service. Please try again in a few moments...")
        })
} 

function formatJSON(json) {
    let embed = new Discord.RichEmbed().setTitle("GO Alerts")

    for (var attr in json){
        if (attr === "Notifications" || attr === "SaagNotifications"){
            embed.addField(attr, JSON.stringify(json[attr]))
        } else {
            embed.addField(attr, json[attr])
        }
    }
    

    return embed

}

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
    // Display channels
    client.guilds.forEach((guild) => {
        guild.channels.forEach((channel) => {
            console.log(` - ${channel.name} ${channel.id}`)
        })
    })

    // Send daily message
    var daily = schedule.scheduleJob(config.dailyCron, dailyMessage)
})

client.on('message', (message) => {
    if (message.author.bot || !message.content.startsWith(config.prefix)) {
        return
    }
    console.log("Got message -- " + message.author.tag + ": " + message.content)

    const args = message.content.slice(config.prefix.length).split(' ')
    const command = args.shift().toLowerCase();

    if (command === "goalert"){
        sendGoAlert(args[0], message.channel)
    }
})

client.login(config.token)

