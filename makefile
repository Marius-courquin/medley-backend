# Makefile

DC_COMP_DEPS:= ./docker/deps-docker-compose.yml

deps-up:
	docker-compose -f $(DC_COMP_DEPS) up -d

deps-down:
	docker-compose -f $(DC_COMP_DEPS) down

deps-logs:
	docker-compose -f $(DC_COMP_DEPS) logs -f

deps-clean:
	docker-compose -f $(DC_COMP_DEPS) down -v

deps-reset: deps-clean deps-up

