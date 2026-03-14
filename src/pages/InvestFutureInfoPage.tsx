import { useNavigate } from 'react-router-dom';

const InvestFutureInfoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-20 bg-white border-b border-[#ECECEC]">
        <div className="px-4 pt-4 pb-4 flex items-center justify-between">
          <div className="text-[24px] font-semibold text-[#E6A23C]">關於更改投資授權</div>
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center text-[32px] leading-none text-[#1F1F1F]">×</button>
        </div>
      </div>

      <div className="px-5 pt-6 pb-12 text-[16px] leading-[1.7] text-[#1F1F1F] space-y-5">
        <p>計劃成員可以為未來的供款設定新的投資分配指示，而原有強積金的投資分配則維持不變。</p>

        <h2 className="text-[20px] font-semibold pt-1">例子</h2>
        <p>舉例說，計劃成員在1月15日的投資組合情況如下：</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>30% 股票基金甲</li>
          <li>70% 債券基金乙</li>
        </ul>
        <p>並於1月20日作出指示，更改未來供款的投資授權，投資於以下三種基金：</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>10% 股票基金甲</li>
          <li>70% 債券基金乙</li>
          <li>20% 強積金保守基金丙</li>
        </ul>

        <img src="./images/future-contribution-flow.jpg" alt="更改投資授權說明" className="w-full" />

        <p className="text-[13px] text-[#666]">*為簡化說明，上述例子假設所有基金價格所指時間內保持不變。在實際情況下，若基金價格變動，現有強積金的投資組合結餘亦會隨之改變。</p>
      </div>
    </div>
  );
};

export default InvestFutureInfoPage;
