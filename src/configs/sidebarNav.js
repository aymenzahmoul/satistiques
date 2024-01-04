import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChartLine } from "@fortawesome/free-solid-svg-icons";

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
    text: "StateLive",
  },
];

export default sidebarNav;
