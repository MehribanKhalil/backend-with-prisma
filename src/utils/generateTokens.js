import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
    },
    process.env.ACCESS_KEY,
    {
      expiresIn: "1h",
    }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
    },
    process.env.REFRESH_KEY,
    {
      expiresIn: "30d",
    }
  );
};
