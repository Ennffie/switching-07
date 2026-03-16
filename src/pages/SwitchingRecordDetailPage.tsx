import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronUp, ChevronDown, Info } from 'lucide-react';
import { useFutureSubmission } from '../context/FutureSubmissionContext';
import { useTransfer } from '../context/TransferContext';

const SwitchingRecordDetailPage = () => {
  const navigate = useNavigate();
  const { referenceNumber, submittedAt } = useFutureSubmission();
  const { transferData } = useTransfer();

  const [activeTab, setActiveTab] = useState<'plan' | 'future'>('plan');
  const [basicOpen, setBasicOpen] = useState(true);
  const [detailOpen, setDetailOpen] = useState(true);

  const transferOutSections = transferData.transferOut || [];
  const transferInSections = transferData.transferIn || [];

  const outMandatory = (transferOutSections.find(section => section.title.includes('強制'))?.funds || []).map(f => ({ name: f.name, allocation: f.percentage }));
  const outVoluntary = (transferOutSections.find(section => section.title.includes('自願'))?.funds || []).map(f => ({ name: f.name, allocation: f.percentage }));
  const inMandatory = (transferInSections.find(section => section.title.includes('強制'))?.funds || []).map(f => ({ name: f.name, allocation: f.percentage }));
  const inVoluntary = (transferInSections.find(section => section.title.includes('自願'))?.funds || []).map(f => ({ name: f.name, allocation: f.percentage }));

  const outFundNames = Array.from(new Set([
    ...outMandatory.map(f => f.name),
    ...outVoluntary.map(f => f.name),
  ]));
  const inFundNames = Array.from(new Set([
    ...inMandatory.map(f => f.name),
    ...inVoluntary.map(f => f.name),
  ]));

  const getAllocation = (list: { name: string; allocation: number }[], name: string) => {
    return list.find(f => f.name === name)?.allocation ?? 0;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <div className="px-4 py-3 flex items-center">
          <button onClick={() => navigate('/')} className="p-2 -ml-2">
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
          <h1 className="flex-1 text-center text-base font-medium text-gray-900 mr-8">紀錄詳情</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-8">
        <div className="p-4">
          <div className="bg-[#FFF5EA] rounded-2xl px-4 py-4 mb-6">
            <div className="flex items-start gap-3">
              <Info size={22} className="text-[#1F1F1F] mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-[15px] leading-[1.6] text-[#1F1F1F] mb-4">請留意，任何於當日下午4時或之後的更改及提交的指示，將於下一個工作天處理。</p>
                <button className="h-[42px] px-8 rounded-full border border-[#1A2E49] text-[#1A2E49] text-[17px] font-medium bg-white">取消指示</button>
              </div>
            </div>
          </div>
        </div>

        <button onClick={() => setBasicOpen(v => !v)} className="w-full px-4 py-4 flex items-center justify-between border-t border-b border-[#ECECEC]">
          <span className="text-[18px] text-[#1F1F1F]">基本資料</span>
          {basicOpen ? <ChevronUp size={20} className="text-[#1F1F1F]" /> : <ChevronDown size={20} className="text-[#1F1F1F]" />}
        </button>

        {basicOpen && (
          <div className="px-4 py-5 space-y-6">
            <div>
              <div className="text-[15px] text-[#9A9898] mb-2">提交參考編號</div>
              <div className="text-[18px] text-[#1F1F1F]">{referenceNumber}</div>
            </div>
            <div>
              <div className="text-[15px] text-[#9A9898] mb-2">交易參考編號</div>
              <div className="text-[18px] text-[#1F1F1F]">{referenceNumber}</div>
            </div>
            <div>
              <div className="text-[15px] text-[#9A9898] mb-2">提交日期及時間（日／月／年）（時：分）</div>
              <div className="text-[18px] text-[#1F1F1F]">{submittedAt}</div>
            </div>
            <div>
              <div className="text-[15px] text-[#9A9898] mb-2">交易來源</div>
              <div className="text-[18px] text-[#1F1F1F]">流動應用程式</div>
            </div>
            <div>
              <div className="text-[15px] text-[#9A9898] mb-2">狀態</div>
              <div className="text-[18px] text-[#1F1F1F]">待批量處理</div>
            </div>
          </div>
        )}

        <div className="mt-3 border-t border-[#ECECEC]">
          <div className="flex">
            <button onClick={() => setActiveTab('plan')} className={`flex-1 py-4 text-[18px] font-medium relative ${activeTab === 'plan' ? 'text-[#E6A23C]' : 'text-[#C5C1C1]'}`}>
              選擇計劃及帳戶
              {activeTab === 'plan' && <div className="absolute left-8 right-8 bottom-0 h-[4px] bg-[#F5A623] rounded-full" />}
            </button>
            <button onClick={() => setActiveTab('future')} className={`flex-1 py-4 text-[18px] font-medium relative ${activeTab === 'future' ? 'text-[#E6A23C]' : 'text-[#C5C1C1]'}`}>
              基金轉換指示
              {activeTab === 'future' && <div className="absolute left-8 right-8 bottom-0 h-[4px] bg-[#F5A623] rounded-full" />}
            </button>
          </div>
        </div>

        {activeTab === 'plan' && (
          <div>
            <button onClick={() => setDetailOpen(v => !v)} className="w-full px-4 py-4 flex items-center justify-between border-t border-b border-[#ECECEC]">
              <span className="text-[18px] text-[#1F1F1F]">選擇計劃</span>
              {detailOpen ? <ChevronUp size={20} className="text-[#1F1F1F]" /> : <ChevronDown size={20} className="text-[#1F1F1F]" />}
            </button>
            {detailOpen && (
              <div className="px-4 py-6">
                <div className="flex items-start gap-4">
                  <img src="./icons/aia-logo-new.jpg" alt="友邦" className="w-12 h-12 object-contain mt-1" />
                  <div>
                    <div className="text-[18px] font-semibold text-[#1F1F1F] mb-4">{transferData.step1?.planName || '友邦強積金優選計劃'}</div>
                    <div className="text-[15px] text-[#9A9898] mb-1">帳戶類別</div>
                    <div className="text-[18px] text-[#1F1F1F] mb-5">{transferData.step1?.accountType || '一般僱員'}</div>
                    <div className="text-[15px] text-[#9A9898] mb-1">成員帳戶號碼</div>
                    <div className="text-[18px] text-[#1F1F1F]">{transferData.step1?.accountNumber || '56442131'}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'future' && (
          <div>
            <button onClick={() => setDetailOpen(v => !v)} className="w-full px-4 py-4 flex items-center justify-between border-t border-b border-[#ECECEC]">
              <span className="text-[18px] text-[#1F1F1F]">基金轉換指示 1</span>
              {detailOpen ? <ChevronUp size={20} className="text-[#1F1F1F]" /> : <ChevronDown size={20} className="text-[#1F1F1F]" />}
            </button>
            {detailOpen && (
              <div className="px-4 py-5">
                <p className="text-[15px] leading-[1.6] text-[#1F1F1F] mb-4">請確定以下基金轉換指示。</p>

                <div className="text-[18px] font-semibold text-[#1F1F1F] mb-3">轉出現有基金</div>
                <div className="overflow-hidden border border-[#E6E0D8] mb-8">
                  <div className="grid grid-cols-3 bg-[#F5A623] text-white text-[16px] font-medium">
                    <div className="p-3">基金名稱</div>
                    <div className="p-3">僱主強制性供款（港幣）</div>
                    <div className="p-3">僱主自願性供款（港幣）</div>
                  </div>
                  {outFundNames.length > 0 ? outFundNames.map((name, idx) => (
                    <div key={`out-${idx}`} className="grid grid-cols-3 border-t border-[#EEE9E3] text-[16px] text-[#1F1F1F]">
                      <div className="p-3 leading-[1.5]">{name}</div>
                      <div className="p-3">{getAllocation(outMandatory, name)}%</div>
                      <div className="p-3">{getAllocation(outVoluntary, name)}%</div>
                    </div>
                  )) : null}
                </div>

                <div className="text-[18px] font-semibold text-[#1F1F1F] mb-3">轉入基金</div>
                <div className="overflow-hidden border border-[#E6E0D8]">
                  <div className="grid grid-cols-3 bg-[#F5A623] text-white text-[16px] font-medium">
                    <div className="p-3">基金名稱</div>
                    <div className="p-3">僱主強制性供款（港幣）</div>
                    <div className="p-3">僱主自願性供款（港幣）</div>
                  </div>
                  {inFundNames.length > 0 ? inFundNames.map((name, idx) => (
                    <div key={`in-${idx}`} className="grid grid-cols-3 border-t border-[#EEE9E3] text-[16px] text-[#1F1F1F]">
                      <div className="p-3 leading-[1.5]">{name}</div>
                      <div className="p-3">{getAllocation(inMandatory, name)}%</div>
                      <div className="p-3">{getAllocation(inVoluntary, name)}%</div>
                    </div>
                  )) : null}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SwitchingRecordDetailPage;
