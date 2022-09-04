
const { schedulerFetchJob } = require('./controller/videoScheduler');
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/index");
const config = require("./config/config.json")

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));

mongoose.connect(`${config.MONGODB_URL}/YouTube`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(()=>{
  console.log("Database connected");
})
.catch((err) => {
    console.log('Failed to connect to MongoDB:', err);
});

app.use("/", routes);
schedulerFetchJob();

app.listen(8080, function(){
    console.log("Running on Port 8080");
});
