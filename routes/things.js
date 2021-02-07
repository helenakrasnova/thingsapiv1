const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const ThingService = require('../services/thingsService')

const api = Router();

const service = new ThingService();

api.get('/', asyncHandler(async (req, res) => {
    const result = await service.getAll();

    res.send(result);
}));

api.get('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;

    const result = await service.getById(id);
    if (result) {
        res.send(result);
    } else {
        res.sendStatus(404);
    }

}));


api.post('/', asyncHandler(async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.sendStatus(400);
    }

    const result = await service.create(body);

    res.status(201).send(result);
}));

api.put('/:id', asyncHandler(async (req, res) => {
    const body = req.body;
    const { id } = req.params;

    if (!body || !id) {
        return res.sendStatus(400);
    }

    const result = await service.update(body, id);

    res.sendStatus(result ? 200 : 404);
}));

api.delete('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.sendStatus(400);
    }

    const result = await service.delete(id);

    res.sendStatus(result ? 204 : 404);
}));

module.exports = api;