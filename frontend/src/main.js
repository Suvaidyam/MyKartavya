import './index.css'

import { createApp ,reactive} from 'vue'
import router from './router'
import App from './App.vue'
import { session } from './data/session'
import FeatherIcon from 'feather-icons'
import Auth from './libs/controllers/auth'
import call from './libs/controllers/call'
import VOtpInput from "vue3-otp-input";
import {formatDate}  from './libs/utils';

import {
  Button,
  Card,
  Input,
  setConfig,
  frappeRequest,
  resourcesPlugin,
} from 'frappe-ui'

let app = createApp(App)
const auth = reactive(new Auth());
setConfig('resourceFetcher', frappeRequest)

app.use(router)
app.use(resourcesPlugin)
app.use(FeatherIcon)
app.provide('session', session)
app.provide('call', call)
app.provide('auth', auth)
app.component('Button', Button)
app.component('Card', Card)
app.component('Input', Input)
app.component('v-otp-input', VOtpInput)
app.provide("formatDate",formatDate);

app.mount('#app')
