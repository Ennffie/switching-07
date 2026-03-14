import { useNavigate } from 'react-router-dom';

const InvestInfoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-20 bg-white border-b border-[#ECECEC]">
        <div className="px-4 pt-4 pb-4 flex items-center justify-between">
          <div className="w-8" />
          <div className="text-[20px] font-medium text-[#1F1F1F]">關於基金轉換及重組投資組合</div>
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center text-[32px] leading-none text-[#1F1F1F]">×</button>
        </div>
      </div>

      <div className="px-5 pt-6 pb-12 text-[16px] leading-[1.7] text-[#1F1F1F] space-y-5">
        <p>計劃成員可透過「基金轉換」或「重組投資組合」功能，將帳戶內的某個基金的單位沽出，並把所得款項投資於同一計劃的另一個基金，從而更改現有帳戶結餘的投資組合。</p>
        <p>部分受託人或設有限制成員每年最多可轉換基金多少次。詳情請參閱計劃的基金轉換表格及強積金計劃冊子。</p>

        <h2 className="text-[22px] font-semibold pt-2">基金轉換</h2>
        <p>贖回在一個或多個基金的部分或所有強積金（即「轉出」），然後把所得款項投資於另外一個或多個基金（即「轉入」），從而改變現有的強積金投資組合。</p>

        <h3 className="text-[20px] font-semibold">例子</h3>
        <p>舉例說，假設現有的強積金的投資組合結餘如下：</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>股票基金甲 $3,000</li>
          <li>債券基金乙 $7,000</li>
        </ul>
        <p>計劃成員作出以下基金轉換的指示：</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>在股票基金甲內的所有投資轉出；以及</li>
          <li>把贖回股票基金甲所得的全部款項分為兩半，分別轉入強積金保守基金丙及債券基金丁</li>
        </ul>

        <div>
          <img src="./images/fund-transfer-flow.jpg" alt="基金轉換說明" className="w-full bg-white mix-blend-normal" />
        </div>

        <p className="text-[13px] text-[#666]">*為簡化說明，上述例子假設所有基金價格在作出基金轉換指示之前及之後均保持不變。在實際情況下，若基金價格在作出指示後有所變動，現有強積金的投資組合結餘亦會隨之改變。</p>

        <h2 className="text-[22px] font-semibold pt-2">重組投資組合</h2>
        <p>根據新的基金分配指示，改變現有強積金的投資組合。首先是根據指示贖回現有的部分強積金，然後重新投資，以達致要求的基金分配比例。此方法透過改變各基金的比重，重組投資組合。</p>

        <h3 className="text-[20px] font-semibold">例子</h3>
        <p>舉例說，假設現有強積金的投資組合結餘如下：</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>股票基金甲 $3,000</li>
          <li>債券基金乙 $7,000</li>
        </ul>
        <p>計劃成員作出重組投資組合的指示，把現有強積金的投資組合改為：</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>80% 股票基金甲</li>
          <li>20% 債券基金乙</li>
        </ul>

        <div>
          <img src="./images/portfolio-rebalance-flow.jpg" alt="重組投資組合說明" className="w-full bg-white mix-blend-normal" />
        </div>

        <p className="text-[13px] text-[#666]">*為簡化說明，上述例子假設所有基金價格在作出指示之前及之後均保持不變。在實際情況下，若基金價格在作出指示後有所變動，現有強積金的投資組合結餘亦會隨之改變。</p>
      </div>
    </div>
  );
};

export default InvestInfoPage;
