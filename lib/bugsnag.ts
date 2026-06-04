import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';

const BUGSNAG_API_KEY = 'e4a70696332b1057b208a2514c41b815';

let started = false;

export function startBugsnag() {
  if (started || typeof window === 'undefined') return;
  started = true;
  Bugsnag.start({
    apiKey: BUGSNAG_API_KEY,
    plugins: [new BugsnagPluginReact()],
    enabledReleaseStages: ['production'],
    releaseStage: process.env.NODE_ENV,
  });
}

export { Bugsnag };
