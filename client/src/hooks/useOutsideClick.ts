import { useEffect } from 'react';

const useOutsideClick = (ref: React.RefObject<HTMLElement>, cb: () => any) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      cb();
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, cb]);
};

export default useOutsideClick;