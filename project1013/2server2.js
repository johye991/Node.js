
/*
웹서버 구축하기
*/
var http=require("http");
const { connect } = require("tls");
var url = require("url");//내장모듈
var mysql = require("mysql");//외부모듈
var fs = require("fs");//file system 내장 모듈
var con ; //접속 성공시 그 정보를 보유한 객체, 
        //이 객체가 있어야 접속된 상태에서 쿼리문 수행 가능함


//서버 객체 생성
var server = http.createServer(function(request, response){
    //클라이언트가 원하는것이 무엇인지를 구분하기 위한 url 분석
    console.log("클라이언트의 요청 url",request.url);//한줄로 되어있어 구분안됨
    //섞여있는 url을 분석(Parsing)하기 위해서는 전담 모듈을 이요하자
    //url 내장모듈
    var parseObj = url.parse(request.url,true);//분석 시작
    //분석시, true를 매개변수로 전달하면, 파라미터들을 {json}으로 묶어준다
    //장점: json은 객체 표기법이므로, 데이터들을 .점찍고 마치 객체다르듯 접근할 수 있기때문에
    //직관성이 높아진다. 즉 다루기 쉬워진다(배열보다 낫다)
    console.log("url result 분석결과 : ", parseObj);

    response.writeHead(200,{"Content-type":"text/html;charset=utf-8"});
    
    if(parseObj.pathname=="/member/registForm"){//회원가입을 원하면
        fs.readFile("./registForm.html","utf-8",function(error,data){
            if(error){
                console.log("읽기실패", error);
            
            }else{
                response.end(data);//html파일을 읽어들인 결과문자열을 클라이언트의 응답정보로 저장


            }
        });
        
    }else if(parseObj.pathname=="/member/list"){//회원 목록을 원하면
        // mysql에 select 할 예정
        //mysql에 insert할 예정
        // response.end("회원 등록을 합니다");
        //클라이언트의 브라우저에서 전송되어온 파라미터(변수)들을 받아보자
        var param = parseObj.query;//파라미터를 보유한 json객체 
        response.end("회원 목록을 가져옵니다");
    }else if(parseObj.pathname=="/member/del"){//회원 탈퇴를 원하면
        response.end("회원을 삭제합니다");
    }else if(parseObj.pathname=="/member/edit"){//회원수정
        response.end("회원을 수정합니다");
    }
});

//mysql접속, 정보
function connectDB(){
    con = mysql.createConnection({
        url:"localhost",
        user:"root",
        password:"whgP1221",
        database:"node"
    });
}

//서버 가동
server.listen(9999, function(){
    console.log("Web server is running at port 9999...");
    connectDB()//mysql연동
});




































/*
MariaDB [node]> create  table  member2(
    ->  member2_id  int primary key  auto_increment
    ->  , uid  varchar(20)
    ->  , password varchar(20)
    ->  , uname varchar(20)
    ->  , phone varchar(13)
    ->  , email varchar(50)
    ->  , receive varchar(3)
    ->  , addr varchar(100)
    ->  , memo text
    -> ) default character set utf8;
Query OK, 0 rows affected (0.046 sec)

skill테이블을 따로 만들어서 java,등 보유 기술을 따로 저장한다.
MariaDB [node]> create table skill(
    ->     skill_id int primary key auto_increment
    ->     ,name varchar(20)
    -> );
Query OK, 0 rows affected (0.044 sec)

회원이 보유한 기술을 담을 테이블 (member2의 id와, skill_id를 가져옴(즉 외래키 가져옴))
MariaDB [node]> create table member_skill(
    ->     member_skill_id int primary key auto_increment
    ->     ,member2_id int
    ->     ,skill_id int
    ->     ,foreign key(member2_id) references member2(member2_id)
    ->     ,foreign key(skill_id) references skill(skill_id)
    -> );
Query OK, 0 rows affected (0.034 sec)

skill table에 카테고리 등록
insert into skill(name) values('java');
insert into skill(name) values('oracle');
insert into skill(name) values('android');
insert into skill(name) values('python');
insert into skill(name) values('swift');
insert into skill(name) values('R');
MariaDB [node]> select * from skill 
    -> ;
+----------+---------+
| skill_id | name    |
+----------+---------+
|        1 | java    |
|        2 | oracle  |
|        3 | android |
|        4 | python  |
|        5 | swift   |
|        6 | R       |
+----------+---------+


*/