"use client"
import {BarChart3Icon,Settings,  HelpCircle,Users2, Package2Icon,HomeIcon, BarChart4Icon}from "lucide-react"
import useToggleModeStore from "../modeController";
import { useToggleDashboardStateStore } from "../modeController";
import Link from "next/link";
import useSearchStore from "../handlesearch";

const Layout = ({children}) => {
  const {dashboardState, toggleDashboardState} = useToggleDashboardStateStore();
  const {setSearch} = useSearchStore();
  const { mode } = useToggleModeStore();

function showDashboard(){
  toggleDashboardState();
}

function handleCategorySearch(item){
  setSearch(item);
}

const productListItem = ["Clothes","Bogs","Food", "Shoes", "Accessories"];

  return (
    <div>
        <div  className={mode ? "flex flex-row bg-mainColor text-gray-500  min-h-[110vh]" : "flex flex-row bg-darkMode text-gray-400 min-h-[100vh]"} >
            <div className={mode ? `transition-all duration-300  ${dashboardState ? "w-[5%]" : "w-[15%]"} bg-dashboaldColor text-gray-600 py-4`: `transition-all duration-300 ${dashboardState ? "w-[5%]" : "w-[15%]"} bg-gray-800 text-darkText py-4 `}>
                <div className="px-4 flex flex-row justify-between">
                    <div>
                       <p className={`font-bold text-alibabaOrange ${dashboardState ? "hidden": "block"}`}>ZIPBUY</p>
                    </div>
                      <div><BarChart4Icon size={24} onClick={showDashboard}/></div>
                    </div>
                    <div className="flex flex-col justify-between h-full pb-5">
                        <div>
                          <ul className="px-3 py-6 flex flex-col gap-3 font-semibold">
                            <li className="flex flex-row gap-2 font-bold hover:text-alibabaOrange" ><HomeIcon size={24}/><span className={dashboardState ? "hidden":"block"}>Discover </span></li>
                            <li className={`${dashboardState ? "hidden":""} px-4 h-20 overflow-y-scroll scrollbar-none`}>
                              <ul className={dashboardState ? "": "border-l-2 flex flex-col gap-1 border-gray-500 overflow-y-scroll scrollbar-track-transparent scrollbar-thin scrollbar-hover:bg-gray-500  scrollbar-thumb-gray-400"}>
                                {
                                productListItem.map((listItem, index) => (
                                  <li
                                   key={index} 
                                   onClick={() => { handleCategorySearch(listItem)} }
                                   className="px-2  hover:text-alibabaOrange cursor-pointer"
                                   >
                                    <span className={dashboardState ? "hidden":"block"}>{listItem}</span>
                                 </li>
                                ))
                                }
                              </ul>
                            </li>
                            <li className="flex flex-row  gap-2 hover:text-alibabaOrange" ><Package2Icon size={24} /><span className={dashboardState ? "hidden":"block"}>Popular Products</span></li>
                            <li className="flex flex-row  gap-2 hover:text-alibabaOrange" ><Users2 size={24} /><span className={dashboardState ? "hidden":"block"}> Top Authors </span></li>
                            <li className="flex flex-row  gap-2 hover:text-alibabaOrange"  ><BarChart3Icon size={24} /><span className={dashboardState ? "hidden":"block"}> Feed </span></li>
                          </ul>
                        </div>
                        <div className="px-2" >
                          <ul className="border-b-2 border-gray-300 flex flex-col gap-2 px-2 pb-2">
                            <li className="flex flex-row  gap-2 hover:text-alibabaOrange"><Settings size={20}/><span className={dashboardState ? "hidden":"block"}>Setting</span></li>
                            <li className="flex flex-row  gap-2 hover:text-alibabaOrange" ><HelpCircle size={20} /><span className={dashboardState ? "hidden":"block"}>Help</span></li>
                          </ul>
                          <ul className={`flex text-sm gap-2 py-2 px-2 ${dashboardState? "flex-col text-[15px] px-0": "flex-row "}`}>
                            <li><Link href="#" className="hover:underline">Terms</Link></li>
                            <li><Link href="#" className="hover:underline">Privacy</Link></li>
                            <li><Link href="#" className="hover:underline">Help</Link></li>
                          </ul>
                          <div className={`text-sm ${dashboardState?"text-[7px]":""}`}>
                            <p>Copyright 2025 By Nfsoft</p>
                          </div>
                        </div>
                    </div>

            </div>
            <div className={dashboardState ? "w-[95%]" : "w-[85%]"}>
             
            {children}
            </div>
        </div>
    </div>
  )
}

export default Layout