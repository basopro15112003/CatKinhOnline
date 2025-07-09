import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Toaster } from "@/components/ui/toaster";
import type { ReactNode } from "react";

type LayoutUserProps = {
  children: ReactNode;
};

function LayoutUser({ children }: LayoutUserProps) {
  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-br from-green-200 via-emerald-50 to-green-300">
      <Header></Header>
      <main className="flex-1">{children}</main>
        <Footer></Footer>
      <Toaster></Toaster>
    </div>
  );
}

export default LayoutUser;
