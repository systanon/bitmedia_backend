const knex = require("knex");
const { Model } = require("objection");
const fs = require("fs");
const path = require("path");
const UserServices = require("../services/UsersServices");
const UsersStatisticServices = require("../services/UsersStatisticServices");

const db = knex({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "bitmedia",
  },
});

Model.knex(db);

const insertToTable = async (data, tableName) => {
  await db(`${tableName}`).insert(data);
};

db.schema
  .hasTable("users")
  .then(function (exists) {
    if (!exists) {
      return db.schema.createTable("users", function (t) {
        t.increments("id").primary();
        t.string("first_name", 50);
        t.string("last_name", 50);
        t.string("email", 50);
        t.string("gender", 50);
        t.string("ip_address", 100);
      });
    }
  })
  .then(() => {
    fs.readFile(path.join(__dirname, "./users.json"), "utf-8", (err, data) => {
      if (err) console.error(err);
      const userData = JSON.parse(data);
      (async function () {
        const users = await UserServices.getUsersFromDatabase();
        if (users.length === 0) {
          userData.forEach((user) => {
            const {
              id,
              first_name,
              last_name,
              email,
              gender,
              ip_address,
            } = user;
            insertToTable(
              { id, first_name, last_name, email, gender, ip_address },
              "users"
            );
          });
        }
      })();
    });
  });

db.schema
  .hasTable("users_statistic")
  .then(function (exists) {
    if (!exists) {
      return db.schema.createTable("users_statistic", function (t) {
        t.increments("id").primary();
        t.integer("user_id");
        t.date("date");
        t.integer("page_views");
        t.integer("clicks");
      });
    }
  })
  .then(() => {
    fs.readFile(
      path.join(__dirname, "./users_statistic.json"),
      "utf-8",
      (err, data) => {
        if (err) console.error(err);
        const userData = JSON.parse(data);
        (async function () {
          const statistics = await UsersStatisticServices.getAllUsersStatistic();
          if (statistics.length === 0) {
            userData.forEach((user) => {
              const { user_id, date, page_views, clicks } = user;
              insertToTable(
                { user_id, date, page_views, clicks },
                "users_statistic"
              );
            });
          }
        })();
      }
    );
  });

Model.knex(db);

module.exports = db;
