import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications(res.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/notifications/read/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotifications(
        notifications.map((n) =>
          n.id === id ? { ...n, isRead: true } : n
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  if (loading) return <div>Loading notifications...</div>;

  if (notifications.length === 0) return <div>No notifications found</div>;

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "auto",
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>
        Your Notifications
      </h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {notifications.map((notif) => {
          const isUnread = !notif.isRead;
          let actionText = "";

          if (notif.type === "FOLLOW") actionText = "started following you";
          else if (notif.type === "LIKE") actionText = "liked your post";
          else if (notif.type === "COMMENT") actionText = "commented on your post";

          return (
            <li
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              title="Click to mark as read"
              style={{
                backgroundColor: isUnread ? "#e6f7ff" : "#f9f9f9",
                borderLeft: isUnread
                  ? "4px solid #1890ff"
                  : "4px solid transparent",
                marginBottom: 12,
                padding: 15,
                borderRadius: 8,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                transition: "background-color 0.3s",
              }}
            >
              {/* Sender Avatar */}
              <img
                src={notif.senderImage || "https://via.placeholder.com/48"}
                alt={notif.senderName}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  marginRight: 15,
                  objectFit: "cover",
                }}
              />

              <div style={{ flex: 1 }}>
                {/* Sender Name + Action */}
                <div
                  style={{
                    fontWeight: isUnread ? "700" : "500",
                    fontSize: 16,
                  }}
                >
                  {notif.senderName}{" "}
                  <span style={{ color: "#555" }}>{actionText}</span>
                </div>

                {/* Post ID if available */}
                {notif.twitId && (
                  <div
                    style={{
                      fontSize: 14,
                      color: "#888",
                      marginTop: 4,
                      fontStyle: "italic",
                    }}
                  >
                    Post ID: {notif.twitId}
                  </div>
                )}

                {/* Time */}
                <div
                  style={{
                    fontSize: 12,
                    color: "#aaa",
                    marginTop: 6,
                    fontStyle: "normal",
                  }}
                >
                  {formatDistanceToNow(new Date(notif.timestamp), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NotificationPage;
