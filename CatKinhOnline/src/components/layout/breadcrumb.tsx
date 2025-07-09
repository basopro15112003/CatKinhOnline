import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function BreadcrumbComponent() {
  return (
    <>
      {/* Breadcum - Start */}
      <section className="mx-auto mb-10 max-w-7xl">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
            </BreadcrumbItem>
            {location.pathname === "/CatKinhOnline/order" && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Đặt cắt kính</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
            {location.pathname === "/CatKinhOnline/account" && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Tài khoản</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}{location.pathname === "/CatKinhOnline/about" && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Giới thiệu</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </section>
      {/* Breadcum - End */}
    </>
  );
}
