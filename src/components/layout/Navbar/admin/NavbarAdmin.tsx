import { motion } from "framer-motion";
import { Link } from "react-router";

const NavbarAdmin = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full flex itmes-center justify-end gap-4 px-6 md:px-10 py-4 border-b border-borderColor"
    >
      <Link to="/">
        <p className="text-base text-textSecondary hover:text-primary duration-300 cursor-pointer pr-4 border-r-2 border-borderColor">
          Home
        </p>
      </Link>
      <p className="text-base text-textSecondary">Welcome, Euro</p>
    </motion.div>
  );
};

export default NavbarAdmin;
