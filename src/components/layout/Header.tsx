import { motion } from "framer-motion";

interface HeaderProps {
  title: string;
  subTitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subTitle }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className="text-center flex flex-col items-center justify-center"
    >
      <h1 className="text-3xl md:text-4xl font-semibold text-textPrimary">
        {title}
      </h1>
      <p className="text-sm md:text-base text-textSecondary max-w-156">
        {subTitle}
      </p>
    </motion.header>
  );
};

export default Header;
