import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // Assuming you're using Prisma for DB access
const convertBigIntToString = (obj) => {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const user = await prisma.users.findUnique({
        where: { email },
      });

      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid email or password" });
      }

      // Check if password matches (assuming hashed passwords)
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid email or password" });
      }

      // Convert BigInt to string
      const userData = convertBigIntToString(user);

      const token = jwt.sign(
        { userId: userData.id, email: userData.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({ success: true, token });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  } else {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }
}
