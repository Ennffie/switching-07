import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';

type Tab = 'overview' | 'details';

const PersonalAccountPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [openAssets, setOpenAssets] = useState(true);
  const [openOverview, setOpenOverview] = useState(true);
  const [openFuture, setOpenFuture] = useState(true);
  const [openContact, setOpenContact] = useState(true);
  const [openAddress, setOpenAddress] = useState(true);
  const [openComm, setOpenComm] = useState(true);
  const [showShortcuts, setShowShortcuts] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
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

      <div className="px-5 pt-8 pb-6 flex items-center gap-4">
        <img src="./icons/aia-logo-new.jpg" alt="友邦" className="w-[56px] h-[56px] object-contain" />
        <div className="flex-1 text-[20px] font-semibold text-[#1F1F1F]">友邦強積金優選計劃</div>
        <ChevronDown size={22} className="text-[#1F1F1F]" />
      </div>

      <div className="px-5 border-b border-[#E9E5E5]">
        <div className="flex">
          <button onClick={() => setActiveTab('overview')} className={`relative pb-4 pr-8 text-[18px] font-semibold ${activeTab === 'overview' ? 'text-[#E5A127]' : 'text-[#B9B4B4]'}`}>
            帳戶概覽
            {activeTab === 'overview' && <div className="absolute left-0 right-0 bottom-0 h-[4px] bg-[#F5A623] rounded-full" />}
          </button>
          <button onClick={() => setActiveTab('details')} className={`relative pb-4 pl-8 text-[18px] font-semibold ${activeTab === 'details' ? 'text-[#E5A127]' : 'text-[#B9B4B4]'}`}>
            帳戶資料
            {activeTab === 'details' && <div className="absolute left-8 right-0 bottom-0 h-[4px] bg-[#F5A623] rounded-full" />}
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="pt-6 pb-4 flex flex-col items-center border-b border-[#ECE7E1]">
            <div className="relative w-[280px] h-[280px] rounded-full border-[28px] border-[#7293B0] flex items-center justify-center">
              <div className="absolute top-[-28px] left-1/2 -translate-x-1/2 w-[10px] h-[28px] bg-[#1FB5B4] rounded-full" />
              <div className="text-center">
                <div className="text-[20px] text-[#1F1F1F] mb-2">總結餘</div>
                <div className="text-[26px] font-bold text-[#111] mb-2">$ 128,396.91</div>
                <div className="text-[20px] text-[#2BAE9A]">▲ $ 58,508.93</div>
              </div>
            </div>
            <div className="text-[18px] text-[#1F1F1F] mt-6">截至 14/03/2026</div>
          </div>

          <button onClick={() => setOpenAssets(v => !v)} className="w-full px-5 py-5 flex items-center justify-between border-b border-[#ECE7E1] text-left">
            <div className="text-[18px] text-[#1F1F1F] leading-[1.5]">我目前持有的資產（以供款類別劃分） （截至 14/03/2026）</div>
            {openAssets ? <ChevronUp size={22} className="text-[#1F1F1F] flex-shrink-0" /> : <ChevronDown size={22} className="text-[#1F1F1F] flex-shrink-0" />}
          </button>

          {openAssets && (
            <div className="border-b border-[#ECE7E1]">
              <div className="grid grid-cols-2 text-center text-[18px] bg-[#FCF3E8] border-b border-[#E8DDD0]">
                <div className="py-4 font-semibold text-[#1F1F1F] border-r border-[#E8DDD0]">市場價值</div>
                <div className="py-4 text-[#C8C2BC]">強制性供款</div>
              </div>
              <div className="grid grid-cols-[1fr_150px] bg-[#F59E0B] text-white text-[16px] font-semibold">
                <div className="px-4 py-2">基金名稱</div>
                <div className="px-4 py-2 text-right">市場價值（港幣）</div>
              </div>
              {[
                ['#F59E0B', '友邦強積金優選計劃 - 美洲基金', '$ 32,150.50'],
                ['#F59E0B', '友邦強積金優選計劃 - 北美股票基金', '$ 31,980.25'],
                ['#F59E0B', '友邦強積金優選計劃 - 增長組合', '$ 32,245.80'],
                ['#F59E0B', '友邦強積金優選計劃 - 均衡組合', '$ 32,020.36'],
              ].map(([color, name, value], idx) => (
                <div key={name} className={`grid grid-cols-[8px_1fr_150px] ${idx < 3 ? 'border-b border-[#EAE6E1]' : ''} bg-white`}>
                  <div style={{ backgroundColor: color }} />
                  <div className="px-4 py-3 text-[18px] leading-[1.5] text-[#1F1F1F]">{name}</div>
                  <div className="px-4 py-3 text-[18px] font-semibold text-right text-[#1F1F1F]">{value}</div>
                </div>
              ))}
            </div>
          )}

          <button onClick={() => setOpenOverview(v => !v)} className="w-full px-5 py-5 flex items-center justify-between border-b border-[#ECE7E1] text-left">
            <div className="text-[18px] text-[#1F1F1F]">我目前持有的資產概覽（截至 14/03/2026）</div>
            {openOverview ? <ChevronUp size={22} className="text-[#1F1F1F]" /> : <ChevronDown size={22} className="text-[#1F1F1F]" />}
          </button>

          <button onClick={() => setOpenFuture(v => !v)} className="w-full px-5 py-5 flex items-center justify-between border-b border-[#ECE7E1] text-left">
            <div className="text-[18px] text-[#1F1F1F]">投資授權（用於未來供款）</div>
            {openFuture ? <ChevronUp size={22} className="text-[#1F1F1F]" /> : <ChevronDown size={22} className="text-[#1F1F1F]" />}
          </button>
        </>
      )}


      {showShortcuts && (
        <>
          <div className="fixed inset-0 bg-black/35 z-40" onClick={() => setShowShortcuts(false)} />
          <div className="fixed left-0 right-0 bottom-0 bg-white rounded-t-[20px] px-5 pt-7 pb-20 z-50 min-h-[330px] shadow-[0_-4px_20px_rgba(0,0,0,0.12)]">
            <div className="grid grid-cols-4 gap-y-8 gap-x-2">
              {[
                { icon: './icons/shortcut-fund-switch-new.jpg', label: '基金轉換' },
                { icon: './icons/shortcut-future-invest-new.jpg', label: '未來供款的投資授權' },
                { icon: './icons/shortcut-transfer-account-new.jpg', label: '整合個人帳戶' },
                { icon: './icons/shortcut-self-employed-transfer-new.jpg', label: '轉職後 / 自僱人士帳戶轉移' },
                { icon: './icons/shortcut-statement.png', label: '信件及報表' },
                { icon: './icons/shortcut-edit.png', label: '編輯快捷連結' },
              ].map((item) => (
                <button key={item.label} className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-[#F6F7F8] flex items-center justify-center mb-2">
                    <img src={item.icon} alt={item.label} className="w-7 h-7 object-contain" />
                  </div>
                  <span className="text-[12px] leading-[1.35] text-[#1f1f1f] max-w-[78px]">{item.label}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setShowShortcuts(false)} className="absolute right-6 bottom-8 w-14 h-14 rounded-full bg-[#1e3a5f] flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.22)]">
              <img src="./icons/shortcut-close.png" alt="關閉" className="w-5 h-5 object-contain invert" />
            </button>
          </div>
        </>
      )}

      {activeTab === 'details' && (
        <div className="pb-32">
          <div className="px-5 pt-6 pb-4">
            <div className="text-[20px] font-bold text-[#1F1F1F] mb-2">友邦強積金優選計劃</div>
            <div className="text-[16px] text-[#666666] leading-[1.5]">AIA MPF - Prime Value Choice</div>
          </div>

          <div className="border-t border-b border-[#DADADA] py-4 px-5 flex items-center justify-between text-[#1F1F1F]">
            <div className="flex items-center gap-3">
              <span className="text-[#D08A17] text-[30px] leading-none">✓</span>
              <span className="text-[18px] font-medium">個人詳細資料</span>
            </div>
            <span className="text-[22px]">⌃</span>
          </div>

          <div className="px-5 py-6 space-y-8 border-b border-[#ECE7E1]">
            <div>
              <div className="text-[18px] text-[#B0ACAC] mb-2">稱謂</div>
              <div className="text-[22px] text-[#111]">先生</div>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-8">
              <div><div className="text-[18px] text-[#B0ACAC] mb-2">姓氏（英文）</div><div className="text-[22px] text-[#111]">WONG</div></div>
              <div><div className="text-[18px] text-[#B0ACAC] mb-2">名字（英文）</div><div className="text-[22px] text-[#111]">KA MING</div></div>
              <div><div className="text-[18px] text-[#B0ACAC] mb-2">姓氏（中文）</div><div className="text-[22px] text-[#111]">黃</div></div>
              <div><div className="text-[18px] text-[#B0ACAC] mb-2">名字（中文）</div><div className="text-[22px] text-[#111]">家明</div></div>
            </div>
            <div><div className="text-[18px] text-[#B0ACAC] mb-2">身份證明文件類別</div><div className="text-[22px] text-[#111]">Hong Kong身份證</div></div>
            <div><div className="text-[18px] text-[#B0ACAC] mb-2">身份證明號碼</div><div className="text-[22px] text-[#111]">ZC705414(5)</div></div>
            <div><div className="text-[18px] text-[#B0ACAC] mb-2">出生日期（日／月／年）</div><div className="text-[22px] text-[#111]">24/09/2011</div></div>
            <div><div className="text-[18px] text-[#B0ACAC] mb-2">性別</div><div className="text-[22px] text-[#111]">男性</div></div>
            <div><div className="text-[18px] text-[#B0ACAC] mb-2">出生地點</div><div className="text-[22px] text-[#111]">Hong Kong</div></div>
            <div><div className="text-[18px] text-[#B0ACAC] mb-2">國籍</div><div className="text-[22px] text-[#111]">中國</div></div>
            <div><div className="text-[18px] text-[#B0ACAC] mb-2">職位</div><div className="text-[22px] text-[#111]">行政和商業經理</div></div>
          </div>

          <button onClick={() => setOpenContact(v => !v)} className="w-full px-5 py-5 flex items-center justify-between border-b border-[#ECE7E1] text-left">
            <div className="flex items-center gap-3"><span className="text-[#D08A17] text-[30px] leading-none">✓</span><div className="text-[18px] text-[#1F1F1F]">聯絡資料</div></div>
            {openContact ? <ChevronUp size={22} className="text-[#1F1F1F]" /> : <ChevronDown size={22} className="text-[#1F1F1F]" />}
          </button>
          {openContact && (
            <div className="px-5 py-6 space-y-8 border-b border-[#ECE7E1]">
              <div><div className="text-[18px] text-[#B0ACAC] mb-2">電郵地址</div><div className="text-[22px] text-[#111]">wong.kaming89@gmail.com</div></div>
              <div><div className="text-[18px] text-[#B0ACAC] mb-2">手機號碼</div><div className="text-[22px] text-[#111]">+852 96823451</div></div>
            </div>
          )}

          <button onClick={() => setOpenAddress(v => !v)} className="w-full px-5 py-5 flex items-center justify-between border-b border-[#ECE7E1] text-left">
            <div className="flex items-center gap-3"><span className="text-[#D08A17] text-[30px] leading-none">✓</span><div className="text-[18px] text-[#1F1F1F]">地址</div></div>
            {openAddress ? <ChevronUp size={22} className="text-[#1F1F1F]" /> : <ChevronDown size={22} className="text-[#1F1F1F]" />}
          </button>
          {openAddress && (
            <div className="px-5 py-6 space-y-10 border-b border-[#ECE7E1]">
              <div>
                <div className="text-[22px] font-semibold text-[#111] mb-6">通訊地址</div>
                <div className="space-y-6">
                  <div><div className="text-[18px] text-[#B0ACAC] mb-2">國家／地區</div><div className="text-[22px] text-[#111]">Hong Kong</div></div>
                  <div><div className="text-[18px] text-[#B0ACAC] mb-2">單位／室（例如：「2室」、「A室」）</div><div className="text-[22px] text-[#111]">Flat 8</div></div>
                  <div><div className="text-[18px] text-[#B0ACAC] mb-2">層數（例如：「12樓」）</div><div className="text-[22px] text-[#111]">12/F</div></div>
                  <div><div className="text-[18px] text-[#B0ACAC] mb-2">座（例如：「C座」）</div><div className="text-[22px] text-[#111]">Block B</div></div>
                  <div><div className="text-[18px] text-[#B0ACAC] mb-2">大廈</div><div className="text-[22px] text-[#111]">Mei Hong Court, South Horizons</div></div>
                  <div><div className="text-[18px] text-[#B0ACAC] mb-2">街道（街號及街道名稱）</div><div className="text-[22px] text-[#111]">8 South Horizons Drive</div></div>
                  <div><div className="text-[18px] text-[#B0ACAC] mb-2">區域</div><div className="text-[22px] text-[#111]">Ap Lei Chau</div></div>
                </div>
              </div>
              <div>
                <div className="text-[22px] font-semibold text-[#111] mb-6">住址</div>
                <div className="space-y-6">
                  <div><div className="text-[18px] text-[#B0ACAC] mb-2">國家／地區</div><div className="text-[22px] text-[#111]">Hong Kong</div></div>
                  <div><div className="text-[18px] text-[#B0ACAC] mb-2">單位／室（例如：「2室」、「A室」）</div><div className="text-[22px] text-[#111]">Flat 8</div></div>
                  <div><div className="text-[18px] text-[#B0ACAC] mb-2">層數（例如：「12樓」）</div><div className="text-[22px] text-[#111]">12/F</div></div>
                  <div><div className="text-[18px] text-[#B0ACAC] mb-2">座（例如：「C座」）</div><div className="text-[22px] text-[#111]">Block B</div></div>
                  <div><div className="text-[18px] text-[#B0ACAC] mb-2">大廈</div><div className="text-[22px] text-[#111]">Mei Hong Court, South Horizons</div></div>
                  <div><div className="text-[18px] text-[#B0ACAC] mb-2">街道（街號及街道名稱）</div><div className="text-[22px] text-[#111]">8 South Horizons Drive</div></div>
                  <div><div className="text-[18px] text-[#B0ACAC] mb-2">區域</div><div className="text-[22px] text-[#111]">Ap Lei Chau</div></div>
                </div>
              </div>
            </div>
          )}

          <button onClick={() => setOpenComm(v => !v)} className="w-full px-5 py-5 flex items-center justify-between border-b border-[#ECE7E1] text-left">
            <div className="flex items-center gap-3"><span className="text-[#D08A17] text-[30px] leading-none">✓</span><div className="text-[18px] text-[#1F1F1F]">通訊方式</div></div>
            {openComm ? <ChevronUp size={22} className="text-[#1F1F1F]" /> : <ChevronDown size={22} className="text-[#1F1F1F]" />}
          </button>
        </div>
      )}

      <button onClick={() => setShowShortcuts(true)} className="fixed bottom-24 right-4 w-12 h-12 bg-[#1e3a5f] rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.22)] z-40">
        <svg className="w-[22px] h-[22px] text-white" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
      </button>


      {showShortcuts && (
        <>
          <div className="fixed inset-0 bg-black/35 z-40" onClick={() => setShowShortcuts(false)} />
          <div className="fixed left-0 right-0 bottom-0 bg-white rounded-t-[20px] px-5 pt-7 pb-20 z-50 min-h-[330px] shadow-[0_-4px_20px_rgba(0,0,0,0.12)]">
            <div className="grid grid-cols-4 gap-y-8 gap-x-2">
              {[
                { icon: './icons/shortcut-fund-switch-new.jpg', label: '基金轉換' },
                { icon: './icons/shortcut-future-invest-new.jpg', label: '未來供款的投資授權' },
                { icon: './icons/shortcut-transfer-account-new.jpg', label: '整合個人帳戶' },
                { icon: './icons/shortcut-self-employed-transfer-new.jpg', label: '轉職後 / 自僱人士帳戶轉移' },
                { icon: './icons/shortcut-statement.png', label: '信件及報表' },
                { icon: './icons/shortcut-edit.png', label: '編輯快捷連結' },
              ].map((item) => (
                <button key={item.label} className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-[#F6F7F8] flex items-center justify-center mb-2">
                    <img src={item.icon} alt={item.label} className="w-7 h-7 object-contain" />
                  </div>
                  <span className="text-[12px] leading-[1.35] text-[#1f1f1f] max-w-[78px]">{item.label}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setShowShortcuts(false)} className="absolute right-6 bottom-8 w-14 h-14 rounded-full bg-[#1e3a5f] flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.22)]">
              <img src="./icons/shortcut-close.png" alt="關閉" className="w-5 h-5 object-contain invert" />
            </button>
          </div>
        </>
      )}

      {activeTab === 'details' && (
        <div className="fixed left-0 right-0 bottom-0 bg-white px-5 pt-3 pb-6 border-t border-[#ECE7E1] z-[5]">
          <button className="w-full h-[58px] rounded-full bg-[#1B355C] text-white text-[22px] font-semibold flex items-center justify-center gap-3">
            <span className="text-[22px]">✎</span>
            <span>更新</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonalAccountPage;
