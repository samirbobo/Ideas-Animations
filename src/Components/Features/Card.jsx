import useStoreFeatures from "./Store";

/* eslint-disable react/prop-types */
const FeatureCard = ({ gradient, children, id }) => {
  // absolute inset-0 عملناها في الوضع دا عشان نخلي كل الصور تبقا فوق بعضها و الانيميشن لما نعمله الصور
  // تختفي بشكل متداخل

  // بجيب القيمه المتخزنه ولو طلعت بتساوي نفس الاي ديه بتاع العنصر الي واقف عليه بخلي الصوره تظهر
  const inViewFeature = useStoreFeatures((state) => state.inViewFeature);

  return (
    <div
      className={`absolute inset-0 h-full w-full rounded-2xl bg-gradient-to-br transition-opacity ${gradient} ${
        inViewFeature === id ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

export const Todo = ({ id }) => {
  return (
    <FeatureCard id={id} gradient="from-[#f7f0ff] to-[#a78afe]">
      <span />
    </FeatureCard>
  );
};

export const Colors = ({ id }) => {
  return (
    <FeatureCard id={id} gradient="from-[#f5fbff] to-[#addeff]">
      <span />
    </FeatureCard>
  );
};

export const Availability = ({ id }) => {
  return (
    <FeatureCard id={id} gradient="from-[#f5fff7] to-[#adf8ff]">
      <span />
    </FeatureCard>
  );
};

export const Music = ({ id }) => {
  return (
    <FeatureCard id={id} gradient="from-[#f7fff5] to-[#adffd8]">
      <span />
    </FeatureCard>
  );
};

export const SchedulingLinks = ({ id }) => {
  return (
    <FeatureCard id={id} gradient="from-[#fff7f5] to-[#ffd8ad]">
      <span />
    </FeatureCard>
  );
};

export const Team = ({ id }) => {
  return (
    <FeatureCard id={id} gradient="from-[#fef5ff] to-[#ffade1]">
      <span />
    </FeatureCard>
  );
};
