import { useRouter } from "next/router";
import ProductList from "@/components/products/productList";
import { PrismaClient } from "@prisma/client";

export default function Home({ products }) {
  const router = useRouter();
  const { results, searchTerm } = router.query;
  console.log("Birth", products);
  return (
    <>
      <ProductList
        products={products}
        results={results}
        searchTerm={searchTerm}
      />
    </>
  );
}
export async function getServerSideProps(context) {
  const prisma = new PrismaClient();
  const { type } = context.query;
  // console.log("type", type);
  let products = [];

  if (type === "Vanilla") {
    products = await prisma.vanilla.findMany();
  } else if (type === "Mango") {
    products = await prisma.mangos.findMany();
  } else if (type === "Butter Scotch") {
    products = await prisma.butter.findMany();
  } else if (type === "Pine Apple") {
    products = await prisma.pines.findMany();
  } else if (type === "Strawberry") {
    products = await prisma.straws.findMany();
  } else if (type === "Chocolate") {
    products = await prisma.chocos.findMany();
  } else if (type === "Pizza") {
    products = await prisma.pizzaItems.findMany();
  } else if (type === "Pastaa") {
    products = await prisma.pastaItems.findMany();
  } else if (type === "Burger") {
    products = await prisma.burgerItems.findMany();
  } else if (type === "Cinnamon") {
    products = await prisma.breadItems.findMany();
  } else if (type === "Rosmalai") {
    products = await prisma.malais.findMany();
  } else if (type === "Tiger Effect") {
    products = await prisma.tigers.findMany();
  } else if (type === "Doremon") {
    products = await prisma.doremons.findMany();
  } else if (type === "Mickey Mouse") {
    products = await prisma.mickies.findMany();
  } else if (type === "Surprise") {
    products = await prisma.surprises.findMany();
  } else if (type === "barbies") {
    products = await prisma.barbies.findMany();
  } else if (type === "Fault Line") {
    products = await prisma.lines.findMany();
  } else if (type === "Red Velvet") {
    products = await prisma.reds.findMany();
  } else if (type === "Black Forest") {
    products = await prisma.blacks.findMany();
  } else if (type === "Barbie Doll") {
    products = await prisma.barbies.findMany();
  } else if (type === "Birth Day") {
    products = await prisma.births.findMany();
  } else if (type === "Celebration") {
    products = await prisma.celebrations.findMany();
  } else if (type === "Anniversary") {
    products = await prisma.annivers.findMany();
  }
  // else if (type === "all") {
  //   products = [
  //     ...(await prisma.vanillas.findMany()),
  //     ...(await prisma.mangos.findMany()),
  //     ...(await prisma.butter.findMany()),
  //     ...(await prisma.pines.findMany()),
  //     ...(await prisma.straws.findMany()),
  //     ...(await prisma.chocos.findMany()),
  //     ...(await prisma.pizzas.findMany()),
  //     // ...(await prisma.pasta.findMany()),
  //     ...(await prisma.burgers.findMany()),
  //     ...(await prisma.breads.findMany()),
  //     ...(await prisma.malais.findMany()),
  //     ...(await prisma.tigers.findMany()),
  //     ...(await prisma.doremons.findMany()),
  //     ...(await prisma.mickies.findMany()),
  //     ...(await prisma.surprises.findMany()),
  //     ...(await prisma.barbies.findMany()),
  //     ...(await prisma.lines.findMany()),
  //     ...(await prisma.reds.findMany()),
  //     ...(await prisma.blacks.findMany()),
  //     ...(await prisma.births.findMany()),
  //     ...(await prisma.celebrations.findMany()),
  //     ...(await prisma.annivers.findMany()),
  //   ];
  // }

  products = products.map((product) => ({
    ...product,
    id: product.id.toString(), // Convert `bigint` to `string`
    fromprice: product.fromprice.toString(), // Convert `Decimal` to `string`
    toprice: product.toprice?.toString() || null, // Handle optional values and convert `Decimal` to `string`
    created_at: product.created_at ? product.created_at.toISOString() : null, // Convert `Date` to ISO string
    updated_at: product.updated_at ? product.updated_at.toISOString() : null, // Convert `Date` to ISO string
  }));

  console.log("Result", products);
  return {
    props: {
      products,
    },
  };
}
