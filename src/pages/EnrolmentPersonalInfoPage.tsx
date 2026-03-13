import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EnrolmentPersonalInfoPage = () => {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0,0); }, []);

  return (
    <div className="min-h-screen bg-[#F6F5F4] flex flex-col">
      <div className="sticky top-0 z-20 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="px-4 pt-4 pb-4 flex items-center justify-center relative border-b border-[#ECECEC]">
          <button onClick={() => navigate(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center"><img src="./icons/icon-back.png" alt="返回" className="w-6 h-6 object-contain" /></button>
          <h1 className="text-[18px] font-semibold text-[#1F1F1F] tracking-[-0.01em]">申請一般僱員</h1>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-4">
            <img src="./icons/icon-save.png" alt="儲存" className="w-6 h-6 object-contain" />
            <img src="./icons/icon-close.png" alt="關閉" className="w-5 h-5 object-contain" />
          </div>
        </div>

        <div className="px-6 pt-4 pb-4 bg-white">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-[18px] left-[40px] right-[40px] h-[2px] bg-[#E6E3E3]" />
            {['✓','2','3','4'].map((n, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[20px] font-bold ${i < 2 ? 'bg-[#F5A623] text-white shadow-[0_2px_4px_rgba(0,0,0,0.12)]' : 'bg-[#EDEBEB] text-[#B7B3B3]'}`}>
                  <span className="text-[20px] leading-none">{n}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 pt-8 pb-10 flex-1">
        <h2 className="text-[24px] font-bold text-[#E6A23C] mb-5">個人資料</h2>
        <div className="mb-6">
          <div className="text-[20px] font-bold text-[#1F1F1F] mb-2">友邦強積金優選計劃</div>
          <div className="text-[16px] text-[#666666] leading-[1.5]">AIA MPF - Prime Value Choice</div>
        </div>

        <div className="border-t border-[#DADADA] border-b border-[#DADADA] py-4 flex items-center justify-between text-[#1F1F1F] mb-6">
          <div className="flex items-center gap-3">
            <span className="text-[#D8D8D8] text-[30px]">✓</span>
            <span className="text-[18px] font-medium">個人詳細資料</span>
          </div>
          <span className="text-[22px]">⌃</span>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-[16px] text-[#666666] mb-2">稱謂</label>
            <div className="h-[58px] rounded-[8px] border border-[#DADADA] bg-[#F3F2F2] px-4 flex items-center justify-between text-[18px] text-[#A7A3A3]">先生 <span>⌄</span></div>
          </div>
          {[
            ['姓氏（英文）','LEE'],
            ['名字（英文）','SIU MING'],
            ['姓氏（中文）','李'],
            ['名字（中文）','小明'],
          ].map(([label, value]) => (
            <div key={label}>
              <label className="block text-[16px] text-[#666666] mb-2">{label}</label>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-[58px] rounded-[8px] border border-[#DADADA] bg-[#F3F2F2] px-4 flex items-center text-[18px] text-[#A7A3A3]">{value}</div>
                <img src="./icons/icon-iam-smart-user.jpg" alt="iAM" className="w-8 h-8 object-contain opacity-70" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnrolmentPersonalInfoPage;
