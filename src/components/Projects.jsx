
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import Patient from "../assets/patient.png";
import Expense from "../assets/expense.png";
import Masjid from "../assets/masjid.png";
import Inventory from "../assets/inventory.png";
import Water from "../assets/water.jpeg";
import Rfid from "../assets/rfid.jpeg";
import Back from "../assets/Back.jpg";
import Bus from "../assets/Bus.png";
import Train from "../assets/train.png";
import Flight from "../assets/flight.png";
import Medical from "../assets/Medical.png";
import Lucky from "../assets/Lucky.jpeg";
import Visa from "../assets/visa.jpeg";
import POS from "../assets/POS.jpeg";
import ERP from "../assets/erp.jpeg";
import Account from "../assets/account.jpeg";
import Banking from "../assets/Banking.jpeg";
import Qibla from "../assets/qibla.jpeg";
import Blood from "../assets/blood.jpeg";
import Pandemic from "../assets/Pandemic.jpeg";

import "../css/Projects.css";

const PROJECTS_PER_PAGE = 3;

const projects = [
  {
    title: "Patient Tracker Application",
    category: "web",
    type: "Full Stack",
    image: Patient,
    description:
      "An intelligent patient tracking platform designed to organize patient information, support secure authentication, manage conversations, and deliver a streamlined healthcare workflow through a scalable full-stack architecture.",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Python",
      "Flask",
      "LLM",
    ],
    liveUrl: "https://patienttrackerfrontend.vercel.app/",
    githubUrl:
      "https://github.com/CryptonFuture/patient_tracker_app",
  },
  {
    title: "Masjid NearBy Application",
    category: "web",
    type: "Full Stack",
    image: Masjid,
    description:
      "A location-focused application designed to help users discover nearby mosques through an accessible interface, making mosque discovery more convenient with a responsive frontend and full-stack integration.",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Python",
      "Flask",
      "LLM",
    ],
    liveUrl: "https://masjidnearbyfrontend.vercel.app/",
    githubUrl:
      "https://github.com/CryptonFuture/masjid_nearby_app",
  },
  {
    title: "Expense Tracker Application",
    category: "web",
    type: "Full Stack",
    image: Expense,
    description:
      "A personal finance management application designed to record income and expenses, organize financial transactions, and present spending information through an intuitive dashboard and data-driven interface.",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Python",
      "Flask",
      "LLM",
    ],
    liveUrl:
      "https://expensetrackerfrontend-nine.vercel.app/",
    githubUrl:
      "https://github.com/yourusername/expense-tracker",
  },
  {
    title: "Inventory Management System",
    category: "web",
    type: "Full Stack",
    image: Inventory,
    description:
      "A full-stack inventory management solution for organizing products, monitoring stock levels, and streamlining inventory workflows through a centralized interface and database-driven backend.",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Python",
      "FastAPI",
      "LLM",
    ],
    liveUrl: "https://invfrontend.vercel.app/",
    githubUrl:
      "https://github.com/CryptonFuture/inventory_management_system",
  },
  {
    title: "Water Planet Management System",
    category: "web",
    type: "Full Stack",
    image: Water,
    description:
      "A water business management platform designed to organize customer information, manage operational records, and simplify day-to-day workflows through an accessible interface and integrated backend services.",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Python",
      "FastAPI",
      "LLM",
    ],
    liveUrl: "https://waterfrontend-three.vercel.app/",
    githubUrl:
      "https://github.com/CryptonFuture/water_planet_management_system",
  },
  {
    title: "RFID Management System",
    category: "web",
    type: "Full Stack",
    image: Rfid,
    description:
      "An RFID management platform designed to support tag-related workflows, organize inventory information, and simplify tracking operations through a centralized application and scalable backend architecture.",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Python",
      "FastAPI",
      "LLM",
    ],
    liveUrl: "https://rfidfrontend-two.vercel.app/",
    githubUrl:
      "https://github.com/CryptonFuture/rfid_management_system",
  },
  {
    title: "Bus Ticketing System",
    category: "web",
    type: "Full Stack",
    image: Bus,
    description:
      "A full-stack bus ticketing platform designed to manage routes, schedules, passenger bookings, seat reservations, and ticketing workflows through a convenient booking interface and integrated backend.",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Python",
      "FastAPI",
      "LLM",
    ],
    liveUrl: "https://busticketfrontend.vercel.app/",
    githubUrl: "https://github.com/CryptonFuture/Bus-Ticket",
  },
  {
    title: "Train Ticketing System",
    category: "web",
    type: "Full Stack",
    image: Train,
    description:
      "A railway ticketing application designed to streamline train journey searches, schedule discovery, passenger reservations, and booking workflows through a responsive user interface and full-stack architecture.",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Python",
      "FastAPI",
      "LLM",
    ],
    liveUrl: "https://trainticketfrontend.vercel.app/",
    githubUrl:
      "https://github.com/CryptonFuture/train_ticketing_app",
  },
  {
    title: "Flight Ticketing System",
    category: "web",
    type: "Full Stack",
    image: Flight,
    description:
      "A flight booking platform designed to simplify travel reservations, organize flight information, and support passenger booking workflows through a responsive interface and integrated application backend.",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Python",
      "FastAPI",
      "LLM",
    ],
    liveUrl: "https://flightticketfrontend.vercel.app/",
    githubUrl:
      "https://github.com/CryptonFuture/flight_ticket_app",
  },
  {
    title: "AI Homeopathic Inventory System",
    category: "web",
    type: "Full Stack",
    image: Medical,
    description:
      "A medicine inventory application designed to organize homeopathic products, simplify stock management, and present medicine availability through a clear interface with backend-powered data handling.",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Python",
      "FastAPI",
      "LLM",
    ],
    liveUrl:
      "https://ai-homeopathic-inventory-frontend.vercel.app/",
    githubUrl: "#",
  },
  {
    title: "Lucky Draw Application",
    category: "web",
    type: "Full Stack",
    image: Lucky,
    description:
      "An interactive lucky draw application designed to organize participant information and simplify draw-related workflows through an engaging user interface and full-stack application architecture.",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Python",
      "FastAPI",
      "LLM",
    ],
    liveUrl: "https://luckyfrontend.vercel.app/",
    githubUrl:
      "https://github.com/CryptonFuture/lucky_draw_backend",
  },
  {
    title: "Visa Management System",
    category: "web",
    type: "Full Stack",
    image: Visa,
    description:
      "A visa management application designed to organize applicant information, centralize application records, and simplify administrative workflows through a structured interface and database-backed services.",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Python",
      "FastAPI",
      "LLM",
    ],
    liveUrl: "https://visafrontend-three.vercel.app/",
    githubUrl:
      "https://github.com/CryptonFuture/visa_management_system",
  },
  {
    title: "POS Management System",
    category: "web",
    type: "Full Stack",
    image: POS,
    description:
      "A point-of-sale management solution designed to organize sales transactions, product records, and business operations through a centralized interface built for efficient day-to-day workflows.",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Python",
      "FastAPI",
      "LLM",
    ],
    liveUrl: "https://posfrontend-dun.vercel.app/",
    githubUrl:
      "https://github.com/CryptonFuture/pos_management_system",
  },
  {
    title: "ERP Management System",
    category: "web",
    type: "Full Stack",
    image: ERP,
    description:
      "An enterprise resource planning application designed to centralize business information, organize operational workflows, and provide a unified interface for managing day-to-day business processes.",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Python",
      "FastAPI",
      "LLM",
    ],
    liveUrl: "https://erpfrontend-two.vercel.app/",
    githubUrl:
      "https://github.com/CryptonFuture/erp_management_system",
  },
  {
    title: "Accounting Application",
    category: "web",
    type: "Full Stack",
    image: Account,
    description:
      "An accounting application designed to organize financial records, manage transaction data, and simplify routine accounting workflows through a structured interface and database-backed application.",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Python",
      "FastAPI",
      "LLM",
    ],
    liveUrl: "https://accountfrontend.vercel.app/",
    githubUrl:
      "https://github.com/CryptonFuture/accounting_app",
  },
  {
    title: "Banking Application",
    category: "web",
    type: "Full Stack",
    image: Banking,
    description:
      "A banking application concept focused on organizing account information, presenting financial records, and supporting common banking-related workflows through a structured interface and backend services.",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Python",
      "FastAPI",
      "LLM",
    ],
    liveUrl: "https://bankingfrontend-pied.vercel.app/",
    githubUrl:
      "https://github.com/CryptonFuture/banking_app",
  },
  {
    title: "Qibla Application",
    category: "web",
    type: "Full Stack",
    image: Qibla,
    description:
      "A digital Qibla application designed to provide users with an accessible interface for Qibla-related guidance, with a focus on usability and a responsive experience across devices.",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Python",
      "FastAPI",
      "LLM",
    ],
    liveUrl: "https://qiblafrontend.vercel.app/",
    githubUrl: "https://github.com/CryptonFuture/qibla_app",
  },
  {
    title: "Blood Bank Application",
    category: "web",
    type: "Full Stack",
    image: Blood,
    description:
      "A blood bank management platform designed to organize donor and blood inventory information, centralize records, and support streamlined blood bank administration through a user-friendly interface.",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Python",
      "FastAPI",
      "LLM",
    ],
    liveUrl: "https://bloodfrontend-six.vercel.app/",
    githubUrl:
      "https://github.com/CryptonFuture/blood_bank_management_system",
  },
  {
    title: "Pandemic Tracker Application",
    category: "web",
    type: "Full Stack",
    image: Pandemic,
    description:
      "A pandemic tracking application designed to present public health-related information in an organized format, helping users explore reported data through a clear interface and structured application workflows.",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Python",
      "FastAPI",
      "LLM",
    ],
    liveUrl: "https://pandemicfrontend.vercel.app/",
    githubUrl:
      "https://github.com/CryptonFuture/Pandemic_Tracker",
  },
  {
    title: "Backend Development",
    category: "backend",
    type: "Backend & DevOps",
    image: Back,
    description:
      "Backend engineering focused on API development, server-side architecture, database integration, and maintainable application services using modern Node.js frameworks, SQL and NoSQL databases, and data-access tools.",
    tech: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "MSSQL",
      "NestJS",
      "Prisma",
      "Sequelize",
      "AdonisJS",
      "Knex",
    ],
  },
];

