import React, { useEffect, useState } from "react";
import type { bookingFormType } from "../../types/bookingTypes";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { createBookingApi } from "../../api/bookingApi";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface BookingFormProps {
  roomId: string | undefined;
  roomName: string | undefined;
}

const BookingForm: React.FC<BookingFormProps> = ({ roomId, roomName }) => {
  const [bookingFormData, setBookingFormData] = useState<bookingFormType>({
    roomId: roomId,
    booker: "",
    title: "",
    description: "",
    startTime: "09:00",
    endTime: "09:00",
  });

  const { mutate: createBooking, isPending: createBookingLoading } =
    useMutation({
      mutationFn: (data: bookingFormType) => createBookingApi(data),
      onSuccess: () => toast.success("Booking successfully!"),
      onError: () => toast.error("Failed to booking!!"),
    });

  const handleBookingFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmitBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];

    const payload = {
      ...bookingFormData,
      startTime: `${today}T${bookingFormData.startTime}`,
      endTime: `${today}T${bookingFormData.endTime}`,
    };

    createBooking(payload);
  };

  useEffect(() => {
    if (roomId) setBookingFormData((prev) => ({ ...prev, roomId: roomId }));
  }, [roomId]);

  return (
    <motion.form
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      onSubmit={handleSubmitBooking}
      className="shadow-md h-max sticky top-16 rounded-xl p-6 space-y-6 text-textSecondary"
    >
      <h2 className="text-xl text-textPrimary font-medium text-center pb-4 border-b border-gray-300">
        {roomName}
      </h2>

      {/* Booker */}
      <div className="flex flex-col gap-2">
        <label htmlFor="booker">Email</label>
        <input
          type="email"
          id="booker"
          name="booker"
          onChange={handleBookingFormChange}
          value={bookingFormData.booker}
          placeholder="Enter your email"
          className="w-full px-4 py-2 text-textPrimary placeholder:text-textSecondary text-base rounded-md outline-none border border-borderColor hover:border-primary focus:border-primary valid:border-primary duration-300"
          required
        />
      </div>

      {/* Title */}
      <div className="flex flex-col gap-2">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter a title"
          onChange={handleBookingFormChange}
          value={bookingFormData.title}
          className="w-full px-4 py-2 text-textPrimary placeholder:text-textSecondary text-base rounded-md outline-none border border-borderColor hover:border-primary focus:border-primary valid:border-primary duration-300"
          required
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Enter a description"
          onChange={handleBookingFormChange}
          value={bookingFormData.description}
          className="w-full px-4 py-2 text-textPrimary placeholder:text-textSecondary text-base rounded-md outline-none border border-borderColor hover:border-primary focus:border-primary valid:border-primary duration-300"
          required
        />
      </div>

      {/* StartTime */}
      <div className="flex flex-col gap-2">
        <label htmlFor="startTime">Start-time</label>
        <input
          type="time"
          id="startTime"
          name="startTime"
          min="09:00"
          max="18:00"
          onChange={handleBookingFormChange}
          value={bookingFormData.startTime}
          className="w-full px-4 py-2 text-textPrimary placeholder:text-textSecondary text-base rounded-md outline-none border border-borderColor hover:border-primary focus:border-primary valid:border-primary duration-300"
          required
        />
      </div>

      {/* EndTime */}
      <div className="flex flex-col gap-2">
        <label htmlFor="endTime">End-time</label>
        <input
          type="time"
          id="endTime"
          name="endTime"
          min="09:00"
          max="18:00"
          onChange={handleBookingFormChange}
          value={bookingFormData.endTime}
          className="w-full px-4 py-2 text-textPrimary placeholder:text-textSecondary text-base rounded-md outline-none border border-borderColor hover:border-primary focus:border-primary valid:border-primary duration-300"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center p-2 rounded-md bg-primary hover:bg-primaryLight active:bg-primaryDark duration-200 cursor-pointer text-white"
      >
        {createBookingLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          "Book Now"
        )}
      </button>
    </motion.form>
  );
};

export default BookingForm;
