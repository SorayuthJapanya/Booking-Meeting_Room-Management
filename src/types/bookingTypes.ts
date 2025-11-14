export interface IBookingData {
  booking_id: string;
  room_id: string;
  booker: string;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface bookingFormType {
  roomId: string | undefined;
  booker: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
}
