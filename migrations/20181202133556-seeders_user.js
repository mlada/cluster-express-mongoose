const f = require("faker");
const insertData = async db => {
  for (var i = 0; i < 50; i++) {
    await db.collection("user").insertOne({
      id: i,
      name: f.name.firstName(),
      username: f.internet.userName(),
      password: f.internet.password()
    });
  }
};
module.exports = {
  async up(db) {
    try {
      const col = await db.listCollections({ name: "user" }).toArray();
      if (col.length < 50) {
        await insertData(db);
      } else {
        console.log("Collection user already has data");
      }
    } catch (err) {
      throw err;
    }
  },

  async down(db) {}
};
