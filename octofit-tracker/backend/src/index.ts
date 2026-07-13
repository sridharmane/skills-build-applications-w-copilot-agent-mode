import express from "express";
import "./config/database";
import apiRoutes from "./routes/api";

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());
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
