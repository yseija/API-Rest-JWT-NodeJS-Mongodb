import user from "../models/user";
import role from "../models/role";

export const createUser = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    const rolesFound = await role.find({ name: { $in: roles } });

    // creating a new user
    const User = new user({
      username,
      email,
      password,
      roles: rolesFound.map((role) => role._id),
    });

    // encrypting password
    User.password = await user.encryptPassword(User.password);

    // saving the new user
    const savedUser = await User.save();

    return res.status(200).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      roles: savedUser.roles,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async (req, res) => { };

export const getUser = async (req, res) => { };


