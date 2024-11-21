import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Parse the form data
      const {
        fullName,
        fromPrice,
        toPrice,
        fromWeight,
        toWeight,
        description,
        image,
        product,
      } = req.body;
      // console.log(product);
      // Check if image is present and is a base64 string
      if (!image || !image.startsWith("data:image")) {
        console.error("Invalid or no image uploaded");
        return res.status(400).json({ error: "Image upload is required." });
      }

      // Extract Base64-encoded image data
      const matches = image.match(/^data:(image\/\w+);base64,(.*)$/);
      if (!matches || matches.length !== 3) {
        return res.status(400).json({ error: "Invalid image data." });
      }

      const fileExtension = matches[1].split("/")[1]; // Get the file extension (e.g., jpeg or png)
      const base64Data = matches[2]; // Get the Base64 encoded data

      // Generate a random file name
      const randomNumber = Math.floor(Math.random() * 10000000); // e.g., 9652415
      const newFileName = `${randomNumber}.${fileExtension}`;
      const newFilePath = path.join("./public/images", newFileName);

      // Write the image to the public/images directory
      fs.writeFileSync(newFilePath, base64Data, { encoding: "base64" });

      const imageUrl = `${newFileName}`; // URL to be saved in the database

      // Save the product data along with the image URL to the database
      if (product === "faultLine") {
        const addProduct = await prisma.lines.create({
          data: {
            name: fullName,
            fromprice: fromPrice,
            toprice: toPrice,
            fromweightage: fromWeight,
            toweightage: toWeight,
            description: description,
            image: imageUrl,
          },
        });
      } else if (product === "mickeyMouse") {
        const addProduct = await prisma.mickies.create({
          data: {
            name: fullName,
            fromprice: fromPrice,
            toprice: toPrice,
            fromweightage: fromWeight,
            toweightage: toWeight,
            description: description,
            image: imageUrl,
          },
        });
      } else if (product === "doremon") {
        const addProduct = await prisma.doremons.create({
          data: {
            name: fullName,
            fromprice: fromPrice,
            toprice: toPrice,
            fromweightage: fromWeight,
            toweightage: toWeight,
            description: description,
            image: imageUrl,
          },
        });
      } else if (product === "tigerEffect") {
        const addProduct = await prisma.tigers.create({
          data: {
            name: fullName,
            fromprice: fromPrice,
            toprice: toPrice,
            fromweightage: fromWeight,
            toweightage: toWeight,
            description: description,
            image: imageUrl,
          },
        });
      } else if (product === "surprise") {
        const addProduct = await prisma.surprises.create({
          data: {
            name: fullName,
            fromprice: fromPrice,
            toprice: toPrice,
            fromweightage: fromWeight,
            toweightage: toWeight,
            description: description,
            image: imageUrl,
          },
        });
      } else if (product === "barbieDoll") {
        const addProduct = await prisma.barbies.create({
          data: {
            name: fullName,
            fromprice: fromPrice,
            toprice: toPrice,
            fromweightage: fromWeight,
            toweightage: toWeight,
            description: description,
            image: imageUrl,
          },
        });
      } else if (product === "redVelvet") {
        const addProduct = await prisma.reds.create({
          data: {
            name: fullName,
            fromprice: fromPrice,
            toprice: toPrice,
            fromweightage: fromWeight,
            toweightage: toWeight,
            description: description,
            image: imageUrl,
          },
        });
      } else if (product === "blackForest") {
        const addProduct = await prisma.blacks.create({
          data: {
            name: fullName,
            fromprice: fromPrice,
            toprice: toPrice,
            fromweightage: fromWeight,
            toweightage: toWeight,
            description: description,
            image: imageUrl,
          },
        });
      } else if (product === "vanilla") {
        const addProduct = await prisma.vanilla.create({
          data: {
            name: fullName,
            fromprice: fromPrice,
            toprice: toPrice,
            fromweightage: fromWeight,
            toweightage: toWeight,
            description: description,
            image: imageUrl,
          },
        });
      } else if (product === "mango") {
        const addProduct = await prisma.mangos.create({
          data: {
            name: fullName,
            fromprice: fromPrice,
            toprice: toPrice,
            fromweightage: fromWeight,
            toweightage: toWeight,
            description: description,
            image: imageUrl,
          },
        });
      } else if (product === "butterScotch") {
        const addProduct = await prisma.butter.create({
          data: {
            name: fullName,
            fromprice: fromPrice,
            toprice: toPrice,
            fromweightage: fromWeight,
            toweightage: toWeight,
            description: description,
            image: imageUrl,
          },
        });
      } else if (product === "pineApple") {
        const addProduct = await prisma.pines.create({
          data: {
            name: fullName,
            fromprice: fromPrice,
            toprice: toPrice,
            fromweightage: fromWeight,
            toweightage: toWeight,
            description: description,
            image: imageUrl,
          },
        });
      } else if (product === "strawBerry") {
        const addProduct = await prisma.straws.create({
          data: {
            name: fullName,
            fromprice: fromPrice,
            toprice: toPrice,
            fromweightage: fromWeight,
            toweightage: toWeight,
            description: description,
            image: imageUrl,
          },
        });
      } else if (product === "chocolate") {
        const addProduct = await prisma.chocos.create({
          data: {
            name: fullName,
            fromprice: fromPrice,
            toprice: toPrice,
            fromweightage: fromWeight,
            toweightage: toWeight,
            description: description,
            image: imageUrl,
          },
        });
      } else if (product === "rosmalai") {
        const addProduct = await prisma.malais.create({
          data: {
            name: fullName,
            fromprice: fromPrice,
            toprice: toPrice,
            fromweightage: fromWeight,
            toweightage: toWeight,
            description: description,
            image: imageUrl,
          },
        });
      } else if (product === "pizza") {
        const addProduct = await prisma.pizzas.create({
          data: {
            name: fullName,
            fromprice: fromPrice,
            toprice: toPrice,
            fromweightage: fromWeight,
            toweightage: toWeight,
            description: description,
            image: imageUrl,
          },
        });
      } else if (product === "breads") {
        const addProduct = await prisma.breads.create({
          data: {
            name: fullName,
            fromprice: fromPrice,
            toprice: toPrice,
            fromweightage: fromWeight,
            toweightage: toWeight,
            description: description,
            image: imageUrl,
          },
        });
      } else if (product === "burgers") {
        const addProduct = await prisma.burgers.create({
          data: {
            name: fullName,
            fromprice: fromPrice,
            toprice: toPrice,
            fromweightage: fromWeight,
            toweightage: toWeight,
            description: description,
            image: imageUrl,
          },
        });
      } else if (product === "celebration") {
        const addProduct = await prisma.celebrations.create({
          data: {
            name: fullName,
            fromprice: fromPrice,
            toprice: toPrice,
            fromweightage: fromWeight,
            toweightage: toWeight,
            description: description,
            image: imageUrl,
          },
        });
      } else if (product === "birthDay") {
        const addProduct = await prisma.births.create({
          data: {
            name: fullName,
            fromprice: fromPrice,
            toprice: toPrice,
            fromweightage: fromWeight,
            toweightage: toWeight,
            description: description,
            image: imageUrl,
          },
        });
      } else if (product === "anniversary") {
        const addProduct = await prisma.annivers.create({
          data: {
            name: fullName,
            fromprice: fromPrice,
            toprice: toPrice,
            fromweightage: fromWeight,
            toweightage: toWeight,
            description: description,
            image: imageUrl,
          },
        });
      } else if (product === "topRatedProducts") {
        const addProduct = await prisma.topRatedProducts.create({
          data: {
            name: fullName,
            fromprice: fromPrice,
            toprice: toPrice,
            fromweightage: fromWeight,
            toweightage: toWeight,
            description: description,
            image: imageUrl,
          },
        });
      } else if (product === "reviewProducts") {
        const addProduct = await prisma.reviewProducts.create({
          data: {
            name: fullName,
            fromprice: fromPrice,
            toprice: toPrice,
            fromweightage: fromWeight,
            toweightage: toWeight,
            description: description,
            image: imageUrl,
          },
        });
      } else if (product === "latestProducts") {
        const addProduct = await prisma.latestProducts.create({
          data: {
            name: fullName,
            fromprice: fromPrice,
            toprice: toPrice,
            fromweightage: fromWeight,
            toweightage: toWeight,
            description: description,
            image: imageUrl,
          },
        });
      }

      res.status(200).json({ message: "Item Added Successfully!" });
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ error: "Failed to add item." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
