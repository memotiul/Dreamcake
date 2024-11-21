import { PrismaClient } from "@prisma/client";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Fetch top-rated products
      const topRatedProducts = await prisma.topRatedProducts.findMany();
      const serializedTopRatedProducts = topRatedProducts.map((topRated) => ({
        ...topRated,
        id: topRated.id.toString(), // Convert `bigint` to `string`
        // Add other conversions if needed
      }));

      res.status(200).json(serializedTopRatedProducts);
    } catch (error) {
      console.error("Error fetching data:", error.message); // Enhanced logging
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
