/*import './assets/main.css'*/
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@coreui/coreui/dist/css/coreui.min.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import CoreuiVue from '@coreui/vue';
import { CIcon } from '@coreui/icons-vue';
import * as icons from '@coreui/icons';
import { VueSpinnersPlugin } from 'vue3-spinners';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueSpinnersPlugin);
app.use(CoreuiVue);
app.component('CIcon', CIcon);

app.provide('icons', icons);

app.mount('#app')
