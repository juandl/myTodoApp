import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

//Database
import './database';

//Routers
import ToDoRouter from './api/todo.router';

/**
 * Initialize environment variables.
 */
dotenv.config();

const app = express();

app.set('port', process.env.PORT || '4000');
app.set('host', process.env.APP_HOST || '0.0.0.0');

app.use(
  cors({
    origin: '*',
  })
);
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());

//Define router API TO-TODO
app.use('/api', ToDoRouter);

//Handle errors
app.use(function (err, req, res, next) {
  res.status(err.error || 500).send({ error: err.error, msg: err.msg });
});

// tslint:disable-next-line:no-console
app.listen(app.get('port'), app.get('host'), () => {
  console.log(
    `Server started at http://${app.get('host')}:${app.get('port')}/api`
  );
});
