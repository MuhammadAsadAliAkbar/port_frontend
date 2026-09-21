import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import Pusher from "pusher-js";

import notificationSound from "../assets/notification.mp3";

import "../css/Chatbot.css";

/* =========================================================
   CONFIG
========================================================= */

const API_URL =
  import.meta.env.VITE_API_URL;

const PUSHER_KEY =
  import.meta.env.VITE_PUSHER_KEY;

const PUSHER_CLUSTER =
  import.meta.env.VITE_PUSHER_CLUSTER ||
  "ap2";

/* =========================================================
   QUICK QUESTIONS
========================================================= */

const quickQuestions = [
  "Tell me about yourself",
  "What are your skills?",
  "Show me your projects",
  "How can I contact you?",
];

/* =========================================================
   FALLBACK RESPONSE
========================================================= */

const getBotReply = (message) => {
  const text =
    message.toLowerCase();

  if (
    text.includes("hello") ||
    text.includes("hi") ||
    text.includes("hey") ||
    text.includes("salam") ||
    text.includes("assalam")
  ) {
    return (
      "Hi! 👋 Welcome to Muhammad Asad Ali Akbar's portfolio. How can I help you?"
    );
  }

  if (
    text.includes("yourself") ||
    text.includes("about")
  ) {
    return (
      "I'm Muhammad Asad Ali Akbar, a Senior Full Stack / MERN Stack Developer with 5+ years of professional experience building scalable, secure and high-performance web applications."
    );
  }

  if (
    text.includes("skill") ||
    text.includes("technology") ||
    text.includes("stack")
  ) {
    return (
      "My core technologies include React.js, Next.js, Angular, TypeScript, Node.js, Express.js, NestJS, MongoDB, MySQL, PostgreSQL, Redis, Docker, AWS, Kafka, RabbitMQ, Elasticsearch and REST/gRPC APIs. I also work with AI technologies including OpenAI, Gemini, LangChain, LangGraph, RAG and AI Agents."
    );
  }

  if (
    text.includes("project") ||
    text.includes("work")
  ) {
    return (
      "I've worked on enterprise dashboards, SaaS platforms, REST APIs, real-time applications, scalable backend systems, AI-powered applications and cloud-based solutions."
    );
  }

  if (
    text.includes("experience") ||
    text.includes("5 years")
  ) {
    return (
      "I have 5+ years of professional experience in full-stack development, working across frontend, backend, databases, APIs, cloud deployment, performance optimization and scalable software architecture."
    );
  }

  if (
    text.includes("contact") ||
    text.includes("hire") ||
    text.includes("email")
  ) {
    return (
      "You can contact me through email at crypton.futuremedia1989@gmail.com or connect with me on LinkedIn. You can also send me a message directly on WhatsApp."
    );
  }

  if (
    text.includes("whatsapp") ||
    text.includes("message")
  ) {
    return (
      "Sure! You can contact me directly on WhatsApp using the button below."
    );
  }

  if (text.includes("github")) {
    return (
      "You can explore my GitHub projects here: github.com/cryptonfuture"
    );
  }

  if (text.includes("linkedin")) {
    return (
      "You can connect with me on LinkedIn through my portfolio's LinkedIn link."
    );
  }

  return (
    "Thanks for your message! 😊 You can ask me about my experience, skills, projects, technologies or contact information."
  );
};

/* =========================================================
   COMPONENT
========================================================= */

