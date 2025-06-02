import { Contact , Receipt , CircleDollarSign ,  LogOut } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Quản lý giá",
    url: "/CatKinhOnline/admin",
    icon: CircleDollarSign  ,
  },
  {
    title: "Quản lý Đơn hàng",
    url: "/admin/orders",
    icon: Receipt,
  },
  {
    title: "Quản lý khách hàng",
    url: "/admin/customer",
    icon: Contact ,
  },

];

export function AppSidebar() {
  return (
    <Sidebar className=" overflow-hidden rounded-2xl ">
      <SidebarContent className="bg-gray-200">
        <SidebarGroup>
          <SidebarGroupLabel className="dark:text-black" >Quản lý Tiệm Kính</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a className="dark:text-black dark:hover:text-white" href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
                    <a href="">
                        <LogOut></LogOut>
                      <span>Đăng xuất</span>
                    </a>
                  </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
