const createCollection = async db => {
  await db.createCollection('posts', {
    validator: {
      $and: [{ title: { $type: 'string' } }, { text: { $type: 'string' } }]
    },
    validationAction: 'error',
    validationLevel: 'strict'
  });
};

module.exports = {
  async up(db) {
    try {
      const col = await db.listCollections({ name: 'posts' }).toArray();
      if (col.length > 0) {
        console.log('Collection post already exists in MongoDb. Exited...');
      } else {
        await createCollection(db);
      }
    } catch (err) {
      throw err;
    }
  },

  async down(db) {
    try {
      await db.dropCollection('posts');
    } catch (err) {
      throw err;
    }
  }
};
