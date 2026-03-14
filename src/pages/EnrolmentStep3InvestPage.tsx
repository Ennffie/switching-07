import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Info } from 'lucide-react';
import { useEnrolment } from '../context/EnrolmentContext';

interface Fund {
  id: string;
  name: string;
  allocation: number;
  riskLevel: number;
  description?: string;
}

type ContributionType = 'mandatory' | 'voluntary';

const riskColors: Record<number, string> = {
  1: 'bg-blue-500',
  2: 'bg-cyan-500',
  3: 'bg-teal-500',
  4: 'bg-green-500',
  5: 'bg-yellow-500',
  6: 'bg-orange-500',
  7: 'bg-red-500',
};

const allInFunds: Fund[] = [
  { id: '1', name: '預設投資策略', allocation: 0, riskLevel: 4 },
  { id: '2', name: '友邦強積金優選計劃 - 保證組合', allocation: 0, riskLevel: 1 },
  { id: '3', name: '友邦強積金優選計劃 - 強積金保守基金', allocation: 0, riskLevel: 1 },
  { id: '4', name: '友邦強積金優選計劃 - 65歲後基金', allocation: 0, riskLevel: 3, description: '當65歲後基金或核心累積基金作為獨立投資選項，預設投資策略的風險降低機制並不適用' },
  { id: '5', name: '友邦強積金優選計劃 - 亞洲債券基金', allocation: 0, riskLevel: 3 },
  { id: '6', name: '友邦強積金優選計劃 - 均衡組合', allocation: 0, riskLevel: 4 },
  { id: '7', name: '友邦強積金優選計劃 - 穩定資本組合', allocation: 0, riskLevel: 4 },
  { id: '8', name: '友邦強積金優選計劃 - 環球債券基金', allocation: 0, riskLevel: 4 },
  { id: '9', name: '友邦強積金優選計劃 - 中港動態資產配置基金', allocation: 0, riskLevel: 5 },
  { id: '10', name: '友邦強積金優選計劃 - 核心累積基金', allocation: 0, riskLevel: 5, description: '當65歲後基金或核心累積基金作為獨立投資選項，預設投資策略的風險降低機制並不適用' },
  { id: '11', name: '友邦強積金優選計劃 - 增長組合', allocation: 0, riskLevel: 5 },
  { id: '12', name: '友邦強積金優選計劃 - 基金經理精選退休基金', allocation: 0, riskLevel: 5 },
  { id: '13', name: '友邦強積金優選計劃 - 美洲基金', allocation: 0, riskLevel: 6 },
  { id: '14', name: '友邦強積金優選計劃 - 亞洲股票基金', allocation: 0, riskLevel: 6 },
  { id: '15', name: '友邦強積金優選計劃 - 亞歐基金', allocation: 0, riskLevel: 6 },
  { id: '16', name: '友邦強積金優選計劃 - 歐洲股票基金', allocation: 0, riskLevel: 6 },
  { id: '17', name: '友邦強積金優選計劃 - 大中華股票基金', allocation: 0, riskLevel: 6 },
  { id: '18', name: '友邦強積金優選計劃 - 綠色退休基金', allocation: 0, riskLevel: 6 },
  { id: '19', name: '友邦強積金優選計劃 - 中港基金', allocation: 0, riskLevel: 6 },
  { id: '20', name: '友邦強積金優選計劃 - 北美股票基金', allocation: 0, riskLevel: 6 },
  { id: '21', name: '友邦強積金優選計劃 - 全球基金', allocation: 0, riskLevel: 6 },
];

