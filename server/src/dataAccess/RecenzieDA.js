import Recenzie from "../entities/Recenzie.js";

async function createRecenzie(recenzie){
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
