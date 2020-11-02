//웹서버 구축하기

//모듈이란 기능을 모아 놓은 자바스크립트 파일.. js
var http = require("http");//http 내부 모듈 가져오기
var url = require("url"); //url분석 모듈
var fs = require("fs");//file system모듈(파일 읽기 쓰기)
var mysql = require("mysql");//mysql 외부 모듈
var ejs = require("ejs");//node서버에서만 실행가능한 문서
                        //html로 채워졌지만, html문서가 아님!

//mysql접속 문자열
let conStr={
    url:"localhost",
    user:"root",
    password:"whgP1221",
    database:"node"
    
}
var con;//mysql넙속 정보를 가진 객체, 이 객체로 sql문을 수행할 수 있다


//서버 객체 생성
var server = http.createServer(function(request, response){
   
    //클라이언트가 원하는 요청을 처리하려면, url을분석하여 url추출해서 조건을 따져보다
    var urlJson =url.parse(request.url,true)//분석결과를 json으로
    console.log("url:", urlJson);

    if(urlJson.pathname=="/"){
        fs.readFile("./index.html","utf-8",function(error,data){
            if(error){
                console.log("fail",error);
            }else{
                //200이란 처리성공 http상태코드, ,404 존재하지 않는 자원, 500 서버의 심각한 에러
                response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
                response.end(data);
            }
        });
    }else if(urlJson.pathname=="/member/registForm"){
        fs.readFile("./registForm.html","utf-8",function(error,data){
            if(error){
                console.log("fail",error);
            }else{
                //200이란 처리성공 http상태코드, ,404 존재하지 않는 자원, 500 서버의 심각한 에러
                response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
                response.end(data);
            }
        });

    }else if(urlJson.pathname=="/member/loginForm"){
        fs.readFile("./loginForm.html","utf-8",function(error,data){
            if(error){
                console.log("fail",error);
            }else{
                //200이란 처리성공 http상태코드, ,404 존재하지 않는 자원, 500 서버의 심각한 에러
                response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
                response.end(data);
            }
        });
    }else if(urlJson.pathname=="/member/regist"){
        //파라미터 구분법
        //http://localhost:7878/member/regist
        //?uid=
        //&password=
        //&uname=
        //&phone=
        //&email_id=
        //&email_server=naver.com
        //&addr=
        //&memo=
        //&skill_id=4

        //브라우저에서 전송한 파라미터를 먼저 받아야 한다
        //get방식으로 받아오기

        //회원정보는 member2 테이블에 넣고
        var sql =  "insert into member2(uid,password,uname,phone,email,receive,addr,memo)";
        sql+="values(?,?,?,?,?,?,?,?)";//?는 바인드 변수를 표현,
        var param = urlJson.query
        con.query(sql,
            [param.uid,
            param.password,
            param.uname,
            param.phone,
            param.email,
            param.receive,
            param.addr,
            param.memo],
            function(error,result,fields){
                if(error){
                    console.log("fail:",error)
                }else{

                    /*
                    mysql에서 마지막으로 insert된 member2_id 값가져오기
                    MariaDB [node]> select last_insert_id() as member2_id;
                    +------------+
                    | member2_id |
                    +------------+
                    |          6 |
                    +------------+
                    1 row in set (0.002 sec)
                    */
                    //마지막으로 insert된 회원의 pk를 조회해보자
                    sql="select last_insert_id() as member2_id";
                    
                    con.query(sql, function(error,record,fields){
                        if(error){
                            console.log("pk fail:", error);
                        }else{
                            console.log("record:",record);
                            var member2_id = record[0].member2_id;//레코드 0번째 배열의 json객체
                            //성공하면, 회원이 보유한 스킬 정보도 넣어주자
                            //스킬정보는 member_skill에 넣자(배열의 길이 만큼)
                            for(var i = 0;i< param.skill_id.length;i++){// urlJson안의 query안에 skill_id의 길이를 가져와야 보유능력의 수를 저장할 수 있음
                                sql="insert into member_skill(member2_id,skill_id) values("+member2_id+","+param.skill_id[i]+")";
                                console.log("skill query:",sql);
                                //쿼리 실행
                                con.query(sql,function(err){
                                    if(err){
                                        alert("회원정보등록 실패")
                                    }else{
                                        //mysql에 insert
                                        response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
                                        response.end("회원등록 완료");
                                    }
                                });
                            }
                        }
                    });//select 쿼리문 수행
                    
                }
            });
           
            
    }else if(urlJson.pathname=="/member/list"){
            //회원목록 보여주기
            var sql="select * from member2";
            con.query(sql, function(error,record,fields){
                // console.log("회원목록:",record);
                
                //응답 정보를 테이블로 구성하자 
                //member2_id uid password uname phone email receive addr memo
                var tag = "<table width='100%' border=1px>";
                tag += "<tr>";
                tag += "<td>member2_id</td>";
                tag += "<td>uid</td>";
                tag += "<td>password</td>";
                tag += "<td>uname</td>";
                tag += "<td>phone</td>";
                tag += "<td>email</td>";;
                tag += "<td>receive</td>";
                tag += "<td>addr</td>";
                tag += "<td>memo</td>";
                tag += "</tr>";
                for(var i=0;i<record.length;i++ ){
                    var member = record[i];//회원 각각의 json을 가져옴
                    tag += "<tr>";
                    tag += "<td><a href='/member/detail?member2_id="+member.member2_id+"'>"+member.member2_id+"</a></td>";
                    tag += "<td>"+member.uid+"</td>";
                    tag += "<td>"+member.password+"</td>";
                    tag += "<td>"+member.uname+"</td>";
                    tag += "<td>"+member.phone+"</td>";
                    tag += "<td>"+member.email+"</td>";
                    tag += "<td>"+member.receive+"</td>";
                    tag += "<td>"+member.addr+"</td>";
                    tag += "<td>"+member.memo+"</td>";
                    tag += "</tr>";
                }
                tag += "<tr>";
                tag += "<td colspan='9'><a href='/'>메인페이지로!</a></td>"
                tag += "</tr>";
                tag+="</table>";
                response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
                response.end(tag);
        }); 
    
    }else if(urlJson.pathname=="/member/detail"){//회원의 상세정보
        var member2_id =urlJson.query.member2_id;//해당 회원을 클릭하면 정보를 가져옴
        //mysql에서 데이터가져오기
        var sql = "select * from member2 where member2_id="+member2_id;
        con.query(sql,function(error,record,fields){
            if(error){
                console.log("회원 1건 조회 실패",error);
            }else{
                // console.log("3번회원의 정보:", record);
                var obj = record[0]; //0번째 가져오기
                fs.readFile("./detail.ejs","utf-8",function(error,data){
                    if(error){
                        console.log("detail.ejs 실패", error);
                    }else{
                        response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
                        response.end(ejs.render(data,{
                            member:obj//record의 json자체를 보냄
                        }));//그냥 보내지 말고 서버에서 실행한 후 보내자
                    }
                });  
            }
        });
        
    }else if(urlJson.pathname=="/fruit"){//ejs예시든거임
        var f1 = "Apple";
        var f2 = "Orange";
        fs.readFile("./test.ejs","utf-8",function(error,data){
            response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
            //ejs를 그냥 파일로 문자취급해서 보내면 원본 코드까지 보내지기때문에
            //서버에서 실행을 한 후, 그 결과를 보내야 한다(jsp,php,asp의 원리..)
            response.end(ejs.render(data,{fruit:f1}));//render(): 해석해버림
        });
    }
    

});

//mysql 접속
function getConnection(){
    con = mysql.createConnection(conStr);//json을 매개변수로 넣어주면댐
}

//서버 가동
server.listen(7878,function(){
    console.log("my server is running at 7878 port....");
    getConnection()
});




