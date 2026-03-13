import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    icon: './icons/enrol-step-1.png',
    title: '第1步 選擇計劃',
    desc: '選擇一個強積金計劃，然後以「智方便」\n流動應用程式驗證你的身分。'
  },
  {
    icon: './icons/enrol-step-2.png',
    title: '第2步 填妥個人資料',
    desc: '提供個人及業務資料（如適用）'
  },
  {
    icon: './icons/enrol-step-3.png',
    title: '第3步 作出投資選擇',
    desc: '選擇成分基金並進行投資分配'
  },
  {
    icon: './icons/enrol-step-4.png',
    title: '第4步 設定供款及付款詳情',
    desc: '設定供款週期、付款方法等'
  }
];

const EnrolmentInstructionPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F6F5] flex flex-col">
      <div className="sticky top-0 z-20 bg-white border-b border-[#ECECEC] px-4 pt-4 pb-4 flex items-center justify-center relative shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <button onClick={() => navigate(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center">
          <img src="./icons/icon-back.png" alt="返回" className="w-6 h-6 object-contain" />
        </button>
        <h1 className="text-[18px] font-semibold text-[#1F1F1F] tracking-[-0.01em]">強積金帳戶登記</h1>
      </div>

      <div className="px-6 pt-7 pb-0 flex-1">
        <p className="text-[17px] text-[#1F1F1F] leading-[1.45] mb-8">只需幾步，即可登記強積金帳戶</p>

        <div className="space-y-8 pb-7 border-b border-[#E2E2E2]">
          {steps.map((step) => (
            <div key={step.title} className="flex items-start gap-5">
              <img src={step.icon} alt={step.title} className="w-[74px] h-[74px] object-contain flex-shrink-0 mt-[2px]" />
              <div className="pt-[2px]">
                <h3 className="text-[18px] font-bold text-[#1F1F1F] mb-1 leading-[1.35]">{step.title}</h3>
                <p className="text-[16px] text-[#1F1F1F] leading-[1.55] whitespace-pre-line">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-7 pb-6">
          <h3 className="text-[18px] font-bold text-[#1F1F1F] mb-4">所需項目</h3>
          <p className="text-[16px] text-[#1F1F1F] leading-[1.55] mb-6">在開始前，請先準備以下項目，以便順利進行登記：</p>

          <div className="flex items-center gap-3">
            <span className="text-[28px] leading-none text-[#E6A23C] font-bold">√</span>
            <p className="text-[16px] text-[#1F1F1F] leading-[1.5]">已登記的「智方便」帳戶（下載）</p>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 bg-white px-6 pt-4 pb-6 border-t border-[#ECECEC] shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <button className="w-full h-[60px] rounded-full bg-[#19345B] text-white text-[19px] font-semibold tracking-[0.01em] mb-4 shadow-[0_1px_2px_rgba(0,0,0,0.08)]">開始登記</button>
        <button className="w-full text-center text-[18px] font-medium text-[#1F1F1F] leading-[1.4] underline underline-offset-[3px]">以現有紀錄繼續</button>
      </div>
    </div>
  );
};

export default EnrolmentInstructionPage;
