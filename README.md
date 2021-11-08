### Usage
- Runs every hour (or as set in config), to post events coming up in the next hour on a channel in discord
- supports 1 addEvent calendar, 1 discord channel

### Setup
```
$ yarn
```
#### Config
`./config/index.json`

```
{
  "addEvent": {
    "token": "",
    "calendarId": ""
  },
  "discord": {
    "token": "",
    "channel": ""
  },
  "eventSyncInterval": 60
}

```
#### .env
`./.env`
```
DATABASE_URL=
```
#### local testing
```
$ ts-node start
```
#### build and deploy
```
$ tsc
$ node dist/tasks/sync
```