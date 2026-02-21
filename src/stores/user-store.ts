// import {defineStore} from 'pinia';
// import {
//   CustomAppToken,
//   LoginErrorResponse,
//   LoginParams,
//   LoginResponse,
//   UserStoreModel
// } from 'stores/models/userStoreModels';
// import {computed, ref} from 'vue';
// import useToast from 'src/composables/useToast';
// import {resetWsOptions} from 'boot/apollo';
// import axios, {AxiosResponse} from 'axios';
// import Environment from 'src/environment';
// import {jwtDecode} from 'jwt-decode';
// import {DEFAULT_ROUTE_BY_ROLE, Profiles} from "src/commons/roles";
// import {useQuasar} from "quasar";
//
// export const useUserStore = defineStore('userStore', () => {
//   const {showToast} = useToast();
//   const {platform} = useQuasar();
//
//   const actualUser = ref<UserStoreModel | null>(null);
//
//   const expiredToken = computed<boolean>(() => {
//     if (actualUser.value === null) return true;
//     if (actualUser.value?.exp === undefined) return true;
//
//     const now = Date.now() / 1000;
//     return now > actualUser.value.exp;
//   })
//
//   const isLogged = computed<boolean>(() => {
//     return actualUser.value !== null;
//   })
//
//   const getToken = computed<string>(() => {
//     if (actualUser.value === null) return '';
//     return actualUser.value?.token;
//   })
//
//   function parseTokenAndLoadUser(auth: LoginResponse) {
//     const decodeToken: CustomAppToken = jwtDecode(auth.access_token || '')
//     const refreshToken: string = auth.refresh_token;
//     const user_id: string = decodeToken.user_id;
//     const exp: number = decodeToken.exp;
//     const entity_id: string | null = decodeToken.entity_id;
//     const roles: string[] = decodeToken.scope;
//     const profile: string = decodeToken['https://hasura.io/jwt/claims']['x-hasura-default-role'];
//
//     actualUser.value = {
//       user_id,
//       roles,
//       token: auth.access_token,
//       refreshToken,
//       exp,
//       entity_id,
//       profile,
//     };
//
//     resetWsOptions();
//   }
//
//   async function login(params: LoginParams): Promise<void> {
//     try {
//       let sourceLogin = 'BACKOFFICE'
//       if (platform.is.mobile) sourceLogin = 'FRONTOFFICE'
//
//       const rsp: AxiosResponse<LoginResponse> =
//         await axios.post(
//           Environment.CORE_URL + `/login?sourceLogin=${sourceLogin}`,
//           params
//         )
//
//       parseTokenAndLoadUser(rsp.data)
//
//     } catch (error: unknown) {
//       console.log(error)
//       if (axios.isAxiosError<LoginErrorResponse>(error)) {
//         const message = error.response?.data.message
//
//         if (message === 'USER_AUTH_METHOD_NOT_FOUND') {
//           showToast('Este email pertenece a una cuenta activa en otra plataforma.', 'error', true)
//         } else {
//           showToast(
//             'Usuario o contraseña incorrectos. Por favor, vuelva a intentarlo.',
//             'error',
//             true
//           )
//         }
//       } else {
//         showToast(
//           'Error inesperado. Intente nuevamente.',
//           'error',
//           true
//         )
//       }
//
//       throw error
//     }
//   }
//
//
//   async function refreshToken() {
//     return new Promise((resolve, reject) => {
//       const refreshToken = actualUser.value?.refreshToken;
//       if (!refreshToken) {
//         reject(new Error('No refresh token'))
//         return
//       }
//
//     const refreshData = {
//       refresh_token: actualUser.value?.refreshToken,
//       grant_type: 'refresh_token',
//     }
//
//     axios.post(Environment.CORE_URL + '/oauth/access_token', refreshData)
//       .then((rsp: AxiosResponse<LoginResponse>) => {
//         parseTokenAndLoadUser(rsp.data);
//         resolve(true)
//       })
//       .catch((err) => {
//         showToast(
//           'Error al mantener la sesión activa',
//           'error',
//           true
//         );
//         logout();
//         reject(err instanceof Error ? err : new Error(String(err)))
//       })
//     })
//   }
//
//   function logout() {
//     actualUser.value = null;
//     resetWsOptions();
//     window.location.href = '/auth/auth';
//   }
//
//   function containRoles(rolesToCheck: string[] | undefined): boolean {
//     if (!rolesToCheck) return true;
//     if (!actualUser.value?.roles) return false;
//
//     return rolesToCheck.some((role) => actualUser.value?.roles?.includes(role));
//   }
//
//   function checkProfile(profileToCheck: string[]): boolean {
//     if (!actualUser.value) return false
//     return profileToCheck.includes(actualUser.value.profile)
//   }
//
//   function getDefaultRouteName(): string {
//     if (!isLogged.value) return 'login'
//
//     return DEFAULT_ROUTE_BY_ROLE[actualUser.value?.profile as Profiles]
//   }
//
//   return {
//     user: actualUser,
//     login,
//     expiredToken,
//     logout,
//     refreshToken,
//     isLogged,
//     containRoles,
//     getToken,
//     getDefaultRouteName,
//     checkProfile,
//   }
// },{
//   persist: {
//     storage: localStorage,
//   },
// });
