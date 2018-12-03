module.exports = {
	async up(db) {
		try {
			await db
				.collection('user')
				.find()
				.forEach(document => {
					db.collection('user').updateOne(
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
