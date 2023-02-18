const jwt = require("jsonwebtoken");
const ResponseGenerator = require("./ResponseGenerator");

class Util {
    static isEmpty(v) {
        if (v instanceof Array) {
            return this.isEmptyArray(v);
        }

        if (v instanceof Object) {
            return this.isEmptyObject(v);
        }

        return v.length <= 0;
    }

    static isEmptyArray(v) {
        if (v instanceof Array) {
            return v.length <= 0;
        }

        return false;
    }

    static isEmptyObject(v) {
        if (v instanceof Object) {
            return Object.keys(v).length === 0;
        }

        return false;
    }

    static upperCase(v) {
        return v.toUpperCase();
    }

    static filterTodaysRecord(data) {
        let record = [];
        data.forEach(item => {
            let dateField = new Date(item['dateTime']);
            let today = new Date();
            if (today.getUTCDate() === dateField.getUTCDate()) {
                record.push(item);
            }
        });

        return record;
    }

    static preProcessData(v) {
        let data = v;
        data['dateTime'] =  new Date(v['dateTime']).toUTCString();
        data['replicationStatus'] = (
            this.upperCase(v['slaveSqlRunning']) === 'YES' && 
            this.upperCase(v['slaveIoRunning']) === 'YES'
        ) ? 'SUCCESS': "FAILED";

        return data;
    }
    
    static createToken(obj) {
        const {email} = obj;
        const SECRET = "RPL-JWT-SIGNATURE";
        const token = jwt.sign(
            {email},
            SECRET,
            {expiresIn: '1h'}
        )

        return token;
    }

    static verifyToken(req, res, next) {
        try {
            const SECRET = "RPL-JWT-SIGNATURE";
            if (typeof(req.headers['authorization']) === "undefined") {
                throw "API key is missing";
            }
            else {
                const token = req.headers.authorization.split(' ')[1];
                jwt.verify(token, SECRET);
            }
            next();
        }
        catch(error) {
            res.status(500).json({message: "Invalid API Key", error: error});
        }
    }
}

module.exports = Util;