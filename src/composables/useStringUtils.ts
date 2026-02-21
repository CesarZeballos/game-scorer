import { copyToClipboard } from 'quasar'

export default function useStringUtils() {

  // Returns a wildcarded string if the string is not empty. Returns undefined otherwise
  const getWildcardString = (stringToWildcard: string | null | undefined) => {
    return stringToWildcard ? '%' + stringToWildcard + '%' : null;
  };

  const copyTextToClipboard = (text: string) => {
    return copyToClipboard(text)
  }

  function formatCuit(cuit: string) {
    return `${cuit.slice(0, 2)}-${cuit.slice(2, 10)}-${cuit.slice(10)}`
  }

  return {
    getWildcardString,
    copyTextToClipboard,
    formatCuit,
  };
}
