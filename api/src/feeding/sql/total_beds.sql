select * from (

 SELECT TO_CHAR(CD_UNID_INT) as CD_UNID_INT,
 DS_UNID_INT,
 (CASE WHEN (CD_UNID_INT=5 OR CD_UNID_INT=22 or CD_UNID_INT = 19) AND LEITOS_EXTRAS_OCUPADOS =0 THEN 0
 ELSE
 CASE WHEN LEITOS_EXTRAS_OCUPADOS >0 THEN TOH_DIARIA
 ELSE
 CASE WHEN (CD_UNID_INT <> 5 OR CD_UNID_INT <>19 ) THEN TOH_DIARIA 
 END
 END
 END )|| '%' AS TOH_ON_LINE,
 (CASE WHEN (CD_UNID_INT=5 OR CD_UNID_INT=22 OR CD_UNID_INT = 19) 
 AND LEITOS_EXTRAS_OCUPADOS =0 THEN '<IMG SRC="/PAINEL/IMG/PAINEL/mostra_perc0.gif">'
 ELSE GRAF
 END ) GRAF,
 TO_CHAR(PAC_INT_00H) PAC_INT_00H,
 TO_CHAR(ENT_INTERNADOS) ENT_INTERNADOS,
 TO_CHAR(LEITOS_DIA) LEITOS_DIA,
 TO_CHAR(LEITOS_OPERACIONAIS) LEITOS_OPERACIONAIS,
 TO_CHAR(LEITOS_EXTRAS_OCUPADOS) LEITOS_EXTRAS_OCUPADOS,
 TO_CHAR(LEITOS_BLOQUEADOS) LEITOS_BLOQUEADOS,
 LEITOS_INSTALADOS,
 TO_CHAR(LEITOS_OCUPADOS) LEITOS_OCUPADOS,
 TO_CHAR(QTD_ALTAS) QTD_ALTAS,
 TO_CHAR(QTD_ALTAS_OBITO) QTD_ALTAS_OBITO,
 TO_CHAR(QTD_ALTAS_HOSPITALAR) QTD_ALTAS_HOSPITALAR,
 TO_CHAR(QTD_ALTAS_TRANS) QTD_ALTAS_TRANS,
 TO_CHAR(ENT_TRANSF) TRANS_INT
 FROM ( 


 SELECT CD_UNID_INT,
 DS_UNID_INT,
 (CASE WHEN (CD_UNID_INT=5 OR CD_UNID_INT=22 OR CD_UNID_INT = 19 ) 
 THEN 100
 ELSE ROUND( DECODE(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS),0,0,
 SUM(LEITOS_OCUPADOS)/(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS)))* 100,2) 
 END ) TOH_DIARIA,
 CASE WHEN (CD_UNID_INT=5 OR CD_UNID_INT=22 or CD_UNID_INT = 19) THEN '<IMG SRC="/PAINEL/IMG/PAINEL/mostra_perc0100.gif">'
 WHEN (DECODE(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS),0,0,SUM(LEITOS_OCUPADOS)/(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS)))*100) = 0 THEN '<img src="../img/dash/mostra_perc0.gif" >'
 WHEN (DECODE(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS),0,0,SUM(LEITOS_OCUPADOS)/(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS)))*100) > 0 AND 
 (DECODE(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS),0,0,SUM(LEITOS_OCUPADOS)/(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS)))*100) <=10 THEN '<IMG SRC="/PAINEL/IMG/PAINEL/mostra_perc010.gif">' 
 WHEN (DECODE(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS),0,0,SUM(LEITOS_OCUPADOS)/(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS)))*100) > 10 AND 
 (DECODE(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS),0,0,SUM(LEITOS_OCUPADOS)/(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS)))*100) <=20 THEN '<IMG SRC="/PAINEL/IMG/PAINEL/mostra_perc020.gif">'
 WHEN (DECODE(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS),0,0,SUM(LEITOS_OCUPADOS)/(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS)))*100) > 20 AND 
 (DECODE(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS),0,0,SUM(LEITOS_OCUPADOS)/(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS)))*100) <=30 THEN '<IMG SRC="/PAINEL/IMG/PAINEL/mostra_perc030.gif">'
 WHEN (DECODE(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS),0,0,SUM(LEITOS_OCUPADOS)/(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS)))*100) > 30 AND 
 (DECODE(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS),0,0,SUM(LEITOS_OCUPADOS)/(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS)))*100) <=40 THEN '<IMG SRC="/PAINEL/IMG/PAINEL/mostra_perc040.gif">'
 WHEN (DECODE(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS),0,0,SUM(LEITOS_OCUPADOS)/(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS)))*100) > 40 AND 
 (DECODE(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS),0,0,SUM(LEITOS_OCUPADOS)/(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS)))*100) <=50 THEN '<IMG SRC="/PAINEL/IMG/PAINEL/mostra_perc050.gif">'
 WHEN (DECODE(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS),0,0,SUM(LEITOS_OCUPADOS)/(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS)))*100) > 50 AND 
 (DECODE(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS),0,0,SUM(LEITOS_OCUPADOS)/(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS)))*100) <=60 THEN '<IMG SRC="/PAINEL/IMG/PAINEL/mostra_perc050.gif">'
 WHEN (DECODE(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS),0,0,SUM(LEITOS_OCUPADOS)/(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS)))*100) > 60 AND 
 (DECODE(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS),0,0,SUM(LEITOS_OCUPADOS)/(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS)))*100) <=70 THEN '<IMG SRC="/PAINEL/IMG/PAINEL/mostra_perc060.gif">'
 WHEN (DECODE(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS),0,0,SUM(LEITOS_OCUPADOS)/(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS)))*100) > 70 AND 
 (DECODE(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS),0,0,SUM(LEITOS_OCUPADOS)/(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS)))*100) <=80 THEN '<IMG SRC="/PAINEL/IMG/PAINEL/mostra_perc070.gif">'
 WHEN (DECODE(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS),0,0,SUM(LEITOS_OCUPADOS)/(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS)))*100) > 80 AND 
 (DECODE(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS),0,0,SUM(LEITOS_OCUPADOS)/(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS)))*100) <=90 THEN '<IMG SRC="/PAINEL/IMG/PAINEL/mostra_perc080.gif">'
 WHEN (DECODE(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS),0,0,SUM(LEITOS_OCUPADOS)/(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS)))*100) > 90 AND 
 (DECODE(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS),0,0,SUM(LEITOS_OCUPADOS)/(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS)))*100) <=100 THEN '<IMG SRC="/PAINEL/IMG/PAINEL/mostra_perc090.gif">'
 WHEN (DECODE(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS),0,0,SUM(LEITOS_OCUPADOS)/(SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS)))*100) > 95 THEN '<IMG SRC="/PAINEL/IMG/PAINEL/mostra_perc0100.gif">' 
 END GRAF, 
 SUM(PAC_INT_00H) PAC_INT_00H,
 SUM(ENT_INTERNADOS) ENT_INTERNADOS,
 SUM(LEITOS_EXTRAS_OCUPADOS)+SUM(LEITOS_OPERACIONAIS) LEITOS_DIA,
 SUM(LEITOS_OPERACIONAIS) LEITOS_OPERACIONAIS,
 SUM(LEITOS_EXTRAS_OCUPADOS) LEITOS_EXTRAS_OCUPADOS,
 SUM(LEITOS_BLOQUEADOS) LEITOS_BLOQUEADOS,
 SUM(LEITOS_OPERACIONAIS)+SUM(LEITOS_BLOQUEADOS) LEITOS_INSTALADOS,
 SUM(LEITOS_OCUPADOS) LEITOS_OCUPADOS,
 SUM(QTD_ALTAS) QTD_ALTAS,
 SUM(QTD_ALTAS_OBITO) QTD_ALTAS_OBITO,
 SUM(QTD_ALTAS_HOSPITALAR) QTD_ALTAS_HOSPITALAR,
 SUM(QTD_ALTAS_TRANS) QTD_ALTAS_TRANS,
 SUM(ENT_TRANSF) ENT_TRANSF
 FROM (
 
 
 
 
 
 
 
 
 
 
 SELECT UNID_INT.CD_UNID_INT CD_UNID_INT,
 UNID_INT.DS_UNID_INT,
 COUNT(*) PAC_INT_00H,
 0 ENT_INTERNADOS,
 0 LEITOS_OPERACIONAIS,
 0 LEITOS_EXTRAS_OCUPADOS,
 0 LEITOS_BLOQUEADOS,
 0 LEITOS_OCUPADOS,
 0 QTD_ALTAS,
 0 QTD_ALTAS_OBITO,
 0 QTD_ALTAS_HOSPITALAR,
 0 QTD_ALTAS_TRANS,
 0 ENT_TRANSF
 FROM DBAMV.MOV_INT,
 DBAMV.UNID_INT,
 DBAMV.LEITO,
 DBAMV.ATENDIME,
 DBAMV.CONVENIO,
 (SELECT TO_DATE(SYSDATE, 'dd/mm/rrrr') - 1 + ROWNUM DATA
 FROM DBAMV.CID
 WHERE (TO_DATE(SYSDATE, 'dd/mm/rrrr') - 1) + ROWNUM <= TO_DATE(SYSDATE, 'dd/mm/rrrr')) CONTADOR
 WHERE TRUNC(DT_MOV_INT) <= CONTADOR.DATA - 1
 AND TRUNC(NVL(DT_LIB_MOV, SYSDATE)) > CONTADOR.DATA - 1
 AND TP_MOV IN ('O', 'I')
 AND LEITO.CD_UNID_INT = UNID_INT.CD_UNID_INT
 AND MOV_INT.CD_ATENDIMENTO = ATENDIME.CD_ATENDIMENTO
 AND (ATENDIME.TP_ATENDIMENTO IN ('I', 'H', 'U'))
 AND MOV_INT.CD_LEITO = LEITO.CD_LEITO
 AND ATENDIME.CD_CONVENIO = CONVENIO.CD_CONVENIO
 AND ATENDIME.CD_MULTI_EMPRESA = 1
 --AND NVL(DBAMV.F_VALIDA_DATA_HOSPITAL_DIA('N',CONTADOR.DATA),'N') = 'S'
 AND UNID_INT.CD_UNID_INT NOT IN (21,1)
 GROUP BY UNID_INT.CD_UNID_INT, 
 UNID_INT.DS_UNID_INT
 
 UNION ALL

 SELECT UNID_INT.CD_UNID_INT CD_UNID_INT,
 UNID_INT.DS_UNID_INT,
 0 PAC_INT_00H,
 COUNT(*) ENT_INTERNADOS,
 0 LEITOS_OPERACIONAIS,
 0 LEITOS_EXTRAS_OCUPADOS,
 0 LEITOS_BLOQUEADOS,
 0 LEITOS_OCUPADOS,
 0 QTD_ALTAS,
 0 QTD_ALTAS_OBITO,
 0 QTD_ALTAS_HOSPITALAR,
 0 QTD_ALTAS_TRANS,
 0 ENT_TRANSF
 FROM DBAMV.ATENDIME,
 DBAMV.UNID_INT,
 DBAMV.LEITO,
 DBAMV.MOV_INT,
 DBAMV.CONVENIO,
 (SELECT TO_DATE(SYSDATE, 'dd/mm/rrrr') - 1 + ROWNUM DATA
 FROM DBAMV.CID
 WHERE (TO_DATE(SYSDATE, 'dd/mm/rrrr') - 1) + ROWNUM <= TO_DATE(SYSDATE, 'dd/mm/rrrr')) CONTADOR
 WHERE LEITO.CD_UNID_INT = UNID_INT.CD_UNID_INT
 AND LEITO.CD_LEITO = MOV_INT.CD_LEITO
 AND TRUNC(DT_MOV_INT) = TRUNC(CONTADOR.DATA)
 AND MOV_INT.TP_MOV = 'I'
 AND ATENDIME.CD_ATENDIMENTO = MOV_INT.CD_ATENDIMENTO
 AND (ATENDIME.TP_ATENDIMENTO IN ('I', 'H', 'U'))
 AND NOT EXISTS (SELECT 'X'
 FROM DBAMV.MOV_INT MI
 WHERE MI.CD_ATENDIMENTO = MOV_INT.CD_ATENDIMENTO
 AND TO_DATE(TO_CHAR(MI.DT_MOV_INT, 'dd/mm/yyyy') || TO_CHAR(MI.HR_MOV_INT, 'hh24:miss'), 'dd/mm/yyyy hh24:miss') <
 TO_DATE(TO_CHAR(MOV_INT.DT_MOV_INT, 'dd/mm/yyyy') || TO_CHAR(MOV_INT.HR_MOV_INT, 'hh24:miss'), 'dd/mm/yyyy hh24:miss')
 AND MI.CD_LEITO = MOV_INT.CD_LEITO
 AND MI.CD_TIP_ACOM <> MOV_INT.CD_TIP_ACOM
 AND NVL(MI.CD_LEITO_ANTERIOR, MI.CD_LEITO) = NVL(MOV_INT.CD_LEITO_ANTERIOR, MOV_INT.CD_LEITO))
 AND ATENDIME.CD_CONVENIO = CONVENIO.CD_CONVENIO
 --AND NVL(DBAMV.F_VALIDA_DATA_HOSPITAL_DIA('N',CONTADOR.DATA), 'N') = 'S'
 AND ATENDIME.CD_MULTI_EMPRESA = 1
 GROUP BY UNID_INT.CD_UNID_INT, 
 UNID_INT.DS_UNID_INT
 
 UNION ALL
 
 SELECT UNID_INT.CD_UNID_INT,
 UNID_INT.DS_UNID_INT,
 0 PAC_INT_00H,
 0 ENT_INTERNADOS,
 CASE WHEN UNID_INT.CD_UNID_INT=23 OR UNID_INT.CD_UNID_INT=29 OR UNID_INT.CD_UNID_INT=30 THEN 0 ELSE COUNT(*) END LEITOS_OPERACIONAIS,
 0 LEITOS_EXTRAS_OCUPADOS,
 0 LEITOS_BLOQUEADOS,
 0 LEITOS_OCUPADOS,
 0 QTD_ALTAS,
 0 QTD_ALTAS_OBITO,
 0 QTD_ALTAS_HOSPITALAR,
 0 QTD_ALTAS_TRANS,
 0 ENT_TRANSF
 FROM DBAMV.LEITO,
 DBAMV.UNID_INT
 WHERE LEITO.CD_UNID_INT = UNID_INT.CD_UNID_INT
 AND LEITO.DT_DESATIVACAO IS NULL
 AND LEITO.SN_EXTRA = 'N'
 AND LEITO.TP_OCUPACAO not in ('M','T','E')
 AND UNID_INT.CD_UNID_INT <> 1
 AND UNID_INT.DS_UNID_INT NOT LIKE '%HD%'
 GROUP BY UNID_INT.CD_UNID_INT,
 UNID_INT.DS_UNID_INT
 
 UNION ALL
 
 SELECT UNID_INT.CD_UNID_INT,
 UNID_INT.DS_UNID_INT, 
 0 PAC_INT_00H,
 0 ENT_INTERNADOS,
 0 LEITOS_OPERACIONAIS,
 COUNT(*) LEITOS_EXTRAS_OCUPADOS,
 0 LEITOS_BLOQUEADOS,
 0 LEITOS_OCUPADOS,
 0 QTD_ALTAS,
 0 QTD_ALTAS_OBITO,
 0 QTD_ALTAS_HOSPITALAR,
 0 QTD_ALTAS_TRANS,
 0 ENT_TRANSF
 FROM DBAMV.LEITO,
 DBAMV.UNID_INT
 WHERE LEITO.CD_UNID_INT = UNID_INT.CD_UNID_INT
 AND LEITO.DT_DESATIVACAO IS NULL
 AND LEITO.SN_EXTRA = 'S'
 AND LEITO.TP_OCUPACAO IN ('O', 'I', 'A')
 GROUP BY UNID_INT.CD_UNID_INT,
 UNID_INT.DS_UNID_INT
 
 UNION ALL
 
 SELECT UNID_INT.CD_UNID_INT,
 UNID_INT.DS_UNID_INT,
 0 PAC_INT_00H,
 0 ENT_INTERNADOS,
 0 LEITOS_OPERACIONAIS,
 0 LEITOS_EXTRAS_OCUPADOS,
 case when leito.cd_tip_acom = 1 and leito.cd_unid_int = 14
 then 0
 else COUNT(*) 
 end LEITOS_BLOQUEADOS,
 0 LEITOS_OCUPADOS,
 0 QTD_ALTAS,
 0 QTD_ALTAS_OBITO,
 0 QTD_ALTAS_HOSPITALAR,
 0 QTD_ALTAS_TRANS,
 0 ENT_TRANSF
 FROM DBAMV.LEITO,
 DBAMV.UNID_INT
 WHERE LEITO.CD_UNID_INT = UNID_INT.CD_UNID_INT
 AND LEITO.DT_DESATIVACAO IS NULL
 AND LEITO.TP_OCUPACAO IN('M','T','E')
 GROUP BY UNID_INT.CD_UNID_INT,
 UNID_INT.DS_UNID_INT, 
 leito.cd_tip_acom, 
 leito.cd_unid_int
 
 UNION ALL
 
 SELECT UNID_INT.CD_UNID_INT,
 UNID_INT.DS_UNID_INT,
 0 PAC_INT_00H,
 0 ENT_INTERNADOS,
 0 LEITOS_OPERACIONAIS,
 0 LEITOS_EXTRAS_OCUPADOS,
 0 LEITOS_BLOQUEADOS,
 COUNT(ATENDIME.CD_ATENDIMENTO) LEITOS_OCUPADOS,
 0 QTD_ALTAS,
 0 QTD_ALTAS_OBITO,
 0 QTD_ALTAS_HOSPITALAR,
 0 QTD_ALTAS_TRANS,
 0 ENT_TRANSF
 FROM DBAMV.ATENDIME,
 DBAMV.UNID_INT,
 DBAMV.LEITO
 WHERE ATENDIME.TP_ATENDIMENTO = 'I'
 AND ATENDIME.CD_LEITO = LEITO.CD_LEITO
 AND LEITO.CD_UNID_INT = UNID_INT.CD_UNID_INT
 AND ATENDIME.DT_ALTA IS NULL
 GROUP BY UNID_INT.CD_UNID_INT, UNID_INT.DS_UNID_INT
 
 UNION ALL
 
 SELECT UNID_INT.CD_UNID_INT CD_UNID_INT,
 UNID_INT.DS_UNID_INT,
 0 PAC_INT_00H,
 0 ENT_INTERNADOS,
 0 LEITOS_OPERACIONAIS,
 0 LEITOS_EXTRAS_OCUPADOS,
 0 LEITOS_BLOQUEADOS,
 0 LEITOS_OCUPADOS,
 COUNT(ATENDIME.CD_ATENDIMENTO) QTD_ALTAS,
 0 QTD_ALTAS_OBITO,
 0 QTD_ALTAS_HOSPITALAR,
 0 QTD_ALTAS_TRANS,
 0 ENT_TRANSF
 FROM DBAMV.ATENDIME,
 DBAMV.UNID_INT,
 DBAMV.LEITO
 WHERE ATENDIME.TP_ATENDIMENTO = 'I'
 AND ATENDIME.CD_LEITO = LEITO.CD_LEITO
 AND LEITO.CD_UNID_INT = UNID_INT.CD_UNID_INT
 AND ATENDIME.DT_ALTA IS NOT NULL
-- AND ATENDIME.DT_ATENDIMENTO = TRUNC(SYSDATE)
 AND ATENDIME.DT_ALTA = TRUNC(SYSDATE)
 GROUP BY UNID_INT.CD_UNID_INT, UNID_INT.DS_UNID_INT
 
 UNION ALL
 
 SELECT UNID_INT.CD_UNID_INT CD_UNID_INT,
 UNID_INT.DS_UNID_INT,
 0 PAC_INT_00H,
 0 ENT_INTERNADOS,
 0 LEITOS_OPERACIONAIS,
 0 LEITOS_EXTRAS_OCUPADOS,
 0 LEITOS_BLOQUEADOS,
 0 LEITOS_OCUPADOS,
 0 QTD_ALTAS,
 COUNT(ATENDIME.CD_ATENDIMENTO) QTD_ALTAS_OBITO,
 0 QTD_ALTAS_HOSPITALAR,
 0 QTD_ALTAS_TRANS,
 0 ENT_TRANSF
 FROM DBAMV.ATENDIME,
 DBAMV.UNID_INT,
 DBAMV.LEITO,
 DBAMV.MOT_ALT
 WHERE ATENDIME.TP_ATENDIMENTO = 'I'
 AND ATENDIME.CD_LEITO = LEITO.CD_LEITO
 AND LEITO.CD_UNID_INT = UNID_INT.CD_UNID_INT
 AND ATENDIME.DT_ALTA IS NOT NULL
-- AND ATENDIME.DT_ATENDIMENTO = TRUNC(SYSDATE)
 AND ATENDIME.DT_ALTA = TRUNC(SYSDATE)
 AND ATENDIME.CD_MOT_ALT=MOT_ALT.CD_MOT_ALT
 AND MOT_ALT.TP_MOT_ALTA='O'
 GROUP BY UNID_INT.CD_UNID_INT, UNID_INT.DS_UNID_INT
 
 UNION ALL
 
 SELECT UNID_INT.CD_UNID_INT CD_UNID_INT,
 UNID_INT.DS_UNID_INT,
 0 PAC_INT_00H,
 0 ENT_INTERNADOS,
 0 LEITOS_OPERACIONAIS,
 0 LEITOS_EXTRAS_OCUPADOS,
 0 LEITOS_BLOQUEADOS,
 0 LEITOS_OCUPADOS,
 0 QTD_ALTAS,
 0 QTD_ALTAS_OBITO,
 COUNT(ATENDIME.CD_ATENDIMENTO) QTD_ALTAS_HOSPITALAR,
 0 QTD_ALTAS_TRANS,
 0 ENT_TRANSF
 FROM DBAMV.ATENDIME,
 DBAMV.UNID_INT,
 DBAMV.LEITO,
 DBAMV.MOT_ALT
 WHERE ATENDIME.TP_ATENDIMENTO = 'I'
 AND ATENDIME.CD_LEITO = LEITO.CD_LEITO
 AND LEITO.CD_UNID_INT = UNID_INT.CD_UNID_INT
 AND ATENDIME.DT_ALTA IS NOT NULL
-- AND ATENDIME.DT_ATENDIMENTO = TRUNC(SYSDATE)
 AND ATENDIME.DT_ALTA = TRUNC(SYSDATE)
 AND ATENDIME.CD_MOT_ALT=MOT_ALT.CD_MOT_ALT
 AND MOT_ALT.TP_MOT_ALTA='A'
 GROUP BY UNID_INT.CD_UNID_INT, UNID_INT.DS_UNID_INT
 
 UNION ALL
 
 SELECT UNID_INT.CD_UNID_INT CD_UNID_INT,
 UNID_INT.DS_UNID_INT,
 0 PAC_INT_00H,
 0 ENT_INTERNADOS,
 0 LEITOS_OPERACIONAIS,
 0 LEITOS_EXTRAS_OCUPADOS,
 0 LEITOS_BLOQUEADOS,
 0 LEITOS_OCUPADOS,
 0 QTD_ALTAS,
 0 QTD_ALTAS_OBITO,
 0 QTD_ALTAS_HOSPITALAR,
 COUNT(ATENDIME.CD_ATENDIMENTO) QTD_ALTAS_TRANS,
 0 ENT_TRANSF
 FROM DBAMV.ATENDIME,
 DBAMV.UNID_INT,
 DBAMV.LEITO,
 DBAMV.MOT_ALT
 WHERE ATENDIME.TP_ATENDIMENTO = 'I'
 AND ATENDIME.CD_LEITO = LEITO.CD_LEITO
 AND LEITO.CD_UNID_INT = UNID_INT.CD_UNID_INT
 AND ATENDIME.DT_ALTA IS NOT NULL
-- AND ATENDIME.DT_ATENDIMENTO = TRUNC(SYSDATE)
 AND ATENDIME.DT_ALTA = TRUNC(SYSDATE)
 AND ATENDIME.CD_MOT_ALT=MOT_ALT.CD_MOT_ALT
 AND MOT_ALT.TP_MOT_ALTA='T'
 GROUP BY UNID_INT.CD_UNID_INT, UNID_INT.DS_UNID_INT
 
 UNION ALL
 
 SELECT UNID_INT.CD_UNID_INT CD_UNID_INT,
 UNID_INT.DS_UNID_INT,
 0 PAC_INT_00H,
 0 ENT_INTERNADOS,
 0 LEITOS_OPERACIONAIS,
 0 LEITOS_EXTRAS_OCUPADOS,
 0 LEITOS_BLOQUEADOS,
 0 LEITOS_OCUPADOS,
 0 QTD_ALTAS,
 0 QTD_ALTAS_OBITO,
 0 QTD_ALTAS_HOSPITALAR,
 0 QTD_ALTAS_TRANS,
 COUNT(*) ENT_TRANSF
 FROM DBAMV.MOV_INT,
 DBAMV.UNID_INT,
 DBAMV.UNID_INT UNID_INT1,
 DBAMV.LEITO,
 DBAMV.LEITO LEITO1,
 DBAMV.ATENDIME,
 DBAMV.CONVENIO,
 (SELECT (TO_DATE(TRUNC(SYSDATE),'dd/mm/rrrr') - 1) + ROWNUM DATA
 FROM DBAMV.cid
 WHERE (TO_DATE(TRUNC(SYSDATE), 'dd/mm/rrrr') - 1) + ROWNUM <= TO_DATE(TRUNC(SYSDATE), 'dd/mm/rrrr')) CONTADOR
 WHERE MOV_INT.TP_MOV = 'O'
 AND TRUNC(MOV_INT.DT_MOV_INT) = CONTADOR.DATA
 AND MOV_INT.CD_LEITO = LEITO.CD_LEITO
 AND MOV_INT.CD_LEITO_ANTERIOR = LEITO1.CD_LEITO
 AND LEITO1.CD_UNID_INT = UNID_INT1.CD_UNID_INT
 AND UNID_INT.CD_UNID_INT <> UNID_INT1.CD_UNID_INT
 AND LEITO.CD_UNID_INT = UNID_INT.CD_UNID_INT
 AND ATENDIME.CD_ATENDIMENTO = MOV_INT.CD_ATENDIMENTO
 AND (ATENDIME.TP_ATENDIMENTO IN ('I', 'H', 'U'))
 AND NOT EXISTS (SELECT 'X'
 FROM DBAMV.MOV_INT MI
 WHERE MI.CD_ATENDIMENTO = MOV_INT.CD_ATENDIMENTO
 AND TO_DATE(TO_CHAR(MI.DT_MOV_INT, 'dd/mm/yyyy') || TO_CHAR(MI.HR_MOV_INT, 'hh24:miss'), 'dd/mm/yyyyhh24:miss') <
 TO_DATE(TO_CHAR(MOV_INT.DT_MOV_INT, 'dd/mm/yyyy') || TO_CHAR(MOV_INT.HR_MOV_INT, 'hh24:miss'), 'dd/mm/yyyyhh24:miss')
 AND MI.CD_LEITO = MOV_INT.CD_LEITO
 AND MI.CD_TIP_ACOM <> MOV_INT.CD_TIP_ACOM
 AND NVL(MI.CD_LEITO_ANTERIOR, MI.CD_LEITO) = NVL(MOV_INT.CD_LEITO_ANTERIOR, MOV_INT.CD_LEITO))
 AND ATENDIME.CD_CONVENIO = CONVENIO.CD_CONVENIO
 --AND NVL(DBAMV.F_VALIDA_DATA_HOSPITAL_DIA('N', CONTADOR.DATA), 'N') = 'S'
 -- AND ATENDIME.CD_MULTI_EMPRESA = 1
 GROUP BY UNID_INT.CD_UNID_INT, UNID_INT.DS_UNID_INT 
 
 )
