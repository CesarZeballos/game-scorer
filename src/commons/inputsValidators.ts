export const noValidator = () => () => true;

export const mandatory = (msg: string | null = null) => (val: string | number) => val && !!val || (msg || 'Este campo es obligatorio');
export const mandatoryWithoutMsg = () => (val: string | number) => !!val;
export const notNull = (msg: string | null = null) => (val: string) => val && !!val || (msg || 'Ingrese un valor');

export const googleMapAddressMandatory = (msg: string | null = null) => (val: { label: null, value: null }) => val && (!!val.value && !!val.label) || (msg || 'Ingrese una direccion valida');

const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const emailValidator = (msg: string | null = null) => (val: string) => val && (regexEmail.exec(val.toLowerCase()) !== null) || (msg || 'Ingrese un email valido');

export const lengthMin = (msg: string, min: number) => (val: string) => val && val.length > min || (msg || ('The value must be greater than ' + String(min)));
export const lengthMax = (msg: string, max: number) => (val: string) => val && val.length < max || (msg || ('The value must be less than ' + String(max)));

export const lengthBetween = (msg: string, min: number, max: number) => (val: string) => val && val.length > min && val.length < max || (msg || ('El valor debe ser mayor a ' + String(min) + ' y menor a ' + String(max)));

export const numberBetween = (min: number, max: number) => (val: number) => val && val >= min && val <= max || `El valor debe ser entre ${min} y ${max}`;

export const arrayNotEmpty = (msg: string | null = null) => (val: []) => val && val.length > 0 || (msg || 'Lista vacia');

const regexCarPlate = /[a-zA-Z]{2,2}[0-9]{3,3}[a-zA-Z]{2,2}|[a-zA-Z]{3,3}[0-9]{3,3}$/;
export const carPlateValidator = (msg: string | null = null) => (val: string) => val && (regexCarPlate.exec(val.toLowerCase())) || (msg || 'Formato de patente no valido');

export const fileValidator = (msg: string | null = null) => (val: File | null) => val && val.size > 0 || (msg || 'File is required');

export const samePassword = (password: string) => (val: string) => val && val === password || 'The passwords are not the same';

export const minNumber = (msg: string | null = null, min: number) => (val: number) => val && val >= min || (msg || 'The value must be greater than ' + String(min));

export const greaterThan = (msg: string | null = null, min: number) => (val: number) => val && val > min || (msg || 'The value must be greater than ' + String(min));

export const maxNumber = (msg: string | null = null, max: number) => (val: number) => val && val <= max || (msg || 'The value must be less than ' + String(max));

const regexSpaces = /^\s+$/;
export const noOnlySpaces = (msg: string | null = null) => (val: string) => val && !regexSpaces.exec(val.toLowerCase()) || (msg || 'The value must not contain only spaces');

// regex ##-#######
const regexFederalTaxId = /^[0-9]{2,2}-[0-9]{7,7}$/;
export const federalTaxIdValidator = (msg: string | null = null) => (val: string) => val && (regexFederalTaxId.exec(val.toLowerCase())) || (msg || 'The format should be ##-#######');

const regexHour24Format = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
export const hour24FormatValidator = (msg: string | null = null) => (val: string) => val && (regexHour24Format.exec(val.toLowerCase()) !== null) || (msg || 'The format should be HH:MM');

// Only check if the value is a valid date, not mandatory
export const validateDateRegex = (value: string) => {
  if (!value) return true;

  // Año (4 dígitos) / mes (01-12) / día (01-31)
  const dateRegex =
    /^(\d{4})\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/;

  if (!dateRegex.test(value)) {
    return 'Formato de fecha inválido (debe ser AAAA/MM/DD)';
  }

  return true;
};

export const validateRangeDateRegex = (value: string) => {
  if (!value) return true

  const [from, to] = value.split(' - ').map(v => v.trim())
  if (!from || !to)
    return 'Formato de rango de fechas inválido (debe ser AAAA/MM/DD - AAAA/MM/DD)'

  // Reutilizamos la validación individual
  const fromValidation = validateDateRegex(from)
  const toValidation = validateDateRegex(to)

  if (fromValidation !== true || toValidation !== true)
    return 'Formato de rango de fechas inválido (debe ser AAAA/MM/DD - AAAA/MM/DD)'

  const [y1, m1, d1] = from.split('/').map(Number)
  const [y2, m2, d2] = to.split('/').map(Number)

  if (!y1 || !m1 || !d1 || !y2 || !m2 || !d2) return 'Formato de rango de fechas inválido (debe ser AAAA/MM/DD - AAAA/MM/DD)'

  const date1 = new Date(y1, m1 - 1, d1)
  const date2 = new Date(y2, m2 - 1, d2)

  if (date1 > date2)
    return 'La fecha inicial no puede ser mayor que la final'

  return true
}



// Only check if the value is a valid cuit, not mandatory
export const cuitValidator = (message: string) => {
  return (value: string) => {
    if (!value) return true;
    const cuitRegex = /^\d{11}$/;
    if (!cuitRegex.test(value) || value.length !== 11) {
      return message;
    }
    return true;
  };
};

export const passwordValidator = (msg: string | null = null, minLength = 6) => (val: string) => {
  if (/^\s+$/.test(val) || (val.length > 0 && val.length < minLength)) {
    return msg || 'No cumple con los requisitos necesarios';
  }
  return true;
};

export const endTimeAfterStart = (
  startRef: string,
  hoursOptions: { value: string }[],
  msg: string | null = null
) => (val: string) => {
  if (!val || !startRef) return true

  const startIndex = hoursOptions.findIndex(h => h.value === startRef)
  const endIndex = hoursOptions.findIndex(h => h.value === val)

  return endIndex > startIndex || msg || 'La hora de salida debe ser posterior a la de ingreso'
}

export const futureDateRule = () => (val: string) => {
  if (!val) return true

  const [d, m, y] = val.split('/')
  const inputDate = new Date(Number(y), Number(m) - 1, Number(d))
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return inputDate > today || 'La fecha debe ser mayor a la fecha de hoy'
}

export const validateAutocompleteInput = (lat: string, lng: string) => () => {
  if (!lat || !lng) return 'Debe seleccionar una dirección valida';
  return true;
};
