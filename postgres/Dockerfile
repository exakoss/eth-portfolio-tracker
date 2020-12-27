FROM postgres:latest

ENV POSTGRES_USER docker
ENV POSTGRES_PASSWORD docker
ENV POSTGRES_DB docker
EXPOSE 5432
ADD CreateDB.sql /docker-entrypoint-initdb.d/
VOLUME /var/lib/postgresql/data
