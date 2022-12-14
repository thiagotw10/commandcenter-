-- altas dia UPP e prox 3 dias UPP
SELECT * FROM (

----- ALTAS PREV DIA UPP ---------------
SELECT 'ALTAS PREV UPP DIA' TIPO,
        ATENDIME.dt_prevista_alta data_prevista
 FROM DBAMV.ATENDIME,
 DBAMV.UNID_INT,
 DBAMV.LEITO 
 WHERE ATENDIME.TP_ATENDIMENTO = 'I'
 AND ATENDIME.CD_LEITO = LEITO.CD_LEITO
 AND LEITO.CD_UNID_INT = UNID_INT.CD_UNID_INT         
 AND Trunc (ATENDIME.dt_prevista_alta)between trunc(sysdate)  and SYSDATE
 AND UNID_INT.CD_UNID_INT IN (23,30) --UPP
 AND ATENDIME.CD_MULTI_EMPRESA = 1 
-- ORDER BY data_prevista 

UNION ALL 

SELECT 'ALTAS PREV UPP PROX 3DIAS' TIPO,
        ATENDIME.dt_prevista_alta data_prevista
 FROM DBAMV.ATENDIME,
 DBAMV.UNID_INT,
 DBAMV.LEITO 
 WHERE ATENDIME.TP_ATENDIMENTO = 'I'
 AND ATENDIME.CD_LEITO = LEITO.CD_LEITO
 AND LEITO.CD_UNID_INT = UNID_INT.CD_UNID_INT         
 AND Trunc (ATENDIME.dt_prevista_alta)between trunc(SYSDATE)+1  and Trunc(SYSDATE) + 3-- :0 = SYSDATE, :1 = SYSDATE  
 AND UNID_INT.CD_UNID_INT IN (23,30) --UPP
 AND dt_alta IS NULL 
 AND ATENDIME.CD_MULTI_EMPRESA = 1 
-- ORDER BY data_prevista 
 )
 ORDER BY tipo ,data_prevista

 
                           