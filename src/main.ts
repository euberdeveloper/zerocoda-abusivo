import axios from 'axios';
import * as FormData from 'form-data';
import { Job, Queue, Worker, QueueScheduler } from 'bullmq';
import { Logger } from 'euberlog';

import CONFIG from './config';

const logger = new Logger();

async function askCodiceFiscale(ulss: string, codiceFiscale: string, lastNumTesseraSanitaria: string): Promise<void> {
    logger.info('Check codice fiscale', { ulss, codiceFiscale, lastNumTesseraSanitaria });

    const formData = new FormData();
    formData.append('cod_fiscale', codiceFiscale);
    formData.append('num_tessera', lastNumTesseraSanitaria);

    const regexp = /scegliserv\((?<sede>\d+)\)/;

    try {
        const response = await axios.post(`https://vaccinicovid.regione.veneto.it/${ulss}/azione/controllocf`, formData, {
            headers: formData.getHeaders()
        });
        const data: string = response.data;

        const matches = data.match(regexp);
        if (matches) {
            const sede = matches.groups.sede;
            logger.success('Wow, your codice fiscale is OK!!!', { sede })
            // DO WHAT YOU WANTTTTTTTTTTTTTTTTTT!!!!!!!!!!!!!!!!!!!!!
        }
        else {
            logger.warning('Your codice fiscale is not accepted')
        }
    }
    catch (error) {
        logger.error('Error in the request');
        console.error(error);
    }
}

async function main() {
    // Create bull queue
    const queue = new Queue('jobs', {
        connection: {
            host: CONFIG.REDIS_HOST,
            port: +CONFIG.REDIS_PORT
        }
    });

    // Create bull worker
    const _worker = new Worker('jobs', async (job: Job) => {
        await askCodiceFiscale(CONFIG.ULSS, CONFIG.CODICE_FISCALE, CONFIG.LAST_NUM_TESSERA_SANITARIA);
    });

    // Create bull queue scheduler
    const _queueScheduler = new QueueScheduler('jobs');

    // Add jobs with cron
    const cron = CONFIG.CRON;
    await queue.add('codiceFiscale', null, { repeat: { cron } });
}
main();