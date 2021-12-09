import { RefObject, useEffect, useState } from 'react';
/**
 * useHasClickedOutside() - Returns true if the user has clicked outside of the given ref.
 */
function useHasClickedOutside(ref: RefObject<any>): boolean {
  const [hasClickedOutside, setHasClickedOutside] = useState(false);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setHasClickedOutside(true);
      }
      setHasClickedOutside(false);
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return hasClickedOutside;
}
export default useHasClickedOutside;
