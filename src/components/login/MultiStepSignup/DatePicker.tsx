import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

import { format } from "date-fns";
import { classNames } from "@utils/classNames";
import ReactDatePicker from "react-datepicker";
import { Timestamp } from "firebase/firestore";

interface DatePickerProps {
  error?: string | null;
  value: Date | undefined | null;
  onChangeDate: (newDate: Date) => void;
}

export const DatePicker = ({ value, error, onChangeDate }: DatePickerProps) => {
  const [startDate, setStartDate] = useState(value);

  const handleChangeDate = (date: Date) => {
    setStartDate(date);
    onChangeDate(date);
  };

  const dateInString = format(new Date(startDate as Date), "dd/MM/yyyy");

  return (
    <div>
      <label htmlFor="birthday" className="text-sm text-zinc-500">
        Birthday
        <span className={error ? "not-sr-only text-red-600" : "sr-only"}>
          {error}
        </span>
      </label>
      <ReactDatePicker
        id="birthday"
        autoComplete="birthday"
        selected={startDate}
        showYearDropdown
        value={dateInString}
        scrollableYearDropdown
        onChange={handleChangeDate}
        dateFormat="dd/MM/yyyy"
        className={classNames(
          error ? "border-red-600 placeholder:text-red-600" : "",
          "px-3 py-2 w-fit border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
        )}
      />
    </div>
  );
};
