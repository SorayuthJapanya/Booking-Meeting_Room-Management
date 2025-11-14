import { motion } from "framer-motion";

const ContactUsSection = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center gap-2 px-4 mt-10 mb-40">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h1 className="text-2xl md:text-4xl font-semibold text-textPrimary">
          Never Miss a Booking!
        </h1>
        <p className="text-sm md:text-lg text-textSecondary mb-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla,
          perspiciatis.
        </p>
      </motion.div>
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="flex items-center justify-between w-full max-w-2xl h-12"
      >
        <input
          type="text"
          className="border border-borderColor w-full h-full border-r-0 outline-none hover:border-primary duration-300 focus:border-primary rounded-r-none rounded-md ps-3 placeholder:text-textSecondary/50 text-textSecondary"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="px-8 md:px-12 text-sm w-48 h-12 bg-primary hover:bg-primaryLight active:bg-primaryDark duration-300 cursor-pointer text-white rounded-md rounded-l-none flex items-center"
        >
          Contact us
        </button>
      </motion.form>
    </div>
  );
};

export default ContactUsSection;
