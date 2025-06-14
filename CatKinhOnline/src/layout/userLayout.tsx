import { Footer } from "@/components/personal/footer";
import { Header } from "@/components/personal/header";
import NavigationComponent from "@/components/personal/navigation";
import { Toaster } from "@/components/ui/toaster";
import type { ReactNode } from "react";

type LayoutUserProps = {
  children: ReactNode;
};

function LayoutUser({ children }: LayoutUserProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-emerald-50 to-green-300">
      <Header></Header>
      <NavigationComponent></NavigationComponent>
      <main>{children}</main>
      <Footer></Footer>
      <Toaster></Toaster>
    </div>
  );
}

export default LayoutUser;
