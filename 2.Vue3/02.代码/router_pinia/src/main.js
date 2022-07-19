import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

// new Vue({
//     router,
//      store
// })

// createApp(App)
// .use(router)
// .mount('#app')

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
