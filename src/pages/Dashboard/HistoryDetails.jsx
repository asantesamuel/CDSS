import { Link, useNavigate, useParams } from "react-router-dom";
import { BiCaretLeft, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { FaBrain, FaCalendarAlt, FaFileMedicalAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from 'axios';
import Loader from "../../components/Loader";
import Expandable from "../../components/Expandable";

const HistoryDetails = () => {
    
    const navigate = useNavigate();

    const { id } = useParams();

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/user/patient/${id}`)
            .then(res => {
                setHistory(res.data.scan_history);
                setLoading(false);
            })
            .catch(err => {
                alert("Couldn't load history. Kindly try again later.");
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
                    Scan History
                    </h1>
                    <p className="mt-2 text-lg text-gray-600">
                    A record of all your past analyses.
                    </p>
                </header>

                {!loading && history.length === 0 && (
                    <div className="text-center py-16">
                    <div className="text-gray-400 text-6xl mb-4 mx-auto w-fit">
                        <FaFileMedicalAlt />
                    </div>
                    <p className="text-xl font-semibold text-gray-700">
                        No Scans Yet
                    </p>
                    <p className="text-gray-500 mb-6">
                        Your scan history will appear here once you upload an image for
                        analysis.
                    </p>
                    <Link
                        to={`/dashboard/patient/${id}`}
                        className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                        Upload First Scan
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
                {loading && <Loader />}
                </div>
            </div>
        </div>
    );
};

// Helper component for each history item
const HistoryItem = ({ item }) => {
    const getStatusStyles = (result) => {
        switch (result.toLowerCase()) {
        case "positive":
            return "bg-red-100 text-red-800 border-red-300";
        case "negative":
            return "bg-green-100 text-green-800 border-green-300";
        default:
            return "bg-yellow-100 text-yellow-800 border-yellow-300";
        }
    };
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col items-start sm:items-center justify-between gap-4">
            <div className="flex flex-row items-center justify-between w-full">
                <div className="flex items-center gap-4">
                    <div className="text-blue-500 text-3xl">
                        <FaBrain />
                    </div>
                    <div>
                        <p className="font-bold text-gray-800">CCT Scan</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                            <FaCalendarAlt />{" "}
                            {new Date(item.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            })}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                    <div className={`text-sm font-semibold px-3 py-1 rounded-full ${getStatusStyles(item.inference)}`}>
                        Result: {item.inference}
                    </div>
                </div>
            </div>
            
            <Expandable title="Click to expand">
                <p className="font-semibold">Uploaded Scan</p>
                <img src={`http://localhost:5555/uploads/${item.image}`} className="w-1/3" />
                <p><span className="font-bold">Confidence:</span> {item.confidence}</p>
            </Expandable>
        </div>
    );
};

export default HistoryDetails;
