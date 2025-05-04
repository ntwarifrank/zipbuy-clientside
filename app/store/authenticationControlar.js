import { create } from "zustand";

const loginController = create((set) => ({
  login:false, 
  loginSuccess: () => set({ login: true}), 
  logout: () => set({ login: false }), 
}));

export default loginController;
