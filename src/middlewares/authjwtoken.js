import jwtoken from "jsonwebtoken";
import config from "../config";
import user from "../models/user";
import role from "../models/role";

export const verifyToken = async (req, res, next) => {

  try {

    const token = req.headers["x-access-token"];
    console.log(token);

    if (!token) return res.status(403).json({ message: "no token provided" })
    const decoded = jwtoken.verify(token, config.SECRET)
    req.userID = decoded.id;
    console.log(decoded);

    const User = await user.findById(req.userID, { password: 0 });

    if ((!User))
      return res.status(404).json({ message: "no user found" });
    next();
  }
  catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const isModerator = async (req, res, next) => {

  try {

    const User = await user.findById(req.userID);
    const roles = await role.find({ _id: { $in: User.roles } })

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        next();
        return;
      }
    }
    return res.status(403).json({ message: "Require Moderator Role" });
  }
  catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  };

}
export const isAdmin = async (req, res, next) => {

  try {

    const User = await user.findById(req.userID);
    const roles = await role.find({ _id: { $in: User.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }
    return res.status(403).json({ message: "Require Admin Role!" });
  }
  catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
};