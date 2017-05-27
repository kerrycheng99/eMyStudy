CREATE VIEW "UserTimeTable_V1" AS SELECT 
 C.ID, C.UserCd, C.LessonsID  
,DI.DicValues AS Interval, DL.DicValues AS LessonNO
,D1.DicValues AS MON ,D2.DicValues AS TUE
,D3.DicValues AS WED ,D4.DicValues AS THU
,D5.DicValues AS FRI
,D6.DicValues AS SAT ,D7.DicValues AS SUN
FROM Curriculum C
INNER JOIN Lessons L on L.ID = C.LessonsID
LEFT JOIN SysDictionary DI ON DI.DicCatgCd='INTERVAL' AND DI.DicKeys = L.Interval
LEFT JOIN SysDictionary DL ON DL.DicCatgCd='LESSONNO' AND DL.DicKeys=L.LessonNo
LEFT JOIN SysDictionary D1 ON D1.DicCatgCd='SUBJECTS' AND D1.DicKeys = C.MON
LEFT JOIN SysDictionary D2 ON D2.DicCatgCd='SUBJECTS' AND D2.DicKeys = C.TUE
LEFT JOIN SysDictionary D3 ON D3.DicCatgCd='SUBJECTS' AND D3.DicKeys = C.WED
LEFT JOIN SysDictionary D4 ON D4.DicCatgCd='SUBJECTS' AND D4.DicKeys = C.THU
LEFT JOIN SysDictionary D5 ON D5.DicCatgCd='SUBJECTS' AND D5.DicKeys = C.FRI
LEFT JOIN SysDictionary D6 ON D6.DicCatgCd='SUBJECTS' AND D6.DicKeys = C.SAT
LEFT JOIN SysDictionary D7 ON D7.DicCatgCd='SUBJECTS' AND D7.DicKeys = C.SUN
WHERE 1=1
AND L.IsValid = 'Y'
ORDER BY C.LessonsID