import { useNavigate } from 'react-router-dom';

const rows = [
  ['1（最低風險／回報）', '0.0%', '0.4%'],
  ['2（低風險／回報）', '0.5%', '1.9%'],
  ['3（低至中風險／回報）', '2.0%', '4.9%'],
  ['4（中等風險／回報）', '5.0%', '9.9%'],
  ['5（中等至高風險／回報）', '10.0%', '14.9%'],
  ['6（高風險／回報）', '15.0%', '24.9%'],
  ['7（最高風險／回報）', '25.0%', '-'],
];

const colors = ['#7B61FF','#2F80ED','#20B2AA','#3B7F2A','#F2C94C','#F2994A','#C62828'];

const EnrolmentRiskLevelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-20 bg-white border-b border-[#ECECEC] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="px-4 pt-4 pb-4 flex items-center justify-center relative">
          <h1 className="text-[20px] font-medium text-[#1F1F1F]">風險級別</h1>
          <button onClick={() => navigate(-1)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[32px] leading-none text-[#1F1F1F]">×</button>
        </div>
      </div>

      <div className="px-6 pt-8 pb-12 text-[#1F1F1F]">
        <h2 className="text-[20px] font-semibold mb-6">關於風險級別</h2>
        <div className="space-y-6 text-[18px] leading-[1.75] mb-10">
          <p>風險級別用以協助計劃成員在作出投資決定前辨別不同基金的風險程度，衡量自己可以承擔的風險水平。</p>
          <p>風險級別根據受託人發出的最新的基金便覽上顯示的基金風險標記，以1至7（由低至高）標示每個強積金基金的風險級數。基金風險標記是按照強積金基金在過去三年的每月回報率，以量度基金表現的波動。凡在基金便覽匯報日成立不足三年的成分基金，均不提供風險標記，此情況下該基金亦不會設定任何風險級別。</p>
        </div>

        <h2 className="text-[20px] font-semibold mb-5">風險級別分類</h2>
        <div className="flex justify-between text-[16px] font-medium mb-3">
          <span>最低風險</span>
          <span>最高風險</span>
        </div>
        <div className="grid grid-cols-7 mb-8 max-w-[520px] overflow-hidden rounded-[2px] border border-[#E5E5E5]">
          {colors.map((c, i) => (
            <div key={i} className="h-[54px] text-white text-center flex flex-col items-center justify-center font-bold" style={{ backgroundColor: c }}>
              <div className="text-[13px]">級別</div>
              <div className="text-[17px] leading-none mt-1">{i+1}</div>
            </div>
          ))}
        </div>

        <div className="border border-[#E5E5E5]">
          <div className="grid grid-cols-[2.25fr_1fr_1fr] bg-[#F5A623] text-white text-[16px] font-medium">
            <div className="px-4 py-4 flex items-center border-r border-white/30">風險級別</div>
            <div className="col-span-2 text-center border-b border-white/30">
              <div className="px-4 pt-3 pb-2">基金風險標記</div>
              <div className="grid grid-cols-2 border-t border-white/30">
                <div className="px-4 py-3">相等或以上</div>
                <div className="px-4 py-3 border-l border-white/30">少於</div>
              </div>
            </div>
          </div>
          {rows.map((row, idx) => (
            <div key={idx} className="grid grid-cols-[2.25fr_1fr_1fr] text-[15px] border-t border-[#EAEAEA] bg-white">
              <div className="px-4 py-4">{row[0]}</div>
              <div className="px-4 py-4 text-center border-l border-[#EAEAEA]">{row[1]}</div>
              <div className="px-4 py-4 text-center border-l border-[#EAEAEA]">{row[2]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnrolmentRiskLevelPage;
