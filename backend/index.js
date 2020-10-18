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

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

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
  const [sentiments, days] = await getWeeklySentimentInfo(database, username);
  res.json({
    sentiments: sentiments,
    days: days,
  });
});

app.post("/sentiment", async (req, res) => {
  const { username, texts } = req.body;
  const sentimentScore = await getSentiment(client, database, username, texts);
  res.json({
    sentimentScore: sentimentScore,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
