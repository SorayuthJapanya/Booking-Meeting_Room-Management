import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[url(/src/asset/banner-meetingRoom.jpg)] bg-repeat bg-cover bg-bottom">
      <div className="w-full h-screen flex items-center justify-center bg-linear-to-b from-white/50 to-white/70">
        <div className="flex flex-col items-center justify-center gap-4 text-center px-6 sm:px-16">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl text-textPrimary font-semibold"
          >
            Meeting Room{" "}
            <span className="text-primaryLight">Booking System</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center justify-center gap-4"
          >
            <p className="text-textPrimary/60 text-lg max-w-xl">
              Simplify your workspace management. Easily reserve, manage, and
              track meeting rooms in real time — all in one intuitive platform.
            </p>
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.1, backgroundColor: "#3B82F6" }}
              whileTap={{ scale: 0.95, backgroundColor: "#1E40AF" }}
              transition={{ type: "spring" }}
              onClick={() => navigate("/meeting-rooms")}
              className="px-8 py-3 rounded-full text-white bg-primary hover:bg-primaryLight active:bg-primaryDark cursor-pointer"
            >
              Book Now
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
