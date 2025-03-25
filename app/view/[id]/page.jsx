"use client";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useCartStore } from "@/app/cartController";
import "@/app/globals.css";
import "./page.css";
import Layout from "@/app/layout/page";
import useToggleModeStore from "@/app/modeController";
import imageLoading from "../../../public/image-loading.png"
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useToggleDashboardStateStore } from "@/app/modeController";
import Link from "next/link";

const View = () => {
  const [productData, setProductData] = useState({});
  const [proImage, setProImage] = useState("");
  const [relatedProduct, setRelatedProduct] = useState([]);
  const { cartIds, setCartIds } = useCartStore();
  const {mode} = useToggleModeStore();
  const { id } = useParams();
  const { dashboardState } = useToggleDashboardStateStore()

  async function fectProductData() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/${id}`
      );
      if (response) {
        setProductData(response.data.product);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fectProductData();
  }, [id]);

  function displayimage(index) {
    setProImage(Number(index));
  }
  //console.log("product image real", proImage);

  function increaseImage() {
    if (productData.productImages.length - 1 > proImage) {
      setProImage((prev) => Number(prev) + 1);
    } else if (productData.productImages.length == proImage) {
      setProImage((prev) => Number(prev));
    }
  }

  function decreaseImage() {
    if (productData.productImages.length > 0 && proImage >= 1) {
      setProImage((prev) => Number(prev) - 1);
    } else {
      setProImage((prev) => Number(prev));
    }
  }

  function addToCart(id) {
    if (cartIds.includes(id)) {
      return;
    } else {
      setCartIds(id);
    }
  }

  useEffect(() => {
    handleRelatedProduct();
  }, [productData]);

  async function handleRelatedProduct() {
    if (productData && productData.productCategory) {
      const category = productData.productCategory;
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/related`,
        { category }
      );
      if (res.status == 200) {
        setRelatedProduct(res.data.products);
      }
    }
  }

  return (
    <Layout>
      <div className="w-[100%] pt-10">
      <div className="w-[80%] px-10 pb-1 font-bold">
                  Discover/
                  <span className="px-2">{productData?.productCategory}</span>
                </div>
        <div className="view-product w-[100%] px-5 flex flex-row">
          <div className="w-[70%] flex flex-col gap-20 ">
            <div className="flex flex-row">
              <div className="h-[450px] w-[25%] overflow-y-scroll scrollbar-track-transparent scrollbar-thin scrollbar-hover:bg-gray-500  scrollbar-thumb-gray-400 text-center rounded-lg p-2">
                <h1 className="font-bold">View</h1>
                <div className="flex flex-col gap-2 py-3">
                  {productData?.productImages?.map((image, index) => (
                    <div
                      key={index}
                      className="w-[80%] h-[80px] mx-auto border-2 border-gray-500 rounded-lg p-2 bg-viewCoverColor hover:p-1"
                      onClick={() => {
                        displayimage(index);
                      }}
                    >
                      <Image
                        src={image}
                        key={index}
                        alt="product image"
                        width={80}
                        height={20}
                        className="object-cover w-full h-full rounded-md cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg p-4 h-[440px] w-[75%]">
                
                <div className="w-[100%] bg-viewCoverColor h-[300px] relative">
                  <div className="absolute top-[130px] font-bold">
                    <ChevronLeft
                      size={20}
                      onClick={decreaseImage}
                      strokeWidth={5}
                      className={`${mode? "text-gray-500 hover:text-gray-700":"text-gray-500 hover:text-gray-700"} w-10 h-10 p-2 rounded-full hover:cursor-pointer`}
                    />
                  </div>
                  <div className="mt-10 px-20  w-[100%] h-[300px]">
                    <Image
                      src={
                        proImage
                          ? productData?.productImages?.[proImage]
                          : productData?.productImages?.[0] || imageLoading
                      }
                      alt="main product image"
                      width={100}
                      height={100}
                      className="w-[80%] h-full rounded-lg object-contain"
                    />
                  </div>
                  <div className="absolute top-[130px] font-bold right-2">
                    <ChevronRight
                      size={20}
                      onClick={increaseImage}
                      strokeWidth={5}
                      className={`${mode? "text-gray-500 hover:text-gray-700":"text-gray-500 hover:text-gray-700"} w-10 h-10 p-2 rounded-full hover:cursor-pointer`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-xl py-3 px-4">
                <p>May Also Like</p>
              </div>
              <div className="card-container flex flex-row flex-wrap gap-2 px-5 w-full">
                  {relatedProduct.filter((productRel) => (productRel._id !== productData._id)).map((product, index) => (
                    <div
                      key={index}
                      className={`card ${ mode ? dashboardState? "w-[30%]": "w-[35%]": `shadow-gray-800 shadow-sm rounded-lg ${dashboardState ? "w-[30%]" : "w-[30%]"
                            }`
                      } h-[280px] overflow-hidden`}
                    >
                      <Link href={`/view/${product._id}`}>
                        <div className={`relative h-[60%] ${mode ? "bg-cardBackground" : "bg-gray-800"}`}>
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
                        <div
                          className={`text-md h-[50%] py-1 font-semibold flex flex-wrap ${
                            mode ? "text-black" : "text-darkText"
                          }`}
                        >
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
                                <span>
                                  {(
                                    product.productPrice -
                                    (product.productPrice / 100) * product.productDiscount
                                  ).toFixed(2)}
                                </span>
                              </div>
                              <div>
                                <del className="text-gray-500 font-semibold">
                                  $ <span>{product.productPrice}</span>
                                </del>
                              </div>
                            </div>

                            <div className="text-sm flex flex-row gap-3">
                              <div>
                                <p>15 sales</p>
                              </div>
                              <div className="flex flex-row">
                                <FontAwesomeIcon icon={faStar} className="text-alibabaOrange text-lg" />
                                <p className="px-2">
                                  <span>5.0 (10)</span>
                                </p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div
                              onClick={() => addToCart(product._id)}
                              className="w-full text-sm px-2 flex flex-row py-1 text-white rounded-lg duration-200"
                            >
                              <FontAwesomeIcon icon={faCartPlus} className="w-6 h-6 text-xl cursor-pointer text-gray-400" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

            </div>
          </div>

          {/* Product Details Section */}
          <div className={`w-[30%]  ${mode? "text-gray-800": "text-gray-400"} pt-2 pb-10 px-4`}>
            <div className="pt-2 font-bold text-lg capitalize">
              <p>{productData.productName}</p>
            </div>
            <div className="text-gray-500 ">
              ZipBuy Online Shopping
            </div>
            <div className="rounded-md py-2 flex flex-row gap-6">
              <div> 
                <span className="font-bold text-alibabaOrange">
                  ${(
                    productData.productPrice -
                    (productData.productPrice / 100) * productData.productDiscount
                  ).toFixed(2)}
                </span>
              </div>
              <div className="text-gray-500">
                <span>
                    <del>${productData.productPrice}</del>
                </span>
              </div>

            </div>

            <div className="flex flex-row justify-between">
               <div>
                  <p className="ml-1">
                    15 sales ⭐<span>5.0(10)</span>
                  </p>
               </div>
               <div className="">
                  <div
                    onClick={() => {
                      addToCart(productData._id);
                    }}
                    className={`${mode ?"text-gray-500": "text-gray-400"}`}
                  >
                    <FontAwesomeIcon icon={faCartPlus} className="w-6 h-6 text-xl" />
                  </div>
               </div>
            </div>
            <div >
              <h3 className="font-bold text-xl py-1">Shipping Information:</h3>
              {productData.productShipping &&
              productData.productShipping.length > 0 ? (
                <div className="">
                  <p>
                    <span className="font-semibold pr-3">
                      Weight:
                    </span>
                    {productData.productShipping[0].weight + "g" ||
                      "Not specified"}
                  </p>
                  <p>
                    <span className="font-semibold pr-3">
                      Dimensions:
                    </span>
                        {productData.productShipping[1].dimensions ||
                      "Not specified"}
                  </p>
                  <p>
                    <span className="font-semibold pr-3">
                      Shipping Cost:
                    </span>
                    
                    {productData.productShipping[2].shippingCost ||
                      "Not specified"}
                  </p>
                  <p>
                  <span className="font-semibold pr-3">
                      Estimated Delivery:
                    </span>
                    {productData.productShipping[3].estimatedDelivery ||
                      "Not specified"}
                  </p>
                </div>
              ) : (
                <p>No shipping information available.</p>
              )}
            </div>
            
            <div>
              <p className="text-2xl font-bold py-1">About Product</p>
              {productData.productDescription}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default View;
