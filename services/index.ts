// fetches upcoming events from addEvent 
// updates database ('Events' table)

import { fetchTimezones, fetchUpcomingEvents } from "./addEvent";
import { syncEvents, syncTimezones } from './database';
import { sendUpdate } from "./discord";

export const fetchAndSyncTimezones = async () => {
  const tzArray = await fetchTimezones();
  await syncTimezones(tzArray);
}

export const fetchAndSyncEvents = async () => {
  const eventsArray = await fetchUpcomingEvents();
  await syncEvents(eventsArray);
}

export const sendDiscordUpdate = async (channel, event) => {
  console.log('sending discord update')
  await sendUpdate({
    channel,
    title: event.title,
    description: event.description,
    content: `
      :alarm_clock: **${event.title}** starting soon!\n:calendar: RSVP here: ${event.link}\n\n${event.location ? `:point_right: Join here: ${event.location}` : ``}
    `
  })
}
