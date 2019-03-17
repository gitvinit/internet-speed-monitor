var speedTest = require('speedtest-net');
var test = speedTest({ maxTime: 5000 });
var stitch = require('mongodb-stitch-server-sdk');
var credential = new stitch.UserApiKeyCredential('replace-with-credential');
var client = stitch.Stitch.initializeDefaultAppClient('replace-with-client-id');

test.on('data', data => {
  var uploadObj = {
    "download": data.speeds.download,
    "upload": data.speeds.upload
  }
  client.auth.loginWithCredential(credential)
    .then(authedId => {
      console.log(`successfully logged in with id: ${authedId}`);
      client.callFunction("logSpeedTestData", [uploadObj]).then(result => {
        console.log(`successfully logged speed test data: ${result}`);
      });
      client.close();
    })
    .catch(err => console.error(`login failed with error: ${err}`));
});