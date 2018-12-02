require("dotenv").config();

module.exports = {
  mongodb: {
    url: process.env.DB_HOST,
    databaseName: "cluster-express",
    options: {
      useNewUrlParser: true
    }
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog"
};
