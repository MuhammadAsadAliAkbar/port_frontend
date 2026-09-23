import { useState } from "react";

import {
  Home,
  UserRound,
  Code2,
  FolderKanban,
  BriefcaseBusiness,
  Trophy,
  GraduationCap,
  Mail,
  Star,
  MessageSquareQuote,
  Menu,
  X,
  Search,
  Bell,
  ChevronDown,
  ArrowUpRight,
  Users,
  Layers3,
  CheckCircle2,
  Clock3,
  MoreHorizontal,
  Settings,
  LogOut,
  Sparkles,
  MessageCircle,
  ShieldUser,
  KeyRound,
} from "lucide-react";

import AdminMessageChat from "./AdminMessageChat";

import "../css/PortfolioDashboard.css";

/* =========================================================
   MENU ITEMS
========================================================= */

const menuItems = [
  {
    id: "home",
    label: "Home",
    icon: Home,
  },
  {
    id: "about",
    label: "About",
    icon: UserRound,
  },
  {
    id: "skills",
    label: "Skills",
    icon: Code2,
  },
  {
    id: "projects",
    label: "Projects",
    icon: FolderKanban,
  },
  {
    id: "experience",
    label: "Experience",
    icon: BriefcaseBusiness,
  },
  {
    id: "achievement",
    label: "Achievement",
    icon: Trophy,
  },
  {
    id: "education",
    label: "Education",
    icon: GraduationCap,
  },
  {
    id: "contact",
    label: "Contact",
    icon: Mail,
  },
  {
    id: "client-achievement",
    label: "Client Achievement",
    icon: Star,
  },
  {
    id: "testimonials",
    label: "Testimonials",
    icon: MessageSquareQuote,
  },
  {
    id: "message-chat",
    label: "Admin Message Chat",
    icon: MessageCircle,
  },
  {
    id: "user",
    label: "User",
    icon: UserRound,
  },
  {
    id: "role",
    label: "Role",
    icon: ShieldUser,
  },
  {
    id: "permission",
    label: "Permission",
    icon: KeyRound,
  },
];

/* =========================================================
   STATS
========================================================= */

const stats = [
  {
    title: "Total Projects",
    value: "100+",
    change: "+12%",
    icon: FolderKanban,
  },
  {
    title: "Clients",
    value: "50+",
    change: "+18%",
    icon: Users,
  },
  {
    title: "Technologies",
    value: "30+",
    change: "+8%",
    icon: Layers3,
  },
  {
    title: "Experience",
    value: "5+ Years",
    change: "Active",
    icon: Clock3,
  },
];

/* =========================================================
   PROJECTS
========================================================= */

const projects = [
  {
    name: "Connect QBS",
    type: "Enterprise SaaS",
    tech: "Angular • Node.js • MongoDB",
    status: "Completed",
  },
  {
    name: "RPA Management System",
    type: "Automation Platform",
    tech: "React • Node.js • PostgreSQL",
    status: "In Progress",
  },
  {
    name: "Portfolio Platform",
    type: "Personal Platform",
    tech: "React • Vite • Pusher",
    status: "Completed",
  },
  {
    name: "AI Assistant",
    type: "AI Application",
    tech: "OpenAI • LangChain • RAG",
    status: "Completed",
  },
];

/* =========================================================
   ACTIVITIES
========================================================= */

const activities = [
  {
    title: "New project added",
    description: "RPA Management System",
    time: "2 hours ago",
  },
  {
    title: "Client achievement updated",
    description: "Custom Calendar implementation",
    time: "5 hours ago",
  },
  {
    title: "New testimonial received",
    description: "Client feedback added",
    time: "1 day ago",
  },
  {
    title: "Experience updated",
    description: "Senior Full Stack Developer",
    time: "2 days ago",
  },
];

/* =========================================================
   DASHBOARD
========================================================= */

