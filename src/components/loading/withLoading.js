import React from "react";

export default function withLoading(WrappedComponent) {
  return (props) => {
    const showLoading = () => {
      document.body.classList.add("loading-data");
    };

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    const hideLoading = () => {
      document.body.classList.remove("loading-data");
      scrollToTop();
    };

    return (
      <WrappedComponent
        showLoading={showLoading}
        hideLoading={hideLoading}
        {...props}
      />
    );
  };
}
