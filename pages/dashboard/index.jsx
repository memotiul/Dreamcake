import Dashboard from "@/components/dashboard/dashboard";
import AddVanilla from "@/components/dashboard/addFlavour/addVanilla";
import AddButterscotch from "@/components/dashboard/addFlavour/addButterscotch";
import AddChocolate from "@/components/dashboard/addFlavour/addChocolate";
import AddMango from "@/components/dashboard/addFlavour/addMango";
import AddPineapple from "@/components/dashboard/addFlavour/addPineapple";
import AddRosmalai from "@/components/dashboard/addFlavour/addRosmalai";
import AddStrawberry from "@/components/dashboard/addFlavour/addStrawberry";
import ViewVanilla from "@/components/dashboard/viewFlavour/viewVanilla";
import ViewStrawberry from "@/components/dashboard/viewFlavour/viewStrawberry";
import ViewRosmalai from "@/components/dashboard/viewFlavour/viewRosmalai";
import ViewPineapple from "@/components/dashboard/viewFlavour/viewPineapple";
import ViewMango from "@/components/dashboard/viewFlavour/viewMango";
import ViewChocolate from "@/components/dashboard/viewFlavour/viewChocolate";
import ViewButterscotch from "@/components/dashboard/viewFlavour/viewButterscotch";
import AddDoremon from "@/components/dashboard/addCategory/addDoremon";
import AddMickeymouse from "@/components/dashboard/addCategory/addMickeymouse";
import AddTigereffect from "@/components/dashboard/addCategory/addTigereffect";
import AddBarbiedoll from "@/components/dashboard/addCategory/addBarbiedoll";
import AddRedvelvet from "@/components/dashboard/addCategory/addRedvelvet";
import AddBlackforest from "@/components/dashboard/addCategory/addBlackforest";
import AddBirthday from "@/components/dashboard/addCategory/addBirthday";
import AddAnniversary from "@/components/dashboard/addCategory/addAnniversary";
import AddCelebration from "@/components/dashboard/addCategory/addCelebration";
import AddFaultline from "@/components/dashboard/addCategory/addFaultline";
import ViewDoremon from "@/components/dashboard/viewCategory/viewDoremon";
import ViewMickeymouse from "@/components/dashboard/viewCategory/viewMickeymouse";
import ViewTigereffect from "@/components/dashboard/viewCategory/viewTigereffect";
import ViewBarbiedoll from "@/components/dashboard/viewCategory/viewBarbiedoll";
import ViewRedvelvet from "@/components/dashboard/viewCategory/viewRedvelvet";
import ViewBlackforest from "@/components/dashboard/viewCategory/viewBlackforest";
import ViewFaultline from "@/components/dashboard/viewCategory/viewFaultline";
import AddSurprise from "@/components/dashboard/addCategory/addSurprise";
import ViewBirthday from "@/components/dashboard/viewCategory/viewBirthday";
import ViewCelebration from "@/components/dashboard/viewCategory/viewCelebration";
import ViewAnniversary from "@/components/dashboard/viewCategory/viewAnniversary";
import ViewSurprise from "@/components/dashboard/viewCategory/viewSurprise";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import ViewCustomers from "@/components/dashboard/viewCustomers";
import Orders from "@/components/dashboard/orders";
import Profile from "@/components/dashboard/profile";
import AddReviewProducts from "@/components/dashboard/addMoreProducts/addReviewProducts";
import AddLatestProducts from "@/components/dashboard/addMoreProducts/addLatestProducts";
import AddTopRatedProducts from "@/components/dashboard/addMoreProducts/addTopRatedProducts";
import ViewReviewProducts from "@/components/dashboard/viewMoreProducts/viewReviewProducts";
import ViewLatestProducts from "@/components/dashboard/viewMoreProducts/viewLatestProducts";
import ViewTopRatedProducts from "@/components/dashboard/viewMoreProducts/viewTopRatedProducts";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function DashboardIndex({ session, products }) {
  const router = useRouter();
  const [component, setComponent] = useState("profille");
  const customerId = router.state?.customerId;
  useEffect(() => {
    const queryComponent = router.query.component || "profille";
    setComponent(queryComponent);
  }, [router.query.component]);
  // const { query } = router;
  // const { customer_id } = query.customer_id;
  // console.log("ID", customer_id);
  const renderComponent = () => {
    switch (component) {
      case "addButterscotch":
        return <AddButterscotch />;
      case "addChocolate":
        return <AddChocolate />;
      case "addMango":
        return <AddMango />;
      case "addPineapple":
        return <AddPineapple />;
      case "addRosmalai":
        return <AddRosmalai />;
      case "addStrawberry":
        return <AddStrawberry />;
      case "addBirthday":
        return <AddBirthday />;
      case "addCelebration":
        return <AddCelebration />;
      case "addAnniversary":
        return <AddAnniversary />;
      case "viewVanilla":
        return <ViewVanilla products={products} />;
      case "viewStrawberry":
        return <ViewStrawberry products={products} />;
      case "viewRosmalai":
        return <ViewRosmalai products={products} />;
      case "viewPineapple":
        return <ViewPineapple products={products} />;
      case "viewChocolate":
        return <ViewChocolate products={products} />;
      case "viewMango":
        return <ViewMango products={products} />;
      case "viewButterscotch":
        return <ViewButterscotch products={products} />;
      case "addDoremon":
        return <AddDoremon />;
      case "addMickeymouse":
        return <AddMickeymouse />;
      case "addTigereffect":
        return <AddTigereffect />;
      case "addBarbiedoll":
        return <AddBarbiedoll />;
      case "addRedvelvet":
        return <AddRedvelvet />;
      case "addBlackforest":
        return <AddBlackforest />;
      case "addFaultline":
        return <AddFaultline />;
      case "viewDoremon":
        return <ViewDoremon products={products} />;
      case "viewMickeymouse":
        return <ViewMickeymouse products={products} />;
      case "viewTigereffect":
        return <ViewTigereffect products={products} />;
      case "viewBarbiedoll":
      case "viewCelebration":
        return <ViewCelebration products={products} />;
      case "viewBirthday":
        return <ViewBirthday products={products} />;
      case "viewAnniversary":
        return <ViewAnniversary products={products} />;
      case "viewBarbiedoll":
        return <ViewBarbiedoll products={products} />;
      case "viewRedvelvet":
        return <ViewRedvelvet products={products} />;
      case "viewBlackforest":
        return <ViewBlackforest products={products} />;
      case "viewFaultline":
        return <ViewFaultline products={products} />;
      case "addSurprise":
        return <AddSurprise />;
      case "viewSurprise":
        return <ViewSurprise products={products} />;
      case "addVanilla":
        return <AddVanilla />;
      case "orders":
        return <Orders products={products} customerId={customerId} />;
      case "viewCustomers":
        return <ViewCustomers products={products} />;
      case "addReviewProducts":
        return <AddReviewProducts />;
      case "addTopRatedProducts":
        return <AddTopRatedProducts />;
      case "addLatestProducts":
        return <AddLatestProducts />;
      case "viewReviewProducts":
        return <ViewReviewProducts products={products} />;
      case "viewTopRatedProducts":
        return <ViewTopRatedProducts products={products} />;
      case "viewLatestProducts":
        return <ViewLatestProducts products={products} />;
      default:
        return <Profile />;
    }
  };

  return (
    <Dashboard session={session} customerId={customerId}>
      {renderComponent()}
    </Dashboard>
  );
}

