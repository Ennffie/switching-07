import { useNavigate } from 'react-router-dom';

interface BottomNavProps {
  activeTab: 'overview' | 'my-mpf' | 'todo' | 'profile';
}

const tabs = [
  { id: 'overview', label: '帳戶概覽', activeIcon: './icons/nav_overview_active.png', icon: './icons/nav_overview.png', path: '/' },
  { id: 'my-mpf', label: '我的強積金', activeIcon: './icons/nav_mpf_active.png', icon: './icons/nav_mpf.png', path: '/my-mpf' },
  { id: 'todo', label: '待辦事項', activeIcon: './icons/nav_todo_active.png', icon: './icons/nav_todo.png', path: '/todo' },
  { id: 'profile', label: '我的帳戶', activeIcon: './icons/nav_account_active.png', icon: './icons/nav_account.png', path: '/profile' },
] as const;

export default function BottomNav({ activeTab }: BottomNavProps) {
  const navigate = useNavigate();
  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#EAEAEA] flex items-end justify-around"
      style={{
        height: 'calc(64px + env(safe-area-inset-bottom, 0px))',
        paddingBottom: 'calc(8px + env(safe-area-inset-bottom, 0px))',
        paddingLeft: 'env(safe-area-inset-left, 0px)',
        paddingRight: 'env(safe-area-inset-right, 0px)'
      }}
    >
      {tabs.map((tab) => {
        const active = activeTab === tab.id;
        return (
          <button key={tab.id} onClick={() => navigate(tab.path)} className="flex flex-col items-center justify-end" style={{ width: '64px', height: '48px' }}>
            <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <img src={active ? tab.activeIcon : tab.icon} alt={tab.label} style={{ width: '24px', height: '24px' }} />
              {tab.id === 'todo' && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-7px',
                    minWidth: '16px',
                    height: '16px',
                    borderRadius: '999px',
                    background: '#F59E0B',
                    color: '#fff',
                    fontSize: '10px',
                    lineHeight: '16px',
                    fontWeight: 600,
                    textAlign: 'center',
                    padding: '0 4px'
                  }}
                >
                  2
                </span>
              )}
            </div>
            <span className="text-xs mt-1" style={{ color: active ? '#E67E22' : '#9CA3AF', lineHeight: '16px', fontWeight: active ? 500 : 400 }}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
