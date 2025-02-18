import { createApp } from 'vue';
import { createPinia } from 'pinia'; // Import Pinia
import './style.css';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import ApiService from './core/services/ApiService';

import 'flowbite';
import 'daisyui';
import '../node_modules/flowbite-vue/dist/index.css'
import '../node_modules/daisyui/dist/styled.css'

const app = createApp(App);
ApiService.init(app);

const pinia = createPinia();

app.use(pinia);
app.use(router);

app.mount('#app');
