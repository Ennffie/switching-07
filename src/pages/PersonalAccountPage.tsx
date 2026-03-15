import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { usePersonalAccount } from '../context/PersonalAccountContext';

const PersonalAccountPage = () => {
  const navigate = useNavigate();
  const { data } = usePersonalAccount();
  const [openContact, setOpenContact] = useState(true);
  const [openAddress, setOpenAddress] = useState(false);
  const [openCommAddress, setOpenCommAddress] = useState(false);
  const [openCommMethod, setOpenCommMethod] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionHeader = (title: string, open: boolean, onClick: () => void, isGray = false) => (
    <button onClick={onClick} className="w-full bg-white px-5 py-5 flex items-center justify-between border-y border-[#ECE7E1] text-left">
      <div className={`text-[18px] font-medium ${isGray ? 'text-[#8F8B8B]' : 'text-[#1F1F1F]'}`}>{title}</div>
      {open ? <ChevronUp size={22} className="text-[#1F1F1F]" /> : <ChevronDown size={22} className="text-[#1F1F1F]" />}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#FAF9F8] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white shadow-sm">
        <div className="px-4 pt-3 pb-2 flex items-center justify-center relative">
          <button onClick={() => navigate(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 p-1 text-gray-700">
            <ChevronLeft size={24} />
          </button>
          <div className="text-center">
            <div className="text-[18px] font-semibold text-[#1F1F1F]">個人帳戶</div>
            <div className="text-[14px] text-[#7C7878] mt-1">帳戶號碼：70741425</div>
          </div>
        </div>
      </div>

      {/* Plan Name Header */}
      <div className="px-5 py-4">
        <div className="text-[20px] font-semibold text-[#1F1F1F]">宏利環球精選（強積金）計劃</div>
      </div>

      {/* Account Card */}
      <div className="bg-[#FFF8F0] mx-4 rounded-[12px] p-5 relative">
        <div className="text-[20px] font-bold text-[#1F1F1F] mb-1">宏利環球精選（強積金）計劃</div>
        <div className="text-[14px] text-[#7C7878] mb-4">帳戶號碼：70741425</div>
        <button 
          onClick={() => navigate('/personal-account-edit')} 
          className="absolute right-4 top-4 w-[36px] h-[36px] flex items-center justify-center"
        >
          <svg className="w-[24px] h-[24px] text-[#1F1F1F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M12 8v8M8 12h8" />
          </svg>
        </button>
      </div>

      {/* Account Balance */}
      <div className="px-5 py-4">
        <div className="text-[14px] text-[#8F8B8B] mb-1">帳戶結餘（港幣）</div>
        <div className="text-[28px] font-bold text-[#1F1F1F]">$ 30,673.78</div>
      </div>

      {/* Effective Date */}
      <div className="px-5 pb-4">
        <div className="text-[14px] text-[#8F8B8B] mb-1">帳戶生效日期（日／月／年）</div>
        <div className="text-[16px] text-[#1F1F1F]">24/09/2011</div>
      </div>

      {/* Contact Section */}
      {sectionHeader('聯絡資料', openContact, () => setOpenContact(v => !v), true)}
      {openContact && (
        <div className="px-5 py-5 space-y-4 bg-white">
          <div>
            <div className="text-[14px] text-[#8F8B8B] mb-1">電郵地址</div>
            <div className="text-[16px] text-[#1F1F1F] uppercase">{data.email || 'enfieldlaw@yahoo.com.hk'}</div>
          </div>
          <div>
            <div className="text-[14px] text-[#8F8B8B] mb-1">手機號碼</div>
            <div className="text-[16px] text-[#1F1F1F]">+852 {data.mobileNumber || '98849795'}</div>
          </div>
          <div>
            <div className="text-[14px] text-[#8F8B8B] mb-1">第二電話號碼（可選填）</div>
            <div className="text-[16px] text-[#1F1F1F]">+852 {data.secondPhoneNumber || '98849795'}</div>
          </div>
        </div>
      )}

      {/* Address Section */}
      {sectionHeader('地址', openAddress, () => setOpenAddress(v => !v), true)}
      {openAddress && (
        <div className="px-5 py-5 space-y-4 bg-white">
          <div>
            <div className="text-[14px] text-[#8F8B8B] mb-1">國家／地區</div>
            <div className="text-[16px] text-[#1F1F1F]">{data.residentialCountry || 'HK'}</div>
          </div>
          <div>
            <div className="text-[14px] text-[#8F8B8B] mb-1">單位／室（例如：「2室」、「A室」）</div>
            <div className="text-[16px] text-[#1F1F1F]">{data.residentialUnit || '2/F'}</div>
          </div>
          <div>
            <div className="text-[14px] text-[#8F8B8B] mb-1">層數（例如：「12樓」）</div>
            <div className="text-[16px] text-[#1F1F1F]">{data.residentialFloor || '56 SAN HING STREET'}</div>
          </div>
          <div>
            <div className="text-[14px] text-[#8F8B8B] mb-1">座（例如：「C座」）</div>
            <div className="text-[16px] text-[#1F1F1F]">{data.residentialBlock || 'CHEUNG CHAU'}</div>
          </div>
          <div>
            <div className="text-[14px] text-[#8F8B8B] mb-1">大廈</div>
            <div className="text-[16px] text-[#1F1F1F]">{data.residentialBuilding || 'NEW TERRITORIES'}</div>
          </div>
        </div>
      )}

      {/* Communication Address Section */}
      {sectionHeader('通訊地址', openCommAddress, () => setOpenCommAddress(v => !v), true)}
      {openCommAddress && (
        <div className="px-5 py-5 bg-white">
          <div className="text-[16px] text-[#1F1F1F] leading-[1.7]">
            {data.correspondenceSameAsResidential ? '與住址相同' : (
              <>
                {data.correspondenceUnit && <div>{data.correspondenceUnit}</div>}
                {data.correspondenceFloor && <div>{data.correspondenceFloor}</div>}
                {data.correspondenceBlock && <div>{data.correspondenceBlock}</div>}
                {data.correspondenceBuilding && <div>{data.correspondenceBuilding}</div>}
                {data.correspondenceStreet && <div>{data.correspondenceStreet}</div>}
                {data.correspondenceDistrict && <div>{data.correspondenceDistrict}</div>}
                {data.correspondenceCountry || '香港'}
              </>
            )}
          </div>
        </div>
      )}

      {/* Communication Method Section */}
      {sectionHeader('通訊方式', openCommMethod, () => setOpenCommMethod(v => !v), true)}
      {openCommMethod && (
        <div className="px-5 py-5 bg-white">
          <div className="text-[16px] text-[#1F1F1F] leading-[1.7]">
            {data.directMarketingConsent === '是' ? '已同意直接促銷' : '未同意直接促銷'}
          </div>
        </div>
      )}

      {/* Update Button */}
      <div className="fixed bottom-6 left-4 right-4">
        <button 
          onClick={() => navigate('/personal-account-edit')} 
          className="w-full h-[58px] rounded-full bg-[#1B355C] text-white text-[20px] font-semibold flex items-center justify-center gap-3 shadow-lg"
        >
          <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M12 8v8M8 12h8" />
          </svg>
          <span>更新</span>
        </button>
      </div>
    </div>
  );
};

export default PersonalAccountPage;
