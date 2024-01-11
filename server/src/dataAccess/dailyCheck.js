import Livrabil from "../entities/Livrabil.js";
import Studenti from "../entities/Studenti.js";
import { getLivrabile } from "./LivrabilDa.js";
import { Sequelize } from "sequelize";
import { chooseJury } from "./StudentiDA.js";
import db from "../../database.js";

async function dailyDatabaseCheck(){
    const today = new Date();
    const azi = today.toISOString().split('T')[0]; //data de azi YYYY-MM-DD ex: 2024-01-11

    //ia toate livrabilele care au deadline azi
    try{
        const livrabileAzi = await Livrabil.findAll({
            where:{
                Deadline: azi,
            }
        });

        let livrabileIds;
        if(livrabileAzi){
            livrabileIds = livrabileAzi.map(livrabil => livrabil.LivrabilID);
        }
        else{
            console.log("niciun livrabil nu are deadline azi");
        }
        
        if(livrabileIds){
            for(let idLiv of livrabileIds){
                try{
                    const dejaJurat = await Studenti.findAll({
                        where:{
                            LivrabilID: idLiv,
                        }
                    })

                    if(dejaJurat && dejaJurat.length > 0){
                        console.log("au fost deja alesi jurati")
                    }
                    else{
                        chooseJury(idLiv); //pentru fiecare livrabil care expira azi, pasam id-ul lui ca parametru ca sa ii alegem jurati
                    }
                }
                catch(er){
                    throw er;
                }
            }
        }
    }
    catch(e){
        throw e;
    }
}

export default dailyDatabaseCheck;