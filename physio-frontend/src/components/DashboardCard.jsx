// components/DashboardCard.jsx
const DashboardCard = ({ title, count, onClick, icon }) => {
    return (
      <div
        onClick={onClick}
        className="bg-white shadow-md rounded-2xl p-6 cursor-pointer hover:shadow-xl transition"
      >
        <div className="flex items-center space-x-4">
          <div className="text-3xl text-blue-600">{icon}</div>
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-gray-600">{count}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default DashboardCard;
  