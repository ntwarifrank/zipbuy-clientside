'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { faEye, faEyeSlash, faEnvelope, faLock, faBox, faTruck, faShoppingCart, faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        jwtDecode(token);
        router.push("/buyingpage");
      } catch {
        Cookies.remove("token");
      }
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Client-side validation
    if (!form.email) return setError('Email is required');
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError('Invalid email format');
      setLoading(false);
      return;
    };
    if (!form.password){
      setError('Password is required');
      setLoading(false);
      return;
    };
    if (form.password.length < 6){
       setError('Password must be at least 6 characters');
       setLoading(false);
       return;
    };

    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, form, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      });

      if (data.message === "Login successful") {
        router.push("/buyingpage");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lightGray to-white p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Features Section */}
          <div className="md:w-1/2 bg-gradient-to-br from-alibabaOrange to-text text-white p-6 md:p-10 hidden md:block">
          <h2 className="text-3xl font-bold mb-6">Experience ZipBuy</h2>
          <p className="text-lightGray mb-8">The fastest way to shop online with secure payments and lightning-fast delivery.</p>
          
          <div className="grid grid-cols-1 gap-4">
            {[
              { icon: faShoppingCart, title: "Quick Shopping", description: "Shop with just a few clicks" },
              { icon: faTruck, title: "Fast Delivery", description: "Get purchases delivered quickly" },
              { icon: faTags, title: "Best Deals", description: "Access exclusive discounts" },
              { icon: faBox, title: "Easy Returns", description: "Hassle-free return policy" }
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


        {/* Login Form */}
        <div className="md:w-1/2 p-6 md:p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-darkGray">Welcome to <span className="text-alibabaOrange">ZipBuy</span></h2>
            <p className="text-darkText mt-2">Sign in to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg border-l-4 border-red-500">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-darkGray mb-1">Email</label>
              <div className="relative">
                <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-darkText" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-mainColor rounded-lg focus:ring-2 focus:ring-alibabaOrange focus:border-alibabaOrange bg-lightGray"
                  placeholder="your@email.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-darkGray mb-1">Password</label>
              <div className="relative">
                <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-darkText" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({...form, password: e.target.value})}
                  className="w-full pl-10 pr-10 py-3 border border-mainColor rounded-lg focus:ring-2 focus:ring-alibabaOrange focus:border-alibabaOrange bg-lightGray"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-2 text-darkText hover:text-darkGray transition-colors"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded text-alibabaOrange border-mainColor" />
                <span className="text-sm text-darkGray">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-alibabaOrange hover:text-text hover:underline transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg text-darkGray font-medium ${loading ? 'bg-alibabaOrange/70' : 'bg-alibabaOrange hover:bg-text hover:text-white'} transition-all duration-300 shadow-md hover:shadow-lg`}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            <div className="text-center pt-4">
              <p className="text-darkText">
                Don't have an account?{' '}
                <Link href="/register" className="font-medium text-alibabaOrange hover:text-text hover:underline transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>

      
      </div>
    </div>
  );
};

export default Login;