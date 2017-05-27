CREATE VIEW "UserLessons_V1" AS SELECT
 L.ID, L.UserCd, D2.DicValues AS Interval, D1.DicValues AS LessonNo
,L.SortIndex, L.IsValid
FROM Lessons L
LEFT JOIN SysDictionary D1 ON D1.DicCatgCd='LESSONNO' AND D1.DicKeys=L.LessonNo
LEFT JOIN SysDictionary D2 ON D2.DicCatgCd='INTERVAL' AND D2.DicKeys=L.Interval
WHERE 1=1
AND L.IsValid = 'Y'
ORDER BY L.SortIndex ASC