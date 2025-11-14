const FooterAdmin = () => {
  return (
    <footer className="border-t border-borderColor bg-white py-3 px-6 text-sm text-gray-500 flex items-center justify-between">
      <span>© {new Date().getFullYear()} Booking Admin Panel</span>
      <span className="text-gray-400">
        Built with ❤️ by{" "}
        <span className="text-primary">Me</span>
      </span>
    </footer>
  );
};

export default FooterAdmin;
