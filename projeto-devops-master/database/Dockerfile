FROM mysql:8.0
COPY init.sql /docker-entrypoint-initdb.d/
ENV MYSQL_ROOT_PASSWORD=root_password
ENV MYSQL_DATABASE=devops_db
ENV MYSQL_USER=devops_user
ENV MYSQL_PASSWORD=devops_password
EXPOSE 3306