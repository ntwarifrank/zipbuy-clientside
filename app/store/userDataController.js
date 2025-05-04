import { create } from "zustand";

const userDataStore = create((set) => ({
    userData: [],
    setUserData: (newUser) => set({userData: newUser }),
    distroyUserData: () => set({userData: null})

}))

export default userDataStore
