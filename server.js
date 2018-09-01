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
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Setup mysql connection to server
	const connection = mysql.createConnection({
		host: process.env.REACT_APP_MYSQL_HOST,
		user: process.env.REACT_APP_MYSQL_USER,
		password: process.env.REACT_APP_MYSQL_PASS,
		database: process.env.REACT_APP_MYSQL_DATABASE
		dateStrings: true
	});
	connection.connect();

// Sends a query and sends a response back to client
const sendQry = (query, req, res) => {
	connection.query(query,
    function(err, results, fields) {
	if (err) throw err;
	res.send(results);
	});
};

const addUser = (user) => {
	let qry = "INSERT INTO authors(nickname) VALUES ?";
	connection.query(qry, user, function (err, result, fields) {
		if (err) throw err;
		// console.log(result);
	})
}

//Returns all posts from post table on mysql server
app.get("/api/posts", function(req, res) {
	let qry = "SELECT posts.id, posts.nickname, \
							posts.title, \
	   						posts.content AS POST, \
	   						group_concat(comments.content) AS 'COMMENT(S)',\
	   						categories.name AS CATEGORY,\
	   						posts.created_at\
						\
						FROM posts\
							LEFT JOIN comments ON comments.post_id=posts.id\
							INNER JOIN categories ON posts.category=categories.id\
							GROUP BY posts.id"

	sendQry(qry, req, res);
});


app.get("/api/comments", function(req, res) {
	let qry = "SELECT * FROM comments ORDER BY comments.created_at";
	sendQry(qry, req, res);
})

app.get("/api/categories", function(req, res) {
	let qry = "SELECT name AS category \
					  FROM categories";
	sendQry(qry, req, res);
})

/*
  Route to post a comment
  Currently supports a nickname and content
*/
app.put("/api/postcomment", function(req, res) {
 	// console.log(req.body);
	// console.log(req.body.nickname);

	let postid = req.body.postid;
	let nickname = req.body.nickname;
	let content = req.body.content;
	let qry = "";

	qry = 'INSERT INTO comments(post_id, nickname, content) ' +
			'VALUES(' + mysql.escape(postid) + ', '
			+ mysql.escape(nickname)  + ', '	
			+ mysql.escape(content) + ')'
	
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
	let qry = "";

	qry = 'INSERT INTO posts(nickname,' 
	                         + 'title,'
	                         + 'content,'
	                         + 'category'
	                         + ') '
	       + 'VALUES(' + nickname + ', ' 
	                + title + ', ' 
	                + content + ', ' 
	                + '(SELECT id ' 
	                   + 'FROM categories ' 
	                   + 'WHERE name=' + category  
	       + '))'
	console.log(qry);
	sendQry(qry, req, res);

})

//Serve the react site
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(3002);
console.log("listening on port 3002!")