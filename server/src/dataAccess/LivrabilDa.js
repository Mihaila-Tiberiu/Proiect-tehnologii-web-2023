import db from "../../database.js";
import Livrabil from "../entities/Livrabil.js";
import Proiect from "../entities/Proiect.js";
import Recenzie from "../entities/Recenzie.js";
import Studenti from "../entities/Studenti.js";
import { AliasRecenzie, AliasStudentiJur } from "../entities/databaseConsts.js";
import { getProiecteById } from "./ProiectDA.js";

async function createLivrabil(livrabil, id){
    try{
        const proiect = await getProiecteById(id);

        if(!proiect){
            console.log("proiectul nu exista, nu se poate adauga livrabil");
            
        }
        else if(livrabil.ProiectID !== id){
            console.log("id proiect introdus diferit"); 
        }
    }catch(e){
        throw e;
    }
    return await Livrabil.create(livrabil);
}

async function getLivrabile(){
    return await Livrabil.findAll({
        include: [
            {model: Studenti, as: AliasStudentiJur},
            {model: Recenzie, as: AliasRecenzie}
        ]
    });
}

async function getLivrabileById(id) {
    return await Livrabil.findByPk(id, {
        include: [
            {model: Studenti, as: AliasStudentiJur},
            {model: Recenzie, as: AliasRecenzie}
        ]
    });
}


async function updateLivrabil(livrabil, id){
    const liv = await getLivrabileById(id);

    if(!liv){
        console.log("this deliverable does not exist");
        console.log(liv);
        return;
    }

    const t = await db.transaction();
    try{
        await liv.update(livrabil);

        await t.commit();
    }catch(e){
        await t.rollback();
        throw e;
    }
}

async function associateLivrabil(livrabilId, proiectID){
    try{
        const livrabil = await getLivrabileById(livrabilId);

        if(!livrabil){
            console.log("The deliverable with this id does not exist");
        }

        livrabil.ProiectID = proiectID;
        await livrabil.save();
    }
    catch(e){
        throw e;
    }
}

export{
    getLivrabile,
    getLivrabileById,
    updateLivrabil,
    createLivrabil,
    associateLivrabil
}