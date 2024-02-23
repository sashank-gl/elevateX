import { IoMdCloseCircle } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { motion } from "framer-motion";
const Share = ({ handleShareDialog }) => {
  const shareUrl = `Land your dream job with a portfolio that shines! ✨ ElevateX helps you create one in minutes. Everyone deserves a standout portfolio! Click here to get started: https://www.yourwebsite.com`;

  const handleShareClick = (platform) => {
    switch (platform) {
      case "whatsapp":
        window.open(`https://wa.me/?text=${shareUrl}`);
        break;
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${shareUrl}`);
        break;
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`);
        break;
      case "copy":
        navigator.clipboard.writeText("www.elevateX.com");
        alert("Link copied to clipboard!");
        break;
      default:
        break;
    }
  };

  const handleCopyClick = () => {
    handleShareClick("copy");
  };

  return (
    <div className="fixed inset-0 z-10 flex h-screen flex-col items-center justify-center bg-background/50 backdrop-blur-md">
      <motion.div
        whileHover={{ scale: 1.2 }}
        className="fixed right-10 top-10 cursor-pointer"
        onClick={handleShareDialog}
      >
        <IoMdCloseCircle fontSize={36} />
      </motion.div>

      <div className="mb-12 flex flex-col gap-6 text-center">
        <p className="text-5xl font-bold">
          Do you know someone struggling to build a portfolio?
        </p>
        <p className="text-3xl font-semibold">
          ElevateX makes it easy! Help them out & share. They'll thank you for
          it!
        </p>
      </div>

      <div className="my-6 flex flex-col items-center gap-4">
        <button
          className="flex w-64 items-center gap-3 bg-stroke px-4 py-2 text-xl text-highlight"
          onClick={() => handleShareClick("whatsapp")}
        >
          <FaWhatsapp />
          <p>Share on WhatsApp</p>
        </button>
        <button
          className="flex w-64 items-center gap-3 bg-stroke px-4 py-2 text-xl text-highlight"
          onClick={() => handleShareClick("twitter")}
        >
          <FaXTwitter />
          <p>Share on Twitter</p>
        </button>
        <button
          className="flex w-64 items-center gap-3 bg-stroke px-4 py-2 text-xl text-highlight"
          onClick={() => handleShareClick("facebook")}
        >
          <FaFacebookF /> <p>Share on Facebook</p>
        </button>
        <button
          className="flex w-64 items-center gap-3 bg-stroke px-4 py-2 text-xl text-highlight"
          onClick={handleCopyClick}
        >
          <MdContentCopy />
          <p>Copy Link</p>
        </button>
      </div>
    </div>
  );
};

export default Share;
