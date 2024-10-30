import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="min-h-[300vh] bg-gradient-to-b from-[rgba(255,255,255,.1)] to-[rgba(255,255,255,0)]">
      <Nav />
      <div className="overflow-clip opacity-30">
        <p className="text-white break-all text-[30vw]">
          Beautiful sticky navigation that plays peek-a-boo 👻 on scroll
        </p>
      </div>
    </div>
  );
}

function Nav() {
  // عملت متغير عشان اخلي قيمه الانيمشين متغيره
  const [isHidden, setIsHidden] = useState(false);

  // استدعيت ميزه الاسكرول واي عشان اعرف انا اتحركت قد ايه طوليا ف الصفحه بترجع القيمه ديه علي شكل اوبجيكت
  const { scrollY } = useScroll();

  // عملت متغير عشان احسب اخر قيمه للواي كانت بكام
  const lastYRef = useRef(0);

  // فانكشن بتقبل مني المتغير الي هيتم تغيره ونوع تتبعي ليه وهي الحاله التانيه وقيمتها تغير وتالت قيمه هي الفانكش
  // الي هيعملها مع كل تغير علوي او سفلي
  useMotionValueEvent(scrollY, "change", (y) => {
    // بحسب الفرق بين موضعي دلوقتي واخر مكان كنت فيه
    let difference = y - lastYRef.current;
    // هنا استخدمت الفانكشن ديه عشان ديما القيمه تطلع بالموجب لاني لو طالع ف الصفحه طبيعي تكون الناتج بالسالب
    // 50 ديه قيمه اختياريه الي هو بعد تحرك المستخدم قيمه خمسين بكسل عمل الانيمشين بتاعي سوي تخفي او تظهر الناف بار
    if (Math.abs(difference) > 50) {
      // لو القيمه موجبه يبقي انا نازل في الصفحه لو سالبه تبقي طالع ف الصفحه ولو نازل اخفي الناف بار ولو طالع اظهره تاني بس
      setIsHidden(difference > 0);
      // عشان اخزن في المتغير الي عرفته فوق قيمه الواي في اخر لحظه قبل التحرك
      lastYRef.current = y;
    }
  });

  return (
    <motion.div
      variants={{
        hidden: { y: "-90%" },
        visible: { y: "0%" },
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.2 }}
      whileHover="visible"
      // عشان لو في مستخدم بيحاول يحدد الناف بار بالكيبورد يظهر معاه ساعتها لو كان مخفي
      onFocusCapture={() => setIsHidden(false)}
      className="fixed top-0 pt-3 z-10 flex justify-center w-full"
    >
      <nav className="flex justify-between gap-3 rounded-3xl p-5 bg-white *:rounded-xl *:border *:border-gray-200 *:px-7 *:py-2 *:transition-colors *:duration-300 hover:*:bg-gray-200 focus-visible:*:bg-gray-200">
        <a href="#" className="">
          <svg
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z"></path>
          </svg>
          <span className="sr-only">Home</span>
        </a>
        <a href="#" className="">
          Products
        </a>
        <a href="#" className="">
          Services
        </a>
        <a href="#" className="">
          About
        </a>
        <a href="#" className="">
          Contact
        </a>
      </nav>
    </motion.div>
  );
}

export default App;
