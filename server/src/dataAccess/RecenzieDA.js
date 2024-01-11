import Recenzie from "../entities/Recenzie.js";
import Livrabil from "../entities/Livrabil.js";
import { getLivrabileById } from "./LivrabilDa.js";
import Studenti from "../entities/Studenti.js";

async function createRecenzie(recenzie, livrabilId, idStud){
    try{
        const liv = await getLivrabileById(livrabilId);

        if(!liv){
            console.log("livrabilul nu exista");
        }
        else if(recenzie.LivrabilID.toString() !== livrabilId.toString()){
            console.log("id livrabil diferit");
        }

        const stud = Studenti.findAll({
            where:{
                StudentID: idStud,
                esteJurat: 1,
            },
        });

        if(!stud){
            console.log("studentul nu exista sau nu este jurat");
        }
        else{
            return await Recenzie.create(recenzie); // se creeaza review doar daca este jurat
        }
    }
    catch(e){
        throw e;
    }
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

async function updateRecenzie(recenzie, idRecenzie, idStud){
    //doar un membru al juriului poate sa modifice nota
    try{
        const stud = await Studenti.findAll({
            where: {
                StudentID: idStud,
                esteJurat: 1, // verificam daca e jurat
            }
        })
        
        if(!stud){
            console.log("studentul nu exista sau nu este jurat");
        }
        else{
            const rev = await Recenzie.findByPk(idRecenzie);
            const t = await db.transaction();

            try{
                await rev.update(recenzie);

                await t.commit();
            }
            catch(e){
                t.rollback();throw e;
            }
        }
    }catch(e){
        throw e;
    }
}

export{
    createRecenzie,
    getRecenzieById,
    getRecenzieByLivrabilID,
    getReceznii,
    updateRecenzie
}
