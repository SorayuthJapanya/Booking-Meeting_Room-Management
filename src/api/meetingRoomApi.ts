import toast from "react-hot-toast";
import type {
  IAddMeetingRoomType,
  IEditMeetingRoomType,
} from "../types/meetingRoomTypes";

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
    : JSON.stringify({
        _method: options.parameterMethod,
        type: options.type,
        id: options.id,
      }),
});

// getAllMeetingRoom
export const fetchMeetingRooms = async () => {
  try {
    const response = await fetch(
      `${GAS_URL}?type=meeting&action=getAllMeetingRoom`
    );
    if (!response.ok) return toast.error("Network Error");
    const meetingRooms = await response.json();
    return meetingRooms;
  } catch (error) {
    console.error("Error fetching meeting rooms: ", error);
    return [];
  }
};

// getMeetingRoom
export const fetchMeetingRoom = async (room_id: string | null) => {
  try {
    const response = await fetch(
      `${GAS_URL}?type=meeting&action=getMeetingRoom&id=${room_id}`
    );
    if (!response.ok) return toast.error("Network Error");
    const meetingRoom = await response.json();
    return meetingRoom;
  } catch (error) {
    console.error("Error fetching meeting room: ", error);
    return [];
  }
};

// POST createMeetingRoom
export const postCreateMeetingRoomAPI = async (data: IAddMeetingRoomType) => {
  try {
    return await fetch(
      GAS_URL,
      fetchOptions({
        httpMethod: "POST",
        parameterMethod: "POST",
        type: "meeting",
        headerBody: "createData",
        body: data,
      })
    );
  } catch (error) {
    console.error("Error to create meeting room: ", error);
    return { message: "Failed to create meeting room" };
  }
};

export const postUpdateMeetingRoomAPI = async (
  room_id: string,
  data: IEditMeetingRoomType
) => {
  try {
    return await fetch(
      GAS_URL,
      fetchOptions({
        httpMethod: "POST",
        parameterMethod: "PUT",
        type: "meeting",
        id: room_id,
        headerBody: "updateData",
        body: data,
      })
    );
  } catch (error) {
    console.error("Error to update meeting room: ", error);
    return { message: "Failed to update meeting room" };
  }
};

export const postDeleteMeetingRoomAPI = async (room_id: string) => {
  try {
    const payload = fetchOptions({
      httpMethod: "POST",
      parameterMethod: "DELETE",
      type: "meeting",
      id: room_id,
    });
    return await fetch(GAS_URL, payload);
  } catch (error) {
    console.error("Error to delete meeting room: ", error);
    return { message: "Failed to delete meeting room" };
  }
};
