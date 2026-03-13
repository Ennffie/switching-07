import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const items = [
    { icon: './icons/profile-my-record.png', label: '我的紀錄' },
    { icon: './icons/profile-statement.png', label: '我的信件及報表' },
    { icon: './icons/profile-account-management.png', label: '帳戶管理' },
    { icon: './icons/profile-more-services.png', label: '更多服務' },
    { icon: './icons/profile-setting.png', label: '積金易帳戶設定' },
    { icon: './icons/profile-contact-us.png', label: '聯絡我們' },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'overview') {
      navigate('/');
    } else if (tabId === 'my-mpf') {
      navigate('/my-mpf');
    } else if (tabId === 'todo') {
      navigate('/todo');
    } else if (tabId === 'profile') {
      navigate('/profile');
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <div className="px-4 pt-6 pb-4 bg-[#f5f5f5]">
        <h1 className="text-[22px] font-bold text-[#E6A23C]">我的帳戶</h1>
      </div>

      <div className="px-4 pb-6 space-y-6">
        {items.map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-2xl px-6 py-7 flex items-center gap-5 shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
          >
            <img src={item.icon} alt={item.label} className="w-12 h-12 object-contain flex-shrink-0" />
            <span className="text-[17px] font-semibold text-[#1f1f1f]">{item.label}</span>
          </div>
        ))}

        <button className="w-full flex items-center justify-center gap-3 pt-1 pb-3">
          <img src="./icons/profile-logout.png" alt="登出" className="w-6 h-6 object-contain" />
          <span className="text-[17px] font-semibold text-[#1E3557]">登出</span>
        </button>
      </div>

      <div
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E5E5] flex items-end justify-around"
        style={{
          height: 'calc(64px + env(safe-area-inset-bottom, 0px))',
          paddingBottom: 'calc(8px + env(safe-area-inset-bottom, 0px))',
          paddingLeft: 'env(safe-area-inset-left, 0px)',
          paddingRight: 'env(safe-area-inset-right, 0px)'
        }}
      >
        <button onClick={() => handleTabClick('overview')} className="flex flex-col items-center justify-end" style={{ width: '64px', height: '48px' }}>
          <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={activeTab === 'overview' ? './icons/nav_overview_active.png' : './icons/nav_overview.png'} alt="帳戶概覽" style={{ width: '24px', height: '24px' }} />
          </div>
          <span className="text-xs mt-1" style={{ color: activeTab === 'overview' ? '#E67E22' : '#9CA3AF', lineHeight: '16px' }}>帳戶概覽</span>
        </button>

        <button onClick={() => handleTabClick('my-mpf')} className="flex flex-col items-center justify-end" style={{ width: '64px', height: '48px' }}>
          <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={activeTab === 'my-mpf' ? './icons/nav_mpf_active.png' : './icons/nav_mpf.png'} alt="我的強積金" style={{ width: '24px', height: '24px' }} />
          </div>
          <span className="text-xs mt-1" style={{ color: activeTab === 'my-mpf' ? '#E67E22' : '#9CA3AF', lineHeight: '16px' }}>我的強積金</span>
        </button>

        <button onClick={() => handleTabClick('todo')} className="flex flex-col items-center justify-end" style={{ width: '64px', height: '48px' }}>
          <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={activeTab === 'todo' ? './icons/nav_todo_active.png' : './icons/nav_todo.png'} alt="待辦事項" style={{ width: '24px', height: '24px' }} />
          </div>
          <span className="text-xs mt-1" style={{ color: activeTab === 'todo' ? '#E67E22' : '#9CA3AF', lineHeight: '16px' }}>待辦事項</span>
        </button>

        <button onClick={() => handleTabClick('profile')} className="flex flex-col items-center justify-end" style={{ width: '64px', height: '48px' }}>
          <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={activeTab === 'profile' ? './icons/nav_account_active.png' : './icons/nav_account.png'} alt="我的帳戶" style={{ width: '24px', height: '24px' }} />
          </div>
          <span className="text-xs mt-1" style={{ color: activeTab === 'profile' ? '#1f1f1f' : '#9CA3AF', lineHeight: '16px', fontWeight: activeTab === 'profile' ? 600 : 400 }}>我的帳戶</span>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
