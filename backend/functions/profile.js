export const createProfile = async (database, username, password) => {
  const userRef = database.ref(`users/${username}`);
  const status = await userRef.once("value").then((snapshot) => {
    if (!snapshot.val()) {
      userRef.set({
        username: username,
        password: password,
      });
      return true;
    }
    return false;
  });
  return status;
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
  return sentimentInfo;
};

export const addFriend = async (database, username, friendname) => {
  const userRef = database.ref(`users/${username}`);
  const status = await userRef.once("value").then((snapshot) => {
    if (!snapshot.val()) {
      return false;
    }
    let friends = [friendname];
    if (snapshot.val().friends) {
      friends = snapshot.val().friends;
      friends.push(friendname);
    }
    userRef.update({
      friends: friends,
    });
    return true;
  });
  return status;
};

export const getFriends = async (database, username) => {
  const userRef = database.ref(`users/${username}/friends`);
  const friends = await userRef.once("value").then((snapshot) => {
    console.log(snapshot.val());
    if (!snapshot.val()) {
      return [];
    } else {
      return snapshot.val();
    }
  });
  return friends;
};
