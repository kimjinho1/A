# 현대오토에버x이노베이션 아카데미 채용연계 프로그램  
## 과제 소개  
[현대닷컴 견적내기 사이트](https://www.hyundai.com/kr/ko/e)https://www.hyundai.com/kr/ko/e를 모방한 내차만들기 웹사이트 개발  

## 백엔드 기술 스택  
typescript, nestjs, prisma, mysql  

## ERD 설계  
<img width="1440" alt="erd" src="https://github.com/kimjinho1/MyCar-Backend-NestJS/assets/29765855/5a911984-88cd-410c-8159-ce45302060e2">


## 실행 방법  
1. mysql 접속 후 아래 쿼리 실행   
`CREATE DATABASE MYCAR;`  
`use MYCAR;`  

2. `git clone https://github.com/kimjinho1/MyCar-Backend-NestJS.git mycar_backend`  

3. `cd mycar_backend`  

4. npm 설치 -> https://nodejs.org/ko/download  

5. .env 파일에 DATABASE_URL 수정  
DATABASE_URL="mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@localhost:3306/${MYSQL_DATABASE}"  
EX)  
DATABASE_URL="mysql://root:password@localhost:3306/mycar"  

6. `npm install`  

7. `npm run start`  
