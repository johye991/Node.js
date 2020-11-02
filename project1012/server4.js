/* mysql 연동 

cd D:\workspace\4.Nodejs\project1012
cmd창에서 npm install mysql 설치후 실행
*/


var mysql = require("mysql");

//접속에 필요한 정보
let conStr ={
    url:"localhost",
    user:"root",
    password:"whgP1221",
    database:"node"
}

//접속시도 후, 접속정보가 반환된다
var con = mysql.createConnection(conStr);

//반환된 con을 이요하여 쿼리문 수행
var sql = "insert into member(firstname,lastname,local,msg)";
sql+="values('hye','jo','seoul','hello')";
con.query(sql,function(error,results,fields){
    if(error){
        console.log("실패", error);
    }else{
        console.log("성공");
    }
});//쿼리 실행

/*
MariaDB [(none)]> show databases;
+--------------------+
| Database           |
+--------------------+
| android            |
| information_schema |
| mydb               |
| mysql              |
| node               |
| performance_schema |
| test               |
+--------------------+
7 rows in set (0.001 sec)

MariaDB [(none)]> use node
여기까지 실행후 비쥬얼스튜디오에서 작성후 cmd에서 확인후
마리아에서 확인

MariaDB [node]> select * from member;
+-----------+-----------+----------+---------+-------+---------------------+
| member_id | firstname | lastname | local   | msg   | regdate             |
+-----------+-----------+----------+---------+-------+---------------------+
|         1 | zino      | min      | gangnam | hi    | 2020-10-12 16:20:16 |
|         2 | hye       | jo       | seoul   | hello | 2020-10-12 16:34:46 |
+-----------+-----------+----------+---------+-------+---------------------+
2 rows in set (0.005 sec)

*/

