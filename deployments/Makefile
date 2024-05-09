.PHONY: start-apps stop-apps start-watchtower stop-watchtower start-cloudbeaver stop-cloudbeaver start-db stop-db

PROJECT_NAME=medley

start-db:
	docker compose -f docker-compose.db.yml --env-file .env.db -p $(PROJECT_NAME) up -d

stop-db:
	docker compose -f docker-compose.db.yml --env-file .env.db -p $(PROJECT_NAME) down

clean-db:
    docker compose -f docker-compose.db.yml --env-file .env.db -p $(PROJECT_NAME) down -v

start-apps:
	docker compose -f docker-compose.apps.yml --env-file .env.apps -p $(PROJECT_NAME) up -d

stop-apps:
	docker compose -f docker-compose.apps.yml --env-file .env.apps -p $(PROJECT_NAME) down

start-watchtower:
	docker compose -f docker-compose.watchtower.yml --env-file .env.watchtower -p $(PROJECT_NAME) up -d

stop-watchtower:
	docker compose -f docker-compose.watchtower.yml --env-file .env.watchtower -p $(PROJECT_NAME) down

start-cloudbeaver:
	docker compose -f docker-compose.cloudbeaver.yml -p $(PROJECT_NAME) up -d

stop-cloudbeaver:
	docker compose -f docker-compose.cloudbeaver.yml -p $(PROJECT_NAME) down

start-minio:
    docker compose -f docker-compose.minio.yml --env-file .env.minio -p $(PROJECT_NAME) up -d

stop-minio:
    docker compose -f docker-compose.minio.yml --env-file .env.minio -p $(PROJECT_NAME) down

clean-minio:
    docker compose -f docker-compose.minio.yml --env-file .env.minio -p $(PROJECT_NAME) down -v