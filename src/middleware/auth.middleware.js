import { auth } from "../lib/auth.js";

export const requireAuth = async (req, res, next) => {
  try {
    console.log(req);
    const session = await auth.api.getSession(req);
    console.log(session);
    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Attach the user/session to the request for use in routes
    req.user = session.user;
    req.session = session.session;

    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
