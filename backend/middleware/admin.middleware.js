import User from "../models/user.models.js";

export const adminMiddleware = async (req, res, next) => {
  const user = await User.findById(req.userId).select("role");
  
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }else if (user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  
  
  next();
};
