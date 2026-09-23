
import { useEffect, useMemo, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import {
  MessageCircle,
  X,
  Search,
  Send,
  MoreVertical,
  Phone,
  Video,
  UserRound,
  CheckCheck,
  PanelLeft,
  Loader2,
  RefreshCw,
} from "lucide-react";

import "../css/MessageChat.css";

/* =========================================================
   CONFIG
========================================================= */

const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "");

const USERS_API = `${API_URL}/auth`;

/* =========================================================
   TOKEN HELPER
========================================================= */

const getToken = () => {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("authToken") ||
    ""
  );
};

/* =========================================================
   AUTH HEADERS
========================================================= */

const getAuthHeaders = () => {
  const token = getToken();

  return {
    "Content-Type": "application/json",

    ...(token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {}),
  };
};

/* =========================================================
   SIDEBAR DATE / TIME
========================================================= */

const formatSidebarDateTime = (date) => {
  if (!date) {
    return "";
  }

  try {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    const now = new Date();

    const isToday =
      parsedDate.getDate() === now.getDate() &&
      parsedDate.getMonth() === now.getMonth() &&
      parsedDate.getFullYear() === now.getFullYear();

    const yesterday = new Date();

    yesterday.setDate(yesterday.getDate() - 1);

    const isYesterday =
      parsedDate.getDate() === yesterday.getDate() &&
      parsedDate.getMonth() === yesterday.getMonth() &&
      parsedDate.getFullYear() === yesterday.getFullYear();

    /* ==========================================
       TODAY
    ========================================== */

    if (isToday) {
      return parsedDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    /* ==========================================
       YESTERDAY
    ========================================== */

    if (isYesterday) {
      return "Yesterday";
    }

    /* ==========================================
       THIS YEAR
    ========================================== */

    if (
      parsedDate.getFullYear() ===
      now.getFullYear()
    ) {
      return parsedDate.toLocaleDateString([], {
        day: "2-digit",
        month: "short",
      });
    }

    /* ==========================================
       OLD DATE
    ========================================== */

    return parsedDate.toLocaleDateString([], {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

/* =========================================================
   MESSAGE DATE + TIME
========================================================= */

const formatDateTime = (date) => {
  if (!date) {
    return "";
  }

  try {
    const messageDate = new Date(date);

    if (Number.isNaN(messageDate.getTime())) {
      return "";
    }

    const now = new Date();

    const isToday =
      messageDate.getDate() === now.getDate() &&
      messageDate.getMonth() === now.getMonth() &&
      messageDate.getFullYear() === now.getFullYear();

    const time =
      messageDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

    if (isToday) {
      return `Today, ${time}`;
    }

    return `${messageDate.toLocaleDateString([], {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })}, ${time}`;
  } catch {
    return "";
  }
};

/* =========================================================
   GET INITIALS
========================================================= */

const getInitials = (user) => {
  if (!user) {
    return "U";
  }

  const name =
    user.name ||
    user.fullName ||
    user.username ||
    "";

  if (!name) {
    return "U";
  }

  return (
    name
      .split(" ")
      .filter(Boolean)
      .map((item) => item[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U"
  );
};

/* =========================================================
   GET AVATAR
========================================================= */

const getAvatarValue = (user) => {
  if (!user) {
    return "";
  }

  return (
    user.avatar ||
    user.profileImage ||
    user.profilePicture ||
    user.image ||
    user.photo ||
    user.photoURL ||
    ""
  );
};

/* =========================================================
   CHECK IMAGE URL
========================================================= */

const isImageUrl = (value) => {
  if (!value || typeof value !== "string") {
    return false;
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return false;
  }

  if (trimmedValue.startsWith("data:image/")) {
    return true;
  }

  if (trimmedValue.startsWith("blob:")) {
    return true;
  }

  if (
    trimmedValue.startsWith("http://") ||
    trimmedValue.startsWith("https://")
  ) {
    return true;
  }

  if (
    /\.(jpg|jpeg|png|gif|webp|svg|avif)(\?.*)?$/i.test(
      trimmedValue
    )
  ) {
    return true;
  }

  return false;
};

/* =========================================================
   USER AVATAR
========================================================= */

const UserAvatar = ({
  user,
  className = "",
}) => {
  const [imageError, setImageError] =
    useState(false);

  const avatarValue =
    getAvatarValue(user);

  const initials =
    getInitials(user);

  useEffect(() => {
    setImageError(false);
  }, [avatarValue]);

  const showImage =
    isImageUrl(avatarValue) &&
    !imageError;

  return (
    <div
      className={`user-avatar-image-wrapper ${className}`}
    >
      {showImage ? (
        <img
          src={avatarValue}
          alt={user?.name || "User"}
          className="user-avatar-image"
          onError={() =>
            setImageError(true)
          }
        />
      ) : (
        <span className="user-avatar-initials">
          {initials}
        </span>
      )}
    </div>
  );
};

/* =========================================================
   ONLINE / OFFLINE
========================================================= */

const isUserOnline = (user) => {
  if (!user) {
    return false;
  }

  return Boolean(
    user.online === true ||
      user.isOnline === true
  );
};

/* =========================================================
   COMPONENT
========================================================= */

function MessageChat() {
  /* =======================================================
     CHAT OPEN
  ======================================================= */

  const [isOpen, setIsOpen] =
    useState(false);

  /* =======================================================
     USERS DRAWER
  ======================================================= */

  const [showUsers, setShowUsers] =
    useState(true);

  /* =======================================================
     USERS
  ======================================================= */

  const [users, setUsers] =
    useState([]);

  const [usersLoading, setUsersLoading] =
    useState(false);

  const [usersError, setUsersError] =
    useState("");

  /* =======================================================
     SELECTED USER
  ======================================================= */

  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(null);

  /* =======================================================
     SEARCH
  ======================================================= */

  const [search, setSearch] =
    useState("");

  /* =======================================================
     MESSAGES
  ======================================================= */

  const [messages, setMessages] =
    useState({});

  /* =======================================================
     MESSAGE INPUT
  ======================================================= */

  const [message, setMessage] =
    useState("");

  /* =======================================================
     SENDING
  ======================================================= */

  const [sending, setSending] =
    useState(false);

  /* =======================================================
     SELECTED USER
  ======================================================= */

  const selectedUser = useMemo(() => {
    return users.find(
      (user) =>
        String(
          user._id || user.id
        ) ===
        String(selectedUserId)
    );
  }, [
    users,
    selectedUserId,
  ]);

  /* =======================================================
     FETCH USERS
  ======================================================= */

  const fetchUsers = async (
    searchValue = ""
  ) => {
    try {
      setUsersLoading(true);
      setUsersError("");

      const params =
        new URLSearchParams();

      if (searchValue.trim()) {
        params.set(
          "search",
          searchValue.trim()
        );
      }

      params.set("page", "1");
      params.set("limit", "100");

      const response =
        await fetch(
          `${USERS_API}?${params.toString()}`,
          {
            method: "GET",
            headers: getAuthHeaders(),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to fetch users"
        );
      }

      if (!data?.success) {
        throw new Error(
          data?.message ||
            "Failed to fetch users"
        );
      }

      const apiUsers =
        Array.isArray(data.users)
          ? data.users
          : [];

      /* =================================================
         NORMALIZE USERS
      ================================================= */

      const normalizedUsers =
        apiUsers.map((user) => ({
          ...user,

          id:
            user._id ||
            user.id,

          online: Boolean(
            user.online === true ||
              user.isOnline === true
          ),
        }));

      setUsers(
        normalizedUsers
      );

      /* =================================================
         AUTO SELECT FIRST USER
      ================================================= */

      if (
        !selectedUserId &&
        normalizedUsers.length > 0
      ) {
        setSelectedUserId(
          normalizedUsers[0]._id ||
            normalizedUsers[0].id
        );
      }

      /* =================================================
         CHECK SELECTED USER
      ================================================= */

      if (
        selectedUserId &&
        normalizedUsers.length > 0
      ) {
        const selectedExists =
          normalizedUsers.some(
            (user) =>
              String(
                user._id ||
                  user.id
              ) ===
              String(
                selectedUserId
              )
          );

        if (!selectedExists) {
          setSelectedUserId(
            normalizedUsers[0]._id ||
              normalizedUsers[0].id
          );
        }
      }

      /* =================================================
         NO USERS
      ================================================= */

      if (
        normalizedUsers.length === 0
      ) {
        setSelectedUserId(null);
      }
    } catch (error) {
      console.error(
        "fetchUsers:",
        error
      );

      setUsersError(
        error.message ||
          "Unable to load users"
      );
    } finally {
      setUsersLoading(false);
    }
  };

  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    fetchUsers();
  }, []);

  /* =======================================================
     SEARCH
  ======================================================= */

  useEffect(() => {
    const timer =
      setTimeout(() => {
        fetchUsers(search);
      }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  /* =======================================================
     AUTO REFRESH ONLINE / OFFLINE
  ======================================================= */

  useEffect(() => {
    const interval =
      setInterval(() => {
        fetchUsers(search);
      }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, [search]);

  /* =======================================================
     REFRESH WHEN TAB BECOMES ACTIVE
  ======================================================= */

  useEffect(() => {
    const handleVisibility = () => {
      if (
        document.visibilityState ===
        "visible"
      ) {
        fetchUsers(search);
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };
  }, [search]);

  /* =======================================================
     OPEN CHAT EVENT
  ======================================================= */

  useEffect(() => {
    const handleOpenMessage = () => {
      setIsOpen(true);

      fetchUsers(search);

      if (
        window.innerWidth >
        768
      ) {
        setShowUsers(true);
      }
    };

    window.addEventListener(
      "open-message-chat",
      handleOpenMessage
    );

    return () => {
      window.removeEventListener(
        "open-message-chat",
        handleOpenMessage
      );
    };
  }, [search]);

  /* =======================================================
     CLOSE CHAT EVENT
  ======================================================= */

  useEffect(() => {
    const handleCloseMessage = () => {
      setIsOpen(false);
    };

    window.addEventListener(
      "close-message-chat",
      handleCloseMessage
    );

    return () => {
      window.removeEventListener(
        "close-message-chat",
        handleCloseMessage
      );
    };
  }, []);

  /* =======================================================
     OPEN CONVERSATION
  ======================================================= */

  const openConversation = (
    userId
  ) => {
    setSelectedUserId(userId);
    setMessage("");

    if (
      window.innerWidth <=
      768
    ) {
      setShowUsers(false);
    }
  };

  /* =======================================================
     SEND MESSAGE
  ======================================================= */

  const sendMessage = async () => {
    const text =
      message.trim();

    if (
      !text ||
      !selectedUserId ||
      sending
    ) {
      return;
    }

    try {
      setSending(true);

      const now =
        new Date();

      const newMessage = {
        id: Date.now(),

        sender: "me",

        text,

        time:
          now.toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          ),

        createdAt:
          now.toISOString(),
      };

      /* =================================================
         ADD MESSAGE
      ================================================= */

      setMessages((prev) => ({
        ...prev,

        [selectedUserId]: [
          ...(prev[
            selectedUserId
          ] || []),

          newMessage,
        ],
      }));

      /* =================================================
         UPDATE LAST MESSAGE
      ================================================= */

      setUsers((prev) =>
        prev.map((user) => {
          const userId =
            user._id ||
            user.id;

          if (
            String(userId) !==
            String(
              selectedUserId
            )
          ) {
            return user;
          }

          return {
            ...user,

            lastMessage:
              text,

            lastMessageAt:
              now.toISOString(),
          };
        })
      );

      setMessage("");
    } catch (error) {
      console.error(
        "sendMessage:",
        error
      );
    } finally {
      setSending(false);
    }
  };

  /* =======================================================
     ENTER SEND
  ======================================================= */

  const handleKeyDown = (
    event
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      sendMessage();
    }
  };

  /* =======================================================
     TOGGLE DRAWER
  ======================================================= */

  const toggleDrawer = () => {
    setShowUsers(
      (prev) => !prev
    );
  };

  /* =======================================================
     CLOSE
  ======================================================= */

  const closeChat = () => {
    setIsOpen(false);
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="message-chat-overlay"

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
            }}
          >
            <motion.div
              className="message-chat-window"

              initial={{
                opacity: 0,
                y: 35,
                scale: 0.96,
              }}

              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}

              exit={{
                opacity: 0,
                y: 35,
                scale: 0.96,
              }}

              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
            >
              {/* =================================================
                  HEADER
              ================================================= */}

              <div className="message-chat-header">
                <div className="message-header-left">

                  <button
                    className={`message-drawer-toggle ${
                      showUsers
                        ? "drawer-active"
                        : ""
                    }`}
                    onClick={
                      toggleDrawer
                    }
                    aria-label="Toggle users"
                  >
                    <PanelLeft
                      size={19}
                    />
                  </button>

                  <div className="message-header-icon">
                    <MessageCircle
                      size={19}
                    />
                  </div>

                  <div className="message-header-content">
                    <h3>
                      Messages
                    </h3>

                    <span>
                      {users.length} users
                    </span>
                  </div>
                </div>

                <div className="message-header-actions">

                  <button
                    className="message-icon-button"
                    onClick={
                      closeChat
                    }
                    aria-label="Close"
                  >
                    <X size={19} />
                  </button>

                </div>
              </div>

              {/* =================================================
                  BODY
              ================================================= */}

              <div className="message-chat-body">

                {/* =================================================
                    USERS SIDEBAR
                ================================================= */}

                <AnimatePresence
                  initial={false}
                >
                  {showUsers && (
                    <motion.aside
                      className="message-users-sidebar"

                      initial={{
                        width: 0,
                        minWidth: 0,
                        opacity: 0,
                      }}

                      animate={{
                        width: 335,
                        minWidth: 335,
                        opacity: 1,
                      }}

                      exit={{
                        width: 0,
                        minWidth: 0,
                        opacity: 0,
                      }}

                      transition={{
                        duration: 0.25,
                        ease: "easeInOut",
                      }}
                    >

                      {/* SEARCH */}

                      <div className="message-search">

                        <Search
                          size={17}
                        />

                        <input
                          type="text"
                          placeholder="Search users..."
                          value={
                            search
                          }
                          onChange={(
                            event
                          ) =>
                            setSearch(
                              event.target
                                .value
                            )
                          }
                        />

                        {usersLoading && (
                          <Loader2
                            size={16}
                            className="message-search-loader"
                          />
                        )}

                      </div>

                      {/* LABEL */}

                      <div className="conversation-label">
                        All Users
                      </div>

                      {/* USER LIST */}

                      <div className="message-users-list">

                        {/* LOADING */}

                        {usersLoading &&
                          users.length ===
                            0 && (
                            <div className="no-users">

                              <Loader2
                                size={30}
                                className="message-loading-icon"
                              />

                              <p>
                                Loading users...
                              </p>

                            </div>
                          )}

                        {/* ERROR */}

                        {!usersLoading &&
                          usersError && (
                            <div className="no-users">

                              <UserRound
                                size={32}
                              />

                              <p>
                                {usersError}
                              </p>

                              <button
                                type="button"
                                onClick={() =>
                                  fetchUsers(
                                    search
                                  )
                                }
                                className="retry-users-button"
                              >
                                <RefreshCw
                                  size={14}
                                />

                                Retry
                              </button>

                            </div>
                          )}

                        {/* USERS */}

                        {!usersError &&
                          users.map(
                            (user) => {
                              const userId =
                                user._id ||
                                user.id;

                              const isSelected =
                                String(
                                  selectedUserId
                                ) ===
                                String(
                                  userId
                                );

                              const online =
                                isUserOnline(
                                  user
                                );

                              const sidebarDate =
                                formatSidebarDateTime(
                                  user.lastMessageAt
                                );

                              return (
                                <button
                                  key={
                                    userId
                                  }
                                  className={`message-user-item ${
                                    isSelected
                                      ? "active"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    openConversation(
                                      userId
                                    )
                                  }
                                >

                                  {/* =================================
                                      AVATAR
                                  ================================= */}

                                  <div className="message-user-avatar-wrapper">

                                    <UserAvatar
                                      user={
                                        user
                                      }
                                      className="message-user-avatar"
                                    />

                                    {/* ONLINE / OFFLINE */}

                                    <span
                                      className={`online-status-dot ${
                                        online
                                          ? "online"
                                          : "offline"
                                      }`}
                                      title={
                                        online
                                          ? "Online"
                                          : "Offline"
                                      }
                                    />

                                  </div>

                                  {/* =================================
                                      USER INFO
                                  ================================= */}

                                  <div className="message-user-info">

                                    {/* NAME + DATE/TIME */}

                                    <div className="message-user-top">

                                      <strong>
                                        {
                                          user.name
                                        }
                                      </strong>

                                      {sidebarDate && (
                                        <span
                                          className="message-user-time"
                                          title={
                                            user.lastMessageAt
                                              ? new Date(
                                                  user.lastMessageAt
                                                ).toLocaleString()
                                              : ""
                                          }
                                        >
                                          {
                                            sidebarDate
                                          }
                                        </span>
                                      )}

                                    </div>

                                    {/* MESSAGE */}

                                    <div className="message-user-bottom">

                                      <p>
                                        {
                                          user.lastMessage
                                        }

                                        {!user.lastMessage &&
                                          user.email}
                                      </p>

                                      {user.unread >
                                        0 && (
                                        <span className="unread-count">
                                          {
                                            user.unread
                                          }
                                        </span>
                                      )}

                                    </div>

                                  </div>

                                </button>
                              );
                            }
                          )}

                        {/* NO USERS */}

                        {!usersLoading &&
                          !usersError &&
                          users.length ===
                            0 && (
                            <div className="no-users">

                              <UserRound
                                size={32}
                              />

                              <p>
                                No users found
                              </p>

                            </div>
                          )}

                      </div>

                    </motion.aside>
                  )}
                </AnimatePresence>

                {/* =================================================
                    CONVERSATION
                ================================================= */}

                <section className="message-conversation">

                  {/* =================================================
                      CONVERSATION HEADER
                  ================================================= */}

                  {selectedUser ? (
                    <div className="conversation-header">

                      <div className="conversation-user">

                        <div className="conversation-avatar-wrapper">

                          <UserAvatar
                            user={
                              selectedUser
                            }
                            className="conversation-avatar"
                          />

                          <span
                            className={`conversation-status-dot ${
                              isUserOnline(
                                selectedUser
                              )
                                ? "online"
                                : "offline"
                            }`}
                          />

                        </div>

                        <div className="conversation-user-details">

                          <h4>
                            {
                              selectedUser.name
                            }
                          </h4>

                          <span
                            className={
                              isUserOnline(
                                selectedUser
                              )
                                ? "status-online"
                                : "status-offline"
                            }
                          >
                            {isUserOnline(
                              selectedUser
                            )
                              ? "Online"
                              : "Offline"}
                          </span>

                        </div>

                      </div>

                      <div className="conversation-actions">

                        <button
                          type="button"
                          title="Call"
                        >
                          <Phone
                            size={17}
                          />
                        </button>

                        <button
                          type="button"
                          title="Video call"
                        >
                          <Video
                            size={18}
                          />
                        </button>

                        <button
                          type="button"
                          title="More"
                        >
                          <MoreVertical
                            size={18}
                          />
                        </button>

                      </div>

                    </div>
                  ) : (
                    <div className="conversation-header">

                      <div className="conversation-user">

                        <div className="conversation-avatar-wrapper">

                          <div className="conversation-avatar empty-avatar">
                            <UserRound
                              size={20}
                            />
                          </div>

                        </div>

                        <div className="conversation-user-details">

                          <h4>
                            Select a user
                          </h4>

                          <span>
                            Choose a conversation
                          </span>

                        </div>

                      </div>

                    </div>
                  )}

                  {/* =================================================
                      MESSAGES
                  ================================================= */}

                  <div className="messages-container">

                    {!selectedUser && (
                      <div className="no-conversation">

                        <MessageCircle
                          size={42}
                        />

                        <h4>
                          No conversation selected
                        </h4>

                        <p>
                          Select a user from the sidebar to start chatting.
                        </p>

                      </div>
                    )}

                    {selectedUser && (
                      <>
                        {/* DATE */}

                        <div className="chat-date">
                          <span>
                            Today
                          </span>
                        </div>

                        {/* MESSAGES */}

                        {(
                          messages[
                            selectedUserId
                          ] || []
                        ).map(
                          (item) => {

                            const isMine =
                              item.sender ===
                              "me";

                            return (
                              <motion.div
                                key={
                                  item.id
                                }
                                className={`message-row ${
                                  isMine
                                    ? "message-row-mine"
                                    : "message-row-user"
                                }`}
                                initial={{
                                  opacity: 0,
                                  y: 8,
                                }}
                                animate={{
                                  opacity: 1,
                                  y: 0,
                                }}
                              >

                                {!isMine && (
                                  <UserAvatar
                                    user={
                                      selectedUser
                                    }
                                    className="small-avatar"
                                  />
                                )}

                                <div
                                  className={`message-bubble ${
                                    isMine
                                      ? "message-mine"
                                      : "message-user"
                                  }`}
                                >

                                  <p>
                                    {
                                      item.text
                                    }
                                  </p>

                                  <div className="message-meta">

                                    <span>
                                      {formatDateTime(
                                        item.createdAt
                                      )}
                                    </span>

                                    {isMine && (
                                      <CheckCheck
                                        size={14}
                                      />
                                    )}

                                  </div>

                                </div>

                              </motion.div>
                            );
                          }
                        )}

                        {/* EMPTY */}

                        {(
                          messages[
                            selectedUserId
                          ] || []
                        ).length ===
                          0 && (
                          <div className="empty-messages">

                            <MessageCircle
                              size={35}
                            />

                            <p>
                              No messages yet
                            </p>

                            <span>
                              Start the conversation
                            </span>

                          </div>
                        )}

                      </>
                    )}

                  </div>

                  {/* =================================================
                      INPUT
                  ================================================= */}

                  <div className="message-input-area">

                    <div className="message-input-wrapper">

                      <textarea
                        value={
                          message
                        }
                        onChange={(
                          event
                        ) =>
                          setMessage(
                            event.target
                              .value
                          )
                        }
                        onKeyDown={
                          handleKeyDown
                        }
                        placeholder={
                          selectedUser
                            ? "Write a message..."
                            : "Select a user first..."
                        }
                        rows={1}
                        disabled={
                          !selectedUser ||
                          sending
                        }
                      />

                      <motion.button
                        type="button"
                        className="send-message-button"
                        onClick={
                          sendMessage
                        }
                        disabled={
                          !message.trim() ||
                          !selectedUser ||
                          sending
                        }
                        whileHover={{
                          scale: 1.04,
                        }}
                        whileTap={{
                          scale: 0.94,
                        }}
                      >

                        {sending ? (
                          <Loader2
                            size={17}
                            className="message-send-loader"
                          />
                        ) : (
                          <Send
                            size={17}
                          />
                        )}

                      </motion.button>

                    </div>

                    <div className="input-hint">
                      Press Enter to send
                    </div>

                  </div>

                </section>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default MessageChat;


