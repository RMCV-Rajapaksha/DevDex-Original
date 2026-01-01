import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';

const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm Action",
    message = "Are you sure you want to proceed?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "danger" // danger, warning
}) => {
    const variants = {
        danger: {
            icon: 'text-red-400',
            iconBg: 'bg-red-500/20',
            confirmBtn: 'bg-red-500 hover:bg-red-600',
        },
        warning: {
            icon: 'text-yellow-400',
            iconBg: 'bg-yellow-500/20',
            confirmBtn: 'bg-yellow-500 hover:bg-yellow-600 text-slate-900',
        }
    };

    const style = variants[variant] || variants.danger;

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
                    >
                        <div className="bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-2xl shadow-black/50 overflow-hidden">
                            {/* Header */}
                            <div className="p-6 pb-0">
                                <div className="flex items-start gap-4">
                                    {/* Icon */}
                                    <div className={`p-3 rounded-xl ${style.iconBg}`}>
                                        <FaExclamationTriangle className={`text-2xl ${style.icon}`} />
                                    </div>

                                    {/* Title & Message */}
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            {title}
                                        </h3>
                                        <p className="text-slate-400 leading-relaxed">
                                            {message}
                                        </p>
                                    </div>

                                    {/* Close Button */}
                                    <button
                                        onClick={onClose}
                                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="p-6 flex gap-3 justify-end">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onClose}
                                    className="px-5 py-2.5 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition-all font-medium"
                                >
                                    {cancelText}
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleConfirm}
                                    className={`px-5 py-2.5 text-white rounded-xl transition-all font-medium ${style.confirmBtn}`}
                                >
                                    {confirmText}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ConfirmModal;
