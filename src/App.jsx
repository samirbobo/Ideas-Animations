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
import Hero from "./Components/Hero";

const features = [
  {
    title: "Use your calendar as a todo list",
    id: "todo-list",
    card: Todo,
    // visual: OtherVisual,
  },
  {
    title: "Color your calendar to organize",
    id: "colors",
    card: Colors,
    // visual: OtherVisual,
  },
  {
    title: "Instantly know if someone is available",
    id: "availability",
    card: Availability,
    // visual: OtherVisual,
  },
  {
    title: "Track what you listened to when",
    id: "music",
    card: Music,
    // visual: MusicVisual,
  },
  {
    title: "Send scheduling links guests love",
    id: "scheduling-links",
    card: SchedulingLinks,
    // visual: OtherVisual,
  },
  {
    title: "Always know what your team is up to",
    id: "team",
    card: Team,
    // visual: OtherVisual,
  },
];

function App() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <Hero />

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
          <div className="relative w-full aspect-square rounded-2xl">
            {features.map((feature) => (
              <feature.card id={feature.id} key={feature.id} /> // Feature.card => هتتفك الي اسم الكارد الي انا عامله ويظهر الصوره بشكل احترافي
            ))}
          </div>
        </div>
      </div>
      <div className="h-screen">More Scroll</div>
    </div>
  );
}

export default App;
