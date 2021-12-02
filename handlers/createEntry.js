const connectToDatabase = require('../bin/db');
const UrlEntry = require('../models/UrlEntry');
var randomstring = require("randomstring");

const createEntry = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    await connectToDatabase();
    const url = JSON.parse(event.body).url;
    const urlEntry = await UrlEntry.create({
        url,
        code:  randomstring.generate(7).toLowerCase(),
        createdAt: new Date()
    })
    return {
        statusCode: 200,
        body: JSON.stringify(urlEntry)
      };

  };

module.exports.handler = createEntry