import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';

const PersonalAccountEditPage = () => {
  const navigate = useNavigate();
  const [openContact, setOpenContact] = useState(true);
  const [openAddress, setOpenAddress] = useState(true);
  const [openComm, setOpenComm] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionHeader = (title: string, open: boolean, onClick: () => void) => (
    <button onClick={onClick} className="w-full bg-white px-5 py-5 flex items-center justify-between border-y border-[#ECE7E1] text-left">
      <div className="text-[18px] font-medium text-[#1F1F1F]">{title}</div>
      {open ? <ChevronUp size={22} className="text-[#1F1F1F]" /> : <ChevronDown size={22} className="text-[#1F1F1F]" />}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#FAF9F8]">
      <div className="sticky top-0 z-20 bg-white shadow-sm">
        <div className="px-4 pt-3 pb-2 flex items-center justify-center relative">
          <button onClick={() => navigate(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 p-1 text-gray-700">
            <ChevronLeft size={24} />
          </button>
          <div className="text-center">
            <div className="text-[18px] font-semibold text-[#1F1F1F]">個人賬戶持有人賬戶</div>
            <div className="text-[14px] text-[#7C7878] mt-1">帳戶號碼：70741425</div>
          </div>
        </div>
      </div>

      <div className="pb-36">
        {sectionHeader('聯絡資料', openContact, () => setOpenContact(v => !v))}
        {openContact && (
          <div className="bg-[#FAF9F8] px-5 py-8 space-y-7 border-b border-[#ECE7E1]">
            <div>
              <div className="text-[16px] text-[#8F8B8B] mb-3">電郵</div>
              <div className="grid grid-cols-[1fr_104px] rounded-[6px] overflow-hidden border border-[#E1DDDD] bg-white">
                <div className="h-[58px] px-4 flex items-center text-[18px] text-[#111]">enfieldlaw@yahoo.com.hk</div>
                <button className="bg-[#F6E6AA] text-[18px] font-medium text-[#1F1F1F]">驗證</button>
              </div>
            </div>

            <div>
              <div className="text-[16px] text-[#8F8B8B] mb-3">手機號碼</div>
              <div className="grid grid-cols-[126px_1fr_104px] gap-3">
                <div className="h-[58px] rounded-[6px] border border-[#E1DDDD] bg-white px-4 flex items-center justify-between text-[18px] text-[#111]">
                  <span>+852</span><ChevronDown size={20} />
                </div>
                <div className="h-[58px] rounded-[6px] border border-[#E1DDDD] bg-white px-4 flex items-center text-[18px] text-[#111]">98849795</div>
                <button className="rounded-[6px] bg-[#F6E6AA] text-[18px] font-medium text-[#1F1F1F]">驗證</button>
              </div>
            </div>

            <div>
              <div className="text-[16px] text-[#8F8B8B] mb-3">第二電話號碼（可選填）</div>
              <div className="grid grid-cols-[126px_1fr] gap-3">
                <div className="h-[58px] rounded-[6px] border border-[#E1DDDD] bg-white px-4 flex items-center justify-between text-[18px] text-[#B7B3B3]">
                  <span>請…</span><ChevronDown size={20} />
                </div>
                <div className="h-[58px] rounded-[6px] border border-[#E1DDDD] bg-white" />
              </div>
            </div>
          </div>
        )}

        {sectionHeader('地址', openAddress, () => setOpenAddress(v => !v))}
        {openAddress && (
          <div className="bg-[#FAF9F8] px-5 py-8 border-b border-[#ECE7E1]">
            <div className="rounded-[12px] bg-[#FFF4E8] px-4 py-4 flex items-start gap-3 mb-8">
              <Lightbulb size={22} className="text-[#1F1F1F] mt-0.5 flex-shrink-0" />
              <div className="text-[16px] text-[#1F1F1F]">不接納郵政信箱。</div>
            </div>

            <div className="text-[22px] font-semibold text-[#111] mb-6">住址</div>
            <div className="space-y-6">
              <div>
                <div className="text-[16px] text-[#8F8B8B] mb-3">國家／地區</div>
                <div className="h-[58px] rounded-[6px] border border-[#E1DDDD] bg-white px-4 flex items-center justify-between text-[18px] text-[#111]">
                  <span>香港</span><ChevronDown size={20} />
                </div>
              </div>

              <div>
                <div className="text-[16px] text-[#8F8B8B] mb-3">城市</div>
                <div className="h-[58px] rounded-[6px] border border-[#E1DDDD] bg-[#F3F1F1]" />
              </div>

              <div>
                <div className="text-[16px] text-[#8F8B8B] mb-3">單位／室（例如：「2室」、「A室」）</div>
                <div className="grid grid-cols-[1fr_180px] gap-3">
                  <div className="h-[58px] rounded-[6px] border border-[#E1DDDD] bg-white px-4 flex items-center text-[18px] text-[#111]">G/F</div>
                  <div className="h-[58px] rounded-[6px] border border-[#E1DDDD] bg-white px-4 flex items-center justify-between text-[18px] text-[#111]"><span>不填寫（…</span><ChevronDown size={20} /></div>
                </div>
              </div>

              <div>
                <div className="text-[16px] text-[#8F8B8B] mb-3">層數（例如：「12樓」）</div>
                <div className="grid grid-cols-[1fr_180px] gap-3">
                  <div className="h-[58px] rounded-[6px] border border-[#E1DDDD] bg-white px-4 flex items-center text-[18px] text-[#111]">6A MAN SHUN LANE</div>
                  <div className="h-[58px] rounded-[6px] border border-[#E1DDDD] bg-white px-4 flex items-center justify-between text-[18px] text-[#111]"><span>不填寫（…</span><ChevronDown size={20} /></div>
                </div>
              </div>

              <div>
                <div className="text-[16px] text-[#8F8B8B] mb-3">座（例如：「C座」）</div>
                <div className="grid grid-cols-[1fr_180px] gap-3">
                  <div className="h-[58px] rounded-[6px] border border-[#E1DDDD] bg-white px-4 flex items-center text-[18px] text-[#111]">CHEUNG CHAU</div>
                  <div className="h-[58px] rounded-[6px] border border-[#E1DDDD] bg-white px-4 flex items-center justify-between text-[18px] text-[#111]"><span>不填寫（…</span><ChevronDown size={20} /></div>
                </div>
              </div>

              <div>
                <div className="text-[16px] text-[#8F8B8B] mb-3">大廈</div>
                <div className="h-[58px] rounded-[6px] border border-[#E1DDDD] bg-white px-4 flex items-center text-[18px] text-[#111]">HONG KONG</div>
              </div>

              <div>
                <div className="text-[16px] text-[#8F8B8B] mb-3">街道（街號及街道名稱）</div>
                <div className="h-[58px] rounded-[6px] border border-[#E1DDDD] bg-white" />
              </div>

              <div>
                <div className="text-[16px] text-[#8F8B8B] mb-3">區域</div>
                <div className="h-[58px] rounded-[6px] border border-[#E1DDDD] bg-white px-4 flex items-center justify-between text-[18px] text-[#B7B3B3]">
                  <span>請選擇</span><ChevronDown size={20} />
                </div>
              </div>

              <div>
                <div className="text-[16px] text-[#8F8B8B] mb-3">郵政編碼</div>
                <div className="h-[58px] rounded-[6px] border border-[#E1DDDD] bg-[#F3F1F1]" />
              </div>
            </div>

            <div className="text-[22px] font-semibold text-[#111] mt-10 mb-5">通訊地址</div>
            <div className="space-y-5">
              <label className="flex items-center gap-4 text-[20px] text-[#1F1F1F]">
                <span className="w-7 h-7 rounded-full border-2 border-[#E5A323] flex items-center justify-center"><span className="w-3.5 h-3.5 rounded-full bg-[#E5A323]" /></span>
                <span>與住址相同</span>
              </label>
              <label className="flex items-center gap-4 text-[20px] text-[#1F1F1F]">
                <span className="w-7 h-7 rounded-full border-2 border-[#D2CECE]" />
                <span>其他地址</span>
              </label>
            </div>
          </div>
        )}

        {sectionHeader('通訊方式', openComm, () => setOpenComm(v => !v))}

        <div className="fixed left-0 right-0 bottom-0 bg-[#FAF9F8] px-5 pt-4 pb-8 border-t border-[#ECE7E1]">
          <button className="w-full h-[58px] rounded-full bg-[#ECEAEA] text-[#B8B4B4] text-[22px] font-semibold mb-4">儲存</button>
          <button onClick={() => navigate(-1)} className="w-full text-center text-[22px] text-[#1F1F1F]">取消</button>
        </div>
      </div>
    </div>
  );
};

export default PersonalAccountEditPage;
