import { boot } from 'quasar/wrappers';
import { SafeArea } from 'capacitor-plugin-safe-area';

export default boot(async () => {
  // Función para obtener y aplicar los insets
  const updateSafeAreaInsets = async () => {
    try {
      const { insets } = await SafeArea.getSafeAreaInsets();

      // Aplicar como variables CSS globales
      document.documentElement.style.setProperty('--safe-area-top', `${insets.top}px`);
      document.documentElement.style.setProperty('--safe-area-bottom', `${insets.bottom}px`);
      document.documentElement.style.setProperty('--safe-area-left', `${insets.left}px`);
      document.documentElement.style.setProperty('--safe-area-right', `${insets.right}px`);

      console.log('Safe area insets actualizados:', insets);
    } catch (error) {
      console.error('Error al obtener safe area insets:', error);
    }
  };

  // Actualizar al inicio
  await updateSafeAreaInsets();

  // Actualizar en cambios de orientación
  window.addEventListener('resize', () => {
    void updateSafeAreaInsets();
  });
});
