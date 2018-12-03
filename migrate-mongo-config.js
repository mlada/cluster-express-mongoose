require('dotenv').config();

module.exports = {
	mongodb: {
		url: process.env.DB_HOST,
		databaseName: process.env.DB_NAME,
		options: {
			useNewUrlParser: true
		}
	},
	migrationsDir: 'migrations',
	changelogCollectionName: 'changelog'
};
