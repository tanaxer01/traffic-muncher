/**
 * Welcome to Cloudflare Workers!
 *
 * This is a template for a Scheduled Worker: a Worker that can run on a
 * configurable interval:
 * https://developers.cloudflare.com/workers/platform/triggers/cron-triggers/
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Run `curl "http://localhost:8787/__scheduled?cron=*+*+*+*+*"` to see your Worker in action
 * - Run `npm run deploy` to publish your Worker
 *
 * Bind resources to your Worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { init, insert } from "./store";
import { fetch_waze } from "./waze";

interface Env {
	DB: D1Database;
}

export default {
	async fetch(req) {
		const url = new URL(req.url);
		url.pathname = '/__scheduled';
		url.searchParams.append('cron', '* * * * *');
		return new Response(`To test the scheduled handler, ensure you have used the "--test-scheduled" then try running "curl ${url.href}".`);
	},

	// The scheduled handler is invoked at the interval set in our wrangler.jsonc's
	// [[triggers]] configuration.
	async scheduled(event, env, ctx): Promise<void> {
		console.log(`trigger fired at ${event.cron}`);

		const response = await fetch_waze({
			top: -33.158247668082396,
			bottom: -33.73119253613476,
			left: -71.20239257812501,
			right: -70.10375976562501,
			env: 'row',
			types: ['alerts'],
		})

		await init(env.DB);
		await insert(env.DB, response)

		console.log(`Inserted ${response.alerts.length} alerts into the database.`);
	},
} satisfies ExportedHandler<Env>;
