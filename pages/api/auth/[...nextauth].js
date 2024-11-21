import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Find user by email
        const user = await prisma.users.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        // Compare entered password with stored hashed password
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        // Return user object with id converted to string
        return {
          id: user.id.toString(), // Convert BigInt to String
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET, // JWT secret
  jwt: {
    secret: process.env.NEXTAUTH_SECRET, // Ensure the secret is used here as well
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // The user.id is already a string here
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id; // Pass the stringified id to the session
      return session;
    },
  },
});
