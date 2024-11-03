/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import "./App.css";
import { motion, useAnimation, useInView } from "framer-motion";

function App() {
  return (
    <>
      <main className="mx-auto mt-14 max-w-6xl text-white">
        <section className="h-screen">
          <p className="text-4xl md:text-[200px] md:leading-relaxed">
            Scroll down...
          </p>
        </section>

        <section className="flex h-[150vh] flex-col items-center justify-center">
          <AnimatedText text="Hello you" className="text-[200px]" once />
        </section>

        <section className="flex h-[150vh] flex-col items-center justify-center">
          <AnimatedText
            text={[
              "This is written on",
              "a typing machine. Tick tick",
              "tick tick Tick...",
            ]}
            className="text-4xl"
            repeatDelay={10000}
          />
        </section>
      </main>
    </>
  );
}

const defaultAnimations = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
};

const AnimatedText = ({ text, className, once, repeatDelay }) => {
  // بستخدم الهوك ديه عشان اقدر اتحكم في حركه الانيمشين وتكرارها لو عوزت
  const controls = useAnimation();
  // هنا بحول النص الي هيجي لي لاراي عشان اقدر اعمل لوب علي كل جمله واقسمها الي كلمات ثما الي حروف
  const textArray = Array.isArray(text) ? text : [text];
  // عشان احدد العنصر بتاعي الي هيتم عليه الانيمشين
  const ref = useRef(null);
  // بحط العنصر الي حدته في الهوك بتاعي الفيو عشان احدد هل العنصر بتاعي ظهر قدام المستخدم علي الشاشه ولا لسه
  // once عشان لو عايز اكرر الانيمشين عند الوصول للعنصر بتاعي ولا لا
  const isInView = useInView(ref, { amount: 0.5, once });

  // هنا عملت تكرار علي حسب وصولي للعنصر عشان كل مره لما اوصله اكرر الكود دا
  useEffect(() => {
    let timeOut;
    const show = () => {
      // في الاول بخلي الانيمشين بتاعي يظهر
      controls.start("visible");
      // لو في وقت معين لاخفاء النص واعاده تشغيل الانيمشين اعملها لو مفيش خلاص بيظهر الانيمشين بدون تكرار
      if (repeatDelay) {
        timeOut = setTimeout(async () => {
          await controls.start("hidden");
          controls.start("visible");
        }, repeatDelay);
      }
    };

    // لو العنصر بتاعي ظاهر يبقا اظهر الانيمشين لو لا يبقا اخفيه
    if (isInView) {
      show();
    } else {
      controls.start("hidden");
    }

    return () => {
      clearTimeout(timeOut);
    };
  }, [isInView]);

  return (
    <p className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: {},
          // staggerChildren عشان تخلي الحروف تظهر حرف تلو الاخر بشكل متسلسل ونصيحه حطها في حاله الظهور فقط عشان
          // transition العنصر لما يختفي يختفي بدون مره واحده يعني
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        aria-hidden
      >
        {textArray.map((line, index) => (
          <span className="block" key={index}>
            {line.split(" ").map((word, index) => (
              <span className="inline-block" key={index}>
                {word.split("").map((char, index) => (
                  <motion.span
                    className="inline-block"
                    key={index}
                    variants={defaultAnimations}
                  >
                    {char}
                  </motion.span>
                ))}
                <span className="inline-block">&nbsp;</span>
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </p>
  );
};

export default App;
