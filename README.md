# 현대오토에버x이노베이션 아카데미 채용연계 프로그램  
## 과제 소개  
[현대닷컴 견적내기 사이트](https://www.hyundai.com/kr/ko/e)https://www.hyundai.com/kr/ko/e를 모방한 내차만들기 웹사이트 개발  

## 백엔드 기술 스택  
typescript, nestjs, prisma, mysql  

## ERD 설계  

## 실행 방법  
1. mysql 접속 후 아래 쿼리 실행  
- CREATE DATABASE MYCAR; 
- use MYCAR;  

2. git clone 후 .env 파일에 DATABASE_URL 수정  
DATABASE_URL="mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@localhost:3306/${MYSQL_DATABASE}"  
EX)  
DATABASE_URL="mysql://root:password@localhost:3306/mycar"  

3. 백엔드 폴더 루트(Makefile 있는 위치)에서 터미널에 "make" 실행  
Makefile 안에 여러 명령들이 있습니다.  
EX)  
make migrate -> 데이터베이스 마이그레이션  
make seed -> 데이터들 주입  
make nest -> 서버 실행  
