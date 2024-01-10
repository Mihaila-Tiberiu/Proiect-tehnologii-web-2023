import Studenti from "../entities/Studenti.js";
import db from "../../database.js";
import isOperator from "./Operators.js";

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

async function chooseJury(idProj){
    const juratiPotentiali = Array();

    try{
        const juratiP = await Studenti.findAll({
            attributes: ["StudentID"],
            where:{
                esteJurat: 0,
                ProiectID: null,
            },
            raw: true,
        });

        const juryMemberIds = juratiP.map(student => student.StudentID);
        juratiPotentiali.push(...juryMemberIds);
    }
    catch(e){
        throw e;
    }

    const juratiAlsiIds = Array();
    if(juratiPotentiali.length > 3){
        const shuffledArray = [...juratiPotentiali];

        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }

        for (let i = 0; i < 3; i++) {
            juratiAlsiIds.push(shuffledArray[i]);
        }
    }

    for(let i = 0; i < 3; i++){
        try{
            const stud = await getStudentById(juratiAlsiIds.at(i));

            if(!stud){
            console.log("nu exista");
            }

            if(stud){
                stud.esteJurat = 1;
                stud.ProiectID = idProj;
                stud.save();
            }
            
        }
        catch(e){
            throw e;
        }
    }
}

export{
    createStudent,
    getStudentById,
    getStudenti,
    associateStudent,
    chooseJury
}