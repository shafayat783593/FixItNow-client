"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  Save, 
  Clock, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  XCircle, 
  Loader2 
} from "lucide-react";
import { 
  getTechnicianAvailability, 
  updateTechnicianAvailability, 
  IAvailabilitySlot 
} from "@/lib/api/technician";
import { toast } from "sonner";

const DAYS_OF_WEEK = [
  { id: 1, name: "Monday" },
  { id: 2, name: "Tuesday" },
  { id: 3, name: "Wednesday" },
  { id: 4, name: "Thursday" },
  { id: 5, name: "Friday" },
  { id: 6, name: "Saturday" },
  { id: 0, name: "Sunday" },
];

export default function TechnicianAvailabilityPage() {
  const [slots, setSlots] = useState<IAvailabilitySlot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        setLoading(true);
        const response = await getTechnicianAvailability();

        if (response.success && Array.isArray(response.data) && response.data.length > 0) {
          setSlots(response.data);
        } else {
          setDefaultSlots();
        }
      } catch (error) {
        console.error("Error loading availability:", error);
        setDefaultSlots();
      }  {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, []);

  const setDefaultSlots = () => {
    const defaults: IAvailabilitySlot[] = DAYS_OF_WEEK.map((day) => ({
      dayOfWeek: day.id,
      startTime: "09:00",
      endTime: "17:00",
      isAvailable: day.id !== 0 && day.id !== 6,
    }));
    setSlots(defaults);
  };

  const toggleDayAvailability = (dayOfWeek: number) => {
    setSlots((prev) => {
      const daySlots = prev.filter((s) => s.dayOfWeek === dayOfWeek);
      if (daySlots.length === 0) {
        return [...prev, { dayOfWeek, startTime: "09:00", endTime: "17:00", isAvailable: true }];
      }
      const currentStatus = daySlots.some((s) => s.isAvailable);
      return prev.map((s) =>
        s.dayOfWeek === dayOfWeek ? { ...s, isAvailable: !currentStatus } : s
      );
    });
  };

  const addTimeSlot = (dayOfWeek: number) => {
    setSlots((prev) => [
      ...prev,
      { dayOfWeek, startTime: "14:00", endTime: "18:00", isAvailable: true },
    ]);
  };

  const removeTimeSlot = (indexToRemove: number) => {
    setSlots((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const updateSlotValue = (
    indexToUpdate: number,
    field: "startTime" | "endTime",
    value: string
  ) => {
    setSlots((prev) =>
      prev.map((slot, index) =>
        index === indexToUpdate ? { ...slot, [field]: value } : slot
      )
    );
  };

  // Save schedule using API helper
  const handleSave = async () => {
    try {
      setSaving(true);

      const activeSlots = slots.filter((slot) => slot.isAvailable);
      const res = await updateTechnicianAvailability(activeSlots);

      if (res.success) {
        toast.success( res.message || "Schedule updated successfully!");
      }
    } catch (err: any) {
      toast.error(err.error || "Failed to update schedule.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
            <CalendarIcon className="w-6 h-6 text-primary" /> Working Hours & Availability
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your daily working hours and break schedules.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium px-5 py-2.5 rounded-lg shadow transition disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Schedule
        </button>
      </div>

 
      <div className="bg-white rounded-xl shadow-sm border divide-y">
        {DAYS_OF_WEEK.map((day) => {
          const daySlotsWithIndex = slots
            .map((slot, originalIndex) => ({ ...slot, originalIndex }))
            .filter((slot) => slot.dayOfWeek === day.id);

          const isDayActive = daySlotsWithIndex.some((s) => s.isAvailable);

          return (
            <div key={day.id} className="p-4 md:p-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex items-center gap-3 min-w-[160px]">
                <input
                  type="checkbox"
                  id={`day-${day.id}`}
                  checked={isDayActive}
                  onChange={() => toggleDayAvailability(day.id)}
                  className="w-5 h-5 accent-primary rounded cursor-pointer"
                />
                <label htmlFor={`day-${day.id}`} className="font-semibold text-gray-700 cursor-pointer">
                  {day.name}
                </label>
              </div>

              <div className="flex-1 space-y-3">
                {isDayActive ? (
                  daySlotsWithIndex.map(({ startTime, endTime, originalIndex }) => (
                    <div key={originalIndex} className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-2 bg-gray-50 border rounded-lg p-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <input
                          type="time"
                          value={startTime}
                          onChange={(e) => updateSlotValue(originalIndex, "startTime", e.target.value)}
                          className="bg-transparent text-sm focus:outline-none font-medium text-gray-700"
                        />
                        <span className="text-gray-400 text-sm">-</span>
                        <input
                          type="time"
                          value={endTime}
                          onChange={(e) => updateSlotValue(originalIndex, "endTime", e.target.value)}
                          className="bg-transparent text-sm focus:outline-none font-medium text-gray-700"
                        />
                      </div>

                      <button
                        onClick={() => removeTimeSlot(originalIndex)}
                        className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition"
                        title="Remove Slot"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <span className="text-sm text-gray-400 italic">Unavailable</span>
                )}
              </div>

              {isDayActive && (
                <button
                  onClick={() => addTimeSlot(day.id)}
                  className="flex items-center gap-1 text-sm text-primary font-medium hover:underline pt-1"
                >
                  <Plus className="w-4 h-4" /> Add Slot
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}