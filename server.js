import express from "express";
import helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import hpp from "hpp";

import xss from "xss";

import reminder from "./routes/reminder.js";

import { handleError } from "./middlewares/error.js";

import database from "./models/index.js";

//Connect Database

const start = async () => {
  try {
    await database.sequelize.authenticate();
    await database.sequelize.sync({ ALTER: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

database.sequelize.sync({ alter: true });

const app = express();

//body parser
app.use(express.json());

// set security headers
app.use(helmet());

// Prevent XSS attacks
// app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use(hpp());

app.use(cors());

// mount route files
app.use("/api/v1/reminders", reminder);

app.use((err, req, res, next) => {
  handleError(err, res);
});

//   app.use(errorHandler)

const PORT = process.env.PORT || 6000;

start()
  .then(() => {
    console.log("Database connected");
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `The server is listening on ${PORT} in ${process.env.NODE_ENV}`
      );
    });
  });
