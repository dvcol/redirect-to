/* @refresh reload */
import { render } from 'solid-js/web';

import './index.scss';
import { Route, Router } from '@solidjs/router';
import App from './pages/App.tsx';

const root = document.getElementById('root')

render(() => <Router root={App} >
	<Route path="/:id?" component={App} />
</Router>, root!)
