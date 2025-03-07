"use client";
import { useMemo } from "react";
import Nav from "../nav/page";
import Footer from "../footer/page";
import { useCartStore } from "../cartController";
import "./page.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const CheckCart = () => {
  const { cartIds, setCartIds, removeProduct, removeLastId } = useCartStore();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [orderErrorMessage, setOrderErrorMessage] = useState([]);

  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setstreetAddress] = useState("");
  const [country, setCountry] = useState("Rwanda");

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
       removeLastId(productId)
  };
  const removeItem = (productId) => {
    removeProduct(productId);
  };

async function handleOrder(e){
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
      totalAmount:totalPrice.toFixed(2),
      cartProducts:products
    });

    if (response.status == 200) {
      const amount = totalPrice.toFixed(2)
      router.push(`/pay/${orderToken}?amount=${amount}`);
    }
    else{
      setOrderErrorMessage(response.response?.data?.message);
    }
   } catch (error) {
    console.log(error)
      setOrderErrorMessage(error.response?.data?.message);
   }
}

  return (
    <div>
      <Nav />
      <div className="cart-data w-[94%] gap-2 mx-auto pt-[80px] mb-3 min-h-[90vh] flex flex-wrap">
        <div className="w-[63%] shadow-lg p-2">
          <table>
            <thead>
              <tr>
                <th className="py-1 px-3 w-[40%] text-left">Product</th>
                <th className="py-1 px-3 w-[10%] text-left">Price</th>
                <th className="py-1 px-3 w-[30%] text-left">Quantity</th>
                <th className="py-1 px-3 w-[10%] text-left">Subtotal</th>
                <th className="py-1 px-3 w-[10%] text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 &&
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="shadow-lg shadow-gray-200 mb-2"
                  >
                    <td className="py-1 px-3 flex">
                      <div className="w-[30%] h-[60px]">
                        <Image
                          src={product.productImages[0] || "/placeholder.jpg"}
                          className="h-full w-full object-cover"
                          width={100}
                          height={100}
                          alt={product.productName}
                        />
                      </div>
                      <div className="w-[70%] px-3 font-semibold">
                        <p>
                          {product.productName.length > 30
                            ? product.productName.slice(0, 30) + "..."
                            : product.productName}
                        </p>
                      </div>
                    </td>
                    <td className="py-1 px-3">
                      $
                      {(
                        product.productPrice -
                        (product.productPrice / 100) * product.productDiscount
                      ).toFixed(2)}
                    </td>
                    <td className="py-1 px-3 flex">
                      <button
                        onClick={() => decreaseQuantity(product._id)}
                        className="py-1 px-4 hover:bg-orange-600 hover:text-white"
                      >
                        -
                      </button>
                      <div className="py-1 px-5">
                        {cartIds.filter((item) => item === product._id).length}
                      </div>
                      <button
                        onClick={() => increaseQuantity(product._id)}
                        className="py-1 px-4 hover:bg-orange-600 hover:text-white"
                      >
                        +
                      </button>
                    </td>
                    <td className="py-1 px-3">
                      <span className="font-bold">
                        $
                        {(
                          (product.productPrice -
                            (product.productPrice / 100) *
                              product.productDiscount) *
                          cartIds.filter((item) => item === product._id).length
                        ).toFixed(2)}
                      </span>
                    </td>
                    <td className="py-1 px-3">
                      <button
                        onClick={() => removeItem(product._id)}
                        className="py-1 px-3 bg-red-600 text-white"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {products.length == 0 && (
            <div className="text-center text-2xl font-bold mt-6">
              <p>Your Cart Is Empty</p>
            </div>
          )}
          {products.length > 0 && (
            <div className="ml-[500px] w-[30%] bg-darkGray py-2 px-3 mt-5 text-white">
              Total:
              <span className="font-bold text-xl">
                $ {totalPrice.toFixed(2)}
              </span>
            </div>
          )}
        </div>

        <div className="w-[35%] shadow-lg p-2 rounded-b-lg">
          <div className="bg-darkGray text-white p-2 font-bold text-2xl">
            Cart Total
          </div>
          <div className="font-bold py-2 px-1">
            Total: $<span>{totalPrice.toFixed(2)}</span>
          </div>
          <div className="bg-darkGray text-white p-2 font-bold text-2xl">
            Order Information
          </div>
          {products.length == 0 && (
            <div className="text-center text-xl font-bold mt-20">
              Not Needed
            </div>
          )}
          {products.length > 0 && (
            <form onSubmit={handleOrder}>
              {orderErrorMessage && (
                <div className="text-red-500">{orderErrorMessage}</div>
              )}
              <div className="grid grid-cols-2 gap-2 px-2 pt-3">
                <input
                  type="text"
                  placeholder="FullName Name"
                  className="rounded-lg indent-2 p-3 shadow-lg shadow-gray-300 outline-none border-none col-span-2"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="rounded-lg indent-2 p-3 shadow-lg shadow-gray-300 outline-none border-none col-span-2"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="City"
                  className="rounded-lg indent-2 p-3 shadow-lg shadow-gray-300 outline-none border-none "
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Postal code"
                  className="rounded-lg indent-2 p-3 shadow-lg shadow-gray-300 outline-none border-none"
                  value={postalCode}
                  onChange={(e) => {
                    setPostalCode(e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Street Address"
                  className="rounded-lg indent-2 p-3 shadow-lg shadow-gray-300 outline-none border-none"
                  value={streetAddress}
                  onChange={(e) => {
                    setstreetAddress(e.target.value);
                  }}
                />
                <select
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                  className="rounded-lg indent-2 p-1 shadow-lg shadow-gray-300 outline-none  border-none"
                >
                  <option value="Rwanda" className="text-gray-400">
                    Rwanda
                  </option>
                  <option value="Tanzania" className="text-gray-400">
                    Tanzania
                  </option>
                  <option value="Uganda" className="text-gray-400">
                    Uganda
                  </option>
                  <option value="Drccongo" className="text-gray-400">
                    DRC Congo
                  </option>
                  <option value="Burundi" className="text-gray-400">
                    Burundi
                  </option>
                  <option value="Kenya" className="text-gray-400">
                    Kenya
                  </option>
                  <option value="SouthSudan" className="text-gray-400">
                    South Sudan
                  </option>
                </select>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="w-[50%] bg-darkGray mt-5 py-3 px-5 text-white font-bold mx-auto text-center"
                >
                  CheckOut
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckCart;
