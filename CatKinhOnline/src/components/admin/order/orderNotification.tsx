import { useOrderNotification } from "./useOrderNotification";
import { Bell } from "lucide-react";

export function OrderNotification() {
  const { notifications, showPanel, setShowPanel } = useOrderNotification();
  console.log(notifications);
  return (
    <div>
      {/* Nút chuông thông báo */}
      <div
        className="fixed top-4 right-8 z-50 cursor-pointer"
        onClick={() => setShowPanel((v) => !v)}
      >
        <div className="relative rounded-full bg-black p-2">
          <Bell className="h-8 w-8 text-white"></Bell>
          {notifications.length > 0 && (
            <span className="absolute -top-2 right-6 rounded-full bg-red-500 px-2 text-xs font-bold text-white">
              {notifications.length}
            </span>
          )}
        </div>
      </div>

      {/* Panel xổ ra */}
      {showPanel && (
        <div className="fixed top-17 right-10 z-50 w-80 rounded-lg bg-white border-2 shadow-lg">
          <h4 className="mb-2 font-bold mt-2 ml-2 border-b border-black pb-2">Thông báo đơn hàng mới</h4>
          {notifications.length === 0 ? (
            <div className="text-gray-500 mt-2 ml-2 mb-2">Không có thông báo mới</div>
          ) : (
            <ul>
              {notifications.map((n, index) => (
                <div key={index}>
                  {index % 2 === 0 ? (
                    <li className="p-4  bg-gray-100 w-full hover:bg-gray-200">
                      <div className="text-sm ">
                        Mã đơn: <b>DH#{n.order.id}</b> - Khách hàng:{" "}
                        <span className="text-base font-bold">
                          {n.order.fullName}
                        </span>
                      </div>
                    </li>
                  ) : (
                    <li className="p-4  border-black w-full hover:bg-gray-200">
                      <div className="text-sm ">
                        Mã đơn: <b>DH#{n.order.id}</b> - Khách hàng:{" "}
                        <span className="text-base font-bold">
                          {n.order.fullName}
                        </span>
                      </div>
                    </li>
                  )}
                </div>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
