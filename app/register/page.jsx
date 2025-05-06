"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "@/app/globals.css";
import "./page.css";
import { faEye, faEyeSlash, faUser, faEnvelope, faPhone, faGlobe, faCity, faVenusMars, faShoppingCart, faTruck, faBox, faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Register = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if(password.length < 6){
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register`, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        mobileNumber,
        country,
        gender,
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
      setError(error.response?.data?.message || "Registration failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lightGray to-white py-6 px-4">
      <div className="w-full max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Features Section */}
        <div className="md:w-5/12 bg-gradient-to-br from-alibabaOrange to-text text-white p-6 md:p-10 hidden md:block">
          <h2 className="text-3xl font-bold mb-6">Join ZipBuy Today</h2>
          <p className="text-lightGray mb-8">Create your account and start enjoying the best online shopping experience.</p>
          
          <div className="grid grid-cols-1 gap-4">
            {[
              { icon: faShoppingCart, title: "Exclusive Deals", description: "Get access to members-only offers" },
              { icon: faTruck, title: "Free Shipping", description: "On orders over $50" },
              { icon: faBox, title: "Track Orders", description: "Follow your purchases in real-time" },
              { icon: faTags, title: "Reward Points", description: "Earn points with every purchase" }
            ].map((feature, i) => (
              <div key={i} className="bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                    <FontAwesomeIcon icon={feature.icon} className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-lightGray text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Section */}
        <div className="md:w-7/12 p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-darkGray">Create Your <span className="text-alibabaOrange">Account</span></h2>
            <p className="text-darkText text-sm mt-1">Fill in your details to get started</p>
          </div>
          
          {error && (
            <div className="text-white bg-red-500 rounded-lg px-4 py-2 mb-4 shadow-md">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FontAwesomeIcon icon={faUser} className="text-darkText" />
              </div>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full pl-10 py-3 bg-lightGray border border-mainColor rounded-lg focus:ring-2 focus:ring-alibabaOrange focus:border-alibabaOrange"
                required
              />
            </div>

            {/* Last Name */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FontAwesomeIcon icon={faUser} className="text-darkText" />
              </div>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="w-full pl-10 py-3 bg-lightGray border border-mainColor rounded-lg focus:ring-2 focus:ring-alibabaOrange focus:border-alibabaOrange"
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FontAwesomeIcon icon={faEnvelope} className="text-darkText" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full pl-10 py-3 bg-lightGray border border-mainColor rounded-lg focus:ring-2 focus:ring-alibabaOrange focus:border-alibabaOrange"
                required
              />
            </div>

            {/* Mobile Number */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FontAwesomeIcon icon={faPhone} className="text-darkText" />
              </div>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Mobile Number"
                className="w-full pl-10 py-3 bg-lightGray border border-mainColor rounded-lg focus:ring-2 focus:ring-alibabaOrange focus:border-alibabaOrange"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
             
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-5 pr-10 py-3 bg-lightGray border border-mainColor rounded-lg focus:ring-2 focus:ring-alibabaOrange focus:border-alibabaOrange"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-2"
              >
                <FontAwesomeIcon 
                  icon={showPassword ? faEyeSlash : faEye} 
                  className="text-darkText hover:text-darkGray" 
                />
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
             
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full pl-5 pr-10 py-3 bg-lightGray border border-mainColor rounded-lg focus:ring-2 focus:ring-alibabaOrange focus:border-alibabaOrange"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-2"
              >
                <FontAwesomeIcon 
                  icon={showConfirmPassword ? faEyeSlash : faEye} 
                  className="text-darkText hover:text-darkGray" 
                />
              </button>
            </div>

            {/* Gender Dropdown */}
            <div className="relative md:col-span-2">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FontAwesomeIcon icon={faVenusMars} className="text-darkText" />
              </div>
              <select 
                value={gender}  
                onChange={(e) => setGender(e.target.value)} 
                className="w-full pl-10 py-3 bg-lightGray border border-mainColor rounded-lg focus:ring-2 focus:ring-alibabaOrange focus:border-alibabaOrange appearance-none cursor-pointer"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="None">Prefer not to say</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-darkText" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>

            {/* Country */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FontAwesomeIcon icon={faGlobe} className="text-darkText" />
              </div>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
                className="w-full pl-10 py-3 bg-lightGray border border-mainColor rounded-lg focus:ring-2 focus:ring-alibabaOrange focus:border-alibabaOrange"
                required
              />
            </div>

            {/* City */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FontAwesomeIcon icon={faCity} className="text-darkText" />
              </div>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="w-full pl-10 py-3 bg-lightGray border border-mainColor rounded-lg focus:ring-2 focus:ring-alibabaOrange focus:border-alibabaOrange"
                required
              />
            </div>

            {/* Login Link */}
            <div className="md:col-span-2 text-center mt-2">
              <Link href="/login" className="text-darkText hover:text-darkGray">
                Already have an account? <span className="text-alibabaOrange font-medium">Sign in</span>
              </Link>
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex flex-col sm:flex-row justify-center gap-4 mt-4">
              <button
                type="submit"
                disabled={loading}
                className={`rounded-lg py-3 px-6 text-darkGray font-medium ${
                  loading ? "bg-alibabaOrange/70" : "bg-alibabaOrange hover:bg-text hover:text-white"
                } transition-all duration-300 shadow-md hover:shadow-lg flex-1`}
              >
                {loading ? "Registering..." : "Register"}
              </button>
              
              <Link href="/" className="flex-1">
                <button
                  type="button"
                  className="w-full rounded-lg py-3 px-6 text-darkGray border border-mainColor bg-white hover:bg-lightGray transition-colors duration-300 shadow-md"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;