// zustand هي المكتبه المستخدمه لبناء الهوك
import { create } from "zustand";

// انشاءنا الهوك دا عشان نخزن فيه الاي ديه بتاع كل عنصر من العناصر الي عندي وعلي اساس كل عنصر منهم بنبدا نعرض بتاعته
const useStoreFeatures = create((set) => ({
  inViewFeature: null,
  setInViewFeature: (feature) => set({ inViewFeature: feature }),
}));

export default useStoreFeatures;
