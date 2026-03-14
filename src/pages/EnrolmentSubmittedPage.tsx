import { useNavigate } from 'react-router-dom';

const EnrolmentSubmittedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-6 pt-24 pb-12 text-center">
      <div className="w-[150px] h-[150px] rounded-full bg-[#FBE9B5] border-[4px] border-[#1F1F1F] flex items-center justify-center mb-10">
        <div className="text-[90px] leading-none text-[#1F1F1F]">✓</div>
      </div>

      <h1 className="text-[28px] font-bold text-[#1F1F1F] mb-6">已提交登記指示</h1>

      <div className="text-[18px] text-[#1F1F1F] leading-[1.6] mb-10">
        <div className="mb-2">參考編號： END1009183001348700_001</div>
        <div className="mb-8">提交日期及時間： 02/25/2026, 17:11</div>
        <p>你的強積金登記指示已提交，當登記完成後，我們會通知你有關結果，屆時你可於「供款」&gt;「供款紀錄」查閱並繳付供款。</p>
      </div>

      <div className="w-full mt-auto space-y-6">
        <button className="w-full h-[58px] rounded-full bg-[#19345B] text-white text-[21px] font-semibold">查閱提交狀態</button>
        <button onClick={() => navigate('/')} className="w-full h-[58px] rounded-full border border-[#1F1F1F] text-[#1F1F1F] text-[21px] font-medium">返回主頁</button>
      </div>
    </div>
  );
};

export default EnrolmentSubmittedPage;
