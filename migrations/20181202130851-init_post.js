const createCollection = async db => {
  await db.createCollection("post", {
    validator: {
      $and: [{ title: { $type: "string" } }, { text: { $type: "string" } }]
    },
    validationAction: "error",
    validationLevel: "strict"
  });
};

module.exports = {
  async up(db) {
    try {
      const col = await db.listCollections({ name: "post" }).toArray();
      if (col.length > 0) {
        console.log("Collection post already exists in MongoDb. Exited...");
      } else {
        await createCollection(db);
      }
    } catch (err) {
      throw err;
    }
  },

  async down(db) {
    try {
      await db.dropCollection("post");
    } catch (err) {
      throw err;
    }
  }
};
