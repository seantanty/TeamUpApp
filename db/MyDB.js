const { MongoClient, ObjectId } = require("mongodb");

function MyDB() {
  const myDB = {};

  // const url = process.env.MONGODB_URI;
  const url =
    "mongodb+srv://seantan:TanWeb5610Ge@cluster0.u90qt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const DB_NAME = "5610Project3";

  myDB.createPost = async (post) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const postsCol = db.collection("posts");
      const u_id = new ObjectId(post.userId);
      //plan to add a post backend verification
      const res1 = await postsCol.insertOne(post);
      const p_id = new ObjectId(res1.ops[0]._id);
      const res2 = await db.collection("Users").updateOne(
        { _id: u_id },
        {
          $push: {
            posted: {
              _id: p_id,
              title: post.title,
              createdAt: post.createdAt,
            },
          },
        }
      );
      return { res1, res2, p_id };
    } finally {
      client.close();
    }
  };

  myDB.createComment = async (comment, userId, username, postId) => {
    let client;
    try {
      const u_id = new ObjectId(userId);
      comment.user = { _id: u_id };
      const p_id = new ObjectId(postId);
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const newId = new ObjectId();
      //need to add a post backend verification
      const res = await db.collection("posts").updateOne(
        { _id: p_id },
        {
          $push: {
            comments: {
              _id: newId,
              userId: u_id,
              username: username,
              content: comment.comment,
              createdAt: new Date(),
            },
          },
        }
      );
      return res;
    } finally {
      client.close();
    }
  };

  myDB.likePost = async (userId, username, post) => {
    let client;
    try {
      const u_id = new ObjectId(userId);
      const p_id = new ObjectId(post._id);
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const res1 = await db.collection("posts").updateOne(
        { _id: p_id },
        {
          $push: {
            interested: {
              userId: u_id,
              username: username,
            },
          },
        }
      );
      const res2 = await db.collection("Users").updateOne(
        { _id: u_id },
        {
          $push: {
            interested: {
              _id: p_id,
              title: post.title,
              createdAt: new Date(),
            },
          },
        }
      );
      return { res1, res2 };
    } finally {
      client.close();
    }
  };

  myDB.unlikePost = async (userId, postId) => {
    let client;
    try {
      const u_id = new ObjectId(userId);
      const p_id = new ObjectId(postId);
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const res1 = await db.collection("posts").updateOne(
        { _id: p_id },
        {
          $pull: {
            interested: {
              userId: u_id,
            },
          },
        }
      );
      const res2 = await db.collection("Users").updateOne(
        { _id: u_id },
        {
          $pull: {
            interested: {
              post_id: p_id,
            },
          },
        }
      );
      return { res1, res2 };
    } finally {
      client.close();
    }
  };

  myDB.createTeam = async (post, teamMembers) => {
    let client;
    try {
      console.log(teamMembers);
      const p_id = new ObjectId(post._id);
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const res1 = await db.collection("posts").updateOne(
        { _id: p_id },
        {
          $set: {
            groupMember: teamMembers,
            open: false,
          },
        }
      );

      const res2 = await db.collection("Users").updateMany(
        { username: { $in: teamMembers } },
        {
          $push: {
            teamuped: {
              _id: p_id,
              title: post.title,
              createdAt: post.createdAt,
            },
          },
        }
      );
      return { res1, res2 };
    } finally {
      client.close();
    }
  };

  myDB.getComments = async (query) => {
    let client;
    try {
      const p_id = new ObjectId(query);
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const postsCol = db.collection("posts");
      const post = await postsCol.find({ _id: p_id }).toArray();
      return post[0].comments;
    } finally {
      client.close();
    }
  };

  myDB.getPosts = async (query) => {
    let client;
    try {
      const titleQuery = query.query || "";
      const catQuery = query.category || "";
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const postsCol = db.collection("posts");
      const posts = await postsCol
        .find({ category: { $regex: catQuery }, title: { $regex: titleQuery } })
        .sort({ createdAt: -1 })
        .toArray();
      return posts;
    } finally {
      client.close();
    }
  };

  myDB.getPostById = async (query) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const postsCol = db.collection("posts");
      let o_id = new ObjectId(query);
      const post = await postsCol.find({ _id: o_id }).toArray();
      return post[0];
    } finally {
      client.close();
    }
  };

  //user register
  myDB.createUser = async (user) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const usersCol = db.collection("Users");
      const existed = await usersCol.findOne({ username: user.username });
      if (existed != null) {
        return null;
      } else {
        const res = await usersCol.insertOne(user);
        return res;
      }
    } finally {
      client.close();
    }
  };

  //check if same username exist
  myDB.findSameUserName = async (query = {}) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const userCol = db.collection("Users");
      const data = await userCol.find(query).toArray();

      if (data != null && data.length == 1) {
        if (data[0].username === query.username) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } finally {
      client.close();
    }
  };

  myDB.findUserByUserName = async (query = {}, done) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const userCol = db.collection("Users");
      const data = await userCol.find(query).toArray();

      if (data != null && data.length == 1) {
        return done(null, data[0]);
      } else {
        return done(null, null);
      }
    } finally {
      client.close();
    }
  };

  myDB.findUserById = async (query = {}, done) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const userCol = db.collection("Users");
      const data = await userCol.find(query).toArray();

      if (data != null && data.length == 1) {
        return done(null, data[0]);
      } else {
        return done(null, null);
      }
    } finally {
      client.close();
    }
  };

  myDB.getUserByName = async (query) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const userCol = db.collection("Users");
      const data = await userCol.find({ username: query }).toArray();
      return data;
    } finally {
      client.close();
    }
  };

  //below code are from previous project, use as reference

  // Get popular puzzles for displaying leader boards.
  myDB.getPuzzles = async () => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const filesCol = db.collection("puzzles");
      const files = await filesCol
        .aggregate([
          {
            $project: {
              leaderBoard: 1,
              length: { $size: "$usersPlayed" },
              code: 1,
            },
          },
          { $sort: { length: -1 } },
          { $limit: 3 },
        ])
        .toArray();
      return files;
    } finally {
      client.close();
    }
  };

  // get the puzzle searched by puzzle id
  myDB.getPuzzleById = async (query) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const filesCol = db.collection("puzzles");
      const files = await filesCol.find({ code: query }).toArray();
      return files[0];
    } finally {
      client.close();
    }
  };

  // get three puzzles for each size for playing
  myDB.getPuzzleBySize = async () => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const filesCol = db.collection("puzzles");
      const files = new Array(3);
      var sizes = new Array(5, 10, 15);
      for (var i = 0; i < 3; i++) {
        const file = await filesCol
          .aggregate([{ $match: { size: sizes[i] } }, { $sample: { size: 1 } }])
          .toArray();
        files[i] = file;
      }

      return files;
    } finally {
      client.close();
    }
  };

  //save time to leaderboard if the time is in top 10.
  //leaderboard only maintain top 10(shortest) time with its user
  myDB.saveToLeaderBoard = async (query = {}) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const puzzleCol = db.collection("puzzles");
      let o_id = new ObjectId(query.puzzleId);
      const data = await puzzleCol.find({ _id: o_id }).toArray();

      let res = null;
      let dbLb = data[0].leaderBoard;

      if (query.index == 11 || dbLb.length == undefined) {
        res = await db.collection("puzzles").updateOne(
          { _id: data[0]._id },
          {
            $push: { leaderBoard: { 0: query.username, 1: query.time } },
          }
        );
      } else {
        if (query.trim == true) {
          let pos = query.index;
          res = await db.collection("puzzles").updateOne(
            { _id: data[0]._id },
            {
              $push: {
                leaderBoard: {
                  $each: [{ 0: query.username, 1: query.time }],
                  $position: pos,
                },
              },
            }
          );
          res = await db.collection("puzzles").updateOne(
            { _id: data[0]._id },
            {
              $pop: {
                leaderBoard: 1,
              },
            }
          );
        } else {
          let pos = query.index;
          res = await db.collection("puzzles").updateOne(
            { _id: data[0]._id },
            {
              $push: {
                leaderBoard: {
                  $each: [{ 0: query.username, 1: query.time }],
                  $position: pos,
                },
              },
            }
          );
        }
      }
      return res;
    } finally {
      client.close();
    }
  };

  //save played puzzle time to user only if the time is better then previous time
  myDB.saveTimeToUser = async (query = {}) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const userCol = db.collection("Users");
      let findUserQuery = { username: query.username };
      const data = await userCol.find(findUserQuery).toArray();

      let res = { result: "No need to update" };
      let games = data[0].played;

      //if time is better then current or there is no time yet
      if (games.length == 0) {
        //add puzzleId with time to array
        res = await db.collection("Users").updateOne(
          { _id: data[0]._id },
          {
            $push: { played: { gameId: query.puzzleCode, time: query.time } },
          }
        );
      } else {
        let index = null;
        for (let i = 0; i < games.length; i++) {
          if (games[i].gameId == query.puzzleCode) {
            index = i;
            break;
          }
        }
        if (games.length == undefined) {
          res = await db.collection("Users").updateOne(
            { _id: data[0]._id },
            {
              $push: { played: { gameId: query.puzzleCode, time: query.time } },
            }
          );
        } else if (index != null) {
          if (query.time < games[index].time) {
            //replace existing puzzleId's time
            let updateQuery = {
              _id: data[0]._id,
              "played.gameId": query.puzzleCode,
            };
            let updateDoc = {
              $set: { "played.$.time": query.time },
            };
            res = await db
              .collection("Users")
              .updateOne(updateQuery, updateDoc);
          }
        } else if (index == null) {
          //first time play game, add puzzleId with time to array
          res = await db.collection("Users").updateOne(
            { _id: data[0]._id },
            {
              $push: { played: { gameId: query.puzzleCode, time: query.time } },
            }
          );
        }
      }
      return res;
    } finally {
      client.close();
    }
  };

  return myDB;
}

module.exports = MyDB();
