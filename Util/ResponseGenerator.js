const Util = require("./Util");

class ResponseGenerator extends Util {
    static response = {
        message: "request success",
        data: [],
        error: null,
        success: true
    };

    static constructSuccessResponse = (data, optional) => {
        let res = {...this.response};
        if (typeof(optional) === "undefined") {
            optional = {};
        }
        
        if (super.isEmpty(data) === false) {
            res.data = data;
        }
    
        if (super.isEmpty(data) === true) {
            res.message = "No record found";
        }
    
        if (super.isEmpty(optional) === true) {
            return res;
        }
    
        Object.keys(optional).forEach(key => {
            res[key] = optional[key];
        });
    
        return res;
    }
    
    static constructErrorResponse = (error, optional) => {
        let res = {...this.response};
        if (typeof(optional) === "undefined") {
            optional = {};
        }

        res.message = "request failed";
    
        if (super.isEmpty(error) === false) {
            res.error = error;
        }
    
        res.success = false;
    
        if (super.isEmpty(optional) === true) {
            return res;
        }
    
        Object.keys(optional).forEach(key => {
            res[key] = optional[key];
        });

        return res;
    }
}

module.exports = ResponseGenerator;