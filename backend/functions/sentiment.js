export const getSentiment = async (client, database, username, texts) => {
  let sentimentScore = 0;

  for (const text of texts) {
    const document = {
      content: text,
      type: "PLAIN_TEXT",
    };
    const [result] = await client.analyzeSentiment({ document: document });
    sentimentScore +=
      result.documentSentiment.score * result.documentSentiment.magnitude;
  }
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date().toLocaleDateString(undefined, options);
  const userRef = database.ref(`users/${username}/sentiment/${date}`);
  userRef.set({
    score: sentimentScore,
  });
};
