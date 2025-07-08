import * as signalR from "@microsoft/signalr";
import { useEffect, useState } from "react";

type Order = {
  id: number;
  fullName: string;
  status: string;
  totalAmount: number;
  createdAt: string;
};

type Notification = {
  id: number;
  message: string;
  order: Order;
};

export function useOrderNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7057/api/orderHub") // Đổi thành domain backend của bạn
      .withAutomaticReconnect()
      .build();
      connection.start().then(() => {
      connection.on("OrderUpdated", (order) => {
        setNotifications((prev) => [
          { id: Date.now(), message: "Có đơn hàng mới!", order },
          ...prev,
        ]);
      });
    });
    return () => {
      connection.stop();
    };
  }, []);

  return { notifications, showPanel, setShowPanel };
}