import express from "express";
import "./config/database";
import apiRoutes from "./routes/api";

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CORS_ORIGIN ?? "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});
app.use("/api", apiRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.listen(port, () => {
  console.log(`OctoFit backend listening on ${baseUrl}`);
});
