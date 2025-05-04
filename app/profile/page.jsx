"use client";
import Layout from "../layout/page";
import Nav from "../nav/page";
import Image from "next/image";
import profile from "../../public/profile1.png";
import useToggleModeStore from "../store/modeController";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const Profile = () => {
  const router = useRouter();
  const { mode } = useToggleModeStore();
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    streetAddress: "None",
    gender: "",
    mobileNumber: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);

  // Decode token and set userId
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId); // Assuming 'id' is the field in the token
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      console.error("No token found");
      
    }
  }, [router]);

  // Fetch user data using userId
  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${userId}`
        );
        if (response.data?.success) {
          setUserData(response.data.userData);
        } else {
          throw new Error("Profile fetch failed");
        }
      } catch (error) {
        console.error("API error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // Sync form data with fetched user data
  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        country: userData.country || "",
        city: userData.city || "",
        streetAddress: userData.streetAddress || "None",
        gender: userData.gender || "",
        mobileNumber: userData.mobileNumber || "",
        email: userData.email || "",
      });
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      console.error("No userId, cannot update profile");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${userId}`,
        formData
      );
      if (response.data?.success) {
        setUserData(response.data.updatedUser);
      }
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`, {}, { withCredentials: true });
      Cookies.remove("token");
      setUserData(null);
      
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


  
    if (!userData) {
      return (
        <Layout>
          <Nav />
          <div className="flex justify-center items-center h-screen">
            <p>No user data available.</p>
          </div>
        </Layout>
      );
    }
  

  return (
    <Layout>
      <Nav />
      <div className="px-8 py-6">
        <h1 className="text-xl font-semibold">My Profile</h1>
        <div className="flex flex-row mt-6">
          <div className="w-16 p-1">
            <Image
              src={profile}
              alt="Profile"
              className="w-16 h-16 rounded-full border-2 border-gray-600"
            />
          </div>
          <div className="flex-1 flex justify-between pl-4">
            <div>
              <h2 className="text-2xl font-bold">
                {formData.firstName} {formData.lastName}
              </h2>
              <p>
                {formData.city}, {formData.country}
              </p>
            </div>
            <button onClick={handleLogout} className="py-1 px-3 rounded-lg hover:bg-gray-200">
              Log Out
            </button>
          </div>
        </div>

        <form className="w-full max-w-2xl mt-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="firstName" className="text-sm">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`border-none outline-none ${
                  mode ? "bg-lightGray" : "bg-mainColor"
                } py-1 px-2 rounded-md`}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="lastName" className="text-sm">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`border-none outline-none ${
                  mode ? "bg-lightGray" : "bg-mainColor"
                } py-1 px-2 rounded-md`}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`border-none outline-none ${
                  mode ? "bg-lightGray" : "bg-mainColor"
                } py-1 px-2 rounded-md`}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="mobileNumber" className="text-sm">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                className={`border-none outline-none ${
                  mode ? "bg-lightGray" : "bg-mainColor"
                } py-1 px-2 rounded-md`}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="country" className="text-sm">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className={`border-none outline-none ${
                  mode ? "bg-lightGray" : "bg-mainColor"
                } py-1 px-2 rounded-md`}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="gender" className="text-sm">
                Gender
              </label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={`border-none outline-none ${
                  mode ? "bg-lightGray" : "bg-mainColor"
                } py-1 px-2 rounded-md`}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="streetAddress" className="text-sm">
                Street Address
              </label>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                className={`border-none outline-none ${
                  mode ? "bg-lightGray" : "bg-mainColor"
                } py-1 px-2 rounded-md`}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="city" className="text-sm">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={`border-none outline-none ${
                  mode ? "bg-lightGray" : "bg-mainColor"
                } py-1 px-2 rounded-md`}
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              disabled={loading}
              className="py-1 px-4 rounded-lg float-end bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;