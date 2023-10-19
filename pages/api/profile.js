import connectDB from "../../utils/connectDB";
import User from "../../models/User";
import { getSession } from "next-auth/react";
import { verifyPassword } from "../../utils/auth";

async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", message: "error in connection to DB" });
  }

  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ status: "failed", message: "you aren't logged in" });
  }

  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    res.status(404).json({ status: "failed", message: "user doesn't exist" });
  }

  if (req.method === "POST") {
    const { name, lastName, password } = req.body;

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return res.status(422).json({
        status: "failed",
        message: "username or password is incorrect",
      });
    }
    user.name = name;
    user.lastName = lastName;
    user.save();

    res.status(200).json({
      status: "success",
      data: { name, lastName, email: session.user.email },
    });
  } else if (req.method === "GET") {
    res.status(200).json({
      status: "success",
      data: { name: user.name, lastName: user.lastName, email: user.email },
    });
  }
}

export default handler;
