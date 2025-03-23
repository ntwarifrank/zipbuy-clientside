"use client";
import { useMemo, useEffect, useState } from "react";
import Footer from "../footer/page";
import { useCartStore } from "../cartController";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import "@/app/globals.css";
import "./page.css";
import Layout from "../layout/page";
import useToggleModeStore from "../modeController";
import { ShoppingCart } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Link from "next/link";

const CheckCart = () => {
  const { cartIds, setCartIds, removeProduct, removeLastId } = useCartStore();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [orderErrorMessage, setOrderErrorMessage] = useState("");
  const { mode } = useToggleModeStore();
  const [clientSecret, setClientSecret] = useState("");

  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("Rwanda");
  const [orderSubmitted, setOrderSubmitted] = useState(false)

  const totalPrice = useMemo(() => {
    return products.reduce((total, product) => {
      const quantity = cartIds.filter((id) => id === product._id).length;
      const price =
        (product.productPrice -
          (product.productPrice / 100) * product.productDiscount) *
        quantity;
      return total + price;
    }, 0);
  }, [products, cartIds]);

  const fetchProductsData = async () => {
    if (cartIds.length === 0) {
      setProducts([]);
      return;
    }

    try {
      const responses = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/specificproduct`,
        { ids: cartIds }
      );
      if (responses) {
        setProducts(responses.data);
      }
    } catch (error) {
      console.error("Error fetching cart products:", error);
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, [cartIds]);

  const increaseQuantity = (productId) => {
    setCartIds(productId);
    fetchProductsData();
  };

  const decreaseQuantity = (productId) => {
    removeLastId(productId);
  };

  const removeItem = (productId) => {
    removeProduct(productId);
  };

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  const fetchPaymentIntent = async () => {
    const currency = "usd";
    const amountInCents = Math.round(totalPrice * 100);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment-intent`,
        { amount: amountInCents, currency }
      );
      setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.error("Error fetching payment intent:", error);
    }
  };

  useEffect(() => {
    if (totalPrice) {
      fetchPaymentIntent();
    }
  }, [totalPrice]);

  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      const orderToken = Math.floor(100000 + Math.random() * 900000 * Math.random() * 20000).toString();
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/placeorder`, {
        email,
        fullName,
        city,
        postalCode,
        streetAddress,
        country,
        orderToken,
        totalAmount: totalPrice.toFixed(2),
        cartProducts: products
      });

      if (response.status === 200) {
        setOrderSubmitted(true);
      } else {
        setOrderErrorMessage(response.response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      setOrderErrorMessage(error.response?.data?.message);
    }
  };

  const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!stripe || !elements) return;

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
      });

      if (error) {
        console.error("Payment error:", error.message);
      } else {
        console.log("Payment successful");
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button type="submit" className="my-4 px-5 py-2 rounded-lg bg-darkGray text-white">
          Submit Payment
        </button>
      </form>
    );
  };

  return (
    <Layout>
      <div>
        <div className="cart-data w-[94%] text-gray-400 gap-2 mx-auto mb-3 min-h-[90vh] flex flex-wrap">
          <div className="w-[63%] shadow-lg p-2">
            <div className="flex flex-row">
              <div className="bg-gray-500 text-white rounded-full p-2 w-8 h-8 text-center">
                <ShoppingCart size={18} />
              </div>
              <div className={`px-3 pt-2 font-semibold ${mode?"text-black":"text-gray-400"}`}>Items <span>{cartIds.length}</span></div>
            </div>
            <div className="flex flex-col gap-3">
              {products.length > 0 &&
                products.map((product) => (
                  <div
                    key={product._id}
                    className={`shadow-lg shadow-gray-200 mb-2 ${mode ? "" : "shadow-none"} border-b-2 border-gray-500 pb-2 flex flex-row h-[110px]`}
                  >
                    <div className="w-[30%] px-3 py-2">
                      <Link href={`/view/${product._id}`}>
                        <div className={`p-1 h-[90%] w-[80%] ${mode ? "bg-cardBackground" : "bg-gray-600"}`}>
                          <Image
                            src={product.productImages[0] || "/placeholder.jpg"}
                            className="h-full w-full object-cover"
                            width={100}
                            height={100}
                            alt={product.productName}
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="w-[50%] px-3 font-semibold flex flex-col justify-between h-full">
                      <div className="text-sm">
                        <p>
                          {product.productName.length > 70
                            ? product.productName.slice(0, 70) + "..."
                            : product.productName}
                        </p>
                      </div>
                      <div className="relative mx-auto flex flex-row w-full">
                        <button
                          onClick={() => decreaseQuantity(product._id)}
                          className="px-4 hover:bg-orange-600 hover:text-white"
                        >
                          -
                        </button>
                        <div className="py-1 px-4">
                          {cartIds.filter((item) => item === product._id).length}
                        </div>
                        <button
                          onClick={() => increaseQuantity(product._id)}
                          className="px-4 hover:bg-orange-600 hover:text-white"
                        >
                          +
                        </button>
                        <div className="absolute top-0 right-20 text-sm text-gray-500 ml-10">
                          <span>
                            x $
                            {(
                              product.productPrice -
                              (product.productPrice / 100) * product.productDiscount
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-[20%] pt-8 flex flex-col gap-3">
                      <div>
                        <button
                          onClick={() => removeItem(product._id)}
                          className="py-1 px-3 bg-red-600 text-white"
                        >
                          Drop
                        </button>
                      </div>
                      <div>
                        <span className="font-bold">
                          $
                          {(
                            (product.productPrice -
                              (product.productPrice / 100) *
                              product.productDiscount) *
                            cartIds.filter((item) => item === product._id).length
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {products.length === 0 && (
              <div className="text-center text-2xl font-bold mt-6">
                <p>Your Cart Is Empty</p>
              </div>
            )}
            {products.length > 0 && (
              <div className="float-right w-[30%] bg-darkGray py-2 px-3 mt-5">
                Total:
                <span className="font-bold text-xl">
                  $ {totalPrice.toFixed(2)}
                </span>
              </div>
            )}
          </div>

          <div className={`w-[35%] shadow-lg p-2 rounded-b-lg  ${mode ?"text-black": "text-gray-400"}`}>
            <div className="p-2 text-xl">Billing Details</div>
            {products.length === 0 && (
              <div className="text-center text-xl font-bold mt-20">
                Not Needed
              </div>
            )}

            {products.length > 0 && (
              <form onSubmit={handleOrder}>
                {orderErrorMessage && (
                  <div className="">{orderErrorMessage}</div>
                )}
                <div className="grid grid-cols-2 gap-2 px-2 pt-3">
                  <input
                    type="text"
                    placeholder="FullName Name"
                    className={`rounded-lg col-span-2 indent-2 p-2 ${mode ?"shadow-lg shadow-gray-300 ":"shadow-lg shadow-gray-800 bg-gray-100 text-gray-900 "} outline-none border-none`}
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className={`rounded-lg col-span-2 indent-2 p-2 ${mode ?"shadow-lg shadow-gray-300 ":"shadow-lg shadow-gray-800 bg-gray-100 text-gray-900 "} outline-none border-none`}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="City"
                    className={`rounded-lg indent-2 p-2 ${mode ?"shadow-lg shadow-gray-300 ":"shadow-lg shadow-gray-800 bg-gray-100 text-gray-900 "} outline-none border-none`}
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Postal code"
                    className={`rounded-lg indent-2 p-2 ${mode ?"shadow-lg shadow-gray-300 ":"shadow-lg shadow-gray-800 bg-gray-100 text-gray-900 "} outline-none border-none`}
                    value={postalCode}
                    onChange={(e) => {
                      setPostalCode(e.target.value);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Street Address"
                    className={`rounded-lg indent-2 p-2 ${mode ?"shadow-lg shadow-gray-300 ":"shadow-lg shadow-gray-800 bg-gray-100 text-gray-900 "} outline-none border-none`}
                    value={streetAddress}
                    onChange={(e) => {
                      setStreetAddress(e.target.value);
                    }}
                  />
                  <select
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value);
                    }}
                    className={`rounded-lg indent-2 p-2 ${mode ?"shadow-lg shadow-gray-300 ":"shadow-lg shadow-gray-800 bg-gray-100 text-gray-900 "} outline-none border-none`}
                  >
                    <option value="Rwanda">Rwanda</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Drccongo">DRC Congo</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Kenya">Kenya</option>
                    <option value="SouthSudan">South Sudan</option>
                  </select>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="w-[60%] bg-darkGray mt-5 py-2 px-5 text-white font-bold mx-auto text-center"
                  >
                    {orderSubmitted ? "Checked Then Pay": "CheckOut"}
                  </button>
                </div>
              </form>
            )}

            <div>
              {
                cartIds.length > 0 && (
                  <div className="w-[90%] shadow-lg p-2">
                      <h2 className="p-2 text-xl">Payment Method</h2>
                      {clientSecret && (
                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                          <PaymentForm />
                        </Elements>
                      )}
                </div>
                )
              }
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default CheckCart;