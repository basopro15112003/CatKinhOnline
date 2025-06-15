import { Link } from "react-router-dom";

function NavigationComponent() {
  return (
    <>
      <nav className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex justify-center">
          <div className="rounded-full border border-emerald-100 bg-white/70 px-8 py-3 shadow-lg backdrop-blur-md">
            <div className="flex space-x-8">
              <Link
                to={"/"}
                className="group relative font-medium text-emerald-700 transition-colors duration-300 hover:text-emerald-900"
              >
                Trang chủ
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to={"/order"}
                className="group relative font-medium text-emerald-700 transition-colors duration-300 hover:text-emerald-900"
              >
                Đặt hàng
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>{" "}
              <Link
                to={"/about"}
                className="group relative font-medium text-emerald-700 transition-colors duration-300 hover:text-emerald-900"
              >
                Giới thiệu
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
export default NavigationComponent;
