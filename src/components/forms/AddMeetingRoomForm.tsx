import { useState, type FormEvent } from "react";
import type { IAddMeetingRoomType } from "../../types/meetingRoomTypes";
import { Loader2, UploadCloud } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { uploadImageToCloudinary } from "../../api/uploadeImageApi";
import toast from "react-hot-toast";
import { postCreateMeetingRoomAPI } from "../../api/meetingRoomApi";
import { motion } from "framer-motion";

const AddMeetingRoomForm = () => {
  const [meetingRoomFormData, setMeetingRoomFormData] =
    useState<IAddMeetingRoomType>({
      image_url: "",
      roomName: "",
      description: "",
      capacity: "",
      location: "",
    });

  const [meetingRoomImage, setMeetingRoomImage] = useState<string | File>("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // upload image to cloundinary function
  const { mutateAsync: uploadImage, isPending: isImageUploading } = useMutation(
    {
      mutationFn: uploadImageToCloudinary,
    }
  );

  //  upload meeting room to sheet
  const {
    mutateAsync: createMeetingRoom,
    isPending: isCreateMeetingRoomLoading,
  } = useMutation({
    mutationFn: postCreateMeetingRoomAPI,
    onSuccess: () => toast.success("Create meeting room successfully!!"),
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

  const handleSumbitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (meetingRoomImage) {
      const uploadResponse = await uploadImage(meetingRoomImage);
      const imageUrl = uploadResponse.secure_url;

      if (imageUrl) {
        setMeetingRoomFormData((prev) => ({
          ...prev,
          image_url: imageUrl,
        }));
      } else {
        return null;
      }
    } else {
      return toast.error("Please upload image!!");
    }

    if (meetingRoomFormData) {
      createMeetingRoom(meetingRoomFormData);
    } else {
      return toast.error("All feilds are required!!");
    }
  };

  return (
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
          className="w-[60%] h-44 rounded-md flex items-center justify-center bg-gray-50 hover:bg-blue-50 duration-300 border-2 border-dashed border-borderColor hover:border-primaryLight/50 cursor-pointer"
        >
          {previewImage ? (
            <img
              src={previewImage}
              alt="image_url"
              className="w-full h-full rounded-md object-cover"
            />
          ) : (
            <UploadCloud className="size-10 text-textSecondary/40" />
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

      {/* Content section */}
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

      <div className="w-full flex items-center gap-4">
        <div className="w-full flex flex-col gap-1">
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

        <div className="w-full flex flex-col gap-1">
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
      </div>

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
        disabled={isImageUploading || isCreateMeetingRoomLoading}
        className="flex items-center justify-center px-4 py-2 rounded-md text-white font-normal text-base bg-primary hover:bg-primaryLight active:bg-primaryDark transform ease-in-out transition-all hover:-translate-y-0.5 active:translate-y-0 duration-300 cursor-pointer"
      >
        {isImageUploading || isCreateMeetingRoomLoading ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          "Add new meeting room"
        )}
      </button>
    </motion.form>
  );
};

export default AddMeetingRoomForm;
