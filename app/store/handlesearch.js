import { create } from "zustand";

const useSearchStore = create((set) => ({
     search:"",
     setSearch: (content) => {
        set({search: content})
     }
}))

export default useSearchStore

const useSearchedStore = create((set) => ({
   searchedProduct:[],
   setSearchedProduct: (content) => {
      set({searchedProduct: content});
   }
}))

export  {useSearchedStore}