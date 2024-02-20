import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import Config from "./interfaces/Config";

console.log("Creating store")

const store = createStore({
    state () {
        return {
            config: {}
        }
    },
    mutations: {
        setConfig (state, config: Config) {
            state.config = config
        }
    }
})
console.log("Created store")

const vueApp = createApp(App)

vueApp.use(store)
console.log("app.mount('#app')")
vueApp.mount('#app')

export {
    store,
    vueApp
}
