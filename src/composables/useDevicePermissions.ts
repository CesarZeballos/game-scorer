export type PermissionState = 'granted' | 'denied' | 'prompt'

export interface DevicePermissions {
  geolocation: PermissionState
  microphone: PermissionState
}

export function useDevicePermissions() {

  // =========================
  // GEOLOCATION
  // =========================

  async function checkGeolocationPermission(): Promise<PermissionState> {
    try {
      if (!('permissions' in navigator)) return 'prompt'

      const result = await navigator.permissions.query({
        name: 'geolocation' as PermissionName
      })

      return result.state as PermissionState
    } catch {
      return 'prompt'
    }
  }

  async function requestGeolocationPermission(): Promise<PermissionState> {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        () => resolve('granted'),
        () => resolve('denied')
      )
    })
  }

  // =========================
  // MICROPHONE
  // =========================

  async function checkMicrophonePermission(): Promise<PermissionState> {
    try {
      if (!('permissions' in navigator)) return 'prompt'

      const result = await navigator.permissions.query({
        name: 'microphone' as PermissionName
      })

      return result.state as PermissionState
    } catch {
      return 'prompt'
    }
  }

  async function requestMicrophonePermission(): Promise<PermissionState> {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
      return 'granted'
    } catch {
      return 'denied'
    }
  }

  // =========================
  // CHECK TODOS
  // =========================

  async function checkPermissions(): Promise<boolean> {
    const geolocation = await checkGeolocationPermission()
    const microphone = await checkMicrophonePermission()

    return geolocation === 'granted' && microphone === 'granted'
  }
  // =========================
  // REQUEST TODOS (para la page)
  // =========================

  async function requestPermissions(): Promise<DevicePermissions> {
    // 1️⃣ Chequear estados actuales
    let geo = await checkGeolocationPermission()
    let mic = await checkMicrophonePermission()

    // 2️⃣ Pedir SOLO si está en prompt
    if (geo === 'prompt') {
      geo = await requestGeolocationPermission()
    }

    if (mic === 'prompt') {
      mic = await requestMicrophonePermission()
    }

    // 3️⃣ Devolver estados finales
    return {
      geolocation: geo,
      microphone: mic
    }
  }

  return {
    checkGeolocationPermission,
    requestGeolocationPermission,
    checkMicrophonePermission,
    requestMicrophonePermission,
    checkPermissions,
    requestPermissions
  }
}
