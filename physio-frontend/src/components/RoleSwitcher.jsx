const RoleSwitcher = ({ selectedRole, setSelectedRole }) => {
    const roles = ["admin", "doctor", "patient"];
  
    return (
      <div className="flex justify-center space-x-3 mt-3">
        {roles.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setSelectedRole(r)}
            className={`px-4 py-1.5 rounded-full text-sm capitalize transition-all duration-200 shadow-sm ${
              selectedRole === r
                ? "bg-blue-500 text-white font-semibold"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {r}
          </button>
        ))}
      </div>
    );
  };
  
  export default RoleSwitcher;
  