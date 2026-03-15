import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronDown } from 'lucide-react';

const AccountManagementPage = () => {
  const navigate = useNavigate();
  const [openMPF, setOpenMPF] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('VC56442131');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="px-4 pt-3 pb-2 flex items-center">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-700">
          <ChevronLeft size={24} />
        </button>
      </div>
      <div className="px-4 pt-2 pb-6">
        <h1 className="text-[24px] font-bold text-[#E6A23C] mb-8">帳戶管理</h1>
        <div className="space-y-6">
          <div className="bg-white rounded-[18px] border border-[#D9D4CC] px-6 py-6 shadow-[0_4px_18px_rgba(0,0,0,0.05)] flex items-center gap-5">
            <img src="./icons/icon-empf-account-management.png" alt="積金易帳戶管理" className="w-[58px] h-[58px] object-contain flex-shrink-0" />
            <div className="text-[20px] font-semibold text-[#1F1F1F] tracking-[-0.01em]">積金易帳戶管理</div>
          </div>
          <button onClick={() => { setOpenMPF(v => !v); setShowPlanModal(true); }} className="w-full bg-white rounded-[18px] border border-[#D9D4CC] px-6 py-6 shadow-[0_4px_18px_rgba(0,0,0,0.05)] flex items-center gap-5 text-left">
            <img src="./icons/icon-mpf-account-management.png" alt="強積金帳戶管理" className="w-[58px] h-[58px] object-contain flex-shrink-0" />
            <div className="flex-1 text-[20px] font-semibold text-[#1F1F1F] tracking-[-0.01em]">強積金帳戶管理</div>
            <ChevronDown size={24} className={`text-[#1F1F1F] transition-transform ${openMPF ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>


      {showPlanModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/35" onClick={() => setShowPlanModal(false)} />
          <div className="relative w-full max-w-[500px] bg-white rounded-[26px] shadow-[0_12px_40px_rgba(0,0,0,0.18)] overflow-hidden">
            <button onClick={() => setShowPlanModal(false)} className="absolute top-5 right-5 text-[#22395B] z-10">
              <span className="text-[38px] leading-none">×</span>
            </button>
            <div className="px-6 pt-16 pb-6">
              <div className="text-center text-[24px] font-bold text-[#E2A12A] mb-7">選擇計劃</div>
              <div className="space-y-5 max-h-[430px] overflow-y-auto pb-2">
                {[
                  { holder: '個人賬戶持有人', name: '友邦強積金優選計劃', no: 'VC56442131' },
                  { holder: '個人賬戶持有人', name: '宏利環球精選（強積金）計劃', no: 'GS29819644' },
                  { holder: '個人賬戶持有人', name: '豐匯退休計劃', no: 'FW88273645' },
                ].map((plan) => (
                  <button
                    key={plan.no}
                    onClick={() => setSelectedPlan(plan.no)}
                    className={`w-full text-left rounded-[18px] px-6 py-5 border bg-white shadow-[0_0_22px_rgba(0,0,0,0.14)] ${selectedPlan === plan.no ? 'border-[2px] border-[#E9A11A]' : 'border-white'}`}
                  >
                    <div className="text-[15px] text-[#8F8B8B] mb-2">{plan.holder}</div>
                    <div className="text-[18px] leading-[1.5] text-[#1F1F1F] font-medium">{plan.name}</div>
                    <div className="text-[18px] leading-[1.5] text-[#1F1F1F]">（帳戶號碼： {plan.no}）</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="px-6 pb-6 pt-2 bg-white">
              <button className="w-full h-[60px] rounded-full bg-[#243C67] text-white text-[22px] font-semibold">選擇</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AccountManagementPage;
