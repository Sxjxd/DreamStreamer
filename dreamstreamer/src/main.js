import './assets/main.css'
import FontAwesomeIcon from './fontAwesome';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import awsConfig from '../aws-config.js';
import {Amplify} from 'aws-amplify';

Amplify.configure(awsConfig);


const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(createPinia())
app.use(router)

app.mount('#app')

