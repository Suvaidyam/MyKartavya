import './index.css'

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { session } from './data/session'
import FeatherIcon from 'feather-icons'

import {
  Button,
  Card,
  Input,
  setConfig,
  frappeRequest,
  resourcesPlugin,
} from 'frappe-ui'

let app = createApp(App)

setConfig('resourceFetcher', frappeRequest)

app.use(router)
app.use(resourcesPlugin)
app.use(FeatherIcon)
app.provide('session', session)
app.component('Button', Button)
app.component('Card', Card)
app.component('Input', Input)

app.mount('#app')
