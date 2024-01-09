import express from "express";
import db from "../../database.js";

let masterRoute = express.Router();

//creare tabela
masterRoute.route("/create").get(async (req, res) => {
        try{
            await db.sync({force: true});
            res.status(201).json({message: "created"});
            console.log("baza de date a fost creata");
        }
        catch(err){
            console.warn(err);
            res.status(500).json({message: "server error"});
        }
    }
)

export default masterRoute;
