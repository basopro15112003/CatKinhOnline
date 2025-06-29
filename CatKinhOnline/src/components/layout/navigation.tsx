import { Link, useLocation } from "react-router-dom";

function NavigationComponent() {
  const email = localStorage.getItem("email");
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getLinkClasses = (path: string) => {
    const baseClasses = "group relative font-medium transition-colors duration-300";
    const activeClasses = "text-emerald-900 font-semibold";
    const inactiveClasses = "text-emerald-700 hover:text-emerald-900";
    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  return (
    <>
      <nav className="md:sticky top-0 z-50 mx-auto max-w-7xl px-4 py-4 print:hidden">
        <div className="flex justify-center">
          <div className="rounded-full border border-emerald-200 bg-white/70 px-8 py-3 shadow-sm backdrop-blur-md ">
            <div className="flex space-x-3 md:space-x-8">
              <Link
                to={"/"}
                className={getLinkClasses("/")}
              >
                Trang chủ
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-300 ${
                  isActive("/") ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </Link>
              <Link
                to={"/order"}
                className={getLinkClasses("/order")}
              >
                Đặt hàng
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-300 ${
                  isActive("/order") ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </Link>{" "}
              {email && (
                <Link
                  to={"/account"}
                  className={getLinkClasses("/account")}
                >
                  Tài khoản
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-300 ${
                    isActive("/account") ? "w-full" : "w-0 group-hover:w-full"
                  }`}></span>  
                </Link>
              )}  
              <Link
                to={"/about"}
                className={getLinkClasses("/about")}
              >
                Giới thiệu
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-300 ${
                  isActive("/about") ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
export default NavigationComponent;
