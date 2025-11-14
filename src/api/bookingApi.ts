import toast from "react-hot-toast";
import type { bookingFormType } from "../types/bookingTypes";

type FetchOptionInput = {
  httpMethod: string;
  parameterMethod: string;
  type?: string;
  id?: string;
  headerBody?: string;
  body?: unknown;
};

const GAS_URL = import.meta.env.VITE_GAS_URL;

const fetchOptions = (options: FetchOptionInput): RequestInit => ({
  method: options.httpMethod,
  mode: "no-cors",
  cache: "no-cache",
  headers: {
    "Content-Type": "application/json",
  },
  body: options.body
    ? JSON.stringify({
        _method: options.parameterMethod,
        type: options.type,
        id: options.id,
        ...(options.headerBody
          ? { [options.headerBody]: options.body }
          : options.body),
      })
    : undefined,
});

// POST createBooking
export const createBookingApi = async (data: bookingFormType) => {
  return await fetch(
    GAS_URL,
    fetchOptions({
      httpMethod: "POST",
      parameterMethod: "POST",
      type: "booking",
      headerBody: "bookingData",
      body: data,
    })
  );
};

// GEt GetAllBookings
export const fetchBookings = async () => {
  try {
    const response = await fetch(
      `${GAS_URL}?type=booking&action=getAllBookings`
    );
    if (!response.ok) toast.error("Network Error");
    return await response.json();
  } catch (error) {
    console.log(error);
    toast.error("Failed to fetching bookings");
  }
};

export const postUpdateBookingStatus = async (
  book_id: string,
  status: string
) => {
  try {
    const payload = fetchOptions({
      httpMethod: "POST",
      parameterMethod: "PUT",
      type: "booking",
      id: book_id,
      body: { status: status },
    });
    return await fetch(GAS_URL, payload);
  } catch (error) {
    console.error("Error to update booking status: ", error);
    return { message: "Failed to update booking status" };
  }
};
