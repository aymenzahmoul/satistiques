// Sidebar.js
import React, { useEffect, useState } from "react";
import "./sidebar.scss";
import { Link, useLocation } from "react-router-dom";
import { images } from "../../constants";
import sidebarNav from "../../configs/sidebarNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faSignOutAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import LogoutService from "../../service/LogoutService";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarNav.findIndex((item) => item.section === curPath);

    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  const closeSidebar = () => {
    document.querySelector(".main__content").style.transform =
      "scale(1) translateX(0)";
    setTimeout(() => {
      document.body.classList.remove("sidebar-open");
      document.querySelector(".main__content").style = "";
    }, 500);
  };

  const handleLogout = async () => {
    try {
      await LogoutService.signout();
      window.location.reload();
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src={images.img1} alt="" />
        <div className="sidebar-close" onClick={closeSidebar}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
      <div className="sidebar__menu">
        {sidebarNav.map((nav, index) => (
          <Link
            to={nav.link}
            key={`nav-${index}`}
            className={`sidebar__menu__item ${
              activeIndex === index && "active"
            }`}
            onClick={closeSidebar}
          >
            <div className="sidebar__menu__item__icon">{nav.icon}</div>
            <div className="sidebar__menu__item__txt">{nav.text}</div>
          </Link>
        ))}
        <div className="sidebar__menu__item" onClick={handleLogout}>
          <div className="sidebar__menu__item__icon">
            <FontAwesomeIcon icon={faSignOutAlt} />
          </div>
          <div className="sidebar__menu__item__txt">Logout</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
