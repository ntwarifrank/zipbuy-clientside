"use client";
import Image from "next/image";
import Link from "next/link";
import noUser from "../../public/noUser.png";
import loginController from "../authenticationControlar";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useCartStore } from "../cartController";
import userDataStore from "../userDataController";
import axios from "axios";
import "@/app/globals.css";
import "./page.css"
import { SunIcon, ShoppingBasket, MoonIcon } from "lucide-react";
import useToggleModeStore from "../modeController"
import useSearchStore from "../handlesearch"
import { useSearchedStore } from "../handlesearch.js";

const Nav = () => {
  const router = useRouter();
  const { loginSuccess,} = loginController();
  const { cartIds } = useCartStore();
  const [productInCart, setProductInCart] = useState(new Set());
  const { userData, distroyUserData } = userDataStore();
  const {search, setSearch} = useSearchStore();
  const {mode , toggleMode} = useToggleModeStore();
  const {setSearchedProduct} = useSearchedStore();

 
  useEffect(() => {
    if(search.trim()){
      searchSpecificProduct();
    }
  }, [search]);

  async function searchSpecificProduct() {
   try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/search`, { search });
          if (res.status == 200) {
             setSearchedProduct(res.data.products); 
          }
          router.push("/buyingpage")
   } catch (error) {
    console.log(error);
   }
  }


  useEffect(() => {
       setProductInCart(new Set(cartIds));
  }, [cartIds])

  

 

  function changeMode(){
    toggleMode();
  }

  return (
    <div className=" w-[100%] nav">
      <div className="nav flex flex-row justify-between p-2 text-white">
          <div className="relative search-container flex flex-row w-[40%] px-3">
            <div className=" search-div mt-[11px] w-full bg-white h-[35px] rounded-3xl overflow-hidden">
              <input
                type="search"
                className="search border-none w-full outline-none py-1 px-3 text-black "
                placeholder="Search Product"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
            <div className="absolute right-2 search-icon-div overflow-hidden">
              <div className="h-9 mt-[11px] flex py-2 px-4 text-center justify-center rounded-r-3xl overflow-hidden cursor-pointer">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="w-5 h-5 text-gray-500 font-bold"
                ></FontAwesomeIcon>
              </div>
            </div>
          </div>

          

        
         <div className="px-3 flex flex-row gap-5">
              <div className="py-2">
                {mode? <SunIcon size={24} onClick={changeMode} className="text-gray-500 "/> : <MoonIcon size={24} onClick={changeMode} className="text-gray-500 "/>}
              
              </div>
              <Link href={"/checkCart"}>
                  <div className="relative cart py-2 ml-1">
                    <div className="prod absolute bg-red-600 text-center justify-center flex rounded-full w-6 text-sm h-6 font-bold top-0 right-0">
                      <span className="text-center border-y-alibabaOrange text-white">
                        {productInCart.size > 0 ? productInCart.size : 0}
                      </span>
                    </div>
                    <ShoppingBasket size={28} className={mode? "text-darkGray  mt-3": "text-gray-400 mt-3"} />
                  </div>
                </Link>

                <div className="profile flex flex-row gap-1 mt-3">
                  <Link href={"/profile"}>
                    <div className="profile w-8 h-8">
                      <Image
                        src={noUser}
                        alt="profile"
                        className="rounded-full h-full w-full cursor-pointer object-cover"
                      />
                    </div>
                  </Link>
                </div>
         </div>

      </div>
      <div></div>
    </div>
  );
};

export default Nav;
