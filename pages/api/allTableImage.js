import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const table1 = await prisma.lines.findMany({
      where: { image: { not: null } },
    });
    const table2 = await prisma.mickies.findMany({
      where: { image: { not: null } },
    });
    const table3 = await prisma.doremons.findMany({
      where: { image: { not: null } },
    });
    const table4 = await prisma.tigers.findMany({
      where: { image: { not: null } },
    });
    const table5 = await prisma.surprises.findMany({
      where: { image: { not: null } },
    });
    const table6 = await prisma.barbies.findMany({
      where: { image: { not: null } },
    });
    const table7 = await prisma.reds.findMany({
      where: { image: { not: null } },
    });
    const table8 = await prisma.blacks.findMany({
      where: { image: { not: null } },
    });
    const table9 = await prisma.vanilla.findMany({
      where: { image: { not: null } },
    });
    const table10 = await prisma.mangos.findMany({
      where: { image: { not: null } },
    });
    const table11 = await prisma.pines.findMany({
      where: { image: { not: null } },
    });
    const table12 = await prisma.pines.findMany({
      where: { image: { not: null } },
    });
    const table13 = await prisma.straws.findMany({
      where: { image: { not: null } },
    });
    const table14 = await prisma.chocos.findMany({
      where: { image: { not: null } },
    });
    const table15 = await prisma.malais.findMany({
      where: { image: { not: null } },
    });
    const table16 = await prisma.pizzaItems.findMany({
      where: { image: { not: null } },
    });
    const table17 = await prisma.breadItems.findMany({
      where: { image: { not: null } },
    });
    const table18 = await prisma.burgerItems.findMany({
      where: { image: { not: null } },
    });
    const table19 = await prisma.items.findMany({
      where: { image: { not: null } },
    });
    const table20 = await prisma.births.findMany({
      where: { image: { not: null } },
    });
    const table21 = await prisma.celebrations.findMany({
      where: { image: { not: null } },
    });
    const table22 = await prisma.annivers.findMany({
      where: { image: { not: null } },
    });
    const table23 = await prisma.latestProducts.findMany({
      where: { image: { not: null } },
    });
    const table24 = await prisma.reviewProducts.findMany({
      where: { image: { not: null } },
    });
    const table25 = await prisma.topRatedProducts.findMany({
      where: { image: { not: null } },
    });

    const allImages = [
      ...table1.map((image) => image.image),
      ...table2.map((image) => image.image),
      ...table3.map((image) => image.image),
      ...table4.map((image) => image.image),
      ...table5.map((image) => image.image),
      ...table6.map((image) => image.image),
      ...table7.map((image) => image.image),
      ...table8.map((image) => image.image),
      ...table9.map((image) => image.image),
      ...table10.map((image) => image.image),
      ...table11.map((image) => image.image),
      ...table12.map((image) => image.image),
      ...table13.map((image) => image.image),
      ...table14.map((image) => image.image),
      ...table15.map((image) => image.image),
      ...table16.map((image) => image.image),
      ...table17.map((image) => image.image),
      ...table18.map((image) => image.image),
      ...table19.map((image) => image.image),
      ...table20.map((image) => image.image),
      ...table21.map((image) => image.image),
      ...table22.map((image) => image.image),
      ...table23.map((image) => image.image),
      ...table24.map((image) => image.image),
      ...table25.map((image) => image.image),
    ];

    // Shuffle the images using Fisher-Yates shuffle algorithm to scatter them
    for (let i = allImages.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allImages[i], allImages[j]] = [allImages[j], allImages[i]];
    }

    // Return the shuffled (scattered) images
    res.status(200).json(allImages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch images" });
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma to avoid connection overload
  }
}
