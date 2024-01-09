import Profesori from "../entities/Profesori.js";
import db from "../../database.js";

async function createProfesor(profesor){
    return await Profesori.create(profesor);
}

async function getProfesori(){
    return await Profesori.findAll();
}

async function getProfesorById(id){
    return await Profesori.findByPk(id);
}

export{
    createProfesor,
    getProfesorById,
    getProfesori
}