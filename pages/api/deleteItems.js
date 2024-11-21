// /pages/api/deleteProduct.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id, item } = req.body; // Extract product ID from request body
    console.log("Paraneters", id, item);

    try {
      // Delete the product from the database

      if (item === "faultLine") {
        await prisma.lines.delete({
          where: { id: parseInt(id) },
        });
      } else if (item === "mickeyMouse") {
        await prisma.mickies.delete({
          where: { id: parseInt(id) },
        });
      } else if (item === "doremon") {
        await prisma.doremons.delete({
          where: { id: parseInt(id) },
        });
      } else if (item === "tigerEffect") {
        await prisma.tigers.delete({
          where: { id: parseInt(id) },
        });
      } else if (item === "surprise") {
        await prisma.surprises.delete({
          where: { id: parseInt(id) },
        });
      } else if (item === "barbieDoll") {
        await prisma.barbies.delete({
          where: { id: parseInt(id) },
        });
      } else if (item === "redVelvet") {
        await prisma.reds.delete({
          where: { id: parseInt(id) },
        });
      } else if (item === "blackForest") {
        await prisma.blacks.delete({
          where: { id: parseInt(id) },
        });
      } else if (item === "vanilla") {
        await prisma.vanilla.delete({
          where: { id: parseInt(id) },
        });
      } else if (item === "mango") {
        await prisma.mangos.delete({
          where: { id: parseInt(id) },
        });
      } else if (item === "butterScotch") {
        await prisma.butter.delete({
          where: { id: parseInt(id) },
        });
      } else if (item === "pineApple") {
        await prisma.pines.delete({
          where: { id: parseInt(id) },
        });
      } else if (item === "strawBerry") {
        await prisma.straws.delete({
          where: { id: parseInt(id) },
        });
      } else if (item === "chocolate") {
        await prisma.chocos.delete({
          where: { id: parseInt(id) },
        });
      } else if (item === "rosmalai") {
        await prisma.malais.delete({
          where: { id: parseInt(id) },
        });
      } else if (item === "pizza") {
        await prisma.pizzas.delete({
          where: { id: parseInt(id) },
        });
      } else if (item === "breads") {
        await prisma.breads.delete({
          where: { id: parseInt(id) },
        });
      } else if (item === "burgers") {
        await prisma.burgers.delete({
          where: { id: parseInt(id) },
        });
      } else if (item === "orders") {
        await prisma.items.delete({
          where: { id: parseInt(id) },
        });
      } else if (item === "birthDay") {
        await prisma.births.delete({
          where: { id: parseInt(id) },
        });
      } else if (item === "celebration") {
        await prisma.celebrations.delete({
          where: { id: parseInt(id) },
        });
      } else if (item === "anniversary") {
        await prisma.annivers.delete({
          where: { id: parseInt(id) },
        });
      } else if (item === "latestProducts") {
        await prisma.latestProducts.delete({
          where: { id: parseInt(id) },
        });
      } else if (item === "reviewProducts") {
        await prisma.reviewProducts.delete({
          where: { id: parseInt(id) },
        });
      } else if (item === "topRatedProducts") {
        await prisma.topRatedProducts.delete({
          where: { id: parseInt(id) },
        });
      }
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
