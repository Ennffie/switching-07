import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ExternalLink, Info, ArrowUpDown, RotateCcw } from 'lucide-react';
import StepBar from '../components/StepBar';

interface Fund {
  id: string;
  name: string;
  balance: number;
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

const fullFunds: Fund[] = [
  { id: 'in1', name: '預設投資策略', balance: 0, allocation: 0, riskLevel: 4 },
  { id: 'in2', name: '友邦強積金優選計劃 - 保證組合', balance: 0, allocation: 0, riskLevel: 1 },
  { id: 'in3', name: '友邦強積金優選計劃 - 強積金保守基金', balance: 0, allocation: 0, riskLevel: 1 },
  { id: 'in4', name: '友邦強積金優選計劃 - 65歲後基金', balance: 0, allocation: 0, riskLevel: 3, description: '當65歲後基金或核心累積基金作為獨立投資選項，預設投資策略的風險降低機制並不適用' },
  { id: 'in5', name: '友邦強積金優選計劃 - 亞洲債券基金', balance: 0, allocation: 0, riskLevel: 3 },
  { id: 'in6', name: '友邦強積金優選計劃 - 均衡組合', balance: 0, allocation: 0, riskLevel: 4 },
  { id: 'in7', name: '友邦強積金優選計劃 - 穩定資本組合', balance: 0, allocation: 0, riskLevel: 4 },
  { id: 'in8', name: '友邦強積金優選計劃 - 環球債券基金', balance: 0, allocation: 0, riskLevel: 4 },
  { id: 'in9', name: '友邦強積金優選計劃 - 中港動態資產配置基金', balance: 0, allocation: 0, riskLevel: 5 },
  { id: 'in10', name: '友邦強積金優選計劃 - 核心累積基金', balance: 0, allocation: 0, riskLevel: 5, description: '當65歲後基金或核心累積基金作為獨立投資選項，預設投資策略的風險降低機制並不適用' },
  { id: 'in11', name: '友邦強積金優選計劃 - 增長組合', balance: 0, allocation: 0, riskLevel: 5 },
  { id: 'in12', name: '友邦強積金優選計劃 - 基金經理精選退休基金', balance: 0, allocation: 0, riskLevel: 5 },
  { id: 'in13', name: '友邦強積金優選計劃 - 美洲基金', balance: 0, allocation: 0, riskLevel: 6 },
  { id: 'in14', name: '友邦強積金優選計劃 - 亞洲股票基金', balance: 0, allocation: 0, riskLevel: 6 },
  { id: 'in15', name: '友邦強積金優選計劃 - 亞歐基金', balance: 0, allocation: 0, riskLevel: 6 },
  { id: 'in16', name: '友邦強積金優選計劃 - 歐洲股票基金', balance: 0, allocation: 0, riskLevel: 6 },
  { id: 'in17', name: '友邦強積金優選計劃 - 大中華股票基金', balance: 0, allocation: 0, riskLevel: 6 },
  { id: 'in18', name: '友邦強積金優選計劃 - 綠色退休基金', balance: 0, allocation: 0, riskLevel: 6 },
  { id: 'in19', name: '友邦強積金優選計劃 - 中港基金', balance: 0, allocation: 0, riskLevel: 6 },
  { id: 'in20', name: '友邦強積金優選計劃 - 北美股票基金', balance: 0, allocation: 0, riskLevel: 6 },
  { id: 'in21', name: '友邦強積金優選計劃 - 全球基金', balance: 0, allocation: 0, riskLevel: 6 },
];

const FutureInvestPage = () => {
  const navigate = useNavigate();
  const [contributionType, setContributionType] = useState<ContributionType>('employer-mandatory');
  const [sortDirection, setSortDirection] = useState<'default' | 'riskAsc' | 'riskDesc'>('default');
  const [employerMandatoryFunds, setEmployerMandatoryFunds] = useState<Fund[]>(fullFunds);
  const [employeeMandatoryFunds, setEmployeeMandatoryFunds] = useState<Fund[]>(fullFunds);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentFunds = useMemo(() => {
    const funds = contributionType === 'employer-mandatory' ? [...employerMandatoryFunds] : [...employeeMandatoryFunds];
    const defaultFund = funds.find(f => f.name === '預設投資策略');
    const others = funds.filter(f => f.name !== '預設投資策略');
    if (sortDirection === 'riskAsc') others.sort((a, b) => a.riskLevel - b.riskLevel);
    if (sortDirection === 'riskDesc') others.sort((a, b) => b.riskLevel - a.riskLevel);
    return defaultFund ? [defaultFund, ...others] : others;
  }, [contributionType, employerMandatoryFunds, employeeMandatoryFunds, sortDirection]);

  const total = useMemo(() => {
    const funds = contributionType === 'employer-mandatory' ? employerMandatoryFunds : employeeMandatoryFunds;
    return funds.reduce((sum, f) => sum + f.allocation, 0);
  }, [contributionType, employerMandatoryFunds, employeeMandatoryFunds]);

  const resetCurrentTab = () => {
    const cleared = fullFunds.map(f => ({ ...f, allocation: 0 }));
    if (contributionType === 'employer-mandatory') setEmployerMandatoryFunds(cleared);
    else setEmployeeMandatoryFunds(cleared);
    setSortDirection('default');
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

      <div className="bg-white px-4 py-3">
        <h2 className="text-[22px] font-bold text-[#E67E22]">未來供款的投資</h2>
      </div>

      <div className="bg-white px-4 border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setContributionType('employer-mandatory')}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${contributionType === 'employer-mandatory' ? 'text-[#E67E22] border-[#E67E22]' : 'text-gray-500 border-transparent'}`}
          >
            僱主強制性供款（港幣）
          </button>
          <button
            onClick={() => setContributionType('employee-mandatory')}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${contributionType === 'employee-mandatory' ? 'text-[#E67E22] border-[#E67E22]' : 'text-gray-500 border-transparent'}`}
          >
            僱員強制性供款（港元）
          </button>
        </div>
      </div>

      <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <button
          onClick={() => setSortDirection(prev => prev === 'default' ? 'riskAsc' : prev === 'riskAsc' ? 'riskDesc' : 'default')}
          className="flex items-center gap-2 text-[15px] text-gray-700"
        >
          <ArrowUpDown size={18} />
          <span>排序</span>
        </button>
        <button onClick={resetCurrentTab} className="flex items-center gap-2 text-[15px] text-gray-700">
          <RotateCcw size={18} />
          <span>重設</span>
        </button>
      </div>

      <div className="flex-1 px-4 pt-4 pb-44 space-y-3">
        {currentFunds.map((fund) => (
          <div key={fund.id} className="bg-white rounded-2xl p-4 border border-gray-200">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 mb-2">
                  <div className="text-[16px] leading-[1.5] text-gray-900 break-words">{fund.name}</div>
                  {fund.name.includes('預設投資策略') ? (
                    <Info size={18} className="text-gray-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <ExternalLink size={18} className="text-gray-400 flex-shrink-0 mt-0.5" />
                  )}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-1.5 h-5 rounded-full ${riskColors[fund.riskLevel]}`} />
                  <span className="text-[14px] text-gray-500">風險級別 {fund.riskLevel}</span>
                </div>

                {fund.description && (
                  <p className="text-[13px] text-gray-500 leading-relaxed">{fund.description}</p>
                )}
              </div>

              <div className="flex items-center gap-2 pl-2">
                <div className="w-[72px] h-[44px] rounded-lg border border-gray-300 flex items-center justify-center text-[18px] text-gray-900 bg-white">0</div>
                <span className="text-[18px] text-gray-500">%</span>
              </div>
            </div>
          </div>
        ))}

        <div className="pt-3">
          <div className="text-[15px] font-medium text-gray-900 mb-2">注意事項</div>
          <ul className="text-[13px] leading-6 text-gray-500 list-disc pl-5 space-y-1">
            <li>請確保投資分配總和為 100%。</li>
            <li>「預設投資策略」相關基金作為獨立投資選項時，風險降低機制並不適用。</li>
            <li>基金資料、風險級別及說明均跟 Flow 1 顯示方式一致。</li>
          </ul>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200 z-30">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[16px] text-gray-900">總和</span>
          <span className={`text-[20px] font-bold ${total === 100 ? 'text-gray-900' : 'text-red-600'}`}>{total}%</span>
        </div>
        <button className={`w-full py-3 rounded-lg text-base font-medium transition-all ${total === 100 ? 'bg-[#1e3a5f] text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
          下一步
        </button>
      </div>
    </div>
  );
};

export default FutureInvestPage;
