import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Fetch trends
      const flavours = await prisma.flavours.findMany();
      const serializedFlavours = flavours.map((flavour) => ({
        ...flavour,
        id: flavour.id.toString(), // Convert `bigint` to `string`
        // Add other conversions if needed
      }));

      // console.log("Fetched data:", serializedFlavours); // Check this log
      res.status(200).json(serializedFlavours);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
