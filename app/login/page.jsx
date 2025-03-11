"use client"
import register from "../../public/login.png";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import loginController from "../authenticationControlar";
import "./page.css";
import Cookies from "js-cookies";

const Login = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, loginSuccess } = loginController();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (response.status == 200) {
         Cookies.set("token", response.data.message, { expires: 1, httpOnly: true, }); 
         router.push("/buyingpage");
         setLoading(false);
      }
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
    setLoading(false);
  }

  return (
    <div>
      <div className="login-container w-[70%] mx-auto my-20 h-[400px] flex flex-row  shadow shadow-gray-500 rounded-lg">
        <div className="login-image w-[45%] h-full rounded-l-lg border-r border-gray-500">
          <div className="w-[100%] h-[100%]">
            <Image
              src={register}
              height={100}
              width={100}
              className="w-full h-full"
              alt="login"
              priority
            />
          </div>
        </div>
        <div className="login-form w-[55%] border rounded-r-lg px-4 py-1">
          <div className="py-4 text-2xl font-bold">Login</div>
          <div className="text-lightGray bg-red-600 rounded-lg px-3">
            {error}
          </div>
          <form onSubmit={handleLogin} className="text-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              autoComplete="on"
              placeholder="Please Enter Email"
              className="mb-4 p-2 w-full shadow-md shadow-gray-400 rounded text-[#333333]"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="on"
              name="password"
              placeholder="Please Enter Password"
              className="mb-4 p-2 w-full shadow-md shadow-gray-400 rounded text-[#333333]"
            />
            <Link href={"/register"} className="w-[100%] float-start py-3">
              Don't Have an
              <span className="text-alibabaOrange"> Account</span>
            </Link>
            <div>
              <button
                type="submit"
                className="rounded-lg w-[40%] text-white py-2 px-5 bg-alibabaOrange hover:bg-darkGray"
              >
                Login
                {loading ? "......" : ""}
              </button>
              <Link href={"/"}>
                <button
                  type="submit"
                  className="rounded-lg w-[40%] text-darkGray ml-4 py-2 px-5 border border-lightGray bg-white shadow-md shadow-gray-400"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
