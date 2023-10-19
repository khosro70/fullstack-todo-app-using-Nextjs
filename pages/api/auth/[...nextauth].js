import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/User";
import connectDB from "../../../utils/connectDB";
import { verifyPassword } from "../../../utils/auth";

const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;

        try {
          await connectDB();
        } catch (error) {
          throw new Error("error in connecting DB");
        }

        if (!email || !password) {
          throw new Error("Invalid data");
        }

        const user = await User.findOne({ email });
        if (!user) throw new Error("user doesn't exist");

        const isValid = await verifyPassword(password, user.password);
        if (!isValid) throw new Error("username or password is incorrect");

        return { email };
      },
    }),
  ],
};
export default NextAuth(authOptions);
