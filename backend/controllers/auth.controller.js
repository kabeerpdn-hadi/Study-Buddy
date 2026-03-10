import User from "../models/user.models.js";
import jwt from "jsonwebtoken";

// Generate access and refresh JWT tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

// Store refresh token in User document instead of Redis
const storeRefreshToken = async (userId, refreshToken) => {
  await User.findByIdAndUpdate(userId, { refreshToken });
};

// Set cookies for tokens
const setCookie = (cookieName, cookieValue, { res }) => {
  res.cookie(cookieName, cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge:
      cookieName === "accessToken" ? 15 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000,
  });
};

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);

    setCookie("accessToken", accessToken, { res });
    setCookie("refreshToken", refreshToken, { res });

    res.status(201).json({
      user: {
        name: user.name,
        email: user.email,
        _id: user._id,
        role: user.role,
      },
      message: "User created successfully",
    });
  } catch (error) {
    console.log("error in signup controller" + error);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (user && (await user.comparePassword(password))) {
      const { accessToken, refreshToken } = generateTokens(user._id);

      await storeRefreshToken(user._id, refreshToken);

      setCookie("accessToken", accessToken, { res });
      setCookie("refreshToken", refreshToken, { res });

      res.json({
        user: {
          name: user.name,
          email: user.email,
          _id: user._id,
          role: user.role,
          level: user.level,
          money: user.money
        },
        message: "User logged in successfully",
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log("error in login controller" + error);
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      await User.findByIdAndUpdate(decoded.userId, { refreshToken: "" });
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
    
  } catch (error) {
    console.log("error in logout controller" + error);
    res.status(500).json({ message: "server error", error: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not found" });
    }

    // 1) Verify the JWT
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // 2) Load user's stored refreshToken from DB
    const user = await User.findById(decoded.userId).select("refreshToken");

    // 3) Validate: user exists AND token exists AND matches exactly
    if (!user || !user.refreshToken || user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // 4) Create new access token
    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    // 5) Optionally rotate refresh token (more secure)
    // const { refreshToken: newRefreshToken } = generateTokens(decoded.userId);
    // await storeRefreshToken(decoded.userId, newRefreshToken);

    // 6) Set new access token cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    // If you rotate, also reset refresh cookie:
    // setCookie("refreshToken", newRefreshToken, { res });

    res.json({ message: "Token refreshed successfully" });
  } catch (error) {
    console.log("error in refresh token controller", error);
    return res
      .status(401)
      .json({ message: "Invalid or expired refresh token" });
  }
};

export const getDashboard = async (req, res) => {
  
}

export const getProfile = async (req, res) => {
  res.json({ user: req.user });
}

export const getLeaderboard = async (req, res) => {
  const users = await User.find({})
    .sort({ level: -1 })          // highest level first
    .select("name level money")   // only these 3 fields
    .limit(20)                    // top 20 only
  
  res.json({ users })
}
