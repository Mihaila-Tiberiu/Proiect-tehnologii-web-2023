import Studenti from "../entities/Studenti.js";
import db from "../../database.js";

async function createStudent(student){
    return await Studenti.create(student);
}

async function getStudenti(){
    return await Studenti.findAll();
}

async function getStudentById(id){
    return await Studenti.findByPk(id);
}

export{
    createStudent,
    getStudentById,
    getStudenti
}