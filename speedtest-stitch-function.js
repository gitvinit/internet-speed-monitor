exports = function(data){
    const now = new Date();
    const speedtestData = {
      upload:data.upload,
      download:data.download,
      date: now
    };
  
    // Insert the speed test data into MongoDB
    const mongodb = context.services.get("mongodb-atlas");
    const speedtestCollection = mongodb.db("SpeedTest-DB").collection("SpeedTest-Collection");
  
    return speedtestCollection.insertOne(speedtestData);
  };