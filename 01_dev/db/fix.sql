update EnWords set Pron='' where Pron is null;
update EnWords set IsWt='' where IsWt is null;
update EnWords set Catg='' where Catg is null;

update CnPhrases set Word='' where Word is null;
update CnPhrases set Piny='' where Piny is null;
update CnPhrases set Mean='' where Mean is null;
update CnPhrases set IsWt='' where IsWt is null;

update ExamQuestions set Qopt='' where Qopt is null;
update ExamQuestions set Qans='' where Qans is null;
update ExamQuestions set Qlev='' where Qlev is null;