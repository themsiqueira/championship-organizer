FROM postgres

COPY db.sh /docker-entrypoint-initdb.d/init-db.sh
