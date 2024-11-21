import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Fetch trends
      const celebrations = await prisma.celebrations.findMany();
      const serializedCelebrate = celebrations.map((celebrate) => ({
        ...celebrate,
        id: celebrate.id.toString(), // Convert `bigint` to `string`
        // Add other conversions if needed
      }));

      // console.log("Fetched data:", serializedCelebrate); // Check this log
      res.status(200).json(serializedCelebrate);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
