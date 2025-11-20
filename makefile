.PHONY: i install setup prod test-full c commit lint clean setup-clean docker-dev docker-build docker-prod docker-stop docker-clean

i install:
	bun install

setup: install
	bun run prepare
	bun run dev

prod:
	bun run build
	bun start

test-full:
	npx jest --coverage --verbose --detectOpenHandles --forceExit

c commit:
	bun run commit

lint:
	bun run lint

clean:
ifeq ($(OS),Windows_NT)
	@if exist .next rmdir /s /q .next
	@if exist node_modules\.cache rmdir /s /q node_modules\.cache
	@if exist coverage rmdir /s /q coverage
	@if exist node_modules rmdir /s /q node_modules
else
	rm -rf .next node_modules/.cache coverage node_modules
endif

setup-clean: clean setup

docker-dev:
	docker-compose up --build

docker-build:
	docker build -t rankmyapp:latest .

docker-prod: docker-build
	docker run -d --name rankmyapp-prod -p 3000:3000 --env-file .env.local rankmyapp:latest sh -c "bun run build && bun start"

docker-stop:
	docker-compose down
