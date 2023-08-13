## 과제 소개  
[현대닷컴 견적내기 사이트](https://www.hyundai.com/kr/ko/e)https://www.hyundai.com/kr/ko/e를 모방한 내차만들기 웹사이트 개발  

## 백엔드 기술 스택  
TypeScript, NestJS, Prisma, MySQL  

## ERD 설계  
<img width="1440" alt="erd" src="https://github.com/kimjinho1/MyCar-Backend-NestJS/assets/29765855/5a911984-88cd-410c-8159-ce45302060e2">

## 인터페이스 명세서
[URL](https://docs.google.com/document/d/1u5VRWlR4-Ceacigi_vwpc3l1WxwXA2GvZCaHPVUUVok/edit?usp=sharing)

## 화면설계서
[URL](https://docs.google.com/document/d/1qb4QLTVkDfeKf0HpOyYLfGpiv0HNGrdQuRNH0OMUN44/edit?usp=sharing)


## 실행 방법  
1. npm 설치 -> https://nodejs.org/ko/download  

2. `git clone https://github.com/kimjinho1/MyCar-Backend-NestJS.git mycar_backend` 실행  

3. `cd mycar_backend` 실행  

3. mysql 접속 후 아래 쿼리 실행   
`CREATE DATABASE MYCAR;`  
`use MYCAR;`  

4. 폴더에 존재하는 `mycar_backup_ddl.sql` 쿼리 파일 실행 -> 테이블, 데이터 주입  

5. .env 파일에 DATABASE_URL 수정  
DATABASE_URL="mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@localhost:3306/${MYSQL_DATABASE}"  
EX)  
DATABASE_URL="mysql://root:password@localhost:3306/mycar"  

6. `npm install` 실행  

7. `npm run start` 실행  
