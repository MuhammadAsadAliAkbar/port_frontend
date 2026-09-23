import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Check,
  CheckCheck,
  MessageSquare,
  UserRound,
  Image as ImageIcon,
  FileText,
  Sparkles,
} from "lucide-react";

import "../css/AdminMessageChat.css";

/* =========================================================
   DEMO USER
========================================================= */

const user = {
  id: 1,
  name: "Muhammad Asad",
  email: "asad@example.com",
  avatar: "MA",
  status: "online",
};

/* =========================================================
   DEMO MESSAGES
========================================================= */

const initialMessages = [
  {
    id: 1,
    sender: "user",
    text: "Hi Admin, I wanted to ask about the project.",
    time: "10:31 AM",
    read: true,
  },
  {
    id: 2,
    sender: "admin",
    text: "Sure. What would you like to know?",
    time: "10:33 AM",
    read: true,
  },
  {
    id: 3,
    sender: "user",
    text: "Is the latest version ready for review?",
    time: "10:38 AM",
    read: true,
  },
  {
    id: 4,
    sender: "admin",
    text: "Yes, I have completed the latest changes.",
    time: "10:40 AM",
    read: true,
  },
  {
    id: 5,
    sender: "user",
    text: "Perfect. I will check the project.",
    time: "10:42 AM",
    read: false,
  },
];

/* =========================================================
   COMPONENT
========================================================= */

