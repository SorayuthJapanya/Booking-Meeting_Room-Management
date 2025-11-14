import { useState } from "react";
import NavBarItem from "./NavBarItem";
import { navBarItems } from "./navBarItmes";
import { TextAlignEnd, X } from "lucide-react";
import { motion } from "framer-motion";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleClickMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-textSecondary border-b border-borderColor"
    >
      <a href="/" className="">
        <img
          src="/booking_logo.svg"
          alt="logo"
          className="h-6 hover:scale-105 duration-300"
        />
      </a>
      <div
        className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-14 max-sm:border-t border-borderColor flex flex-col sm:flex-row max-sm:pt-4 items-center gap-4 sm:gap-8 transition-all duration-300 z-50 bg-white ${
          isMenuOpen ? "max-sm:translate-x-0" : "max-sm:translate-x-full"
        }`}
      >
        {navBarItems.map((item) => (
          <NavBarItem key={item.path} onClickItem={setIsMenuOpen} {...item} />
        ))}
      </div>
      <button className="sm:hidden cursor-pointer " onClick={handleClickMenu}>
        {isMenuOpen ? (
          <X className="size-5" />
        ) : (
          <TextAlignEnd className="size-5" />
        )}
      </button>
    </motion.div>
  );
};

export default NavBar;
