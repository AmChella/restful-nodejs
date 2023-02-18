const express = require("express");
const rdsRouter = express.Router();
const Mongo = require("../adapter/mongo");
const RH = require("../Util/ResponseGenerator");
const VL = require("../Util/Validator");
const Util = require("../Util/Util");

rdsRouter.post("/replications", Util.verifyToken, async (req, res) => {
    const database = new Mongo();
    try {
        const data = req.body;
        VL.validate(data, 'ReplicationPost');
        database.write(Util.preProcessData(data), "rds_information", "replication").then((id) => {
            res.json(RH.constructSuccessResponse(id, {"data": `ID is : ${id}`}));
        }).catch((err) => {
            res.status(500).json(RH.constructErrorResponse(err, {message: "request has been failed"}));
        })
    }
    catch(error) {
        if ("message" in error) {
            msg = error.message;
        }
        console.log(error);
        msg = error;
        res.status(500).json(RH.constructErrorResponse(msg));
    }
})

rdsRouter.get("/replications", Util.verifyToken, (req, res) => {
    const database = new Mongo();
    database.read('rds_information', 'replication').then((data) => {
        data = Util.filterTodaysRecord(data);
        res.json(RH.constructSuccessResponse(data));
    }).catch(err => {
        res.status(500).json(RH.constructErrorResponse(err, {message: "fetch failed"}));
    });
})

rdsRouter.get("/replications/:ipv4", Util.verifyToken, (req, res) => {
    const database = new Mongo();
    const ip = req.params.ipv4;
    database.readByColumn('rds_information', 'replication', {'ipAddress': ip}).then(data => {
        res.json(RH.constructSuccessResponse(data));
    }).catch(err => {
        res.status(500).json(RH.constructErrorResponse(err, {"message": "fetch failed"}));
    })
});


module.exports = rdsRouter;