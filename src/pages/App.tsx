import { createSignal, onMount, Show } from 'solid-js';
import solidLogo from '~/assets/solid.svg';
import viteLogo from '/vite.svg';
import './App.scss';
import { useParams, useSearchParams } from '@solidjs/router';

const externalUrlRegex = /[^/]+:\/\/.*/;

function App() {


	const [search] = useSearchParams();
	const params = useParams();

	const [url, setUrl] = createSignal<string>('');

	onMount(() => {
		const { to, ...otherParams } = search;
		const { id } = params;
		const redirect = id ?? to;
		if (!redirect) {
			console.warn('No redirection found.', { search: { ...search }, params: { ...params } });
			return;
		}

		const decodedRedirect = decodeURIComponent(redirect);


		if (!externalUrlRegex.test(decodedRedirect)) {
			console.warn('Invalid redirection URL. Only external url are supported', { decodedRedirect });
			return;
		}

		setUrl(decodedRedirect + (Object.keys(otherParams)?.length ? `?${ new URLSearchParams(otherParams as Record<string, string>).toString() }` : ''));

		console.info('Redirecting to', {
			url: url(),
			search
		});
		window.location.replace(url());
	});

	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={ viteLogo } class="logo" alt="Vite logo" />
				</a>
				<a href="https://solidjs.com" target="_blank">
					<img src={ solidLogo } class="logo solid" alt="Solid logo" />
				</a>
			</div>
			<h1>Vite + Solid</h1>
			<div class="card">
				<Show when={ url() }>
					<button onClick={ () => window.location.replace(url()) }>
						CLick here to navigate to your page
					</button>
				</Show>
			</div>
			<p class="read-the-docs">
				Click on the Vite and Solid logos to learn more
			</p>
		</>
	);
}

export default App;
