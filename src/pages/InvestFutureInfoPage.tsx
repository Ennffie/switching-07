import { useNavigate } from 'react-router-dom';

const InvestFutureInfoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-20 bg-white border-b border-[#ECECEC]">
        <div className="px-4 pt-4 pb-4 flex items-center justify-between">
          <div className="w-8" />
          <div className="text-[20px] font-medium text-[#1F1F1F]">關於更改未來供款的投資組合</div>
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center text-[32px] leading-none text-[#1F1F1F]">×</button>
        </div>
      </div>

      <div className="px-5 pt-6 pb-12 text-[16px] leading-[1.7] text-[#1F1F1F] space-y-5">
        <p>更改未來供款的投資組合，是指更改所有未來收到的款項的投資分配，包括供款及自另一計劃轉入之款項。</p>
        <p>有關更改未來供款的投資組合的詳情，請參閱計劃文件及積金易平台相關說明。</p>

        <h2 className="text-[22px] font-semibold pt-2">例子</h2>
        <p>假設現時未來供款會按以下投資授權分配：</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>股票基金甲 60%</li>
          <li>債券基金乙 40%</li>
        </ul>
        <p>計劃成員可更改日後收到的供款分配，例如改為：</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>股票基金甲 30%</li>
          <li>債券基金乙 20%</li>
          <li>保守基金丙 50%</li>
        </ul>

        <div className="border border-[#DADADA] rounded-[20px] p-4">
          <img src="./images/future-contribution-flow.jpg" alt="更改未來供款投資組合說明" className="w-full rounded-[12px]" />
        </div>

        <p className="text-[13px] text-[#666]">*實際安排須視乎個別計劃及受託人的處理時間與條款而定。</p>
      </div>
    </div>
  );
};

export default InvestFutureInfoPage;
