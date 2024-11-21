import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Helper function to convert BigInt to String
const convertBigIntToString = (obj) => {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
};

export default async function handler(req, res) {
  try {
    // Fetch data from multiple tables
    const table25 = await prisma.butter.findMany();
    const table1 = await prisma.lines.findMany();
    const table2 = await prisma.mickies.findMany();
    const table3 = await prisma.doremons.findMany();
    const table4 = await prisma.tigers.findMany();
    const table5 = await prisma.surprises.findMany();
    const table6 = await prisma.barbies.findMany();
    const table7 = await prisma.reds.findMany();
    const table8 = await prisma.blacks.findMany();
    const table9 = await prisma.vanilla.findMany();
    const table10 = await prisma.mangos.findMany();
    const table11 = await prisma.pines.findMany();
    const table12 = await prisma.straws.findMany();
    const table13 = await prisma.chocos.findMany();
    const table14 = await prisma.malais.findMany();
    const table15 = await prisma.pizzaItems.findMany();
    const table16 = await prisma.breadItems.findMany();
    const table17 = await prisma.burgerItems.findMany();
    const table18 = await prisma.items.findMany();
    const table19 = await prisma.births.findMany();
    const table20 = await prisma.celebrations.findMany();
    const table21 = await prisma.annivers.findMany();
    // const table22 = await prisma.latestProducts.findMany();
    // const table23 = await prisma.reviewProducts.findMany();
    // const table24 = await prisma.topRatedProducts.findMany();

    // Combine all products into a single array, retaining all attributes
    let allProducts = [
      ...table1.map((product) => ({ ...product, type: "lines" })),
      ...table2.map((product) => ({ ...product, type: "mickies" })),
      ...table3.map((product) => ({ ...product, type: "doremons" })),
      ...table4.map((product) => ({ ...product, type: "tigers" })),
      ...table5.map((product) => ({ ...product, type: "surprises" })),
      ...table6.map((product) => ({ ...product, type: "barbies" })),
      ...table7.map((product) => ({ ...product, type: "reds" })),
      ...table8.map((product) => ({ ...product, type: "blacks" })),
      ...table9.map((product) => ({ ...product, type: "vanilla" })),
      ...table10.map((product) => ({ ...product, type: "mangos" })),
      ...table11.map((product) => ({ ...product, type: "pines" })),
      ...table12.map((product) => ({ ...product, type: "straws" })),
      ...table13.map((product) => ({ ...product, type: "chocos" })),
      ...table14.map((product) => ({ ...product, type: "malais" })),
      ...table15.map((product) => ({ ...product, type: "pizzas" })),
      ...table16.map((product) => ({ ...product, type: "breads" })),
      ...table17.map((product) => ({ ...product, type: "burgers" })),

      ...table19.map((product) => ({ ...product, type: "births" })),
      ...table20.map((product) => ({ ...product, type: "celebrations" })),
      ...table21.map((product) => ({ ...product, type: "annivers" })),
      ...table25.map((product) => ({ ...product, type: "butter" })),
    ];

    // Convert BigInt values to strings
    allProducts = allProducts.map(convertBigIntToString);
    console.log("All Products", allProducts);
    // Return the combined array of products
    res.status(200).json(allProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma to avoid connection overload
  }
}
