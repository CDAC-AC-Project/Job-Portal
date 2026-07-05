export default function RecruiterStatCard({
  title,
  value,
  icon: Icon,
  bg = "bg-blue-50",
  iconBg = "bg-blue-600",
}) {
  return (
    <div className={`${bg} rounded-2xl p-6 border border-gray-100`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <p className="mt-1 text-sm font-medium text-gray-600">{title}</p>
        </div>

        <div
          className={`${iconBg} h-14 w-14 rounded-2xl text-white flex items-center justify-center text-2xl shadow-sm`}
        >
          <Icon />
        </div>
      </div>
    </div>
  );
}