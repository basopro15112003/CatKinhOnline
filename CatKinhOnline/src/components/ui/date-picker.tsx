import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateRangePickerProps {
  onChange?: (dates: [Date | null, Date | null]) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onChange }) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;

  return (
    <div className="w-full md:w-auto">
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={(update: [Date | null, Date | null]) => {
          setDateRange(update);
          if (onChange) {
            onChange(update);
          }
        }}
        isClearable
        dateFormat="dd/MM/yyyy"
        placeholderText="Chọn khoảng ngày"
        className="h-9 w-full rounded-md border border-gray-300 px-1 md:w-55"
        withPortal
      />{" "}
    </div>
  );
};

export default DateRangePicker;
