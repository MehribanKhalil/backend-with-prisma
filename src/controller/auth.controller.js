import prisma from "../config/db.js";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";
import { loginSchema, registerSchema } from "../schemas/auth.schemas.js";

const login = async (req, res, next) => {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success)
      return res.status(400).json({ errors: result.error.errors });

    const { email, password } = result.data;

    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!findUser) return res.status(404).json({ message: "User not found" });

    const checkPassword = await bcrypt.compare(password, findUser.password);

    if (!checkPassword)
      return res.status(400).json({ meesage: "Password is wrong" });

    const accessToken = generateAccessToken(findUser);
    const refreshToken = generateRefreshToken(findUser);

    res.status(200).json({
      message: "User signed successfully",
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const validateData = registerSchema.safeParse(req.body);

    if (!validateData.success) {
      return res.status(400).json({ errors: validateData.error.errors });
    }
    const { name, email, password } = validateData.data;

    const isUserExist = await prisma.user.findFirst({
      where: {
        AND: [{ name }, { email }],
      },
    });

    if (isUserExist)
      return res.status(400).json({ message: "User already exist" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const createUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    const accessToken = generateAccessToken(createUser);
    const refreshToken = generateRefreshToken(createUser);

    res.status(200).json({
      message: "User registered successfully",
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

export { login, register };
