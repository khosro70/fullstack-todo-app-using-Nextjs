import connectDB from "../../utils/connectDB";
import User from "../../models/User";
import { getSession } from "next-auth/react";
import { sortTodos } from "../../utils/sortTodos";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", message: "error in connection to DB" });
  }

  const session = await getSession({ req });
  // console.log(session);
  if (!session) {
    res.status(401).json({ status: "failed", message: "you aren't logged in" });
  }

  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    res.status(404).json({ status: "failed", message: "user doesn't exist" });
  }

  if (req.method === "POST") {
    const { title, status } = req.body;

    if (!title || !status) {
      return res
        .status(422)
        .json({ status: "failed", message: "Invalid data" });
    }

    user.todos.push({ title, status });
    await user.save();

    res.status(201).json({ status: "success", message: "todo created" });
  } else if (req.method === "GET") {
    const sortedData = sortTodos(user.todos);
    res.status(200).json({ status: "success", data: { todos: sortedData } });
  } else if (req.method === "PATCH") {
    const { id, status } = req.body;
    if (!id || !status) {
      res.status(422).json({ status: "failed", message: "Invalid data" });
    }
    const result = await User.updateOne(
      { "todos._id": id },
      {
        $set: { "todos.$.status": status },
      }
    );
    res.status(200).json({ status: "success" });
  }
}
