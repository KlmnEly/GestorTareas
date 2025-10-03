CREATE TABLE roles (
	id_role SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL UNIQUE,
	is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE document_types (
	id_document_type SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL UNIQUE,
	is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE task_status (
	id_task_status SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL UNIQUE,
	is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE accesses (
	id_access SERIAL PRIMARY KEY,
	role_id INT DEFAULT 1,
	username VARCHAR(50) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,

	CONSTRAINT fk_role
		FOREIGN KEY (role_id)
		REFERENCES roles (id_role)
);

CREATE TABLE users (
	id_user SERIAL PRIMARY KEY,
	access_id INT,
	document_type_id INT NOT NULL,
	fullname VARCHAR(255) NOT NULL,
	document_number VARCHAR(20) NOT NULL UNIQUE,
	email VARCHAR(100) NOT NULL UNIQUE,
	is_active BOOLEAN DEFAULT TRUE,

	CONSTRAINT fk_access
		FOREIGN KEY (access_id)
		REFERENCES accesses (id_access),

	CONSTRAINT fk_document_type
		FOREIGN KEY (document_type_id)
		REFERENCES document_types (id_document_type)
);


CREATE TABLE tasks (
	id_task SERIAL PRIMARY KEY,
	user_id INT NOT NULL,
	task_status_id INT DEFAULT 1,
	name VARCHAR(255) NOT NULL,
	description TEXT,
	date DATE NOT NULL,
	is_active BOOLEAN DEFAULT TRUE,
	
	CONSTRAINT fk_user
		FOREIGN KEY (user_id)
		REFERENCES users (id_user),

	CONSTRAINT fk_task_status
		FOREIGN KEY (task_status_id)
		REFERENCES task_status (id_task_status)
);