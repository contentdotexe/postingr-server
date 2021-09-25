const UserModel = require("./UserModel");

export async function login({ email, password }) {
  try {
    const user = await UserModel.find().sort({ createdAt: -1 });
    if (!user) {
      return null;
    }
  } catch (err) {
    throw err;
  }
}
