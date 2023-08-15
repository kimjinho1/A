#!/bin/bash
REPOSITORY=/home/ubuntu/deploy

cd $REPOSITORY

sudo npm install

# 기존의 pm2 프로세스를 중지하고 삭제
sudo npx pm2 delete my-server || true

# dist/src/main.js 파일을 pm2로 실행
sudo npx pm2 start dist/src/main.js --name "my-server"

