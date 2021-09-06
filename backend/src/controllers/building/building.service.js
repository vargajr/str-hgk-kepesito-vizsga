/**
 * @TODO : Mongoose modellek segítségével frissitsen egy 'building' entitást az adatbázisban.
 * - el kell menteni egy új "classroom" entitást.
 * - ki kell nyeri az új "classroom" id-ját.
 * - az id-t helyezze el a megfelelő 'Building' entitás 'classrooms' listájába
 *
 * A @getAll metódus adja vissza a populált teljes "building" listát
 */

const Building = require('../../models/building.model');
const Classroom = require('../../models/classroom.model');

exports.update = async (buildingId, className) => {
    const newClassroom = new Classroom(className);
    const createdClassroom = await newClassroom.save();
    const editBuilding = await Building.findById(buildingId);
    editBuilding.classrooms.push(createdClassroom._id);
    const editedBuilding = new Building(editBuilding);
    const updatedBuilding = await editedBuilding.save();
    return updatedBuilding;
};

exports.getAll = () => Building.find().populate('classrooms');
