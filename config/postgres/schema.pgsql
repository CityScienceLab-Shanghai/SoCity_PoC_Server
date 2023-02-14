-- schema

CREATE TABLE distance_increment(
    distance_increments_id BIGINT NOT NULL PRIMARY KEY,
    method VARCHAR(100) NOT NULL,
    increment INT NOT NULL,
    transportation_record BIGINT NOT NULL
);

CREATE TABLE transportation_record(
    transportation_record_id BIGINT NOT NULL PRIMARY KEY,
    timestamp TIMESTAMP NULL
);


-- initial data
