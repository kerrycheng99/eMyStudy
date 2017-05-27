CREATE VIEW "CnPhrases_V1" AS SELECT 
 C.ID, C.Grad AS GradCd, C.Term AS TermCd, C.Unit AS UnitCd, C.Lesn AS LesnCd
,D1.DicValues AS Grad
,D2.DicValues AS Term
,D4.DicValues AS Unit
,C.Word ,C.Piny ,C.Mean ,C.Iswt
FROM CnPhrases C
LEFT JOIN SysDictionary D1 ON D1.DicCatgCd='GRADE'  AND D1.DicKeys = C.Grad
LEFT JOIN SysDictionary D2 ON D2.DicCatgCd='TERM'   AND D2.DicKeys = C.Term
LEFT JOIN SysDictionary D4 ON D4.DicCatgCd='CNUNIT' AND D4.DicKeys = C.Unit
WHERE 1=1
ORDER BY C.Grad, C.Term, C.Unit, CAST(C.Lesn AS INT), C.ID