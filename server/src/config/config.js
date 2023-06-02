import dotenv from "dotenv";
import express from "express";
import cors from "cors";

export const configHandler = (app) => {
  dotenv.config();
  app.use(
    cors({
      origin: "*", // process.env.CLIENT_URL,
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};
