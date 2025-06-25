import { ref, onMounted } from 'vue'

export function useTheme() {
  const themeIcon = ref('🌙')

  const toggleTheme = () => {
    console.log('Theme toggle clicked') // Debug log
    const currentTheme = document.documentElement.getAttribute('data-theme')
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    
    console.log('Switching from', currentTheme, 'to', newTheme) // Debug log
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
    
    themeIcon.value = newTheme === 'dark' ? '☀️' : '🌙'
  }

  const loadTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    console.log('Loading theme:', savedTheme) // Debug log
    document.documentElement.setAttribute('data-theme', savedTheme)
    themeIcon.value = savedTheme === 'dark' ? '☀️' : '🌙'
  }

  onMounted(() => {
    loadTheme()
    console.log('Theme composable mounted') // Debug log
  })

  return {
    themeIcon,
    toggleTheme
  }
}
