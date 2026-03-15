import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronDown, ChevronUp, Lightbulb, X, CheckCircle2, Search } from 'lucide-react';
import { usePersonalAccount } from '../context/PersonalAccountContext';

const countryCodes = [
  '+852', '+853', '+86', '+1', '+1-242', '+1-246', '+1-264', '+1-268', '+1-284', '+1-345', '+1-441', '+1-473', '+1-649', '+1-664', '+1-670', '+1-671', '+1-684', '+1-721', '+1-758', '+1-767', '+1-784', '+1-787', '+1-809', '+1-829', '+1-849', '+1-868', '+1-869', '+1-876',
  '+20', '+27', '+30', '+31', '+32', '+33', '+34', '+36', '+39', '+40', '+41', '+43', '+44', '+45', '+46', '+47', '+48', '+49', '+51', '+52', '+54', '+55', '+56', '+57', '+58', '+60', '+61', '+62', '+63', '+64', '+65', '+66', '+81', '+82', '+84', '+90', '+91', '+92', '+93', '+94', '+95', '+98', '+211', '+212', '+213', '+216', '+218', '+220', '+221', '+222', '+223', '+224', '+225', '+226', '+227', '+228', '+229', '+230', '+231', '+232', '+233', '+234', '+235', '+236', '+237', '+238', '+239', '+240', '+241', '+242', '+243', '+244', '+245', '+246', '+248', '+249', '+250', '+251', '+252', '+253', '+254', '+255', '+256', '+257', '+258', '+260', '+261', '+262', '+263', '+264', '+265', '+266', '+267', '+268', '+269', '+290', '+291', '+297', '+298', '+299', '+350', '+351', '+352', '+353', '+354', '+355', '+356', '+357', '+358', '+359', '+370', '+371', '+372', '+373', '+374', '+375', '+376', '+377', '+378', '+380', '+381', '+382', '+385', '+386', '+387', '+389', '+420', '+421', '+423', '+500', '+501', '+502', '+503', '+504', '+505', '+506', '+507', '+508', '+509', '+590', '+591', '+592', '+593', '+594', '+595', '+596', '+597', '+598', '+599', '+670', '+672', '+673', '+674', '+675', '+676', '+677', '+678', '+679', '+680', '+681', '+682', '+683', '+685', '+686', '+687', '+688', '+689', '+690', '+691', '+692', '+850', '+855', '+856', '+880', '+886', '+960', '+961', '+962', '+963', '+964', '+965', '+966', '+967', '+968', '+970', '+971', '+972', '+973', '+974', '+975', '+976', '+977', '+992', '+993', '+994', '+995', '+996', '+998', '+011'
];

