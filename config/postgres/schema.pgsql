-- schema

CREATE TABLE `distance_increment`(
    `distance_increments_id` BIGINT NOT NULL PRIMARY KEY,
    `method` VARCHAR(100) NOT NULL,
    `increment` INT NOT NULL,
    `transportation_record` BIGINT NOT NULL,
);

CREATE TABLE `transportation_record`(
    `transportation_record_id` BIGINT NOT NULL PRIMARY KEY,
    `timestamp` TIMESTAMP NULL,
);


-- initial data


INSERT INTO `transportation_record`(`transportation_record_id`, `timestamp`)
VALUES
(1, '2019-01-01 00:00:00');


INSERT INTO `distance_increment`(`distance_increments_id`, `method`, `increment`, `transportation_record`) 
VALUES
(1, 'walking', 1, 1),
(2, 'walking', 1, 1);