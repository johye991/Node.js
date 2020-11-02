/*
2. 
nod.js 자체적으로 지원하는 전역변수를 알아본다
__dirname : 현재 실행중인 js파일의 풀 경로
__filename : 파일명 반환 

node.js자체적으로 지원하는 전역객체를 알아본다
console
exports
global
module
process

console.log("지금 실행중일 파일명은 ", __filename);
console.log("지금 실행중일 파일의 디렉토리는 ", __dirname);
 */

//console객체
//실행시 시작 시간을 출력해준다
/*
console.time("myCPU");//원하는 제목을 넣어줄 수 있다.
//~~~~~~~~~~~~~~~로직 수행
for(var i = 1; i<=1000000;i++){

}
console.log("백만번 수행완료");

console.timeEnd("myCPU");//종료시간을 출력해준다
*/

//프로세스 객체
// console.log(process.arch);//cpu에 대한 정보
// console.log(process.env);//컴퓨터 환경
// console.log(process.platform);


























