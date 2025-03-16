"use client";
import car from "../../../public/car.jpg";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Nav from "@/app/nav/page";
import Footer from "@/app/footer/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useCartStore } from "@/app/cartController";

const View = () => {
  const [productData, setProductData] = useState({});
  const [proImage, setProImage] = useState("");
  const { cartIds, setCartIds } = useCartStore();
  const { id } = useParams();

  async function fectProductData() {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/${id}`);
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
  console.log("product image real", proImage);

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
  return (
    <div className="w-[100%]">
      <div>
        <Nav></Nav>
      </div>

      <div className="view-product pt-[90px] w-[90%] px-20 mb-10">
        <div className="bg-darkGray h-[450px] overflow-y-scroll text-gray-400 text-center rounded-lg p-2">
          <h1 className="font-bold">View</h1>
          <div className="flex flex-col gap-2 py-3">
            {productData?.productImages?.map((image, index) => (
              <div
                key={index}
                className="w-[70px] h-[70px] mx-auto"
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
                  className="object-cover w-full h-full rounded-md border-2 border-gray-200 cursor-pointer hover:border-4"
                ></Image>
              </div>
            ))}
          </div>
        </div>

        <div className="shadow-lg shadow-gray-800 rounded-lg p-4 h-[440px]">
          <div className="h-[7%] pb-1 font-bold">
            Title:{" "}
            {productData?.productName?.length > 20
              ? productData.productName.slice(0, 20)
              : productData.productName}
          </div>
          <div className="w[100%] h-[93%] relative">
            <div className="absolute top-[150px] font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                className="w-10 h-10 text-black bg-gray-500 p-2 rounded-full hover:bg-gray-400 hover:cursor-pointer "
                viewBox="0 0 448 512"
                onClick={decreaseImage}
              >
                <path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l160-160c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 96 184 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-184 0 0 96c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-160-160z" />
              </svg>
            </div>
            <Image
              src={
                proImage
                  ? productData?.productImages?.[proImage]
                  : productData?.productImages?.[0] || car
              }
              alt="main product image"
              width={100}
              height={100}
              className="w-[70%] mx-auto h-full object-cover rounded-lg"
            ></Image>
            <div className="absolute top-[150px] font-bold ml-[450px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                className="w-10 h-10 text-black bg-gray-500 p-2 rounded-full hover:bg-gray-400 hover:cursor-pointer "
                viewBox="0 0 512 512"
                onClick={increaseImage}
              >
                <path d="M334.5 414c8.8 3.8 19 2 26-4.6l144-136c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22l0 72L32 192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l288 0 0 72c0 9.6 5.7 18.2 14.5 22z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="rounded-lg shadow-lg shadow-gray-800 bg-white pt-2 pb-10 px-4">
          <div className="py-2">
            <p className="font-bold ">Title</p>
            <p>{productData.productName}</p>
          </div>
          <div className="bg-darkGray rounded-md p-2 text-white font-bold">
            <span>⭐⭐⭐⭐⭐</span>
            <span className="ml-4">5 Reviews</span>
          </div>
          <div>
            <p>
              Price:
              <span>
                <del>{productData.productPrice}</del>
              </span>
            </p>
          </div>
          <div className="py-2">
            <span className="text-2xl font-semibold text-gray-600 ml-1">
              Price:
            </span>
            <span className="font-bold text-2xl">$</span>
            <span className="text-2xl font-semibold ml-1">
              {(productData.productPrice -
                (productData.productPrice / 100) * productData.productDiscount).toFixed(2)}
            </span>
          </div>
          <div className="font-bold text-xl">
            <p>
              Discount: <span>{productData.productDiscount || 0}%</span>
            </p>
          </div>
          <div className="font-bold text-xl">
            <h3>Shipping Information:</h3>
            {productData.productShipping &&
            productData.productShipping.length > 0 ? (
              <div className="font-semibold text-lg text-gray-600">
                <p>
                  Weight:{" "}
                  {productData.productShipping[0].weight + "g" ||
                    "Not specified"}
                </p>
                <p>
                  Dimensions:{" "}
                  {productData.productShipping[1].dimensions || "Not specified"}
                </p>
                <p>
                  shippingCost:{" "}
                  {productData.productShipping[2].shippingCost ||
                    "Not specified"}
                </p>
                <p>
                  estimatedDelivery:{" "}
                  {productData.productShipping[3].estimatedDelivery ||
                    "Not specified"}
                </p>
              </div>
            ) : (
              <p>No shipping information available.</p>
            )}
          </div>

          <div className="w-[25%] my-2">
            <button
              onClick={() => {
                addToCart(productData._id);
              }}
              className="w-full text-sm px-2 flex flex-row  py-1 bg-orange-500 text-white rounded-lg duration-200"
            >
              <div>Add To</div>
              <div>
                <FontAwesomeIcon
                  icon={faCartPlus}
                  className="w-6 h-6 text-xl text-white"
                />
              </div>
            </button>
          </div>
          <div>
            <p className="font-bold py-2 text-xl">Product Description</p>
            <p className="text-gray-600">{productData.productDescription}</p>
          </div>
        </div>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default View;
