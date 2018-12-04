const f = require('faker');
const insertData = async db => {
	for (var i = 0; i < 50; i++) {
		await db.collection('posts').insertOne({
			title: f.lorem.word(),
			text: f.lorem.text()
		});
	}
};
module.exports = {
	async up(db) {
		try {
			const col = await db.listCollections({ name: 'posts' }).toArray();
			if (col.length < 50) {
				await insertData(db);
			} else {
				console.log('Collection post already has data');
			}
		} catch (err) {
			throw err;
		}
	},

	async down(db) {}
};
