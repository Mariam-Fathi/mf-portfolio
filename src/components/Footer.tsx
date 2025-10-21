const Footer = () => {
  return (
    <footer className="footer">
      <div className="justify-between w-full flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-4" />
        <p className="text-gray-700">
          © {new Date().getFullYear()} Mariam Fathi All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
