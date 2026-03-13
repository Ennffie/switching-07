import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EnrolmentIAMSmartPage = () => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => { window.scrollTo(0,0); }, []);

  const startFlow = () => {
    setShowConfirm(false);
    setLoading(true);
    setTimeout(() => navigate('/enrolment-personal-info'), 1200);
  };

  return (
    <div className="min-h-screen bg-[#F6F5F4] flex flex-col relative">
      <div className="sticky top-0 z-20 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="px-4 pt-4 pb-4 flex items-center justify-center relative border-b border-[#ECECEC]">
          <button onClick={() => navigate(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center"><img src="./icons/icon-back.png" alt="返回" className="w-6 h-6 object-contain" /></button>
          <h1 className="text-[18px] font-semibold text-[#1F1F1F] tracking-[-0.01em]">於「智方便」繼續</h1>
        </div>
      </div>

      <div className="px-6 pt-8 flex-1">
        <img src="./icons/icon-iam-smart-user.jpg" alt="iAM Smart" className="w-[190px] object-contain mb-8" />
        <h2 className="text-[24px] font-bold text-[#E6A23C] mb-6">你將被帶到「智方便」。</h2>
        <div className="border-t border-[#DADADA] pt-5">
          <h3 className="text-[20px] font-bold text-[#1F1F1F] mb-4">關於「智方便」</h3>
          <p className="text-[17px] leading-[1.6] text-[#1F1F1F] mb-5">「智方便」是一個一站式個人化電子服務平台。按此了解更多有關「智方便」的資訊。</p>
          <p className="text-[17px] leading-[1.6] text-[#1F1F1F]">溫馨提示，若選擇「智方便」，請確保你已在你的手機安裝「智方便」流動應用程式，並成功登記成為用戶。</p>
        </div>
      </div>

      <div className="sticky bottom-0 bg-[#F6F5F4] px-6 pt-3 pb-6">
        <button onClick={() => setShowConfirm(true)} className={`w-full h-[58px] rounded-full text-[19px] font-semibold ${loading ? 'bg-[#E5E2E2] text-[#AFAAAA] border border-[#D0CCCC]' : 'bg-[#19345B] text-white'}`}>確定</button>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-40 bg-black/10 flex items-center justify-center px-8">
          <div className="w-full max-w-[360px] bg-[#F3F3F3] rounded-[16px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.16)]">
            <div className="px-6 py-6 text-center text-[20px] font-semibold text-[#1F1F1F]">「積金易」想要開啟「智方便」</div>
            <div className="grid grid-cols-2 border-t border-[#D0D0D0]">
              <button onClick={() => setShowConfirm(false)} className="h-[54px] text-[18px] font-medium text-[#2C74C9] border-r border-[#D0D0D0]">取消</button>
              <button onClick={startFlow} className="h-[54px] text-[18px] font-medium text-[#2C74C9]">知道了</button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 z-30 bg-[#F6F5F4]/80 flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full border-[6px] border-[#E5C08B] border-t-[#E6A23C] animate-spin mb-5" />
          <div className="text-[22px] text-[#1F1F1F]">載入中</div>
        </div>
      )}
    </div>
  );
};

export default EnrolmentIAMSmartPage;
