const path = require("path");
const { Seeder } = require("mongo-seeding");

const config = {
  database: {
    name: "task-manager-api",
  },
  dropDatabase: true,
};
const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(path.resolve("./src/seeds"), {
  extensions: ["ts", "js", "json"],
  transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId],
});

seeder
  .import(collections)
  .then(() => {
    console.log("Success");
  })
  .catch((err) => {
    console.log("Error", err);
  });
