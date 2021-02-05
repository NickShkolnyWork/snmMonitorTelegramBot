

const {Translate} = require('@google-cloud/translate').v2;



 async function transtext (text) {
    let projectId  = process.env.GOOGLE_TRANSLATE_projectId;
    // Instantiates a client

    const translate = new Translate({projectId});


    const textJ = JSON.stringify(text, null, '  ');


    // Translates some text into Russian
    const translation = await translate.translate(textJ, 'ru');

   return translation[0]



}

module.exports = transtext