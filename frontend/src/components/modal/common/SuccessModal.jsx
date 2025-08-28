import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function SuccessModal({ message, isOpen, onClose, duration = 2000 }) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white px-6 py-4 rounded-xl shadow-lg flex items-center space-x-3 h-28"
          >
            <CheckCircle className="text-green-500 w-6 h-6" />
            <span className="text-green-700 font-medium">{message}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
