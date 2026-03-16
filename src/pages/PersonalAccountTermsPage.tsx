import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronUp, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const PersonalAccountTermsPage = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [canAccept, setCanAccept] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setCanAccept(false);
    if (bottomRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setCanAccept(true);
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );
      observer.observe(bottomRef.current);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="px-4 py-3 flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
          <div className="flex-1" />
        </div>

        <div className="px-4 pb-2">
          <h1 className="text-2xl font-bold text-[#E67E22]">條款及細則</h1>
        </div>

        <div className="px-4 py-3 bg-gray-50">
          <button onClick={() => setIsExpanded(!isExpanded)} className="flex items-center justify-center gap-1 w-full text-gray-700 font-medium mb-3">
            {isExpanded ? '顯示較少' : '顯示更多'}
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          <div className="transition-all duration-300 block">
            <p className="text-gray-900 mb-2 text-sm">點擊下方「接受」按鈕，即表示閣下確認：</p>
            <ol className="list-decimal list-inside space-y-1 text-gray-900 text-sm">
              <li>此申請內所提供之資料正確及完整；</li>
              <li>閣下明白此申請一經提交，即不可撤回；</li>
              <li>閣下已閱讀並同意受以下條款及細則約束。</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-40" style={{ WebkitOverflowScrolling: 'touch' }}>
        <div className="text-sm text-gray-700 leading-relaxed space-y-4">
          <div>
            <h3 className="font-bold text-gray-900 mb-2">更改投資指示一般條款及細則</h3>
            <h4 className="font-bold text-gray-900 mb-2">A. 重要事項</h4>
            <p className="mb-2">1. 積金易平台有限公司（「積金易公司」）是強制性公積金計劃管理局（「積金局」）的全資附屬公司。積金易公司將根據「積金易平台一般條款及細則」，透過積金易平台為你提供計劃行政服務。</p>
            <p className="mb-2">2. 提交本申請前，請先參閱友邦強積金優選計劃之強積金計劃說明書、主要計劃資料文件、重要事項、條款及細則、預設投資策略注意事項及保證組合注意事項。</p>
            <p className="mb-2">3. 積金易平台收到完整申請後，才會處理有關指示。如有遺漏（包括但不限於資料不齊全），積金易平台可能未能執行此指示。</p>
            <p className="mb-2">4. 遞交本申請後，你可能沒法取消有關更改投資指示。</p>
            <p className="mb-4">5. 本申請所有已提供的資料將按照有關強積金法例、積金易平台及本計劃《收集個人資料聲明》處理。</p>

            <h4 className="font-bold text-gray-900 mb-2">B. 條款及細則</h4>
            <p className="mb-2">1. 更改投資授權的截止時間為任何工作日香港時間下午四時。</p>
            <p className="mb-2">2. 現有結餘資產轉換的截止時間為任何工作日香港時間下午四時。</p>
            <p className="mb-2">3. 積金易平台收到有效指示才會處理本申請。</p>
            <p className="mb-2">4. 完成執行指示後，積金易平台會發出確認通知書予你。</p>
            <p className="mb-2">5. 你必須注意投資市場可能出現顯著的波動，基金單位價格可跌可升。</p>
            <p className="mb-8">E. 積金易平台及本計劃《收集個人資料聲明》詳情請參閱 eMPF.org.hk/pics</p>
          </div>
        </div>
        <div ref={bottomRef} className="h-10 w-full" />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 z-40">
        <button
          onClick={() => navigate('/invest/future-record-detail')}
          disabled={!canAccept}
          className={`w-full py-4 rounded-full text-lg font-medium mb-3 transition-all ${canAccept ? 'bg-[#1e3a5f] text-white active:scale-[0.98]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
        >
          接受
        </button>
        <button onClick={() => navigate(-1)} className="w-full py-3 text-gray-700 text-lg font-medium">
          拒絕
        </button>
      </div>
    </div>
  );
};

export default PersonalAccountTermsPage;
