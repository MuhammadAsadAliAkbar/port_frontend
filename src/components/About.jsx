import { motion } from "framer-motion";
import Asad from "../assets/Asa.png";
import "../css/About.css"

function About() {
  return (
    <section id="about" className="section about">
      <div className="container">

        {/* Section Heading */}
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span>01</span>
          <h2>About Me</h2>
          <p>Get to know me</p>
        </motion.div>

        <div className="about-grid">

          {/* ================= IMAGE SIDE ================= */}
          <motion.div
            className="about-image"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="about-visual">

              <div className="about-glow" />

              <div className="about-ring ring-one" />
              <div className="about-ring ring-two" />

              {/* Profile */}
              <div className="about-profile-image">
                <img
                  src={Asad}
                  alt="Muhammad Asad Ali Akbar"
                />
              </div>

              {/* React */}
              <motion.div
                className="floating-card card-react"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <i className="fab fa-react" />
                <span>React</span>
              </motion.div>

              {/* Node */}
              <motion.div
                className="floating-card card-node"
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <i className="fab fa-node-js" />
                <span>Node.js</span>
              </motion.div>

              {/* Mongo */}
              <motion.div
                className="floating-card card-mongo"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <i className="fas fa-database" />
                <span>MongoDB</span>
              </motion.div>

            </div>
          </motion.div>

          {/* ================= CONTENT SIDE ================= */}
          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >

            <span className="small-title">
              <span className="title-line" />
              WHO I AM
            </span>

            <h3>
              I turn ideas into
              <span> digital experiences.</span>
            </h3>

            <p className="about-description">
              I’m a Senior Full Stack Developer with 7+ years of experience building scalable web applications, enterprise solutions, and high-performance software. Passionate about transforming complex ideas into secure, reliable, and production-ready digital experiences that drive business growth and deliver real value.
            </p>


            {/* Info Cards */}
            <div className="about-info">

              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-user" />
                </div>

                <div>
                  <strong>Name</strong>
                  <span>Muhammad Asad Ali Akbar</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-code" />
                </div>

                <div>
                  <strong>Role</strong>
                  <span>Senior Full Stack Developer</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-layer-group" />
                </div>

                <div>
                  <strong>Stack</strong>
                  <span>MERN / MEAN Stack</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-circle-check" />
                </div>

                <div>
                  <strong>Availability</strong>
                  <span className="available">
                    Open to opportunities
                  </span>
                </div>
              </div>

            </div>

            {/* Stats */}
            <div className="about-stats">

              <div>
                <strong>7+</strong>
                <span>Years Experience</span>
              </div>

              <div>
                <strong>50+</strong>
                <span>Projects Completed</span>
              </div>

              <div>
                <strong>10+</strong>
                <span>Technologies</span>
              </div>

            </div>

            {/* Resume */}
            <div className="about-actions">
              <a
                href="/Muhammad_Asad_Mern.pdf"
                className="resume-btn"
              >
                <i className="fas fa-download" />
                <span>Download Resume</span>
                <i className="fas fa-arrow-right arrow-icon" />
              </a>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;