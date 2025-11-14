import { useEffect, useState } from "react";
import type { IEditMeetingRoomType } from "../../types/meetingRoomTypes";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchMeetingRoom,
  postUpdateMeetingRoomAPI,
} from "../../api/meetingRoomApi";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { uploadImageToCloudinary } from "../../api/uploadeImageApi";
import toast from "react-hot-toast";

const EditMeetingRoomForm = () => {
  const { room_id } = useParams();
  const navigate = useNavigate();
  const [meetingRoomFormData, setMeetingRoomFormData] =
    useState<IEditMeetingRoomType>({
      image_url: "",
      roomName: "",
      description: "",
      capacity: "",
      location: "",
      status: "",
    });

  const [meetingRoomImage, setMeetingRoomImage] = useState<string | File>("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { data: meetingRoomData, isLoading: isMeetingRoomDataLoading } =
    useQuery({
      queryKey: ["meetingRoom", room_id],
      queryFn: () => fetchMeetingRoom(room_id as string),
    });

  // upload image to cloundinary function
  const { mutateAsync: uploadImage, isPending: isImageUploading } = useMutation(
    {
      mutationFn: uploadImageToCloudinary,
    }
  );

  //  upload meeting room to sheet
  const {
    mutateAsync: updateMeetingRoom,
    isPending: isUpdateMeetingRoomLoading,
  } = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: IEditMeetingRoomType;
    }) => await postUpdateMeetingRoomAPI(id, data),
    onSuccess: () => {
      toast.success("Update meeting room successfully!!");
      navigate(-1);
    },
    onError: (error) => toast.error(error.message),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setMeetingRoomImage(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
    } else {
      setPreviewImage("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMeetingRoomFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMeetingRoomFormData((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setMeetingRoomFormData((prev) => ({
      ...prev,
      status: value,
    }));
  };

  const handleSumbitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const finalFormData = { ...meetingRoomFormData };

      // Upload image if exists
      if (meetingRoomImage) {
        const uploadResponse = await uploadImage(meetingRoomImage);
        const imageUrl = uploadResponse?.secure_url;
        console.log("Uploaded URL:", imageUrl);

        if (imageUrl) {
          finalFormData.image_url = imageUrl;
        }
      }

      await updateMeetingRoom({
        id: room_id as string,
        data: finalFormData,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to update meeting room!");
    }
  };

  useEffect(() => {
    if (meetingRoomData) {
      const meetingRoom = meetingRoomData.meetingRoomData.data[0];
      setMeetingRoomFormData({
        image_url: meetingRoom.image_url,
        roomName: meetingRoom.roomName,
        description: meetingRoom.description,
        capacity: meetingRoom.capacity,
        location: meetingRoom.location,
        status: meetingRoom.status,
      });
    }
  }, [meetingRoomData]);
  return (
    <>
      {isMeetingRoomDataLoading ? (
        <div className="w-full flex justify-center">
          <Loader2 className="size-5 text-textSecondary animate-spin" />
        </div>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onSubmit={handleSumbitForm}
          className="w-full space-y-4"
        >
          {/* Imgae section */}
          <div className="flex items-center gap-4">
            <label
              htmlFor="image_url"
              className={`min-w-[60%] h-44 rounded-md flex items-center justify-center bg-gray-50 hover:bg-blue-50 duration-300 border-2 border-dashed ${
                meetingRoomFormData.image_url || previewImage
                  ? "border-primary"
                  : "border-borderColor"
              }  hover:border-primary cursor-pointer`}
            >
              {(previewImage || meetingRoomFormData.image_url) && (
                <img
                  src={
                    previewImage ? previewImage : meetingRoomFormData.image_url
                  }
                  alt="image_url"
                  className="w-full h-full rounded-md object-cover"
                />
              )}
              <input
                type="file"
                id="image_url"
                onChange={handleFileChange}
                accept="image/*"
                hidden
              />
            </label>
            <p className="text-sm text-textSecondary font-medium">
              Upload a picture of your meeting room
            </p>
          </div>

          {/* Content section - Name */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="roomName"
              className="text-sm text-textPrimary font-medium"
            >
              Name
            </label>
            <input
              type="text"
              name="roomName"
              id="roomName"
              value={meetingRoomFormData.roomName}
              onChange={handleInputChange}
              placeholder="e.g. Room x - Innovation spacial room"
              className="p-2 rounded-md ps-4 text-textPrimary placeholder:text-textSecondary placeholder:text-sm text-base outline-none border border-borderColor hover:border-primary  valid:border-primary duration-300"
              required
            />
          </div>

          {/* Content section - Location */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="location"
                className="text-sm text-textPrimary font-medium"
              >
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={meetingRoomFormData.location}
                onChange={handleInputChange}
                placeholder="e.g. Building 2, 5th Floor"
                className="p-2 rounded-md ps-4 text-textPrimary placeholder:text-textSecondary placeholder:text-sm text-base outline-none border border-borderColor hover:border-primary  valid:border-primary duration-300"
                required
              />
            </div>

            {/* Content section - Capcity */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="capacity"
                className="text-sm text-textPrimary font-medium"
              >
                Capacity
              </label>
              <input
                type="number"
                name="capacity"
                id="capacity"
                placeholder="e.g. 5"
                value={meetingRoomFormData.capacity}
                onChange={handleInputChange}
                className="p-2 rounded-md ps-4 text-textPrimary placeholder:text-textSecondary placeholder:text-sm text-base outline-none border border-borderColor hover:border-primary  valid:border-primary duration-300"
                required
              />
            </div>

            {/* Content section - Status */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="capacity"
                className="text-sm text-textPrimary font-medium"
              >
                Status
              </label>
              <select
                value={meetingRoomFormData.status}
                onChange={handleSelectChange}
                className="p-2 rounded-md ps-4 text-textPrimary placeholder:text-textSecondary placeholder:text-sm text-base outline-none border border-borderColor hover:border-primary  valid:border-primary duration-300"
              >
                <option value="AVAILABLE">AVAILABLE</option>
                <option value="BOOKED">BOOKED</option>
                <option value="IN_USE">IN_USE</option>
                <option value="UNAVAILABLE">UNAVAILABLE</option>
              </select>
            </div>
          </div>

          {/* Content section - Description */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="description"
              className="text-sm text-textPrimary font-medium"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={meetingRoomFormData.description}
              onChange={handleTextAreaChange}
              placeholder="e.g. A bright meeting space with a large whiteboard and projector. Ideal for brainstorming sessions."
              className="p-2 pb-8 rounded-md ps-4 text-textPrimary placeholder:text-textSecondary placeholder:text-sm text-base outline-none border border-borderColor hover:border-primary  valid:border-primary duration-300"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isImageUploading || isUpdateMeetingRoomLoading}
            className="flex items-center justify-center px-4 py-2 rounded-md text-white font-normal text-base bg-primary hover:bg-primaryLight active:bg-primaryDark transform ease-in-out transition-all hover:-translate-y-0.5 active:translate-y-0 duration-300 cursor-pointer"
          >
            {isImageUploading || isUpdateMeetingRoomLoading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              "Update meeting room"
            )}
          </button>
        </motion.form>
      )}
    </>
  );
};

export default EditMeetingRoomForm;
