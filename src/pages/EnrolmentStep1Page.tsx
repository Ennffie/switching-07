import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

const EnrolmentStep1Page = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F5F4] flex flex-col">
      <div className="sticky top-0 z-20 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="px-4 pt-4 pb-4 flex items-center justify-center relative border-b border-[#ECECEC]">
          <button onClick={() => navigate(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center">
            <img src="./icons/icon-back.png" alt="返回" className="w-6 h-6 object-contain" />
          </button>
          <h1 className="text-[18px] font-semibold text-[#1F1F1F] tracking-[-0.01em]">申請一般僱員</h1>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center">
            <img src="./icons/icon-close.png" alt="關閉" className="w-5 h-5 object-contain" />
          </button>
        </div>

        <div className="px-6 pt-4 pb-4 bg-white">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-[18px] left-[40px] right-[40px] h-[2px] bg-[#E6E3E3]" />
            {[1,2,3,4].map((n) => (
              <div key={n} className="relative z-10 flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[20px] font-bold ${n === 1 ? 'bg-[#F5A623] text-white shadow-[0_2px_4px_rgba(0,0,0,0.12)]' : 'bg-[#EDEBEB] text-[#B7B3B3]'}`}>
                  <span className="text-[20px] leading-none">{n}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 pt-8 pb-28 flex-1">
        <h2 className="text-[24px] font-bold text-[#E6A23C] mb-5">選擇計劃</h2>

        <div className="space-y-6 text-[16px] leading-[1.6] text-[#1F1F1F] mb-8">
          <p>你的僱主為你提供了以下強積金計劃選擇。請按「下一步」繼續。</p>
          <p>
            如以下顯示多於一個計劃選項，請按你的需要選擇其中一個計劃。你可到積金局的「<span className="underline">受託人服務比較平台</span>」（https://tscplatform.mpfa.org.hk/scp/tch/index.jsp）比較不同受託人提供的計劃及服務詳情。「<span className="underline">受託人服務比較平台</span>」由積金局提供，比較不同受託人提供的計劃及服務詳情。
          </p>
        </div>

        <button
          onClick={() => setSelected(!selected)}
          className={`w-full bg-white rounded-[28px] px-6 pt-8 pb-7 shadow-[0_3px_12px_rgba(0,0,0,0.08)] text-left transition-all ${selected ? 'border-[3px] border-[#E6A23C]' : 'border border-[#D8D1D1]'}`}
        >
          <h3 className="text-[22px] font-bold text-[#1F1F1F] mb-2 text-center tracking-[-0.01em]">友邦強積金優選計劃</h3>
          <p className="text-[16px] text-[#666666] leading-[1.6] mb-7">AIA MPF - Prime Value Choice</p>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              window.open('https://www.aia.com.hk/content/dam/hk-financial-assets/zh/docs/individual/wealth-management/mpf/aia-mpf-prime-value-choice-brochure-chi.pdf', '_blank', 'noopener,noreferrer');
            }}
            className="w-full bg-[#F7EFE7] rounded-[16px] px-6 py-7 flex items-start justify-between text-left"
          >
            <div>
              <div className="text-[18px] font-bold text-[#1F1F1F] mb-6">成分基金列表</div>
              <div className="text-[16px] text-[#1F1F1F] leading-[1.5]">由受託人提供</div>
            </div>
            <ExternalLink size={24} className="text-[#1F1F1F] flex-shrink-0 mt-1" />
          </button>
        </button>
      </div>

      <div className="sticky bottom-0 bg-[#F6F5F4] px-6 pt-3 pb-6">
        <button className={`w-full h-[58px] rounded-full text-[19px] font-semibold border ${selected ? 'bg-[#19345B] text-white border-[#19345B]' : 'bg-[#E8E5E5] text-[#B7B3B3] border-[#D7D3D3]'}`}>下一步</button>
      </div>
    </div>
  );
};

export default EnrolmentStep1Page;
