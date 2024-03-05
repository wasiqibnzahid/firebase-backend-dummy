import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { v1Routes } from "@/routes";
// This import to trigger initialization
import "@/firebase/init";
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.listen(PORT, () => {
  console.log("APP IS LISTENING ON PORT ", PORT);
});

app.use("v1", v1Routes);
