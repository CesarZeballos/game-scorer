import {QNotifyOptions, useQuasar} from 'quasar';
import {ionWarningOutline} from '@quasar/extras/ionicons-v8';

export default function useToast() {

  const $q = useQuasar();
  const showToast = (message: string, type: 'success' | 'error' | 'warning', showIcon?: boolean) => {
    const position = 'top'
    let color = ''
    let textColor = ''
    let icon = ''

    switch (type) {
      case 'success':
        color = 'positive'
        textColor = 'white'
        icon = 'o_check_circle'
        break
      case 'error':
        color = 'negative'
        textColor = 'white'
        icon = ionWarningOutline
        break
      case 'warning':
        color = 'yellow-10'
        textColor = 'white'
        icon = ionWarningOutline
        break
      default:
        color = 'positive'
        textColor = 'positive'
        icon = 'o_check_circle'
        break
    }

    const props: QNotifyOptions = {
      message: message,
      color: color,
      textColor: textColor,
      position: position,
      icon: showIcon ? icon : '',
      classes: 'border-radius-4'
    }

    $q.notify(props);
  };

  return {
    showToast,
  };
}
