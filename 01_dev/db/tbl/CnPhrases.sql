-- =========================================
-- 系统名  ： 	在线学习系统 eMyStudy
-- 业务组名：	语文学习
-- 数据表名：	CnPhrases
-- 				语文词语列表
-- =========================================
DROP TABLE if exists CnPhrases;
CREATE TABLE CnPhrases 
(
  ID 			INTEGER 		PRIMARY KEY  NOT NULL 
, Grad 			VARCHAR(10)
, Term 			VARCHAR(10)
, Unit 			VARCHAR(10)
, Lesn			VARCHAR(10)
, Word 			NVARCHAR(100)
, Piny 			NVARCHAR(100)
, Mean 			NVARCHAR(300)
, IsWt 			VARCHAR(1) 		NULL  DEFAULT('')
--, CreDate 		DATE 			NOT NULL  DEFAULT (datetime('now'))
--, ChgDate 		DATE 			NOT NULL  DEFAULT (datetime('now'))
--, UpdUser 		VARCHAR(10) 								
--, UpdCntr 		INTEGER
--, CONSTRAINT 	CnPhrases_Idx1 	PRIMARY KEY (ID)
);
CREATE INDEX CnPhrases_Idx2 ON CnPhrases (Word ASC);
