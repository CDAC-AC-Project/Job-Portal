function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div className="text-blue-600">
          {icon}
        </div>

      </div>

    </div>
  );
}

export default StatCard;