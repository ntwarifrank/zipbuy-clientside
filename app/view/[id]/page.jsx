"use client";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import useCartStore from "../../store/cartController";
import "@/app/globals.css";
import "./page.css";
import Layout from "@/app/layout/page";
import useToggleModeStore from "../../store/modeController";
import imageLoading from "../../../public/image-loading.png";
import useToggleDashboardStateStore from "../../store/modeController";
import Link from "next/link";
import Nav from "../../nav/page";

const View = () => {
  const [productData, setProductData] = useState({});
  const [proImage, setProImage] = useState("");
  const [relatedProduct, setRelatedProduct] = useState([]);
  const { cartIds, setCartIds } = useCartStore();
  const { mode } = useToggleModeStore();
  const { id } = useParams();
  const { dashboardState } = useToggleDashboardStateStore();
  const [showMore, setShowMore] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

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

  function increaseImage() {
    if (productData.productImages?.length - 1 > proImage) {
      setProImage((prev) => Number(prev) + 1);
    } else if (productData.productImages?.length == proImage) {
      setProImage((prev) => Number(prev));
    }
  }

  function decreaseImage() {
    if (productData.productImages?.length > 0 && proImage >= 1) {
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
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 1500);
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

  const showMoreFun = () => {
    setShowMore(!showMore);
  };

  return (
    <Layout>
      <div className="w-full">
        <div>
          <Nav />
        </div>
        
        {/* Breadcrumb */}
        <div className="w-full px-4 sm:px-6 lg:px-10 py-2">
          <div className="flex items-center text-sm">
            <Link href="/" className="text-gray-500 hover:text-alibabaOrange">Home</Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-500">{productData?.productCategory}</span>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-700 dark:text-gray-300 truncate max-w-[150px]">
              {productData?.productName?.slice(0, 20)}...
            </span>
          </div>
        </div>
        
        {/* Main product container */}
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Product images section */}
            <div className="w-full lg:w-2/3">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Thumbnails */}
                <div className="md:w-1/4 order-2 md:order-1">
                  <h3 className="font-bold text-center mb-2 hidden md:block">Gallery</h3>
                  <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:h-[450px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent p-2">
                    {productData?.productImages?.map((image, index) => (
                      <div
                        key={index}
                        className={`min-w-[70px] h-[70px] border-2 ${
                          proImage === index ? "border-alibabaOrange" : "border-gray-300"
                        } rounded-lg p-1 hover:border-alibabaOrange cursor-pointer transition-all`}
                        onClick={() => displayimage(index)}
                      >
                        <Image
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full rounded-md"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main image */}
                <div className="md:w-3/4 order-1 md:order-2">
                  <div className="relative w-full h-[350px] sm:h-[450px] bg-viewCoverColor rounded-lg flex items-center justify-center">
                    <button 
                      onClick={decreaseImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    
                    <div className="w-4/5 h-4/5 flex items-center justify-center">
                      <Image
                        src={
                          proImage !== ""
                            ? productData?.productImages?.[proImage]
                            : productData?.productImages?.[0] || imageLoading
                        }
                        alt="Main product image"
                        width={400}
                        height={400}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    
                    <button 
                      onClick={increaseImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product details section */}
            <div className="w-full lg:w-1/3">
              <div className={`p-4 rounded-lg ${mode ? "bg-white shadow-sm" : "bg-gray-800"}`}>
                {/* Product name */}
                <h1 className={`text-xl sm:text-2xl font-bold mb-2 ${mode ? "text-gray-800" : "text-gray-200"}`}>
                  {productData.productName}
                </h1>
                
                {/* Store name */}
                <div className="text-gray-500 text-sm mb-3">
                  ZipBuy Online Shopping
                </div>
                
                {/* Price section */}
                <div className="flex items-baseline mb-4">
                  <span className="text-2xl font-bold text-alibabaOrange mr-3">
                    ${productData.productPrice && productData.productDiscount
                      ? (
                          productData.productPrice -
                          (productData.productPrice / 100) * productData.productDiscount
                        ).toFixed(2)
                      : "0.00"}
                  </span>
                  <span className="text-gray-500 line-through">
                    ${productData.productPrice}
                  </span>
                  {productData.productDiscount && (
                    <span className="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded">
                      {productData.productDiscount}% OFF
                    </span>
                  )}
                </div>
                
                {/* Ratings and sales */}
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span>15 sales</span>
                  <span className="mx-2">•</span>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-1" />
                    <span>5.0 (10)</span>
                  </div>
                </div>
                
                {/* Add to cart button */}
                <div className="mb-6">
                  <button
                    onClick={() => addToCart(productData._id)}
                    className={`w-full py-3 rounded-lg font-medium transition-colors ${
                      cartIds.includes(productData._id)
                        ? "bg-green-500 text-white"
                        : "bg-alibabaOrange hover:bg-orange-600 text-white"
                    }`}
                  >
                    <FontAwesomeIcon icon={faCartPlus} className="mr-2" />
                    {cartIds.includes(productData._id) ? "Added to Cart" : "Add to Cart"}
                  </button>
                  
                  {addedToCart && (
                    <div className="mt-2 text-center text-green-500 text-sm">
                      Product added to your cart!
                    </div>
                  )}
                </div>
                
                {/* Shipping information */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-5">
                  <h3 className="font-bold text-lg mb-3">
                    Shipping Information:
                  </h3>
                  
                  {productData.productShipping && productData.productShipping.length > 0 ? (
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                      <div className="font-medium">Weight:</div>
                      <div>{productData.productShipping[0].weight + "g" || "Not specified"}</div>
                      
                      <div className="font-medium">Dimensions:</div>
                      <div>{productData.productShipping[1].dimensions || "Not specified"}</div>
                      
                      <div className="font-medium">Shipping Cost:</div>
                      <div>{productData.productShipping[2].shippingCost || "Not specified"}</div>
                      
                      <div className="font-medium">Estimated Delivery:</div>
                      <div>{productData.productShipping[3].estimatedDelivery || "Not specified"}</div>
                    </div>
                  ) : (
                    <p className="text-gray-500">No shipping information available.</p>
                  )}
                </div>
                
                {/* Product description */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h3 className="font-bold text-lg mb-3">About Product</h3>
                  
                  <div className={`${showMore ? "max-h-full" : "max-h-[200px] relative"} overflow-hidden`}>
                    <p className={`text-sm ${mode ? "text-gray-700" : "text-gray-300"}`}>
                      {productData.productDescription}
                    </p>
                    
                    {!showMore && (
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-gray-800 to-transparent"></div>
                    )}
                  </div>
                  
                  <button
                    className="mt-2 text-lighGray hover:underline font-medium"
                    onClick={showMoreFun}
                  >
                    {showMore ? "Show Less" : "Show More"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related products section */}
          <div className="mt-10 mb-10">
            <h2 className="text-xl font-bold mb-6">You May Also Like</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {relatedProduct
                .filter((productRel) => productRel._id !== productData._id)
                .slice(0, 4)
                .map((product, index) => (
                  <div
                    key={index}
                    className={`rounded-lg overflow-hidden transition-all ${
                      mode ? "shadow-sm hover:shadow-md" : " shadow-gray-700 hover:shadow-gray-600"
                    }`}
                  >
                    <Link href={`/view/${product._id}`}>
                      <div className={`relative h-48 ${mode ? 'bg-cardBackground' : 'bg-gray-800'}`}>
                        <Image
                          src={product.productImages[0]}
                          alt={product.productName}
                          width={200}
                          height={200}
                          className="w-full h-full object-contain p-2"
                          priority
                        />
                        <div className="absolute top-2 right-2 bg-alibabaOrange text-white text-xs font-bold py-1 px-2 rounded">
                          {product.productDiscount}% OFF
                        </div>
                      </div>
                    </Link>

                    <div className="p-3">
                      <Link href={`/view/${product._id}`}>
                        <h3 className={`text-sm font-medium mb-2 line-clamp-2 hover:text-alibabaOrange ${
                          mode ? "text-gray-800" : "text-gray-200"
                        }`}>
                          {product.productName}
                        </h3>
                      </Link>
                      
                      <div className="flex justify-between items-end">
                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-alibabaOrange font-bold">
                              ${(
                                product.productPrice -
                                (product.productPrice / 100) * product.productDiscount
                              ).toFixed(2)}
                            </span>
                            <span className="text-xs text-gray-500 line-through">
                              ${product.productPrice}
                            </span>
                          </div>
                          
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-1" />
                            <span>5.0 (10)</span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => addToCart(product._id)}
                          className={`p-2 rounded-full transition-colors ${
                            cartIds.includes(product._id)
                              ? ""
                              : ""
                          }`}
                          aria-label="Add to cart"
                        >
                          <FontAwesomeIcon icon={faCartPlus} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default View;