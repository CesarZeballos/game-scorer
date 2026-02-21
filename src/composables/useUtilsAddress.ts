
export default function useUtilsAddress() {
  function formatAddress(
    streetName: string | null,
    streetNumber: string | null,
    city: string | null,
    hasNullAddress: boolean,
  ): string {
    if (!streetName?.trim()) {
      if (hasNullAddress) return '-';
      else return ' '
    }

    let address = streetName.trim();

    if (streetNumber?.trim()) {
      address += ` ${streetNumber.trim()}`;
    }

    if (city?.trim()) {
      address += `, ${city.trim()}`;
    }

    return address;
  }

  return {
    formatAddress,
  }
}
