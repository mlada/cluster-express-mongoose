module.exports = {
  async up(db) {
    try {
      await db
        .collection('users')
        .updateMany(
          { age: { $exists: false } },
          { $set: { age: 0 } },
          { multi: false }
        );
      console.log('updated');
    } catch (err) {
      throw err;
    }
  },
  async down(db) {}
};
