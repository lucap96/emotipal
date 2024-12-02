import { useMemo } from 'react';

/**
 * Returns a boolean value indicating whether the 'isp' parameter in the URL search query is equal to 1.
 *
 * @return {boolean} true if 'isp' parameter is 1, false otherwise
 */

export function useIspValue() {
  const ispValue = useMemo(() => {
    const value: string = window.location.search;
    const params = new URLSearchParams(value);
    const isp = params.get('isp');
    return isp !== null && parseInt(isp) === 1;
  }, []);

  return ispValue;
}
