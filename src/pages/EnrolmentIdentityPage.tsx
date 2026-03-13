import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EnrolmentIdentityPage = () => {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0,0); }, []);

  return (
    <div className="min-h-screen bg-[#F6F5F4] flex flex-col">
      <div className="sticky top-0 z-20 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="px-4 pt-4 pb-4 flex items-center justify-center relative border-b border-[#ECECEC]">
          <button onClick={() => navigate(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center"><img src="./icons/icon-back.png" alt="返回" className="w-6 h-6 object-contain" /></button>
          <h1 className="text-[18px] font-semibold text-[#1F1F1F] tracking-[-0.01em]">申請一般僱員</h1>
        </div>
      </div>

      <div className="px-6 pt-8 flex-1">
        <h2 className="text-[24px] font-bold text-[#E6A23C] mb-5">進行身分驗證</h2>
        <p className="text-[18px] leading-[1.55] text-[#1F1F1F] mb-10">為遵守《打擊洗錢及恐怖分子資金籌集條例》（第615章），我們仍須在你每次登記參加強積金計劃時獨立驗證你的身分。</p>

        <button onClick={() => navigate('/enrolment-iam-smart')} className="w-full bg-white rounded-[26px] px-6 py-8 shadow-[0_4px_14px_rgba(0,0,0,0.10)] border border-[#D6D1D1] flex flex-col items-center text-center">
          <img src="./icons/icon-iam-smart-user.jpg" alt="iAM Smart" className="w-[190px] object-contain mb-6" />
          <div className="text-[20px] text-[#1F1F1F]">登入「智方便」驗證</div>
        </button>
      </div>
    </div>
  );
};

export default EnrolmentIdentityPage;