export async function getServerSideProps(context) {
  const prisma = new PrismaClient();
  const session = await getSession(context);

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/auth/login",
  //       permanent: false,
  //     },
  //   };
  // }

  const { component } = context.query;

  // Fetch data based on the component
  let products = [];
  if (component === "viewVanilla") {
    products = await prisma.vanilla.findMany();
  } else if (component === "viewMango") {
    products = await prisma.mangos.findMany();
  } else if (component === "viewButterscotch") {
    products = await prisma.butter.findMany();
  } else if (component === "viewPineapple") {
    products = await prisma.pines.findMany();
  } else if (component === "viewStrawberry") {
    products = await prisma.straws.findMany();
  } else if (component === "viewChocolate") {
    products = await prisma.chocos.findMany();
  } else if (component === "viewPizza") {
    products = await prisma.pizzas.findMany();
  } else if (component === "viewPastaa") {
    products = await prisma.pasta.findMany();
  } else if (component === "viewBurger") {
    products = await prisma.burgers.findMany();
  } else if (component === "viewCinnamon") {
    products = await prisma.breads.findMany();
  } else if (component === "viewRosmalai") {
    products = await prisma.malais.findMany();
  } else if (component === "viewTigereffect") {
    products = await prisma.tigers.findMany();
  } else if (component === "viewDoremon") {
    products = await prisma.doremons.findMany();
  } else if (component === "viewMickeymouse") {
    products = await prisma.mickies.findMany();
  } else if (component === "viewSurprise") {
    products = await prisma.surprises.findMany();
  } else if (component === "barbies") {
    products = await prisma.barbies.findMany();
  } else if (component === "viewFaultline") {
    products = await prisma.lines.findMany();
  } else if (component === "viewRedvelvet") {
    products = await prisma.reds.findMany();
  } else if (component === "viewBlackforest") {
    products = await prisma.blacks.findMany();
  } else if (component === "viewBarbiedoll") {
    products = await prisma.barbies.findMany();
  } else if (component === "viewBirthDay") {
    products = await prisma.births.findMany();
  } else if (component === "viewCelebration") {
    products = await prisma.celebrations.findMany();
  } else if (component === "viewAnniversary") {
    products = await prisma.annivers.findMany();
  } else if (component === "orders") {
    products = await prisma.items.findMany();
  } else if (component === "viewCustomers") {
    products = await prisma.customers.findMany();
  } else if (component === "viewBirthday") {
    products = await prisma.births.findMany();
  } else if (component === "viewTopRatedProducts") {
    products = await prisma.topRatedProducts.findMany();
  } else if (component === "viewReviewProducts") {
    products = await prisma.reviewProducts.findMany();
  } else if (component === "viewLatestProducts") {
    products = await prisma.reviewProducts.findMany();
  }
  if (component === "viewCustomers") {
    products = products.map((product) => ({
      ...product,
      id: product.id.toString(), // Convert `bigint` to `string`
      subtotal: product.subtotal.toString(), // Convert `Decimal` to `string`
      total: product.total?.toString() || null,
      created_at: product.created_at ? product.created_at.toISOString() : null, // Convert `Date` to ISO string
      updated_at: product.updated_at ? product.updated_at.toISOString() : null, // Handle optional values and convert `Decimal` to `string`
      // Convert `Date` to ISO string
    }));
  } else if (component === "orders") {
    products = products.map((product) => ({
      ...product,
      id: product.id.toString(),
      customer_id: product.customer_id.toString(), // Convert `bigint` to `string`
      weightage: product.weightage.toString(), // Convert `Decimal` to `string`
      quantity: product.quantity?.toString() || null,
      price: product.price?.toString() || null,
      created_at: product.created_at ? product.created_at.toISOString() : null, // Convert `Date` to ISO string
      updated_at: product.updated_at ? product.updated_at.toISOString() : null, // Handle optional values and convert `Decimal` to `string`
      // Convert `Date` to ISO string
    }));
  } else {
    products = products.map((product) => ({
      ...product,
      id: product.id.toString(), // Convert `bigint` to `string`
      fromprice: product.fromprice.toString(), // Convert `Decimal` to `string`
      toprice: product.toprice?.toString() || null, // Handle optional values and convert `Decimal` to `string`
      created_at: product.created_at ? product.created_at.toISOString() : null, // Convert `Date` to ISO string
      updated_at: product.updated_at ? product.updated_at.toISOString() : null, // Convert `Date` to ISO string
    }));
  }
  // console.log(products);
  return {
    props: {
      session,
      products, // Pass data to the component
      component: component || "profile", // Default to "profile" if no component is selected
    },
  };
}
