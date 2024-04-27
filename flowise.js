const express = require("express");
const CallApi = require("engage-call-api-js-server-sdk/lib");
const bodyParser = require('body-parser');
const axios = require('axios');

class transferClass {
  constructor(CallSessionId, TransferToAgent, AgentPhone, ConversationHistoryUrl) {
      this.CallSessionId = CallSessionId;
      this.TransferToAgent = TransferToAgent;
      this.AgentPhone = AgentPhone;
      this.ConversationHistoryUrl = ConversationHistoryUrl;
  }
}

const app = express();
const AC_ID = "AC-b88210a0-db4a-4546-835c-f2a3728e3c2a";


app.use(
  express.urlencoded({
    extended: true,
  })
);
// parse application/json
app.use(bodyParser.json());

//API configuration
CallApi.OpenAPI.HEADERS = {
  apikey:"eyJ4NXQiOiJZamd5TW1GalkyRXpNVEZtWTJNMU9HRmtaalV3TnpnMVpEVmhZVGRtTnpkaU9HUmhNR1kzWmc9PSIsImtpZCI6ImFwaV9rZXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJyYWRpc3lzQGNhcmJvbi5zdXBlciIsImFwcGxpY2F0aW9uIjp7Im93bmVyIjoicmFkaXN5cyIsInRpZXJRdW90YVR5cGUiOm51bGwsInRpZXIiOiJVbmxpbWl0ZWQiLCJuYW1lIjoiYXNob2stZXNtcC5jb20iLCJpZCI6OCwidXVpZCI6IjZkNTgzZWZlLThlNmItNGEwYy1hM2E5LTMyOWFhMzkzNDJmMiJ9LCJpc3MiOiJodHRwczpcL1wvYXBpbS5lbmdhZ2VkaWdpdGFsLmFpOjQ0M1wvb2F1dGgyXC90b2tlbiIsInRpZXJJbmZvIjp7IlVubGltaXRlZCI6eyJ0aWVyUXVvdGFUeXBlIjoicmVxdWVzdENvdW50Iiwic3RvcE9uUXVvdGFSZWFjaCI6dHJ1ZSwic3Bpa2VBcnJlc3RMaW1pdCI6MCwic3Bpa2VBcnJlc3RVbml0IjpudWxsfX0sImtleXR5cGUiOiJQUk9EVUNUSU9OIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiU2VydmljZUFQSVByb2R1Y3QiLCJjb250ZXh0IjoiXC9hcGkiLCJwdWJsaXNoZXIiOiJyYWRpc3lzIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IlVubGltaXRlZCJ9LHsic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJDYWxsQVBJUHJvZHVjdCIsImNvbnRleHQiOiJcL2FwaVwvdjEiLCJwdWJsaXNoZXIiOiJyYWRpc3lzIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IlVubGltaXRlZCJ9XSwiaWF0IjoxNjk3MTE3Mjg0LCJqdGkiOiJhNDA0MjJiNC1kNGZkLTQ2NjMtOGRjOC00OThiNjI5ZjNhODUifQ==.IzQ0Gv7GMi1HPTAoUADgSYoIPAwh3dx1oYTA_EH5ClpLCE3P1zT9TnDn9bsDNKEfmuLldGwECko-HrYA0QgOlmrfmRZk0uHo3n9XkaVKnAH4J3TJJL4sejdag68fgnXjU9GCYKEkmS3evoUE6jlwrho7CVMa98bEAkXyRiBDxVagP9dP8czRxAqfjGSdMra3pJ2XBSfjW2um69N_NjKn8dYszoH--aD1H0VtaJGmhA0-pyYHzjWg2QHIv0-3aHsdbm62hQ9Ht4Df1AU5--OMw3UfzmMfoIQv7wTkir1Yisgd6AiNN4xFXFj1X23ieBBDV3Pc24xG6_j58raeErYXFQ=="
};

