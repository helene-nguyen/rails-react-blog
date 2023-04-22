run_rails:
	rails server

build:
	yarn build

build_watch:
	yarn build --watch

reset:
	docker compose stop
	docker rm ruby-blogonrails postgres-blogonrails
	docker rmi rails-test:1.0