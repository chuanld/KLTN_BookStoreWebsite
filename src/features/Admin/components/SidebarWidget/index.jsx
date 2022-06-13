import React, { useMemo, useState } from "react";
import {
  AccountCircle,
  Book,
  BorderColor,
  CalendarToday,
  HourglassEmpty,
  FeedbackOutlined,
  LineStyle,
  MailOutline,
  QuestionAnswerOutlined,
  Timeline,
  TrendingUp,
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { useLocation, useRouteMatch } from "react-router-dom";

function SideBar() {
  const location = useLocation();

  const objParams = useMemo(() => {
    const arrParams = location.pathname.split("/");
    return { ...arrParams };
  }, [location.pathname]);

  return (
    <div className="sidebarAdmin">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/admin/accounts">
              <li
                className={
                  objParams[2] === "accounts"
                    ? "sidebarListItem active"
                    : "sidebarListItem "
                }
              >
                <AccountCircle className="sidebarIcon" />
                Accounts
              </li>
            </Link>
            <Link to="/admin/products">
              <li
                className={
                  objParams[2] === "products"
                    ? "sidebarListItem active"
                    : "sidebarListItem "
                }
              >
                <Book className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/admin/categories">
              <li
                className={
                  objParams[2] === "categories"
                    ? "sidebarListItem active"
                    : "sidebarListItem "
                }
              >
                <CalendarToday className="sidebarIcon" /> Categories
              </li>
            </Link>
            <Link to="/admin/orders">
              <li
                className={
                  objParams[2] === "orders"
                    ? "sidebarListItem active"
                    : "sidebarListItem "
                }
              >
                <BorderColor className="sidebarIcon" /> Orders
              </li>
            </Link>
            <li className="sidebarListItem">
              <CalendarToday className="sidebarIcon" /> Logs
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Marketing</h3>
          <ul className="sidebarList">
            <Link to={"/admin/analytics"}>
              <li className="sidebarListItem">
                <Timeline /> Analytics
              </li>
            </Link>
            <Link to={"/admin/events-fsale"}>
              <li
                className={
                  objParams[2] === "events-fsale" ||
                  objParams[2] === "events-disc" ||
                  objParams[2] === "events-procode"
                    ? "sidebarListItem active"
                    : "sidebarListItem "
                }
              >
                <LineStyle /> Events
              </li>
            </Link>
          </ul>
        </div>
        {/* <div className='sidebarMenu'>
          <h3 className='sidebarTitle'>Notification</h3>
          <ul className='sidebarList'>
            <li className='sidebarListItem'>
              <MailOutline className='sidebarIcon' /> Email
            </li>
            
          </ul>
        </div> */}
      </div>
    </div>
  );
}

export default SideBar;
