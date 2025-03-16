"use client";
import Image from "next/image";
import Link from "next/link";
import america from "../../public/america.jpg";
import logo from "../../public/zipbuy-logo.png";
import profile from "../../public/profile.png";
import { FaShoppingCart } from "react-icons/fa";
import loginController from "../authenticationControlar";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useCartStore } from "../cartController";
import userDataStore from "../userDataController";
import axios from "axios";
import searchStore from "../handlesearch.js"

const Nav = () => {
  const router = useRouter();
  const { login, loginSuccess, logout } = loginController();
  const {search, setSearch} = searchStore();
  const [option, setOption] = useState("");
  const { cartIds } = useCartStore();
  const [productInCart, setProductInCart] = useState(new Set());
  const { userData, distroyUserData } = userDataStore();
  const [searched, setSearched] = useState("");



  useEffect(() => {
        function loginTrue(){
          if (userData) {
            loginSuccess();
          }
        }
         loginTrue();
  },[userData])
async function handleLogout() {
  try {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`,
      {},
      { withCredentials: true }
    );
    if(res.status == 200){
      logout();
      distroyUserData();
      router.push("/");
    }
  } catch (error) {
    console.error("Logout failed:", error);
  }
}

  useEffect(() => {
    setSearched(option)
  }, [option])

  useEffect(() => {
       setProductInCart(new Set(cartIds));
  }, [cartIds])

  async function searchSpecificProduct(e) {
   try {
     e.preventDefault();
     setSearch(e.target.value);

     const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/search`, { searched });
     if (res.status == 200) {
       setSearch(res.data.products);
     }
     
   } catch (error) {
    console.log(error);
   }
  }

  return (
    <div className="fixed w-full nav bg-lightGray">
      <div className="nav bg-darkGray flex flex-row p-2 text-white">
        <div className="brandName">
          <Image src={logo} alt="logo" className="w-[180px] h-[50px]" />
        </div>

        {userData ? (
          <div className="search-container flex flex-row">
            <div className="select-div ml-8 mt-[9px] text-black">
              <select
                name="products"
                value={option}
                onChange={(e) => {
                  setOption(e.target.value);
                }}
                className="py-[6px] px-3 border-2 border-darkGray outline-none rounded-l-lg cursor-pointer"
              >
                <option value=" ">All</option>
                <option value="pents">Pents</option>
                <option value="shirts">Shirts</option>
                <option value="watch">Watch</option>
                <option value="accessories">Accessories</option>
                <option value="laptops">Laptops</option>
                <option value="tablets">Tablets</option>
                <option value="phones">Phones</option>
                <option value="cameras">Cameras</option>
                <option value="headphones">Headphones</option>
                <option value="speakers">Speakers</option>
                <option value="televisions">Televisions</option>
                <option value="furniture">Furniture</option>
                <option value="shoes">Shoes</option>
                <option value="bags">Bags</option>
                <option value="jewelry">Jewelry</option>
                <option value="cosmetics">Cosmetics</option>
                <option value="books">Books</option>
                <option value="games">Games</option>
                <option value="toys">Toys</option>
                <option value="sports-equipment">Sports</option>
                <option value="outdoor">Outdoor</option>
                <option value="groceries">Groceries</option>
            
              </select>
            </div>

            <div className="search-div mt-[11px] bg-white h-[35px]">
              <input
                type="search"
                className="search border-none w-[400px] outline-none p-1 text-black"
                placeholder="Search Product"
                value={searched}
                onChange={(e) => {
                  setSearched(e.target.value);
                }}
              />
            </div>
            <div className="search-icon-div">
              <div className="h-9 mt-[11px] flex py-2 px-4 text-center justify-center bg-alibabaOrange rounded-r-lg cursor-pointer">
                <FontAwesomeIcon
                  onClick={searchSpecificProduct}
                  icon={faSearch}
                  className="w-5 h-5 text-white font-bold"
                ></FontAwesomeIcon>
              </div>
            </div>
          </div>
        ) : (
          <div className="search-container flex flex-row ml-16">
            <div className="select-div ml-4 mt-[14px] text-black">
              <select
                name="products"
                value={option}
                onChange={(e) => {
                  setOption(e.target.value);
                }}
                className="py-[6px] px-3 border-2 border-darkGray outline-none rounded-l-lg cursor-pointer"
              >
                <option value=" ">All</option>
                <option value="pents">Pents</option>
                <option value="shirts">Shirts</option>
                <option value="watch">Watch</option>
                <option value="accessories">Accessories</option>
                <option value="laptops">Laptops</option>
                <option value="tablets">Tablets</option>
                <option value="phones">Phones</option>
                <option value="cameras">Cameras</option>
                <option value="headphones">Headphones</option>
                <option value="speakers">Speakers</option>
                <option value="televisions">Televisions</option>
                <option value="furniture">Furniture</option>
                <option value="shoes">Shoes</option>
                <option value="bags">Bags</option>
                <option value="jewelry">Jewelry</option>
                <option value="cosmetics">Cosmetics</option>
                <option value="books">Books</option>
                <option value="games">Games</option>
                <option value="toys">Toys</option>
                <option value="sports-equipment">Sports </option>
                <option value="outdoor">Outdoor</option>
                <option value="groceries">Groceries</option>
              </select>
            </div>

            <div className="search-div mt-4 bg-white h-[35px]">
              <input
                type="search"
                className="search border-none mt-[2px] w-[400px] outline-none p-1 text-black"
                placeholder=" Search Product"
                value={searched}
                onChange={(e) => {
                  setSearched(e.target.value);
                }}
              />
            </div>
            <div className="search-icon-div">
              <div className="h-9 mt-4 flex py-2 px-4 text-center justify-center bg-alibabaOrange rounded-r-lg cursor-pointer">
                <FontAwesomeIcon
                  onClick={searchSpecificProduct}
                  icon={faSearch}
                  className="w-5 h-5 text-white font-bold"
                ></FontAwesomeIcon>
              </div>
            </div>
          </div>
        )}

        <div className="flag mr-4 ml-4 text-white mt-4">
          <div className="flex flex-row ">
            <Image
              src={america}
              alt="flag"
              className="w-10 h-6 cursor-pointer"
            />
            <p className="font-bold text-lightGray text-[15px] pl-2">En</p>
          </div>
        </div>
        {userData ? (
          <div className="w-[200px] profile flex flex-row gap-1 mt-3">
            <div className="profile w-10 h-10">
              <Image
                src={profile}
                alt="profile"
                className="rounded-full h-full w-full cursor-pointer object-cover"
              />
            </div>
            <div className="">
              <p className="mt-3 text-lightGr w-full">
                {userData ? userData.username : "No User Found"}
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
        {userData ? (
          <Link href={"/checkCart"}>
            <div className=" cart py-2 ml-1">
              <div className="prod absolute bg-red-600 text-center justify-center flex rounded-full w-8 h-8 pt-1 font-bold right-[115px] top-1">
                <span className="text-lightGray">
                  {productInCart.size > 0 ? productInCart.size : 0}
                </span>
              </div>
              <FaShoppingCart className="w-[80px] text-white h-[30px] mt-3" />
            </div>
          </Link>
        ) : (
          ""
        )}
        <div
          className={
            userData ? "flex flex-row gap-1" : "ml-32 flex flex-row gap-3 "
          }
        >
          {userData ? (
            <button
              onClick={handleLogout}
              className="px-3 ml-5 font-bold mt-3 text-lightGray h-8 rounded-md hover:text-alibabaOrange hover:bg-lightGray"
            >
              Logout
            </button>
          ) : (
            <div>
              <Link
                href="/login"
                className="pl-3 font-bold mt-3 text-lightGray hover:text-gray-600"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="pl-3 font-bold mt-3 text-lightGray hover:text-gray-600"
              >
                Join
              </Link>
            </div>
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Nav;
