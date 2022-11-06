CREATE DATABASE web_app;
USE web_app;

create table names(
id int not null auto_increment primary key,
name varchar(100) not null,
date_added datetime)
USE web_app;


drop table names



CREATE USER 'tutorial'@'localhost' IDENTIFIED BY 'password123';

GRANT SELECT, INSERT, DELETE ON web_app.* TO 'tutorial'@'localhost';
SHOW GRANTS FOR 'tutorial'@'localhost';


/*To fix 
ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; 
consider upgrading MySQL client
*/
CREATE USER 'project1_user'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON *.* TO 'project1_user'@'localhost';
ALTER USER 'project1_user'@'localhost' IDENTIFIED WITH mysql_native_password by 'password123';


FLUSH PRIVILEGES;
UPDATE mysql.user SET plugin = 'password123'
where USER = 'tutorial' AND HOST = 'localhost



FLUSH PRIVILEGES;

ALTER USER 'project1_user'@'localhost' IDENTIFIED WITH mysql_native_password by 'password123';


drop user 'web_app'@'localhost';



select * from names


