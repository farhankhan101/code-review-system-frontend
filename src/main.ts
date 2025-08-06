import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import router from '@/router/index';
import ApiService from './core/services/ApiService';

import 'flowbite';
import 'daisyui';
import '../node_modules/flowbite-vue/dist/index.css'
import '../node_modules/daisyui/dist/styled.css'

const app = createApp(App);

// ✅ Properly initialize ApiService
ApiService.init(app, router);

const pinia = createPinia();

app.use(pinia);
app.use(router); // ✅ This must receive the router instance

app.mount('#app');
