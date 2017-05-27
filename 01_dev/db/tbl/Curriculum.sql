-- =========================================
-- 系统名  ： 	在线学习系统 eMyStudy
-- 业务组名：	课程表
-- 数据表名：	Curriculum
-- 				用户课程表
-- =========================================
DROP TABLE if exists Curriculum;
CREATE TABLE Curriculum 
(
  ID 			INTEGER 		PRIMARY KEY  NOT NULL 
, UserCd 		VARCHAR(30) 	NOT NULL  DEFAULT ('*') 	--用户ID
, LessonsID 	INTEGER 		NOT NULL  DEFAULT (0) 		--用户课程节次
, Mon 			NVARCHAR(50)								--周一课程
, Tue 			NVARCHAR(50)
, Wed 			NVARCHAR(50)
, Thu 			NVARCHAR(50)
, Fri 			NVARCHAR(50)
, Sat 			NVARCHAR(50)
, Sun 			NVARCHAR(50)
, CreDate 		DATE 			NOT NULL  DEFAULT (datetime('now'))
, ChgDate 		DATE 			NOT NULL  DEFAULT (datetime('now'))
, UpdUser 		VARCHAR(10) 								
, UpdCntr 		INTEGER
--, CONSTRAINT 	Curriculum_Idx1 	PRIMARY KEY (ID)
);
CREATE INDEX Curriculum_Idx2 ON Curriculum (UserCD ASC);

