import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

type Tab = 'overview' | 'details';

const PersonalAccountPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [openAssets, setOpenAssets] = useState(true);
  const [openOverview, setOpenOverview] = useState(true);
  const [openFuture, setOpenFuture] = useState(true);
  const [openContact, setOpenContact] = useState(true);
  const [openAddress, setOpenAddress] = useState(true);
  const [openComm, setOpenComm] = useState(true);

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
          <button onClick={() => setActiveTab('overview')} className={`relative pb-4 pr-8 text-[18px] font-semibold ${activeTab === 'overview' ? 'text-[#E5A127]' : 'text-[#B9B4B4]'}`}>
            帳戶概覽
            {activeTab === 'overview' && <div className="absolute left-0 right-0 bottom-0 h-[4px] bg-[#F5A623] rounded-full" />}
          </button>
          <button onClick={() => setActiveTab('details')} className={`relative pb-4 pl-8 text-[18px] font-semibold ${activeTab === 'details' ? 'text-[#E5A127]' : 'text-[#B9B4B4]'}`}>
            帳戶資料
            {activeTab === 'details' && <div className="absolute left-8 right-0 bottom-0 h-[4px] bg-[#F5A623] rounded-full" />}
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="pt-6 pb-4 flex flex-col items-center border-b border-[#ECE7E1]">
            <div className="relative w-[280px] h-[280px] rounded-full border-[28px] border-[#7293B0] flex items-center justify-center">
              <div className="absolute top-[-28px] left-1/2 -translate-x-1/2 w-[10px] h-[28px] bg-[#1FB5B4] rounded-full" />
              <div className="text-center">
                <div className="text-[20px] text-[#1F1F1F] mb-2">總結餘</div>
                <div className="text-[26px] font-bold text-[#111] mb-2">$ 128,396.91</div>
                <div className="text-[20px] text-[#2BAE9A]">▲ $ 58,508.93</div>
              </div>
            </div>
            <div className="text-[18px] text-[#1F1F1F] mt-6">截至 14/03/2026</div>
          </div>

          <button onClick={() => setOpenAssets(v => !v)} className="w-full px-5 py-5 flex items-center justify-between border-b border-[#ECE7E1] text-left">
            <div className="text-[18px] text-[#1F1F1F] leading-[1.5]">我目前持有的資產（以供款類別劃分） （截至 14/03/2026）</div>
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
              {[
                ['#F59E0B', '友邦強積金優選計劃 - 美洲基金', '$ 32,150.50'],
                ['#F59E0B', '友邦強積金優選計劃 - 北美股票基金', '$ 31,980.25'],
                ['#F59E0B', '友邦強積金優選計劃 - 增長組合', '$ 32,245.80'],
                ['#F59E0B', '友邦強積金優選計劃 - 均衡組合', '$ 32,020.36'],
              ].map(([color, name, value], idx) => (
                <div key={name} className={`grid grid-cols-[8px_1fr_150px] ${idx < 3 ? 'border-b border-[#EAE6E1]' : ''} bg-white`}>
                  <div style={{ backgroundColor: color }} />
                  <div className="px-4 py-3 text-[18px] leading-[1.5] text-[#1F1F1F]">{name}</div>
                  <div className="px-4 py-3 text-[18px] font-semibold text-right text-[#1F1F1F]">{value}</div>
                </div>
              ))}
            </div>
          )}

          <button onClick={() => setOpenOverview(v => !v)} className="w-full px-5 py-5 flex items-center justify-between border-b border-[#ECE7E1] text-left">
            <div className="text-[18px] text-[#1F1F1F]">我目前持有的資產概覽（截至 14/03/2026）</div>
            {openOverview ? <ChevronUp size={22} className="text-[#1F1F1F]" /> : <ChevronDown size={22} className="text-[#1F1F1F]" />}
          </button>

          <button onClick={() => setOpenFuture(v => !v)} className="w-full px-5 py-5 flex items-center justify-between border-b border-[#ECE7E1] text-left">
            <div className="text-[18px] text-[#1F1F1F]">投資授權（用於未來供款）</div>
            {openFuture ? <ChevronUp size={22} className="text-[#1F1F1F]" /> : <ChevronDown size={22} className="text-[#1F1F1F]" />}
          </button>
        </>
      )}

      {activeTab === 'details' && (
        <div className="pb-32">
          <div className="px-5 pt-6 pb-4">
            <div className="bg-[#FCF3E8] rounded-[18px] px-5 py-5 flex items-start justify-between gap-4">
              <div>
                <div className="text-[20px] font-semibold text-[#1F1F1F] mb-2">友邦強積金優選計劃</div>
                <div className="text-[16px] text-[#6F6B6B]">帳戶號碼： 70741425</div>
              </div>
              <button className="text-[#1E3557] mt-1"><ExternalLink size={22} /></button>
            </div>
          </div>

          <div className="px-5 pb-6 space-y-8">
            <div>
              <div className="text-[18px] text-[#7A7777] mb-2">帳戶結餘（港幣）</div>
              <div className="text-[22px] font-semibold text-[#111]">$ 128,396.91</div>
            </div>
            <div>
              <div className="text-[18px] text-[#7A7777] mb-2">帳戶生效日期（日／月／年）</div>
              <div className="text-[22px] font-semibold text-[#111]">24/09/2011</div>
            </div>
          </div>

          <button onClick={() => setOpenContact(v => !v)} className="w-full px-5 py-5 flex items-center justify-between border-t border-b border-[#ECE7E1] text-left">
            <div className="text-[18px] text-[#1F1F1F]">聯絡資料</div>
            {openContact ? <ChevronUp size={22} className="text-[#1F1F1F]" /> : <ChevronDown size={22} className="text-[#1F1F1F]" />}
          </button>
          {openContact && (
            <div className="px-5 py-6 space-y-8 border-b border-[#ECE7E1]">
              <div>
                <div className="text-[18px] text-[#B0ACAC] mb-2">電郵地址</div>
                <div className="text-[22px] text-[#111]">enfieldlaw@yahoo.com.hk</div>
              </div>
              <div>
                <div className="text-[18px] text-[#B0ACAC] mb-2">手機號碼</div>
                <div className="text-[22px] text-[#111]">+852 98849795</div>
              </div>
            </div>
          )}

          <button onClick={() => setOpenAddress(v => !v)} className="w-full px-5 py-5 flex items-center justify-between border-b border-[#ECE7E1] text-left">
            <div className="text-[18px] text-[#1F1F1F]">地址</div>
            {openAddress ? <ChevronUp size={22} className="text-[#1F1F1F]" /> : <ChevronDown size={22} className="text-[#1F1F1F]" />}
          </button>
          {openAddress && (
            <div className="px-5 py-6 space-y-10 border-b border-[#ECE7E1]">
              <div>
                <div className="text-[22px] font-semibold text-[#111] mb-6">通訊地址</div>
                <div className="space-y-6">
                  <div><div className="text-[18px] text-[#B0ACAC] mb-2">國家／地區</div><div className="text-[22px] text-[#111]">香港</div></div>
                  <div><div className="text-[18px] text-[#B0ACAC] mb-2">單位／室（例如：「2室」、「A室」）</div><div className="text-[22px] text-[#111]">G/F</div></div>
                  <div><div className="text-[18px] text-[#B0ACAC] mb-2">層數（例如：「12樓」）</div><div className="text-[22px] text-[#111]">6A MAN SHUN LANE</div></div>
                  <div><div className="text-[18px] text-[#B0ACAC] mb-2">座（例如：「C座」）</div><div className="text-[22px] text-[#111]">CHEUNG CHAU</div></div>
                  <div><div className="text-[18px] text-[#B0ACAC] mb-2">大廈</div><div className="text-[22px] text-[#111]">HONG KONG</div></div>
                </div>
              </div>

              <div>
                <div className="text-[22px] font-semibold text-[#111] mb-6">住址</div>
                <div className="space-y-6">
                  <div><div className="text-[18px] text-[#B0ACAC] mb-2">國家／地區</div><div className="text-[22px] text-[#111]">香港</div></div>
                  <div><div className="text-[18px] text-[#B0ACAC] mb-2">單位／室（例如：「2室」、「A室」）</div><div className="text-[22px] text-[#111]">G/F</div></div>
                  <div><div className="text-[18px] text-[#B0ACAC] mb-2">層數（例如：「12樓」）</div><div className="text-[22px] text-[#111]">6A MAN SHUN LANE</div></div>
                  <div><div className="text-[18px] text-[#B0ACAC] mb-2">座（例如：「C座」）</div><div className="text-[22px] text-[#111]">CHEUNG CHAU</div></div>
                  <div><div className="text-[18px] text-[#B0ACAC] mb-2">大廈</div><div className="text-[22px] text-[#111]">HONG KONG</div></div>
                </div>
              </div>
            </div>
          )}

          <button onClick={() => setOpenComm(v => !v)} className="w-full px-5 py-5 flex items-center justify-between border-b border-[#ECE7E1] text-left">
            <div className="text-[18px] text-[#1F1F1F]">通訊方式</div>
            {openComm ? <ChevronUp size={22} className="text-[#1F1F1F]" /> : <ChevronDown size={22} className="text-[#1F1F1F]" />}
          </button>
        </div>
      )}

      <button className="fixed right-6 bottom-8 w-[62px] h-[62px] rounded-full bg-[#173A68] shadow-[0_6px_20px_rgba(0,0,0,0.2)] flex items-center justify-center z-10">
        <img src="./icons/icon-menu-grid.png" alt="menu" className="w-7 h-7 object-contain" />
      </button>

      {activeTab === 'details' && (
        <div className="fixed left-0 right-0 bottom-0 bg-white px-5 pt-3 pb-6 border-t border-[#ECE7E1] z-[5]">
          <button className="w-full h-[58px] rounded-full bg-[#1B355C] text-white text-[22px] font-semibold flex items-center justify-center gap-3">
            <span className="text-[22px]">✎</span>
            <span>更新</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonalAccountPage;
