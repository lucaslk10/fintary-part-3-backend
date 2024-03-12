import { App } from '@/app';
import { MatchingRoute } from '@/routes/matching.route';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

const app = new App([new MatchingRoute()]);

app.listen();
