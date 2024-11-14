/* eslint-disable react/prop-types */
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import useStoreFeatures from "./Store";

// انا عملت كل جمله علي شكل كمبونانت عشان اعرف هل هي ظهرت في منتصف الصفحه ولا لا واقدر اتحكم في شكل الانيمشين بتاعها
export default function FeatureTitle({ children, id }) {
  // عشان امسك العنصر علي شكل متغير
  const ref = useRef(null);
  // الفانكشن ديه بتعرفني هل العنصر بتاعي ظهر علي الشاشه ولا لا
  // margin بتخلني استنا لحد ما العنصر يكون في نص الشاشه بظبط عشان يرجع صح علي ظهره
  const isView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  // هنا عملت متغير وخزنت فيه القيمه بتاعت الاي ديه لكل عنصر في حاله ظهوره بس
  const setInViewFeature = useStoreFeatures((state) => state.setInViewFeature);
  const inViewFeature = useStoreFeatures((state) => state.inViewFeature);

  useEffect(() => {
    if (isView) setInViewFeature(id);
    // لو العنصر بتاعي مش ظاهر والاي ديه بتاعي متخزن معناها اني عديت اخر عنصر او قبل اول عنصر ف بالتالي الغي الصوره خلاص
    if (!isView && inViewFeature === id) setInViewFeature(null);
  }, [isView, id, setInViewFeature, inViewFeature]);

  return (
    <p
      ref={ref}
      className={`py-16 text-5xl font-heading transition-colors ${
        isView ? "text-black" : "text-gray-300"
      }`}
    >
      {children}
    </p>
  );
}
