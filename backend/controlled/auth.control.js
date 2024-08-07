import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateJWTToken } from "../utils/generateToken.js";
async function signup(req, res) {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required ⚠️ " });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email !" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }
    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const existingUsernameByUsername = await User.findOne({
      username: username,
    });
    if (existingUsernameByUsername && username.length < 5) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }

    const Profile_Pics = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = Profile_Pics[Math.floor(Math.random() * Profile_Pics.length)];
    const NewUser = new User({
      email,
      password,
      username,
      image,
    });

    const salt = await bcryptjs.genSalt(10);
    NewUser.password = await bcryptjs.hash(NewUser.password, salt);

    await NewUser.save();
    generateJWTToken(NewUser._id, res);
    return res.status(201).json({
      success: true,
      user: {
        ...NewUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error with Server:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required ⚠️" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password or email !" });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password or email !" });
    }
    generateJWTToken(user._id, res);
    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

async function logout(req, res) {
  try {
    res.clearCookie("jwt-netflix");
    res.status(200).json({ success: true, message: "Logged out successful" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
async function authCheck(req, res) {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.log("Error in authCheck ", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
export { signup, login, logout, authCheck };
