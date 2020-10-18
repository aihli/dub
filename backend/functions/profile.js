export const createProfile = (database, username, password) => {
  const userRef = database.ref(`users/${username}`);
  userRef.once("value").then((snapshot) => {
    if (!snapshot.val()) {
      userRef.set({
        username: username,
        password: password,
      });
      return true;
    }
    return false;
  });
};

export const getWeeklySentimentInfo = async (database, username) => {
  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const sentimentInfo = [];
  for (let i = 0; i < 7; ++i) {
    const date = today.toLocaleDateString(undefined, options);
    const userRef = database.ref(`users/${username}/sentiment/${date}`);
    await userRef.once("value").then((snapshot) => {
      if (!snapshot.val()) {
        sentimentInfo.push(0);
      } else {
        sentimentInfo.push(snapshot.val().score);
      }
    });
    today.setDate(today.getDate() - 1);
  }
  sentimentInfo.reverse();
  console.log(sentimentInfo);
};

export const addFriend = (database, username, friendname) => {
  const userRef = database.ref(`users/${username}`);
  userRef.once("value").then((snapshot) => {
    if (!snapshot.val()) {
      return;
    }
    let friends = [friendname];
    if (snapshot.val().friends) {
      friends = snapshot.val().friends;
      friends.push(friendname);
    }
    userRef.update({
      friends: friends,
    });
  });
};
