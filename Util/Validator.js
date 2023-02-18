const SchemaValidator = require("ajv");
const addFormats = require("ajv-formats");
class Validator {
    static Schemas = {
        "ReplicationPost": {
            type: "object",
            properties: {
                ipAddress: {
                    type: "string", 
                    format: "ipv4"
                },
                slaveSqlRunning: {
                    type: "string"
                },
                slaveIoRunning: {
                    type: "string"
                },
                nameOfServer: {
                    type: "string"
                },
                dateTime: {
                    type: "string", 
                    format: "date-time"
                },
                error: {
                    type: "string"
                }
            }
        }
    };

    static validate = (data, key) => {
        if (this.Schemas.hasOwnProperty(key) === false) {
            throw `the schema ${key} is not found`;
        }
        const schema = new SchemaValidator();
        addFormats(schema);
        const valid = schema.validate(this.Schemas[key], data);
        if (!valid) {
            throw schema.errors;
        }
    }
}

module.exports = Validator;