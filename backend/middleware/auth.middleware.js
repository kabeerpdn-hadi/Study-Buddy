import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

export const authMiddleware = async (req, res, next) => {
  try {
    // 1. Get token from cookie (you set this in login/signup)
    const accessToken = req.cookies.accessToken;
    
    if (!accessToken) {
      return res.status(401).json({ message: "No access token. Please login." });
    }

    // 2. Verify JWT (checks signature + expiry)
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    
    // 3. Find user (optional, for fresh data)
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 4. Attach userId to request (magic!)
    req.userId = decoded.userId;
    req.user = user; // Full user object if needed
    
    // 5. Pass to next middleware/route
    next();
  } catch (error) {
    // Token expired/invalid → auto-refresh happens via frontend
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
