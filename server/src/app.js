import datasetRoutes from "./routes/datasetRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/dataset", datasetRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Enterprise Data Analytics API is Running 🚀"
    });
});

export default app;