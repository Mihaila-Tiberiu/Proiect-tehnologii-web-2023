import Proiect from "../entities/Proiect.js";
import Studenti from "../entities/Studenti.js";
import { AliasLivrabil, AliasStudenti } from "../entities/databaseConsts.js";
import db from "../../database.js";
import Livrabil from "../entities/Livrabil.js";
import Recenzie from "../entities/Recenzie.js";

async function createProiect(proiect){
     return await Proiect.create(proiect);
}

async function getProiecte() {
    return await Proiect.findAll({
        include: [
            { model: Studenti, as: AliasStudenti },
            { model: Livrabil, as: AliasLivrabil }
        ]
    });
}

async function getProiecteById(id){
    return await Proiect.findByPk(id, {include: [AliasStudenti]});
}

async function deleteProiect(id){
    let elem = Proiect.findByPk(id);

    if(!elem){
        console.log("this element does not exist");
        return;
    }
    return await elem.destroy();
}

async function updateProiect(proiect, id){
    const proj = await getProiecteById(id);

    if(!proj){
        console.log("this elem does not exist");
        return;
    }

    const t = await db.transaction();
    try{
        await proj.update(proiect);

        const existaStudenti = await Studenti.findAll({
            where: {
                ProiectID: id,
            },
        });

        // if(existaStudenti.length > 0){
        //     let studentiIds = existaStudenti.map(a => a.dataValues.StudentID);
        //     let studentiIdsDeleted = studentiIds.filter(id => !proiect.AliasStudenti.find(add => add.StudentID === id)?.StudentID);

        //     if(studentiIdsDeleted.length > 0){
        //         await Studenti.destroy({
        //             where: {
        //                 StudentID: studentiIdsDeleted,
        //             },
        //         });
        //     }
        // }

        // const insertedS = proiect.A.filter(a => a.StudentID === 0);
        // if(insertedS.length > 0){
        //      await Studenti.bulkCreate(insertedS);
        // }

        // const updatedS = proiect.AliasStudenti.filter(a => a.StudentID !== 0);
        // if(updatedS.length > 0){
        //     for(let item of updatedS){
        //         const findS = await Studenti.findByPk(item.StudentID);
        //         await findS?.update(item);
        //     }
        // }

        await t.commit();
    }catch(e){
        await t.rollback();
        throw e;
    }
}

async function getNotaFinala(idProj){
    let livrabileIDs = Array();

    try{
        const livr = await Livrabil.findAll({
            attributes: ["LivrabilID"],
            where:
            {
                ProiectID: idProj
            }
        });

        livrabileIDs = livr.map(livrabil => livrabil.LivrabilID);

        let note = Array();

        console.log("livrabile: ", livrabileIDs);
        for(let idLiv of livrabileIDs){
            try{
                const recenzii = await Recenzie.findAll({
                    attributes: ["Nota"],
                    where:
                    {
                        LivrabilID: idLiv
                    }
                })

                recenzii.forEach(element => {
                    note.push(element.Nota);
                });

            }catch(err){
            throw err;
            }
        }
        console.log("note acordate", note);
    
        // Calculate the average of the remaining values
        const medieFinala = note.reduce((acc, val) => acc + val, 0) / note.length;
        console.log('Medie Finala:', medieFinala.toFixed(2));

        return medieFinala.toFixed(2);


    }catch(e){
        throw e;
    }

}

export {
    createProiect,
    getProiecte,
    getProiecteById,
    deleteProiect,
    updateProiect,
    getNotaFinala
}