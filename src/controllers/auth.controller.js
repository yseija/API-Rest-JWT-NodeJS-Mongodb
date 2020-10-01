import { Router } from "express";
import user from "../models/user";
import jwtoken from "jsonwebtoken";
import config from "../config";
import role from "../models/role";




export const signup = async (req, res) => {
  
  // getting the Request Body
  const { username, email, password, roles } = req.body;
  
  // creating a new user Object
  const newUser = new user({
    username,
    email,
    password: await user.encryptPassword(password),
  });
  
  // checking for roles
  if (roles) {
    const foundRoles = await role.find({ name: { $in: roles } })
    newUser.roles = foundRoles.map(Role => Role._id)
  }
  else {
    const Role = await role.findOne({ name: "user" })
    newUser.roles = [Role._id];
  };
  
  // Saving the user Object 
  const savedUser = await newUser.save();
  console.log(savedUser);
  
  // Create a token
  const token = jwtoken.sign({ id: savedUser._id }, config.SECRET, { expiresIn: 86400 }); //86400 seconds a day ago

  res.json({ token });

};

//
export const signin = async (req, res) => {

  // Request body email can be an email or username
  const userFound = await user.findOne({ email: req.body.email }).populate("roles");

  if (!userFound) return res.status(400).json({ message: "User Not Found" });

  const matchPassword = await user.comparePassword(
    req.body.password,
    userFound.password
  );

  if (!matchPassword)
    return res.status(401).json({
      token: null,
      message: "Invalid Password",
    });

  const token = jwtoken.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400,
  });

  res.json({ token });
};
