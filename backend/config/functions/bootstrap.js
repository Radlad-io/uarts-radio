"use strict";

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/concepts/configurations.html#bootstrap
 */

 const fs = require("fs");
 const readline = require("readline");
 const { google } = require("googleapis");
 const OAuth2 = google.auth.OAuth2;

 // If modifying these scopes, delete your previously saved credentials
 // at ~/.credentials/youtube-nodejs-quickstart.json
 const SCOPES = ["https://www.googleapis.com/auth/youtube.readonly"];
 const TOKEN_DIR =
   (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) +
   "/.credentials/";
 const TOKEN_PATH = TOKEN_DIR + "youtube-nodejs-quickstart.json";

module.exports = () => {

  // Load client secrets from a local file.
  fs.readFile(
    "client_secret.json",
    function processClientSecrets(err, content) {
      if (err) {
        console.log("Error loading client secret file: " + err);
        return;
      }
      // Authorize a client with the loaded credentials, then call the YouTube API.
      authorize(JSON.parse(content), getChannel);
    }
  );

  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   */
  function authorize(credentials, callback) {
    const clientSecret = credentials.installed.client_secret;
    const clientId = credentials.installed.client_id;
    const redirectUrl = credentials.installed.redirect_uris[0];
    const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function (err, token) {
      if (err) {
        getNewToken(oauth2Client, callback);
      } else {
        oauth2Client.credentials = JSON.parse(token);
        callback(oauth2Client);
      }
    });
  }

  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   */
  function getNewToken(oauth2Client, callback) {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    console.log("Authorize this app by visiting this url: ", authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Enter the code from that page here: ", function (code) {
      rl.close();
      oauth2Client.getToken(code, function (err, token) {
        if (err) {
          console.log("Error while trying to retrieve access token", err);
          return;
        }
        oauth2Client.credentials = token;
        storeToken(token);
        callback(oauth2Client);
      });
    });
  }

  /**
   * Store token to disk be used in later program executions.
   */
  function storeToken(token) {
    try {
      fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
      if (err.code != "EEXIST") {
        throw err;
      }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
      if (err) throw err;
      console.log("Token stored to " + TOKEN_PATH);
    });
  }

  /**
   * Lists the names and IDs of up to 10 files.
   */
  
  function getChannel(auth) {
    const service = google.youtube("v3");
    service.channels.list(
      {
        auth: auth,
        part: "snippet,contentDetails,statistics",
        forUsername: "GoogleDevelopers",
      },
      function (err, response) {
        if (err) {
          console.log("The API returned an error: " + err);
          return;
        }
        const channels = response.data.items;
        if (channels.length == 0) {
          console.log("No channel found.");
        } else {
          console.log(
            "This channel's ID is %s. Its title is '%s', and " +
              "it has %s views.",
            channels[0].id,
            channels[0].snippet.title,
            channels[0].statistics.viewCount
          );
        }
      }
    );
  }
};