const headers = {
  'Content-Type':'application/json',
  'apikey':"eyJ4NXQiOiJZamd5TW1GalkyRXpNVEZtWTJNMU9HRmtaalV3TnpnMVpEVmhZVGRtTnpkaU9HUmhNR1kzWmc9PSIsImtpZCI6ImFwaV9rZXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJyYWRpc3lzQGNhcmJvbi5zdXBlciIsImFwcGxpY2F0aW9uIjp7Im93bmVyIjoicmFkaXN5cyIsInRpZXJRdW90YVR5cGUiOm51bGwsInRpZXIiOiJVbmxpbWl0ZWQiLCJuYW1lIjoiYXNob2stZXNtcC5jb20iLCJpZCI6OCwidXVpZCI6IjZkNTgzZWZlLThlNmItNGEwYy1hM2E5LTMyOWFhMzkzNDJmMiJ9LCJpc3MiOiJodHRwczpcL1wvYXBpbS5lbmdhZ2VkaWdpdGFsLmFpOjQ0M1wvb2F1dGgyXC90b2tlbiIsInRpZXJJbmZvIjp7IlVubGltaXRlZCI6eyJ0aWVyUXVvdGFUeXBlIjoicmVxdWVzdENvdW50Iiwic3RvcE9uUXVvdGFSZWFjaCI6dHJ1ZSwic3Bpa2VBcnJlc3RMaW1pdCI6MCwic3Bpa2VBcnJlc3RVbml0IjpudWxsfX0sImtleXR5cGUiOiJQUk9EVUNUSU9OIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiU2VydmljZUFQSVByb2R1Y3QiLCJjb250ZXh0IjoiXC9hcGkiLCJwdWJsaXNoZXIiOiJyYWRpc3lzIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IlVubGltaXRlZCJ9LHsic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJDYWxsQVBJUHJvZHVjdCIsImNvbnRleHQiOiJcL2FwaVwvdjEiLCJwdWJsaXNoZXIiOiJyYWRpc3lzIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IlVubGltaXRlZCJ9XSwiaWF0IjoxNjk3MTE3Mjg0LCJqdGkiOiJhNDA0MjJiNC1kNGZkLTQ2NjMtOGRjOC00OThiNjI5ZjNhODUifQ==.IzQ0Gv7GMi1HPTAoUADgSYoIPAwh3dx1oYTA_EH5ClpLCE3P1zT9TnDn9bsDNKEfmuLldGwECko-HrYA0QgOlmrfmRZk0uHo3n9XkaVKnAH4J3TJJL4sejdag68fgnXjU9GCYKEkmS3evoUE6jlwrho7CVMa98bEAkXyRiBDxVagP9dP8czRxAqfjGSdMra3pJ2XBSfjW2um69N_NjKn8dYszoH--aD1H0VtaJGmhA0-pyYHzjWg2QHIv0-3aHsdbm62hQ9Ht4Df1AU5--OMw3UfzmMfoIQv7wTkir1Yisgd6AiNN4xFXFj1X23ieBBDV3Pc24xG6_j58raeErYXFQ=="
};

CallApi.OpenAPI.BASE = "https://apigateway.engagedigital.ai/api/v1";
//CallApi.OpenAPI.BASE="https://webhook.site/5e546339-c026-435c-b925-230dd00d1111";

var qs = require("qs");

var publicIp = "localhost"
var port = 3300;


app.listen(port, () => {
  console.log("Node server is running at http://" + publicIp + ':'+ port);
});

function fetchUserInputEML(req, res, next) {
  const myUrl = "http://" + publicIp + ":" + port + "/gatherAction";

  return (
    '<?xml version="1.0" encoding="UTF-8"?><Response><Say> Welcome to Engage Digital Platform ! </Say><Say> Please wait while I connect you to Bot </Say><Dial><Client>sip:123@rsys-test.sip.twilio.com</Client></Dial></Response>'
  );
}

//***************************************** */

//Initial EML Fetch Handler

//***************************************************** */

//This is default GET method handler

app.get("/", function (req, res) {
  console.log("Printing parameters received for / (GET) ", req.query);

  // set response header

  res.status = 200;

  res.header("Content-Type", "text/xml");

  // set response content

  res.send(fetchUserInputEML());
});

// This is GET path

