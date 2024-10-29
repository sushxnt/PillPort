import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]); // Removed applyFilter from the dependency array

  return (
    <div>
      <p>Browse through the doctors' specialties.</p>
      <div>
        <div>
          <p>General physician</p>
          <p>Gynecologist</p>
          <p>Dermatologist</p>
          <p>Pediatricians</p>
          <p>Neurologist</p>
          <p>Gastroenterologist</p>
        </div>
        <div>
          {filterDoc.length === 0 ? (
            <p>No doctors available for this specialty.</p>
          ) : (
            filterDoc.map((doctor, index) => (
              <div
                onClick={() => navigate(`/appointment/${doctor._id}`)}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
                key={index}
              >
                <img
                  className="bg-blue-50"
                  src={doctor.image}
                  alt={`${doctor.name}'s profile`}
                />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-center text-green-500">
                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                    <p>Available</p>
                  </div>
                  <p className="text-gray-900 text-lg font-medium">
                    {doctor.name}
                  </p>
                  <p className="text-gray-600 text-sm">{doctor.speciality}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
