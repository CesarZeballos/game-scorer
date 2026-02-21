import { computed } from "vue"

export default function useMonthOptions(startYear = 2026, startMonth = 1) {
  const jsStartMonth = Math.max(1, Math.min(12, startMonth)) - 1

  function getCurrentMonth() {
    const now = new Date()
    return `${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`
  }

  const monthOptions = computed(() => {
    const now = new Date()
    const endYear = now.getFullYear()
    const endMonth = now.getMonth()

    const options = []

    let y = startYear
    let m = jsStartMonth

    while (y < endYear || (y === endYear && m <= endMonth)) {
      const date = new Date(y, m, 1)

      options.push({
        label: date.toLocaleDateString("es-AR", {
          month: "long",
          year: "numeric"
        }),
        value: `${String(m + 1).padStart(2, "0")}/${y}`
      })

      m++
      if (m > 11) {
        m = 0
        y++
      }
    }

    return options.reverse()
  })

  return {
    monthOptions,
    getCurrentMonth
  }
}
