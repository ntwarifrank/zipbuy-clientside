"use client";
import register from "../../public/register.png";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "@/app/globals.css";
import "./page.css"

const Register = () => {
  const router = useRouter();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register`, {
        username,
        email,
        password,
        confirmPassword,
      });

      if (response.status == 200) {
        router.push("/login");
        setLoading(false);
      } else {
        console.log(response);
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
      <div className="register-container w-[70%] mx-auto my-20 h-[410px] flex flex-row text-darkGray shadow-md shadow-gray-500 rounded-lg">
        <div className="register-image w-[45%] h-full border  rounded-l-lg">
          <div className="w-[100%] h-[100%]">
            <Image
              src={register}
              height={100}
              width={100}
              className="w-full h-full"
              alt="register"
            ></Image>
          </div>
        </div>
        <div className="register-form w-[55%] border rounded-r-lg px-4 py-1">
          <div className="py-4 text-2xl font-bold">Register</div>
          <div className="text-lightGray bg-red-600 rounded-lg px-3">{error}</div>
          <form onSubmit={handleSubmit} className="text-center">
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              placeholder="Please Enter FullName"
              className="shadow-md shadow-gray-400 p-2 rounded-md mb-4"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Please Enter Email"
              className="shadow-md shadow-gray-400 p-2 rounded-md mb-4"
            />
            <input
              type="text"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Please Enter Password"
              className="shadow-md shadow-gray-400 p-2 rounded-md mb-4"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              placeholder="Please Confirm Password"
              className="shadow-md shadow-gray-400 p-2 rounded-md mb-4"
            />
            <Link href={"/login"} className="w-[100%] float-start py-3">
              Already Have an
              <span className="text-alibabaOrange"> Account</span>
            </Link>
            <div>
              <button
                type="submit"
                className="rounded-lg w-[40%] text-white py-2 px-5 bg-alibabaOrange hover:bg-darkGray"
              >
                Register
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

export default Register;
