"use client"
import Nav from "../nav/page";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../footer/page";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { faArrowRight, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import "./page.css"
import axios from "axios";
import { useState , useEffect} from "react";
import { useCartStore } from "../cartController";
import Link from "next/link";
import { useRouter } from "next/navigation";
import userDataStore from "../userDataController.js";
import searchStore from "../handlesearch";

const BuyingPage = () => {
   const router = useRouter();
   const [products, SetProducts] = useState([]);
   const [errorMessage, SetErrorMessage] = useState([]);
   const {cartIds,setCartIds} = useCartStore();
   const [bannerProduct, setBannerProduct] = useState([]);
   const [increment, setIncrement] = useState(0);
   const {userData,setUserData} = userDataStore();
   const {search, setSearch} = searchStore();


   async function fetchProduct() {
     try {
       const response = await axios.get("http://localhost:5000/allproducts");
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

   useEffect(() => {
    setBannerProduct(products);
   }, [products]);

  function increaseBannerProduct(){
    if (increment <= bannerProduct.length - 2) {
      setIncrement((prev) => prev + 1);
    }
   else if(increment == bannerProduct.length - 1){
      setIncrement(0);
    }
    
  }

  function decreaseBannerProduct() {
    if (increment > 0 && increment < bannerProduct.length - 1) {
      setIncrement((prev) => prev - 1);
    } else if (increment === bannerProduct.length - 1) {
      setIncrement((prev) => prev - 1);
    }
    else if(increment === 0){
      setIncrement(bannerProduct.length - 1);
    }
  
  }

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/profile", {
        withCredentials: true,
      });
      if (!res.data.user.user){
        setCartIds([])
      }
       setUserData(res.data.user.user);
      console.log("User data:", res.data.user.user);
    } catch (error) {
      console.error("Error fetching user:", error);
      router.push("/login");
    }
  };

  fetchUser(); 
}, []);

  return (
    <div>
      <div>
        <Nav />
      </div>
      {Array.isArray(search) && search.length > 0 ? (
        <div className="card-container flex flex-row flex-wrap gap-6 py-[100px] px-16">
          {search.map((product, index) =>
            product._id == 0 ? (
              <div className="px-20 w-full">
                <div
                  key={index}
                  className="card w-[25%] h-[290px] bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="relative h-[60%]">
                    <Image
                      src={product.productImages[0]}
                      alt="Product"
                      className="w-full h-full object-cover"
                      width={100}
                      height={100}
                      priority
                    />
                  </div>
                  <div className="py-1 px-3 h-[40%] flex flex-col gap-1">
                    <div className="text-md h-[55%] font-semibold text-gray-900 flex flex-wrap">
                      {product.productName}
                    </div>
                    <div className="text-lg font-semibold text-gray-700 h-[45%] flex flex-row justify-between">
                      <div className="text-xl font-bold">
                        <div className="text-sm">
                          <del className="text-gray-500 font-bold">
                            $ <span>{product.productPrice}</span>
                          </del>
                        </div>
                        <div>
                          $
                          <span className="font-semibold">
                            {(
                              product.productPrice -
                              (product.productPrice / 100) *
                                product.productDiscount
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                key={index}
                className="card w-[20%] h-[290px] bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <Link href={`/view/${product._id}`}>
                  <div className="relative h-[60%]">
                    <Image
                      src={product.productImages[0]}
                      alt="Product"
                      className="w-full h-full object-cover"
                      width={100}
                      height={100}
                      priority
                    />
                    <div className="absolute top-3 right-3 bg-orange-500 text-white text-sm font-bold py-1 px-3 rounded-lg">
                      {product.productDiscount}% OFF
                    </div>
                  </div>
                </Link>
                <div className="py-1 px-3 h-[40%] flex flex-col gap-1">
                  <div className="text-md h-[55%] font-semibold text-gray-900 flex flex-wrap">
                    {product.productName}
                  </div>
                  <div className="text-lg font-semibold text-gray-700 h-[45%] flex flex-row justify-between">
                    <div className="text-xl font-bold">
                      <div className="text-sm">
                        <del className="text-gray-500 font-bold">
                          $ <span>{product.productPrice}</span>
                        </del>
                      </div>
                      <div>
                        $
                        <span className="font-semibold">
                          {(
                            product.productPrice -
                            (product.productPrice / 100) *
                              product.productDiscount
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          addToCart(product._id);
                        }}
                        className="w-full text-sm px-2 flex flex-row  py-1 bg-orange-500 text-white rounded-lg duration-200"
                      >
                        <div>Add</div>
                        <div>
                          <FontAwesomeIcon
                            icon={faCartPlus}
                            className="w-6 h-6 text-xl text-white"
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="large w-[90%] my-0 mx-auto pt-[80px]">
          <div className="px-12 py-4 h-[250px] w-full rounded-lg">
            {bannerProduct[increment] && (
              <div className="h-full w-full relative rounded-lg overflow-hidden shadow-lg shadow-gray-500">
                <div className="absolute top-20 z-10 left-3 bg-alibabaOrange cursor-pointer p-2 rounded-full shadow-lg shadow-gray-500 hover:bg-orange-700">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="w-6 h-6 text-white text-xl"
                    onClick={() => {
                      decreaseBannerProduct();
                    }}
                  />
                </div>
                <Image
                  src={bannerProduct[increment].productImages[0]}
                  alt="banner"
                  className="w-[30%] float-right h-full object-cover"
                  width={100}
                  height={100}
                  priority
                />

                <div className="absolute top-16 left-[320px] w-[38%] text-4xl font-bold">
                  <div className="text-gray-700">
                    {bannerProduct[increment].productName}
                  </div>
                </div>

                <div className="absolute  w-[28%] top-6 text-black text-2xl font-bold left-5">
                  <div>Now You Can Buy It For</div>
                  <br />
                  <div className="div-discount absolute top-12 left-12 right-0 w-[100px] py-2 px-2 bg-orange-500 text-white text-xl font-bold  rounded-lg">
                    {bannerProduct[increment].productDiscount}% OFF
                  </div>
                  <div className="div-price absolute top-28 flex flex-col left-2 right-0 text-center w-[130px] bg-orange-500 text-white text-xl font-bold  rounded-lg">
                    <div className="text-sm text-gray-200">
                      <span>$ </span>
                      <del>{bannerProduct[increment].productPrice}</del>
                    </div>
                    <div>
                      <span>$ </span>
                      <span>
                        {(
                          bannerProduct[increment].productPrice -
                          (bannerProduct[increment].productPrice / 100) *
                            bannerProduct[increment].productDiscount
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      addToCart(bannerProduct[increment]._id);
                    }}
                    className="div-cart absolute cursor-pointer top-32 left-36 right-0 w-[150px] py-2 px-4 bg-orange-500 text-white text-xl font-bold  rounded-lg"
                  >
                    Add To
                    <FontAwesomeIcon
                      icon={faCartPlus}
                      className="w-6 h-6 text-xl text-white"
                    />
                  </div>
                </div>

                <div className="increase-banner absolute top-20 left-2 bg-alibabaOrange cursor-pointer p-2 rounded-full ml-[90%] shadow-lg shadow-gray-500 hover:bg-orange-700">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="w-6 h-6 text-white text-xl"
                    onClick={() => {
                      increaseBannerProduct();
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="py-3 px-4">
            <div className="w-full bg-white text-gray-800 font-bold text-2xl mb-3 rounded-lg px-4 py-3">
              <div>Popular Product</div>
            </div>

            <div className="card-container flex flex-row flex-wrap gap-6">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="card w-[20%] h-[290px] bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <Link href={`/view/${product._id}`}>
                    <div className="relative h-[60%]">
                      <Image
                        src={product.productImages[0]}
                        alt="Product"
                        className="w-full h-full object-cover"
                        width={100}
                        height={100}
                        priority
                      />
                      <div className="absolute top-3 right-3 bg-orange-500 text-white text-sm font-bold py-1 px-3 rounded-lg">
                        {product.productDiscount}% OFF
                      </div>
                    </div>
                  </Link>
                  <div className="py-1 px-3 h-[40%] flex flex-col gap-1">
                    <div className="text-md h-[55%] font-semibold text-gray-900 flex flex-wrap">
                      <Link href={`/view/${product._id}`} className="hover:text-alibabaOrange">
                        {product.productName.length > 50
                          ? product.productName.slice(0, 55) + "..."
                          : product.productName}
                      </Link>
                    </div>
                    <div className="text-lg font-semibold text-gray-700 h-[45%] flex flex-row justify-between">
                      <div className="text-xl font-bold">
                        <div className="text-sm">
                          <del className="text-gray-500 font-bold">
                            $ <span>{product.productPrice}</span>
                          </del>
                        </div>
                        <div>
                          $
                          <span className="font-semibold">
                            {(
                              product.productPrice -
                              (product.productPrice / 100) *
                                product.productDiscount
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            addToCart(product._id);
                          }}
                          className="w-full text-sm px-2 flex flex-row  py-1 bg-orange-500 text-white rounded-lg duration-200"
                        >
                          <div>Add</div>
                          <div>
                            <FontAwesomeIcon
                              icon={faCartPlus}
                              className="w-6 h-6 text-xl text-white"
                            />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default BuyingPage;
