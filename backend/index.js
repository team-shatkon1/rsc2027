import dotenv from "dotenv";
import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from './db/db.js';
import ipsRouter from "./routes/ips.router.js";
import posterRouter from "./routes/poster.router.js";
import workshopRouter from "./routes/workshop.router.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
    res.status(200).json({ status: 'active', message: 'RSC 2027 Server is awake', timestamp: new Date().toISOString() });
});

app.use("/api/ips", ipsRouter);
app.use("/api/poster", posterRouter);
app.use("/api/workshop", workshopRouter);

// Serve frontend build if present (for unified single deployment)
const frontendDistPath = path.resolve(__dirname, "../frontend/dist");

if (fs.existsSync(frontendDistPath)) {
    app.use(express.static(frontendDistPath));

    // Catch-all route for Single Page Application (React Router)
    app.get("*", (req, res, next) => {
        if (req.path.startsWith("/api") || req.path === "/ping") {
            return next();
        }
        res.sendFile(path.join(frontendDistPath, "index.html"));
    });
} else {
    app.get('/', (req, res) => {
        res.send('RSC 2027 Server is live!');
    });
}

// Render Free tier spins down after 15 minutes of inactivity.
// This keep-alive self-pings the server every 14 minutes while running.
const setupKeepAlive = () => {
    // Render automatically injects RENDER_EXTERNAL_URL (e.g. https://service.onrender.com)
    const serverUrl = process.env.RENDER_EXTERNAL_URL || process.env.SERVER_URL || process.env.BACKEND_URL;

    if (serverUrl) {
        const INTERVAL_MS = 14 * 60 * 1000; // 14 minutes
        console.log(`[Keep-Alive] Scheduled for ${serverUrl}/ping every 14 minutes.`);

        setInterval(async () => {
            try {
                const response = await fetch(`${serverUrl}/ping`);
                console.log(`[Keep-Alive] Ping sent: ${response.status} ${response.statusText}`);
            } catch (err) {
                console.error(`[Keep-Alive] Ping failed:`, err.message);
            }
        }, INTERVAL_MS);
    } else {
        console.log("[Keep-Alive] Set RENDER_EXTERNAL_URL or SERVER_URL to enable self-ping.");
    }
};

app.listen(PORT, () => {
    connectDB();
    setupKeepAlive();
    console.log(`Server running on port ${PORT}`);
});

