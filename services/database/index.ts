import prisma from './client';
import * as Config from '../../config/index.json';

// return event object for all events in the next hour
export const getNextEvent = () => {
  const now = new Date();
  let thirtyMinutesFromNow: Date = new Date();
  thirtyMinutesFromNow.setMinutes(thirtyMinutesFromNow.getMinutes() + Config.eventSyncInterval);
  return prisma.event.findMany({
    where: {
      AND: [
        {
          dateStartUnix: {
            lte: thirtyMinutesFromNow,
            gte: now
          }
        },
        {
          postOnDiscord: {
            equals: false
          }
        }
      ]
    }
  });
}

export const syncEvents = async (eventsArray) => {
  for (let i in eventsArray) {
    console.log('syncing', i, 'of', eventsArray.length);
    try {
      await upsertEvent(eventsArray[i]);
    } catch(err) {
      console.log (err);
      continue;
    }
  }
  return;
}

export const syncTimezones = async (tzArray) => {
  for (let i in tzArray) {
    console.log('syncing', i, 'of', tzArray.length);
    try {
      await upsertTimezone(tzArray[i]);
    } catch(err) {
      console.log (err);
      continue;
    }
  }
  return;
}

export const getTimezoneOffset = async (label) => {
  const tz = await prisma.timezones.findFirst({
    where: {
      label
    }
  })
  if (!tz) {
    console.log('tz not found:', label);
    return {number: 0, symbol: "-1"};
  }
  return { 
    number: tz!.offsetNumber, 
    symbol: tz!.offsetSymbol 
  }
}

const upsertEvent = (event) => {
  return prisma.event.upsert({
    create: { ...event },
    update: { ...event },
    where: { id: event.id }
  })
}

const upsertTimezone = (tz) => {
  return prisma.timezones.upsert({
    create: { ...tz },
    update: { ...tz },
    where: { id: tz.id }
  })
}

export const disconnect = () => prisma.$disconnect();
