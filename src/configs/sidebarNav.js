// sidebarNav.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChartLine, faCalendarDays } from "@fortawesome/free-solid-svg-icons";

const sidebarNav = [
  {
    link: "/",
    section: "home",
    icon: <FontAwesomeIcon icon={faHome} />,
    text: "Home",
  },
  {
    link: "/StateLive",
    section: "StateLive",
    icon: <FontAwesomeIcon icon={faChartLine} />,
    text: "statistique journaux de jour",
  },
  {
    link: "/StateParDate",
    section: "StateParDate",
    icon: <FontAwesomeIcon icon={faCalendarDays} />,
    text: "statistique par Un Date",
  },
];

export default sidebarNav;
