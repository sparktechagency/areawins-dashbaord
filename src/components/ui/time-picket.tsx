"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

interface TimePickerProps {
  value?: string;
  onChange: (time: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  format?: "12" | "24";
  minuteStep?: number;
  id?: string;
  name?: string;
}

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  placeholder = "Select time",
  className = "",
  disabled = false,
  format = "24",
  minuteStep = 1,
  id,
  name,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState<number>(0);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);
  const [selectedPeriod, setSelectedPeriod] = useState<"AM" | "PM">("AM");
  const pickerRef = useRef<HTMLDivElement>(null);
  const hourScrollRef = useRef<HTMLDivElement>(null);
  const minuteScrollRef = useRef<HTMLDivElement>(null);

  // Parse initial value
  useEffect(() => {
    if (value) {
      // Check if value is in 12h format "HH:MM AM/PM" or 24h "HH:MM"
      const is12HourFormat = value.match(/(\d+):(\d+)\s*(AM|PM)/i);

      let hours = 0;
      let minutes = 0;
      let period: "AM" | "PM" = "AM";

      if (is12HourFormat) {
        const [, h, m, p] = is12HourFormat;
        hours = parseInt(h, 10);
        minutes = parseInt(m, 10);
        period = p.toUpperCase() as "AM" | "PM";

        // Convert to 24h internally for easier logic
        if (period === "PM" && hours !== 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;
      } else {
        const parts = value.split(":");
        if (parts.length >= 2) {
          hours = parseInt(parts[0], 10);
          minutes = parseInt(parts[1], 10);
        }
      }

      setSelectedMinute(minutes);

      if (format === "12") {
        if (hours === 0) {
          setSelectedHour(12);
          setSelectedPeriod("AM");
        } else if (hours === 12) {
          setSelectedHour(12);
          setSelectedPeriod("PM");
        } else if (hours > 12) {
          setSelectedHour(hours - 12);
          setSelectedPeriod("PM");
        } else {
          setSelectedHour(hours);
          setSelectedPeriod("AM");
        }
      } else {
        setSelectedHour(hours);
      }
    }
  }, [value, format]);

  const updateTime = (hour: number, minute: number, period: "AM" | "PM") => {
    let finalHour = hour;

    if (format === "12") {
      if (period === "PM" && hour !== 12) {
        finalHour = hour + 12;
      } else if (period === "AM" && hour === 12) {
        finalHour = 0;
      }
    }

    // Format output string based on the requested format
    let timeString = "";
    if (format === "12") {
      const displayHour =
        finalHour === 0 ? 12 : finalHour > 12 ? finalHour - 12 : finalHour;
      const displayPeriod = finalHour >= 12 ? "PM" : "AM";
      timeString = `${displayHour}:${minute.toString().padStart(2, "0")} ${displayPeriod}`;
    } else {
      timeString = `${finalHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    }

    onChange(timeString);
  };

  const handleHourClick = (hour: number) => {
    setSelectedHour(hour);
    updateTime(hour, selectedMinute, selectedPeriod);
  };

  const handleMinuteClick = (minute: number) => {
    setSelectedMinute(minute);
    updateTime(selectedHour, minute, selectedPeriod);
  };

  const handlePeriodClick = (period: "AM" | "PM") => {
    setSelectedPeriod(period);
    updateTime(selectedHour, selectedMinute, period);
  };

  const generateHours = () => {
    if (format === "12") {
      return Array.from({ length: 12 }, (_, i) => i + 1);
    }
    return Array.from({ length: 24 }, (_, i) => i);
  };

  const generateMinutes = () => {
    const minutes = [];
    for (let i = 0; i < 60; i += minuteStep) {
      minutes.push(i);
    }
    return minutes;
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-scroll logic to keep selected items in view
  useEffect(() => {
    if (isOpen) {
      // Small timeout to allow render
      setTimeout(() => {
        if (hourScrollRef.current) {
          const selectedEl = hourScrollRef.current.querySelector(
            `[data-value="${selectedHour}"]`,
          );
          if (selectedEl) {
            selectedEl.scrollIntoView({ block: "center", behavior: "smooth" });
          }
        }
        if (minuteScrollRef.current) {
          const selectedEl = minuteScrollRef.current.querySelector(
            `[data-value="${selectedMinute}"]`,
          );
          if (selectedEl) {
            selectedEl.scrollIntoView({ block: "center", behavior: "smooth" });
          }
        }
      }, 10);
    }
  }, [isOpen]);

  const displayValue = value || "";

  return (
    <div ref={pickerRef} className={`relative w-full`}>
      {/* Hidden input for form submission if needed */}
      {name && <input type="hidden" name={name} value={value || ""} />}

      <button
        type="button"
        id={id}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "flex items-center h-12 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      >
        {displayValue ? (
          <span className="text-gray-900 font-medium">{displayValue}</span>
        ) : (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 left-0 w-full sm:w-[320px] bg-white border border-gray-200 rounded-md shadow-xl p-0 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200 origin-top-left">
          <div className="flex divide-x divide-gray-100 h-64">
            {/* Hours Column */}
            <div className="flex-1 flex flex-col">
              <div className="py-2 text-xs font-semibold text-gray-500 bg-gray-50 text-center border-b border-gray-100 sticky top-0 z-10 w-full ">
                Hour
              </div>
              <div
                ref={hourScrollRef}
                className="flex-1 overflow-y-auto w-full scrollbar-none"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {generateHours().map((hour) => (
                  <button
                    type="button"
                    key={hour}
                    data-value={hour}
                    onClick={() => handleHourClick(hour)}
                    className={cn(
                      "w-full px-4 py-2.5 text-center text-sm transition-colors hover:bg-gray-50 cursor-pointer",
                      selectedHour === hour
                        ? "bg-primary/10 text-primary font-bold hover:bg-primary/20"
                        : "text-gray-700",
                    )}
                  >
                    {hour.toString().padStart(2, "0")}
                  </button>
                ))}
              </div>
            </div>

            {/* Minutes Column */}
            <div className="flex-1 flex flex-col">
              <div className="py-2 text-xs font-semibold text-gray-500 bg-gray-50 text-center border-b border-gray-100 sticky top-0 z-10 w-full tracking-wider">
                Minute
              </div>
              <div
                ref={minuteScrollRef}
                className="flex-1 overflow-y-auto w-full scrollbar-none"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {generateMinutes().map((minute) => (
                  <button
                    type="button"
                    key={minute}
                    data-value={minute}
                    onClick={() => handleMinuteClick(minute)}
                    className={cn(
                      "w-full px-4 py-2.5 text-center text-sm transition-colors hover:bg-gray-50 cursor-pointer",
                      selectedMinute === minute
                        ? "bg-primary/10 text-primary font-bold hover:bg-primary/20"
                        : "text-gray-700",
                    )}
                  >
                    {minute.toString().padStart(2, "0")}
                  </button>
                ))}
              </div>
            </div>

            {/* AM/PM for 12-hour format */}
            {format === "12" && (
              <div className="flex-1 flex flex-col bg-gray-50/30">
                <div className="py-2 text-xs font-semibold text-gray-500 bg-gray-50 text-center border-b border-gray-100 sticky top-0 z-10 w-full ">
                  Period
                </div>
                <div className="flex flex-col justify-center h-full p-2 gap-2">
                  {["AM", "PM"].map((period) => (
                    <button
                      type="button"
                      key={period}
                      onClick={() => handlePeriodClick(period as "AM" | "PM")}
                      className={cn(
                        "w-full py-2 rounded-md text-sm font-semibold transition-all border cursor-pointer border-gray-200",
                        selectedPeriod === period
                          ? "bg-primary text-white border-primary shadow-md transform scale-105"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300",
                      )}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
