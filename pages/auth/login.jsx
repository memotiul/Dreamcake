import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous error

    const result = await signIn("credentials", {
      redirect: false, // Do not redirect automatically
      email,
      password,
    });

    if (!result.error) {
      // Login successful, redirect to dashboard
      router.push("/dashboard");
    } else {
      // Set error message based on result
      setError("Please enter valid email & password.");
    }
  };

  return (
    <div className="flex h-screen ">
      <div className="w-full max-w-xs m-auto border border-white rounded p-5">
        <header>
          <div className="flex flex-col justify-center items-center">
            <img
              rel="logo"
              src="/images/dclogo.png"
              className="w-20 mx-auto"
              type="image/x-icon"
            />
            <div className="text-2xl font-bold uppercase font-oswald text-white ">
              Dream<span className="text-yellow-400">Cake</span>
            </div>
          </div>
        </header>
        <form className="mt-8" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-white" htmlFor="email">
              Email
            </label>
            <input
              className="w-full p-2 mb-6 text-black border-b-2 outline-none"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div>
            <label className="block mb-2 text-white" htmlFor="password">
              Password
            </label>
            <input
              className="w-full p-2 mb-6 text-black border-b-2 outline-none"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-yellow-400 cursor-pointer text-black font-bold py-2 px-4 mb-6 rounded"
            >
              Login
            </button>
          </div>
          {/* Display error message if it exists */}
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}
