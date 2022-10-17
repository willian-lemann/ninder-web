import "react-datepicker/dist/react-datepicker.css";

import ReactDatePicker from "react-datepicker";
import { useState } from "react";

interface DatePickerProps {
  value: Date | undefined;
  onChangeDate: (newDate: Date) => void;
}

export const DatePicker = ({ value, onChangeDate }: DatePickerProps) => {
  const [startDate, setStartDate] = useState(value);

  const handleChangeDate = (date: Date) => {
    setStartDate(date);
    onChangeDate(date);
  };

  return (
    <div>
      <label htmlFor="birthday" className="text-sm text-zinc-500">
        Birthday
      </label>
      <ReactDatePicker
        id="birthday"
        selected={startDate}
        onChange={handleChangeDate}
        dateFormat="dd/MM/yyyy"
        className="px-3 py-2 w-fit border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
      />
    </div>
  );
};
