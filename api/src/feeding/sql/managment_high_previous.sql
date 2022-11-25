SELECT TIPO
      ,data_prevista
FROM (
SELECT 'ALTAS PREV PROX 3DIAS' TIPO,
        ATENDIME.dt_prevista_alta data_prevista
 FROM DBAMV.ATENDIME,
 DBAMV.UNID_INT,
 DBAMV.LEITO 
 WHERE ATENDIME.TP_ATENDIMENTO = 'I'
 AND ATENDIME.CD_LEITO = LEITO.CD_LEITO
 AND LEITO.CD_UNID_INT = UNID_INT.CD_UNID_INT         
 AND Trunc (ATENDIME.dt_prevista_alta)between trunc(SYSDATE)  and Trunc(SYSDATE) + 2 -- :0 = SYSDATE, :1 = SYSDATE
 --AND UNID_INT.CD_UNID_INT NOT IN (5,19,22,1)
 AND ATENDIME.CD_MULTI_EMPRESA = 1
 ORDER BY data_prevista 
)

UNION ALL

SELECT TIPO
     ,data_prevista
FROM (
SELECT 'INTERNACOES PREV PROX 3DIAS' TIPO
       ,DT_PREV_INTERNACAO data_prevista
FROM DBAMV.RES_LEI    
WHERE  Trunc(dt_prev_internacao) BETWEEN Trunc(SYSDATE) AND Trunc(SYSDATE)+2   -- :0 = SYSDATE, :1 = SYSDATE
order by data_prevista DESC
)
 ORDER BY 2
