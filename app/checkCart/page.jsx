"use client";
import { useMemo, useEffect, useState } from "react";
import useCartStore from "../store/cartController";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import "@/app/globals.css";
import "./page.css";
import Layout from "../layout/page";
import useToggleModeStore from "../store/modeController";
import { ShoppingCart } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Link from "next/link";
import Nav from "../nav/page";

const CheckCart = () => {
  const { cartIds, setCartIds, removeProduct, removeLastId } = useCartStore();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [orderErrorMessage, setOrderErrorMessage] = useState("");
  const { mode } = useToggleModeStore();
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentCreated, setPaymentIntentCreated] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("Rwanda");
  const [orderSubmitted, setOrderSubmitted] = useState(false);

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
  };

  const decreaseQuantity = (productId) => {
    removeLastId(productId);
  };

  const removeItem = (productId) => {
    removeProduct(productId);
  };

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  const fetchPaymentIntent = async () => {
    if (paymentIntentCreated) return;
    
    const currency = "usd";
    const amountInCents = Math.round((totalPrice || 1) * 100);
    
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment-intent`,
        { amount: amountInCents, currency }
      );
      setClientSecret(response.data.clientSecret);
      setPaymentIntentCreated(true);
    } catch (error) {
      console.error("Error fetching payment intent:", error);
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      fetchPaymentIntent();
    }
  }, [products.length]);

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
        cartProducts: products,
        paymentIntentId: clientSecret?.split('_secret')[0] || null
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

      setPaymentProcessing(true);
      
      try {
        // Update payment intent with final amount
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/update-payment-intent`, {
          paymentIntentId: clientSecret.split('_secret')[0],
          amount: Math.round(totalPrice * 100)
        });

        // Confirm payment
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/payment-success`,
            receipt_email: email,
          },
        });

        if (error) {
          setOrderErrorMessage(error.message);
          console.error("Payment error:", error);
        }
      } catch (error) {
        console.error("Error updating payment intent:", error);
        setOrderErrorMessage("Failed to process payment. Please try again.");
      } finally {
        setPaymentProcessing(false);
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <PaymentElement options={{
          layout: "tabs",
          fields: {
            billingDetails: {
              address: {
                country: "never"
              }
            }
          }
        }} />
        <button 
          type="submit" 
          className={`my-4 px-5 py-2 rounded-lg bg-darkGray text-white w-full ${paymentProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={!stripe || paymentProcessing}
        >
          {paymentProcessing ? 'Processing...' : `Pay $${totalPrice.toFixed(2)}`}
        </button>
      </form>
    );
  };

  return (
    <Layout>
      <div className="flex flex-col">
        <div className="mb-0">
          <Nav />
        </div>
        {/* Main container - made responsive with flex column on mobile */}
        <div className="cart-data w-[94%] md:w-[94%] text-gray-400 gap-2 mx-auto mb-3 min-h-[80vh] flex flex-col md:flex-row flex-wrap mt-0 pt-0">
          {/* Cart items section - full width on mobile */}
          <div className="w-full md:w-[63%] shadow-lg p-2 mb-2 md:mb-0 mt-1">
            <div className="flex flex-row items-center mt-0 pt-0">
              <div className="bg-gray-500 text-white rounded-full p-2 w-8 h-8 text-center flex items-center justify-center">
                <ShoppingCart size={18} />
              </div>
              <div className={`px-3 font-semibold ${mode?"text-black":"text-gray-400"}`}>Items <span>{cartIds.length}</span></div>
            </div>
            <div className="flex flex-col gap-3">
              {products.length > 0 &&
                products.map((product) => (
                  <div
                    key={product._id}
                    className={`shadow-lg shadow-gray-200 mb-2 ${mode ? "" : "shadow-none"} border-b-2 border-gray-500 pb-2 flex flex-col sm:flex-row h-auto sm:h-[110px]`}
                  >
                    {/* Product image - adjusted for better mobile display */}
                    <div className="w-full sm:w-[30%] px-3 py-2">
                      <Link href={`/view/${product._id}`}>
                        <div className={`p-1 h-[120px] sm:h-[90%] mx-auto sm:mx-0 w-[80%] ${mode ? "bg-cardBackground" : "bg-gray-600"}`}>
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
                    {/* Product details - adjusted for stacking on mobile */}
                    <div className="w-full sm:w-[50%] px-3 font-semibold flex flex-col justify-between h-full mt-2 sm:mt-0">
                      <div className="text-sm">
                        <p>
                          {product.productName.length > 70
                            ? product.productName.slice(0, 70) + "..."
                            : product.productName}
                        </p>
                      </div>
                      <div className="relative mx-auto flex flex-row w-full my-2 sm:my-0">
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
                        <div className="sm:absolute sm:top-0 sm:right-20 text-sm text-gray-500 ml-auto sm:ml-10">
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
                    {/* Product actions - better alignment for mobile */}
                    <div className="w-full sm:w-[20%] pt-0 sm:pt-8 flex flex-row sm:flex-col justify-between sm:justify-start items-center sm:items-start gap-3 px-3 sm:px-0 mb-2 sm:mb-0">
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
              <div className="float-right w-full sm:w-[50%] md:w-[30%] bg-darkGray py-2 px-3 mt-5">
                Total:
                <span className="font-bold text-xl">
                  $ {totalPrice.toFixed(2)}
                </span>
              </div>
            )}
          </div>

          {/* Billing details section - full width on mobile */}
          <div className={`w-full md:w-[35%] shadow-lg p-2 rounded-b-lg ${mode ? "text-black" : "text-gray-400"} mt-1`}>
            <div className="px-2 text-xl mt-0 pt-0">Billing Details</div>
            {products.length === 0 && (
              <div className="text-center text-xl font-bold mt-20">
                Not Needed
              </div>
            )}

            {products.length > 0 && (
              <>
                <form onSubmit={handleOrder}>
                  {orderErrorMessage && (
                    <div className="text-red-500 p-2 text-sm">{orderErrorMessage}</div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 px-2 pt-3">
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      className={`rounded-lg sm:col-span-2 indent-2 p-2 ${mode ? "shadow-lg shadow-gray-300" : "shadow-lg shadow-gray-800 bg-gray-100 text-gray-900"} outline-none border-none`}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      className={`rounded-lg sm:col-span-2 indent-2 p-2 ${mode ? "shadow-lg shadow-gray-300" : "shadow-lg shadow-gray-800 bg-gray-100 text-gray-900"} outline-none border-none`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="City"
                      required
                      className={`rounded-lg indent-2 p-2 ${mode ? "shadow-lg shadow-gray-300" : "shadow-lg shadow-gray-800 bg-gray-100 text-gray-900"} outline-none border-none`}
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Postal code"
                      required
                      className={`rounded-lg indent-2 p-2 ${mode ? "shadow-lg shadow-gray-300" : "shadow-lg shadow-gray-800 bg-gray-100 text-gray-900"} outline-none border-none`}
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Street Address"
                      required
                      className={`rounded-lg indent-2 p-2 ${mode ? "shadow-lg shadow-gray-300" : "shadow-lg shadow-gray-800 bg-gray-100 text-gray-900"} outline-none border-none`}
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                    />
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className={`rounded-lg indent-2 p-2 ${mode ? "shadow-lg shadow-gray-300" : "shadow-lg shadow-gray-800 bg-gray-100 text-gray-900"} outline-none border-none`}
                      required
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
                      className="w-full sm:w-[60%] bg-darkGray mt-5 py-2 px-5 text-white font-bold mx-auto text-center hover:bg-opacity-90 transition-all"
                    >
                      {orderSubmitted ? "Checked Then Pay" : "CheckOut"}
                    </button>
                  </div>
                </form>

                {orderSubmitted && cartIds.length > 0 && (
                  <div className="w-full sm:w-[90%] shadow-lg p-2 mt-4">
                    <h2 className="p-2 text-xl">Payment Method</h2>
                    {clientSecret ? (
                      <Elements 
                        stripe={stripePromise} 
                        options={{ 
                          clientSecret,
                          appearance: {
                            theme: mode ? "stripe" : "night",
                            variables: {
                              colorPrimary: "#4f46e5",
                              colorBackground: mode ? "#ffffff" : "#1a1a1a",
                              colorText: mode ? "#30313d" : "#ffffff",
                              fontFamily: "Inter, system-ui, sans-serif",
                            }
                          }
                        }}
                      >
                        <PaymentForm />
                      </Elements>
                    ) : (
                      <div className="text-center py-4">Loading payment form...</div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckCart;