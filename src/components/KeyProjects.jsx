
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import "../css/KeyProjects.css";

import waslhub from "../assets/waslhub.png";
import blueLpg from "../assets/blueLpg.png";
import qbs from "../assets/qbs.png";
import neu from "../assets/neu.png";
import vibe from "../assets/vibe.png";
import rebootz from "../assets/rebootz.png";
import blues from "../assets/blues.png";
import noq from "../assets/noq.png";
import myusta from "../assets/myusta.png";
import fitflex from "../assets/fitflex.png";

const ITEMS_PER_PAGE = 6;

const projects = [
  {
    id: 1,
    title: "WaslHub.ai",
    type: "AI-Powered Platform",
    description:
      "Payments and invoicing platform to create and send invoices, collect online payments and track every transaction with real-time status and reports.",
    category: "AI & Automation",
    color: "purple",
    features: ["AI Integration", "Modern UI", "Scalable Architecture"],
    link: "https://waslhub.ai",
    icon: "🤖",
    image: waslhub,
  },
  {
    id: 2,
    title: "Blue LPG",
    type: "Business Platform",
    description:
      "LPG management portal to handle customers, orders, cylinder stock and deliveries, with role-based access and dashboards for daily operations.",
    category: "Web Platforms",
    color: "blue",
    features: ["Responsive Design", "Business Solutions", "Performance"],
    link: "https://psopk.com/en/fuels/blue-lpg",
    icon: "🔥",
    image: blueLpg,
  },
  {
    id: 3,
    title: "QBS.CO Website",
    type: "Corporate Website",
    description:
      "Corporate website showcasing QBS.CO's services, solutions and portfolio with a modern, fast, fully responsive and SEO-friendly design.",
    category: "Web Platforms",
    color: "orange",
    features: ["Corporate UI", "Responsive Layout", "SEO-Friendly"],
    link: "https://qbsco.net/",
    icon: "🌐",
    image: qbs,
  },
  {
    id: 4,
    title: "NeuConnectZ",
    type: "Digital Platform",
    description:
      "Warehouse and inventory management application to track stock across locations, manage inbound and outbound movements and report in real time.",
    category: "Web Platforms",
    color: "cyan",
    features: ["Modern Frontend", "API Integration", "Responsive UI"],
    link: "http://163.61.91.152:32179/login",
    icon: "🔗",
    image: neu,
  },
  {
    id: 5,
    title: "Vibe Ecommerce Admin",
    type: "E-commerce Dashboard",
    description:
      "Admin portal for the Vibe e-commerce platform to manage products, orders, customers and inventory, with sales insights from one dashboard.",
    category: "Enterprise",
    color: "indigo",
    features: ["Admin Dashboard", "Data Management", "Analytics"],
    link: "https://vibe.qbscocloud.net/",
    icon: "📊",
    image: vibe,
  },
  {
    id: 6,
    title: "Rebootz.ai",
    type: "AI-Powered Application",
    description:
      "Smart maintenance application to schedule and track maintenance work, manage assets and monitor project status from a live dashboard.",
    category: "AI & Automation",
    color: "purple",
    features: ["AI Features", "Automation", "Modern Architecture"],
    link: "http://163.61.91.55:31401/sign-in?redirectURL=%2Fdashboards%2Fproject",
    icon: "🧠",
    image: rebootz,
  },
  {
    id: 7,
    title: "Connect QBS",
    type: "Enterprise Application",
    description:
      "Mobile attendance application for employees to check in and out daily and view attendance history and reports, with a custom-built inline calendar.",
    category: "Mobile Apps",
    color: "green",
    features: ["Enterprise UI", "State Management", "Data Visualization"],
    link: "https://play.google.com/store/apps/details?id=com.connectqbsapp&hl=en_US",
    icon: "🏢",
    image: null,
  },
  {
    id: 8,
    title: "Pak Gas",
    type: "Business Application",
    description:
      "Customer mobile application to place and track LPG orders, manage delivery details and stay updated through a simple, easy-to-use interface.",
    category: "Mobile Apps",
    color: "blue",
    features: ["Order Management", "Delivery Updates", "Mobile UX"],
    link: "https://play.google.com/store/apps/details?id=com.pso_customer_app&hl=en",
    icon: "⚡",
    image: null,
  },
  {
    id: 9,
    title: "Shaker Care",
    type: "Customer Care Application",
    description:
      "Customer care mobile application to request services, track their status and stay connected with the support team through a clean interface.",
    category: "Mobile Apps",
    color: "green",
    features: ["User Experience", "Responsive Design", "Service Interface"],
    link: "https://play.google.com/store/apps/details?id=com.shaker_app&hl=en&pli=1",
    icon: "💚",
    image: null,
  },
  {
    id: 10,
    title: "Vibe Ecommerce App",
    type: "E-commerce Application",
    description:
      "E-commerce mobile application to browse products, manage the cart and place orders, with a smooth, fast and user-friendly shopping experience.",
    category: "Mobile Apps",
    color: "pink",
    features: ["Shopping Experience", "Product UI", "Mobile-Friendly"],
    link: "https://play.google.com/store/apps/details?id=com.vibe_app&hl=en",
    icon: "🛍️",
    image: null,
  },
  {
    id: 11,
    title: "Lockkeyz",
    type: "Digital Security Application",
    description:
      "Security and access mobile application to manage locks and keys, control user access and permissions and monitor access activity securely.",
    category: "Mobile Apps",
    color: "orange",
    features: ["Access Management", "Security Controls", "Mobile UX"],
    link: "https://play.google.com/store/apps/details?id=com.qbs.lockkeyz",
    icon: "🔐",
    image: null,
  },
  {
    id: 12,
    title: "Blue Admin Portal",
    type: "Enterprise Admin Dashboard",
    description:
      "A centralized administration portal designed to streamline business operations, manage critical workflows, and provide an intuitive interface for efficient day-to-day management and operational oversight.",
    category: "Web Platforms",
    color: "blue",
    features: [
      "Centralized Management",
      "Operational Workflows",
      "Admin Dashboard",
    ],
    link: "http://163.61.91.86:3000/authentication/login",
    icon: "🖥️",
    image: blues,
  },
  {
    id: 13,
    title: "Noq Website",
    type: "Corporate Website",
    description:
      "A modern corporate website built to establish a strong digital presence, showcase the brand's offerings, and deliver a seamless browsing experience through an intuitive interface, responsive layouts, and performance-focused design.",
    category: "Web Platforms",
    color: "blue",
    features: [
      "Brand Identity",
      "Responsive Design",
      "Modern User Experience",
    ],
    link: "https://noqhub.com/",
    icon: "🌐",
    image: noq,
  },
  {
    id: 14,
    title: "My Usta",
    type: "Home Services Platform",
    description:
      "A convenient home services platform connecting customers with skilled professionals for everyday household needs. Designed to simplify service discovery, streamline booking requests, and deliver a seamless experience through an intuitive interface and responsive design.",
    category: "Web Platforms",
    color: "blue",
    features: [
      "Home Service Booking",
      "Professional Services",
      "Responsive Experience",
    ],
    link: "https://app.myusta.al/",
    icon: "🏠",
    image: myusta,
  },
  {
    id: 15,
    title: "FitFlex",
    type: "Fitness & Wellness Platform",
    description:
      "A modern fitness platform designed to help users pursue their health and wellness goals through an engaging digital experience. Built around accessible fitness content, intuitive navigation, and responsive design to support a more convenient and personalized fitness journey.",
    category: "Web Platforms",
    color: "blue",
    features: [
      "Fitness & Wellness",
      "Workout Experience",
      "Responsive Design",
    ],
    link: "https://fitflex.com.pk/",
    icon: "💪",
    image: fitflex,
  },
];

