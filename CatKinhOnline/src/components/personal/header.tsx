import { Login } from "@/pages/customer/login";
import { useState } from "react";
import { Button } from "../ui/button";
import { Register } from "@/pages/customer/register";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {  Sparkles, Store } from "lucide-react";

export function Header() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
        <header className="sticky top-0  z-50 backdrop-blur-sm bg-white/80 border-b border-emerald-100 shadow-sm ">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Tiệm kính Quốc Hoàng
            </h1>
          </div>
          <Button onClick={()=>setShowForm(true)}
           className="bg-gradient-to-r from-green-600 to-teal-800 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Sparkles className="w-4 h-4 mr-2" />
            Đăng nhập
          </Button>
        </div>
      </header>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
          <Tabs defaultValue="account" className="w-full max-w-xl items-center">
            <TabsList className="mr-auto">
              <TabsTrigger value="account">Đăng nhập</TabsTrigger>
              <TabsTrigger value="password">Đăng ký</TabsTrigger>
            </TabsList>
            <TabsContent className="w-full" value="account">
              <Login setShowForm={setShowForm} />
            </TabsContent>
            <TabsContent className="w-full" value="password">
              <Register setShowForm={setShowForm} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
}