const regionChoices = ['香港', '內地', '澳門', '台灣'];
const countryList = [
  '中國', '香港', '內地', '澳門', '台灣', '阿富汗', '奧蘭群島', '阿爾巴尼亞', '阿爾及利亞', '美屬薩摩亞', '安道爾', '安哥拉', '安圭拉', '南極洲', '安提瓜和巴布達', '阿根廷', '亞美尼亞', '阿魯巴',
  '澳洲', '奧地利', '阿塞拜疆', '巴哈馬', '巴林', '孟加拉', '巴巴多斯', '白俄羅斯', '比利時', '伯利茲', '貝寧', '百慕達', '不丹', '玻利維亞', '波士尼亞與赫塞哥維納', '博茨瓦納', '巴西', '英屬印度洋領地', '汶萊', '保加利亞', '布基納法索', '布隆迪', '柬埔寨', '喀麥隆', '加拿大', '佛得角', '開曼群島', '中非共和國', '乍得', '智利', '哥倫比亞', '科摩羅', '剛果', '哥斯達黎加', '克羅地亞', '古巴', '塞浦路斯', '捷克', '丹麥', '吉布提', '多米尼克', '多明尼加共和國', '厄瓜多爾', '埃及', '薩爾瓦多', '赤道幾內亞', '厄立特里亞', '愛沙尼亞', '史瓦帝尼', '衣索比亞', '法羅群島', '斐濟', '芬蘭', '法國', '法屬圭亞那', '法屬玻里尼西亞', '加蓬', '岡比亞', '格魯吉亞', '德國', '加納', '直布羅陀', '希臘', '格陵蘭', '格瑞那達', '瓜地洛普', '關島', '危地馬拉', '根西', '幾內亞', '幾內亞比索', '圭亞那', '海地', '洪都拉斯', '匈牙利', '冰島', '印度', '印尼', '伊朗', '伊拉克', '愛爾蘭', '以色列', '意大利', '牙買加', '日本', '澤西', '約旦', '哈薩克', '肯亞', '基里巴斯', '韓國', '科威特', '吉爾吉斯', '老撾', '拉脫維亞', '黎巴嫩', '萊索托', '利比里亞', '利比亞', '列支敦士登', '立陶宛', '盧森堡', '馬達加斯加', '馬拉威', '馬來西亞', '馬爾代夫', '馬里', '馬耳他', '馬紹爾群島', '馬提尼克', '毛里塔尼亞', '毛里求斯', '馬約特', '墨西哥', '密克羅尼西亞', '摩爾多瓦', '摩納哥', '蒙古', '黑山', '蒙特塞拉特', '摩洛哥', '莫桑比克', '緬甸', '納米比亞', '諾魯', '尼泊爾', '荷蘭', '新喀里多尼亞', '新西蘭', '尼加拉瓜', '尼日爾', '尼日利亞', '紐埃', '北馬其頓', '挪威', '阿曼', '巴基斯坦', '帕勞', '巴拿馬', '巴布亞新幾內亞', '巴拉圭', '秘魯', '菲律賓', '波蘭', '葡萄牙', '波多黎各', '卡塔爾', '羅馬尼亞', '俄羅斯', '盧旺達', '薩摩亞', '聖馬力諾', '聖多美和普林西比', '沙特阿拉伯', '塞內加爾', '塞爾維亞', '塞舌爾', '塞拉利昂', '新加坡', '斯洛伐克', '斯洛文尼亞', '所羅門群島', '索馬里', '南非', '西班牙', '斯里蘭卡', '蘇丹', '蘇里南', '瑞典', '瑞士', '敘利亞', '塔吉克', '坦桑尼亞', '泰國', '東帝汶', '多哥', '東加', '千里達及托巴哥', '突尼西亞', '土耳其', '土庫曼', '特克斯和凱科斯群島', '圖瓦盧', '烏干達', '烏克蘭', '阿拉伯聯合酋長國', '英國', '美國', '烏拉圭', '烏茲別克', '瓦努阿圖', '委內瑞拉', '越南', '英屬維京群島', '美屬維京群島', '葉門', '贊比亞', '津巴布韋', '其他'
];

const maskEmail = (email: string) => {
  const [local, domain = ''] = email.split('@');
  if (!local || !domain) return email;
  const visible = Math.min(2, local.length);
  return `${local.slice(0, visible)}${'*'.repeat(Math.max(0, local.length - visible))}@${domain}`;
};

const randomCode = () => String(Math.floor(100000 + Math.random() * 900000));

type VerifyTarget = 'email' | 'mobile' | null;

