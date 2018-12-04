module.exports = {
	async up(db) {
		try {
			await db
				.collection('users')
				.find()
				.forEach(document => {
					db.collection('users').updateOne(
						{ _id: document._id },
						{
							$unset: { age: 0 }
						}
					);
				});
		} catch (err) {
			throw err;
		}
	},

	async down(db) {}
};