where CD_UNID_INT <> 19 --or <> 22
GROUP BY CD_UNID_INT, DS_UNID_INT
)
WHERE cd_unid_int NOT IN (5,22,19,1,21)
AND DS_UNID_INT NOT LIKE '%HD%'





-------------- INICIO TOTAL ------------------


UNION ALL






SELECT 'TOTAL' CD_UNID_INT,
 'TOTAL' DS_UNID_INT,
 ROUND((TRUNC(((SUM(DECODE(TIPO,'LEITO_OCUPADO', QTD,0 )))),0)) / ((TRUNC(((SUM(DECODE(TIPO,'LEITO_EXTRA_OCUPADO', QTD,0 )))),0)) + (TRUNC(((SUM(DECODE(TIPO,'LEITO_OPERACIONAL', QTD,0 )))),0)))* 100 , 2)|| '%' AS TOH_DIARIA,
 CASE 
 WHEN (ROUND((TRUNC(((SUM(DECODE(TIPO,'LEITO_OCUPADO', QTD,0 )))),0)) / ((TRUNC(((SUM(DECODE(TIPO,'LEITO_EXTRA_OCUPADO', QTD,0 )))),0)) + (TRUNC(((SUM(DECODE(TIPO,'LEITO_OPERACIONAL', QTD,0 )))),0)))* 100 , 2)) = 0 THEN '<IMG SRC="/PAINEL/IMG/PAINEL/mostra_perc0.gif">' 
 WHEN (ROUND((TRUNC(((SUM(DECODE(TIPO,'LEITO_OCUPADO', QTD,0 )))),0)) / ((TRUNC(((SUM(DECODE(TIPO,'LEITO_EXTRA_OCUPADO', QTD,0 )))),0)) + (TRUNC(((SUM(DECODE(TIPO,'LEITO_OPERACIONAL', QTD,0 )))),0)))* 100 , 2)) > 0 AND 
 (ROUND((TRUNC(((SUM(DECODE(TIPO,'LEITO_OCUPADO', QTD,0 )))),0)) / ((TRUNC(((SUM(DECODE(TIPO,'LEITO_EXTRA_OCUPADO', QTD,0 )))),0)) + (TRUNC(((SUM(DECODE(TIPO,'LEITO_OPERACIONAL', QTD,0 )))),0)))* 100 , 2)) <= 10 THEN '<IMG SRC="/PAINEL/IMG/PAINEL/mostra_perc010.gif">'
 WHEN (ROUND((TRUNC(((SUM(DECODE(TIPO,'LEITO_OCUPADO', QTD,0 )))),0)) / ((TRUNC(((SUM(DECODE(TIPO,'LEITO_EXTRA_OCUPADO', QTD,0 )))),0)) + (TRUNC(((SUM(DECODE(TIPO,'LEITO_OPERACIONAL', QTD,0 )))),0)))* 100 , 2)) > 10 AND 
 (ROUND((TRUNC(((SUM(DECODE(TIPO,'LEITO_OCUPADO', QTD,0 )))),0)) / ((TRUNC(((SUM(DECODE(TIPO,'LEITO_EXTRA_OCUPADO', QTD,0 )))),0)) + (TRUNC(((SUM(DECODE(TIPO,'LEITO_OPERACIONAL', QTD,0 )))),0)))* 100 , 2)) <= 20 THEN '<IMG SRC="/PAINEL/IMG/PAINEL/mostra_perc020.gif">'
 WHEN (ROUND((TRUNC(((SUM(DECODE(TIPO,'LEITO_OCUPADO', QTD,0 )))),0)) / ((TRUNC(((SUM(DECODE(TIPO,'LEITO_EXTRA_OCUPADO', QTD,0 )))),0)) + (TRUNC(((SUM(DECODE(TIPO,'LEITO_OPERACIONAL', QTD,0 )))),0)))* 100 , 2)) > 20 AND 
 (ROUND((TRUNC(((SUM(DECODE(TIPO,'LEITO_OCUPADO', QTD,0 )))),0)) / ((TRUNC(((SUM(DECODE(TIPO,'LEITO_EXTRA_OCUPADO', QTD,0 )))),0)) + (TRUNC(((SUM(DECODE(TIPO,'LEITO_OPERACIONAL', QTD,0 )))),0)))* 100 , 2)) <= 30 THEN '<IMG SRC="/PAINEL/IMG/PAINEL/mostra_perc030.gif">' 
 WHEN (ROUND((TRUNC(((SUM(DECODE(TIPO,'LEITO_OCUPADO', QTD,0 )))),0)) / ((TRUNC(((SUM(DECODE(TIPO,'LEITO_EXTRA_OCUPADO', QTD,0 )))),0)) + (TRUNC(((SUM(DECODE(TIPO,'LEITO_OPERACIONAL', QTD,0 )))),0)))* 100 , 2)) > 30 AND 
 (ROUND((TRUNC(((SUM(DECODE(TIPO,'LEITO_OCUPADO', QTD,0 )))),0)) / ((TRUNC(((SUM(DECODE(TIPO,'LEITO_EXTRA_OCUPADO', QTD,0 )))),0)) + (TRUNC(((SUM(DECODE(TIPO,'LEITO_OPERACIONAL', QTD,0 )))),0)))* 100 , 2)) <= 40 THEN '<IMG SRC="/PAINEL/IMG/PAINEL/mostra_perc040.gif">' 
 WHEN (ROUND((TRUNC(((SUM(DECODE(TIPO,'LEITO_OCUPADO', QTD,0 )))),0)) / ((TRUNC(((SUM(DECODE(TIPO,'LEITO_EXTRA_OCUPADO', QTD,0 )))),0)) + (TRUNC(((SUM(DECODE(TIPO,'LEITO_OPERACIONAL', QTD,0 )))),0)))* 100 , 2)) > 40 AND 
 (ROUND((TRUNC(((SUM(DECODE(TIPO,'LEITO_OCUPADO', QTD,0 )))),0)) / ((TRUNC(((SUM(DECODE(TIPO,'LEITO_EXTRA_OCUPADO', QTD,0 )))),0)) + (TRUNC(((SUM(DECODE(TIPO,'LEITO_OPERACIONAL', QTD,0 )))),0)))* 100 , 2)) <= 50 THEN '<IMG SRC="/PAINEL/IMG/PAINEL/mostra_perc050.gif">'
 WHEN (ROUND((TRUNC(((SUM(DECODE(TIPO,'LEITO_OCUPADO', QTD,0 )))),0)) / ((TRUNC(((SUM(DECODE(TIPO,'LEITO_EXTRA_OCUPADO', QTD,0 )))),0)) + (TRUNC(((SUM(DECODE(TIPO,'LEITO_OPERACIONAL', QTD,0 )))),0)))* 100 , 2)) > 50 AND 
 (ROUND((TRUNC(((SUM(DECODE(TIPO,'LEITO_OCUPADO', QTD,0 )))),0)) / ((TRUNC(((SUM(DECODE(TIPO,'LEITO_EXTRA_OCUPADO', QTD,0 )))),0)) + (TRUNC(((SUM(DECODE(TIPO,'LEITO_OPERACIONAL', QTD,0 )))),0)))* 100 , 2)) <= 60 THEN '<IMG SRC="/PAINEL/IMG/PAINEL/mostra_perc050.gif">'
 WHEN (ROUND((TRUNC(((SUM(DECODE(TIPO,'LEITO_OCUPADO', QTD,0 )))),0)) / ((TRUNC(((SUM(DECODE(TIPO,'LEITO_EXTRA_OCUPADO', QTD,0 )))),0)) + (TRUNC(((SUM(DECODE(TIPO,'LEITO_OPERACIONAL', QTD,0 )))),0)))* 100 , 2)) > 60 AND 
 (ROUND((TRUNC(((SUM(DECODE(TIPO,'LEITO_OCUPADO', QTD,0 )))),0)) / ((TRUNC(((SUM(DECODE(TIPO,'LEITO_EXTRA_OCUPADO', QTD,0 )))),0)) + (TRUNC(((SUM(DECODE(TIPO,'LEITO_OPERACIONAL', QTD,0 )))),0)))* 100 , 2)) <= 70 THEN '<IMG SRC="/PAINEL/IMG/PAINEL/mostra_perc060.gif">'
 WHEN (ROUND((TRUNC(((SUM(DECODE(TIPO,'LEITO_OCUPADO', QTD,0 )))),0)) / ((TRUNC(((SUM(DECODE(TIPO,'LEITO_EXTRA_OCUPADO', QTD,0 )))),0)) + (TRUNC(((SUM(DECODE(TIPO,'LEITO_OPERACIONAL', QTD,0 )))),0)))* 100 , 2)) > 70 AND 
 (ROUND((TRUNC(((SUM(DECODE(TIPO,'LEITO_OCUPADO', QTD,0 )))),0)) / ((TRUNC(((SUM(DECODE(TIPO,'LEITO_EXTRA_OCUPADO', QTD,0 )))),0)) + (TRUNC(((SUM(DECODE(TIPO,'LEITO_OPERACIONAL', QTD,0 )))),0)))* 100 , 2)) <= 80 THEN '<IMG SRC="/PAINEL/IMG/PAINEL/mostra_perc070.gif">'
 WHEN (ROUND((TRUNC(((SUM(DECODE(TIPO,'LEITO_OCUPADO', QTD,0 )))),0)) / ((TRUNC(((SUM(DECODE(TIPO,'LEITO_EXTRA_OCUPADO', QTD,0 )))),0)) + (TRUNC(((SUM(DECODE(TIPO,'LEITO_OPERACIONAL', QTD,0 )))),0)))* 100 , 2)) > 80 AND 
 (ROUND((TRUNC(((SUM(DECODE(TIPO,'LEITO_OCUPADO', QTD,0 )))),0)) / ((TRUNC(((SUM(DECODE(TIPO,'LEITO_EXTRA_OCUPADO', QTD,0 )))),0)) + (TRUNC(((SUM(DECODE(TIPO,'LEITO_OPERACIONAL', QTD,0 )))),0)))* 100 , 2)) <= 90 THEN '<IMG SRC="/PAINEL/IMG/PAINEL/mostra_perc080.gif">'
 WHEN (ROUND((TRUNC(((SUM(DECODE(TIPO,'LEITO_OCUPADO', QTD,0 )))),0)) / ((TRUNC(((SUM(DECODE(TIPO,'LEITO_EXTRA_OCUPADO', QTD,0 )))),0)) + (TRUNC(((SUM(DECODE(TIPO,'LEITO_OPERACIONAL', QTD,0 )))),0)))* 100 , 2)) > 90 AND 
 (ROUND((TRUNC(((SUM(DECODE(TIPO,'LEITO_OCUPADO', QTD,0 )))),0)) / ((TRUNC(((SUM(DECODE(TIPO,'LEITO_EXTRA_OCUPADO', QTD,0 )))),0)) + (TRUNC(((SUM(DECODE(TIPO,'LEITO_OPERACIONAL', QTD,0 )))),0)))* 100 , 2)) < 100 THEN '<IMG SRC="/PAINEL/IMG/PAINEL/mostra_perc090.gif">'
 WHEN (ROUND((TRUNC(((SUM(DECODE(TIPO,'LEITO_OCUPADO', QTD,0 )))),0)) / ((TRUNC(((SUM(DECODE(TIPO,'LEITO_EXTRA_OCUPADO', QTD,0 )))),0)) + (TRUNC(((SUM(DECODE(TIPO,'LEITO_OPERACIONAL', QTD,0 )))),0)))* 100 , 2)) >= 95 THEN '<IMG SRC="/PAINEL/IMG/PAINEL/mostra_perc0100.gif">'
 END GRAF,
 
 TO_CHAR(TRUNC(((SUM(DECODE(TIPO,'PAC_INT_00', QTD,0 )))),0)) PAC_INT_00,
 TO_CHAR(TRUNC(((SUM(DECODE(TIPO,'ENT_INTERNADO', QTD,0 )))),0)) ENT_INTERNADO,
 TO_CHAR ((TRUNC(((SUM(DECODE(TIPO,'LEITO_EXTRA_OCUPADO', QTD,0 )))),0))+(TRUNC(((SUM(DECODE(TIPO,'LEITO_OPERACIONAL', QTD,0 )))),0))) LEITOS_DIA,
 TO_CHAR(TRUNC(((SUM(DECODE(TIPO,'LEITO_OPERACIONAL', QTD,0 )))),0)) LEITO_OPERACIONAL,
 TO_CHAR(TRUNC(((SUM(DECODE(TIPO,'LEITO_EXTRA_OCUPADO', QTD,0 )))),0)) LEITO_EXTRA_OCUPADO,
 TO_CHAR(TRUNC(((SUM(DECODE(TIPO,'LEITO_BLOQUEADO', QTD,0 )))),0)) LEITO_BLOQUEADO,
 TO_CHAR(TRUNC(((SUM(DECODE(TIPO,'LEITO_OPERACIONAL', QTD,0 )))),0)) + TO_CHAR(TRUNC(((SUM(DECODE(TIPO,'LEITO_BLOQUEADO', QTD,0 )))),0)) LEITO_INSTALADO,
 TO_CHAR(TRUNC(((SUM(DECODE(TIPO,'LEITO_OCUPADO', QTD,0 )))),0)) LEITO_OCUPADO,
 TO_CHAR(TRUNC(((SUM(DECODE(TIPO,'ALTA', QTD,0 )))),0)) ALTA,
 TO_CHAR(TRUNC(((SUM(DECODE(TIPO,'ALTA_OBITO', QTD,0 )))),0)) ALTA_OBITO,
 TO_CHAR(TRUNC(((SUM(DECODE(TIPO,'ALTA_HOSPITALAR', QTD,0 )))),0)) ALTA_HOSPITALAR,
 TO_CHAR(TRUNC(((SUM(DECODE(TIPO,'ALTA_TRANSFERENCIA', QTD,0 )))),0)) ALTA_TRANS,
 TO_CHAR(TRUNC(((SUM(DECODE(TIPO,'TRANS_INT', QTD,0 )))),0)) TRANS_INT
 FROM (
 --PAC INT 00:00
 SELECT 'PAC_INT_00' TIPO,
 COUNT(*) QTD
 FROM DBAMV.MOV_INT,
 DBAMV.UNID_INT,
 DBAMV.LEITO,
 DBAMV.ATENDIME,
 DBAMV.CONVENIO,
 (SELECT TO_DATE(SYSDATE, 'dd/mm/rrrr') - 1 + ROWNUM DATA
 FROM DBAMV.CID
 WHERE ( TO_DATE(SYSDATE, 'dd/mm/rrrr') - 1 ) + ROWNUM <= TO_DATE(SYSDATE, 'dd/mm/rrrr') ) CONTADOR
 WHERE TRUNC(DT_MOV_INT) <= CONTADOR.DATA - 1
 AND TRUNC(NVL(DT_LIB_MOV, SYSDATE)) > CONTADOR.DATA - 1
 AND TP_MOV IN ('O', 'I')
 AND LEITO.CD_UNID_INT = UNID_INT.CD_UNID_INT
 AND MOV_INT.CD_ATENDIMENTO = ATENDIME.CD_ATENDIMENTO
-- AND UNID_INT.CD_UNID_INT IN (23,16,7,25,15,8,9,10,11,12,13)
 AND UNID_INT.CD_UNID_INT NOT IN (5,19,22,1,29,21)
 -- AND UNID_INT.CD_UNID_INT NOT IN (19)
 AND (ATENDIME.TP_ATENDIMENTO IN ('I', 'H', 'U'))
 AND MOV_INT.CD_LEITO = LEITO.CD_LEITO
 AND ATENDIME.CD_CONVENIO = CONVENIO.CD_CONVENIO
 AND ATENDIME.CD_MULTI_EMPRESA = 1
 --AND NVL(DBAMV.F_VALIDA_DATA_HOSPITAL_DIA('N',CONTADOR.DATA),'N') = 'S'
 
 UNION ALL
 --ENTRADA INTERNADOS
 SELECT 'ENT_INTERNADO' TIPO,
 COUNT(*) QTD
 FROM DBAMV.ATENDIME,
 DBAMV.UNID_INT,
 DBAMV.LEITO,
 DBAMV.MOV_INT,
 DBAMV.CONVENIO,
 ( SELECT TO_DATE(SYSDATE, 'dd/mm/rrrr') - 1 + ROWNUM DATA
 FROM DBAMV.CID
 WHERE ( TO_DATE(SYSDATE, 'dd/mm/rrrr') - 1 ) + ROWNUM <= TO_DATE(SYSDATE, 'dd/mm/rrrr') ) CONTADOR
 WHERE LEITO.CD_UNID_INT = UNID_INT.CD_UNID_INT
 AND LEITO.CD_LEITO = MOV_INT.CD_LEITO
 AND TRUNC(DT_MOV_INT) = TRUNC(CONTADOR.DATA)
 AND MOV_INT.TP_MOV = 'I'
 AND ATENDIME.CD_ATENDIMENTO = MOV_INT.CD_ATENDIMENTO
 AND UNID_INT.CD_UNID_INT NOT IN (5,19,22,1)
 AND (ATENDIME.TP_ATENDIMENTO IN ('I', 'H', 'U'))
 AND NOT EXISTS (SELECT 'X'
 FROM DBAMV.MOV_INT MI
 WHERE MI.CD_ATENDIMENTO = MOV_INT.CD_ATENDIMENTO
 AND TO_DATE(TO_CHAR(MI.DT_MOV_INT, 'dd/mm/yyyy') || TO_CHAR(MI.HR_MOV_INT, 'hh24:miss'), 'dd/mm/yyyy hh24:miss') <
 TO_DATE(TO_CHAR(MOV_INT.DT_MOV_INT, 'dd/mm/yyyy') || TO_CHAR(MOV_INT.HR_MOV_INT, 'hh24:miss'), 'dd/mm/yyyy hh24:miss')
 AND MI.CD_LEITO = MOV_INT.CD_LEITO
 AND MI.CD_TIP_ACOM <> MOV_INT.CD_TIP_ACOM
 AND NVL(MI.CD_LEITO_ANTERIOR, MI.CD_LEITO) = NVL(MOV_INT.CD_LEITO_ANTERIOR, MOV_INT.CD_LEITO))
 AND ATENDIME.CD_CONVENIO = CONVENIO.CD_CONVENIO
 --AND NVL(DBAMV.F_VALIDA_DATA_HOSPITAL_DIA('N',CONTADOR.DATA), 'N') = 'S'
 AND ATENDIME.CD_MULTI_EMPRESA = 1
 
 UNION ALL
 --LEITOS OPERACIONAIS
 SELECT 'LEITO_OPERACIONAL' TIPO,
 COUNT(*) QTD
 FROM DBAMV.LEITO,
 DBAMV.UNID_INT
 WHERE LEITO.CD_UNID_INT = UNID_INT.CD_UNID_INT
 AND LEITO.DT_DESATIVACAO IS NULL
-- AND UNID_INT.CD_UNID_INT IN (23,16,7,25,15,8,9,10,11,12,13)
 AND UNID_INT.CD_UNID_INT NOT IN (5,19,22,1,23,21)
 AND UNID_INT.DS_UNID_INT NOT LIKE '%HD%'
 AND LEITO.SN_EXTRA = 'N'
 AND LEITO.TP_OCUPACAO NOT IN ('M','T','E')
 AND UNID_INT.SN_ATIVO = 'S'
 
 UNION ALL
 --LEITOS EXTRAS OCUPADOS
 SELECT 'LEITO_EXTRA_OCUPADO' TIPO,
 COUNT(*) QTD
 FROM DBAMV.LEITO,
 DBAMV.UNID_INT
 WHERE LEITO.CD_UNID_INT = UNID_INT.CD_UNID_INT
 AND LEITO.DT_DESATIVACAO IS NULL
 AND UNID_INT.CD_UNID_INT NOT IN (5,19,22,1,21)
 AND LEITO.SN_EXTRA = 'S'
 AND LEITO.TP_OCUPACAO IN ('O', 'I', 'A')
 AND UNID_INT.CD_UNID_INT <> 21 -- OBSERVACAO PRONTO ATENDIMENTO
 
 UNION ALL
 -- LEITOS BLOQUEADOS
 SELECT 'LEITO_BLOQUEADO' TIPO,
 CASE WHEN LEITO.CD_TIP_ACOM = 1 AND LEITO.CD_UNID_INT = 15
 THEN 0
 ELSE COUNT(*) 
 END LEITOS_BLOQUEADOS
 FROM DBAMV.LEITO,
 DBAMV.UNID_INT
 WHERE LEITO.CD_UNID_INT = UNID_INT.CD_UNID_INT
 AND LEITO.DT_DESATIVACAO IS NULL
 AND UNID_INT.CD_UNID_INT NOT IN (5,19,22,1,21)
 AND LEITO.TP_OCUPACAO IN ('M','T','E')
 group by LEITO.CD_TIP_ACOM,
 LEITO.CD_UNID_INT 
 
 UNION ALL
 --LEITOS OCUPADOS
 SELECT 'LEITO_OCUPADO' TIPO,
 COUNT(ATENDIME.CD_ATENDIMENTO) QTD
 FROM DBAMV.ATENDIME,
 DBAMV.UNID_INT,
 DBAMV.LEITO
 WHERE ATENDIME.TP_ATENDIMENTO = 'I'
 AND ATENDIME.CD_LEITO = LEITO.CD_LEITO
 AND LEITO.CD_UNID_INT = UNID_INT.CD_UNID_INT
 AND UNID_INT.CD_UNID_INT NOT IN (5,19,22,1,21)
 AND UNID_INT.DS_UNID_INT NOT LIKE '%HD%'
 AND ATENDIME.DT_ALTA IS NULL
 
 UNION ALL
 -- ALTAS
 SELECT 'ALTA' TIPO,
 COUNT(ATENDIME.CD_ATENDIMENTO) QTD
 FROM DBAMV.ATENDIME,
 DBAMV.UNID_INT,
 DBAMV.LEITO
 WHERE ATENDIME.TP_ATENDIMENTO = 'I'
 AND ATENDIME.CD_LEITO = LEITO.CD_LEITO
 AND LEITO.CD_UNID_INT = UNID_INT.CD_UNID_INT
 AND ATENDIME.DT_ALTA IS NOT NULL
 AND UNID_INT.CD_UNID_INT NOT IN (5,19,22,1)
 AND ATENDIME.DT_ALTA = TRUNC(SYSDATE)
 
 UNION ALL
 
 SELECT 'ALTA_OBITO' TIPO,
 COUNT(ATENDIME.CD_ATENDIMENTO) QTD_ALTAS_OBITO
 FROM DBAMV.ATENDIME,
 DBAMV.UNID_INT,
 DBAMV.LEITO,
 DBAMV.MOT_ALT
 WHERE ATENDIME.TP_ATENDIMENTO = 'I'
 AND ATENDIME.CD_LEITO = LEITO.CD_LEITO
 AND LEITO.CD_UNID_INT = UNID_INT.CD_UNID_INT
 AND ATENDIME.DT_ALTA IS NOT NULL
-- AND ATENDIME.DT_ATENDIMENTO = TRUNC(SYSDATE)
 AND ATENDIME.DT_ALTA = TRUNC(SYSDATE)
 AND ATENDIME.CD_MOT_ALT=MOT_ALT.CD_MOT_ALT
 AND UNID_INT.CD_UNID_INT NOT IN (5,19,22,1)
 AND MOT_ALT.TP_MOT_ALTA='O'
 -- GROUP BY UNID_INT.CD_UNID_INT, UNID_INT.DS_UNID_INT 
 
 UNION ALL
 
 SELECT 'ALTA_HOSPITALAR' TIPO,
 COUNT(ATENDIME.CD_ATENDIMENTO) QTD_ALTAS_HOSPITALAR
 FROM DBAMV.ATENDIME,
 DBAMV.UNID_INT,
 DBAMV.LEITO,
 DBAMV.MOT_ALT
 WHERE ATENDIME.TP_ATENDIMENTO = 'I'
 AND ATENDIME.CD_LEITO = LEITO.CD_LEITO
 AND LEITO.CD_UNID_INT = UNID_INT.CD_UNID_INT
 AND ATENDIME.DT_ALTA IS NOT NULL
-- AND ATENDIME.DT_ATENDIMENTO = TRUNC(SYSDATE)
 AND ATENDIME.DT_ALTA = TRUNC(SYSDATE)
 AND ATENDIME.CD_MOT_ALT=MOT_ALT.CD_MOT_ALT
 AND UNID_INT.CD_UNID_INT NOT IN (5,19,22,1)
 AND MOT_ALT.TP_MOT_ALTA='A'
 -- GROUP BY UNID_INT.CD_UNID_INT, UNID_INT.DS_UNID_INT 
 
 UNION ALL
 
 SELECT 'ALTA_TRANSFERENCIA' TIPO,
 COUNT(ATENDIME.CD_ATENDIMENTO) QTD_ALTAS_TRANS
 FROM DBAMV.ATENDIME,
 DBAMV.UNID_INT,
 DBAMV.LEITO,
 DBAMV.MOT_ALT
 WHERE ATENDIME.TP_ATENDIMENTO = 'I'
 AND ATENDIME.CD_LEITO = LEITO.CD_LEITO
 AND LEITO.CD_UNID_INT = UNID_INT.CD_UNID_INT
 AND ATENDIME.DT_ALTA IS NOT NULL
-- AND ATENDIME.DT_ATENDIMENTO = TRUNC(SYSDATE)
 AND ATENDIME.DT_ALTA = TRUNC(SYSDATE)
 AND ATENDIME.CD_MOT_ALT=MOT_ALT.CD_MOT_ALT
 AND UNID_INT.CD_UNID_INT NOT IN (5,19,22,1)
 AND MOT_ALT.TP_MOT_ALTA='T'
 -- GROUP BY UNID_INT.CD_UNID_INT, UNID_INT.DS_UNID_INT 
 UNION ALL
 
 -- ENT_TRANSF

--TRANSFERENCIA DE

SELECT 'TRANS_INT' TIPO,
 COUNT(*) ENT_TRANSF
 FROM DBAMV.MOV_INT,
 DBAMV.UNID_INT,
 DBAMV.UNID_INT UNID_INT1,
 DBAMV.LEITO,
 DBAMV.LEITO LEITO1,
 DBAMV.ATENDIME,
 DBAMV.CONVENIO,
 (SELECT (TO_DATE(TRUNC(SYSDATE),'dd/mm/rrrr') - 1) + ROWNUM DATA
 FROM DBAMV.cid
 WHERE (TO_DATE(TRUNC(SYSDATE), 'dd/mm/rrrr') - 1) + ROWNUM <= TO_DATE(TRUNC(SYSDATE), 'dd/mm/rrrr')) CONTADOR
 WHERE MOV_INT.TP_MOV = 'O'
 AND TRUNC(MOV_INT.DT_MOV_INT) = CONTADOR.DATA
 AND MOV_INT.CD_LEITO = LEITO.CD_LEITO
 AND MOV_INT.CD_LEITO_ANTERIOR = LEITO1.CD_LEITO
 AND LEITO1.CD_UNID_INT = UNID_INT1.CD_UNID_INT
 AND UNID_INT.CD_UNID_INT <> UNID_INT1.CD_UNID_INT
 AND LEITO.CD_UNID_INT = UNID_INT.CD_UNID_INT
 AND UNID_INT.CD_UNID_INT NOT IN (5,19,1)
 AND ATENDIME.CD_ATENDIMENTO = MOV_INT.CD_ATENDIMENTO
 AND (ATENDIME.TP_ATENDIMENTO IN ('I', 'H', 'U'))
 AND NOT EXISTS (SELECT 'X'
 FROM DBAMV.MOV_INT MI
 WHERE MI.CD_ATENDIMENTO = MOV_INT.CD_ATENDIMENTO
 AND TO_DATE(TO_CHAR(MI.DT_MOV_INT, 'dd/mm/yyyy') || TO_CHAR(MI.HR_MOV_INT, 'hh24:miss'), 'dd/mm/yyyyhh24:miss') <
 TO_DATE(TO_CHAR(MOV_INT.DT_MOV_INT, 'dd/mm/yyyy') || TO_CHAR(MOV_INT.HR_MOV_INT, 'hh24:miss'), 'dd/mm/yyyyhh24:miss')
 AND MI.CD_LEITO = MOV_INT.CD_LEITO
 AND MI.CD_TIP_ACOM <> MOV_INT.CD_TIP_ACOM
 AND NVL(MI.CD_LEITO_ANTERIOR, MI.CD_LEITO) = NVL(MOV_INT.CD_LEITO_ANTERIOR, MOV_INT.CD_LEITO))
 AND ATENDIME.CD_CONVENIO = CONVENIO.CD_CONVENIO
-- AND NVL(DBAMV.F_VALIDA_DATA_HOSPITAL_DIA('N', CONTADOR.DATA), 'N') = 'S'
 -- AND ATENDIME.CD_MULTI_EMPRESA = 1
-- GROUP BY UNID_INT.CD_UNID_INT, UNID_INT.DS_UNID_INT 
 
)P_1

) where ds_unid_int is not null
order BY 2 DESC
