import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import userRoute from './routes/userRoute.js';
import postRouter from './routes/postRoute.js';
import errorHandler from './middleware/errorMiddleware.js';
import genericRouter from './routes/genericRoute.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// Routes
app.use("/api/users", userRoute);
app.use("/api/posts", postRouter);
app.use("/api/content", genericRouter);
app.get("/", (req, res) => { res.send("Home Page"); });

// Error handler middleware
app.use(errorHandler);

export default app;