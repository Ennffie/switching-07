import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import { usePersonalAccount } from '../context/PersonalAccountContext';

const countryCodes = [
  '+852', '+853', '+86', '+1', '+1-242', '+1-246', '+1-264', '+1-268', '+1-284', '+1-345', '+1-441', '+1-473', '+1-649', '+1-664', '+1-670', '+1-671', '+1-684', '+1-721', '+1-758', '+1-767', '+1-784', '+1-787', '+1-809', '+1-829', '+1-849', '+1-868', '+1-869', '+1-876',
  '+20', '+27', '+30', '+31', '+32', '+33', '+34', '+36', '+39', '+40', '+41', '+43', '+44', '+45', '+46', '+47', '+48', '+49', '+51', '+52', '+54', '+55', '+56', '+57', '+58', '+60', '+61', '+62', '+63', '+64', '+65', '+66', '+81', '+82', '+84', '+90', '+91', '+92', '+93', '+94', '+95', '+98', '+211', '+212', '+213', '+216', '+218', '+220', '+221', '+222', '+223', '+224', '+225', '+226', '+227', '+228', '+229', '+230', '+231', '+232', '+233', '+234', '+235', '+236', '+237', '+238', '+239', '+240', '+241', '+242', '+243', '+244', '+245', '+246', '+248', '+249', '+250', '+251', '+252', '+253', '+254', '+255', '+256', '+257', '+258', '+260', '+261', '+262', '+263', '+264', '+265', '+266', '+267', '+268', '+269', '+290', '+291', '+297', '+298', '+299', '+350', '+351', '+352', '+353', '+354', '+355', '+356', '+357', '+358', '+359', '+370', '+371', '+372', '+373', '+374', '+375', '+376', '+377', '+378', '+380', '+381', '+382', '+385', '+386', '+387', '+389', '+420', '+421', '+423', '+500', '+501', '+502', '+503', '+504', '+505', '+506', '+507', '+508', '+509', '+590', '+591', '+592', '+593', '+594', '+595', '+596', '+597', '+598', '+599', '+670', '+672', '+673', '+674', '+675', '+676', '+677', '+678', '+679', '+680', '+681', '+682', '+683', '+685', '+686', '+687', '+688', '+689', '+690', '+691', '+692', '+850', '+855', '+856', '+880', '+886', '+960', '+961', '+962', '+963', '+964', '+965', '+966', '+967', '+968', '+970', '+971', '+972', '+973', '+974', '+975', '+976', '+977', '+992', '+993', '+994', '+995', '+996', '+998', '+011'
];

