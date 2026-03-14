import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

interface Account {
  id: string;
  logo: string;
  name: string;
  member: string;
  date: string;
  type: string;
  balance: string;
  mandatoryBalance?: string;
  voluntaryBalance?: string;
  gain?: string;
}

const accounts: Account[] = [
  {
    id: '1',
    logo: './icons/aia-logo-new.jpg',
    name: '友邦強積金優選計劃',
    member: '56442131',
    date: '29/12/2023',
    type: '一般僱員',
    balance: '$ 128,396.91',
    mandatoryBalance: '$ 68,389.17',
    voluntaryBalance: '$ 60,007.74',
    gain: '$ 58,508.93',
  },
  {
    id: '2',
    logo: './icons/manulife-logo-new.jpg',
    name: '宏利環球精選（強積金）計劃',
    member: '29819644',
    date: '26/01/2011',
    type: '一般僱員',
    balance: '$ 128,396.91',
    mandatoryBalance: '$ 68,389.17',
    voluntaryBalance: '$ 60,007.74',
    gain: '$ 58,508.93',
  },
];

const FutureSelectPlanPage = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalAccount, setModalAccount] = useState<Account | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleOpenModal = (e: React.MouseEvent, acc: Account) => {
    e.stopPropagation();
    setModalAccount(acc);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalAccount(null);
  };

  return (
    <div className="min-h-screen bg-[#F8F5FA]">
      <div className="sticky top-0 z-20 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="px-4 pt-4 pb-4 flex items-center justify-center relative border-b border-[#ECECEC]">
          <button onClick={() => navigate(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center">
            <img src="./icons/icon-back.png" alt="返回" className="w-6 h-6 object-contain" />
          </button>
          <h1 className="text-[18px] font-semibold text-[#1F1F1F]">未來供款的投資</h1>
        </div>

        <div className="px-6 pt-4 pb-4 bg-white">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-[18px] left-[40px] right-[40px] h-[2px] bg-[#E6E3E3]" />
            {['1','2','3'].map((n, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[20px] font-bold ${i === 0 ? 'bg-[#F5A623] text-white shadow-[0_2px_4px_rgba(0,0,0,0.12)]' : 'bg-[#F3F0F3] text-[#B7B3B3]'}`}>
                  <span className="text-[20px] leading-none">{n}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 pt-8 pb-40">
        <h2 className="text-[24px] font-bold text-[#E6A23C] mb-4">選擇計劃及帳戶</h2>
        <p className="text-[18px] leading-[1.6] text-[#1F1F1F] mb-8">請選擇你想要更改投資授權的強積金帳戶。</p>

        <div className="space-y-6">
          {accounts.map((acc) => (
            <button
              key={acc.id}
              onClick={() => setSelectedId(acc.id)}
              className={`w-full text-left bg-white rounded-[24px] border shadow-[0_8px_24px_rgba(0,0,0,0.08)] px-6 pt-6 pb-6 min-h-[336px] ${selectedId === acc.id ? 'border-[3px] border-[#E6A23C]' : 'border border-[#D8D3D3]'}`}
            >
              <div className="flex justify-center mb-5">
                <img src={acc.logo} alt={acc.name} className="h-[50px] object-contain" />
              </div>
              <div className="text-center text-[19px] font-semibold text-[#1F1F1F] leading-[1.5] mb-3">{acc.name}</div>
              <div className="text-center text-[14px] text-[#777] mb-5">自{acc.date} | 成員帳戶號碼： {acc.member}</div>

              <div className="space-y-5 text-[#1F1F1F]">
                <div>
                  <div className="text-[15px] text-[#888] mb-2">帳戶類別</div>
                  <div className="text-[20px] font-semibold">{acc.type}</div>
                </div>
                <div>
                  <div className="text-[15px] text-[#888] mb-2">帳戶結餘（港幣）</div>
                  <div className="text-[20px] font-semibold">{acc.balance}</div>
                </div>
                <button onClick={(e) => handleOpenModal(e, acc)} className="text-[16px] underline text-[#1F1F1F] mt-1">帳戶詳情</button>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="fixed left-0 right-0 bottom-0 bg-white border-t border-[#E9E5E5] px-6 pt-4 pb-6 shadow-[0_-2px_8px_rgba(0,0,0,0.03)]">
        <button className={`w-full h-[58px] rounded-full text-[20px] font-semibold ${selectedId === '1' ? 'bg-[#19345B] text-white' : 'bg-[#ECE8EC] text-[#B7B3B3]'}`}>
          下一步
        </button>
      </div>

      {showModal && modalAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={handleCloseModal} />
          <div className="relative bg-white rounded-2xl w-full max-w-sm p-6">
            <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-500">
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold text-[#E67E22] text-center mb-6">帳戶詳情</h2>
            <div className="flex justify-center mb-4">
              <img src={modalAccount.logo} alt={modalAccount.name} className="w-16 h-16 object-contain" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{modalAccount.name}</h3>
            <p className="text-base text-gray-500 text-center mb-6">自 {modalAccount.date} | 成員帳戶號碼： {modalAccount.member}</p>
            <div className="space-y-4">
              <div>
                <p className="text-base text-gray-500 mb-1">帳戶類別</p>
                <p className="text-lg font-medium text-gray-900">{modalAccount.type}</p>
              </div>
              <div>
                <p className="text-base text-gray-500 mb-1">強制性供款結餘（港幣）</p>
                <p className="text-lg font-medium text-gray-900">{modalAccount.mandatoryBalance}</p>
              </div>
              <div>
                <p className="text-base text-gray-500 mb-1">自願性供款結餘（港幣）</p>
                <p className="text-lg font-medium text-gray-900">{modalAccount.voluntaryBalance}</p>
              </div>
              <div>
                <p className="text-base text-gray-500 mb-1">投資收益（虧損）（港幣）</p>
                <p className="text-lg font-medium text-gray-900">{modalAccount.gain}</p>
              </div>
              <div>
                <p className="text-base text-gray-500 mb-1">帳戶結餘（港幣）</p>
                <p className="text-lg font-medium text-gray-900">{modalAccount.balance}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 text-right mt-4">截至 05/03/2026</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FutureSelectPlanPage;
