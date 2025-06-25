import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// PrimeVue imports
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'

// PrimeIcons (only import the CSS that exists)
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(PrimeVue, {
    unstyled: true // This removes all default PrimeVue styling so our custom styles work better
})
app.component('Button', Button)

app.mount('#app')
