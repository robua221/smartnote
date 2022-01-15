const express = require("express");
const router = express.Router();
const User = require("../models/User");
var jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var fetchuser = require("../middleware/fetchuser");

//Route1: reate user using :POST"api/auth/createuser
const JWT_SECRET = "UFSDHFOSDHFODH";
router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 3 }),
    body("name").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(404).json({ error: "email taken" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create new user

      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      res.json({ authtoken });
    } catch (error) {
      res.status(500).send(error);
      console.log(error);
    }
  }
);
//Route :2 authenticate user suing api/auth/login expres validate
router.post(
  "/login",
  [
    body("email", "enter valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: "invalid credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ errors: "invalid credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      res.status(500).send("internal server occured");
      console.log(error);
    }
  }
);
//Route3 : Get logged in user details using :"POST : api/auth/getuser".Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).send("internal server occured");
    console.log(error);
  }
  
});
module.exports = router;
