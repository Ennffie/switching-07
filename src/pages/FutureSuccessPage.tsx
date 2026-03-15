import { useNavigate } from 'react-router-dom';
import { useFutureSubmission } from '../context/FutureSubmissionContext';

const FutureSuccessPage = () => {
  const navigate = useNavigate();
  const { referenceNumber } = useFutureSubmission();
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className="mb-8">
          <img src="./images/icon-check.jpg" alt="成功提交" className="w-28 h-28 object-contain" />
        </div>

        <h1 className="text-[22px] font-bold text-gray-900 text-center mb-5 leading-relaxed">
          成功提交更改投資授權
        </h1>

        <div className="text-center text-gray-700 text-[15px] mb-14 space-y-2">
          <p>參考編號：{referenceNumber}</p>
          <p>提交日期及時間：{dateStr}, {timeStr}</p>
        </div>

        <div className="w-full max-w-sm space-y-4">
          <button
            onClick={() => navigate('/invest/future-records')}
            className="w-full py-4 bg-[#1e3a5f] text-white rounded-full text-lg font-medium active:scale-[0.98] transition-transform"
          >
            查閱提交狀態
          </button>

          <button
            onClick={() => navigate('/invest/future-info')}
            className="w-full py-4 bg-transparent text-gray-700 border border-gray-400 rounded-full text-lg font-medium"
          >
            設定基金轉換／重組投資組合指示
          </button>
        </div>
      </div>
    </div>
  );
};

export default FutureSuccessPage;
