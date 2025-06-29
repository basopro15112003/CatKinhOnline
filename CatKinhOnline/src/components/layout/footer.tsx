import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <>
      <footer className="bg-gradient-to-br from-gray-900 via-emerald-900 to-teal-900 px-4 py-8 text-white print:hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 rounded-2xl md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-2xl font-semibold">
              Tiệm kính Quốc Hoàng
            </h3>
            <p className="mb-2 flex items-center gap-2 text-sm">
              <MapPin size={20} />
              227 Phong Điền, TP Cần Thơ, Việt Nam
            </p>
            <p className="mb-2 flex items-center gap-2 text-sm  ">
              <Mail size={20} /> quochoangnguyen2003ct@gmail.com
            </p>
            <p className="mb-2 flex items-center gap-2 text-sm">
              <Phone size={20} /> 0901 234 567
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-2xl font-semibold">Liên kết</h4>
            <ul className="space-y-1 text-sm">
              <li className="mb-2">
                <Link to={"/about"} className="hover:underline">
                  Giới thiệu
                </Link>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-2xl font-semibold">Tài khoản</h4>
            <ul className="space-y-1 text-base">
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Đăng nhập
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Đặt Đơn
                </a>
              </li>
            </ul>
          </div>
          <div className="">
            <h4 className="mb-4 text-2xl font-semibold">
              Kết nối với chúng tôi
            </h4>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-7 text-center text-xs text-white">
          © 2025 QuocHoang. All rights reserved.
        </div>
      </footer>
    </>
  );
}
