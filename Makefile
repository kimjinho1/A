all:
	npm install
	npm run start

nest:
	npm run start

docker:
	docker-compose up --build

migrate:
	npx prisma migrate dev --name init

seed:
	npm run seed

studio:
	npx prisma studio

format:
	npx prisma-case-format --field-case camel --map-field-case snake --file prisma/schema.prisma
	npx prisma format

clean:
	sudo docker-compose down
	docker network prune --force
	docker volume prune --force

fclean:	clean
	sudo rm -rf db

re: fclean all