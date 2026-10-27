
import { motion } from "framer-motion";
// import "../css/Experience.css"



const experience = [
  {
    year: "2023 — 2026",
    title: "Senior MERN Stack Developer",
    company: "QBS.CO",
    description:
      "Delivered scalable enterprise and SaaS solutions, reducing API response times by 90%, improving application speed by 80%, and cutting production bugs by 95%.",
    icon: "fas fa-code",
    skills: ["React", "Node.js", "Express.js", "MongoDB"],
  },
  {
    year: "2020 — 2022",
    title: "Associate MERN Stack Developer",
    company: "Bitwits",
    description:
      "Built enterprise dashboards and responsive applications with secure role-based access, reusable components, and intuitive user experiences.",
    icon: "fas fa-laptop-code",
    skills: ["React", "JavaScript", "REST APIs", "Responsive UI"],
  },
  {
    year: "2018 — 2019",
    title: "Junior MERN Stack Developer",
    company: "Viznode",
    description:
      "Developed responsive full-stack applications, integrated backend services, resolved critical bugs, and delivered reliable features on schedule.",
    icon: "fas fa-layer-group",
    skills: ["Full Stack", "JavaScript", "Backend Integration", "Agile"],
  },
  {
    year: "2016 — 2017",
    title: "MERN Stack Developer",
    company: "Panacloud",
    description:
      "Built end-to-end web features, developed responsive interfaces, integrated APIs, and delivered quality software aligned with project deadlines.",
    icon: "fas fa-laptop-code",
    skills: ["Web Development", "JavaScript", "APIs", "Responsive UI"],
  },
];



const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="container">
        {/* Section Heading */}
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span>03</span>
          <h2>Experience</h2>
          <p>My professional journey</p>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          className="experience-timeline"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.1,
          }}
        >
          {experience.map((item, index) => (
            <motion.div
              className={`experience-item ${
                index % 2 === 0
                  ? "experience-left"
                  : "experience-right"
              }`}
              key={`${item.company}-${item.year}`}
              variants={itemVariants}
            >
              {/* Timeline Dot */}
              <motion.div
                className="experience-dot"
                whileHover={{ scale: 1.25 }}
              >
                <span />
              </motion.div>

              {/* Decorative Number */}
              <div className="experience-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Experience Card */}
              <motion.div
                className="experience-card"
                whileHover={{ y: -7 }}
                transition={{ duration: 0.25 }}
              >
                {/* Card Header */}
                <div className="experience-header">
                  <div className="experience-date">
                    <i className="far fa-calendar-alt" />
                    <span>{item.year}</span>
                  </div>
                </div>

                {/* Icon and Title */}
                <div className="experience-title-row">
                  <motion.div
                    className="experience-icon"
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                    }}
                  >
                    <i className={item.icon} />
                  </motion.div>

                  <div>
                    <h3>{item.title}</h3>

                    <h4>
                      <i className="fas fa-building" />
                      {" "}{item.company}
                    </h4>
                  </div>
                </div>

                {/* Description */}
                <p className="experience-description">
                  {item.description}
                </p>

                {/* Skills */}
                <div className="experience-skills">
                  {item.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Experience Footer */}
        <motion.div
          className="experience-footer"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.3,
          }}
        >
          <i className="fas fa-rocket" />
          <span>
            Building, learning and growing with every project.
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export default Experience;
