import { Loading, QSpinner } from 'quasar';

export default function useLoader() {
  const showFullPageLoader = (message?: string) => {
    Loading.show({
      spinner: QSpinner,
      spinnerColor: 'primary',
      spinnerSize: 50,
      message: message,
    });
  };

  const hide = () => {
    Loading.hide();
  };

  const showHideLoader = (isLoading: boolean) => {
    if (isLoading) {
      showFullPageLoader();
    } else {
      hide();
    }
  };

  return {
    showFullPageLoader,
    hide,
    showHideLoader,
  };

}
