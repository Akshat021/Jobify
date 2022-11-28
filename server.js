import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import morgan from "morgan";

// all this bcz we are using es6 modules
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// securing server
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

// db and authenticateUser
import connectDB from "./db/connect.js";

// routers
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";

//Middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.json());

// security middlewares
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

// redirecting to front-end index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware); // after app.get() so that it runs after all routes is being checked
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server is listening at ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
