export default function PremiumSubscriptionIllustration() {
  return (
    <div className="hidden lg:flex justify-center">
      <div className="relative w-72 h-52">
        <div className="absolute right-4 top-4 w-28 h-20 bg-blue-50 border border-blue-100 rounded-lg shadow-sm p-3">
          <p className="text-[10px] font-semibold text-gray-700">JOB TITLE</p>
          <p className="text-[9px] text-gray-400 mt-1">Add job title...</p>
          <button className="mt-2 bg-blue-600 text-white text-[9px] px-3 py-1 rounded">
            POST JOB
          </button>
        </div>

        <div className="absolute left-10 bottom-6 w-20 h-28 bg-blue-100 rounded-t-full"></div>

        <div className="absolute left-16 bottom-20 w-9 h-9 bg-blue-600 rounded-full"></div>

        <div className="absolute left-14 bottom-8 w-16 h-16 border-4 border-blue-600 rounded-full bg-white"></div>

        <div className="absolute left-8 bottom-0 w-40 h-4 bg-blue-50 rounded-full"></div>

        <div className="absolute right-12 bottom-0 w-10 h-28 border-l-4 border-blue-300"></div>

        <div className="absolute right-6 bottom-16 w-8 h-8 border border-blue-500 rounded-full"></div>

        <div className="absolute right-0 bottom-6 w-16 h-4 bg-blue-100 rounded-full"></div>
      </div>
    </div>
  );
}