function PortfolioDashboard() {
  /*
    IMPORTANT:

    activeItem hi aapka activeSection hai.

    Example:

    activeItem === "home"
    activeItem === "message-chat"

    Jab Admin Message Chat par click hoga:
    setActiveItem("message-chat")

    aur neeche AdminMessageChat render hoga.
  */

  const [activeItem, setActiveItem] = useState("home");

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  /* =======================================================
     ACTIVE MENU
  ======================================================= */

  const activeMenu =
    menuItems.find(
      (item) => item.id === activeItem
    ) || menuItems[0];

  /* =======================================================
     MENU CLICK
  ======================================================= */

  const handleMenuClick = (id) => {
    setActiveItem(id);

    // Mobile par sidebar close
    setSidebarOpen(false);
  };

  return (
    <div className="portfolio-dashboard">

      {/* ===================================================
          MOBILE OVERLAY
      =================================================== */}

      {sidebarOpen && (
        <div
          className="dashboard-overlay"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      {/* ===================================================
          SIDEBAR
      =================================================== */}

      <aside
        className={`dashboard-sidebar ${
          sidebarOpen
            ? "sidebar-open"
            : ""
        }`}
      >

        {/* ===============================================
            SIDEBAR TOP
        =============================================== */}

        <div className="sidebar-top">

          <div className="dashboard-brand">

            <div className="brand-logo">
              <Sparkles size={20} />
            </div>

            <div className="brand-content">
              <h2>
                Asad<span>Hub</span>
              </h2>

              <p>
                Portfolio CMS
              </p>
            </div>

          </div>

          <button
            className="mobile-close"
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <X size={20} />
          </button>

        </div>

        {/* ===============================================
            MENU TITLE
        =============================================== */}

        <div className="sidebar-section-title">
          MAIN MENU
        </div>

        {/* ===============================================
            NAVIGATION
        =============================================== */}

        <nav className="dashboard-nav">

          {menuItems.map((item) => {

            const Icon = item.icon;

            const isActive =
              activeItem === item.id;

            return (
              <button
                key={item.id}
                type="button"
                className={`dashboard-nav-item ${
                  isActive
                    ? "nav-item-active"
                    : ""
                }`}
                onClick={() =>
                  handleMenuClick(item.id)
                }
              >

                <span className="nav-icon">
                  <Icon size={19} />
                </span>

                <span className="nav-label">
                  {item.label}
                </span>

                {isActive && (
                  <span className="active-indicator" />
                )}

              </button>
            );
          })}

        </nav>

        {/* ===============================================
            SIDEBAR BOTTOM
        =============================================== */}

        <div className="sidebar-bottom">

          <button
            type="button"
            className="sidebar-bottom-item"
          >
            <Settings size={18} />

            <span>
              Settings
            </span>
          </button>

          <button
            type="button"
            className="sidebar-bottom-item logout-item"
          >
            <LogOut size={18} />

            <span>
              Logout
            </span>
          </button>

        </div>

      </aside>

      {/* ===================================================
          MAIN
      =================================================== */}

      <main className="dashboard-main">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="dashboard-header">

          <div className="header-left">

            <button
              type="button"
              className="mobile-menu"
              onClick={() =>
                setSidebarOpen(true)
              }
            >
              <Menu size={21} />
            </button>

            <div>

              <span className="breadcrumb">
                Dashboard
              </span>

              <h1>
                {activeMenu.label}
              </h1>

            </div>

          </div>

          <div className="header-right">

            {/* SEARCH */}

            <div className="dashboard-search">

              <Search size={17} />

              <input
                type="text"
                placeholder="Search..."
              />

              <span className="search-shortcut">
                ⌘ K
              </span>

            </div>

            {/* NOTIFICATION */}

            <button
              type="button"
              className="notification-button"
            >
              <Bell size={19} />

              <span className="notification-dot" />
            </button>

            {/* PROFILE */}

            <div className="profile-wrapper">

              <button
                type="button"
                className="dashboard-profile"
                onClick={() =>
                  setProfileOpen(
                    !profileOpen
                  )
                }
              >

                <div className="profile-avatar">
                  MA
                </div>

                <div className="profile-info">

                  <strong>
                    Muhammad Asad
                  </strong>

                  <span>
                    Senior Developer
                  </span>

                </div>

                <ChevronDown size={16} />

              </button>

              {/* PROFILE DROPDOWN */}

              {profileOpen && (
                <div className="profile-dropdown">

                  <div className="dropdown-profile">

                    <div className="profile-avatar large">
                      MA
                    </div>

                    <div>

                      <strong>
                        Muhammad Asad
                      </strong>

                      <span>
                        Senior Full Stack Developer
                      </span>

                    </div>

                  </div>

                  <div className="dropdown-divider" />

                  <button type="button">
                    <UserRound size={17} />
                    My Profile
                  </button>

                  <button type="button">
                    <Settings size={17} />
                    Settings
                  </button>

                  <div className="dropdown-divider" />

                  <button
                    type="button"
                    className="dropdown-logout"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>

                </div>
              )}

            </div>

          </div>

        </header>

        {/* =================================================
            CONTENT
        ================================================= */}

        <section className="dashboard-content">

          {/* =================================================
              ADMIN MESSAGE CHAT
              
              YAHAN MAIN CHANGE HAI
          ================================================= */}

          {activeItem === "message-chat" ? (

            <AdminMessageChat />

          ) : (

            /* =============================================
               NORMAL DASHBOARD CONTENT
            ============================================= */

            <>

              {/* =========================================
                  WELCOME
              ========================================= */}

              <div className="welcome-card">

                <div className="welcome-content">

                  <div className="welcome-badge">
                    <span />
                    Portfolio Overview
                  </div>

                  <h2>
                    Welcome back,
                    <br />
                    <strong>
                      Muhammad Asad
                    </strong>
                  </h2>

                  <p>
                    Manage your portfolio,
                    projects, achievements,
                    experience and client
                    relationships from one place.
                  </p>

                  <button
                    type="button"
                    className="primary-button"
                  >
                    View Portfolio
                    <ArrowUpRight size={17} />
                  </button>

                </div>

                <div className="welcome-decoration">

                  <div className="orb orb-one" />
                  <div className="orb orb-two" />
                  <div className="orb orb-three" />

                  <div className="decoration-grid" />

                </div>

              </div>

              {/* =========================================
                  STATS
              ========================================= */}

              <div className="stats-grid">

                {stats.map((stat) => {

                  const Icon = stat.icon;

                  return (
                    <div
                      className="stat-card"
                      key={stat.title}
                    >

                      <div className="stat-top">

                        <div className="stat-icon">
                          <Icon size={20} />
                        </div>

                        <span className="stat-change">
                          {stat.change}
                        </span>

                      </div>

                      <div className="stat-value">
                        {stat.value}
                      </div>

                      <div className="stat-title">
                        {stat.title}
                      </div>

                    </div>
                  );
                })}

              </div>

              {/* =========================================
                  DASHBOARD GRID
              ========================================= */}

              <div className="dashboard-grid">

                {/* =======================================
                    PROJECTS
                ======================================= */}

                <div className="dashboard-card projects-card">

                  <div className="card-header">

                    <div>

                      <span className="card-eyebrow">
                        WORK
                      </span>

                      <h3>
                        Recent Projects
                      </h3>

                    </div>

                    <button
                      type="button"
                      className="view-all"
                    >
                      View all
                      <ArrowUpRight size={15} />
                    </button>

                  </div>

                  <div className="projects-list">

                    {projects.map(
                      (project) => (
                        <div
                          className="project-row"
                          key={project.name}
                        >

                          <div className="project-symbol">
                            <FolderKanban size={19} />
                          </div>

                          <div className="project-details">

                            <strong>
                              {project.name}
                            </strong>

                            <span>
                              {project.type}
                            </span>

                            <small>
                              {project.tech}
                            </small>

                          </div>

                          <div className="project-status">

                            <span
                              className={
                                project.status ===
                                "Completed"
                                  ? "status-completed"
                                  : "status-progress"
                              }
                            >

                              {project.status ===
                              "Completed" ? (
                                <CheckCircle2
                                  size={13}
                                />
                              ) : (
                                <Clock3
                                  size={13}
                                />
                              )}

                              {project.status}

                            </span>

                          </div>

                          <button
                            type="button"
                            className="more-button"
                          >
                            <MoreHorizontal
                              size={18}
                            />
                          </button>

                        </div>
                      )
                    )}

                  </div>

                </div>

                {/* =======================================
                    ACTIVITY
                ======================================= */}

                <div className="dashboard-card activity-card">

                  <div className="card-header">

                    <div>

                      <span className="card-eyebrow">
                        TIMELINE
                      </span>

                      <h3>
                        Recent Activity
                      </h3>

                    </div>

                    <button
                      type="button"
                      className="more-button"
                    >
                      <MoreHorizontal
                        size={18}
                      />
                    </button>

                  </div>

                  <div className="activity-list">

                    {activities.map(
                      (activity, index) => (
                        <div
                          className="activity-item"
                          key={index}
                        >

                          <div className="activity-line">

                            <div className="activity-dot">
                              <CheckCircle2
                                size={14}
                              />
                            </div>

                            {index !==
                              activities.length - 1 && (
                              <div className="timeline-line" />
                            )}

                          </div>

                          <div className="activity-content">

                            <strong>
                              {activity.title}
                            </strong>

                            <span>
                              {activity.description}
                            </span>

                            <small>
                              {activity.time}
                            </small>

                          </div>

                        </div>
                      )
                    )}

                  </div>

                </div>

              </div>

              {/* =========================================
                  QUICK ACCESS
              ========================================= */}

              <div className="quick-section">

                <div className="section-heading">

                  <div>

                    <span className="card-eyebrow">
                      QUICK ACCESS
                    </span>

                    <h3>
                      Portfolio Management
                    </h3>

                  </div>

                </div>

                <div className="quick-grid">

                  {menuItems
                    .filter(
                      (item) =>
                        item.id !== "home"
                    )
                    .map((item) => {

                      const Icon = item.icon;

                      return (
                        <button
                          type="button"
                          className="quick-card"
                          key={item.id}
                          onClick={() =>
                            handleMenuClick(
                              item.id
                            )
                          }
                        >

                          <div className="quick-icon">
                            <Icon size={19} />
                          </div>

                          <div>

                            <strong>
                              {item.label}
                            </strong>

                            <span>
                              Manage section
                            </span>

                          </div>

                          <ArrowUpRight
                            size={16}
                            className="quick-arrow"
                          />

                        </button>
                      );
                    })}

                </div>

              </div>

            </>

          )}

        </section>

      </main>

    </div>
  );
}

export default PortfolioDashboard;