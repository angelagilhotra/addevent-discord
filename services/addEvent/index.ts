import Config from '../../config';
import {generateAddEventAPI} from '../../utils';
import { getTimezoneOffset } from '../database';
const { api, defaultParams } = generateAddEventAPI(Config.addEvent.token);

export const fetchUpcomingEvents = async () => {
  // Returns a list of events in a calendar. 
  // The events are sorted by recently created.
  const events = (await api.get('/me/calendars/events/list', {
    params: {
      ...defaultParams,
      calendar_id: Config.addEvent.calendarId
    }
  })).data.events
  let cleanedEvents: any[] = [];
  for (const event of events) {
    const { number, symbol } = await getTimezoneOffset(event.timezone)
    if (number == 0  && symbol== "-1") {
      console.log('error in tz fetch', event.timezone);
      return;
    }
    let dateStartUnix;
    if (symbol === '-') {
      dateStartUnix = new Date((event.date_start_unix + number) * 1000);
    } else if (symbol === '+') {
      dateStartUnix = new Date((event.date_start_unix - number) * 1000);
    }
    cleanedEvents.push({
      id: event.unique,
      title: event.title,
      description: event.description,
      location: event.location,
      organizer: event.organizer,
      dateStart: event.date_start,
      dateStartTime: event.date_start_time,
      dateStartAmPm: event.date_start_ampm,
      dateFormat: event.date_format,
      dateStartUnix,
      timezone: event.timezone,
      link: event.link_short,
      calendarId: Config.addEvent.calendarId
    })
  }
  return cleanedEvents;
}

export const fetchTimezones = async () => {
  const timezones = (await api.get('/timezones')).data.data;
  const cleanedTimezones = timezones.map((tz) => {
    let offsetSymbol, offsetNumber;
    if (tz.offset.substring(0,1) == '-') {
      offsetSymbol = '-';
      offsetNumber = Number(tz.offset.substr(1));
    } else {
      offsetSymbol = '+';
      offsetNumber = Number(tz.offset);
    }
    return {
      id: tz.id,
      label: tz.label,
      gmtOffset: tz.gmt_offset,
      gmtDiff: tz.gmt_diff,
      abbr: tz.tzid_abbr,
      offset: tz.offset,
      offsetNumber,
      offsetSymbol
    }
  })
  return cleanedTimezones;
}
