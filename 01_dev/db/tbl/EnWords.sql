-- =========================================
-- 系统名  ： 	在线学习系统 eMyStudy
-- 业务组名：	英语单词学习
-- 数据表名：	EnWords
-- 				英语单词列表
-- 2015.04.01 add [Catg]
-- =========================================
DROP TABLE if exists EnWords;
CREATE TABLE EnWords 
(
  ID 			INTEGER 		PRIMARY KEY  NOT NULL 
, Grad 			VARCHAR(10)
, Term 			VARCHAR(10)
, Modu 			VARCHAR(10)
, Unit 			VARCHAR(10)
, Word 			NVARCHAR(100)
, Pron 			NVARCHAR(100)
, Mean 			NVARCHAR(300)
, Catg 			VARCHAR(10)		NULL  DEFAULT('')
, IsWt 			VARCHAR(1) 		NULL  DEFAULT('')
--, CreDate 		DATE 			NOT NULL  DEFAULT (datetime('now'))
--, ChgDate 		DATE 			NOT NULL  DEFAULT (datetime('now'))
--, UpdUser 		VARCHAR(10) 								
--, UpdCntr 		INTEGER
--, CONSTRAINT 	EnWords_Idx1 	PRIMARY KEY (ID)
);
CREATE INDEX EnWords_Idx2 ON EnWords (Word ASC);
