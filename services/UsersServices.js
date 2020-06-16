const { Model } = require("objection");

class UsersServices extends Model {
  static tableName = "users";

  static getUsersFromDatabase() {
    return UsersServices.query()
  }

  static getAllUsers(page = 1, limit = 50) {
    return UsersServices.query().page(+page - 1, +limit);
  }
  static getUserById(id) {
    return UsersServices.query().where({ id });
  }
}

module.exports = UsersServices;
