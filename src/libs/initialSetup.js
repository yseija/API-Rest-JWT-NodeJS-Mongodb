
import role from "../models/role";
import user from "..//models/user";
import bcrypt from "bcryptjs";

export const createRoles = async () => {

  try {
    const count = await role.estimatedDocumentCount();

    if (count > 0) return;
    
    // Create default Roles
    const values = await Promise.all([
      new role({ name: 'user' }).save(),
      new role({ name: 'moderator' }).save(),
      new role({ name: 'admin' }).save(),
    ]);
    console.log(values);
  }
  catch (error) { console.error(error); };

};

export const createAdmin = async () => {

  // check for an existing admin user
  const User = await user.findOne({ email: "admin@localhost" });
  
  // get roles _id
  const roles = await role.find({ name: { $in: ["admin", "moderator"] } });

  if (!User) {

    // create a new admin user
    await user.create({
      username: "admin",
      email: "admin@localhost",
      password: await bcrypt.hash("admin", 10),
      roles: roles.map((Role) => Role._id),
    });
    console.log('Admin User Created!')
  }
};