function AdminMessageChat() {
  const [messages, setMessages] = useState(
    initialMessages
  );

  const [message, setMessage] = useState("");

  const [showProfile, setShowProfile] =
    useState(false);

  /* =======================================================
     SEND MESSAGE
  ======================================================= */

  const handleSendMessage = () => {
    const text = message.trim();

    if (!text) return;

    const newMessage = {
      id: Date.now(),
      sender: "admin",
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      read: true,
    };

    setMessages((prev) => [
      ...prev,
      newMessage,
    ]);

    setMessage("");
  };

  /* =======================================================
     ENTER TO SEND
  ======================================================= */

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      handleSendMessage();
    }
  };

  /* =======================================================
     UNREAD
  ======================================================= */

  const unreadMessages = messages.filter(
    (item) =>
      item.sender === "user" &&
      !item.read
  ).length;

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section className="admin-message-page">

      {/* ===================================================
          TOP HEADER
      =================================================== */}

      <motion.div
        className="admin-chat-topbar"
        initial={{
          opacity: 0,
          y: -12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
      >

        {/* LEFT */}

        <div className="admin-chat-heading">

          <div className="admin-chat-heading-icon">
            <MessageSquare size={20} />
          </div>

          <div>

            <div className="admin-heading-title-row">

              <h1>
                Admin Message Chat
              </h1>

              <span className="admin-premium-badge">

                <Sparkles size={10} />

                LIVE

              </span>

            </div>

            <p>
              Manage and respond to client conversations
            </p>

          </div>

        </div>

        {/* RIGHT */}

        <div className="admin-chat-top-actions">

          <div className="admin-online-summary">

            <span className="admin-live-dot" />

            <span>
              1 Online
            </span>

          </div>

          <div className="admin-message-total">

            <MessageSquare size={14} />

            <span>
              {unreadMessages}
            </span>

            <small>
              Unread
            </small>

          </div>

        </div>

      </motion.div>

      {/* ===================================================
          CHAT CONTAINER
      =================================================== */}

      <motion.div
        className="admin-chat-container"
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.45,
          delay: 0.05,
        }}
      >

        <main className="admin-chat-main">

          {/* =================================================
              CONVERSATION HEADER
          ================================================= */}

          <header className="admin-conversation-header">

            {/* USER INFO */}

            <div className="admin-chat-user-info">

              <div className="admin-header-avatar-wrapper">

                <div className="admin-header-avatar">
                  {user.avatar}
                </div>

                <span
                  className={`admin-status-dot ${user.status}`}
                />

              </div>

              <div className="admin-user-details">

                <div className="admin-user-name-row">

                  <h3>
                    {user.name}
                  </h3>

                  <span className="admin-user-tag">
                    Client
                  </span>

                </div>

                <p>

                  <span className="online-text">

                    <span className="mini-online-dot" />

                    Active now

                  </span>

                  <span className="user-email">
                    {user.email}
                  </span>

                </p>

              </div>

            </div>

            {/* HEADER ACTIONS */}

            <div className="admin-header-actions">

              <button
                type="button"
                title="Call"
              >
                <Phone size={17} />
              </button>

              <button
                type="button"
                title="Video call"
              >
                <Video size={17} />
              </button>

              <div className="admin-more-wrapper">

                <button
                  type="button"
                  title="More"
                  onClick={() =>
                    setShowProfile(
                      (prev) => !prev
                    )
                  }
                >
                  <MoreVertical size={18} />
                </button>

                {/* DROPDOWN */}

                <AnimatePresence>

                  {showProfile && (

                    <motion.div
                      className="admin-header-dropdown"
                      initial={{
                        opacity: 0,
                        y: -7,
                        scale: 0.96,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: -7,
                        scale: 0.96,
                      }}
                      transition={{
                        duration: 0.16,
                      }}
                    >

                      <button type="button">

                        <UserRound size={15} />

                        <span>
                          View Profile
                        </span>

                      </button>

                      <button type="button">

                        <FileText size={15} />

                        <span>
                          View Files
                        </span>

                      </button>

                    </motion.div>

                  )}

                </AnimatePresence>

              </div>

            </div>

          </header>

          {/* =================================================
              STATUS BAR
          ================================================= */}

          <div className="admin-chat-status-bar">

            <div className="admin-status-left">

              <span className="status-shield">

                <MessageSquare size={12} />

              </span>

              <span>
                Secure conversation
              </span>

            </div>

            <span className="admin-status-date">
              Today
            </span>

          </div>

          {/* =================================================
              MESSAGES
          ================================================= */}

          <div className="admin-messages-area">

            {/* DATE */}

            <div className="admin-date-divider">

              <span>
                Today
              </span>

            </div>

            {/* MESSAGE LIST */}

            <AnimatePresence initial={false}>

              {messages.map(
                (item, index) => (

                  <motion.div
                    key={item.id}
                    className={`admin-message-row ${
                      item.sender === "admin"
                        ? "admin-sent"
                        : "admin-received"
                    }`}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.22,
                      delay:
                        index < 6
                          ? index * 0.025
                          : 0,
                    }}
                  >

                    {/* USER AVATAR */}

                    {item.sender === "user" && (

                      <div className="message-avatar-small">
                        {user.avatar}
                      </div>

                    )}

                    <div className="admin-message-content">

                      {/* BUBBLE */}

                      <div className="admin-message-bubble">

                        <p>
                          {item.text}
                        </p>

                      </div>

                      {/* META */}

                      <div className="admin-message-meta">

                        <span>
                          {item.time}
                        </span>

                        {item.sender === "admin" && (

                          <span className="admin-message-status">

                            {item.read ? (
                              <CheckCheck size={14} />
                            ) : (
                              <Check size={14} />
                            )}

                          </span>

                        )}

                      </div>

                    </div>

                  </motion.div>

                )
              )}

            </AnimatePresence>

          </div>

          {/* =================================================
              MESSAGE COMPOSER
          ================================================= */}

          <div className="admin-composer-wrapper">

            <div className="admin-composer">

              {/* TOOLS */}

              <div className="admin-composer-toolbar">

                <button
                  type="button"
                  title="Attach file"
                >
                  <Paperclip size={18} />
                </button>

                <button
                  type="button"
                  title="Image"
                >
                  <ImageIcon size={18} />
                </button>

              </div>

              {/* TEXTAREA */}

              <textarea
                value={message}
                onChange={(event) =>
                  setMessage(
                    event.target.value
                  )
                }
                onKeyDown={handleKeyDown}
                placeholder={`Message ${user.name}...`}
                rows={1}
              />

              {/* EMOJI */}

              <button
                type="button"
                className="admin-emoji-button"
                title="Emoji"
              >
                <Smile size={18} />
              </button>

              {/* SEND */}

              <motion.button
                type="button"
                className="admin-send-button"
                onClick={
                  handleSendMessage
                }
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.92,
                }}
              >
                <Send size={17} />
              </motion.button>

            </div>

            {/* HINT */}

            <div className="admin-composer-hint">

              <span>
                Press
                <strong>
                  Enter
                </strong>
                to send
              </span>

              <span className="admin-encrypted">
                Messages are private
              </span>

            </div>

          </div>

        </main>

      </motion.div>

    </section>
  );
}

export default AdminMessageChat;