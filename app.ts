import { dropTrends } from "./lib/dropTrends.js";
import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import { places } from "./lib/places.js";

const port = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());

app.post("/drop", async (req, res) => {
  const places = req.body;
  await dropTrends(places);
  res.status(200).json({ message: "success" });
});

app.get("/", async (req, res) => {
  await dropTrends(places);
  res.send("done");
});

app.listen(port, () => console.log(`Server started at port->${port}`));
