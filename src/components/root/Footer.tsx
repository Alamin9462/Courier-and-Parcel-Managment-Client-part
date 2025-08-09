


const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#202938' }} className="w-full py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        <div className="text-white text-lg font-bold mb-2 md:mb-0">TrackSwift &copy; {new Date().getFullYear()}</div>
        <div className="text-gray-400 text-sm">All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;