import { useCallback, useEffect } from 'react';

type CallbackFunction = () => void;

export function useClickOutside(ref: React.RefObject<HTMLDivElement>, callback: CallbackFunction) {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    },
    [ref, callback]
  );
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);
}
