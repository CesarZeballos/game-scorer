import {ionWarningOutline} from '@quasar/extras/ionicons-v8';

export interface DictionaryModel {
  code: string | boolean;
  bgColor: string;
  textColor: string;
  label: string;
  iconColor?: string;
  icon?: string;
}

export default function useDictionary() {

  function getInspectionStatus(status: string): DictionaryModel {
    switch (status) {
      case 'NEW':
        return {
          code: 'NEW',
          bgColor: 'light-blue-1',
          textColor: 'light-blue-9',
          label: 'Nueva',
        };
      case 'NO_RESPONSE':
        return {
          code: 'NO_RESPONSE',
          bgColor: 'deep-orange-1',
          textColor: 'deep-orange-7',
          label: 'Sin respuesta',
        };
      case 'VERIFICATION':
        return {
          code: 'VERIFICATION',
          bgColor: 'pink-1',
          textColor: 'pink-5',
          label: 'En Verificación',
        };
      case 'COMPLETE':
        return {
          code: 'COMPLETE',
          bgColor: 'teal-1',
          textColor: 'teal-8',
          label: 'Completada',
        };
      case 'LIQUIDATION':
        return {
          code: 'LIQUIDATION',
          bgColor: 'blue-grey-1',
          textColor: 'blue-grey-7',
          label: 'Liquidación',
        };
      case 'COLLECTION':
        return {
          code: 'COLLECTION',
          bgColor: 'indigo-1',
          textColor: 'indigo-9',
          label: 'Gestión de cobranza',
        };
      case 'FINISHED':
        return {
          code: 'FINISHED',
          bgColor: 'grey-1',
          textColor: 'grey-7',
          label: 'Finalizada',
        };
      case 'PENDING':
        return {
          code: 'PENDING',
          bgColor: 'transparent',
          textColor: 'light-blue-9',
          label: 'Pendiente',
        };
      case 'PAID':
        return {
          code: 'PAID',
          bgColor: 'transparent',
          textColor: 'positive',
          label: 'Abonada',
        };
      case 'EXPIRED':
        return {
          code: 'EXPIRED',
          bgColor: 'transparent',
          textColor: 'negative',
          label: 'Vencida',
        };
      default:
        return {
          code: 'NEW',
          bgColor: 'light-blue-1',
          textColor: 'light-blue-9',
          label: 'Nueva',
        };
    }
  }

  function getConditionStatus(status: boolean): DictionaryModel {
    if (status) return {
      code: true,
      bgColor: 'transparent',
      textColor: 'positive',
      label: 'Activo',
      iconColor: 'positive',
      icon: 'check_circle'
    };
    else return {
      code: false,
      bgColor: 'transparent',
      textColor: 'negative',
      label: 'Inactivo',
      iconColor: 'negative',
      icon: ionWarningOutline
    }
  }

  function getRoleStatus(role: string): DictionaryModel {
    switch (role) {
      case 'INSPECTOR':
        return {
          code: 'INSPECTOR',
          bgColor: 'pink-1',
          textColor: 'pink-10',
          label: 'Inspector de campo',
        };
      case 'ADMINISTRATOR':
        return {
          code: 'ADMINISTRATOR',
          bgColor: 'purple-1',
          textColor: 'purple-10',
          label: 'Administrador',
        };
      case 'READ_ONLY':
        return {
          code: 'READ_ONLY',
          bgColor: 'cyan-1',
          textColor: 'cyan-10',
          label: 'Solo lectura',
        };
      default:
        return {
          code: false,
          bgColor: 'cyan-1',
          textColor: 'cyan-10',
          label: 'Solo lectura',
        };
    }

  }

  return {
    getInspectionStatus,
    getConditionStatus,
    getRoleStatus,
  }
}
