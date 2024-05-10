# Makefile

DC_COMP_DEPS:= ./docker/deps-docker-compose.yml
PROJECT_NAME=medley

deps-up:
	docker-compose -f $(DC_COMP_DEPS) --env-file .env -p $(PROJECT_NAME) up -d

deps-down:
	docker-compose -f $(DC_COMP_DEPS) --env-file .env -p $(PROJECT_NAME) down

deps-logs:
	docker-compose -f $(DC_COMP_DEPS) --env-file .env -p $(PROJECT_NAME) logs -f

deps-clean:
	docker-compose -f $(DC_COMP_DEPS) --env-file .env -p $(PROJECT_NAME) down -v

deps-reset: deps-clean deps-up

