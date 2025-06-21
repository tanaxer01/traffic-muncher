import { WorkflowEntrypoint, WorkflowStep, WorkflowEvent } from 'cloudflare:workers';
import { fetch_waze } from './waze';
import { group_by_cell } from './processing';

type Env = { MY_WORKFLOW: Workflow };
type Params = { metadata: Record<string, string> };

export class MyWorkflow extends WorkflowEntrypoint<Env, Params> {
	// Define a run() method
	async run(event: WorkflowEvent<Params>, step: WorkflowStep) {
		// Define one or more steps that optionally return state.
		let alerts = await step.do('my first step', async () => {
			const response = await fetch_waze({
				top: -33.43908751546753,
				bottom: -33.450152612298204,
				left: -70.65675616264345,
				right: -70.63628554344179,
				env: 'row',
				types: ['alerts'],
			});

			return response.alerts;
		});

		let groups = await step.do('my second step', async () => {
			const groups = group_by_cell(alerts, 13);
			return Object.entries(groups);
		});

		return groups;
	}
}

export default {
	async fetch(req: Request, env: Env): Promise<Response> {
		let url = new URL(req.url);

		if (url.pathname.startsWith('/favicon')) {
			return Response.json({}, { status: 404 });
		}

		// Get the status of an existing instance, if provided
		// GET /?instanceId=<id here>
		let id = url.searchParams.get('instanceId');
		if (id) {
			let instance = await env.MY_WORKFLOW.get(id);
			return Response.json({
				status: await instance.status(),
			});
		}

		// Spawn a new instance and return the ID and status
		let instance = await env.MY_WORKFLOW.create();
		// You can also set the ID to match an ID in your own system
		// and pass an optional payload to the Workflow
		// let instance = await env.MY_WORKFLOW.create({
		// 	id: 'id-from-your-system',
		// 	params: { payload: 'to send' },
		// });
		return Response.json({
			id: instance.id,
			details: await instance.status(),
		});
	},
};