const PersonalAccountEditPage = () => {
  const navigate = useNavigate();
  const { data, setData } = usePersonalAccount();
  const [activeSection, setActiveSection] = useState<'contact' | 'address' | 'comm'>('contact');
  const [showSecondPhoneCodes, setShowSecondPhoneCodes] = useState(false);
  const [showVerifyPopup, setShowVerifyPopup] = useState(false);
  const [showVerifyFailed, setShowVerifyFailed] = useState(false);
  const [showOtpNotice, setShowOtpNotice] = useState(false);
  const [verifyTarget, setVerifyTarget] = useState<VerifyTarget>(null);
  const [verifyCode, setVerifyCode] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [resendMode, setResendMode] = useState(false);
  const [latestOtp, setLatestOtp] = useState('123456');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [regionMode, setRegionMode] = useState(true);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    if (!showCountryDropdown) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, [showCountryDropdown]);

  useEffect(() => {
    if (!showVerifyPopup) {
      setShowOtpNotice(false);
      return;
    }
    setCountdown(60);
    const t = setInterval(() => setCountdown(prev => (prev > 0 ? prev - 1 : 0)), 1000);
    let n: ReturnType<typeof setTimeout> | undefined;
    if (verifyTarget === 'mobile') n = setTimeout(() => setShowOtpNotice(true), 500);
    return () => { clearInterval(t); if (n) clearTimeout(n); };
  }, [showVerifyPopup, latestOtp, verifyTarget]);

  useEffect(() => {
    if (verifyCode.length !== 6) return;
    const timer = setTimeout(() => {
      if (verifyCode === latestOtp) {
        if (verifyTarget === 'email') update('emailVerified', true);
        if (verifyTarget === 'mobile') update('mobileVerified', true);
        setShowVerifyPopup(false);
      } else {
        setShowVerifyPopup(false);
        setResendMode(true);
        setShowVerifyFailed(true);
      }
    }, 180);
    return () => clearTimeout(timer);
  }, [verifyCode, latestOtp, verifyTarget]);

  const update = (key: keyof typeof data, value: string | boolean) => setData(prev => ({ ...prev, [key]: value }));
  const inputCls = 'w-full h-[58px] rounded-[6px] border border-[#E1DDDD] bg-white px-4 text-[18px] text-[#111] outline-none';
  const labelCls = 'text-[16px] text-[#8F8B8B] mb-3';
  const maskedEmail = useMemo(() => maskEmail(data.email), [data.email]);
  const showCityError = data.residentialCountry === '其他';
  const cityDisabled = data.residentialCountry === '香港';
  const filteredCountries = countryList.filter(item => item.includes(countrySearch));

  const openVerification = (target: VerifyTarget) => {
    setVerifyTarget(target);
    setLatestOtp(randomCode());
    setVerifyCode('');
    setResendMode(false);
    setShowVerifyFailed(false);
    setShowOtpNotice(false);
    setShowVerifyPopup(true);
  };

  const openCountryMenu = () => {
    setShowCountryDropdown(true);
    setCountrySearch('');
    setRegionMode(data.residentialCountry === '香港' || data.residentialCountry === '內地' || data.residentialCountry === '澳門' || data.residentialCountry === '台灣');
  };

  const pickRegion = (value: string) => {
    update('residentialCountry', value);
    setShowCountryDropdown(false);
    setRegionMode(false);
  };

  const pickCountry = (value: string) => {
    update('residentialCountry', value);
    setShowCountryDropdown(false);
    setRegionMode(false);
  };

  const verificationTitle = verifyTarget === 'mobile' ? '輸入短訊驗證碼' : '輸入驗證碼';
  const verificationBody = verifyTarget === 'mobile' ? `請輸入我們以短訊發送到+852 ${data.mobileNumber}的驗證碼。` : `請輸入我們以電郵發送到${maskedEmail}的驗證碼。`;
  const keyboardSource = verifyTarget === 'mobile' ? 'From Messages' : 'From Mail';

  const sectionHeader = (title: string, open: boolean, onClick: () => void) => (
    <button onClick={onClick} className="w-full bg-white px-5 py-5 flex items-center justify-between border-y border-[#ECE7E1] text-left">
      <div className="text-[18px] font-medium text-[#1F1F1F]">{title}</div>
      {open ? <ChevronUp size={22} className="text-[#1F1F1F]" /> : <ChevronDown size={22} className="text-[#1F1F1F]" />}
    </button>
  );

  const pressCode = (n: string) => { if (verifyCode.length < 6) setVerifyCode(prev => prev + n); };
  const delCode = () => setVerifyCode(prev => prev.slice(0, -1));

  return (
    <div className="min-h-screen bg-[#FAF9F8] relative overflow-x-hidden">
      {showOtpNotice && verifyTarget === 'mobile' && (
        <div className="fixed top-2 left-2 right-2 z-[70] animate-[slideDown_0.42s_ease-out]">
          <div className="rounded-[20px] bg-[#F1F1F3]/95 backdrop-blur px-4 py-3 shadow-[0_10px_24px_rgba(0,0,0,0.20)] border border-white/50">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0"><div className="w-8 h-8 rounded-full bg-[#C9D7F8] flex items-center justify-center text-[#6077B8] text-[18px]">💬</div></div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3 mb-1"><div className="text-[15px] font-semibold text-[#111]">Messages</div><div className="text-[14px] text-[#6A6A6A]">now</div></div>
                <div className="text-[15px] leading-[1.3] text-[#111] line-clamp-2">積金易平台：你的一次性密碼為 {latestOtp}。請以此一次性密碼於積金易平台進行相關交易／服務。</div>
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{`@keyframes slideDown { from { transform: translateY(-110%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>

      <div className="sticky top-0 z-20 bg-white shadow-sm">
        <div className="px-4 pt-3 pb-2 flex items-center justify-center relative">
          <button onClick={() => navigate(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 p-1 text-gray-700"><ChevronLeft size={24} /></button>
          <div className="text-center">
            <div className="text-[18px] font-semibold text-[#1F1F1F]">個人賬戶持有人賬戶</div>
            <div className="text-[14px] text-[#7C7878] mt-1">帳戶號碼：70741425</div>
          </div>
        </div>
      </div>

      <div className={showVerifyPopup || showVerifyFailed ? 'pb-[360px]' : 'pb-12'}>
        {sectionHeader('聯絡資料', activeSection === 'contact', () => setActiveSection(activeSection === 'contact' ? 'contact' : 'contact'))}
        {activeSection === 'contact' && (
          <div className="bg-[#FAF9F8] px-5 py-8 space-y-7 border-b border-[#ECE7E1]">
            <div>
              <div className={labelCls}>電郵</div>
              <div className="grid grid-cols-[1fr_104px] rounded-[6px] overflow-hidden border border-[#E1DDDD] bg-white">
                <input value={data.email} onChange={e => { update('email', e.target.value); update('emailVerified', false); }} className="h-[58px] px-4 text-[18px] text-[#111] outline-none" />
                {data.emailVerified ? <div className="bg-white flex items-center justify-center"><CheckCircle2 size={30} strokeWidth={2.1} className="text-[#E1AA2B]" /></div> : <button onClick={() => openVerification('email')} className="bg-[#F6E6AA] text-[18px] font-medium text-[#1F1F1F]">驗證</button>}
              </div>
            </div>
            <div>
              <div className={labelCls}>手機號碼</div>
              <div className="grid grid-cols-[126px_1fr_104px] gap-3">
                <div className="h-[58px] rounded-[6px] border border-[#E1DDDD] bg-white px-4 flex items-center text-[18px] text-[#111]">+852</div>
                <input value={data.mobileNumber} onChange={e => { update('mobileNumber', e.target.value); update('mobileVerified', false); }} className={inputCls} />
                {data.mobileVerified ? <div className="rounded-[6px] bg-white flex items-center justify-center"><CheckCircle2 size={30} strokeWidth={2.1} className="text-[#E1AA2B]" /></div> : <button onClick={() => openVerification('mobile')} className="rounded-[6px] bg-[#F6E6AA] text-[18px] font-medium text-[#1F1F1F]">驗證</button>}
              </div>
            </div>
            <div className="relative">
              <div className={labelCls}>第二電話號碼（可選填）</div>
              <div className="grid grid-cols-[126px_1fr] gap-3">
                <button onClick={() => setShowSecondPhoneCodes(v => !v)} className="h-[58px] rounded-[6px] border border-[#E1DDDD] bg-white px-4 flex items-center justify-between text-[18px] text-[#B7B3B3]"><span>{data.secondPhoneCountryCode || '請…'}</span><ChevronDown size={20} /></button>
                <input value={data.secondPhoneNumber} onChange={e => update('secondPhoneNumber', e.target.value)} className={inputCls} />
              </div>
              {showSecondPhoneCodes && <div className="absolute left-0 top-[104px] z-20 w-[126px] max-h-[320px] overflow-y-auto rounded-[6px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.14)] border border-[#E7E3E3]">{countryCodes.map(code => <button key={code} onClick={() => { update('secondPhoneCountryCode', code); setShowSecondPhoneCodes(false); }} className="w-full text-left px-4 py-4 text-[18px] text-[#111] border-b border-[#F1EFEF] last:border-b-0">{code}</button>)}</div>}
            </div>
          </div>
        )}

        {sectionHeader('地址', activeSection === 'address', () => setActiveSection('address'))}
        {activeSection === 'address' && (
          <div className="bg-[#FAF9F8] px-5 py-8 border-b border-[#ECE7E1]">
            <div className="rounded-[12px] bg-[#FFF4E8] px-4 py-4 flex items-start gap-3 mb-8"><Lightbulb size={22} className="text-[#1F1F1F] mt-0.5 flex-shrink-0" /><div className="text-[16px] text-[#1F1F1F]">不接納郵政信箱。</div></div>
            <div className="text-[22px] font-semibold text-[#111] mb-6">住址</div>
            <div className="space-y-6">
              <div className="relative">
                <div className={labelCls}>國家／地區</div>
                <button onClick={openCountryMenu} className="w-full h-[58px] rounded-[6px] border border-[#D8B24C] bg-white px-6 flex items-center justify-between text-[19px] text-[#111] text-left">
                  <span>{data.residentialCountry}</span><ChevronDown size={20} className="text-[#1F1F1F]" />
                </button>
                {showCountryDropdown && (
                  <>
                    <button onClick={() => setShowCountryDropdown(false)} className="fixed inset-0 z-20 bg-transparent cursor-default" aria-label="關閉國家選單" />
                    <div className="absolute left-0 right-0 top-[96px] z-30 rounded-[4px] bg-white border border-[#D9D9D9] shadow-[0_8px_20px_rgba(0,0,0,0.08)] overflow-hidden">
                      <div className="h-[56px] border-b border-[#E7E7E7] px-5 flex items-center gap-3">
                        <Search size={24} className="text-[#666]" />
                        <input value={countrySearch} onChange={e => { setCountrySearch(e.target.value); setRegionMode(false); }} className="flex-1 text-[18px] text-[#111] outline-none" />
                      </div>
                      <div className="max-h-[330px] overflow-y-auto overscroll-contain">
                        {regionMode ? (
                          <>
                            <div className="px-5 pt-3 pb-1 text-[18px] text-[#5C5C5C]">中國</div>
                            {regionChoices.map(item => (
                              <button key={item} onClick={() => pickRegion(item)} className={`w-full text-left pl-[68px] pr-8 py-4 text-[22px] leading-none ${data.residentialCountry === item ? 'bg-[#FEF7EE] text-[#111]' : 'bg-white text-[#111]'}`}>
                                {item}
                              </button>
                            ))}
                            <div className="border-t border-[#ECECEC]" />
                            {countryList.filter(item => item !== '中國' && !regionChoices.includes(item)).map(item => (
                              <button key={item} onClick={() => pickCountry(item)} className={`w-full text-left px-5 py-4 text-[22px] leading-none ${data.residentialCountry === item ? 'bg-[#FEF7EE] text-[#111]' : 'bg-white text-[#111]'}`}>
                                {item}
                              </button>
                            ))}
                          </>
                        ) : (
                          filteredCountries.filter(item => item !== '中國').map(item => (
                            <button key={item} onClick={() => pickCountry(item)} className={`w-full text-left px-5 py-4 text-[22px] leading-none ${data.residentialCountry === item ? 'bg-[#FEF7EE] text-[#111]' : 'bg-white text-[#111]'}`}>
                              {item}
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div>
                <div className={`${showCityError ? 'text-[#B3261E]' : labelCls}`}>城市</div>
                <input value={cityDisabled ? '' : data.residentialCity} disabled={cityDisabled} onChange={e => update('residentialCity', e.target.value)} className={`w-full h-[58px] rounded-[6px] border px-4 text-[18px] outline-none ${cityDisabled ? 'border-[#E1DDDD] bg-[#F3F1F1] text-[#999]' : showCityError ? 'border-[#B3261E] bg-white text-[#111]' : 'border-[#E1DDDD] bg-white text-[#111]'}`} />
                {showCityError && <div className="text-[15px] text-[#B3261E] mt-2">無效的地址格式</div>}
              </div>

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
          </div>
        )}

        {sectionHeader('通訊方式', activeSection === 'comm', () => setActiveSection('comm'))}
        {activeSection === 'comm' && (
          <div className="bg-[#FAF9F8] px-5 py-8 border-b border-[#ECE7E1] space-y-6">
            <div className="text-[20px] leading-[1.7] text-[#111]">積金易平台有限公司直接促銷同意書：閣下同意積金易平台有限公司根據其收集個人資料聲明（eMPF.org.hk/pics）內的「直接促銷」部分，使用閣下的個人資料作直接促銷之用途。</div>
            <div className="flex gap-6 text-[20px]">
              <label className="flex items-center gap-3"><input type="radio" checked={data.directMarketingConsent === '是'} onChange={() => update('directMarketingConsent', '是')} />是</label>
              <label className="flex items-center gap-3"><input type="radio" checked={data.directMarketingConsent === '否'} onChange={() => update('directMarketingConsent', '否')} />否</label>
            </div>
          </div>
        )}

        <div className="bg-[#FAF9F8] px-5 pt-10 pb-16 mt-10">
          <button onClick={() => navigate(-1)} className="w-full h-[58px] rounded-full bg-[#19345B] text-white text-[22px] font-semibold mb-4">儲存</button>
          <button onClick={() => navigate(-1)} className="w-full text-center text-[22px] text-[#1F1F1F]">取消</button>
        </div>
      </div>

      {showVerifyPopup && (
        <>
          <div className="fixed inset-0 bg-black/35 z-30" />
          <div className="fixed inset-x-0 bottom-[300px] z-40 px-5">
            <div className="bg-white rounded-[22px] shadow-[0_10px_30px_rgba(0,0,0,0.20)] px-6 pt-6 pb-7 relative">
              <button onClick={() => setShowVerifyPopup(false)} className="absolute right-5 top-5 text-[#1F1F1F]"><X size={26} /></button>
              <div className="text-center text-[24px] font-bold text-[#E6A23C] mb-5">{verificationTitle}</div>
              <div className="text-[18px] leading-[1.7] text-[#1F1F1F] mb-7">{verificationBody}</div>
              <div className="flex justify-between gap-2 mb-8">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="w-[48px] h-[58px] rounded-[6px] border border-[#D8D5D5] bg-white flex items-center justify-center text-[28px] text-[#1F1F1F]">{verifyCode[i] || (i === verifyCode.length ? '|' : '')}</div>)}</div>
              <div className="text-center">{resendMode ? (<><div className="text-[20px] text-[#1F1F1F] mb-2">未收到驗證碼？</div><button onClick={() => { setLatestOtp(randomCode()); setVerifyCode(''); setCountdown(60); setResendMode(false); setShowOtpNotice(false); if (verifyTarget === 'mobile') setTimeout(() => setShowOtpNotice(true), 500); }} className="text-[20px] text-[#1E3557] font-semibold underline">重新發送</button></>) : (<><div className="text-[20px] text-[#1F1F1F] mb-2">未收到驗證碼？</div><div className="text-[18px] text-[#B4B0B0]">可於{countdown}秒後重新發送</div></>)}</div>
            </div>
          </div>
          <div className="fixed left-0 right-0 bottom-0 z-50 bg-[#D1D5DB] border-t border-[#BFC5CD] px-[6px] pt-[6px] pb-[14px]">
            <div className="text-center text-[15px] text-[#111] py-1.5">{keyboardSource}</div>
            <button onClick={() => setVerifyCode(latestOtp)} className="w-full text-center text-[20px] font-medium text-[#111] pb-2">{latestOtp}</button>
            <div className="grid grid-cols-3 gap-[5px]">
              {[['1', ''], ['2', 'ABC'], ['3', 'DEF'], ['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO'], ['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ']].map(([n, sub]) => <button key={n} onClick={() => pressCode(n)} className="h-[58px] rounded-[6px] bg-white flex flex-col items-center justify-center shadow-[0_1px_0_rgba(0,0,0,0.16)]"><span className="text-[18px] leading-none text-black">{n}</span>{sub ? <span className="text-[9px] leading-none mt-1 tracking-[0.12em] text-black font-semibold">{sub}</span> : <span className="h-[9px] mt-1" />}</button>)}
              <div className="h-[58px]" />
              <button onClick={() => pressCode('0')} className="h-[58px] rounded-[6px] bg-white flex items-center justify-center shadow-[0_1px_0_rgba(0,0,0,0.16)]"><span className="text-[18px] leading-none text-black">0</span></button>
              <button onClick={delCode} className="h-[58px] rounded-[6px] bg-[#D1D5DB] flex items-center justify-center"><span className="inline-flex items-center justify-center w-[28px] h-[20px] border-[1.5px] border-black rounded-[6px] text-[14px] leading-none text-black">⌫</span></button>
            </div>
          </div>
        </>
      )}

      {showVerifyFailed && (
        <>
          <div className="fixed inset-0 bg-black/45 z-50" />
          <div className="fixed inset-x-0 top-[84px] z-[60] px-5">
            <div className="bg-white rounded-[24px] shadow-[0_12px_32px_rgba(0,0,0,0.28)] px-6 pt-6 pb-8 relative text-center">
              <button onClick={() => setShowVerifyFailed(false)} className="absolute right-5 top-5 text-[#1F1F1F]"><X size={26} /></button>
              <div className="flex items-center justify-center mb-5 mt-4"><img src="./icons/verify-failed-user.jpg" alt="驗證失敗" className="w-[180px] h-[180px] object-contain" /></div>
              <div className="text-[26px] font-bold text-[#E0A132] mb-3">驗證失敗。</div>
              <div className="text-[18px] text-[#1F1F1F] mb-10">無效的一次性密碼。</div>
              <button onClick={() => { setShowVerifyFailed(false); setShowVerifyPopup(true); }} className="w-full h-[58px] rounded-full bg-[#1E3B6B] text-white text-[22px] font-semibold mb-8">知道了</button>
              <div className="text-[12px] text-[#9A9595] leading-[1.35]">職員專用</div>
              <div className="text-[11px] text-[#9A9595] leading-[1.18] break-all">REG0001 FF:ACCOUNT_OVERVIEW 1e[4a96696d-4abe-4385-8f11-6f5b0ef29428 / BE:4775957ed707dbb13e87705631436a1b 20260315203810</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PersonalAccountEditPage;
