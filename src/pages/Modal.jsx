function Modal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-5">

      <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl">

        <h2 className="text-2xl font-bold text-[#3D352E]">
          {title}
        </h2>

        <p className="text-gray-600 mt-3">
          {message}
        </p>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`px-5 py-2 rounded-xl text-white ${
              danger
                ? "bg-red-500 hover:bg-red-600"
                : "bg-[#7C9A5D] hover:bg-[#6A844E]"
            }`}
          >
            {confirmText}
          </button>

        </div>

      </div>

    </div>
  );
}

export default Modal;