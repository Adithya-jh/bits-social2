import DrawerNavigationPair from '../../modal/drawer/DrawerNavigationPair';
import { HeroIcon, type IconName } from '../../common/icons/HeroIcon.tsx';
import { useModal } from '../../../context/ModalProvider.tsx';
import { useUnseenNotificationIds } from '../../../hooks/mutations/useSeenNotifications';
import { useCurrentUser } from '../../../hooks/auth/useCurrentUser.tsx';

const navItems: Array<{ name: string; icon: IconName; route: string }> = [
  { name: 'Home', icon: 'HomeIcon', route: '/' },
  { name: 'Explore', icon: 'MagnifyingGlassIcon', route: '/explore' },
  { name: 'Notifications', icon: 'BellIcon', route: '/notifications' },
  { name: 'Saved', icon: 'BookmarkIcon', route: '/saved' },
  { name: 'Profile', icon: 'UserIcon', route: '/profile' },
];

export function LeftDesktopLayout() {
  const { setModalType } = useModal();
  const { data: currentUser } = useCurrentUser();
  const { data: unseenIds = [] } = useUnseenNotificationIds();

  return (
    <aside className="hidden xl:flex w-64 2xl:w-72 flex-col sticky top-0 h-screen py-6">
      <div className="flex flex-col gap-4 h-full rounded-3xl px-4 py-6 border border-white/10 bg-gradient-to-b from-white/10 via-white/5 to-white/0 backdrop-blur-2xl shadow-[0_20px_55px_rgba(0,0,0,0.45)]">
        <div className="flex items-center gap-3 px-2">
          <div className="h-11 w-11 rounded-2xl bg-white/5 flex items-center justify-center text-(--color-main)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M760-600q-57 0-99-34t-56-86H354q-11 42-41.5 72.5T240-606v251q52 14 86 56t34 99q0 66-47 113T200-40q-66 0-113-47T40-200q0-57 34-99t86-56v-251q-52-14-86-56t-34-98q0-66 47-113t113-47q56 0 98 34t56 86h251q14-52 56-86t99-34q66 0 113 47t47 113q0 66-47 113t-113 47ZM200-120q33 0 56.5-24t23.5-56q0-33-23.5-56.5T200-280q-32 0-56 23.5T120-200q0 32 24 56t56 24Zm0-560q33 0 56.5-23.5T280-760q0-33-23.5-56.5T200-840q-32 0-56 23.5T120-760q0 33 24 56.5t56 23.5ZM760-40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113T760-40Zm0-80q33 0 56.5-24t23.5-56q0-33-23.5-56.5T760-280q-33 0-56.5 23.5T680-200q0 32 23.5 56t56.5 24Zm0-560q33 0 56.5-23.5T840-760q0-33-23.5-56.5T760-840q-33 0-56.5 23.5T680-760q0 33 23.5 56.5T760-680ZM200-200Zm0-560Zm560 560Zm0-560Z" />
            </svg>
          </div>
          <div style={{ fontFamily: "'Quantico', sans-serif" }}>
            <p className="text-lg font-semibold text-white tracking-[0.08em] uppercase">
              BITS SOCIAL
            </p>
          </div>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => (
            <div className="relative" key={item.name}>
              <DrawerNavigationPair
                name={item.name}
                routePath={
                  item.name === 'Profile'
                    ? `/profile/${currentUser?.id}`
                    : item.route
                }
              >
                <HeroIcon iconName={item.icon} className="h-6 w-6" />
              </DrawerNavigationPair>

              {item.name === 'Notifications' && unseenIds.length > 0 && (
                <span className="absolute right-4 top-2 h-2 w-2 rounded-full bg-(--color-main)"></span>
              )}
            </div>
          ))}

          <div onClick={() => setModalType('changeColor')}>
            <DrawerNavigationPair name="Set Theme">
              <HeroIcon iconName="PaintBrushIcon" className="h-6 w-6" />
            </DrawerNavigationPair>
          </div>

          <DrawerNavigationPair name="Log Out">
            <HeroIcon iconName="PowerIcon" className="h-6 w-6" />
          </DrawerNavigationPair>
        </nav>

        <button
          type="button"
          onClick={() => setModalType('posting')}
          className="mt-4 flex items-center justify-center rounded-2xl bg-[color:var(--color-main)] text-black font-semibold py-3 text-base shadow-[0_10px_30px_rgba(255,107,24,0.35)]"
        >
          Create
        </button>
        {currentUser && unseenIds.length > 0 && (
          <p className="text-xs text-twitterTextAlt text-center">
            {unseenIds.length} new notification
          </p>
        )}
      </div>
    </aside>
  );
}
