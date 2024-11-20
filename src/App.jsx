import { stagger, useAnimate } from "framer-motion";
import "./App.css";
import {
  Availability,
  Colors,
  Music,
  SchedulingLinks,
  Team,
  Todo,
} from "./Components/Features/Card";
import FeatureTitle from "./Components/Features/Title";
import { MusicVisual, OtherVisual } from "./Components/Features/Visual";
import Hero from "./Components/Hero";
import { useEffect } from "react";
import useStoreFeatures from "./Components/Features/Store";
import { useHidePageOverflow } from "./utils/toggle-page-overflow";

const features = [
  {
    title: "Use your calendar as a todo list",
    id: "todo-list",
    card: Todo,
    visual: OtherVisual,
  },
  {
    title: "Color your calendar to organize",
    id: "colors",
    card: Colors,
    visual: OtherVisual,
  },
  {
    title: "Instantly know if someone is available",
    id: "availability",
    card: Availability,
    visual: OtherVisual,
  },
  {
    title: "Track what you listened to when",
    id: "music",
    card: Music,
    visual: MusicVisual,
  },
  {
    title: "Send scheduling links guests love",
    id: "scheduling-links",
    card: SchedulingLinks,
    visual: OtherVisual,
  },
  {
    title: "Always know what your team is up to",
    id: "team",
    card: Team,
    visual: OtherVisual,
  },
];

function App() {
  // بتخلني ادي اسم لعنصر معين واعمله انيميشن بالشكل الي انا عايزه
  const [scope, animate] = useAnimate();
  const fullScreenFeature = useStoreFeatures(
    (state) => state.fullScreenFeature
  );
  const setFullScreenFeature = useStoreFeatures(
    (state) => state.setFullScreenFeature
  );
  const lastFullScreenFeature = useStoreFeatures(
    (state) => state.lastFullScreenFeature
  );

  useHidePageOverflow(!!fullScreenFeature);

  useEffect(() => {
    if (fullScreenFeature) {
      animate([
        [
          ".feature-title", // دا الاسم بتاع العنصر وبروحه احطه في الكلاس بتاع العنصر بتاعي
          { opacity: 0, x: "-200px" },
          { duration: 0.3, delay: stagger(0.05) },
        ],
        [
          `.visual-${lastFullScreenFeature}`,
          { opacity: 1, scale: 1, pointerEvents: "auto" },
          { at: "<", delay: 0.3 }, // بتعمل توازي في سرعه الانيمشين بين عنصرين
        ],
        [".active-card .gradient", { opacity: 0, scale: 0 }, { at: "<" }],
        [".active-card .show-me-btn", { opacity: 0 }, { at: "<" }],
        [".back-to-site-btn", { opacity: 1, y: 0 }, { at: "<", duration: 0.3 }],
      ]);
    } else {
      animate([
        [
          ".feature-title",
          { opacity: 1, x: "0px" },
          { duration: 0.3, delay: stagger(0.05) },
        ],
        [
          `.visual-${lastFullScreenFeature}`,
          { opacity: 0, scale: 0.75, pointerEvents: "none" },
          { at: "<" },
        ],
        [".active-card .gradient", { opacity: 1, scale: 1 }, { at: "<" }],
        [
          ".back-to-site-btn",
          { opacity: 0, y: "300px" },
          { at: "<", duration: 0.3 },
        ],
        [".active-card .show-me-btn", { opacity: 1 }],
      ]);
    }
  }, [fullScreenFeature, animate, lastFullScreenFeature]);

  return (
    <div className="mx-auto max-w-6xl px-4">
      <Hero />

      <div ref={scope}>
        {features.map((feature) => (
          <feature.visual id={feature.id} key={feature.id} />
        ))}

        <button
          onClick={() => setFullScreenFeature(null)}
          className="back-to-site-btn bg-black text-white px-4 py-2 z-10 rounded-xl shadow-lg opacity-0 translate-y-[300%] fixed bottom-6 left-1/2 -translate-x-1/2"
        >
          Back to site
        </button>

        <div className="flex items-start w-full gap-20">
          <div className="w-full py-[50vh]">
            <ul>
              {features.map(({ title, id }) => (
                <li key={id}>
                  <FeatureTitle id={id}>{title}</FeatureTitle>
                </li>
              ))}
            </ul>
          </div>
          <div className="sticky top-0 flex h-screen w-full items-center">
            <div className="relative w-full aspect-square rounded-2xl [&:has(>_.active-card)]:bg-transparent">
              {features.map((feature) => (
                <feature.card id={feature.id} key={feature.id} /> // Feature.card => هتتفك الي اسم الكارد الي انا عامله ويظهر الصوره بشكل احترافي
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-screen">More Scroll</div>
    </div>
  );
}

export default App;
