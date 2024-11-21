import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id, name, fromweightage, fromprice, description, product } =
      req.body;

    // Ensure all fields are present
    if (
      !id ||
      !name ||
      !fromweightage ||
      !fromprice ||
      !description ||
      !product
    ) {
      return res
        .status(400)
        .json({ error: "All fields including product are required" });
    }

    try {
      let updatedProduct;

      // Update Vanilla product
      if (product === "Vanilla") {
        updatedProduct = await prisma.vanilla.update({
          where: {
            id: Number(id), // Assuming 'id' is numeric, adjust if it's a string
          },
          data: {
            name,
            fromweightage: String(fromweightage), // Convert to string
            fromprice: Number(fromprice),
            description: description,
          },
        });
      }

      // Update Butter Scotch product
      else if (product === "Butter Scotch") {
        updatedProduct = await prisma.butter.update({
          where: {
            id: Number(id), // Assuming 'id' is numeric, adjust if it's a string
          },
          data: {
            name,
            fromweightage: String(fromweightage), // Convert to string
            fromprice: Number(fromprice),
            description: description,
          },
        });
      }
      if (product === "faultLine") {
        updatedProduct = await prisma.lines.update({
          where: {
            id: Number(id), // Assuming 'id' is numeric, adjust if it's a string
          },
          data: {
            name,
            fromweightage: String(fromweightage), // Convert to string
            fromprice: Number(fromprice),
            description: description,
          },
        });
      } else if (product === "mickeyMouse") {
        updatedProduct = await prisma.mickies.update({
          where: {
            id: Number(id), // Assuming 'id' is numeric, adjust if it's a string
          },
          data: {
            name,
            fromweightage: String(fromweightage), // Convert to string
            fromprice: Number(fromprice),
            description: description,
          },
        });
      } else if (product === "doremon") {
        updatedProduct = await prisma.doremons.update({
          where: {
            id: Number(id), // Assuming 'id' is numeric, adjust if it's a string
          },
          data: {
            name,
            fromweightage: String(fromweightage), // Convert to string
            fromprice: Number(fromprice),
            description: description,
          },
        });
      } else if (product === "tigerEffect") {
        updatedProduct = await prisma.tigers.update({
          where: {
            id: Number(id), // Assuming 'id' is numeric, adjust if it's a string
          },
          data: {
            name,
            fromweightage: String(fromweightage), // Convert to string
            fromprice: Number(fromprice),
            description: description,
          },
        });
      } else if (product === "surprise") {
        updatedProduct = await prisma.surprises.update({
          where: {
            id: Number(id), // Assuming 'id' is numeric, adjust if it's a string
          },
          data: {
            name,
            fromweightage: String(fromweightage), // Convert to string
            fromprice: Number(fromprice),
            description: description,
          },
        });
      } else if (product === "barbieDoll") {
        updatedProduct = await prisma.barbies.update({
          where: {
            id: Number(id), // Assuming 'id' is numeric, adjust if it's a string
          },
          data: {
            name,
            fromweightage: String(fromweightage), // Convert to string
            fromprice: Number(fromprice),
            description: description,
          },
        });
      } else if (product === "redVelvet") {
        updatedProduct = await prisma.reds.update({
          where: {
            id: Number(id), // Assuming 'id' is numeric, adjust if it's a string
          },
          data: {
            name,
            fromweightage: String(fromweightage), // Convert to string
            fromprice: Number(fromprice),
            description: description,
          },
        });
      } else if (product === "blackForest") {
        updatedProduct = await prisma.blacks.update({
          where: {
            id: Number(id), // Assuming 'id' is numeric, adjust if it's a string
          },
          data: {
            name,
            fromweightage: String(fromweightage), // Convert to string
            fromprice: Number(fromprice),
            description: description,
          },
        });
      } else if (product === "vanilla") {
        updatedProduct = await prisma.vanilla.update({
          where: {
            id: Number(id), // Assuming 'id' is numeric, adjust if it's a string
          },
          data: {
            name,
            fromweightage: String(fromweightage), // Convert to string
            fromprice: Number(fromprice),
            description: description,
          },
        });
      } else if (product === "mango") {
        updatedProduct = await prisma.mangos.update({
          where: {
            id: Number(id), // Assuming 'id' is numeric, adjust if it's a string
          },
          data: {
            name,
            fromweightage: String(fromweightage), // Convert to string
            fromprice: Number(fromprice),
            description: description,
          },
        });
      } else if (product === "butterScotch") {
        updatedProduct = await prisma.butter.update({
          where: {
            id: Number(id), // Assuming 'id' is numeric, adjust if it's a string
          },
          data: {
            name,
            fromweightage: String(fromweightage), // Convert to string
            fromprice: Number(fromprice),
            description: description,
          },
        });
      } else if (product === "pineApple") {
        updatedProduct = await prisma.pines.update({
          where: {
            id: Number(id), // Assuming 'id' is numeric, adjust if it's a string
          },
          data: {
            name,
            fromweightage: String(fromweightage), // Convert to string
            fromprice: Number(fromprice),
            description: description,
          },
        });
      } else if (product === "strawBerry") {
        updatedProduct = await prisma.straws.update({
          where: {
            id: Number(id), // Assuming 'id' is numeric, adjust if it's a string
          },
          data: {
            name,
            fromweightage: String(fromweightage), // Convert to string
            fromprice: Number(fromprice),
            description: description,
          },
        });
      } else if (product === "chocolate") {
        updatedProduct = await prisma.chocos.update({
          where: {
            id: Number(id), // Assuming 'id' is numeric, adjust if it's a string
          },
          data: {
            name,
            fromweightage: String(fromweightage), // Convert to string
            fromprice: Number(fromprice),
            description: description,
          },
        });
      } else if (product === "rosmalai") {
        updatedProduct = await prisma.malais.update({
          where: {
            id: Number(id), // Assuming 'id' is numeric, adjust if it's a string
          },
          data: {
            name,
            fromweightage: String(fromweightage), // Convert to string
            fromprice: Number(fromprice),
            description: description,
          },
        });
      } else if (product === "pizza") {
        updatedProduct = await prisma.pizzaItems.update({
          where: {
            id: Number(id), // Assuming 'id' is numeric, adjust if it's a string
          },
          data: {
            name,
            fromweightage: String(fromweightage), // Convert to string
            fromprice: Number(fromprice),
            description: description,
          },
        });
      } else if (product === "breads") {
        updatedProduct = await prisma.breadItems.update({
          where: {
            id: Number(id), // Assuming 'id' is numeric, adjust if it's a string
          },
          data: {
            name,
            fromweightage: String(fromweightage), // Convert to string
            fromprice: Number(fromprice),
            description: description,
          },
        });
      } else if (product === "burgers") {
        updatedProduct = await prisma.burgerItems.update({
          where: {
            id: Number(id), // Assuming 'id' is numeric, adjust if it's a string
          },
          data: {
            name,
            fromweightage: String(fromweightage), // Convert to string
            fromprice: Number(fromprice),
            description: description,
          },
        });
      } else if (product === "celebration") {
        updatedProduct = await prisma.celebrations.update({
          where: {
            id: Number(id), // Assuming 'id' is numeric, adjust if it's a string
          },
          data: {
            name,
            fromweightage: String(fromweightage), // Convert to string
            fromprice: Number(fromprice),
            description: description,
          },
        });
      } else if (product === "birthDay") {
        updatedProduct = await prisma.births.update({
          where: {
            id: Number(id), // Assuming 'id' is numeric, adjust if it's a string
          },
          data: {
            name,
            fromweightage: String(fromweightage), // Convert to string
            fromprice: Number(fromprice),
            description: description,
          },
        });
      } else if (product === "anniversary") {
        updatedProduct = await prisma.annivers.update({
          where: {
            id: Number(id), // Assuming 'id' is numeric, adjust if it's a string
          },
          data: {
            name,
            fromweightage: String(fromweightage), // Convert to string
            fromprice: Number(fromprice),
            description: description,
          },
        });
      } else if (product === "topRatedProducts") {
        updatedProduct = await prisma.topRatedProducts.update({
          where: {
            id: Number(id), // Assuming 'id' is numeric, adjust if it's a string
          },
          data: {
            name,
            fromweightage: String(fromweightage), // Convert to string
            fromprice: Number(fromprice),
            description: description,
          },
        });
      } else if (product === "reviewProducts") {
        updatedProduct = await prisma.reviewProducts.update({
          where: {
            id: Number(id), // Assuming 'id' is numeric, adjust if it's a string
          },
          data: {
            name,
            fromweightage: String(fromweightage), // Convert to string
            fromprice: Number(fromprice),
            description: description,
          },
        });
      } else if (product === "latestProducts") {
        updatedProduct = await prisma.latestProducts.update({
          where: {
            id: Number(id), // Assuming 'id' is numeric, adjust if it's a string
          },
          data: {
            name,
            fromweightage: String(fromweightage), // Convert to string
            fromprice: Number(fromprice),
            description: description,
          },
        });
      }

      // Handle unsupported product types
      else {
        return res.status(400).json({ error: "Unsupported product type" });
      }

      // Convert BigInt fields to a serializable format (if needed)
      const serializableProduct = {
        ...updatedProduct,
        id: updatedProduct.id.toString(), // Convert id to string if it's a BigInt
      };

      res.status(200).json({
        message: `${product} product updated successfully`,
        updatedProduct: serializableProduct,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Failed to update product" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
