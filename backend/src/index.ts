import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import propertiesRouter from "./routes/properties";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// 'exMPK'
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/properties", propertiesRouter);

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
