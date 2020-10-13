import express, { json } from 'express'
import { getRepository } from 'typeorm'

import './database/connection';
import Orphanage from './models/Orphanage';

const app = express();

app.use(express.json());

app.post('/orphanages', async (request, response) => {
    const {
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends
    } = request.body;
    
    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = orphanagesRepository.create({
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends
    })

    await orphanagesRepository.save(orphanage);

    return response.status(201).json(orphanage);
})

app.listen(3333);