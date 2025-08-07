import { Link, useNavigate } from "react-router-dom";
import { BiCaretLeft } from "react-icons/bi";
import { FaFileMedicalAlt } from "react-icons/fa";
import { IoIosPerson } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from 'axios';
import Loader from "../../components/Loader";

const History = () => {
  // Using dummy data instead of fetching from an API
  //   const [history, setHistory] = useState(dummyHistory);
  const navigate = useNavigate();
  const id = localStorage.getItem("id");

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
        .get(`http://localhost:5555/user/patients/${id}`)
        .then(res => {
            setHistory(res.data);
            setLoading(false);
        })
        .catch(err => {
            alert("Error");
            setLoading(false);
        })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-start p-4 md:p-6">
      <div className="w-full max-w-4xl">
        <BiCaretLeft
          onClick={() => navigate(-1)}
          size="3em"
          className="cursor-pointer duration-300 hover:text-gray-500 mb-4"
        />

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 md:p-8">
          <header className="text-center mb-8 border-b pb-6">
            <h1 className="text-4xl font-extrabold text-gray-800">
              Patients
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              A record of all your past patients.
            </p>
          </header>

          {loading && <Loader />}

          {!loading && history.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4 mx-auto w-fit">
                <FaFileMedicalAlt />
              </div>
              <p className="text-xl font-semibold text-gray-700">
                No Scans Yet
              </p>
              <p className="text-gray-500 mb-6">
                Your patients will appear here once you add one.
              </p>
              <Link
                to="/dashboard/upload"
                className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                Upload First Patient
              </Link>
            </div>
          )}
          {!loading && history.length > 0 && (
            <div className="space-y-4">
              {history.map((item) => (
                <HistoryItem key={item._id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper component for each history item
const HistoryItem = ({ item }) => {

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="text-blue-500 text-3xl">
          <IoIosPerson />
        </div>
        <div>
          <p className="font-bold text-gray-800">{item.fullname}</p>
          {/* <p className="text-sm text-gray-500 flex items-center gap-1">
            <FaCalendarAlt />{" "}
            {new Date(item.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p> */}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
        {/* <div
          className={`text-sm font-semibold px-3 py-1 rounded-full ${getStatusStyles(
            item.inference
          )}`}>
          Result: {item.inference}
        </div> */}
        <Link
          to={item._id}
          className="text-sm bg-gray-200 text-gray-800 font-semibold py-1 px-4 rounded-lg hover:bg-gray-300 transition-colors">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default History;
