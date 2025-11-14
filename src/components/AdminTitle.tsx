import { motion } from "framer-motion";

interface AdminTitleProps {
  title: string;
  subTitle: string;
}

const AdminTitle: React.FC<AdminTitleProps> = ({ title, subTitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="flex flex-col items-start gap-1"
    >
      <h1 className="font-medium text-2xl">{title}</h1>
      <p className="text-sm: md:text-base text-textSecondary max-w-156">
        {subTitle}
      </p>
    </motion.div>
  );
};

export default AdminTitle;
