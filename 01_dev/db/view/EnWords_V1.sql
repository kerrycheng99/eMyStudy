CREATE VIEW "EnWords_V1" AS SELECT 
 E.ID, E.Grad AS GradCd, E.Term AS TermCd, E.Modu AS ModuCd, E.Unit AS UnitCd
,D1.DicValues AS Grad
,D2.DicValues AS Term
,D3.DicValues AS Modu
,D4.DicValues AS Unit
,E.Word ,E.Pron ,E.Mean ,E.Iswt
FROM EnWords E
LEFT JOIN SysDictionary D1 ON D1.DicCatgCd='GRADE'  AND D1.DicKeys = E.Grad
LEFT JOIN SysDictionary D2 ON D2.DicCatgCd='TERM'   AND D2.DicKeys = E.Term
LEFT JOIN SysDictionary D3 ON D3.DicCatgCd='MODULE' AND D3.DicKeys = E.Modu
LEFT JOIN SysDictionary D4 ON D4.DicCatgCd='UNIT'   AND D4.DicKeys = E.Unit
WHERE 1=1
ORDER BY E.ID