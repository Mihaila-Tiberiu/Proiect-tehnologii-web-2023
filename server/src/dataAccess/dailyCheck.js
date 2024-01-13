import Livrabil from "../entities/Livrabil.js";
import Studenti from "../entities/Studenti.js";
import { getLivrabile } from "./LivrabilDa.js";
import { Sequelize } from "sequelize";
import { chooseJury } from "./StudentiDA.js";
import db from "../../database.js";
import Recenzie from "../entities/Recenzie.js";
import { DateTime } from 'luxon';

async function dailyDatabaseCheck(){
    //const today = new Date();
    const today = DateTime.now().setZone('Europe/Bucharest');
    //const azi = today.toISOString().split('T')[0]; //data de azi YYYY-MM-DD ex: 2024-01-11
    const azi = today.toISO().split('T')[0];

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

async function dailyJuryCheck(){
    const today = DateTime.now().setZone('Europe/Bucharest');
    const todayStr = today.toISO().split('T')[0]; // YYYY-MM-DD
    const twoDaysAgo = today.minus({ days: 2 });
    const twoDaysAgoStr = twoDaysAgo.toISO().split('T')[0]; // YYYY-MM-DD
    console.log(twoDaysAgoStr);

    try{

        //luam livrabilele care au avut deadline acum 2 zile
        const livrabileTwoDaysAgo = await Livrabil.findAll({
            where: {
              Deadline: twoDaysAgoStr,
            },
          });
          
          let livrabileIds;
          if (Array.isArray(livrabileTwoDaysAgo) && livrabileTwoDaysAgo.length > 0) {
            livrabileIds = livrabileTwoDaysAgo.map(livrabil => livrabil.LivrabilID);    //id-urile lor       
            console.log("livrabile cu deadline acum 2 zile", livrabileIds);
          } 

          //verificam daca pentru aceste livrabile exista review
          if(Array.isArray(livrabileIds) && livrabileIds.length !==0){
          for(let id of livrabileIds){
            try{
                const reviews = await Recenzie.findAll({
                    where: {
                        LivrabilID: id,
                    }
                });

                let livNotate;
                if(reviews || reviews.length !== 0){
                    livNotate = reviews.map(recenzie => recenzie.LivrabilID);
                    console.log("livrabilele notate", livNotate);
                }
    
                if(Array.isArray(livrabileIds) && livrabileIds.length !==0){
                    let livrabileFara = livrabileIds.filter(id => !livNotate.includes(id));
                    console.log("livrabilele nenotate:");
                }
                    

                if(Array.isArray(reviews) && reviews.length > 0){
                    livrabileFara = reviews.map(reviews => reviews.LivrabilID);
                }

                    //pentru id-urile livrabilelor care nu au nota si au depasit deadline-ul
                    //setam deadline azi ca sa aleaga azi alti jurati
                    for(let idLiv of livrabileFara){
                        try{
                            const livUpdate = await Livrabil.update(
                                {Deadline: todayStr},
                                {
                                    where:
                                    {
                                        LivrabilID: idLiv
                                    }
                                }
                            )

                        }catch(e){
                            throw e;
                        }
                    }

                    //luam studentii care au asociate livrabilele cu deadline-ul depasit
                    for(let idLiv of livrabileFara){
                        try{
                            const sefUpdate = await Studenti.update(
                                { esteSef: 0},
                                {
                                    where:
                                    {
                                    LivrabilID: idLiv,
                                    esteSef: 1
                                    }
                                }                         
                              )
                              
                            const studentiUpdate = await Studenti.update(
                                { esteJurat: 0, LivrabilID: null },
                                {
                                  where: {
                                    LivrabilID: idLiv,
                                    esteJurat: 1,
                                  },
                                }
                              );
                        }catch(e){
                            throw e;
                        }
                    }

            }catch(e){
                throw e;
            }
          }
        }

    }catch(e){
        throw e;
    }
}

export {
    dailyDatabaseCheck,
    dailyJuryCheck
};