import Recenzie from "../entities/Recenzie.js";
import Livrabil from "../entities/Livrabil.js";
import { getLivrabileById } from "./LivrabilDa.js";

async function createRecenzie(recenzie, livrabilId){
    try{
        const liv = await getLivrabileById(livrabilId);

        if(!liv){
            console.log("livrabilul nu exista");
        }
        else if(recenzie.LivrabilID !== livrabilId){
            console.log("id livrabil diferit")
        }
    }
    catch(e){
        throw e;
    }
    return await Recenzie.create(recenzie);
}

async function getReceznii(){
    return await Recenzie.findAll();
}

async function getRecenzieById(id){
    return await Recenzie.findByPk(id);
}

async function getRecenzieByLivrabilID(id) {
    return await Recenzie.findAll({
        where: {
            LivrabilID: id,
        },
    });
}

export{
    createRecenzie,
    getRecenzieById,
    getRecenzieByLivrabilID,
    getReceznii
}
