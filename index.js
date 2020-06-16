const Koa = require('koa');
const app = new Koa();
const cors = require('@koa/cors');
const users = require('./Routes/users/users')
require('./db/db')

app.use(cors({
    "Access-Control-Allow-Headers":"X-Total-Count"
}));


const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');

app.use(koaStatic('./build'))
app.use(bodyParser());
app.use(users.routes())


app.listen(5000);