function Chatbot() {

  /* =======================================================
     OPEN / CLOSE
  ======================================================= */

  const [
    isOpen,
    setIsOpen,
  ] = useState(false);

  /* =======================================================
     MESSAGES
  ======================================================= */

  const [
    messages,
    setMessages,
  ] = useState([
    {
      id: "welcome",
      sender: "bot",
      text:
        "Hi! 👋 I'm Asad's virtual assistant. How can I help you today?",
      type: "welcome",
    },
  ]);

  /* =======================================================
     INPUT
  ======================================================= */

  const [
    input,
    setInput,
  ] = useState("");

  /* =======================================================
     TYPING
  ======================================================= */

  const [
    isTyping,
    setIsTyping,
  ] = useState(false);

  /* =======================================================
     PUSHER STATUS
  ======================================================= */

  const [
    isPusherConnected,
    setIsPusherConnected,
  ] = useState(false);

  /* =======================================================
     NOTIFICATION COUNT
  ======================================================= */

  const [
    notificationCount,
    setNotificationCount,
  ] = useState(0);

  /* =======================================================
     REFS
  ======================================================= */

  const pusherRef =
    useRef(null);

  const channelRef =
    useRef(null);

  const messagesEndRef =
    useRef(null);

  const isOpenRef =
    useRef(false);

  const notificationAudioRef =
    useRef(null);

  /*
    IMPORTANT:
    Prevent duplicate Pusher events.
  */
  const processedEventsRef =
    useRef(new Set());

  /*
    IMPORTANT:
    Keep track of messages that were
    already sent by this browser.
  */
  const pendingUserMessagesRef =
    useRef([]);

  /* =======================================================
     AUDIO INITIALIZATION
  ======================================================= */

  useEffect(() => {

    let audio;

    try {

      audio =
        new Audio(
          notificationSound
        );

      audio.preload =
        "auto";

      audio.volume =
        0.65;

      notificationAudioRef.current =
        audio;

      const unlockAudio =
        async () => {

          const notificationAudio =
            notificationAudioRef.current;

          if (!notificationAudio) {
            return;
          }

          try {

            notificationAudio.muted =
              true;

            notificationAudio.currentTime =
              0;

            await notificationAudio.play();

            notificationAudio.pause();

            notificationAudio.currentTime =
              0;

            notificationAudio.muted =
              false;

            window.removeEventListener(
              "click",
              unlockAudio
            );

            window.removeEventListener(
              "pointerdown",
              unlockAudio
            );

            window.removeEventListener(
              "keydown",
              unlockAudio
            );

            window.removeEventListener(
              "touchstart",
              unlockAudio
            );

          } catch (error) {

            console.warn(
              "⚠️ Audio unlock waiting:",
              error
            );
          }
        };

      window.addEventListener(
        "click",
        unlockAudio,
        { once: true }
      );

      window.addEventListener(
        "pointerdown",
        unlockAudio,
        { once: true }
      );

      window.addEventListener(
        "keydown",
        unlockAudio,
        { once: true }
      );

      window.addEventListener(
        "touchstart",
        unlockAudio,
        { once: true }
      );

      return () => {

        window.removeEventListener(
          "click",
          unlockAudio
        );

        window.removeEventListener(
          "pointerdown",
          unlockAudio
        );

        window.removeEventListener(
          "keydown",
          unlockAudio
        );

        window.removeEventListener(
          "touchstart",
          unlockAudio
        );

        if (audio) {

          audio.pause();

          audio.currentTime =
            0;
        }

        notificationAudioRef.current =
          null;
      };

    } catch (error) {

      console.error(
        "❌ Audio initialization error:",
        error
      );
    }

  }, []);

  /* =======================================================
     PLAY NOTIFICATION SOUND
  ======================================================= */

  const playNotificationSound =
    async () => {

      try {

        const audio =
          notificationAudioRef.current;

        if (!audio) {
          return;
        }

        audio.pause();

        audio.currentTime =
          0;

        audio.volume =
          0.65;

        audio.muted =
          false;

        await audio.play();

      } catch (error) {

        console.warn(
          "⚠️ Notification sound error:",
          error
        );
      }
    };

  /* =======================================================
     SHOW NOTIFICATION
  ======================================================= */

  const showNotification =
    () => {

      if (isOpenRef.current) {

        return;
      }

      setNotificationCount(
        (prev) =>
          prev + 1
      );

      playNotificationSound();
    };

  /* =======================================================
     OPEN STATE SYNC
  ======================================================= */

  useEffect(() => {

    isOpenRef.current =
      isOpen;

    if (isOpen) {

      setNotificationCount(0);
    }

  }, [isOpen]);

  /* =======================================================
     EXTERNAL EVENTS
  ======================================================= */

  useEffect(() => {

    const handleOpenChatbot =
      () => {

        isOpenRef.current =
          true;

        setIsOpen(true);

        setNotificationCount(0);
      };

    const handleCloseChatbot =
      () => {

        isOpenRef.current =
          false;

        setIsOpen(false);
      };

    window.addEventListener(
      "open-chatbot",
      handleOpenChatbot
    );

    window.addEventListener(
      "close-chatbot",
      handleCloseChatbot
    );

    return () => {

      window.removeEventListener(
        "open-chatbot",
        handleOpenChatbot
      );

      window.removeEventListener(
        "close-chatbot",
        handleCloseChatbot
      );
    };

  }, []);

  /* =======================================================
     PUSHER CONNECTION
  ======================================================= */

  useEffect(() => {

    if (!PUSHER_KEY) {

      console.warn(
        "⚠️ VITE_PUSHER_KEY missing."
      );

      return;
    }

    console.log(
      "🔌 Connecting Pusher..."
    );

    const pusher =
      new Pusher(
        PUSHER_KEY,
        {
          cluster:
            PUSHER_CLUSTER,

          forceTLS:
            true,
        }
      );

    pusherRef.current =
      pusher;

    /* =====================================================
       CONNECTION EVENTS
    ===================================================== */

    const handleConnected =
      () => {

        console.log(
          "✅ Pusher connected"
        );

        setIsPusherConnected(
          true
        );
      };

    const handleDisconnected =
      () => {

        console.log(
          "⚠️ Pusher disconnected"
        );

        setIsPusherConnected(
          false
        );
      };

    const handleError =
      (error) => {

        console.error(
          "❌ Pusher error:",
          error
        );

        setIsPusherConnected(
          false
        );
      };

    pusher.connection.bind(
      "connected",
      handleConnected
    );

    pusher.connection.bind(
      "disconnected",
      handleDisconnected
    );

    pusher.connection.bind(
      "error",
      handleError
    );

    /* =====================================================
       PORTFOLIO CHANNEL
    ===================================================== */

    const channel =
      pusher.subscribe(
        "portfolio-updates"
      );

    channelRef.current =
      channel;

    /* =====================================================
       SUBSCRIPTION SUCCESS
    ===================================================== */

    channel.bind(
      "pusher:subscription_succeeded",
      () => {

        console.log(
          "✅ Subscribed to portfolio-updates"
        );
      }
    );

    /* =====================================================
       PORTFOLIO UPDATE
    ===================================================== */

    channel.bind(
      "portfolio-update",
      (data) => {

        console.log(
          "🔔 Portfolio update received:",
          data
        );

        if (!data) {
          return;
        }

        /*
          Unique event ID.
        */

        const eventId =
          data.id ||
          `${data.type || "portfolio"}-${data.title || ""}-${data.message || ""}-${data.createdAt || ""}`;

        if (
          processedEventsRef.current.has(
            eventId
          )
        ) {

          console.log(
            "♻️ Duplicate portfolio event ignored:",
            eventId
          );

          return;
        }

        processedEventsRef.current.add(
          eventId
        );

        const title =
          data.title ||
          "Portfolio Update";

        const updateMessage =
          data.message ||
          "A new portfolio update is available.";

        const portfolioMessage = {

          id:
            eventId,

          sender:
            "bot",

          text:
            `🔔 ${title}\n\n${updateMessage}`,

          type:
            "portfolio-update",

          title,

          updateType:
            data.type ||
            "portfolio",

          createdAt:
            data.createdAt ||
            new Date().toISOString(),
        };

        setMessages(
          (prev) => {

            /*
              Extra protection:
              check existing message ID.
            */

            if (
              prev.some(
                (item) =>
                  item.id ===
                  portfolioMessage.id
              )
            ) {
              return prev;
            }

            return [
              ...prev,
              portfolioMessage,
            ];
          }
        );

        showNotification();
      }
    );

    /* =====================================================
       CLIENT MESSAGE
       
       IMPORTANT:
       Backend Pusher may echo our own user message.
       We detect that and DO NOT add it twice.
    ===================================================== */

    channel.bind(
      "client-message",
      (data) => {

        console.log(
          "💬 Client message:",
          data
        );

        if (!data?.message) {
          return;
        }

        const incomingMessage =
          data.message.trim();

        /*
          If this message was sent locally,
          don't add it again.
        */

        const pendingIndex =
          pendingUserMessagesRef.current.findIndex(
            (item) =>
              item.text ===
              incomingMessage
          );

        if (
          pendingIndex !== -1 &&
          data.sender === "user"
        ) {

          console.log(
            "♻️ Own Pusher client message ignored:",
            incomingMessage
          );

          pendingUserMessagesRef.current.splice(
            pendingIndex,
            1
          );

          return;
        }

        const eventId =
          data.id ||
          `client-${data.createdAt || ""}-${incomingMessage}`;

        if (
          processedEventsRef.current.has(
            eventId
          )
        ) {

          console.log(
            "♻️ Duplicate client event ignored"
          );

          return;
        }

        processedEventsRef.current.add(
          eventId
        );

        setMessages(
          (prev) => {

            if (
              prev.some(
                (item) =>
                  item.id ===
                  eventId
              )
            ) {
              return prev;
            }

            return [
              ...prev,
              {
                id:
                  eventId,

                sender:
                  data.sender === "user"
                    ? "user"
                    : "bot",

                text:
                  incomingMessage,

                type:
                  "client-message",

                createdAt:
                  data.createdAt ||
                  new Date().toISOString(),
              },
            ];
          }
        );

        showNotification();
      }
    );

    /* =====================================================
       CHATBOT MESSAGE
    ===================================================== */

    channel.bind(
      "chatbot-message",
      (data) => {

        console.log(
          "💬 Chatbot message:",
          data
        );

        if (!data?.message) {
          return;
        }

        const messageText =
          data.message.trim();

        const eventId =
          data.id ||
          `chatbot-${data.createdAt || ""}-${messageText}`;

        if (
          processedEventsRef.current.has(
            eventId
          )
        ) {

          console.log(
            "♻️ Duplicate chatbot event ignored"
          );

          return;
        }

        processedEventsRef.current.add(
          eventId
        );

        setMessages(
          (prev) => {

            if (
              prev.some(
                (item) =>
                  item.id ===
                  eventId
              )
            ) {
              return prev;
            }

            return [
              ...prev,
              {
                id:
                  eventId,

                sender:
                  data.sender === "user"
                    ? "user"
                    : "bot",

                text:
                  messageText,

                type:
                  "chatbot-message",

                createdAt:
                  data.createdAt ||
                  new Date().toISOString(),
              },
            ];
          }
        );

        showNotification();
      }
    );

    /* =====================================================
       AI RESPONSE
       
       Prevent duplicate AI responses.
    ===================================================== */

    channel.bind(
      "ai-response",
      (data) => {

        console.log(
          "🤖 AI response:",
          data
        );

        if (!data?.reply) {
          return;
        }

        const reply =
          data.reply.trim();

        const eventId =
          data.id ||
          `ai-${data.createdAt || ""}-${reply}`;

        if (
          processedEventsRef.current.has(
            eventId
          )
        ) {

          console.log(
            "♻️ Duplicate AI response ignored"
          );

          return;
        }

        /*
          Check whether exactly same response
          already exists.
        */

        setMessages(
          (prev) => {

            const alreadyExists =
              prev.some(
                (item) =>
                  item.sender === "bot" &&
                  item.text === reply &&
                  item.type === "ai-response"
              );

            if (alreadyExists) {

              console.log(
                "♻️ Duplicate AI message ignored"
              );

              processedEventsRef.current.add(
                eventId
              );

              return prev;
            }

            processedEventsRef.current.add(
              eventId
            );

            return [
              ...prev,
              {
                id:
                  eventId,

                sender:
                  "bot",

                text:
                  reply,

                type:
                  "ai-response",

                createdAt:
                  data.createdAt ||
                  new Date().toISOString(),
              },
            ];
          }
        );

        setIsTyping(false);

        showNotification();
      }
    );

    /* =====================================================
       SUBSCRIPTION ERROR
    ===================================================== */

    channel.bind(
      "pusher:subscription_error",
      (error) => {

        console.error(
          "❌ Pusher subscription error:",
          error
        );
      }
    );

    /* =====================================================
       CLEANUP
    ===================================================== */

    return () => {

      channel.unbind_all();

      pusher.unsubscribe(
        "portfolio-updates"
      );

      pusher.connection.unbind(
        "connected",
        handleConnected
      );

      pusher.connection.unbind(
        "disconnected",
        handleDisconnected
      );

      pusher.connection.unbind(
        "error",
        handleError
      );

      pusher.disconnect();

      pusherRef.current =
        null;

      channelRef.current =
        null;

      processedEventsRef.current.clear();
    };

  }, []);

  /* =======================================================
     AUTO SCROLL
  ======================================================= */

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior:
        "smooth",
    });

  }, [
    messages,
    isTyping,
  ]);

  /* =======================================================
     SEND NORMAL CHAT MESSAGE
  ======================================================= */

  const sendMessage =
    async (
      messageText = input
    ) => {

      const message =
        messageText.trim();

      if (
        !message ||
        isTyping
      ) {
        return;
      }

      const localMessageId =
        `user-${Date.now()}-${Math.random()}`;

      /*
        Store message temporarily.

        Agar backend isi message ko
        Pusher se echo karega to hum
        usko ignore karenge.
      */

      pendingUserMessagesRef.current.push({
        id:
          localMessageId,

        text:
          message,

        createdAt:
          Date.now(),
      });

      /*
        Remove stale pending messages
        after 10 seconds.
      */

      setTimeout(() => {

        pendingUserMessagesRef.current =
          pendingUserMessagesRef.current.filter(
            (item) =>
              item.id !==
              localMessageId
          );

      }, 10000);

      /* ================================================
         SHOW USER MESSAGE IMMEDIATELY
      ================================================ */

      setMessages(
        (prev) => [
          ...prev,
          {
            id:
              localMessageId,

            sender:
              "user",

            text:
              message,

            type:
              "user-message",

            createdAt:
              new Date().toISOString(),
          },
        ]
      );

      setInput("");

      setIsTyping(
        true
      );

      try {

        if (!API_URL) {

          throw new Error(
            "VITE_API_URL is missing."
          );
        }

        const response =
          await fetch(
            `${API_URL}/chat`,
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  message,
                }),
            }
          );

        if (!response.ok) {

          throw new Error(
            `Chat API failed: ${response.status}`
          );
        }

        const data =
          await response.json();

        /* ==============================================
           DIRECT API RESPONSE
           
           Only use direct response when
           Pusher is NOT connected.
        ============================================== */

        if (
          !isPusherConnected &&
          data?.reply
        ) {

          setIsTyping(
            false
          );

          const reply =
            data.reply.trim();

          setMessages(
            (prev) => {

              const alreadyExists =
                prev.some(
                  (item) =>
                    item.sender === "bot" &&
                    item.text === reply
                );

              if (alreadyExists) {
                return prev;
              }

              return [
                ...prev,
                {
                  id:
                    `bot-${Date.now()}-${Math.random()}`,

                  sender:
                    "bot",

                  text:
                    reply,

                  type:
                    "ai-response",

                  createdAt:
                    new Date().toISOString(),
                },
              ];
            }
          );
        }

      } catch (error) {

        console.error(
          "❌ Chat API error:",
          error
        );

        /*
          Remove pending message
          because request failed.
        */

        pendingUserMessagesRef.current =
          pendingUserMessagesRef.current.filter(
            (item) =>
              item.id !==
              localMessageId
          );

        setTimeout(
          () => {

            setIsTyping(
              false
            );

            setMessages(
              (prev) => {

                const fallbackText =
                  getBotReply(
                    message
                  );

                const alreadyExists =
                  prev.some(
                    (item) =>
                      item.sender === "bot" &&
                      item.text ===
                        fallbackText
                  );

                if (alreadyExists) {
                  return prev;
                }

                return [
                  ...prev,
                  {
                    id:
                      `fallback-${Date.now()}-${Math.random()}`,

                    sender:
                      "bot",

                    text:
                      fallbackText,

                    type:
                      "fallback",
                  },
                ];
              }
            );

          },
          700
        );
      }
    };

  /* =======================================================
     KEYBOARD
  ======================================================= */

  const handleKeyDown =
    (event) => {

      if (
        event.key === "Enter" &&
        !event.shiftKey
      ) {

        event.preventDefault();

        sendMessage();
      }
    };

  /* =======================================================
     OPEN CHATBOT
  ======================================================= */

  const openChatbot =
    () => {

      isOpenRef.current =
        true;

      setIsOpen(
        true
      );

      setNotificationCount(
        0
      );
    };

  /* =======================================================
     CLOSE CHATBOT
  ======================================================= */

  const closeChatbot =
    () => {

      isOpenRef.current =
        false;

      setIsOpen(
        false
      );
    };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <>
      {/* ===================================================
          FLOATING CHATBOT BUTTON
      =================================================== */}

      <motion.button
        type="button"
        className="chatbot-toggle"
        onClick={
          openChatbot
        }
        aria-label="Open chatbot"

        whileHover={{
          scale:
            1.05,
        }}

        whileTap={{
          scale:
            0.95,
        }}
      >

        <i className="fas fa-robot"></i>

        {/* =================================================
            NOTIFICATION BADGE
        ================================================= */}

        <AnimatePresence>

          {notificationCount >
            0 && (

            <motion.span
              className="chatbot-notification"

              initial={{
                scale: 0,
                opacity: 0,
              }}

              animate={{
                scale: 1,
                opacity: 1,
              }}

              exit={{
                scale: 0,
                opacity: 0,
              }}

              transition={{
                type:
                  "spring",

                stiffness:
                  500,

                damping:
                  20,
              }}
            >

              {notificationCount >
                99
                ? "99+"
                : notificationCount}

            </motion.span>
          )}

        </AnimatePresence>

      </motion.button>

      {/* ===================================================
          CHAT WINDOW
      =================================================== */}

      <AnimatePresence>

        {isOpen && (

          <motion.div
            className="chatbot-window"

            initial={{
              opacity: 0,
              scale: 0.88,
              y: 30,
            }}

            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}

            exit={{
              opacity: 0,
              scale: 0.88,
              y: 30,
            }}

            transition={{
              duration:
                0.3,

              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
          >

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="chatbot-header">

              <div className="chatbot-profile">

                <div className="chatbot-avatar-wrap">

                  <div className="chatbot-avatar">

                    <i className="fas fa-robot"></i>

                  </div>

                  <span
                    className={`chatbot-online ${
                      isPusherConnected
                        ? "connected"
                        : "disconnected"
                    }`}
                  />

                </div>

                <div className="chatbot-profile-info">

                  <div className="chatbot-title-row">

                    <h3>
                      Asad's Assistant
                    </h3>

                    <span className="ai-badge">
                      AI
                    </span>

                  </div>

                  <span className="chatbot-status">

                    <i
                      className="fas fa-circle"
                      style={{
                        color:
                          isPusherConnected
                            ? "#22c55e"
                            : "#f59e0b",
                      }}
                    />

                    {isPusherConnected
                      ? "Live & ready to help"
                      : "Connecting..."}

                  </span>

                </div>

              </div>

              {/* =================================================
                  CLOSE BUTTON
              ================================================= */}

              <button
                type="button"
                className="chatbot-close"
                onClick={
                  closeChatbot
                }
                aria-label="Close chat"
              >

                <i className="fas fa-xmark"></i>

              </button>

            </div>

            {/* =================================================
                BODY
            ================================================= */}

            <div className="chatbot-body">

              {/* =================================================
                  WELCOME
              ================================================= */}

              <div className="chatbot-welcome">

                <div className="welcome-icon">

                  <i className="fas fa-sparkles"></i>

                </div>

                <div>

                  <h4>
                    How can I help?
                  </h4>

                  <p>
                    Ask me about Asad's
                    experience, skills,
                    projects or contact
                    details.
                  </p>

                </div>

              </div>

              {/* =================================================
                  MESSAGES
              ================================================= */}

              <div className="chatbot-messages">

                {messages.map(
                  (message) => (

                    <motion.div
                      key={
                        message.id
                      }

                      className={`chat-message ${
                        message.sender ===
                        "user"
                          ? "user-message"
                          : "bot-message"
                      } ${
                        message.type ===
                        "portfolio-update"
                          ? "portfolio-message"
                          : ""
                      }`}

                      initial={{
                        opacity: 0,
                        y: 10,
                        scale: 0.97,
                      }}

                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}

                      transition={{
                        duration:
                          0.25,
                      }}
                    >

                      {/* =====================================
                          BOT AVATAR
                      ===================================== */}

                      {message.sender ===
                        "bot" && (

                        <div className="message-avatar">

                          <i className="fas fa-robot"></i>

                        </div>
                      )}

                      <div className="message-bubble">

                        <div
                          className="message-content"
                          style={{
                            whiteSpace:
                              "pre-line",
                          }}
                        >
                          {message.text}
                        </div>

                        <span className="message-time">

                          {message.sender ===
                          "user"
                            ? "You"
                            : message.type ===
                              "portfolio-update"
                            ? "Portfolio Update"
                            : "Assistant"}

                        </span>

                      </div>

                    </motion.div>
                  )
                )}

                {/* =================================================
                    TYPING
                ================================================= */}

                {isTyping && (

                  <motion.div
                    className="chat-message bot-message"

                    initial={{
                      opacity: 0,
                      y: 8,
                    }}

                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                  >

                    <div className="message-avatar">

                      <i className="fas fa-robot"></i>

                    </div>

                    <div className="typing-bubble">

                      <span></span>
                      <span></span>
                      <span></span>

                    </div>

                  </motion.div>
                )}

                <div
                  ref={
                    messagesEndRef
                  }
                />

              </div>

              {/* =================================================
                  QUICK QUESTIONS
              ================================================= */}

              {messages.length <=
                1 && (

                <div className="quick-questions">

                  <div className="quick-title">

                    <i className="fas fa-bolt"></i>

                    Quick questions

                  </div>

                  <div className="quick-question-list">

                    {quickQuestions.map(
                      (question) => (

                        <button
                          key={
                            question
                          }

                          type="button"

                          onClick={() =>
                            sendMessage(
                              question
                            )
                          }

                          disabled={
                            isTyping
                          }
                        >

                          {question}

                          <i className="fas fa-arrow-right"></i>

                        </button>
                      )
                    )}

                  </div>

                </div>
              )}

            </div>

            {/* =================================================
                WHATSAPP
            ================================================= */}

            <a
              href="https://wa.me/923222382819"
              target="_blank"
              rel="noreferrer"
              className="chatbot-whatsapp"
            >

              <span className="whatsapp-icon">

                <i className="fab fa-whatsapp"></i>

              </span>

              <span className="whatsapp-text">

                <strong>
                  Prefer WhatsApp?
                </strong>

                <small>
                  Let's talk directly
                </small>

              </span>

              <i className="fas fa-arrow-right whatsapp-arrow"></i>

            </a>

            {/* =================================================
                INPUT
            ================================================= */}

            <div className="chatbot-input-area">

              <div className="chatbot-input-wrapper">

                <i className="fas fa-message chatbot-input-icon"></i>

                <input
                  type="text"
                  value={
                    input
                  }

                  onChange={(
                    event
                  ) =>
                    setInput(
                      event.target.value
                    )
                  }

                  onKeyDown={
                    handleKeyDown
                  }

                  placeholder="Type your message..."
                  aria-label="Type your message"

                  disabled={
                    isTyping
                  }
                />

                <button
                  type="button"

                  onClick={() =>
                    sendMessage()
                  }

                  disabled={
                    !input.trim() ||
                    isTyping
                  }

                  aria-label="Send message"
                >

                  <i className="fas fa-paper-plane"></i>

                </button>

              </div>

              {/* =================================================
                  POWERED
              ================================================= */}

              <div className="chatbot-powered">

                <span>

                  <i className="fas fa-shield-halved"></i>

                  Secure Portfolio Assistant

                </span>

                <span className="powered-dot"></span>

                <span>

                  {isPusherConnected
                    ? "Live Updates"
                    : "Connecting"}

                </span>

              </div>

            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </>
  );
}

export default Chatbot;