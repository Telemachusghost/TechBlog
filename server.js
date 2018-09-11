/*
This is the node.js backend server for the techblog site.
It provides an api for getting the categories, posting comments,
posting posts, and various other functions. 
Derick Falk
MM/YYYY
08/2018
*/

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

// Setup for bodyparser 50mb limit for file uploads
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ 
	extended: true,
	limit: '50mb',
	parameterLimit: 100000
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));
app.use(cors());

/*
Function to connect to mysql server with dateStrings in order to help with date parsing
*/
const connection = mysql.createConnection({
	host: process.env.REACT_APP_MYSQL_HOST,
	user: process.env.REACT_APP_MYSQL_USER,
	password: process.env.REACT_APP_MYSQL_PASS,
	database: process.env.REACT_APP_MYSQL_DATABASE
});
connection.connect();

/*
Simple function to make it more streamlined to send queries to mysql server
*/
const sendQry = (query, req, res) => {
	connection.query(query,
    function(err, results, fields) {
	if (err) throw err;
	res.send(results);
	});
};

/*
Perhaps may be used if User account functionality is ever added
*/
const addUser = (user) => {
	let qry = "INSERT INTO authors(nickname) VALUES ?";
	connection.query(qry, user, function (err, result, fields) {
		if (err) throw err;
		// console.log(result);
	})
}

/*
Brings in a list of the posts with a count of the comments
*/
app.get("/api/posts", function(req, res) {
	let qry = "SELECT posts.id, posts.nickname, \
							posts.title, \
	   						posts.content AS POST, \
	   						categories.name AS CATEGORY,\
	   						posts.created_at,\
	   						COUNT(comments.post_id) AS popularity,\
	   						posts.image\
						\
						FROM posts\
							LEFT JOIN comments ON comments.post_id=posts.id\
							INNER JOIN categories ON posts.category=categories.id\
							GROUP BY posts.id"

	sendQry(qry, req, res);
});

/*
Brings in all the information for comments
*/
app.get("/api/comments", function(req, res) {
	let qry = "SELECT * FROM comments ORDER BY comments.created_at";
	sendQry(qry, req, res);
})

/*
Brings in a list of categories with a count of how many posts are in them for sorting
*/
app.get("/api/categories", function(req, res) {
	let qry = "SELECT name AS category, " 
	          + "COUNT(posts.id) AS popularity "
	          + "FROM categories "
	          + "LEFT JOIN posts ON categories.id=posts.category "
	          + "GROUP BY categories.id"
	sendQry(qry, req, res);
})

/*
  Route to post a comment
  Currently supports a nickname and content
*/
app.put("/api/postcomment", function(req, res) {
 	// console.log(req.body);
	// console.log(req.body.nickname);

	let postid = mysql.escape(req.body.postid);
	let nickname = mysql.escape(req.body.nickname);
	let content = mysql.escape(req.body.content);
	let image = mysql.escape(req.body.fileName);
	let qry = "";

	qry = 'INSERT INTO comments(post_id, nickname, content, image) ' +
			'VALUES(' 
			+ postid + ', '
			+ nickname + ', '	
			+ content +  ', '
			+ image + ')'
	
	sendQry(qry, req, res);
})

/*
  Route for adding a post currently supports a
  nickname, title, category, and content
*/
app.put("/api/addpost", function(req, res) {
	let nickname = mysql.escape(req.body.nickname);
	let title = mysql.escape(req.body.title);
	let content = mysql.escape(req.body.content);
	let category = mysql.escape(req.body.category);
	let image = mysql.escape(req.body.fileName);
	let qry = "";

	qry = 'INSERT INTO posts(nickname,' 
	                         + 'title,'
	                         + 'content,'
	                         + 'category, '
	                         + 'image'
	                         + ') '
	       + 'VALUES(' + nickname + ', ' 
	                + title + ', ' 
	                + content + ', ' 
	                + '(SELECT id ' 
	                   + 'FROM categories ' 
	                   + 'WHERE name=' + category 
	       + '), '
	       + image + ')'
	console.log(qry);
	sendQry(qry, req, res);

})

/*
File upload which saves the url onto mysql server
*/
app.post("/api/upload", (req, res, next) => {
  try {
	  let imageFile = req.files.file;

	  imageFile.mv(__dirname + '/public/' + req.files.file.name, function(err) {
	  	if (err) {
	  		console.log(err);
	  		return res.status(500).send(err);
	  	}
	  });
  } catch(err) {
  	console.log(err);
  }
})

/*
TODO add doc
*/
app.put("/api/addcategory", function(req, res) {
	let category = mysql.escape(req.body.category);
	let qry = "";

	qry = "INSERT INTO categories(name) VALUES("
	+ category
	+ " )"
	console.log(qry);
	sendQry(qry, req, res);
})

//Serve the react site
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(3002);
console.log("listening on port 3002!")