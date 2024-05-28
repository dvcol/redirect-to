/* @refresh reload */
import { render } from 'solid-js/web';

import './index.scss';
import { Route, Router } from '@solidjs/router';
import App from './pages/App.tsx';

const baseUrl = 'redirect-to'

const root = document.getElementById('root')

console.log('baseUrl', baseUrl, import.meta.env.PROD)

render(() => <Router base={import.meta.env.PROD ? baseUrl: undefined} >
	<Route path="/*id" component={App} />
</Router>, root!)
