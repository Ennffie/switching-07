import { useNavigate } from 'react-router-dom';

const EnrolmentDISPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 pt-4 pb-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center">
          <img src="./icons/icon-back.png" alt="返回" className="w-6 h-6 object-contain" />
        </button>
        <div className="w-8" />
        <button onClick={() => navigate('/')} className="w-8 h-8 flex items-center justify-center text-[#1F1F1F] text-[30px] leading-none">×</button>
      </div>

      <div className="px-6 pt-8">
        <h1 className="text-[24px] font-bold text-[#E6A23C] mb-6">預設投資策略</h1>
        <p className="text-[18px] leading-[1.6] text-[#1F1F1F]">
          有關預設投資策略的詳情，請參閱
          <a
            href="https://www.mpfa.org.hk/mpf-investment/portfolio/default-investment-strategy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-semibold"
          >積金局網頁</a>
        </p>
      </div>
    </div>
  );
};

export default EnrolmentDISPage;
