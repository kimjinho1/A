#!/bin/bash
REPOSITORY=/home/ubuntu/deploy

cd $REPOSITORY

# 기존의 도커 컴포즈 중지 (선택 사항)
docker-compose down

# 도커 컴포즈 시작
docker-compose up -d

# sudo npm install

# # 기존의 pm2 프로세스를 중지하고 삭제
# sudo npx pm2 delete my-server || true

# # dist/src/main.js 파일을 pm2로 실행
# sudo npx pm2 start dist/src/main.js --name "my-server"

