'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import useCartStore from '../store/cartController';
import useSearchStore from '../store/handlesearch';
import { useSearchedStore } from '../store/handlesearch';
import useToggleModeStore from '../store/modeController';
import { useToggleDashboardStateStore } from '../store/modeController';
import Layout from '../layout/page';
import '@/app/globals.css';
import './page.css';
import Nav from '../nav/page';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const BuyingPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  
  const { setCartIds } = useCartStore();
  const { search, setSearch } = useSearchStore();
  const { searchedProduct } = useSearchedStore();
  const { mode } = useToggleModeStore();
  const { dashboardState } = useToggleDashboardStateStore();
  
  const categoryAvailable = ['Accessories', 'Shoes', 'Phones', 'Speaker'];

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/allproducts`);
      setProducts(response.data.productsData);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const addToCart = (id) => setCartIds(id);
  const handleCategorySearch = (category) => {
    setSearch(category);
    setActiveCategory(category)
  };
  function resetSearch() {
    setActiveCategory("");
    setSearch('');
  };


  const CategoryButton = ({ category, isActive }) => (
    <div 
      onClick={() => handleCategorySearch(category)}
      className={`px-3 py-1 rounded-full max-w-fit text-xs sm:text-sm cursor-pointer mb-1 mr-1 ${
        mode ? isActive 
            ? 'bg-black text-white' 
            : 'bg-gray-200 text-gray-800'
          : isActive
            ? 'bg-gray-200 text-gray-800'
            : 'bg-gray-800 text-gray-400'
      }`}
    >
      <p>{category}</p>
    </div>
  );

  const ProductCard = ({ product, index }) => (
    <div
      key={index}
      className={mode ? 
        `card w-full xs:w-[48%] sm:w-[48%] md:w-[31%] lg:w-[23%] h-[280px] overflow-hidden mb-2` : 
        `shadow-gray-800 shadow-sm rounded-lg card w-full xs:w-[48%] sm:w-[48%] md:w-[31%] lg:w-[23%] h-[280px] overflow-hidden mb-2`}
    >
      <Link href={`/view/${product._id}`}>
        <div className={`relative h-[60%] ${mode ? 'bg-cardBackground' : 'bg-gray-800'} group`}>
          <Image
            src={product.productImages[0] || '/placeholder.jpg'}
            alt={product.productName}
            className="w-full h-full object-cover"
            width={300}
            height={300}
            priority={index < 4}
          />
          <div className="absolute top-3 right-3 bg-alibabaOrange text-white text-xs sm:text-sm font-bold py-1 px-2 sm:px-3 rounded-lg">
            {product.productDiscount}% OFF
          </div>
          <div className='hovered-icon hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:flex'>
            <div className='flex flex-row gap-2 sm:gap-3'>
              <div className='p-1 sm:p-2 h-6 w-6 sm:h-8 sm:w-8 rounded-3xl bg-lightGray flex justify-center items-center'>
                <FontAwesomeIcon icon={faHeart} className='text-base sm:text-lg text-darkGray hover:text-alibabaOrange' />
              </div>
              <div className='p-1 sm:p-2 h-6 w-6 sm:h-8 sm:w-8 rounded-3xl bg-lightGray flex justify-center items-center'>
                <FontAwesomeIcon icon={faLayerGroup} className='text-base sm:text-lg text-darkGray hover:text-alibabaOrange' />
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="py-1 px-2 sm:px-3 h-[40%] flex flex-col gap-1">
        <div className={mode ? 
          'text-xs sm:text-md h-[50%] py-1 font-semibold flex flex-wrap text-black' : 
          'text-darkText text-xs sm:text-md h-[50%] py-1 font-semibold flex flex-wrap'}>
          <Link href={`/view/${product._id}`} className="hover:text-gray-500">
            {product.productName.length > 30
              ? `${product.productName.slice(0, 30)}...`
              : product.productName}
          </Link>
        </div>
        <div className="text-sm sm:text-lg font-semibold text-gray-700 h-[50%] flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="flex flex-row gap-1 sm:gap-2 font-bold text-xs sm:text-sm">
              <div className="text-alibabaOrange font-bold">
                ${(product.productPrice - (product.productPrice / 100) * product.productDiscount).toFixed(2)}
              </div>
              <div>
                <del className="text-gray-500 font-semibold">
                  ${product.productPrice}
                </del>
              </div>
            </div>
            <div className="text-xs sm:text-sm flex flex-row gap-1 sm:gap-3">
              <p>15 sales</p>
              <div className="flex flex-row items-center">
                <FontAwesomeIcon icon={faStar} className="text-alibabaOrange text-base sm:text-lg" />
                <p className="px-1 sm:px-2">5.0(10)</p>
              </div>
            </div>
          </div>
          <div>
            <div onClick={() => addToCart(product._id)} className="w-full text-sm px-2 flex flex-row py-1 text-white rounded-lg duration-200">
              <FontAwesomeIcon icon={faCartPlus} className="w-5 h-5 sm:w-6 sm:h-6 text-lg sm:text-xl cursor-pointer text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const HeaderSection = () => (
    <div className='w-full'>
      <div className="ml-2 sm:ml-3 py-2 sm:py-3">
        <p className="text-xs sm:text-sm">Discover/ Products</p>
        <p className="text-lg sm:text-xl font-bold">Best Selling Specific products - Weekly Update</p>
      </div>
      <div className="w-full flex flex-wrap mt-0 py-2">
        <div onClick={resetSearch} className={`${mode ? '' : 'bg-gray-800 text-gray-400'} py-1 rounded-full max-w-fit mr-2 mb-2 text-xs sm:text-sm cursor-pointer`}>
          <p className='px-3 sm:px-4'>All</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {categoryAvailable.map((category, index) => (
            <CategoryButton key={index} category={category} isActive={activeCategory === category}/>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className='px-1 sm:px-2'>
      <Nav/>
        {Array.isArray(searchedProduct) && searchedProduct.length > 0 && search ? (
          <div className="w-full">
            <HeaderSection />

            <div className="card-container flex flex-row flex-wrap gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-3">
              {searchedProduct.map((product, index) => 
                product._id === '0' ? (
                  <div key={index} className="px-2 sm:px-4 md:px-20 w-full">
                    <p className={mode ? '' : 'text-gray-200'}>No Searched Product</p>
                  </div>
                ) : (
                  <ProductCard key={index} product={product} index={index} />
                )
              )}
            </div>
          </div>
        ) : (
          <div className="w-full my-0 mx-auto">
            <div className="px-1">
             <HeaderSection />

              <div className="card-container flex flex-row flex-wrap gap-1 sm:gap-2 px-1 sm:px-2">
                {products.map((product, index) => (
                  <ProductCard key={index} product={product} index={index} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='w-full flex justify-center py-3 sm:py-4'>
        <button className='py-1 px-6 sm:px-8 text-sm sm:text-base bg-alibabaOrange rounded-3xl text-white'>More</button>
      </div>
    </Layout>
  );
};

export default BuyingPage;