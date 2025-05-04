import { create } from "zustand";

const useToggleModeStore = create((set) => ({
  mode: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("mode")) ?? true : true,
  toggleMode: () =>
    set((state) => {
      const newMode = !state.mode;
      localStorage.setItem("mode", JSON.stringify(newMode)); 
      return { mode: newMode };
    }),
}));

export default useToggleModeStore;


const useToggleDashboardStateStore = create((set) =>( {
    dashboardState:false,
    toggleDashboardState: () => 
        set((state) => ({dashboardState: !state.dashboardState}))
    

}))

export {useToggleDashboardStateStore};