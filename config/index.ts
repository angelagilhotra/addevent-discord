export default {
  "addEvent": {
    "token": process.env.ADDEVENT_TOKEN,
    "calendarId": process.env.ADDEVENT_CALENDAR
  },
  "discord": {
    "token": process.env.DISCORD_TOKEN,
    "channel": process.env.DISCORD_CHANNEL
  },
  "eventSyncInterval": process.env.EVENT_SYNC_INTERVAL || 60
}