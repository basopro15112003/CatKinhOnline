import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

export function Footer() {
  return (
    <>
      <footer className="bg-gradient-to-br from-gray-900 via-emerald-900 to-teal-900 text-white py-8 px-4">
        <div className="max-w-7xl rounded-2xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-2xl font-semibold mb-4">
              Tiệm kính Quốc Hoàng
            </h3>
            <p className="flex items-center gap-2 text-sm mb-2">
              <MapPin size={20} />
              227 Phong Điền, TP Cần Thơ, Việt Nam
            </p>
            <p className="flex items-center gap-2 text-sm mb-2">
              <Mail size={20} /> quochoangnguyen2003ct@gmail.com
            </p>
            <p className="flex items-center gap-2 text-sm mb-2">
              <Phone size={20} /> 0901 234 567
            </p>
          </div>

          <div>
            <h4 className="text-2xl font-semibold mb-4 ">Liên kết</h4>
            <ul className="space-y-1 text-sm">
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Giới thiệu
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Liên hệ
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Chính sách bảo mật
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-2xl font-semibold mb-4 ">Tài khoản</h4>
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
            <h4 className="text-2xl font-semibold mb-4">
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
        <div className="text-center text-xs text-white mt-7">
          © 2025 QuocHoang. All rights reserved.
        </div>
      </footer>
    </>
  );
}
