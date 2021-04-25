import React, { useEffect, useRef } from 'react';

type Props = {
  children: React.ReactChild[] | React.ReactChild;
  active: boolean;
  onClose: () => void;
};

const Modal = ({ children, active, onClose }: Props): React.ReactElement => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, onClose);
  return (
    <>
      <div
        className={`${
          active
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        } grid place-items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none transition-all duration-500`}
      >
        <div
          ref={ref}
          className={`transform ${
            active ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          } my-6 mx-auto max-w-3xl transition-all duration-500`}
        >
          <div className="flex flex-col w-full p-6 bg-white border-0 shadow-xl outline-none rounded-xl focus:outline-none">
            {children}
          </div>
        </div>
      </div>
      <div
        className={`${
          active
            ? 'opacity-25 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        } fixed inset-0 z-40 bg-black transition-all duration-500`}
        role="presentation"
      />
    </>
  );
};

// Hook
const useOnClickOutside = (
  ref: React.RefObject<HTMLDivElement>,
  handler: (event: MouseEvent | TouchEvent) => void,
): void => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent): void => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref?.current || ref?.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return (): void => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export default Modal;
