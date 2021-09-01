// fetches upcoming events from addEvent 
// updates database ('Events' table)

import { fetchTimezones, fetchUpcomingEvents } from "../services/addEvent";
import { syncEvents, syncTimezones } from '../services/database';
import { sendUpdate } from "../services/discord";

export const fetchAndSyncTimezones = async () => {
  const tzArray = await fetchTimezones();
  await syncTimezones(tzArray);
}

export const fetchAndSyncEvents = async () => {
  const eventsArray = await fetchUpcomingEvents();
  await syncEvents(eventsArray);
}

export const sendDiscordUpdate = async (channel, event) => {
  await sendUpdate({
    channel,
    title: event.title,
    description: event.description,
    content: JSON.stringify({...event})
  })
}