app.get("/eml", function (req, res) {
  console.log("Printing parameters received for /eml (GET) ", req.query);

  // set response header

  res.status = 200;

  res.header("Content-Type", "text/xml");

  // set response content

  res.send(fetchUserInputEML());
});

// This is POST method handler

app.post("/eml", function (req, res) {
  console.log("Printing parameters received for /eml (POST) ", req.body);

  // set response header

  res.status = 200;

  res.header("Content-Type", "text/xml");

  // set response content

  res.send(fetchUserInputEML());
});

//This is default GET method handler

app.get("/", function (req, res) {
  console.log("Printing parameters received for / (GET) ", req.query);

  // set response header

  res.status = 200;

  res.header("Content-Type", "text/xml");

  // set response content

  res.send("<?xml version='1.0' encoding='UTF-8'?><Response>Hello World !</Response>");
});

// This is Transfer callback handler

app.post("/transfer-status", function (req, res) {
    const transferObj = new transferClass(req.body.CallSessionId, req.body.TransferToAgent, req.body.AgentPhone, req.body.ConversationHistoryUrl);

    //console.log(transferObj);
  
    res.status = 200;
    res.header("Content-Type", "text/xml");
    res.send(
      '<?xml version="1.0" encoding="UTF-8"?> <Response><Say> Thank you I received input </Say></Response>'
    );
    
    //Handle Call Transfer request
      handleCallTransfer(transferObj);
});

//Flowise API handler
app.post("/flowise", function (req, res) {

  flowiseAPI(req, res);



});


async function flowiseAPI(req, res) {
    var response;
    const url = "http://172.26.0.145:3000/api/v1/prediction/fcc8c46c-8a80-4f4c-96af-700ed13afb29"
    console.log(req.body);

    try {
          response =  sendHttpRequest('post', url, headers, req.body)
          console.log(JSONstrinfiy(response.data));
      } catch(error) {
        console.error(error);
    } 

    res.status = 200;
    res.header("Content-Type", "text/xml");
    res.send(
      '<?xml version="1.0" encoding="UTF-8"?> <Response><Say> Thank you I received input </Say></Response>'
    );

};

// Call UPDATE API
async function transferCallEngageUpdateAPI(from, to, transferObj) {

  // Object for transferring call to an Agent
  const data_transfer = {
    From: from,
    To: to,
    Eml:'<?xml version="1.0" encoding="UTF-8"?><Response><Say> Please wait while I connect you to an Agent ! </Say><Dial><Client>sip:agent@sipaz1.engageio.com</Client></Dial></Response>'
      //Eml: "<?xml version='1.0' encoding='UTF-8'?><Response><Say>This is Demo. Hello how are you?</Say></Response>",
  }

  // Object for call disconnection
  const data_hangup = {
    From: from,
    To: to,
    Status:'Terminated'
  }

  var data = data_hangup;

  // Check whether need transfer to Agent
  if (transferObj.TransferToAgent)
    data = data_transfer;

  url = CallApi.OpenAPI.BASE + "/accounts/"+AC_ID+"/call/" + transferObj.CallSessionId;

  try {
        const response = await sendHttpRequest('post', url, CallApi.OpenAPI.HEADERS, data)
        return response.data;
    } catch(error) {
      console.error(error);
  }

}

//Get Call Record (CDR) by CR-Id
async function getCallRecordById(crid) {

    url = CallApi.OpenAPI.BASE + "/accounts/"+AC_ID+"/call/" + crid
    try {
          const response = await sendHttpRequest('get', url, CallApi.OpenAPI.HEADERS, '')
          return response.data;
      } catch(error) {
        console.error(error);
    }
}

