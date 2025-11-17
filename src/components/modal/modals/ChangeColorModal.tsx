import type { ModalType } from '../../../types/ModalType.ts';
import ColorCircleButton from '../../common/buttons/ColorCircleButton.tsx';
import { useState } from 'react';
import type { ThemeType } from '../../../types/ThemeType.ts';
import type { BackgroundType } from '../../../types/BackgroundType.ts';
import BackgroundSetterButton from '../../common/buttons/BackgroundSetterButton.tsx';

type ChangeColorModalProps = {
  setToggle: (modalType: ModalType) => void;
};

function ChangeColorModal({ setToggle }: ChangeColorModalProps) {

  const [currentTheme, setCurrentTheme] = useState<ThemeType>(
    getComputedStyle(document.documentElement)
      .getPropertyValue('--color-main')
      .trim() as ThemeType
  );
  const [currentBackGround, setCurrentBackground] = useState<BackgroundType>(
    getComputedStyle(document.documentElement)
      .getPropertyValue('--background-main')
      .trim() as BackgroundType
  );

  function setBackground(bgType: BackgroundType) {
    document.documentElement.style.setProperty('--background-main', bgType);
    localStorage.setItem('twitterBackground', bgType);
    setCurrentBackground(bgType);
  }

  function setTheme(thType: ThemeType) {
    document.documentElement.style.setProperty('--color-main', thType);
    localStorage.setItem('twitterTheme', thType);
    setCurrentTheme(thType);
  }

  //TODO add placeholder x account

  return (
    <div className="w-full max-h-[calc(100dvh-8rem)] rounded-2xl border border-(--color-main) overflow-hidden">
      <div className="max-h-[calc(100dvh-8rem)] overflow-y-auto p-4 scrollbar-blue text-twitterText bg-(--background-main) flex flex-col items-center gap-4">
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-col gap-1">
            <p className="text-twitterTextAlt font-bold">Color</p>
            <div className="w-full flex items-center justify-around h-20 bg-twitterBorder/40 rounded-2xl">
              <ColorCircleButton
                color="var(--color-twitterBlue)"
                currentColor={currentTheme}
                setCurrentTheme={setTheme}
              />

              <ColorCircleButton
                color="var(--color-twitterRed)"
                currentColor={currentTheme}
                setCurrentTheme={setTheme}
              />

              <ColorCircleButton
                color="var(--color-twitterYellow)"
                currentColor={currentTheme}
                setCurrentTheme={setTheme}
              />

              <ColorCircleButton
                color="var(--color-twitterPurple)"
                currentColor={currentTheme}
                setCurrentTheme={setTheme}
              />

              <ColorCircleButton
                color="var(--color-twitterGreen)"
                currentColor={currentTheme}
                setCurrentTheme={setTheme}
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-1">
            <p className="text-twitterTextAlt font-bold">Theme</p>
            <div className="w-full flex gap-4 px-4 items-center justify-center h-16 bg-twitterBorder/20 rounded-2xl">
              <BackgroundSetterButton
                name="Dark"
                color="var(--color-backgroundBlack)"
                currentColor={currentBackGround}
                setCurrentBackground={setBackground}
              />

              <BackgroundSetterButton
                name="Dim"
                color="var(--color-backgroundDim)"
                currentColor={currentBackGround}
                setCurrentBackground={setBackground}
              />
            </div>
          </div>
          <div className="w-full h-fit flex justify-center items-center py-2">
            <div
              onClick={() => setToggle(null)}
              className="w-1/2 hover:cursor-pointer flex justify-center items-center border border-(--color-main) h-10 rounded-2xl font-bold text-xl"
            >
              <p>Done</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeColorModal;
