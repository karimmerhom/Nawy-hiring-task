import dotenv from "dotenv";

dotenv.config();

import express, { Request, Response, NextFunction, Router } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import swaggerUi from "swagger-ui-express";
import ListingRouter from "./api/routers/listing.router";
import OptionsRouter from "./api/routers/options.router";

import { connectDB } from "./config/dbConfig";
import { swaggerDocs } from "./swagger-docs";

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/listing", ListingRouter);
app.use("/options", OptionsRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Default route
app.get("/", (req: Request, res: Response) => res.send("Home Page Route"));

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).send({ err: "No such url" });
});

// CORS headers (ensure it's after all other middleware)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, X-Auth-Token, Accept",
  );
  next();
});

// Connect to the database
connectDB();

const port = process.env.PORT || 5936;

server.listen(port, () => console.log(`Server up and running on port ${port}`));
