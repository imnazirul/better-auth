import { Router } from "express";
import { db } from "../database/index.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const UserRouter = Router();
/* GET users listing. */
UserRouter.get("/users", requireAuth, async (req, res, next) => {
  try {
    const data = await db.query.user.findMany({
      limit: 5,
    });
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default UserRouter;
