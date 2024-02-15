
const fs = require('fs/promises');

exports.fetchReviews = async (req,res,next) => {
  let db = await fs.readFile('../database.json', { encoding: 'utf8' });
  db = JSON.parse(db);
  res.status(200).json({
    data:db
  })

}