export default function SetupProgressBar({ progress = 25 }) {
  return (
    <div className="w-64">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-400">Setup Progress</span>
        <span className="text-xs text-blue-600 font-medium">
          {progress}% Completed
        </span>
      </div>

      <div className="w-full h-1.5 bg-blue-100 rounded-full">
        <div
          className="h-1.5 bg-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}