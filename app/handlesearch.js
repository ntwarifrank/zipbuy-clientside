import { create } from "zustand";

const searchStore = create((set) => ({
     search:[],
     setSearch: (content) => {
        set({search:content})
     }
}))

export default searchStore