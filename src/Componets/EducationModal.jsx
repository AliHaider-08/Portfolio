import { motion } from "framer-motion";
import { FaTimes, FaRegCalendarAlt, FaMapMarkerAlt, FaExternalLinkAlt } from "react-icons/fa";

const EducationModal = ({ selected, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 p-4"
      aria-modal="true"
      role="dialog"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold">{selected.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {selected.institution} • {selected.type}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-300">
          <span className="inline-flex items-center gap-1">
            <FaRegCalendarAlt />
            {new Date(selected.start).toLocaleDateString()} —{" "}
            {selected.end ? new Date(selected.end).toLocaleDateString() : "Present"}
          </span>
          <span className="inline-flex items-center gap-1">
            <FaMapMarkerAlt />
            {selected.location}
          </span>
        </div>

        <p className="mt-4 text-gray-700 dark:text-gray-300">{selected.summary}</p>

        {selected.achievements?.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Highlights</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700 dark:text-gray-300">
              {selected.achievements.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {selected.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              {l.label}
              <FaExternalLinkAlt />
            </a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EducationModal;
