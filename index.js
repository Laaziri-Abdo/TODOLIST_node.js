const mysql = require('mysql');
const http = require('http');
const { getReqData } = require("./data");



const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo'
});


http.createServer(async (req, res)=> {
    

if (req.url === '/task' && req.method === "GET" ) {
    connection.query(`SELECT * FROM task`, function (err, results) {
        if (err) {
          res.end(JSON.stringify(err))
        }
        res.end(JSON.stringify(results))
        
    })
    
}else if (req.url === '/project' && req.method === "GET") {
    connection.query(`SELECT * FROM project`,function (err, results) {
        if (err) {
          res.end(JSON.stringify(err))
        }
        res.end(JSON.stringify(results))

})

}else if (req.url.match(/\/task\/([0-9]+)/) && req.method === "GET"  ) {

    const id = req.url.split("/")[2];
    connection.query(`SELECT * FROM task where id = ${id}`, function (err, results) {
        if (err) {
          res.end(JSON.stringify(err))
        }
        res.end(JSON.stringify(results))
        
    })
    
}else if (req.url.match(/\/project\/([0-9]+)/) && req.method === "GET" ) {
    const id = req.url.split("/")[2];
    connection.query(`SELECT * FROM project where id = ${id}`,function (err, results) {
        if (err) {
          res.end(JSON.stringify(err))
        }
        res.end(JSON.stringify(results))
    
})} 



else if (req.url.match(/\/task\/([0-9]+)/) && req.method === "DELETE"  ) {

    const id = req.url.split("/")[2];
    connection.query(`DELETE FROM task where id = ${id}`, function (err, results) {
        if (err) {
          res.end(JSON.stringify(err))
        }
        res.end('task has been delated')
        
    })
    
}else if (req.url.match(/\/project\/([0-9]+)/) && req.method === "DELETE" ) {
    const id = req.url.split("/")[2];
    connection.query(`DELETE FROM project where id = ${id}`,function (err, results) {
        if (err) {
          res.end(JSON.stringify(err))
        }
        res.end('project has been delated')
    
})}


else if (req.url.match(/\/task\/([0-9]+)/) && req.method === "PUT") {
  
    const id = req.url.split("/")[2]
    const data = await getReqData(req);
   let body = JSON.parse(data)
  
    let sql = `UPDATE task SET 	titer = '${body.titer}',id_project = '${body.id_project}', discription = '${body.discription}', date_db = '${body.date_db}', date_fin = '${body.date_fin}' WHERE id = ${id}`;
    connection.query(sql, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end("task updated")
    });
  }


  else if (req.url.match(/\/project\/([0-9]+)/) && req.method === "PUT") {
  
    const id = req.url.split("/")[2]
    const data = await getReqData(req);
   let body = JSON.parse(data)
  
    let sql = `UPDATE project SET titre = '${body.titre}', description = '${body.description}' , piriorite = '${body.piriorite}', date_db = '${body.date_db}', date_fin = '${body.date_fin}' WHERE id = ${id}`;
    connection.query(sql, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end("project updated")
    });

}
// else if (req.url === "/task" && req.method === "POST"  ) {
//     connection.query(`INSERT INTO task ( titre, description, date-db, date-fin) VALUES()`, function (err, results) {
//         if (err) {
//           res.end(JSON.stringify(err))
//         }
//         res.end(JSON.stringify(results))
        
//     })
    
// }else if (req.url==="/project" && req.method === "POST" ) {

//     connection.query(`INSERT INTO project ( titre, description, piriorite, date-db, date-fin) VALUES `,function (err, results) {
//         if (err) {
//           res.end(JSON.stringify(err))
//         }
//         res.end(JSON.stringify(results))
    
// })}







  }).listen(8080); 
