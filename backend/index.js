import * as firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "./config.js";
import language from "@google-cloud/language";
import express from "express";
import { getSentiment } from "./functions/sentiment";
import {
  addFriend,
  createProfile,
  getWeeklySentimentInfo,
} from "./functions/profile";

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const client = new language.LanguageServiceClient();
const app = express();
const port = 8080;

app.use("/", (req, res) => {
  res.send("hello world");
});

// getSentiment(client, ["I really don't feel super great, ever since the quarantine started. My life fucking sucks"]);

// createProfile(database, "jimmy", "neutron");
// getWeeklySentimentInfo(database, "jimmy");
// getSentiment(client, database, "jimmy", ["HELLO THIS IS THE WORST DAY OF MY LIFE"]);

// addFriend(database, "jimmy", "remy");
// createProfile(database, "remy", "10293");
addFriend(database, "remy", "jimmy");

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
