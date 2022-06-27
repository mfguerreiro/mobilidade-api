import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
//dotenv
import env from 'dotenv';
env.config();

//sentry global
import SentryConfig from "./config/sentry";

/*
if (process.env.SERVER_DEV === "DEV") {
  global.Sentry = class {
    static captureMessage(value) {
      console.info(value);
    }
    static captureException(value) {
      console.error(value);
    }
  };
  
} else {
  //sentry global
  global.Sentry = SentryConfig;
  app.use(SentryConfig.Handlers.errorHandler());
}
*/

//models
import './models/sql';

//routes
import routes from './config/routes';

class Index {
  constructor() {
    this.port = process.env.SERVER_PORT || 5000;
    this.server = express();

    this.middlewares();
    this.routes();
    this.runServer(this.port);
  }

  middlewares() {
    this.server.use(
      express.json({
        limit: '30mb',
      })
    );

    this.server.use(
      bodyParser.json({
        strict: true,
      })
    );
    this.server.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );

    const corsOptions = {
      exposedHeaders: ['x-total-count', 'x-draw'],
    };

    this.server.use(cors(corsOptions));
  }

  routes() {
    this.server.use(routes);
  }

  

  runServer(port) {
    this.server.listen(port, "0.0.0.0", () => {
      console.info('Server is running on PORT ', port);
    });
  }
}

export default new Index().server;