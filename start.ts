/**
 * Cron job
 * Run code in this file on regular intervals (Config.eventSyncInterval (minutes))
 */
import { fetchAndSyncEvents, fetchAndSyncTimezones, sendDiscordUpdate } from "./scripts";
import { disconnect, getNextEvent } from "./services/database";
import * as Config from './config/index.json';

(async function () {
  // await fetchAndSyncTimezones();
  await fetchAndSyncEvents();
  // get all events starting in the next hour
  const n = await getNextEvent();
  console.log ('total:', n.length);
  for (const event of n) {
    await sendDiscordUpdate(Config.discord.channel, event)
  }
  await disconnect();
}());
