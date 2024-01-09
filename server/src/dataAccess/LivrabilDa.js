import db from "../../database.js";
import Livrabil from "../entities/Livrabil.js";

async function createLivrabil(livrabil){
    return await Livrabil.create(livrabil);
}

async function getLivrabile(){
    return await Livrabil.findAll();
}

async function getLivrabileById(id) {
    return await Livrabil.findByPk(id);
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

export{
    getLivrabile,
    getLivrabileById,
    updateLivrabil,
    createLivrabil
}