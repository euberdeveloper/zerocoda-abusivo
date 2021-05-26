import * as dotenv from 'dotenv';
import * as path from 'path';

declare const process: {
    env: Record<string, string>;
    cwd: () => string;
};

dotenv.config({
    path: path.join(process.cwd(), '.env')
});


const CONFIG = {
    ULSS: process.env.ULSS,
    CODICE_FISCALE: process.env.CODICE_FISCALE,
    LAST_NUM_TESSERA_SANITARIA: process.env.LAST_NUM_TESSERA_SANITARIA,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    CRON: process.env.CRON,
};

export default CONFIG;
