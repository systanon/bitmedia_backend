const { Model } = require("objection");

class UsersStatisticServices extends Model {
  static tableName = "users_statistic";

  static getAllUsersStatistic() {
    return UsersStatisticServices.query();
  }

  static getStatisticForUser(user_id) {
    return UsersStatisticServices.query().where({ user_id });
  }
}

module.exports = UsersStatisticServices;
