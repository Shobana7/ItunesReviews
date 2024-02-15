
const axios = require('axios');
const fs = require('fs/promises');

let prevTimer = "";
// sorts records before writing to file
async function writeToFile(data) {
  let db = await fs.readFile('../database.json', { encoding: 'utf8' });
    db = JSON.parse(db);
         for(let r of data['feed']['entry']){
            if(db['ids'].includes(r.id.label) === false){
            let obj = {
                author: r.author.name.label,
                time: r.updated.label,
                id: r.id.label,
                rating: r['im:rating'].label,
                title: r.title.label,
                content: r.content.label
            }
            db.records.push(obj);
            db.ids.push(obj.id)
        }
        }
        db.records.sort((a, b) => {new Date(a['time']) < new Date(b['time'])});
        db['mostRecent'] = db.records[0].time;
        prevTimer = new Date(db['mostRecent']);
        try {
          await fs.writeFile('../database.json', JSON.stringify(db));
        } catch (err) {
          console.log(err);
        }

   return db;
  }

const apiCall = async () => {
    try {
      const ping = await axios({
        url: "https://itunes.apple.com/us/rss/customerreviews/id=595068606/sortBy=mostRecent/page=1/json",
        method: "GET",
        headers: {
          accept: "Application/json",
          "Content-Type": "Application/json",
        },
      });
      return ping.data;
    } catch (error) {
      return error.response;
    }
  };

  //polls every 5 minutes and emits data via socket
module.exports.myIntervalFunc =  async (socket) => {

    let myCall = async () => await apiCall();
  
    const interval = async () => {
        let intervalCall = await myCall();
        
        if(prevTimer){
          if( new Date(intervalCall['feed']['entry'][0]['updated']['label']) > prevTimer){
            prevTimer = new Date(intervalCall['feed']['entry'][0]['updated']['label']);
            let data = await writeToFile(intervalCall);
            socket.emit("newReviews",data);
          }
          else{
            //socket.emit("newReviews","noNewData");
          }
        }
        else{
          prevTimer = new Date(intervalCall['feed']['entry'][0]['updated']['label']);
            let data = await writeToFile(intervalCall);
            socket.emit("newReviews",data);

        }
        setTimeout(()=>{console.log("5 mins")}, 5*60*1000);
        setTimeout(interval, 5*60*1000);
    };
    interval();
  };

