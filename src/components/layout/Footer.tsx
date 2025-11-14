import { motion } from "framer-motion";
import { Link } from "react-router";

const Footer = () => {
  const socialMedias = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-facebook-icon lucide-facebook"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-instagram-icon lucide-instagram"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-twitter-icon lucide-twitter"
        >
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      ),
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-mail-icon lucide-mail"
        >
          <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
          <rect x="2" y="4" width="20" height="16" rx="2" />
        </svg>
      ),
    },
  ];

  const footerItems = [
    {
      title: "QUICK LINKS",
      menu: [
        { path: "/", label: "Home" },
        { path: "/meeting-rooms", label: "Meeting Room" },
        { path: "/bookings", label: "Bookings" },
      ],
    },
    {
      title: "RESOURCES",
      menu: [
        { path: "/", label: "Help Center" },
        { path: "/", label: "Terms of Service" },
        { path: "/", label: "Primaty Policy" },
        { path: "/", label: "Insutance" },
      ],
    },
  ];

  const footerLisence = [
    { path: "/", label: "Privacy" },
    { path: "/", label: "Teams" },
    { path: "/", label: "Cookies" },
  ];
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 text-sm text-textSecondary">
      <div className="flex flex-wrap items-start justify-between gap-8 pb-6 border-b border-borderColor">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <img src="/booking_logo.svg" alt="logo" className="h-4 sm:h-6" />
          <p className="max-w-80 mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
            repudiandae perspiciatis sapiente quisquam impedit quasi.
          </p>

          <div className="flex items-center gap-4 mt-4">
            {socialMedias.map((item, index) => (
              <span
                key={index}
                className="cursor-pointer hover:text-primary duration-300"
              >
                {item.icon}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-wrap justify-between w-1/2 gap-8">
          {footerItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="text-base font-medium text-textPrimary">
                {item.title}
              </h3>
              <div className="flex flex-col items-start gap-2 mt-2">
                {item.menu.map((link, i) => (
                  <Link
                    key={`${item.title}-${i}`}
                    to={link.path}
                    className="hover:text-primary duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3 className="text-base font-medium text-textPrimary uppercase">
              contact us
            </h3>
            <ul className="mt-2 flex flex-col gap-1.5">
              <li>1234 Meeting Room</li>
              <li>Los Angeles, CA 94107</li>
              <li>+1 234 56789</li>
              <li>info@example.com</li>
            </ul>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row gap-2 items-center justify-between py-5"
      >
        <p>&copy; 2025 Brand. All rights reserved.</p>
        <div className="flex items-center gap-4">
          {footerLisence.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className="hover:text-primary duration-300 border-r border-gray-400  pr-4 last:pr-0 last:border-none"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Footer;
