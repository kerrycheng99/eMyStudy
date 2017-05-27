-- =========================================
-- 系统名  ： 	在线学习系统 eMyStudy
-- 业务组名：	试题测试
-- 数据表名：	ExamQuestions
-- 				测试题目列表
-- =========================================
DROP TABLE if exists ExamQuestions;
CREATE TABLE ExamQuestions 
(
  ID 			INTEGER 		PRIMARY KEY  NOT NULL 
, Grad 			VARCHAR(10)
, Term 			VARCHAR(10)
, Subj 			VARCHAR(10)
, Qtyp 			VARCHAR(10)
, Qbod 			NVARCHAR(1000)
, Qopt 			NVARCHAR(1000)
, Qans 			NVARCHAR(300)
, Qlev 			INTEGER  			NOT NULL  DEFAULT(0)
--, CreDate 		DATE 			NOT NULL  DEFAULT (datetime('now'))
--, ChgDate 		DATE 			NOT NULL  DEFAULT (datetime('now'))
--, UpdUser 		VARCHAR(10) 								
--, UpdCntr 		INTEGER
--, CONSTRAINT 	ExamQuestions_Idx1 	PRIMARY KEY (ID)
);
CREATE INDEX ExamQuestions_Idx2 ON ExamQuestions (Subj ASC);
CREATE INDEX ExamQuestions_Idx3 ON ExamQuestions (Qtyp ASC);
