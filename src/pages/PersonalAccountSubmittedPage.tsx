import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const formatNow = () => {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}, ${pad(now.getHours())}:${pad(now.getMinutes())}`;
};

const buildReference = () => {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `IMD${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}${Math.floor(Math.random() * 900 + 100)}`;
};

const PersonalAccountSubmittedPage = () => {
  const navigate = useNavigate();
  const submittedAt = useMemo(() => formatNow(), []);
  const referenceNo = useMemo(() => buildReference(), []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-24 pt-12 text-center relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-[#C62828] text-[18px] whitespace-nowrap">
          Non-Production Env: uat (BN: 3136)
        </div>

        <div className="w-[170px] h-[170px] rounded-full border-[5px] border-[#1F1F1F] bg-[#FFF1BE] flex items-center justify-center mb-10 relative">
          <svg className="w-[92px] h-[92px] text-[#1F1F1F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        <div className="text-[24px] font-bold text-[#111] mb-4 leading-[1.35]">成功提交更改投資授權</div>
        <div className="text-[17px] text-[#1F1F1F] mb-2">參考編號： {referenceNo}</div>
        <div className="text-[17px] text-[#1F1F1F]">提交日期及時間： {submittedAt}</div>
      </div>

      <div className="px-6 pb-10 space-y-6">
        <button onClick={() => navigate('/personal-account')} className="w-full h-[58px] rounded-full bg-[#233C6A] text-white text-[20px] font-semibold shadow-[0_4px_12px_rgba(0,0,0,0.14)]">
          查閱提交狀態
        </button>
        <button onClick={() => navigate('/personal-account')} className="w-full h-[58px] rounded-full border-2 border-[#2B2B2B] text-[#1F1F1F] text-[20px] font-medium bg-white">
          設定基金轉換／重組投資組合指示
        </button>
      </div>
    </div>
  );
};

export default PersonalAccountSubmittedPage;
