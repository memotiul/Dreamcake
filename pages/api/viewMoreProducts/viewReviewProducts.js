import { PrismaClient } from "@prisma/client";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Fetch trends
      const reviewProducts = await prisma.reviewProducts.findMany();
      const serializedReviewProducts = reviewProducts.map((review) => ({
        ...review,
        id: review.id.toString(), // Convert `bigint` to `string`
      }));

      res.status(200).json(serializedReviewProducts);
    } catch (error) {
      console.error("Error fetching data:", error.message); // Log the error message
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
