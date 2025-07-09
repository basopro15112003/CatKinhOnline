import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Login } from "@/pages/common/login";
import { Register } from "@/pages/common/register";

export function Footer() {
  const [showForm, setShowForm] = useState(false);
  const email = sessionStorage.getItem("email");

  return (
    <>
      <footer className="bg-gradient-to-br from-gray-900 via-emerald-900 to-teal-900 px-4 py-8 text-white print:hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 rounded-2xl md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-2xl font-semibold">
              Nhôm Kính Quốc Thuần
            </h3>
            <p className="mb-2 flex items-center gap-2 text-sm">
              <MapPin size={20} />
              227 Phong Điền, TP Cần Thơ, Việt Nam
            </p>
            <p className="mb-2 flex items-center gap-2 text-sm">
              <Mail size={20} /> quochoangnguyen2003ct@gmail.com
            </p>
            <p className="mb-2 flex items-center gap-2 text-sm">
              <Phone size={20} /> 0939 105 522
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
                <a
                  href="https://zalo.me/0939105522"
                  target="_blank"
                  className="hover:underline"
                >
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-2xl font-semibold">Tài khoản</h4>
            <ul className="space-y-1 text-sm">
              {!email ? (
                <>
                  {" "}
                  <li className="mb-2">
                    <button
                      name="btnLoginFooter"
                      className="cursor-pointer hover:underline"
                      onClick={() => {
                        setShowForm(true);
                      }}
                    >
                      Đăng nhập
                    </button>
                  </li>
                </>
              ) : (
                <>
                  {" "}
                  <li className="mb-2">
                    <Link to={"/account"} className="hover:underline">
                      Tài khoản
                    </Link>
                  </li>
                </>
              )}

              <li className="mb-2">
                <Link to={"/order"} className="hover:underline">
                  Đặt Đơn
                </Link>
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
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
          <Tabs defaultValue="account" className="w-full max-w-xl items-center">
            <TabsList className="mr-auto">
              <TabsTrigger value="account">Đăng nhập</TabsTrigger>
              <TabsTrigger value="password">Đăng ký</TabsTrigger>
            </TabsList>
            <TabsContent className="w-sm md:w-full" value="account">
              <Login setShowForm={setShowForm} />
            </TabsContent>
            <TabsContent className="w-sm md:w-full" value="password">
              <Register setShowForm={setShowForm} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
}
