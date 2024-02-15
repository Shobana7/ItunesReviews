

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const reviewRoute =  require('./routes/reviewRoute.js');
const poll = require('./polling.js');



const app = express();
const server = require('http').Server(app);

app.use(cors());
app.use(bodyParser.json());


const socketIO = require('socket.io')(server, {
        cors: {
            origin: "*"
        }
      });


socketIO.on('connection', (socket) => {
        console.log(`⚡: ${socket.id} user just connected!`);

        socket.on('disconnect', () => {
          console.log(' A user disconnected');
        });
    });

app.use('/api/reviews', reviewRoute ); // fetches reviews 


server.listen(3000, () => {
        console.log("server listerning at port 3000");
        poll.myIntervalFunc(socketIO); // initial fetch and  continues to poll every 5 mins
      });
