import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Info } from 'lucide-react';
import { useFutureInvest } from '../context/FutureInvestContext';
import { useFutureSubmission } from '../context/FutureSubmissionContext';

const InvestPage = () => {
  const navigate = useNavigate();
  const { resetFutureInvest } = useFutureInvest();
  const { resetFutureSubmission } = useFutureSubmission();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCardClick = (type: 'existing' | 'future') => {
    if (type === 'existing') {
      navigate('/invest/select-plan');
    }
    if (type === 'future') {
      resetFutureInvest();
      resetFutureSubmission();
      navigate('/invest/future-select-plan');
    }
  };

  const handleInfoClick = (e: React.MouseEvent, type: 'existing' | 'future') => {
    e.stopPropagation();
    navigate(type === 'existing' ? '/invest/info' : '/invest/future-info');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600 hover:text-gray-900">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-medium text-[#E67E22]">投資</h1>
        <div className="w-8" />
      </div>

      <div className="px-4 py-5">
        <p className="text-gray-600 text-sm mb-6">請根據你的需要選擇投資指示選項。</p>

        <div className="space-y-5">
          <div onClick={() => handleCardClick('existing')} className="border-4 border-gray-200 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-shadow bg-white relative">
            <button onClick={(e) => handleInfoClick(e, 'existing')} className="absolute top-5 right-5 p-1.5 text-gray-400 hover:text-gray-600">
              <Info size={22} />
            </button>
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-5">
                <img src="./icons/invest-existing.jpg" alt="現有帳戶結餘" className="w-16 h-16 object-contain" />
              </div>
              <div className="flex-1 pr-10">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">現有帳戶結餘的投資</h3>
                <p className="text-base text-gray-500 leading-relaxed">更改你現有帳戶結餘的投資組合，你可選擇指定基金轉換或單次投資組合重組</p>
              </div>
            </div>
          </div>

          <div onClick={() => handleCardClick('future')} className="border-4 border-gray-200 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-shadow bg-white relative">
            <button onClick={(e) => handleInfoClick(e, 'future')} className="absolute top-5 right-5 p-1.5 text-gray-400 hover:text-gray-600">
              <Info size={22} />
            </button>
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-5">
                <img src="./icons/invest-future.jpg" alt="未來供款" className="w-16 h-16 object-contain" />
              </div>
              <div className="flex-1 pr-10">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">未來供款的投資</h3>
                <p className="text-base text-gray-500 leading-relaxed">適用於更改所有未來收到的款項的投資組合，包括供款及自另一計劃轉入之款項。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestPage;
