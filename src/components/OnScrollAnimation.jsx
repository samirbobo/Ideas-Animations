import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export default function OnScrollAnimation({ children, width = "fit-content" }) {
  const ref = useRef(null);
  // بتخلني اشوف الانيمشين اتعمل قبل كده علي القسم دا ولا لا لو لا يبقا اعمله لو اه يبقا متكررهوش
  // ودا بيخليك كل ما بتعمل اسكرول لتحت تلاقي المحتوي بيبداء يظهر قدامك بالتدريج من العدم
  const isView = useInView(ref, { once: true });

  // الفانكشن ديه بتخلني اعمل الانيمشين علي شكل متغير عشان يبدا في وقت محدد انا الي مظبطه
  const mainContrails = useAnimation();
  const slideContrails = useAnimation();

  useEffect(() => {
    if (isView) {
      mainContrails.start("visible");
      slideContrails.start("visible");
    }
  }, [mainContrails, slideContrails, isView]);

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainContrails}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={slideContrails}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          background: "var(--brand)",
          zIndex: 20,
        }}
      />
    </div>
  );
}
