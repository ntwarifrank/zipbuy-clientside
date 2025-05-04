"use client"
import {BarChart3Icon, Settings, HelpCircle, Users2, Package2Icon, HomeIcon, BarChart4Icon, X, MenuIcon} from "lucide-react"
import useToggleModeStore from "../store/modeController";
import { useToggleDashboardStateStore } from "../store/modeController";
import Link from "next/link";
import useSearchStore from "../store/handlesearch";
import { useState, useEffect } from "react";

const Layout = ({children}) => {
  const {dashboardState, toggleDashboardState} = useToggleDashboardStateStore();
  const {setSearch} = useSearchStore();
  const { mode } = useToggleModeStore();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [screenSize, setScreenSize] = useState('');

  // Enhanced responsive checks
  useEffect(() => {
    const checkViewportSize = () => {
      const width = window.innerWidth;
      
      // Set mobile view state
      setIsMobileView(width < 768);
      
      // Set more granular screen size categories
      if (width < 640) {
        setScreenSize('xs');
      } else if (width < 768) {
        setScreenSize('sm');
      } else if (width < 1024) {
        setScreenSize('md');
      } else {
        setScreenSize('lg');
      }

      // Auto-close mobile sidebar on larger screens
      if (width >= 768) {
        setIsMobileSidebarOpen(false);
      }
    };

    checkViewportSize();
    window.addEventListener('resize', checkViewportSize);
    return () => window.removeEventListener('resize', checkViewportSize);
  }, []);

  function showDashboard(){
    if (isMobileView) {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    } else {
      toggleDashboardState();
    }
  }

  function closeMobileSidebar() {
    setIsMobileSidebarOpen(false);
  }

  function handleCategorySearch(item){
    setSearch(item);
    if (isMobileView) {
      closeMobileSidebar();
    }
  }

  const productListItem = ["Clothes", "Bags", "Food", "Shoes", "Accessories"];

  // Main sidebar content
  const SidebarContent = () => (
    <>
      <div className="px-2 sm:px-3 flex flex-row justify-between items-center">
        <div className="flex items-center">
          <p className={`font-bold text-alibabaOrange text-lg ${dashboardState && !isMobileView ? "hidden" : "block"}`}>ZIPBUY</p>
        </div>
        <div>
          {isMobileView ? (
            <X 
              size={20} 
              onClick={closeMobileSidebar} 
              className="cursor-pointer hover:text-alibabaOrange transition-colors duration-200" 
            />
          ) : (
            <BarChart4Icon 
              size={20} 
              onClick={showDashboard} 
              className="cursor-pointer hover:text-alibabaOrange transition-colors duration-200" 
            />
          )}
        </div>
      </div>
      <div className="flex flex-col justify-between h-full pb-5 mt-4">
        <div>
          <ul className="px-1 sm:px-2 py-3 sm:py-4 flex flex-col gap-2 sm:gap-3 font-semibold">
            <li className="flex flex-row gap-1 font-bold hover:text-alibabaOrange cursor-pointer transition-colors duration-200">
              <Link href="/buyingpage" className="cursor-pointer flex flex-row gap-1 items-center w-full" onClick={isMobileView ? closeMobileSidebar : undefined}>
                <HomeIcon size={18} className="min-w-5" />
                <span className={`${dashboardState && !isMobileView ? "hidden" : "block"} text-xs sm:text-sm whitespace-nowrap`}>Discover</span>
              </Link>
            </li>
            <li className={`${dashboardState && !isMobileView ? "hidden" : ""} px-1 sm:px-2 h-14 sm:h-16 overflow-y-auto scrollbar-track-transparent scrollbar-thin scrollbar-hover:bg-gray-500 scrollbar-thumb-gray-400`}>
              <ul className={dashboardState && !isMobileView ? "" : "border-l-2 flex flex-col gap-1 border-gray-500"}>
                {
                  productListItem.map((listItem, index) => (
                    <li
                      key={index} 
                      onClick={() => handleCategorySearch(listItem)}
                      className="px-1 text-xs hover:text-alibabaOrange cursor-pointer transition-colors duration-200"
                    >
                      <span className={dashboardState && !isMobileView ? "hidden" : "block"}>{listItem}</span>
                    </li>
                  ))
                }
              </ul>
            </li>
            <li className="flex flex-row gap-1 hover:text-alibabaOrange cursor-pointer transition-colors duration-200" onClick={isMobileView ? closeMobileSidebar : undefined}>
              <Package2Icon size={18} className="min-w-5" />
              <span className={`${dashboardState && !isMobileView ? "hidden" : "block"} text-xs sm:text-sm whitespace-nowrap`}>Popular Products</span>
            </li>
            <li className="flex flex-row gap-1 hover:text-alibabaOrange cursor-pointer transition-colors duration-200" onClick={isMobileView ? closeMobileSidebar : undefined}>
              <Users2 size={18} className="min-w-5" />
              <span className={`${dashboardState && !isMobileView ? "hidden" : "block"} text-xs sm:text-sm whitespace-nowrap`}>Top Authors</span>
            </li>
            <li className="flex flex-row gap-1 hover:text-alibabaOrange cursor-pointer transition-colors duration-200" onClick={isMobileView ? closeMobileSidebar : undefined}>
              <BarChart3Icon size={18} className="min-w-5" />
              <span className={`${dashboardState && !isMobileView ? "hidden" : "block"} text-xs sm:text-sm whitespace-nowrap`}>Feed</span>
            </li>
          </ul>
        </div>
        <div className="px-1">
          <ul className="border-b-2 border-gray-300 flex flex-col gap-2 px-1 pb-2">
            <li className="flex flex-row gap-1 hover:text-alibabaOrange cursor-pointer transition-colors duration-200" onClick={isMobileView ? closeMobileSidebar : undefined}>
              <Settings size={16} className="min-w-4" />
              <span className={`${dashboardState && !isMobileView ? "hidden" : "block"} text-xs sm:text-sm whitespace-nowrap`}>Setting</span>
            </li>
            <li className="flex flex-row gap-1 hover:text-alibabaOrange cursor-pointer transition-colors duration-200" onClick={isMobileView ? closeMobileSidebar : undefined}>
              <HelpCircle size={16} className="min-w-4" />
              <span className={`${dashboardState && !isMobileView ? "hidden" : "block"} text-xs sm:text-sm whitespace-nowrap`}>Help</span>
            </li>
          </ul>
          <ul className={`flex text-xs gap-1 py-2 px-1 flex-wrap ${dashboardState && !isMobileView ? "flex-col text-xs px-0" : "flex-row"}`}>
            <li><Link href="#" className="hover:underline" onClick={isMobileView ? closeMobileSidebar : undefined}>Terms</Link></li>
            <li><Link href="#" className="hover:underline" onClick={isMobileView ? closeMobileSidebar : undefined}>Privacy</Link></li>
            <li><Link href="#" className="hover:underline" onClick={isMobileView ? closeMobileSidebar : undefined}>Help</Link></li>
          </ul>
          <div className={`text-xs ${dashboardState && !isMobileView ? "text-xs" : ""}`}>
            <p>Copyright 2025 By Nfsoft</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div>
      <div className={mode ? "flex flex-row bg-mainColor text-gray-500 min-h-screen" : "flex flex-row bg-darkMode text-gray-400 min-h-screen"}>
        {/* Mobile Header Bar - Always visible on mobile */}
        {isMobileView && (
          <div className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 ">
            <div className="flex items-center gap-3">
              <button 
                onClick={showDashboard}
                className="p-1 rounded-lg transition-colors duration-200 focus:outline-none"
                aria-label="Toggle menu"
              >
                <MenuIcon size={24} />
              </button>
              <span className="font-bold text-alibabaOrange text-xl">ZIPBUY</span>
            </div>
            
            {/* Add mobile header actions here if needed */}
            <div className="flex items-center gap-2">
              {/* Placeholder for potential actions like search, cart, etc. */}
            </div>
          </div>
        )}
        
        {/* Mobile Sidebar Overlay */}
        {isMobileView && isMobileSidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300" 
            onClick={closeMobileSidebar}
            aria-hidden="true"
          ></div>
        )}
        
        {/* Sidebar - Different behavior on mobile vs desktop */}
        <div 
          className={`
            ${isMobileView ? 
              `fixed top-0 left-0 z-50 h-full transition-transform duration-300 ease-in-out ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-52 sm:w-56` 
              : 
              `transition-all duration-300 ${dashboardState ? "w-12" : "w-40 lg:w-48"}`
            }
            ${mode ? 'bg-dashboaldColor text-gray-600' : 'bg-gray-800 text-darkText'}
            py-3 shadow-lg
          `}
        >
          <SidebarContent />
        </div>
        
        {/* Main Content */}
        <div 
          className={`
            transition-all duration-300
            ${isMobileView ? "w-full" : (dashboardState ? "w-[calc(100%-3rem)]" : "w-[calc(100%-10rem)] lg:w-[calc(100%-12rem)]")}
          `}
        >
          {/* Add proper spacing for mobile header */}
          <div className={isMobileView ? "pt-16" : ""}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;