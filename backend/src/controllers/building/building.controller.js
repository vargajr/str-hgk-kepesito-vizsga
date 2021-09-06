/**
 * @TODO : controller elkészítése, mely kapcsolódik a megfelelő service osztályhoz
 *
 * Kezelje a http-error üzeneteket:
 * - hiányos értékek @update műveletkor: BadREquest => 'Missing field'
 * - ha valamiért nem tudta a server frissíteni a building entitást:
 *  InternalServerError => 'Could not updated building'
 *
 * A szerver a megfelelő válaszokat küldje el a kliens felé
 */

const createError = require('http-errors');
const service = require('./building.service');
const Model = require('../../models/building.model');
const Classroom = require('../../models/classroom.model')


exports.updateBuilding = (req, res, next) => {
    const classroom = req.body;
    if (!classroom) {
        return next(new createError.BadRequest('Missing classroom field'));
    }
    const validationErrors = new Classroom(req.body).validateSync();
    if (validationErrors) {
        return next(
            new createError.BadRequest(validationErrors)
        );
    }

    return service.update(req.params.id, req.body)
    .then(entity => {
        res.json(entity);
    })
    .catch(err => {
        console.log(err);
        next(new createError.InternalServerError('Could not updated building'));
    });
}


exports.getAllBuildingWithClassrooms = (req, res, next) => {
    return service.getAll()
        .then(list => {
            res.json(list);
        })
        .catch (err => new createError.InternalServerError('The list could not be downloaded'));
};