const categories = [
  "All Projects",
  "Web Platforms",
  "Enterprise",
  "Mobile Apps",
  "AI & Automation",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: 12,
    transition: {
      duration: 0.2,
    },
  },
};

function ProjectImage({ project, onImageClick }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="kp-card-image">
      <button
        type="button"
        className="kp-image-preview-trigger"
        onClick={() => onImageClick(project)}
        aria-label={`Preview ${project.title} image`}
      >
        {project.image && !imageError ? (
          <img
            src={project.image}
            alt={`${project.title} project preview`}
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            className={`kp-project-image-fallback kp-icon-${project.color}`}
          >
            <span aria-hidden="true">{project.icon}</span>
            <span className="kp-fallback-title">
              {project.title}
            </span>
          </div>
        )}
        <span className="kp-image-zoom-hint" aria-hidden="true">
          <ZoomIn size={19} />
          <span>View preview</span>
        </span>
      </button>

      <span className="kp-project-number">
        {String(project.id).padStart(2, "0")}
      </span>

      <span className="kp-image-category">
        {project.category}
      </span>
    </div>
  );
}

export default function KeyProjects() {
  const [activeCategory, setActiveCategory] =
    useState("All Projects");

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (!selectedProject) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedProject(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All Projects") {
      return projects;
    }

    return projects.filter(
      (project) => project.category === activeCategory
    );
  }, [activeCategory]);

  const totalPages = Math.ceil(
    filteredProjects.length / ITEMS_PER_PAGE
  );

  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredProjects.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredProjects, currentPage]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setActiveCategory("All Projects");
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    const nextPage = Math.max(
      1,
      Math.min(page, totalPages)
    );

    setCurrentPage(nextPage);

    document.getElementById("projects")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const projectStats = [
    {
      value: "15",
      label: "Featured Projects",
      icon: "◈",
    },
    {
      value: "05",
      label: "Project Categories",
      icon: "▦",
    },
    {
      value: "Full Stack",
      label: "Development Focus",
      icon: "⌘",
    },
  ];

  useEffect(() => {
    setCurrentPage((page) =>
      Math.min(page, Math.max(1, totalPages))
    );
  }, [totalPages]);

  return (
    <section className="kp-section" id="projects">
      <div className="container">
        {/* Section Heading */}
        <motion.div
          className="kp-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <span className="kp-eyebrow">
            <span className="kp-eyebrow-dot" />
            SELECTED WORK
          </span>

          <h2>
            Key Projects
            <span className="kp-heading-accent">.</span>
          </h2>

          <p className="kp-heading-description">
            A selection of digital products, enterprise platforms,
            and intelligent solutions built with modern technologies
            and a focus on performance, usability, and scalability.
          </p>
        </motion.div>

        {/* Project Overview */}
        <motion.div
          className="kp-overview"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          {projectStats.map((stat, index) => (
            <div className="kp-overview-item" key={stat.label}>
              <div className="kp-overview-icon">
                {stat.icon}
              </div>

              <div className="kp-overview-content">
                <span className="kp-overview-value">
                  {stat.value}
                </span>

                <span className="kp-overview-label">
                  {stat.label}
                </span>
              </div>

              {index !== projectStats.length - 1 && (
                <span
                  className="kp-overview-divider"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* Category Filters */}
        <div
          className="kp-filters"
          role="group"
          aria-label="Filter projects by category"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                className={`kp-filter ${
                  isActive ? "kp-filter-active" : ""
                }`}
                onClick={() => handleCategoryChange(category)}
                aria-pressed={isActive}
              >
                {category}

                {isActive && (
                  <motion.span
                    className="kp-filter-indicator"
                    layoutId="kp-filter-indicator"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Clear Filter */}
        <AnimatePresence initial={false}>
          {activeCategory !== "All Projects" && (
            <motion.div
              className="kp-clear-filter-wrapper"
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
            >
              <span className="kp-active-filter-label">
                Showing: <strong>{activeCategory}</strong>
              </span>

              <button
                type="button"
                className="kp-clear-filter"
                onClick={clearFilters}
                aria-label="Clear category filter and show all projects"
              >
                <span aria-hidden="true">✕</span>
                Clear Filter
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Grid */}
        <motion.div className="kp-grid" layout>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${currentPage}`}
              className="kp-grid-inner"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {paginatedProjects.length > 0 ? (
                paginatedProjects.map((project) => (
                  <motion.article
                    className="kp-card"
                    key={project.id}
                    variants={cardVariants}
                    layout
                    whileHover={{ y: -5 }}
                  >
                    <ProjectImage project={project} onImageClick={setSelectedProject} />

                    <div className="kp-card-content">
                      <span className="kp-project-type">
                        {project.type}
                      </span>

                      <h3 className="kp-project-title">
                        {project.title}
                      </h3>

                      <p className="kp-description">
                        {project.description}
                      </p>

                      <div className="kp-features">
                        {project.features.map((feature) => (
                          <span
                            className="kp-feature"
                            key={feature}
                          >
                            <span className="kp-feature-dot" />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="kp-card-footer">
                      <span className="kp-project-category">
                        {project.category}
                      </span>

                      {project.link ? (
                        <a
                          className="kp-project-link"
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${project.title}`}
                        >
                          <span>View Project</span>
                          <span
                            className="kp-link-arrow"
                            aria-hidden="true"
                          >
                            ↗
                          </span>
                        </a>
                      ) : (
                        <span className="kp-private-label">
                          <span className="kp-private-dot" />
                          Private Project
                        </span>
                      )}
                    </div>
                  </motion.article>
                ))
              ) : (
                <motion.div
                  className="kp-empty-state"
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <span className="kp-empty-icon">◇</span>
                  <h3>No projects found</h3>
                  <p>Try selecting another category.</p>

                  <button
                    type="button"
                    className="kp-reset-button"
                    onClick={clearFilters}
                  >
                    View all projects
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.nav
            className="kp-pagination"
            aria-label="Project pagination"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              type="button"
              className="kp-page-button kp-page-prev"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <span aria-hidden="true">←</span>
              <span>Previous</span>
            </button>

            <div className="kp-page-numbers">
              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  type="button"
                  key={page}
                  className={`kp-page-number ${
                    currentPage === page
                      ? "kp-page-active"
                      : ""
                  }`}
                  onClick={() => goToPage(page)}
                  aria-label={`Page ${page}`}
                  aria-current={
                    currentPage === page ? "page" : undefined
                  }
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="kp-page-button kp-page-next"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <span>Next</span>
              <span aria-hidden="true">→</span>
            </button>
          </motion.nav>
        )}

        {/* Results Information */}
        <p className="kp-results-info" aria-live="polite">
          Showing{" "}
          {filteredProjects.length === 0
            ? 0
            : (currentPage - 1) * ITEMS_PER_PAGE + 1}
          {"–"}
          {Math.min(
            currentPage * ITEMS_PER_PAGE,
            filteredProjects.length
          )}{" "}
          of {filteredProjects.length} projects
        </p>

        {/* Bottom CTA */}
        <motion.div
          className="kp-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <div className="kp-cta-icon" aria-hidden="true">
            <span>✳</span>
          </div>

          <div className="kp-cta-content">
            <span className="kp-cta-eyebrow">
              HAVE A PROJECT IN MIND?
            </span>

            <h3>Let&apos;s build something impactful.</h3>

            <p>
              Have an idea or a challenging problem to solve?
              Let&apos;s discuss how technology can bring it to life.
            </p>
          </div>

          <a className="kp-cta-button" href="#contact">
            Let&apos;s Connect
            <span aria-hidden="true">↗</span>
          </a>
        </motion.div>
      </div>

      {/* Project image preview modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="kp-image-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProject.title} image preview`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="kp-image-modal"
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.22 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="kp-image-modal-header">
                <div>
                  <span className="kp-image-modal-category">
                    {selectedProject.category}
                  </span>
                  <h3>{selectedProject.title}</h3>
                </div>
                <button
                  type="button"
                  className="kp-image-modal-close"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close image preview"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="kp-image-modal-stage">
                {selectedProject.image ? (
                  <img
                    src={selectedProject.image}
                    alt={`${selectedProject.title} enlarged project preview`}
                  />
                ) : (
                  <div className={`kp-project-image-fallback kp-icon-${selectedProject.color}`}>
                    <span aria-hidden="true">{selectedProject.icon}</span>
                    <span className="kp-fallback-title">
                      {selectedProject.title}
                    </span>
                  </div>
                )}
              </div>
              <p className="kp-image-modal-description">
                {selectedProject.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
