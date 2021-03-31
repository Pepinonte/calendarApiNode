// connexion nike sa mere a l'api
const { google } = require("googleapis");

const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2(
  "787683943283-5pe9joqgvt9trc9fnn4fvl43p6h2psng.apps.googleusercontent.com",
  "XMfdN_Wz54fzoZjaNkbisWJS"
);

oAuth2Client.setCredentials({
  refresh_token:
    "1//04K4XCirtETSvCgYIARAAGAQSNwF-L9Irv6tx7biNmbdMCWUuwI_NBUslbfIJ5Xo3qgCai6kcCSod9a7IFGUTIJOheMfnBdKvTek",
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//creation du calendrier

const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

const eventStartTime = new Date(); //creation de la date de depart
eventStartTime.setDate(31); //def du jour

const eventEndTime = new Date(); //creation de la date de fin
eventEndTime.setDate(31); //def du jour
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45); //def de l'heure

const event = {
  summary: `penis`,
  location: `3595 California St, San Francisco, CA 94118`,
  description: `Meet with David to talk about the new client project and how to integrate the calendar for booking.`,
  colorId: 1,
  start: {
    dateTime: eventStartTime,
    timeZone: "America/Denver",
  },
  end: {
    dateTime: eventEndTime,
    timeZone: "America/Denver",
  },
};

calendar.freebusy.query(
  {
    resource: {
      timeMin: eventStartTime,
      timeMax: eventEndTime,
      timeZone: "America/Denver",
      items: [{ id: "primary" }],
    },
  },
  (err, res) => {
    if (err) return console.error("Free Busy Query Error: ", err);

    const eventArr = res.data.calendars.primary.busy;

    if (eventArr.length === 0)
      return calendar.events.insert(
        { calendarId: "primary", resource: event },
        (err) => {
          if (err) return console.error("Error Creating Calender Event:", err);
          return console.log("Calendar event successfully created.");
        }
      );

    return console.log(`Sorry I'm busy...`);
  }
);
