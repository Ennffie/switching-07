import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ExternalLink, Info, ArrowUpDown, RotateCcw, X } from 'lucide-react';
import StepBar from '../components/StepBar';
import { useFutureInvest } from '../context/FutureInvestContext';

interface Fund {
  id: string;
  name: string;
  allocation: number;
  riskLevel: number;
  description?: string;
}

type ContributionType = 'employer-mandatory' | 'employee-mandatory';

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

const FutureInvestPage = () => {
  const navigate = useNavigate();
  const {
    employerMandatoryFunds: savedEmployerFunds,
    employeeMandatoryFunds: savedEmployeeFunds,
    setEmployerMandatoryFunds: setConfirmEmployerFunds,
    setEmployeeMandatoryFunds: setConfirmEmployeeFunds,
  } = useFutureInvest();

  const [contributionType, setContributionType] = useState<ContributionType>('employer-mandatory');
  const [employerMandatoryFunds, setEmployerMandatoryFunds] = useState<Fund[]>(() => allInFunds.map(f => { const saved = savedEmployerFunds.find(sf => sf.name === f.name); return saved ? { ...f, allocation: saved.allocation } : f; }));
  const [employeeMandatoryFunds, setEmployeeMandatoryFunds] = useState<Fund[]>(() => allInFunds.map(f => { const saved = savedEmployeeFunds.find(sf => sf.name === f.name); return saved ? { ...f, allocation: saved.allocation } : f; }));
  const [showKeypad, setShowKeypad] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [sortField, setSortField] = useState<'name' | 'risk' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [activeFundId, setActiveFundId] = useState<string | null>(null);
  const [keypadValue, setKeypadValue] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const currentFunds = useMemo(() => {
    const funds = contributionType === 'employer-mandatory' ? [...employerMandatoryFunds] : [...employeeMandatoryFunds];
    if (!sortField) return funds;
    const defaultFund = funds.find(f => f.name.includes('預設投資策略'));
    const others = funds.filter(f => !f.name.includes('預設投資策略'));
    others.sort((a, b) => {
      if (sortField === 'name') {
        return sortDirection === 'asc' ? a.name.localeCompare(b.name, 'zh-HK') : b.name.localeCompare(a.name, 'zh-HK');
      }
      return sortDirection === 'asc' ? a.riskLevel - b.riskLevel : b.riskLevel - a.riskLevel;
    });
    return defaultFund ? [defaultFund, ...others] : others;
  }, [contributionType, employerMandatoryFunds, employeeMandatoryFunds, sortField, sortDirection]);
  const employerTotal = useMemo(() => employerMandatoryFunds.reduce((sum, f) => sum + f.allocation, 0), [employerMandatoryFunds]);
  const employeeTotal = useMemo(() => employeeMandatoryFunds.reduce((sum, f) => sum + f.allocation, 0), [employeeMandatoryFunds]);
  const total = contributionType === 'employer-mandatory' ? employerTotal : employeeTotal;
  const isNextEnabled = employerTotal === 100 && employeeTotal === 100;

  const applyAllocation = (id: string, parsed: number) => {
    const updater = (funds: Fund[]) => funds.map(f => f.id === id ? { ...f, allocation: parsed } : f);
    if (contributionType === 'employer-mandatory') setEmployerMandatoryFunds(prev => updater(prev));
    else setEmployeeMandatoryFunds(prev => updater(prev));
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
    if (contributionType === 'employer-mandatory') setEmployerMandatoryFunds(prev => cleared(prev));
    else setEmployeeMandatoryFunds(prev => cleared(prev));
    setKeypadValue('');
    setActiveFundId(null);
    setShowKeypad(false);
    setSortField(null);
    setSortDirection('asc');
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <div className="sticky top-0 z-50 bg-white">
        <div className="px-4 py-3 flex items-center border-b border-gray-200">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
          <h1 className="flex-1 text-center text-base font-medium text-gray-900">未來供款的投資</h1>
          <div className="w-10" />
        </div>
        <StepBar currentStep={2} />
      </div>

      <div className={`px-4 pt-6 flex-1 ${showKeypad ? 'pb-[310px]' : 'pb-44'}`}>
        <h2 className="text-[22px] font-bold text-[#E67E22] mb-4">未來供款的投資</h2>

        <div className="flex border-b border-gray-200 mb-4 overflow-hidden bg-white">
          <button onClick={() => setContributionType('employer-mandatory')} className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${contributionType === 'employer-mandatory' ? 'text-[#E67E22] border-[#E67E22]' : 'text-gray-500 border-transparent'}`}>
            僱主強制性供款（港幣）
          </button>
          <button onClick={() => setContributionType('employee-mandatory')} className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${contributionType === 'employee-mandatory' ? 'text-[#E67E22] border-[#E67E22]' : 'text-gray-500 border-transparent'}`}>
            僱員強制性供款（港元）
          </button>
        </div>

        <div className="flex items-center justify-between mb-5">
          <button onClick={() => setShowSortModal(true)} className="flex items-center gap-2 text-[#1F1F1F]">
            <ArrowUpDown size={20} />
            <span className="text-[17px] font-medium">排序</span>
          </button>
          <button onClick={resetCurrentTab} className="flex items-center gap-2 text-[#1F1F1F]">
            <RotateCcw size={20} />
            <span className="text-[17px] font-medium">重設</span>
          </button>
        </div>

        <div className="space-y-4">
          {currentFunds.map((fund) => (
            <div key={fund.id} className="bg-white border border-[#E2DEDE] rounded-[18px] px-5 py-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-3">
                    <div className="text-[18px] leading-[1.45] text-[#1F1F1F] font-medium break-words">{fund.name}</div>
                    {!fund.name.includes('預設投資策略') && <button className="mt-[2px] flex-shrink-0"><ExternalLink size={18} strokeWidth={1.8} className="text-[#B9B5B5]" /></button>}
                    {fund.name.includes('預設投資策略') && <button className="mt-[2px] flex-shrink-0"><Info size={18} strokeWidth={1.8} className="text-[#B9B5B5]" /></button>}
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

        <div className="pt-5 pb-6 text-[#4B4B4B] leading-[1.8] text-[15px]">
          <div className="font-medium mb-2">注意：</div>
          <p className="mb-3">在做出投資選擇之前，你應先了解不同基金的風險等級並衡量自己的風險承受能力。</p>
          <p className="mb-3">成員必須注意投資市場可能出現顯著的波動，基金單位價格可跌可升。由於處理有關基金轉換投資指示需要一定的時間，因此未必能夠保證達到你預期的結果。在作出投資選擇前，你必須小心衡量個人可承受風險的程度及財政狀況（包括你的退休計劃）。如有任何疑問，請諮詢你的獨立財務顧問了解更多詳情。</p>
          <p className="mb-3">投資比例應為整數（例如50%而非50.5%）。</p>
          <p className="mb-3">轉換合計應等於100%。</p>
          <p className="mb-3">你以往工作期間的強積金供款已計入「僱員強制性供款」及「僱員自願性供款」（如有）。</p>
          <p>請留意，在進行計算時，可能出現小數捨入。</p>
        </div>
      </div>

      <div className="fixed left-0 right-0 bottom-0 z-20 bg-white px-6 pt-4 pb-6 border-t border-[#E9E5E5] shadow-[0_-2px_8px_rgba(0,0,0,0.03)]">
        <div className="flex justify-between items-center mb-2 text-[18px] font-medium">
          <span className="text-[#1F1F1F]">總和：</span>
          <span className={`text-[20px] font-bold ${total === 100 ? 'text-[#E39118]' : 'text-[#D62828]'}`}>{total}%</span>
        </div>
        <button onClick={() => {
          if (!isNextEnabled) return;
          setConfirmEmployerFunds(employerMandatoryFunds.filter(f => f.allocation > 0).map(f => ({ name: f.name, allocation: f.allocation })));
          setConfirmEmployeeFunds(employeeMandatoryFunds.filter(f => f.allocation > 0).map(f => ({ name: f.name, allocation: f.allocation })));
        }} className={`w-full h-[58px] rounded-full text-[19px] font-semibold ${isNextEnabled ? 'bg-[#19345B] text-white' : 'bg-[#E6E3E3] text-[#B8B4B4]'}`}>下一步</button>
      </div>


      {showSortModal && (
        <div className="fixed inset-0 z-40 flex items-end">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowSortModal(false)} />
          <div className="relative w-full bg-white rounded-t-2xl">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
              <button 
                className="text-base text-gray-600"
                onClick={() => {
                  setSortField(null);
                  setSortDirection('asc');
                }}
              >
                重設
              </button>
              <span className="text-lg font-medium text-gray-900">排序</span>
              <button 
                className="text-gray-600"
                onClick={() => setShowSortModal(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="px-4">
              <button
                className="w-full flex items-center justify-between py-4 border-b border-gray-200"
                onClick={() => {
                  if (sortField === 'name') {
                    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortField('name');
                    setSortDirection('asc');
                  }
                }}
              >
                <span className={`text-base ${sortField === 'name' ? 'text-[#E67E22]' : 'text-gray-900'}`}>
                  基金名稱
                </span>
                {sortField === 'name' && (
                  <svg 
                    className={`w-5 h-5 text-[#E67E22] transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                )}
              </button>
              
              <button
                className="w-full flex items-center justify-between py-4"
                onClick={() => {
                  if (sortField === 'risk') {
                    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortField('risk');
                    setSortDirection('asc');
                  }
                }}
              >
                <span className={`text-base ${sortField === 'risk' ? 'text-[#E67E22]' : 'text-gray-900'}`}>
                  風險級別
                </span>
                {sortField === 'risk' && (
                  <svg 
                    className={`w-5 h-5 text-[#E67E22] transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

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

export default FutureInvestPage;
