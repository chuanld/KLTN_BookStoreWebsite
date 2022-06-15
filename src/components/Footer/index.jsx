import React from 'react'
import './footers.css'
import { Link } from 'react-router-dom'
import { Mail, PhoneInTalk } from '@mui/icons-material'

import { ft_facebook } from 'template/assets/images'
import { ft_googleplus } from 'template/assets/images'
import { ft_github } from 'template/assets/images'
import { ft_insta } from 'template/assets/images'
import { LogoFooter } from 'template/assets/images'
import Shipping from './Shipping'

export default function Footer() {
  return (
    <>
      <Shipping />
      <div className="subscribe">
        <div className="container">
          <div className="wrap">
            <div className="subscribe-title">
              <Mail />
              <h5>Đăng kí nhận email</h5>
            </div>
            <div className="subscribe-name">
              <input
                type="text"
                name="subscribe_name"
                placeholder="Enter you name"
              />
            </div>

            <div className="subscribe-email">
              <input
                type="text"
                name="subscribe_email"
                placeholder="Enter your email here"
              />
            </div>
            <div className="subscribe-phone">
              <PhoneInTalk className="icon_phone" />
              <h6>Hotline: 0123456789</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-2  offset-lg-1 col-md-6 col-sm-6 logo-footer">
              <div className="footer__widget">
                <div className="container-logo">
                  <div className="logo">
                    <img src={LogoFooter} alt="" />
                  </div>
                  <i>Kiến thức là vô giá</i>
                  {/* <span>Uy tín Chất Lượng Đảm Bảo Nhanh Chóng</span> */}
                </div>
              </div>
            </div>
            <div className="col-lg-2  offset-lg-1 col-md-6 col-sm-6">
              <div className="footer__widget">
                <h6>Hệ Thống Cửa Hàng</h6>
                <p>1 Vo Van Ngan Street Thu Duc District Ho Chi Minh City</p>
                <p>8 Số 5, Tăng Nhơn Phú B, Quân 9, Thành phô Hồ Chí Minh</p>
              </div>
            </div>
            <div className="col-lg-2 offset-lg-1 col-md-3 col-sm-6">
              <div className="footer__widget">
                <h6>Chính Sách</h6>
                <ul>
                  {/* <li><a href="./csbm.html">Chính Sách Bảo Mật</a></li> */}
                  <li>
                    <Link to="/policies">Chính sách mua hàng</Link>
                  </li>
                  <li>
                    <Link to="/policies">Chính sách bảo mật</Link>
                  </li>
                  <li>
                    <Link to="/policies">Chính sách khách sỉ</Link>
                  </li>
                  <li>
                    <Link to="/policies">Chính sách đổi - trả</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 offset-lg-1 col-md-6 col-sm-6">
              <div className="footer__widget">
                <h6>Follow us</h6>
                <ul className="social">
                  <i className="icon-facebook icon">
                    <img src={ft_facebook} alt="" />
                  </i>
                  <i className="icon-facebook icon">
                    <img src={ft_googleplus} alt="" />
                  </i>
                  <i className="icon-facebook icon">
                    <img src={ft_insta} alt="" />
                  </i>
                  <i className="icon-facebook icon">
                    <img src={ft_github} alt="" />
                  </i>
                  {/* <li><a href="https://www.instagram.com/delwyn.st/"  target="_blank"><img src="img/ins.jpg" alt="">
                                </a></li> */}
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="footer__copyright__text">
                <p>
                  Copyright © Đồ án Tiểu Luận Chuyên Ngành by CHUANG team
                  <i className=" fa fa-heart" aria-hidden="true"></i>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
