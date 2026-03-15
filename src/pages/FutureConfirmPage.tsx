import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronUp, ChevronDown, Pencil } from 'lucide-react';
import StepBar from '../components/StepBar';
import { useFutureInvest } from '../context/FutureInvestContext';

const FutureConfirmPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { employerMandatoryFunds, employeeMandatoryFunds } = useFutureInvest();
  const [expandedSections, setExpandedSections] = useState({
    step1: true,
    step2: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const step1Data = {
    planName: '友邦強積金優選計劃',
    trustee: '友邦（信託）有限公司',
    accountNumber: '56442131',
    accountType: '一般僱員',
    balance: '$ 128,396.91',
    employerName: '實運有限公司',
    icon: './icons/aia-logo-new.jpg',
  };

  const employerFundsToShow = employerMandatoryFunds.length > 0 ? employerMandatoryFunds : [
    { name: '預設投資策略', allocation: 100 },
  ];
  const employeeFundsToShow = employeeMandatoryFunds.length > 0 ? employeeMandatoryFunds : [
    { name: '友邦強積金優選計劃 - 環球債券基金', allocation: 100 },
  ];

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
        <StepBar currentStep={3} />
      </div>

      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-[#E67E22]">確認</h2>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        <div className="bg-white mb-3">
          <div className="px-4 pt-4 pb-2">
            <h3 className="text-base font-medium text-gray-900">第1步：選擇計劃及帳戶</h3>
          </div>
          <button onClick={() => toggleSection('step1')} className="w-full px-4 py-4 flex items-center justify-between border-y border-gray-100">
            <h4 className="text-base font-medium text-gray-900">帳戶詳情</h4>
            {expandedSections.step1 ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
          </button>

          {expandedSections.step1 && (
            <div className="px-4 py-4">
              <div className="flex items-start gap-3 mb-4">
                <img src={step1Data.icon} alt={step1Data.planName} className="w-12 h-12 object-contain flex-shrink-0" />
                <div className="flex-1">
                  <h5 className="text-base font-medium text-gray-900">{step1Data.planName}</h5>
                  <p className="text-sm text-gray-500">{step1Data.trustee} | 成員帳戶號碼： {step1Data.accountNumber}</p>
                  <p className="text-sm text-gray-500">帳戶類別: {step1Data.accountType}</p>
                  <p className="text-base font-medium text-gray-900 mt-1">帳戶結餘（港幣）{step1Data.balance}</p>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <p className="text-sm text-gray-500">僱主名稱</p>
                <p className="text-sm text-gray-900">{step1Data.employerName}</p>
              </div>
              <button onClick={() => navigate('/invest/future-select-plan')} className="flex items-center justify-center gap-2 w-full py-3 text-gray-600 mt-4">
                <Pencil size={18} />
                <span>編輯</span>
              </button>
            </div>
          )}
        </div>

        <div className="bg-white">
          <div className="px-4 pt-4 pb-2 border-t border-gray-100">
            <h3 className="text-base font-medium text-gray-900">第2步：更改投資授權</h3>
          </div>
          <button onClick={() => toggleSection('step2')} className="w-full px-4 py-4 flex items-center justify-between border-y border-gray-100">
            <h4 className="text-base font-medium text-gray-900">投資授權</h4>
            {expandedSections.step2 ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
          </button>

          {expandedSections.step2 && (
            <div className="px-4 pb-4">
              <div className="mb-5 pt-4">
                <h5 className="text-base font-medium text-gray-900 mb-3">僱主強制性供款（港幣）</h5>
                {employerFundsToShow.filter(f => f.allocation > 0).map((fund, idx) => (
                  <div key={idx} className="flex justify-between py-1.5">
                    <span className="text-base text-gray-900">{fund.name}</span>
                    <span className="text-base text-gray-900">{fund.allocation}%</span>
                  </div>
                ))}
              </div>

              <div className="mb-5">
                <h5 className="text-base font-medium text-gray-900 mb-3">僱員強制性供款（港幣）</h5>
                {employeeFundsToShow.filter(f => f.allocation > 0).map((fund, idx) => (
                  <div key={idx} className="flex justify-between py-1.5">
                    <span className="text-base text-gray-900">{fund.name}</span>
                    <span className="text-base text-gray-900">{fund.allocation}%</span>
                  </div>
                ))}
              </div>

              <button onClick={() => navigate('/invest/future-step-2')} className="flex items-center justify-center gap-2 w-full py-3 text-gray-600 border-t border-gray-100 pt-4">
                <Pencil size={18} />
                <span>編輯</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 z-40">
        <button onClick={() => navigate('/invest/terms')} className="w-full py-4 bg-[#1e3a5f] text-white rounded-full text-lg font-medium active:scale-[0.98] transition-transform">
          提交
        </button>
      </div>
    </div>
  );
};

export default FutureConfirmPage;
