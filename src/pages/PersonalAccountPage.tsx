import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { usePersonalAccount } from '../context/PersonalAccountContext';

const funds = [
  { name: '友邦強積金優選計劃 - 大中華股票基金', balance: 30426.94, color: '#F6A800' },
  { name: '友邦強積金優選計劃 - 亞洲股票基金', balance: 246.84, color: '#18B7B5' },
];

const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="text-[14px] text-[#A7A19C] mb-1 leading-[1.45]">{label}</div>
    <div className="text-[16px] text-[#111] leading-[1.45] break-words">{value}</div>
  </div>
);

const PersonalAccountPage = () => {
  const navigate = useNavigate();
  const { data } = usePersonalAccount();
  const [activeTab, setActiveTab] = useState<'overview' | 'details'>('overview');
  const [openContact, setOpenContact] = useState(true);
  const [openAddress, setOpenAddress] = useState(false);
  const [openCommAddress, setOpenCommAddress] = useState(false);
  const [openCommMethod, setOpenCommMethod] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const totalFundBalance = 30673.78;
  const donutGradient = (() => {
    const total = funds.reduce((sum, fund) => sum + fund.balance, 0);
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

  const sectionHeader = (title: string, open: boolean, onClick: () => void) => (
    <button onClick={onClick} className="w-full bg-white px-5 py-5 flex items-center justify-between border-t border-[#ECE7E1] text-left">
      <div className="text-[18px] font-medium text-[#1F1F1F]">{title}</div>
      {open ? <ChevronUp size={22} className="text-[#1F1F1F]" /> : <ChevronDown size={22} className="text-[#1F1F1F]" />}
    </button>
  );

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
            className={`relative flex-1 pb-4 pt-3 text-[17px] font-semibold ${activeTab === 'overview' ? 'text-[#E5A323]' : 'text-[#B8B2AE]'}`}
          >
            帳戶概覽
            {activeTab === 'overview' && <span className="absolute left-0 right-0 -bottom-[1px] h-[4px] rounded-full bg-[#F6A800]" />}
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`relative flex-1 pb-4 pt-3 text-[17px] font-semibold ${activeTab === 'details' ? 'text-[#E5A323]' : 'text-[#B8B2AE]'}`}
          >
            帳戶資料
            {activeTab === 'details' && <span className="absolute left-0 right-0 -bottom-[1px] h-[4px] rounded-full bg-[#F6A800]" />}
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
                <div className="flex items-center gap-2 text-[#2AA69A] text-[18px] font-medium mb-1"><span>▲</span><span>$ 17,528.34</span></div>
                <div className="text-[16px] text-[#1F1F1F]">截至 12/03/2026</div>
              </div>
            </div>
          </div>

          <div className="w-full bg-white px-5 py-5 border-t border-b border-[#ECE7E1] text-left mt-2">
            <div className="text-[18px] text-[#1F1F1F] leading-[1.45] mb-4">我目前持有的資產（以供款類別劃分）</div>
            <div className="bg-white">
              <div className="grid grid-cols-2 border-b border-[#E7E0D6]">
                <div className="text-center py-4 text-[18px] font-semibold text-[#1F1F1F] border-r border-[#E7E0D6]">市場價值</div>
                <div className="text-center py-4 text-[18px] font-semibold text-[#CFC8C1]">強制性供款</div>
              </div>
              <div className="bg-[#F6A800] text-white grid grid-cols-[1fr_140px] px-4 py-2 text-[16px] font-semibold">
                <div>基金名稱</div>
                <div className="text-right">市場價值（港幣）</div>
              </div>
              {funds.map((fund) => (
                <div key={fund.name} className="grid grid-cols-[8px_1fr_140px] items-start border-b border-[#ECE7E1] bg-white">
                  <div className="h-full min-h-[72px]" style={{ backgroundColor: fund.color }} />
                  <div className="px-4 py-3 text-[16px] leading-[1.45] text-[#1F1F1F]">{fund.name}</div>
                  <div className="px-4 py-3 text-right text-[18px] font-semibold text-[#1F1F1F]">$ {fund.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'details' && (
        <div className="bg-white">
          <div className="bg-[#FFF8F0] mx-4 mt-4 rounded-[12px] p-5 relative">
            <div className="text-[20px] font-bold text-[#1F1F1F] mb-1">友邦強積金優選計劃</div>
            <div className="text-[14px] text-[#7C7878] mb-1">帳戶號碼：70741425</div>
            <button onClick={() => navigate('/personal-account-edit')} className="absolute right-4 top-4 w-[36px] h-[36px] flex items-center justify-center">
              <img src="./icons/icon-external.png" alt="external" className="w-[22px] h-[22px] object-contain" />
            </button>
          </div>

          <div className="px-5 pt-6 pb-2 bg-white">
            <div className="text-[14px] text-[#8F8B8B] mb-1">帳戶結餘（港幣）</div>
            <div className="text-[16px] text-[#111] font-medium">$ 30,673.78</div>
          </div>
          <div className="px-5 pt-2 pb-5 bg-white border-b border-[#ECE7E1]">
            <div className="text-[14px] text-[#8F8B8B] mb-1">帳戶生效日期（日／月／年）</div>
            <div className="text-[16px] text-[#111] font-medium">24/09/2011</div>
          </div>

          {sectionHeader('聯絡資料', openContact, () => setOpenContact(v => !v))}
          {openContact && (
            <div className="px-5 py-5 bg-white space-y-7 border-b border-[#ECE7E1]">
              <Field label="電郵地址" value={data.email || 'enfieldlaw@yahoo.com.hk'} />
              <Field label="手機號碼" value={`+852 ${data.mobileNumber || '98849795'}`} />
            </div>
          )}

          {sectionHeader('地址', openAddress, () => setOpenAddress(v => !v))}
          {openAddress && (
            <div className="px-5 py-5 bg-white space-y-7 border-b border-[#ECE7E1]">
              <Field label="國家／地區" value={data.residentialCountry || '香港'} />
              <Field label="單位／室（例如：「2室」、「A室」）" value={data.residentialUnit || 'G/F'} />
              <Field label="層數（例如：「12樓」）" value={data.residentialFloor || '6A MAN SHUN LANE'} />
              <Field label="座（例如：「C座」）" value={data.residentialBlock || 'CHEUNG CHAU'} />
              <Field label="大廈" value={data.residentialBuilding || 'HONG KONG'} />
            </div>
          )}

          {sectionHeader('通訊地址', openCommAddress, () => setOpenCommAddress(v => !v))}
          {openCommAddress && (
            <div className="px-5 py-5 bg-white space-y-7 border-b border-[#ECE7E1]">
              <div className="text-[22px] font-semibold text-[#111]">通訊地址</div>
              <Field label="國家／地區" value={data.correspondenceCountry || data.residentialCountry || '香港'} />
              <Field label="單位／室（例如：「2室」、「A室」）" value={data.correspondenceUnit || data.residentialUnit || 'G/F'} />
              <Field label="層數（例如：「12樓」）" value={data.correspondenceFloor || data.residentialFloor || '6A MAN SHUN LANE'} />
              <Field label="座（例如：「C座」）" value={data.correspondenceBlock || data.residentialBlock || 'CHEUNG CHAU'} />
              <Field label="大廈" value={data.correspondenceBuilding || data.residentialBuilding || 'HONG KONG'} />
            </div>
          )}

          {sectionHeader('通訊方式', openCommMethod, () => setOpenCommMethod(v => !v))}
          {openCommMethod && (
            <div className="px-5 py-5 bg-white border-b border-[#ECE7E1]">
              <div className="text-[16px] text-[#111] leading-[1.7]">{data.directMarketingConsent === '是' ? '已同意直接促銷' : '未同意直接促銷'}</div>
            </div>
          )}

          <div className="fixed bottom-6 left-4 right-4 flex items-center gap-3 z-30">
            <button onClick={() => navigate('/personal-account-edit')} className="flex-1 h-[58px] rounded-full bg-[#1B355C] text-white text-[22px] font-semibold flex items-center justify-center gap-3 shadow-[0_6px_16px_rgba(0,0,0,0.18)]">
              <span className="text-[24px] leading-none">✎</span>
              <span>更新</span>
            </button>
            <button className="w-[58px] h-[58px] rounded-full bg-[#1B355C] flex items-center justify-center shadow-[0_6px_16px_rgba(0,0,0,0.18)]">
              <svg className="w-[22px] h-[22px] text-white" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalAccountPage;
