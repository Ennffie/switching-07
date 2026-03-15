import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { usePersonalAccount } from '../context/PersonalAccountContext';

const MyAccountPage = () => {
  const navigate = useNavigate();
  const { data } = usePersonalAccount();
  const [activeTab, setActiveTab] = useState<'details' | 'contributions'>('details');
  const [openContact, setOpenContact] = useState(true);
  const [openAddress, setOpenAddress] = useState(true);

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
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white shadow-sm">
        <div className="px-4 pt-3 pb-2 flex items-center justify-center relative">
          <button onClick={() => navigate(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 p-1 text-gray-700">
            <ChevronLeft size={24} />
          </button>
          <div className="text-center">
            <div className="text-[18px] font-semibold text-[#1F1F1F]">我的帳戶</div>
          </div>
        </div>
      </div>

      {/* Account Card */}
      <div className="bg-white mx-4 mt-4 rounded-[12px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="px-5 py-5 border-b border-[#ECE7E1]">
          <div className="text-[18px] font-semibold text-[#1F1F1F] mb-2">個人帳戶持有人賬戶</div>
          <div className="text-[14px] text-[#7C7878]">帳戶號碼：70741425</div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#ECE7E1]">
          <button
            onClick={() => setActiveTab('details')}
            className={`flex-1 py-4 text-[16px] font-medium text-center ${
              activeTab === 'details'
                ? 'text-[#1B355C] border-b-2 border-[#1B355C]'
                : 'text-[#7C7878]'
            }`}
          >
            帳戶資料
          </button>
          <button
            onClick={() => setActiveTab('contributions')}
            className={`flex-1 py-4 text-[16px] font-medium text-center ${
              activeTab === 'contributions'
                ? 'text-[#1B355C] border-b-2 border-[#1B355C]'
                : 'text-[#7C7878]'
            }`}
          >
            供款詳情
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'details' && (
          <div>
            {/* Personal Info */}
            <div className="px-5 py-5 space-y-4">
              <div className="flex justify-between">
                <div className="text-[14px] text-[#8F8B8B]">姓名</div>
                <div className="text-[16px] text-[#1F1F1F]">黃家明</div>
              </div>
              <div className="flex justify-between">
                <div className="text-[14px] text-[#8F8B8B]">身份證號碼</div>
                <div className="text-[16px] text-[#1F1F1F]">A123456(7)</div>
              </div>
              <div className="flex justify-between">
                <div className="text-[14px] text-[#8F8B8B]">出生日期</div>
                <div className="text-[16px] text-[#1F1F1F]">1990年1月1日</div>
              </div>
            </div>

            {/* Contact Section */}
            {sectionHeader('聯絡資料', openContact, () => setOpenContact(v => !v))}
            {openContact && (
              <div className="px-5 py-5 space-y-4 bg-[#FAF9F8]">
                <div className="flex justify-between">
                  <div className="text-[14px] text-[#8F8B8B]">電郵</div>
                  <div className="text-[16px] text-[#1F1F1F]">{data.email || 'wong.kaming89@gmail.com'}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-[14px] text-[#8F8B8B]">手機</div>
                  <div className="text-[16px] text-[#1F1F1F]">+852 {data.mobileNumber || '96823451'}</div>
                </div>
              </div>
            )}

            {/* Address Section */}
            {sectionHeader('通訊地址', openAddress, () => setOpenAddress(v => !v))}
            {openAddress && (
              <div className="px-5 py-5 bg-[#FAF9F8]">
                <div className="text-[16px] text-[#1F1F1F] leading-[1.7]">
                  {data.residentialUnit && <div>{data.residentialUnit}</div>}
                  {data.residentialFloor && <div>{data.residentialFloor}</div>}
                  {data.residentialBlock && <div>{data.residentialBlock}</div>}
                  {data.residentialBuilding && <div>{data.residentialBuilding}</div>}
                  {data.residentialStreet && <div>{data.residentialStreet}</div>}
                  {data.residentialDistrict && <div>{data.residentialDistrict}</div>}
                  {data.residentialCountry || '香港'}
                </div>
              </div>
            )}

            {/* Update Button */}
            <div className="px-5 pt-8 pb-10">
              <button onClick={() => navigate('/personal-account-edit')} className="w-full h-[58px] rounded-full bg-[#1B355C] text-white text-[22px] font-semibold flex items-center justify-center gap-3">
                <span className="text-[28px] leading-none">✎</span>
                <span>更新</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'contributions' && (
          <div className="px-5 py-10 text-center text-[16px] text-[#8F8B8B]">
            供款詳情頁面（待開發）
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAccountPage;
