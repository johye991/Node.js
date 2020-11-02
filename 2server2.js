/*
get과 post방식의 전송을 이해하기 위한 서버
Get :   가져오다 (서버로부터 컨텐츠를 가져올때 요청 방식)
        html<a>링크가 바로 get방식의 요청이다
        GET방식으로 데이터 즉 파라미터를 전송하게 되면, 데이터가 노출되버린다
        왜? HTTP프로토콜의 헤더에 실어 나르므로(편지봉투에 데이터를 작성하는 것과 같다)
        또한 편지봉투에 데이터를 전송하면 편지지에 비해 전송할 수 있는 데이터량에 한계가 있음
        주용도)다른 URL등의 링크를 통해 파라미터 전송할때

POST :  보내다는 의미(클라이언트가 서버에 데이터를 전송할때 사용하는 방식)
        HTTP프로토콜의 body를 통해 데이터를 전송하기 때문에 마치 편지봉투가 아니라
        편지지에 데이터를 실어서 보내는것과 같다,
        봉투안에 담아서 보내기 때문에 데이터가 노출되지 않는다
        특징) 보낼 수 있는 데이터량에 한계가없다
        주용도) 노출되면 위험한 데이터 전송시 사용(로그인요청, 회원가입등..)
                파일(사진,동영상 등)을 서버에 전송시 이용!

        post방식은 form태그를 이용해 요청할 수 있음
                */

var http = require("http");
var url = require("url");//url은 post방식이 안보임
var querystring = require("querystring");//get과 post까지 파싱이 가능함

var server = http.createServer(function(request,response){
    // console.log("클라이언트 요청방식:",request.method);//request.method :클라이언트의 요청 방식
    if(request.method=="GET"){
        response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"})
        response.end("클라이언트가 GET방식으로 요청했네요!");
        //get 방식으로 전달된 파라미터 받기
        var urlJson = url.parse(request.url,true);//true 매개변수를 넘기면, 파라미터 정보를 json으로 변환
        // console.log("url result:",urlJson);
        
        var paramJson = urlJson.query;//id, pass담겨있음
        console.log("ID:",paramJson.id)
        console.log("PASS:",paramJson.pass);

    }else if(request.method=="POST"){
        response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"})
        response.end("클라이언트가 POST방식으로 요청했네요!")

        //post방식으로 전달된 데이터를 받기위한 이벤트 감지해보자
        request.on("data",function(param){
            // var postParam = url.parse(new String(param).toString(),true);//url분석만으로 해결 안됨, body로 전송된 데이터는..
            
            var postParam=querystring.parse(new String(param).toString());//url분석만으로 해결 안됨, body로 전송된 데이터는..
            // console.log("Post param:",postParam);
            console.log("ID : ", postParam.id);
            console.log("PASS : ", postParam.pass);    


        });

    
    }


});

server.listen(9999,function(){
    console.log("My server running 9999...");
});













