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

async function associateStudent(studId, projId){
    try{
        const stud = await getStudentById(studId);
        if(!stud){
            console.log("The student with this id does not exist");
        }

        stud.ProiectID = projId;
            await stud.save();
    }
    catch(e){
        throw e;
    }
}

export{
    createStudent,
    getStudentById,
    getStudenti,
    associateStudent
}