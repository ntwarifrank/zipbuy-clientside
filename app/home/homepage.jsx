"use client"
import car from "../../public/car.jpg";
import Image from "next/image";
import timer from "../../public/timer.png";
import bus from "../../public/bus.jpg";
import "./homepage.css";
import Footer from "../footer/page";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "@/app/globals.css";

const Homepage = () => {

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
       setError(error.response.data.errorMessage);
       setLoading(false);
     }
     setLoading(false);
   }

 

  return (
    <div className="w-[100%] mx-auto bg-lightGray">
      <div>
        <div className="w-[100%] h-[600px]">
          <div className=" absolute top-[170px] px-10 text-white">
            <p className="word1 text-2xl font-bold mb-4">
              Learn about zipbuy.com
            </p>
            <p className=" word2 text-4xl font-bold w-[700px]">
              The leading B2B ecommerce platform for global trade
            </p>
          </div>
          <Image
            src={car}
            className="w-full h-full object-cover"
            alt="car"
          ></Image>
        </div>
      </div>

      <div className="large-container w-[90%] mt-0 mx-auto text-darkGray px-4 py-3 flex flex-row justify-between my-16">
        <div className="ad-card h-[350px] px-6 py-10 rounded-lg bg-white shadow-md hover:bg-orange-200">
          <div className="w-[90px] h-[90px] text-darkGray hover:text-alibabaOrange">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="fill-current"
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM208.6 357.3l-39-13.5c-6.5-2.2-13.6-2.3-20.1-.3l-15.3 4.9c-18.5 5.9-38.5-2.4-47.5-19.5l-3.3-6.2c-10.6-20.1-2.3-45 18.2-54.7l35.3-16.8c2.3-1.1 4.4-2.8 5.9-4.8l5.3-7c7.2-9.6 18.6-15.3 30.6-15.3s23.4 5.7 30.6 15.3l4.6 6.1c2 2.6 4.9 4.5 8.1 5.1c7.8 1.6 15.7-1.5 20.4-7.9l10.4-14.2c2-2.8 5.3-4.4 8.7-4.4c4.4 0 8.4 2.7 10 6.8l10.1 25.9c2.8 7.2 6.7 14 11.5 20.2L311 299.8c5.8 7.4 9 16.6 9 26s-3.2 18.6-9 26L299 367.2c-8.3 10.6-21 16.8-34.4 16.8c-8.4 0-16.6-2.4-23.7-7l-25.4-16.4c-2.2-1.4-4.5-2.5-6.9-3.4zm65.2-214.8L296 164.7c10.1 10.1 2.9 27.3-11.3 27.3l-29.9 0c-5.6 0-11.1-1.2-16.2-3.4l-42.8-19c-14.3-6.3-11.9-27.3 3.4-30.3l38.5-7.7c13.1-2.6 26.7 1.5 36.1 10.9zM248 432c0-8.8 7.2-16 16-16l16 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16zM431.2 298.9l8 24c2.8 8.4-1.7 17.4-10.1 20.2s-17.4-1.7-20.2-10.1l-8-24c-2.8-8.4 1.7-17.4 10.1-20.2s17.4 1.7 20.2 10.1zm-19.9 80.4l-32 32c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l32-32c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
            </svg>
          </div>
          <div className="font-bold text-2xl py-3">
            Millions of business offerings
          </div>
          <div>
            Explore products and suppliers for your business from millions of
            offerings worldwide.
          </div>
        </div>

        <div className="ad-card h-[350px] px-6 py-10 rounded-lg bg-white shadow-md hover:bg-orange-200">
          <div className="w-[90px] h-[90px] text-darkGray hover:text-alibabaOrange">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="fill-current"
            >
              <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm64 96a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm64 128a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm128 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
            </svg>
          </div>
          <div className="font-bold text-2xl py-3">
            Assured quality and transactions
          </div>
          <div>
            Ensure production quality from verified suppliers, with your orders
            protected from payment to delivery.
          </div>
        </div>

        <div className="ad-card h-[350px] px-6 py-10 rounded-lg bg-white shadow-md hover:bg-orange-200">
          <div className="w-[90px] h-[90px] text-darkGray hover:text-alibabaOrange">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              className="fill-current"
            >
              <path d="M64 32C46.3 32 32 46.3 32 64l0 240 0 48 0 80c0 26.5 21.5 48 48 48l416 0c26.5 0 48-21.5 48-48l0-128 0-151.8c0-18.2-19.4-29.7-35.4-21.1L352 215.4l0-63.2c0-18.2-19.4-29.7-35.4-21.1L160 215.4 160 64c0-17.7-14.3-32-32-32L64 32z" />
            </svg>
          </div>
          <div className="font-bold text-2xl py-3">
            One-stop trading solution
          </div>
          <div>
            Order seamlessly from product/supplier search to order management,
            payment, and fulfillment.
          </div>
        </div>

        <div className="ad-card h-[350px] px-6 py-10 rounded-lg bg-white shadow-md hover:bg-orange-200">
          <div className="w-[90px] h-[90px] text-darkGray hover:text-alibabaOrange">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              className="fill-current"
            >
              <path d="M160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l50.7 0L9.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L256 109.3l0 50.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128c0-17.7-14.3-32-32-32L160 0zM576 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM448 208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM400 384a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm128 0a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM272 384a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM144 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM576 336a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm-48-80a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
            </svg>
          </div>
          <div className="font-bold text-2xl py-3">
            End-to-end business solutions
          </div>
          <div>
            Source products, establish partnerships, pay securely, and ship
            globally with a trusted platform.
          </div>
        </div>
      </div>

      <div className="w-[90%] mx-auto my-16 mid">
        <div className="form-container-big h-[430px] w-[full] flex flex-row">
          <div className="form-aside w-[50%] h-full bg-darkGray text-white py-24 rounded-l-lg">
            <div className="form-text px-10 text-5xl text-center font-bold">
              Register Now In February And Get 50% Discount For First Week
              <Image src={timer} className="w-[100px] h-[100px]" alt="timer" />
            </div>
          </div>
          <div className="form w-[50%] py-6 px-6 border-darkGray  bg-lightGray border-2 rounded-r-lg">
            <div className="text-red-500 rounded-lg px-3">{error}</div>
            <form onSubmit={handleSubmit} method="post">
              <label htmlFor="username">Full Name</label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                placeholder="Please Enter FullName"
                className="shadow-md shadow-gray-400 p-2 rounded-md mb-4"
              />

              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Please Enter Email"
                className="shadow-md shadow-gray-400 p-2 rounded-md mb-4"
              />

              <label htmlFor="password">Password</label>
              <input
                type="text"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Please Enter Password"
                className="shadow-md shadow-gray-400 p-2 rounded-md mb-4"
              />

              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                placeholder="Please Confirm Password"
                className="shadow-md shadow-gray-400 p-2 rounded-md mb-4"
              />

              <button
                type="submit"
                className="w-full mt-4 py-2 bg-darkGray text-white text-xl font-bold rounded-lg"
              >
                Register
                {loading ? "......" : ""}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="large-div-main w-[90%] mx-auto flex flex-row py-[50px] px-[40px] bg-orange-200">
        <div className="large-main w-[50%]">
          <p className="w-full font-bold text-4xl">
            Explore millions of offerings tailored to your business needs
          </p>
        </div>
        <div className="main-large w-[50%] flex flex-row flex-wrap">
          <div className="main-div w-[45%] h-[90px] mb-4 border-l-4 border-gray-500 p-4">
            <p className="text-3xl text-gray-500 font-bold">200M+</p>
            <span className="text-xl text-gray-700">Products</span>
          </div>

          <div className="main-div w-[50%] h-[90px] mb-4 border-l-4 border-gray-500 p-4">
            <p className="text-3xl text-gray-500 font-bold">200k+</p>
            <span className="text-xl text-gray-700">Suppliers</span>
          </div>

          <div className="main-div w-[50%] h-[90px] mb-4 border-l-4 border-gray-500 p-4">
            <p className="text-3xl text-gray-500 font-bold">5900</p>
            <span className="text-xl text-gray-700">Products Category</span>
          </div>

          <div className="main-div w-[50%] h-[90px] mb-4 border-l-4 border-gray-500 p-4">
            <p className="text-3xl text-gray-500 font-bold">200+</p>
            <span className="text-xl text-gray-700">Country and regions</span>
          </div>
        </div>
      </div>

      <div>
        <div className="house-last h-[250px] my-4 text-white">
          <div className="w-[90%] mx-auto h-[100%] relative text-center">
            <Image
              src={bus}
              className="w-full h-full object-cover backdrop-filter backdrop-blur-lg "
              alt="car"
            />
            <div className="absolute  font-bold text-5xl text-center text-gray-200 px-10 py-10  inset-0 backdrop-blur-sm bg-black/30">
              Discover the easiest way to shop online with ZipBuy’s seamless
              experience
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;
