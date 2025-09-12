import { useEffect, useState } from "react";
import { BsImage, BsInfoCircle } from "react-icons/bs";
import { MdClose, MdError, MdHistory, MdMenu, MdPerson } from "react-icons/md";
import { CiLogout, CiStethoscope } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import patterns from "../assets/1311314_414.jpg";
import Description from "./Description";
import Footer from "./Footer";

const Dashboard = () => {
  const date = new Date();
  let hour = date.getHours();

  const [sideOpened, setSideOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const id = localStorage.getItem("id");
  const [data, setData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/user/get-info/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
        setError("");
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.message);
          setError(err.response.data.name);
        } else {
          alert("An error occured. Kindly check your connection and try again");
          setError("network");
        }
        setLoading(false);
      });
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem("id");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Display load spinner while loading */}
      {loading && (
        <div className="w-full m-10 flex flex-col items-center justify-center">
          <Loader>
            <p className="text-lg font-semibold text-gray-700 animate-pulse">
              Loading Dashboard. Please wait...
            </p>
          </Loader>
        </div>
      )}

      {!loading && error && (
        <div className="w-full p-3 min-h-screen m-auto flex flex-col items-center justify-center gap-4 bg-blue-50">
          <MdError size="5em" color="red" />
          <p className="text-center">
            {error === "network"
              ? "An error occured. Kindly check your connection and try again."
              : "An error occured, either because you're not logged in or a poor internet connection."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              className="cursor-pointer p-3 bg-blue-500 w-48 rounded-md text-white font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
              onClick={() => window.location.reload()}>
              Reload Page
            </button>
            {error === "unknown" && (
              <button
                className="cursor-pointer p-3 bg-gray-600 w-48 rounded-md text-white font-semibold hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate("/")}>
                Go to Login
              </button>
            )}
          </div>
        </div>
      )}

      {!loading && data && (
        <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">
            {/* Header Section */}
            <header className="w-full flex items-center justify-between mb-8">
              <h1 className="font-extrabold text-3xl text-gray-800 flex items-center gap-2">
                <CiStethoscope className="text-blue-600" size="1.2em" />{" "}
                Clinical Decision Support System (CDSS)
              </h1>
              <MdMenu
                size="2.5em"
                className="text-gray-700 cursor-pointer duration-150 hover:text-gray-500"
                title="Open Menu"
                onClick={() => setSideOpened(true)}
              />
            </header>

            {/* Hero Section */}
            <section
              className="relative w-full h-64 rounded-2xl p-8 flex flex-col justify-center items-start text-white overflow-hidden shadow-lg mb-10"
              style={{
                backgroundImage: `url(${patterns})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}>
              <div className="absolute inset-0 bg-black/80"></div>
              <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-2">
                  {hour >= 0 && hour < 12 && "Good Morning,"}
                  {hour >= 12 && hour < 18 && "Good Afternoon,"}
                  {hour >= 18 && hour < 24 && "Good Evening,"}
                </h2>
                <p className="text-4xl font-bold text-blue-300 mb-4">
                  Final Year Project - Group Two
                </p>
                <p className="max-w-md mb-6">
                  Ready to analyze a new scan? Add a new patient to get started.
                </p>
                <Link
                  to="/dashboard/patient/add"
                  className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-md">
                  Add New Patient
                </Link>
              </div>
            </section>
            <div>
              {/* About the app */}
              <Description />
            </div>

            {/* Dashboard cards */}
            <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-2/3 items-center justify-center mx-auto">
              <DashboardCard
                title="Add Patient"
                description="Add a new patient profile"
                icon={<BsImage size="2em" />}
                link="/dashboard/patient/add"
                bgColor="from-blue-500 to-blue-400"
              />
              <DashboardCard
                title="View History"
                description="Review past analyses"
                icon={<MdHistory size="2em" />}
                link="/dashboard/history"
                bgColor="from-green-500 to-green-400"
              />
              {/* <DashboardCard
                title="Your Profile"
                description="Manage personal info"
                icon={<MdPerson size="2em" />}
                link="/profile"
                bgColor="from-purple-500 to-purple-400"
              /> */}
              {/* <DashboardCard
                title="About CDSS"
                description="Learn about the app"
                icon={<BsInfoCircle size="2em" />}
                link="/dashboard/description"
                bgColor="from-orange-500 to-orange-400"
              /> */}
            </main>
          </div>

            {/* Footer */}
          <div>
            <Footer />
        </div>

          {/* Sidebar (Mobile Overlay) */}
          {sideOpened && (
            <div
              className="fixed inset-0 bg-black bg-opacity-10 z-50 flex justify-end"
              onClick={() => setSideOpened(false)}>
              <div
                className="bg-white w-72 h-full shadow-lg flex flex-col items-start p-6"
                onClick={(e) => e.stopPropagation()}>
                <MdClose
                  size="2.5em"
                  className="self-end text-gray-700 cursor-pointer duration-200 hover:text-gray-500 mb-8"
                  onClick={() => setSideOpened(false)}
                />

                {/* Menu Items */}
                <div className="w-full flex flex-col gap-4">
                  <Link
                    onClick={() => setSideOpened(false)}
                    to="/dashboard/upload"
                    className="flex items-center gap-4 text-lg text-gray-700 font-medium p-3 rounded-lg hover:bg-blue-100 transition-colors">
                    <BsImage size="1.5em" className="text-blue-500" /> Upload
                    Image
                  </Link>
                  <Link
                    onClick={() => setSideOpened(false)}
                    to="/dashboard/history"
                    className="flex items-center gap-4 text-lg text-gray-700 font-medium p-3 rounded-lg hover:bg-blue-100 transition-colors">
                    <MdHistory size="1.5em" className="text-blue-500" /> History
                  </Link>
                  <Link
                    onClick={() => setSideOpened(false)}
                    to="/profile"
                    className="flex items-center gap-4 text-lg text-gray-700 font-medium p-3 rounded-lg hover:bg-blue-100 transition-colors">
                    <MdPerson size="1.5em" className="text-blue-500" /> Profile
                  </Link>
                  <Link
                    onClick={() => setSideOpened(false)}
                    to="/dashboard/description"
                    className="flex items-center gap-4 text-lg text-gray-700 font-medium p-3 rounded-lg hover:bg-blue-100 transition-colors">
                    <BsInfoCircle size="1.5em" className="text-blue-500" /> App
                    Description
                  </Link>
                </div>

                <button
                  className="mt-auto w-full flex items-center justify-center gap-3 bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-md"
                  onClick={handleLogout}>
                  <CiLogout size="1.5em" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      
    </div>
  );
};

const DashboardCard = ({ title, description, icon, link, bgColor }) => (
  <Link
    to={link}
    className={`relative bg-gradient-to-br ${bgColor} text-white p-6 rounded-xl shadow-lg flex flex-col justify-between h-48 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl overflow-hidden`}>
    <div className="z-10">
      <div className="mb-2">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm opacity-80">{description}</p>
    </div>
    <div className="absolute -bottom-5 -right-5 text-white/20 text-8xl z-0">
      {icon}
    </div>
  </Link>
);

export default Dashboard;
