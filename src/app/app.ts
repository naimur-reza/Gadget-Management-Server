import express, { type Application } from "express";
import cors from "cors";
import router from "./routes";
import { errorHandler } from "./errors/GlobalError";
import { notFound } from "./errors/NotFound";

export const app: Application = express();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: "https://gadget-management-frontend-naimur-reza.vercel.app",
    credentials: true,
  }),
);

app.use("/api/v1", router);

// global error handler
app.use(errorHandler);

// not found router handler
app.use(notFound);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Gadget management server is running",
  });
});
