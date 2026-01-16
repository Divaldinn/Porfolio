import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import AOS from 'aos'
import 'aos/dist/aos.css'
import App from './App.vue'
import router from './router'
import './style.css'
import '@fortawesome/fontawesome-free/css/all.css'

// Import locales
import en from './locales/en.json'
import es from './locales/es.json'
import pt from './locales/pt.json'
import fr from './locales/fr.json'

const i18n = createI18n({
    legacy: false, // Use Composition API
    locale: navigator.language.split('-')[0] || 'en', // Detect language
    fallbackLocale: 'en',
    messages: {
        en,
        es,
        pt,
        fr
    }
})

const app = createApp(App)

app.use(router)
app.use(i18n)

AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
})

app.mount('#app')
