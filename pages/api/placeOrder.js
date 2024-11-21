// pages/api/checkout.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { customer, items, subtotal, total } = req.body;
    // console.log("Customer", customer);
    // console.log("Products", items);
    // console.log("Subtotal", subtotal);
    // console.log("Total", total);
    try {
      // Create customer entry
      const customerData = await prisma.customers.create({
        data: {
          fullname: customer.fullName,
          email: customer.email,
          mobile: customer.mobile,
          address: customer.address,
          landmark: customer.landMark,
          city: customer.city,
          pincode: customer.pinCode,
          subtotal: subtotal,
          total: total,
        },
      });

      // Create items entries
      for (const item of items) {
        const adjustedPrice =
          (Number(item.price) + 200 * ((item.size || 1) - 1)) * item.quantity;
        await prisma.items.create({
          data: {
            name: item.name,
            quantity: item.quantity,
            weightage: item.size,
            price: adjustedPrice,
            image: item.image,
            customer_id: customerData.id, // Assuming there is a foreign key relationship
          },
        });
      }

      res.status(200).json({ message: "Order placed successfully!" });
    } catch (error) {
      console.error("Error placing order:", error);
      res.status(500).json({ error: "Failed to place order." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
