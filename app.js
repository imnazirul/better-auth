import express from "express";
import cors from "cors";
const app = express();
import { toNodeHandler } from "better-auth/node";
import { auth } from "./src/lib/auth.js";
import cookieParser from "cookie-parser";
import UserRouter from "./src/routes/users.route.js";

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // Your Next.js URL
    credentials: true, // Allow cookies to be sent
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());

app.all("/api/auth/*", toNodeHandler(auth));

// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());

app.use("/api", UserRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Better Auth app listening on port ${port}`);
});

export default app;