async function sendHttpRequest(method, url, headers, data) {
  try {
    //console.log("HTTP send request input (try): "+  method + ' ' + url + ' ' + headers +' ' + data);
    const response = await axios({
        method: method,
        url: url,
        data: data,
        headers: headers
        //headers: { 'Content-Type': 'application/json', 'apikey':"eyJ4NXQiOiJZamd5TW1GalkyRXpNVEZtWTJNMU9HRmtaalV3TnpnMVpEVmhZVGRtTnpkaU9HUmhNR1kzWmc9PSIsImtpZCI6ImFwaV9rZXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJyYWRpc3lzQGNhcmJvbi5zdXBlciIsImFwcGxpY2F0aW9uIjp7Im93bmVyIjoicmFkaXN5cyIsInRpZXJRdW90YVR5cGUiOm51bGwsInRpZXIiOiJVbmxpbWl0ZWQiLCJuYW1lIjoiYXNob2stZXNtcC5jb20iLCJpZCI6OCwidXVpZCI6IjZkNTgzZWZlLThlNmItNGEwYy1hM2E5LTMyOWFhMzkzNDJmMiJ9LCJpc3MiOiJodHRwczpcL1wvYXBpbS5lbmdhZ2VkaWdpdGFsLmFpOjQ0M1wvb2F1dGgyXC90b2tlbiIsInRpZXJJbmZvIjp7IlVubGltaXRlZCI6eyJ0aWVyUXVvdGFUeXBlIjoicmVxdWVzdENvdW50Iiwic3RvcE9uUXVvdGFSZWFjaCI6dHJ1ZSwic3Bpa2VBcnJlc3RMaW1pdCI6MCwic3Bpa2VBcnJlc3RVbml0IjpudWxsfX0sImtleXR5cGUiOiJQUk9EVUNUSU9OIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiU2VydmljZUFQSVByb2R1Y3QiLCJjb250ZXh0IjoiXC9hcGkiLCJwdWJsaXNoZXIiOiJyYWRpc3lzIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IlVubGltaXRlZCJ9LHsic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJDYWxsQVBJUHJvZHVjdCIsImNvbnRleHQiOiJcL2FwaVwvdjEiLCJwdWJsaXNoZXIiOiJyYWRpc3lzIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IlVubGltaXRlZCJ9XSwiaWF0IjoxNjk3MTE3Mjg0LCJqdGkiOiJhNDA0MjJiNC1kNGZkLTQ2NjMtOGRjOC00OThiNjI5ZjNhODUifQ==.IzQ0Gv7GMi1HPTAoUADgSYoIPAwh3dx1oYTA_EH5ClpLCE3P1zT9TnDn9bsDNKEfmuLldGwECko-HrYA0QgOlmrfmRZk0uHo3n9XkaVKnAH4J3TJJL4sejdag68fgnXjU9GCYKEkmS3evoUE6jlwrho7CVMa98bEAkXyRiBDxVagP9dP8czRxAqfjGSdMra3pJ2XBSfjW2um69N_NjKn8dYszoH--aD1H0VtaJGmhA0-pyYHzjWg2QHIv0-3aHsdbm62hQ9Ht4Df1AU5--OMw3UfzmMfoIQv7wTkir1Yisgd6AiNN4xFXFj1X23ieBBDV3Pc24xG6_j58raeErYXFQ==" }
          }); 
      return response;
  } catch (error) {
        console.error(`Error making HTTP request: ${error}`);
        //console.log("HTTP send request input (catch): "+  method + ' ' + url + ' ' + headers +' ' + data);
        return error;
    }
}


async function handleCallTransfer(transferObj) {
var data = {};
 try {
        //console.log("Input is: "+ JSON.stringify(transferObj));
        data = await getCallRecordById(transferObj.CallSessionId);
        //console.log("from: "+data.fromNumber);
        //console.log("to: "+data.toNumber);   
  } catch (error) {
      console.error(`Error making HTTP request: ${error}`);
      return error;
  }

 try {
      res = await transferCallEngageUpdateAPI(data.fromNumber, data.toNumber, transferObj)
      //console.log ("Update API Call: "+res);
  } catch (error) {
      console.error(`Error making HTTP request: ${error}`);
      return error;
  }
}

// Add a request interceptor
axios.interceptors.request.use((config) => {
  // Log the outgoing request
//console.log('Request Headers:', config.headers);
//console.log('Request Body:', config.data);

  // Important: request interceptors must return the request.
  return config;
}, (error) => {
  // If the request was made with invalid data, or there was a network error, log it here.
  console.error('Error in request:', error);

  // Important: request interceptors must return the error.
  return Promise.reject(error);
});


