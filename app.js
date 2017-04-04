var express = require('express');
var app = express();
var mysql = require('mysql');

app.get('/dvds/:id', function(request, response){
  var connection = mysql.createConnection({
    host : 'itp460.usc.edu',
    user : 'student',
    password : 'ttrojan',
    database : 'dvd'
  })

  var dvdID = request.params.id
  var sqlStatement = "SELECT title, award, rating_id, rating_name, genre_id, genre_name FROM dvds "+
  "INNER JOIN ratings on dvds.rating_id = ratings.id "+
  "INNER JOIN genres on dvds.genre_id = genres.id "+
  "WHERE dvds.id LIKE ?";
  connection.query(sqlStatement, [ dvdID ], function(error, result) {
    if(error){
      throw error;
    }
    response.json({
      title: result[0].title,
      award: result[0].award,
      genre: {
        id: result[0].genre_id,
        genre_name: result[0].genre_name
      },
      rating: {
        id: result[0].rating_id,
        rating_name: result[0].rating_name
      }
    });
    connection.end();
  })
});

app.listen(3000);
