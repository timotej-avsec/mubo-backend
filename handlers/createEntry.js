const connectToDatabase = require('../bin/db');
const UrlEntry = require('../models/UrlEntry');
let randomstring = require("randomstring");
let Validator = require('validatorjs');

const createEntry = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    let validation = new Validator(JSON.parse(event.body), {
        url: "required|url"
    });

    if(validation.fails()){
        return {
            statusCode: 422,
            body: JSON.stringify({
                errors: validation.errors.get("url")
            })
        }
    }

    await connectToDatabase();
    const url = JSON.parse(event.body).url;
    const urlEntry = await UrlEntry.create({
        url,
        code: randomstring.generate(7).toLowerCase(),
        createdAt: new Date()
    })
    return {
        statusCode: 200,
        body: JSON.stringify(urlEntry)
      };

  };

module.exports.handler = createEntry