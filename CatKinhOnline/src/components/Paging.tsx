import { Button } from "./ui/button";

export default function PaginationControls({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
}: {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}) {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="aling-center mt-5 mb-2 flex justify-center space-x-10">
      <div className="flex items-center space-x-4">
        <Button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span className="text-xl font-bold">&lt;</span> Trang Trước
        </Button>
        <div className="flex flex-col h-10 md:w-40 items-center justify-center rounded-lg border-2 border-black">
          <p>{`Trang ${currentPage} trên ${totalPages}`}</p>
        </div>
        <Button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Trang Sau <span className="text-xl font-bold">&gt;</span>
        </Button>
      </div>
        <p className="items-center flex">{`Mỗi trang: ${pageSize} mục - Tổng: ${totalItems}`}</p>
    </div>
  );
}
