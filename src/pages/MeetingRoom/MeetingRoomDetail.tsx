import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { IMeetingRoomType } from "../../types/meetingRoomTypes";
import { Loader2, MapPin, MoveLeft, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchMeetingRoom } from "../../api/meetingRoomApi";
import { motion } from "framer-motion";
import BookingForm from "../../components/forms/BookingForm";

const MeetingRoomDetail = () => {
  const { room_id } = useParams();
  const navigate = useNavigate();

  const [meetingRoom, setMeetingRoom] = useState<IMeetingRoomType>();

  const meetingRoomFeatures = [
    { icon: MapPin, label: meetingRoom?.location },
    { icon: User, label: meetingRoom?.capacity },
  ];

  const { data: meetingRoomData, isLoading: isMeetingRoomDataLoading } =
    useQuery({
      queryKey: ["meetingRoom", room_id],
      queryFn: () => fetchMeetingRoom(room_id as string),
    });

  useEffect(() => {
    if (meetingRoomData)
      setMeetingRoom(meetingRoomData.meetingRoomData.data[0]);
  }, [meetingRoomData]);

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 my-8 sm:my-12 sm:mb-24 space-y-6">
      {isMeetingRoomDataLoading ? (
        <div className="w-full flex items-center justify-center">
          <Loader2 className="size-5 text-textSecondary animate-spin" />
        </div>
      ) : (
        <>
          <motion.button
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            onClick={() => {
              navigate(-1);
              scroll(0, 0);
            }}
            className="text-textSecondary flex items-center justify-start gap-2 cursor-pointer"
          >
            <MoveLeft className="size-5" /> Go back
          </motion.button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="md:col-span-2"
            >
              <img
                src={meetingRoom?.image_url}
                alt={meetingRoom?.roomName}
                className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md"
              />

              <div className="space-y-6">
                {/* Room name */}
                <h1 className="text-2xl sm:text-3xl text-textPrimary font-semibold">
                  {meetingRoom?.roomName}
                </h1>

                {/* Description */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-medium">Description</h3>
                  <p className="text-textSecondary">
                    {meetingRoom?.description}
                  </p>
                </div>

                {/* Features */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-medium">Features</h3>
                  <div className="w-full grid grid-cols-2 gap-6 items-center justify-center">
                    {meetingRoomFeatures.map((feature, index) => (
                      <div
                        key={index}
                        className="w-full h-20 flex flex-col items-center justify-center text-sm text-textSecondary gap-2 border border-borderColor rounded-lg px-3 py-2 hover:bg-gray-50 duration-200"
                      >
                        <feature.icon className="size-5 text-textPrimary" />
                        <p className="text-center">{feature.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            <BookingForm roomId={meetingRoom?.room_id} roomName={meetingRoom?.roomName}/>
          </div>
        </>
      )}
    </div>
  );
};

export default MeetingRoomDetail;
