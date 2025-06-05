import React from "react";

function Model({
  children,
  isOpen,
  onClose,
  title,
  hideHeader = false,
  showActionBtn = false,
  actionBtnIcon = null,
  actionBtnText = "",
  onActionCLick = () => {},
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col max-h-[90vh]">

        {/* Modal Header */}
        {!hideHeader && (
          <div className="flex justify-between items-center border-b border-gray-200 px-5 py-4 bg-gray-50 flex-wrap gap-2">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <div className="flex gap-2 flex-wrap items-center">
              {showActionBtn && (
                <button
                  onClick={onActionCLick}
                  className="flex items-center gap-1 text-sm px-3 py-1.5 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition"
                >
                  {actionBtnIcon}
                  {actionBtnText}
                </button>
              )}
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-red-500 transition rounded-full p-2 hover:bg-gray-100"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 w-full">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Model;
