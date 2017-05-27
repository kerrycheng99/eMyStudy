-- =========================================
-- 系统名  ： 	在线学习系统 eMyStudy
-- 业务组名：	基础信息
-- 数据表名：	SysDictionary
-- 				系统字典
-- =========================================
DROP TABLE if exists SysDictionary;
CREATE TABLE SysDictionary 
(
 DicCatgCd 		VARCHAR(30) 	NOT NULL  DEFAULT ('') 		--字典分类
,DicKeys 		NVARCHAR(50) 	NOT NULL  DEFAULT ('') 		--项目代码
,DicKeys02 		NVARCHAR(50) 	NOT NULL  DEFAULT ('*') 	--项目代码02
,DicValues 		NVARCHAR(50) 	NOT NULL  DEFAULT ('') 		--项目名称
,SortIndex 		INTEGER 		NOT NULL  DEFAULT (0) 		--排序值
,IsDefault 		VARCHAR(1) 		NOT NULL  DEFAULT ('N') 	--默认值否 Y/N
,Remarks 		NVARCHAR(50) 								--备注
,CreDate 		DATE 			NOT NULL  DEFAULT (datetime('now'))
,ChgDate 		DATE 			NOT NULL  DEFAULT (datetime('now'))
,UpdUser 		VARCHAR(10) 								
,UpdCntr 		INTEGER
);
CREATE UNIQUE INDEX SysDictionary_Idx1 ON SysDictionary (DicCatgCd ASC, DicKeys ASC, DicKeys02 ASC);