import React, { useRef } from "react";
import "../assets/css/sidebar.css";
import { Link } from "react-router-dom";
import {
  AiOutlineMenuUnfold,
  AiFillDashboard,
  AiOutlineAlignRight,
} from "react-icons/ai";

function Sidebar(props) {
  // For Sidebar and content
  let sidebarRef = useRef;
  let contentRef = useRef;
  const sidebarHandler = () => {
    let sidebar = sidebarRef;
    let content = contentRef;

    if (sidebar.classList.contains("sidebar-open")) {
      sidebar.classList.add("sidebar-close");
      sidebar.classList.remove("sidebar-open");
      content.classList.add("content");
      content.classList.remove("content-expend");
    } else {
      sidebar.classList.remove("sidebar-close");
      sidebar.classList.add("sidebar-open");
      content.classList.remove("content");
      content.classList.add("content-expend");
    }
  };

  

  return (
    <main className="main ">
      <header className="header">
        <div className="header-toggle" onClick={sidebarHandler}>
          <AiOutlineMenuUnfold />
        </div>
        <div className="header-name-section">
          <AiOutlineAlignRight className="header-name-icon" />
          <h6 className="header-name">Buisness Table Project</h6>
        </div>
      </header>

      <aside
        className="sidebar-open expandSidebar"
        ref={(div) => {
          sidebarRef = div;
        }}
      >
        <nav className="nav">
          <div>
            <div className="nav-list">
              <Link to="/" className=" nav-link">
                <p>
                  <AiFillDashboard className="nav-logo-icon" />
                </p>
                <span className=" nav-link-name"> Item One</span>
              </Link>
            </div>
          </div>
        </nav>
      </aside>

      <div
        className="content-expend"
        ref={(div) => {
          contentRef = div;
        }}
      >
        
        {props.children}
      </div>
    </main>
  );
}

export default Sidebar;