const filters = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Development" },
  { id: "backend", label: "Backend & DevOps" },
];

function Projects() {
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  const totalPages = Math.ceil(
    filtered.length / PROJECTS_PER_PAGE
  );

  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const endIndex = startIndex + PROJECTS_PER_PAGE;

  const paginatedProjects = filtered.slice(
    startIndex,
    endIndex
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  // Close the image preview with Escape and prevent background scrolling.
  useEffect(() => {
    if (!selectedProject) return;

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

  const handleFilterChange = (filterId) => {
    setFilter(filterId);
    setCurrentPage(1);
  };

  const clearFilter = () => {
    setFilter("all");
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    const safePage = Math.max(
      1,
      Math.min(page, totalPages)
    );

    setCurrentPage(safePage);

    document.getElementById("projects")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  return (
    <section id="projects" className="section projects">
      <div className="container">
        {/* Background decoration */}
        <div className="projects-bg-orb projects-bg-orb-1" />
        <div className="projects-bg-orb projects-bg-orb-2" />

        {/* Section Heading */}
        <motion.div
          className="section-heading projects-heading"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="heading-number">
            <Sparkles size={15} />
            <span>05</span>
          </div>

          <h2>
            My <span>Projects</span>
          </h2>

          <p>
            A selection of full-stack applications and digital
            solutions built with modern technologies.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="project-filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          role="group"
          aria-label="Filter projects by category"
        >
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              className={filter === item.id ? "active" : ""}
              onClick={() => handleFilterChange(item.id)}
              aria-pressed={filter === item.id}
            >
              {item.label}

              {filter === item.id && (
                <motion.span
                  layoutId="activeFilter"
                  className="filter-active-bg"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Clear Filter */}
        <AnimatePresence initial={false}>
          {filter !== "all" && (
            <motion.div
              className="projects-clear-filter"
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
            >
              <p>
                Showing:{" "}
                <strong>
                  {filters.find((item) => item.id === filter)?.label}
                </strong>
              </p>

              <button
                type="button"
                onClick={clearFilter}
                aria-label="Clear filter and show all projects"
              >
                <X size={15} />
                <span>Clear Filter</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Grid */}
        <motion.div layout className="projects-grid">
          <AnimatePresence mode="popLayout">
            {paginatedProjects.map((project, index) => (
              <motion.article
                layout
                key={project.title}
                className="project-card"
                initial={{
                  opacity: 0,
                  y: 40,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: 25,
                  scale: 0.94,
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                }}
                whileHover={{ y: -8 }}
              >
                {/* Project Image */}
                <div className="project-image">
                  <div className="project-image-grid" />
                  <div className="project-image-glow" />

                  <span className="project-number">
                    {String(startIndex + index + 1).padStart(2, "0")}
                  </span>

                  <motion.button
                    type="button"
                    className="project-image-inner project-image-preview-button"
                    onClick={() => setSelectedProject(project)}
                    aria-label={`Enlarge ${project.title} thumbnail`}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      loading="lazy"
                    />
                    <span className="project-preview-hint">
                      <Sparkles size={14} />
                      Click to preview
                    </span>
                  </motion.button>

                  {/* Project Actions */}
                  <div className="project-actions">
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-action"
                        aria-label={`View ${project.title} live`}
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={18} />
                      </motion.a>
                    )}

                    {project.githubUrl && project.githubUrl !== "#" && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-action"
                        aria-label={`${project.title} GitHub repository`}
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <i className="fab fa-github" />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className="project-content">
                  <div className="project-category">
                    <span />
                    {project.type}
                  </div>

                  <h3>{project.title}</h3>

                  <p>{project.description}</p>

                  <div className="project-tech">
                    {project.tech.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>

                  <div className="project-card-footer">
                    <span>
                      {project.liveUrl ? "View Project" : "Backend Engineering"}
                    </span>
                    <ArrowRight size={17} />
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Click-to-enlarge project thumbnail modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="project-preview-overlay"
              role="presentation"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                  setSelectedProject(null);
                }
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="project-preview-modal"
                role="dialog"
                aria-modal="true"
                aria-label={`${selectedProject.title} image preview`}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.97 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <div className="project-preview-modal-header">
                  <div>
                    <span className="project-preview-eyebrow">
                      PROJECT THUMBNAIL
                    </span>
                    <h3>{selectedProject.title}</h3>
                  </div>
                  <button
                    type="button"
                    className="project-preview-close"
                    onClick={() => setSelectedProject(null)}
                    aria-label="Close image preview"
                  >
                    <X size={21} />
                  </button>
                </div>

                <div className="project-preview-image-wrap">
                  <img
                    src={selectedProject.image}
                    alt={`${selectedProject.title} enlarged project thumbnail`}
                  />
                </div>

                <div className="project-preview-modal-footer">
                  <span>{selectedProject.type}</span>
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-preview-open-link"
                    >
                      Open Project <ExternalLink size={15} />
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.nav
            className="projects-pagination"
            aria-label="Project pagination"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <button
              type="button"
              className="pagination-btn pagination-prev"
              onClick={previousPage}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
              <span>Previous</span>
            </button>

            <div className="pagination-numbers">
              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  type="button"
                  key={page}
                  className={currentPage === page ? "active" : ""}
                  onClick={() => goToPage(page)}
                  aria-label={`Page ${page}`}
                  aria-current={
                    currentPage === page ? "page" : undefined
                  }
                >
                  {String(page).padStart(2, "0")}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="pagination-btn pagination-next"
              onClick={nextPage}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <span>Next</span>
              <ChevronRight size={18} />
            </button>
          </motion.nav>
        )}

        {/* Pagination Information */}
        <p className="pagination-info" aria-live="polite">
          Showing{" "}
          <strong>{filtered.length === 0 ? 0 : startIndex + 1}</strong>
          {"–"}
          <strong>{Math.min(endIndex, filtered.length)}</strong>
          {" of "}
          <strong>{filtered.length}</strong> projects
        </p>

        {/* Bottom CTA */}
        <motion.div
          className="projects-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="projects-cta-icon">
            <i className="fab fa-github" />
          </div>

          <div className="projects-cta-text">
            <span>MORE PROJECTS</span>
            <p>Want to explore more of my work?</p>
          </div>

          <a
            href="https://github.com/CryptonFuture"
            target="_blank"
            rel="noopener noreferrer"
            className="github-btn"
          >
            <i className="fab fa-github" />
            <span>View My GitHub</span>
            <ArrowRight size={17} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;
