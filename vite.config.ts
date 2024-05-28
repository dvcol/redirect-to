import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import { fileURLToPath } from 'node:url';

const baseUrl = 'redirect-to';

export default defineConfig(({ command, isPreview }) => ({
	plugins: [solid()],
	resolve: {
		alias: {
			'~': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	base: (command === 'build') || isPreview ? baseUrl : undefined,
	preview: {
		open: true
	},
	server: {
		open: true
	}
}));
