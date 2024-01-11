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

async function chooseJury(idLivrabil){
    
    const juratiPotentiali = Array(); //aici punem toti studentii care nu sunt membri la vreun proiect

    //aici ii selectam si ii punem in array
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

    const juratiAlsiIds = Array(); //aici punem id-urile celor 3 studenti care vor fi jurati
    if(juratiPotentiali.length > 3){
        const shuffledArray = [...juratiPotentiali];

        //schimbam random ordinea ca sa selectam aleator
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }

        //selectam 3 jurati
        for (let i = 0; i < 3; i++) {
            juratiAlsiIds.push(shuffledArray[i]);
        }
    }

    //pe studentii care au id-urile pentru juratii alesi le schimbam statutul in jurat
    for(let i = 0; i < 3; i++){
        try{
            const stud = await getStudentById(juratiAlsiIds.at(i));

            if(!stud){
            console.log("nu exista");
            }

            if(stud){
                stud.esteJurat = 1; //il setam ca jurat
                stud.LivrabilID = idLivrabil; //asigram juratul/seful unui livrabil
                stud.save();
                console.log("a fost ales jurat pentru acest livrabil");
            }
            
        }
        catch(e){
            throw e;
        }
    }

    //din cei 3 jurati unul este sef
    try{
        const sef = await getStudentById(juratiAlsiIds.at(0)); //il alegem ca sef pe primul jurat

        if(!sef){
            console.log("studentul nu exista");
        }
        else{
            sef.esteSef = 1; //ii setam statutul de sef
            sef.save();
        } 
    }
    catch(e){
        throw e;
    }
}

export{
    createStudent,
    getStudentById,
    getStudenti,
    associateStudent,
    chooseJury
}