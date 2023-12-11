import express from 'express';
import config from 'config';
import * as dotenv from "dotenv";
import log from './utils/logger';
import connect from './utils/connect';
import routes from './utils/routes';
import deserializeUser from './middleware/deserializeUser';

dotenv.config();
// const port = config.get<number>("port");
// const host = config.get<string>("host");
const host = process.env.HOST || 'localhost';
const port = parseInt(process.env.PORT || '1337', 10);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(deserializeUser);

app.listen(port, host, async () => {
    log.info(`Server listing at http://${host}:${port}`);
    await connect();
    routes(app);

});