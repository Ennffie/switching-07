import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { usePersonalAccount } from '../context/PersonalAccountContext';

const funds = [
  { name: '友邦強積金優選計劃 - 美洲基金', balance: 32150.5, color: '#1AA6A1' },
  { name: '友邦強積金優選計劃 - 北美股票基金', balance: 31980.25, color: '#7597B8' },
  { name: '友邦強積金優選計劃 - 增長組合', balance: 32245.8, color: '#F2A100' },
  { name: '友邦強積金優選計劃 - 均衡組合', balance: 32020.36, color: '#7D5BA6' },
];

const PersonalAccountPage = () => {
  const navigate = useNavigate();
  const { data } = usePersonalAccount();
  const [activeTab, setActiveTab] = useState<'overview' | 'details'>('overview');
  const [openAssets, setOpenAssets] = useState(true);
  const [openSummary, setOpenSummary] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const totalFundBalance = funds.reduce((sum, fund) => sum + fund.balance, 0);
  const donutGradient = (() => {
    const total = totalFundBalance;
    let current = 0;
    return funds
      .map((fund) => {
        const start = (current / total) * 360;
        current += fund.balance;
        const end = (current / total) * 360;
        return `${fund.color} ${start}deg ${end}deg`;
      })
      .join(', ');
  })();

  return (
    <div className="min-h-screen bg-[#FAF9F8] pb-24">
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

      <div className="px-5 py-5 bg-white">
        <div className="flex items-center gap-4">
          <img src="./icons/aia-logo-new.jpg" alt="AIA" className="w-[52px] h-[52px] object-contain rounded-full" />
          <div className="flex-1 text-[20px] font-semibold text-[#1F1F1F]">友邦強積金優選計劃</div>
          <ChevronDown size={22} className="text-[#1F1F1F]" />
        </div>
      </div>

      <div className="bg-white px-6 pt-2">
        <div className="flex border-b border-[#E5E1DD]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`relative flex-1 pb-4 pt-3 text-[17px] font-semibold ${activeTab === 'overview' ? 'text-[#E4A11B]' : 'text-[#B8B2AE]'}`}
          >
            帳戶概覽
            {activeTab === 'overview' && <span className="absolute left-0 right-0 -bottom-[1px] h-[4px] rounded-full bg-[#F2A100]" />}
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`relative flex-1 pb-4 pt-3 text-[17px] font-semibold ${activeTab === 'details' ? 'text-[#E4A11B]' : 'text-[#B8B2AE]'}`}
          >
            帳戶資料
            {activeTab === 'details' && <span className="absolute left-0 right-0 -bottom-[1px] h-[4px] rounded-full bg-[#F2A100]" />}
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="bg-white px-5 pt-6 pb-7">
            <div className="mx-auto relative w-[292px] h-[292px]">
              <div className="absolute inset-0 rounded-full" style={{ background: `conic-gradient(${donutGradient})` }} />
              <div className="absolute inset-[34px] rounded-full bg-white flex flex-col items-center justify-center text-center">
                <div className="text-[20px] font-medium text-[#1F1F1F] mb-2">總結餘</div>
                <div className="text-[25px] font-bold text-[#111] mb-2">$ {totalFundBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                <div className="text-[16px] text-[#7C7878]">截至 12/03/2026</div>
              </div>
            </div>
          </div>

          <button onClick={() => setOpenAssets(v => !v)} className="w-full bg-white px-5 py-5 flex items-center justify-between border-t border-b border-[#ECE7E1] text-left mt-2">
            <div className="text-[18px] text-[#1F1F1F] leading-[1.45]">我目前持有的資產（以供款類別劃分）</div>
            {openAssets ? <ChevronUp size={22} className="text-[#1F1F1F] flex-shrink-0 ml-3" /> : <ChevronDown size={22} className="text-[#1F1F1F] flex-shrink-0 ml-3" />}
          </button>

          {openAssets && (
            <div className="bg-[#F7F5F2] px-4 py-4 space-y-4">
              {funds.map((fund) => (
                <div key={fund.name} className="bg-white rounded-[18px] border border-[#E8E3DD] p-5 flex items-start gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <div className="w-[10px] self-stretch rounded-full" style={{ backgroundColor: fund.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="text-[20px] font-semibold leading-[1.35] text-[#1F1F1F]">{fund.name}</div>
                      <img src="./icons/icon-external.png" alt="external" className="w-[22px] h-[22px] object-contain opacity-70 mt-1" />
                    </div>
                    <div className="text-[14px] text-[#8F8B8B] mb-1">基金結餘：</div>
                    <div className="text-[20px] text-[#6D6A67]">$ {fund.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>
                  <div className="w-[86px] h-[86px] rounded-[14px] border border-[#D9D4CE] flex items-center justify-center text-[22px] text-[#1F1F1F] bg-white shrink-0">
                    0
                  </div>
                  <div className="text-[20px] text-[#6D6A67] pt-7">%</div>
                </div>
              ))}
            </div>
          )}

          <button onClick={() => setOpenSummary(v => !v)} className="w-full bg-white px-5 py-5 flex items-center justify-between border-t border-b border-[#ECE7E1] text-left mt-3">
            <div className="text-[18px] text-[#1F1F1F] leading-[1.45]">我目前持有的資產概覽</div>
            {openSummary ? <ChevronUp size={22} className="text-[#1F1F1F] flex-shrink-0 ml-3" /> : <ChevronDown size={22} className="text-[#1F1F1F] flex-shrink-0 ml-3" />}
          </button>
        </>
      )}

      {activeTab === 'details' && (
        <div className="bg-white">
          <div className="bg-[#FFF8F0] mx-4 mt-4 rounded-[12px] p-5 relative">
            <div className="text-[20px] font-bold text-[#1F1F1F] mb-1">友邦強積金優選計劃</div>
            <div className="text-[14px] text-[#7C7878] mb-1">帳戶號碼：70741425</div>
            <button onClick={() => navigate('/personal-account-edit')} className="absolute right-4 top-4 w-[36px] h-[36px] flex items-center justify-center">
              <svg className="w-[24px] h-[24px] text-[#1F1F1F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M12 8v8M8 12h8" />
              </svg>
            </button>
          </div>

          <button className="w-full bg-white px-5 py-5 flex items-center justify-between border-y border-[#ECE7E1] text-left mt-4">
            <div className="text-[18px] font-medium text-[#8F8B8B]">聯絡資料</div>
            <ChevronUp size={22} className="text-[#1F1F1F]" />
          </button>
          <div className="px-5 py-5 space-y-4 bg-white">
            <div>
              <div className="text-[14px] text-[#8F8B8B] mb-1">電郵地址</div>
              <div className="text-[16px] text-[#1F1F1F] uppercase">{data.email || 'enfieldlaw@yahoo.com.hk'}</div>
            </div>
            <div>
              <div className="text-[14px] text-[#8F8B8B] mb-1">手機號碼</div>
              <div className="text-[16px] text-[#1F1F1F]">+852 {data.mobileNumber || '98849795'}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalAccountPage;
