import { useEffect } from "react";

export const hidePageOverflow = () => {
  // window.innerWidth مساحه الشاشه كامله بالاسكرول كمان
  // document.body.clientWidth مساحه الشاشه نفسها من غير الاسكرول بار

  const scrollbarWidth = window.innerWidth - document.body.clientWidth + "px";
  document.documentElement.style.setProperty("padding-right", scrollbarWidth);
  document.documentElement.classList.add("overflow-clip");
};

export const showPageOverflow = () => {
  document.documentElement.style.removeProperty("padding-right");
  document.documentElement.classList.remove("overflow-clip");
};

export const useHidePageOverflow = (hide) => {
  useEffect(() => {
    if (hide) {
      hidePageOverflow();
    } else {
      showPageOverflow();
    }
  }, [hide]);
};
