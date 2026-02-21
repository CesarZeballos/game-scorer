import { boot } from 'quasar/wrappers'
import { createPinia } from 'pinia'
import piniaPersistedState from 'pinia-plugin-persistedstate'

export default boot(({ app }) => {
  const pinia = createPinia()
  pinia.use(piniaPersistedState)
  app.use(pinia)
})
