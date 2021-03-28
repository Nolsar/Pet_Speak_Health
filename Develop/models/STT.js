const fs = require('fs');
const util = require('util');
const { struct } = require('pb-util');
// Imports the Dialogflow library
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const projectId = "core-outcome-308917";
// A unique identifier for the given session
const sessionId = uuid.v4();

// Instantiates a session client
const sessionClient = new dialogflow.SessionsClient();

async function detectIntent(
  projectId,
  sessionId
 // query,
 // contexts,
 // languageCode
) 
{
  // The path to identify the agent that owns the created intent.
 const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  )
};


// The path to identify the agent that owns the created intent.
//const sessionPath = sessionClient.projectAgentSessionPath(
//  projectId,
//  sessionId
//);

// Read the content of the audio file and send it as part of the request.
const readFile = util.promisify(fs.readFile);
const inputAudio = async () => await readFile("../public/audio.wav"); //replace with file mp3
const request = {
  session: sessionPath,
  queryInput: {
    audioConfig: {
      audioEncoding: "enum", //replace 23, 24, 25
      sampleRateHertz: 16000, //1600 hrz as recommended by documentation
      languageCode: 'en-us', //english
    },
  },
  inputAudio: inputAudio,
};

// Recognizes the speech in the audio and detects its intent.
const response = async () => await sessionClient.detectIntent(request);
console.log(response.queryResult);
console.log('Detected intent:');
const result = response.queryResult;
// Instantiates a context client
const contextClient = new dialogflow.ContextsClient();

console.log(`  Query: ${result.queryText}`);
console.log(`  Response: ${result.fulfillmentText}`);
if (result.intent) {
  console.log(`  Intent: ${result.intent.displayName}`);
} else {
  console.log('  No intent matched.');
}
const parameters = JSON.stringify(struct.decode(result.parameters));
console.log(`  Parameters: ${parameters}`);
if (result.outputContexts && result.outputContexts.length) {
  console.log('  Output contexts:');
  result.outputContexts.forEach(context => {
    const contextId = contextClient.matchContextFromProjectAgentSessionContextName(
      context.name
    );
    const contextParameters = JSON.stringify(
      struct.decode(context.parameters)
    );
    console.log(`    ${contextId}`);
    console.log(`      lifespan: ${context.lifespanCount}`);
    console.log(`      parameters: ${contextParameters}`);
  });
}