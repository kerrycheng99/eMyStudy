-- =========================================
-- 系统名  ： 	在线学习系统 eMyStudy
-- 业务组名：	基础信息
-- 数据表名：	SysParameter
-- 				系统参数
-- =========================================
DROP TABLE if exists SysParameter;
CREATE TABLE SysParameter 
(
 ParaCatgCd 	VARCHAR(30) 	NOT NULL  DEFAULT ('') 		--参数分类
,ParaKeys 		NVARCHAR(50) 	NOT NULL  DEFAULT ('') 		--参数代码
,ParaValues 	NVARCHAR(50) 	NOT NULL  DEFAULT ('') 		--参数名称
,SortIndex 		INTEGER 		NOT NULL  DEFAULT (0) 		--排序值
,Remarks 		NVARCHAR(50) 								--备注
,CreDate 		DATE 			NOT NULL  DEFAULT (datetime('now'))
,ChgDate 		DATE 			NOT NULL  DEFAULT (datetime('now'))
,UpdUser 		VARCHAR(10) 								
,UpdCntr 		INTEGER
);
CREATE UNIQUE INDEX SysParameter_Idx1 ON SysParameter (ParaCatgCd ASC, ParaKeys ASC);