"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { useStripe } from "@stripe/react-stripe-js";
import { useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Pay = () => {
  const searchParams = useSearchParams(); 
  const amount = searchParams.get("amount"); 
  const currency = "USD"; 

  const [clientSecret, setClientSecret] = useState("");

  // Fetch payment intent (client secret) from backend
  async function fetchPaymentIntent() {
    const amountInCents = Math.round(amount * 100);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment-intent`,
        {
          amount: amountInCents,
          currency: currency,
        }
      );

      // Extract clientSecret from backend response
      setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.error("Error fetching payment intent:", error);
    }
  }

  // Fetch payment intent when the component mounts or when amount changes
  useEffect(() => {
    if (amount) {
      fetchPaymentIntent();
    }
  }, [amount]);

  if (!clientSecret) {
    return <div>Loading...</div>; // Wait for clientSecret before rendering the payment form
  }

  return (
    <div className=" w-[60%] shadow-gray-500 overflow-hidden text-center shadow-lg rounded-lg flex flex-row my-10 mx-auto">
      <div className="w-[50%] bg-alibabaOrange text-white">
        <div className="relativew-full h-[200px] index-20 rounded-b-full bg-white"></div>
        <h1 className="absolute top-14 text-3xl text-center font-bold text-black right-[720px]">
          Payment Page
        </h1>
        <p className="mt-[100px] font-bold text-3xl">
          Amount to pay: <span className="text-black">${amount}</span>
        </p>
      </div>
      <div className="w-[50%] px-10 py-5">
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm />
        </Elements>
      </div>
    </div>
  );
};

const PaymentForm = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/payment-success", // Replace with your return URL
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      // Payment succeeded
      console.log("Payment Successful");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe} className="my-4 px-5 py-2 rounded-lg">
        Submit Payment
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default Pay;
