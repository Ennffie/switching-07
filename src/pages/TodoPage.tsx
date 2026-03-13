import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TodoPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('todo');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <div className="px-4 pt-6 pb-4 flex items-center justify-between bg-[#f5f5f5]">
        <h1 className="text-[22px] font-bold text-[#E6A23C]">待辦事項</h1>
        <button className="w-8 h-8 flex items-center justify-center">
          <img src="./icons/icon-filter.png" alt="篩選" className="w-6 h-6 object-contain" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-24" style={{ marginTop: '-40px' }}>
        <img
          src="./icons/todo-empty-state.jpg"
          alt="沒有待辦事項"
          className="w-[88px] h-[88px] object-contain mb-5 opacity-70"
        />
        <h2 className="text-[18px] font-bold text-[#1f1f1f] mb-2">沒有待辦事項</h2>
        <p className="text-[16px] text-[#B8B8B8] text-center">你未有待辦事項。</p>
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
        <button
          onClick={() => handleTabClick('overview')}
          className="flex flex-col items-center justify-end"
          style={{ width: '64px', height: '48px' }}
        >
          <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={activeTab === 'overview' ? './icons/nav_overview_active.png' : './icons/nav_overview.png'}
              alt="帳戶概覽"
              style={{ width: '24px', height: '24px' }}
            />
          </div>
          <span className="text-xs mt-1" style={{ color: activeTab === 'overview' ? '#E67E22' : '#9CA3AF', lineHeight: '16px' }}>
            帳戶概覽
          </span>
        </button>

        <button
          onClick={() => handleTabClick('my-mpf')}
          className="flex flex-col items-center justify-end"
          style={{ width: '64px', height: '48px' }}
        >
          <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={activeTab === 'my-mpf' ? './icons/nav_mpf_active.png' : './icons/nav_mpf.png'}
              alt="我的強積金"
              style={{ width: '24px', height: '24px' }}
            />
          </div>
          <span className="text-xs mt-1" style={{ color: activeTab === 'my-mpf' ? '#E67E22' : '#9CA3AF', lineHeight: '16px' }}>
            我的強積金
          </span>
        </button>

        <button
          onClick={() => handleTabClick('todo')}
          className="flex flex-col items-center justify-end"
          style={{ width: '64px', height: '48px' }}
        >
          <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={activeTab === 'todo' ? './icons/nav_todo_active.png' : './icons/nav_todo.png'}
              alt="待辦事項"
              style={{ width: '24px', height: '24px' }}
            />
          </div>
          <span className="text-xs mt-1" style={{ color: activeTab === 'todo' ? '#1f1f1f' : '#9CA3AF', lineHeight: '16px', fontWeight: activeTab === 'todo' ? 600 : 400 }}>
            待辦事項
          </span>
        </button>

        <button
          onClick={() => handleTabClick('profile')}
          className="flex flex-col items-center justify-end"
          style={{ width: '64px', height: '48px' }}
        >
          <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={activeTab === 'profile' ? './icons/nav_account_active.png' : './icons/nav_account.png'}
              alt="我的帳戶"
              style={{ width: '24px', height: '24px' }}
            />
          </div>
          <span className="text-xs mt-1" style={{ color: activeTab === 'profile' ? '#E67E22' : '#9CA3AF', lineHeight: '16px' }}>
            我的帳戶
          </span>
        </button>
      </div>
    </div>
  );
};

export default TodoPage;
