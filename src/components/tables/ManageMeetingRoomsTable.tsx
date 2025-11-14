import React, { useEffect, useState } from "react";
import type {
  IEditMeetingRoomType,
  IMeetingRoomType,
} from "../../types/meetingRoomTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchMeetingRooms,
  postDeleteMeetingRoomAPI,
  postUpdateMeetingRoomAPI,
} from "../../api/meetingRoomApi";
import { Edit, Eye, EyeOff, Loader2, Trash2 } from "lucide-react";
import MeetingRoomStatusTag from "../ui/MeetingRoomStatusTag";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ManageMeetingRoomsTable = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [meetingRoomsData, setMeetingRoomsData] = useState<IMeetingRoomType[]>(
    []
  );
  const [isUpdateMeetingRoomLoading, setIsUpdateMeetingRoomLoading] = useState<
    number | null
  >(null);
  const [isDeleteMeetingRoomLoading, setIsDeleteMeetingRoomLoading] = useState<
    number | null
  >(null);

  const { data: meetingRooms, isLoading: isMeetingRoomsLoading } = useQuery({
    queryKey: ["meetingRooms"],
    queryFn: () => fetchMeetingRooms(),
  });

  //  upload meeting room to sheet
  const { mutateAsync: updateMeetingRoom } = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: IEditMeetingRoomType;
    }) => await postUpdateMeetingRoomAPI(id, data),
    onSuccess: () => {
      toast.success("Update room status successfully!!");
      queryClient.invalidateQueries({ queryKey: ["meetingRooms"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutateAsync: deleteMeetingRoom } = useMutation({
    mutationFn: async (id: string) => await postDeleteMeetingRoomAPI(id),
    onSuccess: () => {
      toast.success("Delete meeting room successfully!!");
      queryClient.invalidateQueries({ queryKey: ["meetingRooms"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete meeting room");
    },
  });

  const handleClickEditMeetingRoom = (room_id: string) => {
    navigate(`/admin/edit-meetingRoom/${room_id}`);
  };

  const handleClickChangeStatus = async (
    room_id: string,
    status: string,
    index: number
  ) => {
    let changeState = "";
    setIsUpdateMeetingRoomLoading(index);

    if (status === "BOOKED" || status === "IN_USE")
      return toast.error("Please change status to AVAILABLE or UNAVAILABLE!!");

    if (status === "AVAILABLE") {
      changeState = "UNAVAILABLE";
    } else {
      changeState = "AVAILABLE";
    }
    await updateMeetingRoom({
      id: room_id as string,
      data: { status: changeState },
    });
    setIsUpdateMeetingRoomLoading(null);
  };

  const handleClickDeleteMeetingRoom = async (
    room_id: string,
    index: number
  ) => {
    const result = Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E53935",
      confirmButtonText: "Yes, delete it!",
    });

    if ((await result).isConfirmed) {
      setIsDeleteMeetingRoomLoading(index);
      await deleteMeetingRoom(room_id);
      setIsDeleteMeetingRoomLoading(null);
    }
  };

  useEffect(() => {
    if (meetingRooms) setMeetingRoomsData(meetingRooms.allMeetingRoomData.data);
  }, [meetingRooms]);
  return (
    <>
      {isMeetingRoomsLoading ? (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full text-center"
        >
          <Loader2 className="size-5 text-textSecondary animate-spin" />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col w-full h-full overflow-hidden text-textPrimary text-sm shadow-xs rounded-lg"
        >
          <table className="w-full text-center table-auto min-w-max text-sm text-textSecondary">
            <thead className="bg-gray-100">
              <tr className="border-b border-blue-gray-100 bg-blue-gray-50">
                <td className="text-start p-4 ">
                  <p>Meeting room</p>
                </td>
                <td className="p-4">
                  <p>Location</p>
                </td>
                <td className="p-4">
                  <p>Status</p>
                </td>
                <td className="p-4">
                  <p>Actions</p>
                </td>
              </tr>
            </thead>
            <tbody className="text-textPrimary">
              {meetingRoomsData.map((meetingRoom, index) => (
                <React.Fragment key={meetingRoom.room_id || index}>
                  {isUpdateMeetingRoomLoading ||
                  isDeleteMeetingRoomLoading === index ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-5 text-center border border-borderColor"
                      >
                        <div className="flex items-center justify-center">
                          <Loader2 className="size-5 text-textSecondary animate-spin" />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr className="border border-borderColor last:border-none">
                      <td className="p-4 flex items-center gap-4">
                        <img
                          src={meetingRoom.image_url}
                          alt={meetingRoom.roomName}
                          className="w-10 h-10 object-cover rounded-md"
                        />
                        <div className="flex flex-col text-start">
                          <p>{meetingRoom.roomName}</p>
                          <p className="text-textSecondary text-xs">
                            {meetingRoom.capacity} Peoples
                          </p>
                        </div>
                      </td>
                      <td>{meetingRoom.location}</td>
                      <td>
                        <MeetingRoomStatusTag status={meetingRoom.status} />
                      </td>
                      <td className="flex items-center justify-center gap-2">
                        <button
                          onClick={() =>
                            handleClickEditMeetingRoom(meetingRoom.room_id)
                          }
                          className="p-2 rounded-full hover:bg-gray-100 text-textPrimary cursor-pointer duration-300 hover:text-blue-700"
                        >
                          <Edit className="size-4" />
                        </button>
                        <button
                          onClick={() =>
                            handleClickChangeStatus(
                              meetingRoom.room_id,
                              meetingRoom.status,
                              index
                            )
                          }
                          className={`p-2 rounded-full hover:bg-gray-100 text-textPrimary cursor-pointer duration-300 ${
                            meetingRoom.status === "AVAILABLE"
                              ? "hover:text-amber-700"
                              : "hover:text-green-700"
                          } `}
                        >
                          {meetingRoom.status === "AVAILABLE" ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                        <button
                          onClick={() =>
                            handleClickDeleteMeetingRoom(
                              meetingRoom.room_id,
                              index
                            )
                          }
                          className="p-2 rounded-full hover:bg-gray-100 text-textPrimary cursor-pointer duration-300 hover:text-red-700"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </>
  );
};

export default ManageMeetingRoomsTable;
