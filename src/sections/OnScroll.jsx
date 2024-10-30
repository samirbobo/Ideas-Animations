import OnScrollAnimation from "../components/OnScrollAnimation";

export default function OnScroll() {
  return (
    <section className="hero_hero__HQvTb section-wrapper ">
      <div className="hero_copyWrapper__CwXi2">
        <OnScrollAnimation>
          <h1 className="hero_title__Qj25Y">
            Hey, {"I'm"} Samir<span>.</span>
          </h1>
        </OnScrollAnimation>
        <OnScrollAnimation>
          <h2 className="hero_subTitle__gHa6t">
            {"I'm"} a <span>Full Stack Developer</span>
          </h2>
        </OnScrollAnimation>
        <OnScrollAnimation>
          <p className="hero_aboutCopy__VTnoZ">
            I have spent the last 5 years building and scaling software for some
            pretty cool companies. I also teach people to paint online (incase
            you have got an empty canvas layin around 🎨). Let us connect!
          </p>
        </OnScrollAnimation>
        <OnScrollAnimation>
          <button className="standardbutton_standardButton__kderB">
            Contact me
          </button>
        </OnScrollAnimation>
      </div>
    </section>
  );
}