const EnrolmentStep3InvestPage = () => {
  const navigate = useNavigate();
  const {
    mandatoryFunds: savedMandatoryFunds,
    voluntaryFunds: savedVoluntaryFunds,
    setMandatoryFunds: setConfirmMandatoryFunds,
    setVoluntaryFunds: setConfirmVoluntaryFunds
  } = useEnrolment();
  const [contributionType, setContributionType] = useState<ContributionType>('mandatory');
  const [mandatoryFunds, setMandatoryFunds] = useState<Fund[]>(() => allInFunds.map(f => { const saved = savedMandatoryFunds.find(sf => sf.name === f.name); return saved ? { ...f, allocation: saved.allocation } : f; }));
  const [voluntaryFunds, setVoluntaryFunds] = useState<Fund[]>(() => allInFunds.map(f => { const saved = savedVoluntaryFunds.find(sf => sf.name === f.name); return saved ? { ...f, allocation: saved.allocation } : f; }));
  const [showKeypad, setShowKeypad] = useState(false);
  const [activeFundId, setActiveFundId] = useState<string | null>(null);
  const [keypadValue, setKeypadValue] = useState('');

  useEffect(() => { window.scrollTo(0,0); }, []);

  useEffect(() => {
    if (savedMandatoryFunds.length > 0) {
      setMandatoryFunds(allInFunds.map(f => { const saved = savedMandatoryFunds.find(sf => sf.name === f.name); return saved ? { ...f, allocation: saved.allocation } : { ...f, allocation: 0 }; }));
    }
    if (savedVoluntaryFunds.length > 0) {
      setVoluntaryFunds(allInFunds.map(f => { const saved = savedVoluntaryFunds.find(sf => sf.name === f.name); return saved ? { ...f, allocation: saved.allocation } : { ...f, allocation: 0 }; }));
    }
  }, [savedMandatoryFunds, savedVoluntaryFunds]);

  const currentFunds = contributionType === 'mandatory' ? mandatoryFunds : voluntaryFunds;
  const mandatoryTotal = useMemo(() => mandatoryFunds.reduce((sum, f) => sum + f.allocation, 0), [mandatoryFunds]);
  const voluntaryTotal = useMemo(() => voluntaryFunds.reduce((sum, f) => sum + f.allocation, 0), [voluntaryFunds]);
  const total = contributionType === 'mandatory' ? mandatoryTotal : voluntaryTotal;
  const isNextEnabled = mandatoryTotal === 100 && voluntaryTotal === 100;

  const openFundLink = () => {
    window.open('https://web.aia.com.hk/zh-hk/retirement/mpf/individual-member-fund-price', '_blank', 'noopener,noreferrer');
  };

  const openDisInfo = () => {
    navigate('/enrolment-dis');
  };

  const applyAllocation = (id: string, parsed: number) => {
    const updater = (funds: Fund[]) => funds.map(f => f.id === id ? { ...f, allocation: parsed } : f);
    if (contributionType === 'mandatory') setMandatoryFunds(prev => updater(prev));
    else setVoluntaryFunds(prev => updater(prev));
  };

  const openKeypad = (id: string, current: number) => {
    setActiveFundId(id);
    setKeypadValue(current === 0 ? '' : String(current));
    setShowKeypad(true);
  };

  const handleKeypadPress = (digit: string) => {
    const nextRaw = `${keypadValue}${digit}`.replace(/^0+(?=\d)/, '');
    const parsed = nextRaw === '' ? 0 : Math.min(100, parseInt(nextRaw, 10));
    const next = parsed === 0 ? '' : String(parsed);
    setKeypadValue(next);
    if (activeFundId) applyAllocation(activeFundId, parsed);
  };

  const handleKeypadDelete = () => {
    const next = keypadValue.slice(0, -1);
    const parsed = next === '' ? 0 : parseInt(next, 10);
    setKeypadValue(next);
    if (activeFundId) applyAllocation(activeFundId, parsed);
  };
  const resetCurrentTab = () => {
    const cleared = (funds: Fund[]) => funds.map(f => ({ ...f, allocation: 0 }));
    if (contributionType === 'mandatory') setMandatoryFunds(prev => cleared(prev));
    else setVoluntaryFunds(prev => cleared(prev));
    setKeypadValue('');
    setActiveFundId(null);
    setShowKeypad(false);
  };


  return (
    <div className="min-h-screen bg-[#F6F5F4] flex flex-col">
      <div className="sticky top-0 z-20 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="px-4 pt-4 pb-4 flex items-center justify-center relative border-b border-[#ECECEC]">
          <button onClick={() => navigate(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center"><img src="./icons/icon-back.png" alt="返回" className="w-6 h-6 object-contain" /></button>
          <h1 className="text-[18px] font-semibold text-[#1F1F1F] tracking-[-0.01em]">申請一般僱員</h1>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-4">
            <img src="./icons/icon-save.png" alt="儲存" className="w-6 h-6 object-contain" />
            <button onClick={() => navigate('/')} className="w-5 h-5 flex items-center justify-center"><img src="./icons/icon-close.png" alt="關閉" className="w-5 h-5 object-contain" /></button>
          </div>
        </div>

        <div className="px-6 pt-4 pb-4 bg-white">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-[18px] left-[40px] right-[40px] h-[2px] bg-[#E6E3E3]" />
            {['✓','✓','3','4'].map((n, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[20px] font-bold ${i < 3 ? 'bg-[#F5A623] text-white shadow-[0_2px_4px_rgba(0,0,0,0.12)]' : 'bg-[#EDEBEB] text-[#B7B3B3]'}`}>
                  <span className="text-[20px] leading-none">{n}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`px-6 pt-8 flex-1 ${showKeypad ? 'pb-[310px]' : 'pb-44'}`}>
        <h2 className="text-[24px] font-bold text-[#E6A23C] mb-5">投資選擇</h2>
        <div className="space-y-4 text-[16px] leading-[1.65] text-[#1F1F1F] mb-7">
          <p>在作出投資選擇前，你應先了解不同基金的風險等級並衡量自己的風險承受能力。</p>
          <p>請指示如何把投資分配至下列成分基金內。強制性供款和自願性供款（如有），將根據你於下表提供的投資選擇作出投資。投資分配百分比必須為整數（例如：須為50%而非50.5%）及其總和必須為100%。</p>
          <p>有關 DIS 詳情，請參閱積金局網站。</p>
        </div>

        <div className="flex border-b border-[#E4E0E0] mb-4 overflow-hidden">
          <button onClick={() => setContributionType('mandatory')} className={`flex-1 pb-3 text-[16px] font-medium relative ${contributionType === 'mandatory' ? 'text-[#E6A23C]' : 'text-[#B1AEAE]'}`}>
            僱主強制性供款分配
            {contributionType === 'mandatory' && <div className="absolute left-0 right-0 bottom-0 h-[3px] bg-[#F5A623] rounded-full" />}
          </button>
          <button onClick={() => setContributionType('voluntary')} className={`flex-1 pb-3 text-[16px] font-medium relative ${contributionType === 'voluntary' ? 'text-[#E6A23C]' : 'text-[#B1AEAE]'}`}>
            僱主自願性供款分配
            {contributionType === 'voluntary' && <div className="absolute left-0 right-0 bottom-0 h-[3px] bg-[#F5A623] rounded-full" />}
          </button>
        </div>

        <button onClick={resetCurrentTab} className="flex justify-end items-center gap-2 mb-5 text-[#1F1F1F] w-full">
          <img src="./icons/icon-reset.png" alt="重設" className="w-6 h-6 object-contain" />
          <span className="text-[17px] font-medium">重設分配</span>
        </button>

        <div className="space-y-4">
          {currentFunds.map((fund) => (
            <div key={fund.id} className="bg-white border border-[#E2DEDE] rounded-[18px] px-5 py-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-3">
                    <div className="text-[18px] leading-[1.45] text-[#1F1F1F] font-medium break-words">{fund.name}</div>
                    {!fund.name.includes('預設投資策略') && <button onClick={(e) => { e.stopPropagation(); openFundLink(); }} className="mt-[2px] flex-shrink-0"><ExternalLink size={18} strokeWidth={1.8} className="text-[#B9B5B5]" /></button>}
                    {fund.name.includes('預設投資策略') && <button onClick={(e) => { e.stopPropagation(); openDisInfo(); }} className="mt-[2px] flex-shrink-0"><Info size={18} strokeWidth={1.8} className="text-[#B9B5B5]" /></button>}
                  </div>
                  {fund.description && <p className="text-[15px] text-[#7A7777] leading-[1.45] mb-3">{fund.description}</p>}
                  <div className="flex items-center gap-2">
                    <div className={`w-[4px] h-[22px] rounded-full ${riskColors[fund.riskLevel]}`} />
                    <span className="text-[16px] text-[#7B7878]">風險級別 {fund.riskLevel}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 pl-2">
                  <button onClick={() => openKeypad(fund.id, fund.allocation)} className={`w-[74px] h-[50px] rounded-[6px] border bg-white text-center text-[20px] text-[#1F1F1F] outline-none flex items-center justify-center ${activeFundId === fund.id && showKeypad ? 'border-[#F5A623]' : 'border-[#D7D3D3]'}`}>
                    <span className="relative inline-flex items-center justify-center min-w-[12px]">
                      <span>{fund.allocation || 0}</span>
                      {activeFundId === fund.id && showKeypad && <span className="ml-[2px] inline-block w-[1.5px] h-[22px] bg-[#1F1F1F] animate-pulse" />}
                    </span>
                  </button>
                  <span className="text-[18px] text-[#7A7777]">%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed left-0 right-0 bottom-0 z-20 bg-white px-6 pt-4 pb-6 border-t border-[#E9E5E5] shadow-[0_-2px_8px_rgba(0,0,0,0.03)]">
        <div className="flex justify-between items-center mb-2 text-[18px] font-medium">
          <span className="text-[#1F1F1F]">總和：</span>
          <span className={`text-[20px] font-bold ${total === 100 ? 'text-[#E39118]' : 'text-[#D62828]'}`}>{total}%</span>
        </div>
        <button onClick={() => { if (!isNextEnabled) return; setConfirmMandatoryFunds(mandatoryFunds.filter(f => f.allocation > 0).map(f => ({ name: f.name, allocation: f.allocation }))); setConfirmVoluntaryFunds(voluntaryFunds.filter(f => f.allocation > 0).map(f => ({ name: f.name, allocation: f.allocation }))); navigate('/enrolment-confirm'); }} className={`w-full h-[58px] rounded-full text-[19px] font-semibold mb-4 ${isNextEnabled ? 'bg-[#19345B] text-white' : 'bg-[#E6E3E3] text-[#B8B4B4]'}`}>下一步</button>
        <div className="text-center text-[18px] text-[#9A9696]">新增指示</div>
      </div>

      {showKeypad && (
        <>
          <button onClick={() => setShowKeypad(false)} className="fixed inset-0 z-25 bg-transparent" aria-label="關閉鍵盤" />
          <div className="fixed left-0 right-0 bottom-0 z-30 bg-[#D1D5DB] border-t border-[#BFC5CD] px-[6px] pt-[6px] pb-[14px]">
            <div className="grid grid-cols-3 gap-[5px]">
              {[
                ['1', ''], ['2', 'ABC'], ['3', 'DEF'],
                ['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO'],
                ['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ'],
              ].map(([n, sub]) => (
                <button key={n} onClick={() => handleKeypadPress(n)} className="h-[58px] rounded-[6px] bg-white flex flex-col items-center justify-center shadow-[0_1px_0_rgba(0,0,0,0.16)]">
                  <span className="text-[18px] leading-none text-black">{n}</span>
                  {sub ? <span className="text-[9px] leading-none mt-1 tracking-[0.12em] text-black font-semibold">{sub}</span> : <span className="h-[9px] mt-1" />}
                </button>
              ))}
              <div className="h-[58px]" />
              <button onClick={() => handleKeypadPress('0')} className="h-[58px] rounded-[6px] bg-white flex items-center justify-center shadow-[0_1px_0_rgba(0,0,0,0.16)]">
                <span className="text-[18px] leading-none text-black">0</span>
              </button>
              <button onClick={handleKeypadDelete} className="h-[58px] rounded-[6px] bg-[#D1D5DB] flex items-center justify-center">
                <span className="inline-flex items-center justify-center w-[28px] h-[20px] border-[1.5px] border-black rounded-[6px] text-[14px] leading-none text-black">⌫</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EnrolmentStep3InvestPage;
