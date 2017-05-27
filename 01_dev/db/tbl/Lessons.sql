-- =========================================
-- 系统名  ： 	在线学习系统 eMyStudy
-- 业务组名：	课程表
-- 数据表名：	Lessons
-- 				用户课程节次
-- =========================================
DROP TABLE if exists Lessons;
CREATE TABLE Lessons 
(
  ID 			INTEGER 		PRIMARY KEY  NOT NULL 
, UserCd 		VARCHAR(30) 	NOT NULL  DEFAULT ('*') 	--用户ID
, Interval 		NVARCHAR(50) 	NOT NULL  DEFAULT ('') 		--时间段
, LessonNo 		NVARCHAR(50) 	NOT NULL  DEFAULT ('') 		--节次
, SortIndex 	INTEGER 		NOT NULL  DEFAULT (0) 		--排序值
, IsValid 		VARCHAR(1) 		NOT NULL  DEFAULT ('N') 	--有效否 Y/N
, CreDate 		DATE 			NOT NULL  DEFAULT (datetime('now'))
, ChgDate 		DATE 			NOT NULL  DEFAULT (datetime('now'))
, UpdUser 		VARCHAR(10) 								
, UpdCntr 		INTEGER
--, CONSTRAINT 	Lesson_Idx1 	PRIMARY KEY (ID)
);
CREATE INDEX Lessons_Idx2 ON Lessons (UserCD ASC);