const PersonalAccountEditPage = () => {
  const navigate = useNavigate();
  const { data, setData } = usePersonalAccount();
  const [openContact, setOpenContact] = useState(true);
  const [openAddress, setOpenAddress] = useState(true);
  const [openComm, setOpenComm] = useState(false);
  const [showSecondPhoneCodes, setShowSecondPhoneCodes] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const update = (key: keyof typeof data, value: string | boolean) => setData(prev => ({ ...prev, [key]: value }));
  const inputCls = 'w-full h-[58px] rounded-[6px] border border-[#E1DDDD] bg-white px-4 text-[18px] text-[#111] outline-none';
  const labelCls = 'text-[16px] text-[#8F8B8B] mb-3';

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
          <button onClick={() => navigate(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 p-1 text-gray-700"><ChevronLeft size={24} /></button>
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
              <div className={labelCls}>電郵</div>
              <div className="grid grid-cols-[1fr_104px] rounded-[6px] overflow-hidden border border-[#E1DDDD] bg-white">
                <input value={data.email} onChange={e => update('email', e.target.value)} className="h-[58px] px-4 text-[18px] text-[#111] outline-none" />
                <button className="bg-[#F6E6AA] text-[18px] font-medium text-[#1F1F1F]">驗證</button>
              </div>
            </div>
            <div>
              <div className={labelCls}>手機號碼</div>
              <div className="grid grid-cols-[126px_1fr_104px] gap-3">
                <div className="h-[58px] rounded-[6px] border border-[#E1DDDD] bg-white px-4 flex items-center text-[18px] text-[#111]">+852</div>
                <input value={data.mobileNumber} onChange={e => update('mobileNumber', e.target.value)} className={inputCls} />
                <button className="rounded-[6px] bg-[#F6E6AA] text-[18px] font-medium text-[#1F1F1F]">驗證</button>
              </div>
            </div>
            <div className="relative">
              <div className={labelCls}>第二電話號碼（可選填）</div>
              <div className="grid grid-cols-[126px_1fr] gap-3">
                <button onClick={() => setShowSecondPhoneCodes(v => !v)} className="h-[58px] rounded-[6px] border border-[#E3C16A] bg-white px-4 flex items-center justify-between text-[18px] text-[#B7B3B3]">
                  <span>{data.secondPhoneCountryCode || '請…'}</span><ChevronDown size={20} />
                </button>
                <input value={data.secondPhoneNumber} onChange={e => update('secondPhoneNumber', e.target.value)} className={inputCls} />
              </div>
              {showSecondPhoneCodes && (
                <div className="absolute left-0 top-[104px] z-20 w-[126px] max-h-[320px] overflow-y-auto rounded-[6px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.14)] border border-[#E7E3E3]">
                  {countryCodes.map(code => (
                    <button key={code} onClick={() => { update('secondPhoneCountryCode', code); setShowSecondPhoneCodes(false); }} className="w-full text-left px-4 py-4 text-[18px] text-[#111] border-b border-[#F1EFEF] last:border-b-0">
                      {code}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {sectionHeader('地址', openAddress, () => setOpenAddress(v => !v))}
        {openAddress && (
          <div className="bg-[#FAF9F8] px-5 py-8 border-b border-[#ECE7E1]">
            <div className="rounded-[12px] bg-[#FFF4E8] px-4 py-4 flex items-start gap-3 mb-8"><Lightbulb size={22} className="text-[#1F1F1F] mt-0.5 flex-shrink-0" /><div className="text-[16px] text-[#1F1F1F]">不接納郵政信箱。</div></div>
            <div className="text-[22px] font-semibold text-[#111] mb-6">住址</div>
            <div className="space-y-6">
              <div><div className={labelCls}>國家／地區</div><input value={data.residentialCountry} onChange={e => update('residentialCountry', e.target.value)} className={inputCls} /></div>
              <div><div className={labelCls}>城市</div><input value={data.residentialCity} onChange={e => update('residentialCity', e.target.value)} className={inputCls} /></div>
              <div><div className={labelCls}>單位／室（例如：「2室」、「A室」）</div><input value={data.residentialUnit} onChange={e => update('residentialUnit', e.target.value)} className={inputCls} /></div>
              <div><div className={labelCls}>層數（例如：「12樓」）</div><input value={data.residentialFloor} onChange={e => update('residentialFloor', e.target.value)} className={inputCls} /></div>
              <div><div className={labelCls}>座（例如：「C座」）</div><input value={data.residentialBlock} onChange={e => update('residentialBlock', e.target.value)} className={inputCls} /></div>
              <div><div className={labelCls}>大廈</div><input value={data.residentialBuilding} onChange={e => update('residentialBuilding', e.target.value)} className={inputCls} /></div>
              <div><div className={labelCls}>街道（街號及街道名稱）</div><input value={data.residentialStreet} onChange={e => update('residentialStreet', e.target.value)} className={inputCls} /></div>
              <div><div className={labelCls}>區域</div><input value={data.residentialDistrict} onChange={e => update('residentialDistrict', e.target.value)} className={inputCls} /></div>
              <div><div className={labelCls}>郵政編碼</div><input value={data.residentialPostalCode} onChange={e => update('residentialPostalCode', e.target.value)} className={inputCls} /></div>
            </div>
            <div className="text-[22px] font-semibold text-[#111] mt-10 mb-5">通訊地址</div>
            <div className="space-y-5 mb-6">
              <label className="flex items-center gap-4 text-[20px] text-[#1F1F1F]"><input type="radio" checked={data.correspondenceSameAsResidential} onChange={() => update('correspondenceSameAsResidential', true)} /><span>與住址相同</span></label>
              <label className="flex items-center gap-4 text-[20px] text-[#1F1F1F]"><input type="radio" checked={!data.correspondenceSameAsResidential} onChange={() => update('correspondenceSameAsResidential', false)} /><span>其他地址</span></label>
            </div>
            {!data.correspondenceSameAsResidential && (
              <div className="space-y-6">
                <div><div className={labelCls}>國家／地區</div><input value={data.correspondenceCountry} onChange={e => update('correspondenceCountry', e.target.value)} className={inputCls} /></div>
                <div><div className={labelCls}>城市</div><input value={data.correspondenceCity} onChange={e => update('correspondenceCity', e.target.value)} className={inputCls} /></div>
                <div><div className={labelCls}>單位／室（例如：「2室」、「A室」）</div><input value={data.correspondenceUnit} onChange={e => update('correspondenceUnit', e.target.value)} className={inputCls} /></div>
                <div><div className={labelCls}>層數（例如：「12樓」）</div><input value={data.correspondenceFloor} onChange={e => update('correspondenceFloor', e.target.value)} className={inputCls} /></div>
                <div><div className={labelCls}>座（例如：「C座」）</div><input value={data.correspondenceBlock} onChange={e => update('correspondenceBlock', e.target.value)} className={inputCls} /></div>
                <div><div className={labelCls}>大廈</div><input value={data.correspondenceBuilding} onChange={e => update('correspondenceBuilding', e.target.value)} className={inputCls} /></div>
                <div><div className={labelCls}>街道（街號及街道名稱）</div><input value={data.correspondenceStreet} onChange={e => update('correspondenceStreet', e.target.value)} className={inputCls} /></div>
                <div><div className={labelCls}>區域</div><input value={data.correspondenceDistrict} onChange={e => update('correspondenceDistrict', e.target.value)} className={inputCls} /></div>
                <div><div className={labelCls}>郵政編碼</div><input value={data.correspondencePostalCode} onChange={e => update('correspondencePostalCode', e.target.value)} className={inputCls} /></div>
              </div>
            )}
          </div>
        )}

        {sectionHeader('通訊方式', openComm, () => setOpenComm(v => !v))}
        {openComm && (
          <div className="bg-[#FAF9F8] px-5 py-8 border-b border-[#ECE7E1] space-y-6">
            <div className="text-[20px] leading-[1.7] text-[#111]">積金易平台有限公司直接促銷同意書：閣下同意積金易平台有限公司根據其收集個人資料聲明（eMPF.org.hk/pics）內的「直接促銷」部分，使用閣下的個人資料作直接促銷之用途。</div>
            <div className="flex gap-6 text-[20px]">
              <label className="flex items-center gap-3"><input type="radio" checked={data.directMarketingConsent === '是'} onChange={() => update('directMarketingConsent', '是')} />是</label>
              <label className="flex items-center gap-3"><input type="radio" checked={data.directMarketingConsent === '否'} onChange={() => update('directMarketingConsent', '否')} />否</label>
            </div>
          </div>
        )}

        <div className="fixed left-0 right-0 bottom-0 bg-[#FAF9F8] px-5 pt-4 pb-8 border-t border-[#ECE7E1]">
          <button onClick={() => navigate(-1)} className="w-full h-[58px] rounded-full bg-[#19345B] text-white text-[22px] font-semibold mb-4">儲存</button>
          <button onClick={() => navigate(-1)} className="w-full text-center text-[22px] text-[#1F1F1F]">取消</button>
        </div>
      </div>
    </div>
  );
};

export default PersonalAccountEditPage;
