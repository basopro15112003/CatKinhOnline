import { Link } from "react-router-dom";

function NavigationComponent() {
  return (
    <>
      <section className="mx-auto mb-10 flex w-7xl justify-center space-x-7 overflow-hidden rounded-2xl bg-green-50 p-1">
        <Link
          to="/"
          className="text-base font-semibold hover:text-green-800 hover:underline"
        >
          {" "}
          Trang chủ
        </Link>
        <Link
          to={"/order"}
          className="text-base font-semibold hover:text-green-800 hover:underline"
        >
          Đặt hàng
        </Link>
        <Link
          to="/about"
          className="text-base font-semibold hover:text-green-800 hover:underline"
        >
          Giới thiệu
        </Link>
      </section>
    </>
  );
}
export default NavigationComponent;
