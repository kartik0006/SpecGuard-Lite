import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import auditRoutes from "./routes/auditRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true
}));

app.get("/", (req, res) => {
  res.json({ message: "Backend working" });
});

app.use("/api/audit", auditRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});