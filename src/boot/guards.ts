// import { boot } from 'quasar/wrappers';
// import { NavigationGuardNext, RouteLocationNormalizedLoadedGeneric, RouteMeta } from 'vue-router';
// import {useUserStore} from 'stores/user-store';
// import {storeToRefs} from 'pinia';
// import { Platform } from 'quasar';
//
//
// interface AppRouteMeta extends RouteMeta {
//   requiredProfiles?: string[];
//   platform?: 'desktop' | 'app';
// }
//
// const publicPages = new Set<string>(['/auth/login']);
//
//
// function getCurrentPlatform(): 'desktop' | 'app' {
//   return Platform.is.mobile ? 'app' : 'desktop'
//   // return {Platform.is.capacitor || Platform.is.nativeMobile} ? 'app' : 'desktop' todo: al momento de finalizar la app cambiar esto
// }
//
// // "async" is optional;
// // more info on params: https://v2.quasar.dev/quasar-cli/boot-files
// export default boot( ({ router }) => {
//   router.beforeEach(
//     (
//       to: RouteLocationNormalizedLoadedGeneric,
//       from: RouteLocationNormalizedLoadedGeneric,
//       next: NavigationGuardNext
//     ): void => {
//     const userStore = useUserStore();
//     const {isLogged} = storeToRefs(userStore);
//     const {checkProfile} = userStore;
//
//     const authRequired = !publicPages.has(to.path);
//     const loggedIn: boolean = isLogged.value;
//     const defaultRoute = userStore.getDefaultRouteName();
//
//     console.log(`Navigating to ${to.path}, authRequired: ${authRequired}, loggedIn: ${loggedIn}`);
//
//     // If not logged in and not in public page, redirect to login page
//     if (authRequired && !loggedIn) {
//       return next({name: 'login'});
//     }
//
//     // If logged in and trying to access login page, redirect to dashboard
//     if (loggedIn && to.name === 'login') {
//       return next({name: defaultRoute});
//     }
//
//     const meta: AppRouteMeta = to.meta;
//     const { requiredProfiles, platform } = meta
//
//     if (requiredProfiles && !checkProfile(requiredProfiles)) {
//       return next({ name: defaultRoute });
//     }
//
//     if (platform) {
//       const currentPlatform = getCurrentPlatform();
//
//       if (platform !== currentPlatform) {
//         return next({ name: 'wrongPlatform' });
//       }
//     }
//
//     return next();
//
//   });
// });
