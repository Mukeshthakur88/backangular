const express = require('express');
const router = express.Router();

const mysql = require('mysql');



const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ajay",
  database: "todoapp"
  
});

db.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
   console.log('Connected to the MySQL server.');
  });

  

// Create DB
router.get('/createdb', (req, res,next) => {
    let sql = 'CREATE DATABASE todoapp';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});

// Create table
router.get('/createpoststable', (req, res,next) => {
    let sql = 'CREATE TABLE todo(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts table created...');
    });
});


// Insert post 1
router.get('/addpost1', (req, res,next) => {
    let post = {title:'Post One', body:'This is post number one'};
    let sql = 'INSERT INTO todo SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post 1 added...');
    });
});

// Insert post 2
router.get('/addpost2', (req, res,next) => {
    let post = {title:'Post Two', body:'This is post number two'};
    let sql = 'INSERT INTO todo SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post 2 added...');
    });
});

// Select posts
router.get('/getposts', (req, res,next) => {
    let sql = 'SELECT * FROM todo';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Posts fetched...');
    });
});


//insertdynamic
router.post('/addtodo' , (req, res,next) => {
    let sql = 'INSERT INTO todo SET ?'
    let post = {
        title: req.body.title,
        body : req.body.body
    }
    db.query(sql, post, (err, res) => {
        if(err) throw err;
        console.log('success');
        console.log(res);
    });
});

// Select single post
router.get('/getpost/:id', (req, res,next) => {
    let sql = `SELECT * FROM todo WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post fetched...');
    });
});

//updatedynamic
router.get('/updatetodo/:id', (req, res,next) => {
    
    let sql = `UPDATE todo SET title = ? WHERE id = ${req.params.id}`;
    let post={ 
        title : req.body.title
        }
    let query = db.query(sql,post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post updated...');
    });
});

// Update post
router.get('/updatepost/:id', (req, res,next) => {
    let newTitle = 'Updated Title';
    let sql = `UPDATE todo SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post updated...');
    });
});

//deletedynamic
router.post('/deletetodo/:id', function(req, res) {
    
    let sql=`delete from todo where id=${req.params.id}`;
    let query=db.query(sql,function(err, result) {
        if (err) throw err;
        console.log(result);
        res.redirect('/');
    });
    
    });

// Delete post
router.post('/deletepost/:id', (req, res,next) => {
    let newTitle = 'Updated Title';
    let sql = `DELETE FROM todo WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post deleted...');
    });
});



module.exports = router;