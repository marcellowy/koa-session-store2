-- Please fill the table name
-- MySQL 5.8 or greater
CREATE TABLE `t_` (
  `Fauto_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `Fkey` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT 'session unique key',
  `FmaxAge` bigint(20) unsigned NOT NULL DEFAULT 0 COMMENT 'session max age',
  `Fsess` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'session value',
  `Fexpires_time` INT(10) UNSIGNED NOT NULL DEFAULT NOW() COMMENT 'session expires time',
  `Fcreate_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'session create time',
  `Fupdate_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE current_timestamp() COMMENT 'session update time',
  PRIMARY KEY (`Fauto_id`),
  UNIQUE KEY `key` (`Fkey`),
  UNIQUE KEY `key_expires` (`Fkey`, `Fexpires_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='session table';

-- Please fill the table name
-- Other
CREATE TABLE `t_` (
  `Fauto_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `Fkey` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT 'session unique key',
  `FmaxAge` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT 'session max age',
  `Fsess` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'session value',
  `Fexpires_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'session expires time',
  `Fcreate_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'session create time',
  `Fupdate_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'session update time',
  PRIMARY KEY (`Fauto_id`),
  UNIQUE KEY `key` (`Fkey`),
  UNIQUE KEY `key_expires` (`Fkey`,`Fexpires_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='session table'