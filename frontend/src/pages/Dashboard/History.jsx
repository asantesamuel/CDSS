
import { Link, useNavigate } from "react-router-dom";
import { BiCaretLeft } from "react-icons/bi";
import { FaBrain, FaCalendarAlt, FaFileMedicalAlt } from "react-icons/fa";

// Dummy data for UI demonstration
const dummyHistory = [
  {
    id: 'scan001',
    scanDate: '2023-10-26',
    result: 'Positive',
    confidence: '92%',
    scanType: 'CCT Scan',
  },
  {
    id: 'scan002',
    scanDate: '2023-09-15',
    result: 'Negative',
    confidence: '98%',
    scanType: 'CCT Scan',
  },
  {
    id: 'scan003',
    scanDate: '2023-07-01',
    result: 'Inconclusive',
    confidence: 'N/A',
    scanType: 'CCT Scan',
  },
  {
    id: 'scan004',
    scanDate: '2023-05-20',
    result: 'Negative',
    confidence: '99%',
    scanType: 'CCT Scan',
  },
];

const History = () => {
  // Using dummy data instead of fetching from an API
//   const [history, setHistory] = useState(dummyHistory);
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-start p-4 md:p-6'>
      <div className="w-full max-w-4xl">
        <BiCaretLeft onClick={() => navigate(-1)} size='3em' className='cursor-pointer duration-300 hover:text-gray-500 mb-4' />
        
        <div className='bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 md:p-8'>
          <header className="text-center mb-8 border-b pb-6">
            <h1 className='text-4xl font-extrabold text-gray-800'>Scan History</h1>
            <p className="mt-2 text-lg text-gray-600">
              A record of all your past analyses.
            </p>
          </header>

          {history.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4 mx-auto w-fit">
                <FaFileMedicalAlt />
              </div>
              <p className="text-xl font-semibold text-gray-700">No Scans Yet</p>
              <p className="text-gray-500 mb-6">Your scan history will appear here once you upload an image for analysis.</p>
              <Link
                to="/dashboard/upload"
                className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Upload First Scan
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((item) => (
                <HistoryItem key={item.id} item={item} />
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
  const getStatusStyles = (result) => {
    switch (result.toLowerCase()) {
      case 'positive':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'negative':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="text-blue-500 text-3xl">
          <FaBrain />
        </div>
        <div>
          <p className="font-bold text-gray-800">{item.scanType}</p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <FaCalendarAlt /> {new Date(item.scanDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
        <div className={`text-sm font-semibold px-3 py-1 rounded-full ${getStatusStyles(item.result)}`}>
          Result: {item.result}
        </div>
        <button className="text-sm bg-gray-200 text-gray-800 font-semibold py-1 px-4 rounded-lg hover:bg-gray-300 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default History;
