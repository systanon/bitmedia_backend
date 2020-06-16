const Router = require("@koa/router");
const router = new Router();
const usersServices = require("../../services/UsersServices");
const UsersStatisticServices = require("../../services/UsersStatisticServices");
const sortHelper = require("../../helper/helper");

router.get("/api/users", async (ctx) => {
  const { _page: page, _limit: limit } = ctx.request.query;
  const { results, total } = await usersServices.getAllUsers(page, limit);
  ctx.set({ "X-Total-Count": `${total}` });
  ctx.body = { results, total };
});

router.get("/api/users/:id", async (ctx) => {
  const { id } = ctx.params;
  const data = sortHelper(await UsersStatisticServices.getStatisticForUser(id));
  const userName = await usersServices.getUserById(id);
  const result = data.map((item) => {
    return {
      date: new Date(item.date).toLocaleDateString(),
      page_views: item.page_views,
      clicks: item.clicks,
    };
  });

  ctx.body = {result,  userName };
});

module.exports = router;
