"use client";
import Image from "next/image";
import Link from "next/link";
import noUser from "../../public/noUser.png";
import loginController from "../store/authenticationControlar";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import userDataStore from "../store/userDataController";
import axios from "axios";
import "@/app/globals.css";
import "./page.css"
import { SunIcon, ShoppingBasket, MoonIcon, X, SearchIcon } from "lucide-react";
import useToggleModeStore from "../store/modeController"
import useSearchStore from "../store/handlesearch"
import { useSearchedStore } from "../store/handlesearch.js";
import useCartStore from "../store/cartController";

const Nav = () => {
  const router = useRouter();
  const { loginSuccess } = loginController();
  const { cartIds } = useCartStore();
  const [productInCart, setProductInCart] = useState(new Set());
  const { userData, distroyUserData } = userDataStore();
  const { search, setSearch } = useSearchStore();
  const { mode, toggleMode } = useToggleModeStore();
  const { setSearchedProduct } = useSearchedStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
 
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

  function returnToBuyingPage(){
    router.push("/buyingpage")
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  function toggleSearchBar() {
    setIsSearchOpen(!isSearchOpen);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }

  // Cart counter component for reusability
  const CartCounter = ({ size, fontSize }) => (
    <div className={`absolute bg-red-600 text-center flex items-center justify-center rounded-full ${size} font-bold -top-1 -right-1 shadow-sm`}>
      <span className={`text-center text-white ${fontSize}`}>
        {productInCart.size > 0 ? productInCart.size : 0}
      </span>
    </div>
  );

  return (
    <div className="w-full nav">
      <div className="nav flex flex-col sm:flex-row justify-between px-1 sm:px-2">
        {/* Mobile Header - Only visible on small screens */}
        <div className="sm:hidden flex justify-between items-center w-full py-0">
          <div className="flex items-center gap-3 float-rigt">
            <button 
              onClick={toggleSearchBar}
              className="flex items-center justify-center w-8 h-8 rounded-full focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isSearchOpen ? 
                <X size={20} className={mode ? "text-gray-500" : "text-gray-400"} /> :
                <SearchIcon size={20} className={mode ? "text-gray-500" : "text-gray-400"} />
              }
            </button>
            
            <div className="py-1">
              <button 
                onClick={changeMode} 
                className="w-8 h-8 flex items-center justify-center rounded-full focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {mode ? 
                  <SunIcon size={20} className="text-gray-500" /> : 
                  <MoonIcon size={20} className="text-gray-500" />
                }
              </button>
            </div>
            
            <Link href={"/checkCart"}>
              <div className="relative cart flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <ShoppingBasket size={20} className={mode ? "text-darkGray" : "text-gray-400"} />
                <CartCounter size="w-5 h-5" fontSize="text-xs" />
              </div>
            </Link>
            
            <Link href={"/profile"}>
              <div className="profile w-8 h-8 flex items-center justify-center">
                <Image
                  src={noUser}
                  alt="profile"
                  className="rounded-full h-full w-full cursor-pointer object-cover border-2 border-gray-300"
                  priority
                />
              </div>
            </Link>
          </div>
        </div>
        
        {/* Mobile Search Bar - Full width on mobile when search is open */}
        <div className={`w-full ${isSearchOpen ? 'flex' : 'hidden'} sm:hidden transition-all duration-300`}>
          <div className="search-container flex flex-row w-full">
            <div className="search-div w-full h-10 overflow-hidden">
              <input
                type="search"
                className={`search border ${mode ? 'border-gray-300' : 'border-gray-700'} rounded-l-lg w-full outline-none bg-transparent py-2 px-3 h-full`}
                placeholder="Search Product"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  returnToBuyingPage();
                }}
                autoFocus={isSearchOpen}
              />
            </div>
            
            <div className="search-icon-div h-10">
              <button 
                className={`h-full flex items-center px-3 ${mode ? 'bg-gray-200' : 'bg-gray-700'} rounded-r-lg cursor-pointer`}
                onClick={() => searchSpecificProduct()}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  className="w-4 h-4 text-gray-500 font-bold"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="relative search-container hidden sm:flex flex-row w-[35%] px-3">
          <div className="search-div mt-[11px] w-full h-[35px] overflow-hidden">
            <input
              type="search"
              className="search border-none w-full outline-none bg-transparent py-1 px-3"
              placeholder="Search Product"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                returnToBuyingPage();
              }}
            />
          </div>
          
          <div className="search-icon-div overflow-hidden">
            
              <FontAwesomeIcon
                icon={faSearch}
                className="w-5 h-5 text-gray-500 font-bold mt-5"
              />
            
          </div>
        </div>

        <div className="hidden sm:flex px-3 flex-row gap-5 pt-2">
          <div className="py-2">
            <button 
              onClick={changeMode} 
              className="mt-2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none"
            >
              {mode ? 
                <SunIcon size={24} className="text-gray-500" /> : 
                <MoonIcon size={24} className="text-gray-500" />
              }
            </button>
          </div>
          
          <Link href={"/checkCart"}>
            <div className="relative cart mt-5 ml-1 p-2 flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <ShoppingBasket size={24} className={mode ? "text-darkGray" : "text-gray-400"} />
              <CartCounter size="w-6 h-6" fontSize="text-sm" />
            </div>
          </Link>

          <Link href={"/profile"}>
            <div className="profile w-10 h-10 mt-2 border-2 border-gray-300 rounded-full overflow-hidden hover:border-alibabaOrange transition-colors">
              <Image
                src={noUser}
                alt="profile"
                className="profileImage h-full w-full cursor-pointer object-cover"
                priority
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;