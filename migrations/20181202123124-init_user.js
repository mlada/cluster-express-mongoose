const createCollection = async db => {
  await db.createCollection("user", {
    validator: {
      $and: [
        { id: { $type: "number" } },
        { name: { $type: "string" } },
        { username: { $type: "string" } },
        { password: { $type: "string" } }
      ]
    },
    validationAction: "error",
    validationLevel: "strict"
  });
};
module.exports = {
  async up(db) {
    try {
      const col = await db.listCollections({ name: "user" }).toArray();
      if (col.length > 0) {
        console.log("Collection user already exists in MongoDb. Exited...");
      } else {
        await createCollection(db);
      }
    } catch (err) {
      throw err;
    }
  },

  async down(db) {
    try {
      await db.dropCollection("user");
    } catch (err) {
      throw err;
    }
  }
};
