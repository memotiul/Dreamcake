import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function Login() {
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const handleLogin = async (data) => {
    setError(null);

    const res = await fetch("/api/adminLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.success) {
      // If login is successful, navigate to the profile page
      router.push(`/dashboard`);
    } else {
      setError(result.message);
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
        <form className="mt-8" onSubmit={handleSubmit(handleLogin)}>
          <div>
            <label className="block mb-2 text-white" htmlFor="email">
              Email
            </label>
            <input
              className="w-full p-2 mb-6 text-black border-b-2  outline-none"
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-white" htmlFor="password">
              Password
            </label>
            <input
              className="w-full p-2 mb-6 text-black border-b-2  outline-none"
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div>
            <input
              className="w-full bg-yellow-400 cursor-pointer text-black font-bold py-2 px-4 mb-6 rounded"
              type="submit"
              value="Login"
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
    // <div className="login-container mt-40">
    //   <h2>Login</h2>
    //   <form onSubmit={handleLogin}>
    //     <div>
    //       <label htmlFor="email">Email:</label>
    //       <input
    //         type="email"
    //         id="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="password">Password:</label>
    //       <input
    //         type="password"
    //         id="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //       />
    //     </div>
    //     {error && <p style={{ color: "red" }}>{error}</p>}
    //     <button type="submit">Login</button>
    //   </form>
    // </div>
  );
}
