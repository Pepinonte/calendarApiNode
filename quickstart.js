// connexion nike sa mere a l'api
const { google } = require('googleapis');

const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2(
  '787683943283-5pe9joqgvt9trc9fnn4fvl43p6h2psng.apps.googleusercontent.com',
  'XMfdN_Wz54fzoZjaNkbisWJS'
);

oAuth2Client.setCredentials({
  refresh_token:
    '1//04IEJ_kyZrJP5CgYIARAAGAQSNwF-L9Ir6OZSIioOmMFDx029EZ8IGh1I3w4BYPcbRhB38QUXusAbxpB5SAkqkrmUHNHRR0AbvwM',
});
// creation du calendrier
const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

const eventStartTime = new Date(2021, 3, 24); // creation de la date de depart
eventStartTime.setHours(17); // def de l'heure
eventStartTime.setMinutes(30); // def de l'heure
eventStartTime.setSeconds(0); // def de l'heureeventStartTime.setMinutes(); //def de l'heure

const eventEndTime = new Date(2021, 3, 24); // creation de la date de fin
eventEndTime.setHours(18); // def de l'heure
eventEndTime.setMinutes(30); // def de l'heure
eventEndTime.setSeconds(0); // def de l'heure

const event = {
  summary: `test sdv 2`,
  location: `pau, stade d'eaux vives`,
  description: `Ceci est une super desvcription`,
  colorId: 1,
  start: {
    dateTime: eventStartTime,
    timeZone: 'America/Denver',
  },
  end: {
    dateTime: eventEndTime,
    timeZone: 'America/Denver',
  },
};

calendar.freebusy.query(
  {
    resource: {
      timeMin: eventStartTime,
      timeMax: eventEndTime,
      timeZone: 'America/Denver',
      items: [{ id: 'primary' }],
    },
  },
  (err, res) => {
    if (err) return console.error('Free Busy Query Error: ', err);

    const eventArr = res.data.calendars.primary.busy;

    if (eventArr.length === 0)
      return calendar.events.insert(
        { calendarId: 'primary', resource: event },
        (err) => {
          if (err) return console.error('Error Creating Calender Event:', err);
          return console.log('Calendar event successfully created.');
        }
      );

    return console.log(`Sorry I'm busy...`);
  }
);
