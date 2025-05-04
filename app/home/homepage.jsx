"use client"
import car from "../../public/car.jpg";
import Image from "next/image";
import timer from "../../public/timer.png";
import bus from "../../public/bus.jpg";
import "./homepage.css";
import Footer from "../footer/page";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "@/app/globals.css";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Eye, EyeOff, Globe, Shield, TrendingUp, Truck } from "lucide-react";
import axios from "axios"

const Homepage = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [gender, setGender] = useState("None");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordShow = () => {
    setShowPassword(!showPassword);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register`, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        mobileNumber,
        gender,
        country,
        city
      });

      if (response.status == 200) {
        router.push("/login");
        setLoading(false);
        
      } else {
        console.log(response);
        setLoading(false);
      
      }
    } catch (error) {
      setLoading(false)
      setError(error.response?.data?.errorMessage || "Registration failed. Please try again.");
     
    }
  }

  const features = [
    {
      title: "Millions of business offerings",
      description: "Explore products and suppliers for your business from millions of offerings worldwide.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fill-current w-full h-full">
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM208.6 357.3l-39-13.5c-6.5-2.2-13.6-2.3-20.1-.3l-15.3 4.9c-18.5 5.9-38.5-2.4-47.5-19.5l-3.3-6.2c-10.6-20.1-2.3-45 18.2-54.7l35.3-16.8c2.3-1.1 4.4-2.8 5.9-4.8l5.3-7c7.2-9.6 18.6-15.3 30.6-15.3s23.4 5.7 30.6 15.3l4.6 6.1c2 2.6 4.9 4.5 8.1 5.1c7.8 1.6 15.7-1.5 20.4-7.9l10.4-14.2c2-2.8 5.3-4.4 8.7-4.4c4.4 0 8.4 2.7 10 6.8l10.1 25.9c2.8 7.2 6.7 14 11.5 20.2L311 299.8c5.8 7.4 9 16.6 9 26s-3.2 18.6-9 26L299 367.2c-8.3 10.6-21 16.8-34.4 16.8c-8.4 0-16.6-2.4-23.7-7l-25.4-16.4c-2.2-1.4-4.5-2.5-6.9-3.4zm65.2-214.8L296 164.7c10.1 10.1 2.9 27.3-11.3 27.3l-29.9 0c-5.6 0-11.1-1.2-16.2-3.4l-42.8-19c-14.3-6.3-11.9-27.3 3.4-30.3l38.5-7.7c13.1-2.6 26.7 1.5 36.1 10.9zM248 432c0-8.8 7.2-16 16-16l16 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16zM431.2 298.9l8 24c2.8 8.4-1.7 17.4-10.1 20.2s-17.4-1.7-20.2-10.1l-8-24c-2.8-8.4 1.7-17.4 10.1-20.2s17.4 1.7 20.2 10.1zm-19.9 80.4l-32 32c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l32-32c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
        </svg>
      )
    },
    {
      title: "Assured quality and transactions",
      description: "Ensure production quality from verified suppliers, with your orders protected from payment to delivery.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="fill-current w-full h-full">
          <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm64 96a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm64 128a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm128 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
        </svg>
      )
    },
    {
      title: "One-stop trading solution",
      description: "Order seamlessly from product/supplier search to order management, payment, and fulfillment.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="fill-current w-full h-full">
          <path d="M64 32C46.3 32 32 46.3 32 64l0 240 0 48 0 80c0 26.5 21.5 48 48 48l416 0c26.5 0 48-21.5 48-48l0-128 0-151.8c0-18.2-19.4-29.7-35.4-21.1L352 215.4l0-63.2c0-18.2-19.4-29.7-35.4-21.1L160 215.4 160 64c0-17.7-14.3-32-32-32L64 32z" />
        </svg>
      )
    },
    {
      title: "End-to-end business solutions",
      description: "Source products, establish partnerships, pay securely, and ship globally with a trusted platform.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="fill-current w-full h-full">
          <path d="M160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l50.7 0L9.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L256 109.3l0 50.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128c0-17.7-14.3-32-32-32L160 0zM576 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM448 208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM400 384a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm128 0a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM272 384a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM144 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM576 336a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm-48-80a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
        </svg>
      )
    }
  ];

  const stats = [
    { value: "200M+", label: "Products" },
    { value: "200k+", label: "Suppliers" },
    { value: "5,900", label: "Product Categories" },
    { value: "200+", label: "Countries and regions" }
  ];

  return (
    <div className="w-full mx-auto bg-lightGray">
      {/* Hero Section */}
      <div className="relative">
        {/* Navigation */}
        <div className="absolute w-full z-10 top-0 left-0 px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-extrabold text-white">
            <span className="text-alibabaOrange">ZIP</span>BUY
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="px-5 py-2.5 rounded-lg bg-alibabaOrange text-darkGray font-medium hover:bg-yellow-400 transition-all duration-200 shadow-lg">
              Login
            </Link>
            <Link href="/register" className="px-5 py-2.5 rounded-lg bg-white text-darkGray font-medium hover:bg-gray-100 transition-all duration-200 shadow-lg">
              Join Now
            </Link>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative w-full h-[650px]">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-[1]"></div>
          <Image
            src={car}
            className="w-full h-full object-cover"
            alt="Business professionals networking"
            priority
          />
          <div className="absolute top-0 left-0 w-full h-full flex items-center z-[2] px-10 md:px-20">
            <div className="max-w-2xl">
              <div className="inline-block bg-alibabaOrange px-4 py-1 rounded-full text-darkGray font-semibold mb-4 animate-pulse">
                Global B2B Marketplace
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                The leading B2B ecommerce platform for global trade
              </h1>
              <p className="text-lg text-gray-200 mb-8">
                Join millions of businesses worldwide that trust ZipBuy for their sourcing and procurement needs.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-3 bg-alibabaOrange text-darkGray font-bold rounded-lg hover:bg-yellow-400 transition-all duration-200 shadow-lg flex items-center gap-2">
                  Get Started <ArrowRight size={18} />
                </button>
                <button className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white/30 transition-all duration-200 border border-white/40">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-[90%] max-w-7xl mx-auto mt-16 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-darkGray mb-4">Why Choose ZipBuy?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need to grow your business with confidence on a single platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 p-8 border-b-4 border-alibabaOrange group"
            >
              <div className="w-16 h-16 text-darkGray group-hover:text-alibabaOrange transition-colors duration-300 mb-6">
                {feature.icon}
              </div>
              <h3 className="font-bold text-xl text-darkGray mb-3 group-hover:text-alibabaOrange transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats & Registration Section */}
      <div className="w-[90%] max-w-7xl mx-auto my-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Stats */}
          <div className="w-full md:w-1/2 p-10 md:p-16">
            <h2 className="text-3xl md:text-4xl font-bold text-darkGray mb-8 leading-tight">
              Explore millions of offerings tailored to your business needs
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="border-l-4 border-alibabaOrange pl-4 py-2">
                  <p className="text-3xl font-bold text-darkGray">{stat.value}</p>
                  <span className="text-gray-600">{stat.label}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-10">
              <ul className="space-y-3">
                {["Verified suppliers", "Quality assurance", "Secure transactions", "Global shipping"].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <Check size={20} className="text-alibabaOrange mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Right side - Registration Form */}
          <div className="w-full md:w-1/2 bg-white p-8 md:p-12">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-alibabaOrange w-8 h-8 rounded-full flex items-center justify-center text-darkGray font-bold">
                  %
                </div>
                <h3 className="font-bold text-lg text-darkGray">Limited Time Offer</h3>
              </div>
              <p className="text-2xl font-bold text-darkGray">Register now and get 50% off for your first week!</p>
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 flex items-center">
                <span>{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                  className="w-full p-3  border border-gray-300 outline-none rounded-lg "
                  required
                />
              </div>
              
            
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full p-3 border border-gray-300 rounded-lg outline-none"
                    required
                  />
                  <div 
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                    onClick={togglePasswordShow}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  id="mobileNumber"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Enter your mobile number"
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none"
                />
              </div>
              
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none"
                >
                  <option value="None">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="None">None</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Enter your country"
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none"
                />
              </div>
              
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter your city"
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none"
                />
              </div>
              
              <div className="col-span-2 mt-4 text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Already have an account? <Link href="/login" className="text-alibabaOrange font-medium hover:underline">Sign in</Link>
                </p>
                
                <div className="flex justify-center gap-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-darkGray text-white font-bold rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Create Account"}
                  </button>
                  
                  <Link href="/">
                    <button
                      type="button"
                      className="px-6 py-3 border border-gray-300 text-darkGray font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="w-[90%] max-w-7xl mx-auto my-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-darkGray mb-4">Trusted by Businesses Worldwide</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join thousands of businesses that trust ZipBuy for their global trade needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-alibabaOrange" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "ZipBuy has transformed how we source products. The platform is intuitive, reliable, and has helped us find trusted suppliers worldwide. Highly recommended!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-bold text-darkGray">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Procurement Manager</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="relative w-full h-[300px] my-24">
        <div className="absolute inset-0 bg-gradient-to-r from-darkGray/90 to-darkGray/70 z-[1]"></div>
        <Image
          src={bus}
          className="w-full h-full object-cover"
          alt="Global business network"
        />
        <div className="absolute inset-0 flex items-center justify-center z-[2] px-6">
          <div className="text-center max-w-4xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Discover the easiest way to shop online with ZipBuy's seamless experience
            </h2>
            <button className="px-8 py-3 bg-alibabaOrange text-darkGray font-bold rounded-lg hover:bg-yellow-400 transition-all duration-200 shadow-lg flex items-center gap-2 mx-auto">
              Start Sourcing Today <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;