import { Handler } from "express";

export const basicRouteController: Handler = (req, res) => {
  res.send("HELLO");
};
