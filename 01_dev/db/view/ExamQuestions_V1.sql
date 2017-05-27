CREATE VIEW "ExamQuestions_V1" AS SELECT 
 E.ID, E.Grad AS GradCd, E.Term As TermCd
,E.Subj As SubjCd, E.Qtyp AS QtypCd, E.Qlev AS QlevCd
,D1.DicValues AS Grad
,D2.DicValues AS Term
,D3.DicValues AS Subj
,D4.DicValues AS Qtyp
,E.Qbod ,E.Qopt ,E.Qans 
,D5.DicValues AS QLev
FROM ExamQuestions E
LEFT JOIN SysDictionary D1 ON D1.DicCatgCd='GRADE'    AND D1.DicKeys = E.Grad
LEFT JOIN SysDictionary D2 ON D2.DicCatgCd='TERM'     AND D2.DicKeys = E.Term
LEFT JOIN SysDictionary D3 ON D3.DicCatgCd='EXAMSUBJ' AND D3.DicKeys = E.Subj
LEFT JOIN SysDictionary D4 ON D4.DicCatgCd='EXAMTYPE'   AND D4.DicKeys = E.Subj AND D4.DicKeys02 = E.QTyp
LEFT JOIN SysDictionary D5 ON D5.DicCatgCd='DEGREE'   AND D5.DicKeys = E.QLev
WHERE 1=1
ORDER BY E.ID