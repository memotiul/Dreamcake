import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function convertBigIntToNumber(obj) {
  for (let key in obj) {
    if (typeof obj[key] === "bigint") {
      obj[key] = Number(obj[key]);
    }
  }
  return obj;
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const reviews = await prisma.reviews.findMany();
      const serializedReviews = reviews.map((review) =>
        convertBigIntToNumber(review)
      );
      // console.log("Fetched reviews:", serializedReviews); // Check this log
      res.status(200).json(serializedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
