import * as firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "./config.js";
import language from "@google-cloud/language";
import express from "express";
import cors from "cors";
import { getSentiment } from "./functions/sentiment";
import {
  addFriend,
  createProfile,
  getWeeklySentimentInfo,
  getFriends,
} from "./functions/profile";

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const client = new language.LanguageServiceClient();
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.post("/create", async (req, res) => {
  const { username, password } = req.body;
  const status = await createProfile(database, username, password);
  res.json({
    status: status,
  });
});

app.get("/friends", async (req, res) => {
  const { username } = req.query;
  const friends = await getFriends(database, username);
  console.log(friends);
  res.json({
    friends: friends,
  });
});

app.post("/friends", async (req, res) => {
  const { username, friendname } = req.body;
  const status = await addFriend(database, username, friendname);
  res.json({
    status: status,
  });
});

app.get("/sentiment", async (req, res) => {
  const { username } = req.query;
  const sentiments = await getWeeklySentimentInfo(database, username);
  res.json({
    sentiments: sentiments,
  });
});

app.post("/sentiment", async (req, res) => {
  const { username, texts } = req.body;
  const sentimentScore = await getSentiment(client, database, username, texts);
  res.json({
    sentimentScore: sentimentScore,
  });
});

// getSentiment(client, ["I really don't feel super great, ever since the quarantine started. My life fucking sucks"]);

// createProfile(database, "jimmy", "neutron");
// getWeeklySentimentInfo(database, "jimmy");
// getSentiment(client, database, "jimmy", ["HELLO THIS IS THE WORST DAY OF MY LIFE"]);

// addFriend(database, "jimmy", "remy");
// createProfile(database, "remy", "10293");
// addFriend(database, "remy", "jimmy");

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
