import { dropTrends } from "./lib/dropTrends.js";
import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";

const port = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());

app.post("/drop", async (req, res) => {
  const places = req.body;
  await dropTrends(places);
  res.status(200).json({ message: "success" });
});

app.listen(port, () => console.log(`Server started at port->${port}`));
