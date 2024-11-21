// pages/api/logout.js
import nookies from "nookies";

export default function handler(req, res) {
  if (req.method === "POST") {
    nookies.destroy(null, "authToken", { path: "/" });
    res.status(200).json({ success: true });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
