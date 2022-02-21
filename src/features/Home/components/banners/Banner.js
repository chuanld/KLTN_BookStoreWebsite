import React from "react";


import {Banner4} from '../../../../template/assets/images/index'
function Banner() {
  return (
    <div className="banner header-text">
      <div className="owl-banner ">
        <div
          className="banner-item-01"
          style={{ backgroundImage: `url(${Banner4})` }}
        >
          <div className="text-content">
            <h4>Nature and books belong to the eyes that see them.</h4>
            <h2>Wellcome in the Book Store</h2>
          </div>
        </div>
        {/* <div className="banner-item-02">
            <div className="text-content">
              <h4>Flash Deals</h4>
              <h2>Get your best products</h2>
            </div>
          </div>
          <div className="banner-item-03">
            <div className="text-content">
              <h4>Last Minute</h4>
              <h2>Grab last minute deals</h2>
            </div>
          </div> */}
      </div>
    </div>
  );
}

export default Banner;
