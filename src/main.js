import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// PrimeVue imports
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'

import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(PrimeVue, {
    unstyled: true 
})
app.component('Button', Button)

app.mount('#app')
