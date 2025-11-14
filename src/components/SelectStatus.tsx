interface SelectStatusProps {
  status: string;
  book_id: string;
  index: number;
  setLoading: (val: number | null) => void;
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { postUpdateBookingStatus } from "../api/bookingApi";
import toast from "react-hot-toast";

const SelectStatus: React.FC<SelectStatusProps> = ({
  status,
  book_id,
  index,
  setLoading,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const options = ["PENDING", "COMFIRMED", "CANCELLED"];
  const queryClient = useQueryClient();

  const { mutateAsync: updatebookingStatus } = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) =>
      await postUpdateBookingStatus(id, status),
    onSuccess: () => {
      toast.success("Update status successfully!!");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error) => toast.error(error.message),
  });

  const handleSelectStatus = async (status: string) => {
    setLoading(index);
    await updatebookingStatus({ id: book_id, status });
    setLoading(null);
  };
  return (
    <div className="relative w-full flex justify-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1.5 bg-white border border-borderColor text-textSecondary text-xs flex items-center gap-2 rounded-md hover:bg-gray-50 duration-300 cursor-pointer"
      >
        <p>{status}</p>
        <ChevronDown className="size-4" />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, originY: 0 }}
            animate={{ scale: 1, originY: 1 }}
            exit={{ scale: 0, originY: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-8 py-1.5 bg-white border border-borderColor rounded-md shadow-md"
          >
            {options.map((option) => (
              <div
                key={option}
                className={`w-full px-4 py-1.5 mb-1 last:mb-0 cursor-pointer duration-300 text-textSecondary ${
                  status.includes(option) ? "bg-gray-100" : "hover:bg-gray-100"
                }`}
                onClick={() => handleSelectStatus(option)}
              >
                {option}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectStatus;
