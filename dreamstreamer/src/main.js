import './assets/main.css'
import FontAwesomeIcon from './fontAwesome';
import cognitoConfig from '../cognitoConfig.js';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {Amplify} from 'aws-amplify';

Amplify.configure(cognitoConfig);


const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(createPinia())
app.use(router)

app.mount('#app')

