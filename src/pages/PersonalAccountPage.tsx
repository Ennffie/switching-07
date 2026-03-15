import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';

const PersonalAccountPage = () => {
  const navigate = useNavigate();
  const [openAssets, setOpenAssets] = useState(true);
  const [openOverview, setOpenOverview] = useState(true);
  const [openFuture, setOpenFuture] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-20 bg-white shadow-sm">
        <div className="px-4 pt-3 pb-2 flex items-center justify-center relative">
          <button onClick={() => navigate(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 p-1 text-gray-700">
            <ChevronLeft size={24} />
          </button>
          <div className="text-center">
            <div className="text-[18px] font-semibold text-[#1F1F1F]">個人帳戶</div>
            <div className="text-[14px] text-[#7C7878] mt-1">帳戶號碼：70741425</div>
          </div>
        </div>
      </div>

      <div className="px-5 pt-8 pb-6 flex items-center gap-4">
        <img src="./icons/aia-logo-new.jpg" alt="友邦" className="w-[56px] h-[56px] object-contain" />
        <div className="flex-1 text-[20px] font-semibold text-[#1F1F1F]">友邦強積金優選計劃</div>
        <ChevronDown size={22} className="text-[#1F1F1F]" />
      </div>

      <div className="px-5 border-b border-[#E9E5E5]">
        <div className="flex">
          <button className="relative pb-4 pr-8 text-[18px] font-semibold text-[#E5A127]">
            帳戶概覽
            <div className="absolute left-0 right-0 bottom-0 h-[4px] bg-[#F5A623] rounded-full" />
          </button>
          <button className="pb-4 pl-8 text-[18px] font-medium text-[#B9B4B4]">帳戶資料</button>
        </div>
      </div>

      <div className="pt-6 pb-4 flex flex-col items-center border-b border-[#ECE7E1]">
        <div className="relative w-[280px] h-[280px] rounded-full border-[28px] border-[#7293B0] flex items-center justify-center">
          <div className="absolute top-[-28px] left-1/2 -translate-x-1/2 w-[10px] h-[28px] bg-[#1FB5B4] rounded-full" />
          <div className="text-center">
            <div className="text-[20px] text-[#1F1F1F] mb-2">總結餘</div>
            <div className="text-[26px] font-bold text-[#111] mb-2">$ 30,673.78</div>
            <div className="text-[20px] text-[#2BAE9A]">▲ $ 17,528.34</div>
          </div>
        </div>
        <div className="text-[18px] text-[#1F1F1F] mt-6">截至 12/03/2026</div>
      </div>

      <button onClick={() => setOpenAssets(v => !v)} className="w-full px-5 py-5 flex items-center justify-between border-b border-[#ECE7E1] text-left">
        <div className="text-[18px] text-[#1F1F1F] leading-[1.5]">我目前持有的資產（以供款類別劃分） （截至 12/03/2026）</div>
        {openAssets ? <ChevronUp size={22} className="text-[#1F1F1F] flex-shrink-0" /> : <ChevronDown size={22} className="text-[#1F1F1F] flex-shrink-0" />}
      </button>

      {openAssets && (
        <div className="border-b border-[#ECE7E1]">
          <div className="grid grid-cols-2 text-center text-[18px] bg-[#FCF3E8] border-b border-[#E8DDD0]">
            <div className="py-4 font-semibold text-[#1F1F1F] border-r border-[#E8DDD0]">市場價值</div>
            <div className="py-4 text-[#C8C2BC]">強制性供款</div>
          </div>
          <div className="grid grid-cols-[1fr_150px] bg-[#F59E0B] text-white text-[16px] font-semibold">
            <div className="px-4 py-2">基金名稱</div>
            <div className="px-4 py-2 text-right">市場價值（港幣）</div>
          </div>
          <div className="grid grid-cols-[8px_1fr_150px] border-b border-[#EAE6E1] bg-white">
            <div className="bg-[#6B8FB0]" />
            <div className="px-4 py-3 text-[18px] leading-[1.5] text-[#1F1F1F]">友邦強積金優選計劃 - 大中華股票基金</div>
            <div className="px-4 py-3 text-[18px] font-semibold text-right text-[#1F1F1F]">$ 30,426.94</div>
          </div>
          <div className="grid grid-cols-[8px_1fr_150px] bg-white">
            <div className="bg-[#1FB5B4]" />
            <div className="px-4 py-3 text-[18px] leading-[1.5] text-[#1F1F1F]">友邦強積金優選計劃 - 亞洲股票基金</div>
            <div className="px-4 py-3 text-[18px] font-semibold text-right text-[#1F1F1F]">$ 246.84</div>
          </div>
        </div>
      )}

      <button onClick={() => setOpenOverview(v => !v)} className="w-full px-5 py-5 flex items-center justify-between border-b border-[#ECE7E1] text-left">
        <div className="text-[18px] text-[#1F1F1F]">我目前持有的資產概覽（截至 12/03/2026）</div>
        {openOverview ? <ChevronUp size={22} className="text-[#1F1F1F]" /> : <ChevronDown size={22} className="text-[#1F1F1F]" />}
      </button>

      <button onClick={() => setOpenFuture(v => !v)} className="w-full px-5 py-5 flex items-center justify-between border-b border-[#ECE7E1] text-left">
        <div className="text-[18px] text-[#1F1F1F]">投資授權（用於未來供款）</div>
        {openFuture ? <ChevronUp size={22} className="text-[#1F1F1F]" /> : <ChevronDown size={22} className="text-[#1F1F1F]" />}
      </button>

      <button className="fixed right-6 bottom-8 w-[62px] h-[62px] rounded-full bg-[#173A68] shadow-[0_6px_20px_rgba(0,0,0,0.2)] flex items-center justify-center">
        <img src="./icons/icon-menu-grid.png" alt="menu" className="w-7 h-7 object-contain" />
      </button>
    </div>
  );
};

export default PersonalAccountPage;
