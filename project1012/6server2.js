/* 
    HTTP모듈로 웹서버 구축하기
*/
var http = require("http");
var fs = require("fs")//file system모듈,파일을 읽거나 쓸 수 있는 모듈

//변경할 목적의 데이터가 아니라면, 상수로 선언하자
//이때 사용되는 키워드가 바로 let 이다
let 


//서버는 클라이언트의 요청이 들어오면, 반드시 응답을 해야한다
// http 메카니즘 이다. 만일 응답을 안하면 클라이언트는 무한정 서버의 응답을 기다리므로
// 무한대기상태에 빠진다
//서버 객체를 생성
//서버객체 생성시, 요청정보와 응답정보를 구성할 수 있는 request, response 객체가 매개변수로 전달될 수 있다
var server = http.createServer(function(request, response){
    //request 객체로는 클라이언트의 요청 정보를 처리할 수 있고
    //response 객체로는 클라이언트에게 전송할 응답 정보를 구성할 수있따
    console.log("클라이언트의 요청을 받았습니다");

    //컨텐츠 전송(클라이언트의 브라우저가 받게될 내용)
    //HTTP상태 코드 중 200은 정상처리를 의미한다( 즉, 서버에서 클라이언트의 요청을 정상적으로 
    //처리 했다는 상태코드임) 누가 정했냐? W3C의 표준에 의해서 정해진 것임
    //참고 500 심각한 서버의 오류, 404 요청한 자원을 찾을 수 없을때 
    response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});//전자문서 편지봉투 구성하기
    var tag="";
    /*tag+="<html>";
    tag+="<head>"
    tag+="</head>"
    tag+="<body>";
    tag+="<input type=\"text\">";
    tag+="<button>가입</button>";
    tag+="</body>";
    tag+="</html>";*/
    
    // tag+="javascript";
    
    //response.writeHead(200,{"Content-Type":"image/png;"});//전자문서 편지봉투 구성하기
    //서버에 있는 파일을 읽어들여, 클라이언트에게 전송한다
    fs.readFile("./2회원폼유효성체크.html","utf-8",function(error,data){
        console.log(data);
        response.end(data);//클라이언트에게 응답정보 전송

    });

    
    //이미지를 클라이언트에게 보내되, 파일을 읽어서 처리할 것
    //참고로 이미지의 경우 content-type은 imge/png, imge/gif등이다
    fs.readFile("../images/nation/1.png",function(error,data){
        response.end(data);
    });
    
    
    
});



//접속자를 감지
server.on("connection",function(){
    console.log("접속자감지");
});


// 브라우저에 localhost:7777 검색 포트번호가 7777이므로
//서버 가동
/* 모든 네트워크 프로그램은 포트번호가 있어야 한다
왜? 하나의 os내에서 수많은 네트워크가 있어서 
ex) 오라클 1521포트 mysql 3306포트*/
server.listen(7777,function(){
    console.log("server running at 7777 port...")
});













