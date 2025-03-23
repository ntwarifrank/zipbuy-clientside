'use client';

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCartPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState , useEffect} from "react";
import { useCartStore } from "../cartController";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSearchStore from "../handlesearch";
import "@/app/globals.css";
import "./page.css"
import Layout from "../layout/page"
import useToggleModeStore from "../modeController";
import { useToggleDashboardStateStore } from "../modeController";
import { useSearchedStore } from "../handlesearch";

const BuyingPage = () => {
   const router = useRouter();
   const [products, SetProducts] = useState([]);
   const [errorMessage, SetErrorMessage] = useState([]);
   const {cartIds,setCartIds} = useCartStore();
   const {search, setSearch} = useSearchStore();
   const {searchedProduct}  = useSearchedStore();
   const { mode }  =useToggleModeStore();
   const {dashboardState} = useToggleDashboardStateStore();
   const categoryAvailable = ["All", "Accessories", "Shoes", "Phones", "Speaker"]


   async function fetchProduct() {
     try {
       const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/allproducts`);
       SetProducts(response.data.productsData);
     } catch (error) {
       SetErrorMessage(error.response.data.message || "There is error Accured");
     }
   }
   useEffect(() => {
     fetchProduct();
   }, []);

   function addToCart(id){ 
       setCartIds(id); 
   }

   function handleCategorySearch(category){
        setSearch(category);
   }

   console.log("seachedproduct:" + searchedProduct);
  return (
    <Layout>
      <div className="w-full">
        {Array.isArray(searchedProduct) && searchedProduct.length > 0 && search ? (
          <div className="card-container flex flex-row flex-wrap gap-6 px-16 pb-32">
            {searchedProduct.map((product, index) =>
              product._id == 0 ? (
                <div key={index} className="px-20 w-full">
                  <p className={mode? "": "text-gray-200"}>No Searched Product</p>
                </div>
              ) : (
                <div
                    key={index}
                    className={mode ? `card ${ dashboardState ? "w-[24%]" : "w-[23%]"}  h-[280px] overflow-hidden`: `shadow-gray-800 shadow-sm rounded-lg card ${ dashboardState ? "w-[24%]" : "w-[23%]"}  h-[280px] overflow-hidden`}
                  >
                    <Link href={`/view/${product._id}`}>
                      <div className={`relative h-[60%] ${mode ? "bg-cardBackground" : "bg-gray-800"} `}>
                        <Image
                          src={product.productImages[0]}
                          alt="Product"
                          className="w-full h-full object-cover"
                          width={100}
                          height={100}
                          priority
                        />
                        <div className="absolute top-3 right-3 bg-alibabaOrange text-white text-sm font-bold py-1 px-3 rounded-lg">
                          {product.productDiscount}% OFF
                        </div>
                      </div>
                    </Link>
                    <div className="py-1 px-3 h-[40%] flex flex-col gap-1">
                      <div className={mode ? "text-md h-[50%] py-1 font-semibold flex flex-wrap text-black" : "text-darkText text-md h-[50%] py-1 font-semibold flex flex-wrap"}>
                        <Link href={`/view/${product._id}`} className="hover:text-gray-500">
                          {product.productName.length > 40
                            ? product.productName.slice(0, 40) + "..."
                            : product.productName}
                        </Link>
                      </div>
                      <div className="text-lg font-semibold text-gray-700 h-[50%] flex flex-row justify-between">
                        <div className="flex flex-col">
                          <div className="flex flex-row gap-2 font-bold text-sm">
                            <div className="text-alibabaOrange font-bold">
                                $
                                <span className="font-bold">
                                  {(
                                    product.productPrice -
                                    (product.productPrice / 100) *
                                      product.productDiscount
                                  ).toFixed(2)}
                                </span>
                              </div>
                              <div className="">
                                <del className="text-gray-500 font-semibold">
                                  $ <span>{product.productPrice}</span>
                                </del>
                              </div>
                          </div>
                          <div className="text-sm flex flex-row gap-3">
                            <div>
                              <p>15 selas</p>
                            </div>
                            <div className="flex flex-row">
                            <FontAwesomeIcon icon={faStar} className="text-alibabaOrange text-lg" />
                               <p className="px-2"> <span> 5.0(10) </span></p>
                            </div>
                               </div>
                          
                        </div>
                        <div>
                          <div
                            onClick={() => {
                              addToCart(product._id);
                            }}
                            className="w-full text-sm px-2 flex flex-row  py-1 text-white rounded-lg duration-200"
                          >
                              <FontAwesomeIcon
                                icon={faCartPlus}
                                className="w-6 h-6 text-xl cursor-pointer text-gray-400"
                              />
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
              )
            )}
          </div>
        ) : (
          <div className="large w-[100%] my-0 mx-auto">
            <div className="py-3 px-1">
              <div className="w-full mb-2 py-2">
                <div className="flex flex-row gap-3">
                  {categoryAvailable.map((category, index) =>(
                    <div 
                     key={index}
                     onClick={() => handleCategorySearch(category)}  
                      className={`${mode ? "": "bg-gray-800 text-gray-400"} px-4 py-1 rounded-full max-w-fit text-sm cursor-pointer`}>
                        <p>{category}</p>
                    </div>  
                  ))}       
                </div>
                
              </div>

              <div className={`card-container flex  flex-row flex-wrap gap-2 px-2`}>
                {products.map((product, index) => (
                  <div
                    key={index}
                    className={mode ? `card ${ dashboardState ? "w-[24%]" : "w-[23%]"}  h-[280px] overflow-hidden`: `shadow-gray-800 shadow-sm rounded-lg card ${ dashboardState ? "w-[24%]" : "w-[23%]"}  h-[280px] overflow-hidden`}
                  >
                    <Link href={`/view/${product._id}`}>
                      <div className={`relative h-[60%] ${mode ? "bg-cardBackground" : "bg-gray-800"} `}>
                        <Image
                          src={product.productImages[0]}
                          alt="Product"
                          className="w-full h-full object-cover"
                          width={100}
                          height={100}
                          priority
                        />
                        <div className="absolute top-3 right-3 bg-alibabaOrange text-white text-sm font-bold py-1 px-3 rounded-lg">
                          {product.productDiscount}% OFF
                        </div>
                      </div>
                    </Link>
                    <div className="py-1 px-3 h-[40%] flex flex-col gap-1">
                      <div className={mode ? "text-md h-[50%] py-1 font-semibold flex flex-wrap text-black" : "text-darkText text-md h-[50%] py-1 font-semibold flex flex-wrap"}>
                        <Link href={`/view/${product._id}`} className="hover:text-gray-500">
                          {product.productName.length > 40
                            ? product.productName.slice(0, 40) + "..."
                            : product.productName}
                        </Link>
                      </div>
                      <div className="text-lg font-semibold text-gray-700 h-[50%] flex flex-row justify-between">
                        <div className="flex flex-col">
                          <div className="flex flex-row gap-2 font-bold text-sm">
                            <div className="text-alibabaOrange font-bold">
                                $
                                <span className="font-bold">
                                  {(
                                    product.productPrice -
                                    (product.productPrice / 100) *
                                      product.productDiscount
                                  ).toFixed(2)}
                                </span>
                              </div>
                              <div className="">
                                <del className="text-gray-500 font-semibold">
                                  $ <span>{product.productPrice}</span>
                                </del>
                              </div>
                          </div>
                          <div className="text-sm flex flex-row gap-3">
                            <div>
                              <p>15 selas</p>
                            </div>
                            <div className="flex flex-row">
                            <FontAwesomeIcon icon={faStar} className="text-alibabaOrange text-lg" />
                               <p className="px-2"> <span> 5.0(10) </span></p>
                            </div>
                               </div>
                          
                        </div>
                        <div>
                          <div
                            onClick={() => {
                              addToCart(product._id);
                            }}
                            className="w-full text-sm px-2 flex flex-row  py-1 text-white rounded-lg duration-200"
                          >
                              <FontAwesomeIcon
                                icon={faCartPlus}
                                className="w-6 h-6 text-xl cursor-pointer text-gray-400"
                              />
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default BuyingPage;
