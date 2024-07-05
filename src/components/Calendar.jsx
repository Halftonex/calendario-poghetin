import React, { useEffect } from "react";

export const Calendar = ({ setPeople }) => {
  const gapi = window.gapi;
  const google = window.google;

  const CLIENT_ID =
    "707770502452-r4ktovb9ufk3qtul3ukp13eiusgqcooa.apps.googleusercontent.com";
  const API_KEY = "AIzaSyA9vtQwmRHuMuQouZq8Qe1alBV6l_sJM9A";
  const DISCOVERY_DOC =
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
  const SCOPES = "https://www.googleapis.com/auth/calendar";

  const accessToken = localStorage.getItem("access_token");
  const expiresIn = localStorage.getItem("expires_in");

  let gapiInited = false,
    gisInited = false,
    tokenClient;

  useEffect(() => {
    gapiLoaded();
    gisLoaded();
  }, []);

  function gapiLoaded() {
    gapi.load("client", initializeGapiClient);
  }

  async function initializeGapiClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });

    gapiInited = true;

    if (accessToken && expiresIn) {
      gapi.client.setToken({
        access_token: accessToken,
        expires_in: expiresIn,
      });

      listUpcomingEvents();
    }
  }

  function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      DISCOVERY_DOC:
        "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
      callback: "", // defined in handleAuthClick
    });

    gisInited = true;
  }

  function handleAuthClick() {
    tokenClient.callback = async (resp) => {
      if (resp.error) {
        throw resp;
      }

      await listUpcomingEvents();

      const { access_token, expires_in } = gapi.client.getToken();

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("expires_in", expires_in);
    };

    if (!(accessToken && expiresIn)) {
      tokenClient.requestAccessToken({ prompt: "consent" });
    } else {
      tokenClient.requestAccessToken({ prompt: "" });
    }
  }

  function handleSignoutClick() {
    const token = gapi.client.getToken();

    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken("");
      localStorage.clear();
    }
  }

  async function listUpcomingEvents() {
    let response;

    try {
      const request = {
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 1000,
        orderBy: "startTime",
      };
      response = await gapi.client.calendar.events.list(request);
    } catch (err) {
      console.error(err.message);
      return;
    }

    const events = response.result.items;

    if (!events || events.length === 0) {
      setPeople({});
      return;
    }

    const people = events.reduce((acc, evt) => {
      if (!acc[evt.summary]) acc[evt.summary] = [];
      acc[evt.summary].push(evt);
      return acc;
    }, {});

    setPeople({ ...people });
  }

  return (
    <div className="d-flex gap-2">
      <button
        type="button"
        className="btn btn-outline-primary"
        id="authorize_button"
        hidden={accessToken && expiresIn}
        onClick={handleAuthClick}
      >
        Accedi con Google
      </button>

      <button
        type="button"
        className="btn btn-outline-primary"
        id="signout_button"
        hidden={!accessToken && !expiresIn}
        onClick={listUpcomingEvents}
      >
        Aggiorna
      </button>
      <button
        type="button"
        className="btn btn-outline-primary"
        id="signout_button"
        hidden={!accessToken && !expiresIn}
        onClick={handleSignoutClick}
      >
        Esci
      </button>
    </div>
  );
};

export default Calendar;
