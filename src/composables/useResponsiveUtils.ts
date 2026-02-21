import { useQuasar } from 'quasar';
import { computed } from 'vue';


export default function useResponsiveUtils() {
  const { screen} = useQuasar();

  const isMobile = computed(() => screen.lt.sm)

  return {
    isMobile
  }
}
