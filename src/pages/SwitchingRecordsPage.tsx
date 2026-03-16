import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, SlidersHorizontal, LayoutGrid } from 'lucide-react';
import { useFutureSubmission } from '../context/FutureSubmissionContext';

const SwitchingRecordsPage = () => {
  const navigate = useNavigate();
  const { referenceNumber } = useFutureSubmission();

  const records = [
    {
      referenceNumber,
      transactionNumber: referenceNumber,
      status: '待批量處理',
      statusColor: 'bg-[#F5D97A]',
      planName: '友邦強積金優選計劃',
      accountNumber: '56442131',
      icon: './icons/aia-logo-new.jpg',
      transactionType: '基金轉移',
      source: '流動應用程式',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <button onClick={() => navigate('/')} className="p-2 -ml-2">
          <ChevronLeft size={24} className="text-gray-700" />
        </button>
        <h1 className="text-base font-medium text-gray-900">我的紀錄</h1>
        <div className="flex items-center gap-4">
          <Search size={24} className="text-gray-700" />
          <SlidersHorizontal size={24} className="text-gray-700" />
          <LayoutGrid size={24} className="text-gray-700" />
        </div>
      </div>

      <div className="flex-1 p-4">
        <p className="text-sm text-gray-500 mb-4">共 1 個結果</p>
        <div className="space-y-4">
          {records.map((record, index) => (
            <button key={index} onClick={() => navigate('/invest/future-record-detail')} className="w-full text-left bg-white rounded-xl p-4 border border-gray-100 shadow-[0_6px_20px_rgba(0,0,0,0.08)]">
              <div className="bg-[#FFF3D9] p-3 rounded-lg mb-3">
                <p className="text-xs text-gray-700">參考編號：#{record.referenceNumber}</p>
                <p className="text-xs text-gray-700">交易#1的參考編號：#{record.transactionNumber}</p>
              </div>
              <div className="mb-3">
                <span className="bg-[#F8E7A8] text-[#7A5A00] text-xs px-3 py-1 rounded-full">
                  {record.status}
                </span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <img src={record.icon} alt={record.planName} className="w-10 h-10 object-contain rounded-lg" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{record.planName}</p>
                  <p className="text-sm text-gray-500">{record.accountNumber}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-gray-500">交易類別</p>
                <p className="text-right text-gray-900">{record.transactionType}</p>
                <p className="text-gray-500">交易來源</p>
                <p className="text-right text-gray-900">{record.source}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SwitchingRecordsPage;
