import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const jobOptions = [
  '首席執行官、高級官員和立法者',
  '行政和商業經理',
  '生產和專業服務經理',
  '酒店、零售和其他服務經理',
  '科學和工程專業人員',
];

const EnrolmentPersonalInfoPage = () => {
  const navigate = useNavigate();
  const [showJobOptions, setShowJobOptions] = useState(false);
  const [showCrs, setShowCrs] = useState(true);
  const [selectedTax, setSelectedTax] = useState('hk-only');

  useEffect(() => { window.scrollTo(0,0); }, []);

  return (
    <div className="min-h-screen bg-[#F6F5F4] flex flex-col">
      <div className="sticky top-0 z-20 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="px-4 pt-4 pb-4 flex items-center justify-center relative border-b border-[#ECECEC]">
          <button onClick={() => navigate(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center"><img src="./icons/icon-back.png" alt="返回" className="w-6 h-6 object-contain" /></button>
          <h1 className="text-[18px] font-semibold text-[#1F1F1F] tracking-[-0.01em]">申請一般僱員</h1>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-4">
            <img src="./icons/icon-save.png" alt="儲存" className="w-6 h-6 object-contain" />
            <button onClick={() => navigate('/')} className="w-5 h-5 flex items-center justify-center"><img src="./icons/icon-close.png" alt="關閉" className="w-5 h-5 object-contain" /></button>
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

      <div className="px-6 pt-8 pb-28 flex-1 space-y-6">
        <h2 className="text-[24px] font-bold text-[#E6A23C]">個人資料</h2>
        <div>
          <div className="text-[20px] font-bold text-[#1F1F1F] mb-2">友邦強積金優選計劃</div>
          <div className="text-[16px] text-[#666666] leading-[1.5]">AIA MPF - Prime Value Choice</div>
        </div>

        <div className="border-t border-b border-[#DADADA] py-4 flex items-center justify-between text-[#1F1F1F]">
          <div className="flex items-center gap-3">
            <span className="text-[#D08A17] text-[30px] leading-none">✓</span>
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
            ['姓氏（英文）','WONG'],
            ['名字（英文）','KA MING'],
            ['姓氏（中文）','黃'],
            ['名字（中文）','家明'],
          ].map(([label, value]) => (
            <div key={label}>
              <label className="block text-[16px] text-[#666666] mb-2">{label}</label>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-[58px] rounded-[8px] border border-[#DADADA] bg-[#F3F2F2] px-4 flex items-center text-[18px] text-[#A7A3A3]">{value}</div>
                <img src="./icons/icon-iam-smart-small-user.jpg" alt="iAM" className="w-8 h-8 object-contain opacity-90" />
              </div>
            </div>
          ))}

          <div>
            <label className="block text-[16px] text-[#666666] mb-2">性別</label>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-[58px] rounded-[8px] border border-[#DADADA] bg-[#F3F2F2] px-4 flex items-center justify-between text-[18px] text-[#A7A3A3]">男性 <span>⌄</span></div>
              <img src="./icons/icon-iam-smart-small-user.jpg" alt="iAM" className="w-8 h-8 object-contain opacity-90" />
            </div>
          </div>

          <div>
            <label className="block text-[16px] text-[#666666] mb-2">出生地點</label>
            <div className="h-[58px] rounded-[8px] border border-[#DADADA] bg-white px-4 flex items-center justify-between text-[18px] text-[#1F1F1F]">香港 <span>⌄</span></div>
          </div>

          <div>
            <label className="block text-[16px] text-[#666666] mb-2">國籍</label>
            <div className="h-[58px] rounded-[8px] border border-[#DADADA] bg-white px-4 flex items-center justify-between text-[18px] text-[#1F1F1F]">中國 <span>⌄</span></div>
          </div>

          <div>
            <label className="block text-[16px] text-[#666666] mb-2">職位</label>
            <button onClick={() => setShowJobOptions(v => !v)} className={`w-full h-[58px] rounded-[8px] border px-4 flex items-center justify-between text-[18px] ${showJobOptions ? 'border-[#E3C16A] bg-white text-[#1F1F1F]' : 'border-[#DADADA] bg-white text-[#1F1F1F]'}`}>
              行政和商業經理 <span>{showJobOptions ? '⌃' : '⌄'}</span>
            </button>
            {showJobOptions && (
              <div className="bg-white border border-[#E5E5E5] rounded-b-[8px] shadow-[0_6px_14px_rgba(0,0,0,0.08)] overflow-hidden">
                {jobOptions.map((opt) => (
                  <div key={opt} className={`px-5 py-5 text-[18px] border-b last:border-b-0 border-[#F0F0F0] ${opt === '行政和商業經理' ? 'text-[#1F1F1F] bg-[#FAF7F2]' : 'text-[#1F1F1F]'}`}>{opt}</div>
                ))}
              </div>
            )}
          </div>
        </div>

        {['聯絡資料','地址','通訊方式'].map((title) => (
          <div key={title} className="border-t border-b border-[#DADADA] py-4 flex items-center justify-between text-[#1F1F1F] bg-transparent">
            <div className="flex items-center gap-3">
              <span className="text-[#D08A17] text-[30px] leading-none">✓</span>
              <span className="text-[18px] font-medium">{title}</span>
            </div>
            <span className="text-[22px]">⌄</span>
          </div>
        ))}

        <div className="border-t border-b border-[#DADADA] py-4 text-[#1F1F1F] bg-transparent">
          <button onClick={() => setShowCrs(v => !v)} className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`text-[30px] leading-none ${showCrs ? 'text-[#D08A17]' : 'text-[#D8D8D8]'}`}>✓</span>
              <span className="text-[18px] font-medium">共同匯報標準表格</span>
            </div>
            <span className="text-[22px]">{showCrs ? '⌃' : '⌄'}</span>
          </button>

          {showCrs && (
            <div className="pt-6 space-y-6">
              <div className="bg-[#F6EDE2] rounded-[12px] px-5 py-5">
                <div className="flex items-start gap-3">
                  <span className="text-[30px] leading-none">💡</span>
                  <div className="text-[17px] leading-[1.7] text-[#1F1F1F]">
                    <div className="font-bold mb-3">重要提示：</div>
                    <p className="mb-4">請留意，受託人及／或積金易平台不得向你提供任何稅務或法律建議。有關稅務的問題，請諮詢你的稅務顧問或參考經濟合作暨發展組織（OECD）網頁及稅務局有關自動交換財務帳戶資料的網頁。</p>
                    <p>請留意，一旦更改共同匯報標準，有關改動將會自動套用到你的積金易號碼下的所有強積金帳戶。</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[20px] font-bold text-[#1F1F1F] mb-5">我的稅務居住地為</div>
                <div className="space-y-5">
                  {[
                    ['hk-only','只有香港，及沒有處於任何其他司法管轄區／國家／地區的稅務居住地，而本人的香港身分證號碼是本人的稅務編號'],
                    ['hk-and-other','香港及其他司法管轄區／國家／地區'],
                    ['other-only','不是香港而是其他司法管轄區／國家／地區'],
                  ].map(([value, label]) => (
                    <label key={value} className="flex items-start gap-4 cursor-pointer">
                      <span className={`mt-1 w-7 h-7 rounded-full border-2 flex items-center justify-center ${selectedTax === value ? 'border-[#E5A323]' : 'border-[#CFCFCF]'}`}>
                        {selectedTax === value && <span className="w-4 h-4 rounded-full bg-[#E5A323]" />}
                      </span>
                      <input type="radio" className="hidden" checked={selectedTax === value} onChange={() => setSelectedTax(value)} />
                      <span className="text-[18px] leading-[1.7] text-[#1F1F1F]">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[16px] text-[#A5A2A2] mb-2">解釋共同匯報標準資料</label>
                <div className="h-[62px] rounded-[8px] border border-[#DADADA] bg-[#F8F8F8]" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="sticky bottom-0 bg-[#F6F5F4] px-6 pt-3 pb-6">
        <button onClick={() => selectedTax === 'hk-only' && navigate('/enrolment-step-3-invest')} className={`w-full h-[58px] rounded-full text-[19px] font-semibold border ${selectedTax === 'hk-only' ? 'bg-[#19345B] text-white border-[#19345B]' : 'bg-[#E8E5E5] text-[#B7B3B3] border-[#D7D3D3]'}`}>下一步</button>
      </div>
    </div>
  );
};

export default EnrolmentPersonalInfoPage;
