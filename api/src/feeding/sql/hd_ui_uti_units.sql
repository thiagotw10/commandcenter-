-- QUERY PARA FILTRAR AS UNIDADES DO PAINEL POR AREA HD,UI e UTI -
-- ALTERAÇÃO(Weslly): Ordenação personalizada por descrição da unidade de internação; 
-- hd_ui_uti_units  -- incluido todas a unidades de acordo com o solicitado por Hallan em email no dia 04/06/22
-- query para listar as % das unidades

SELECT CD_UNID_INT
      ,DS_UNID_INT
      ,PERCENTAGEM_OCUPACAO
From (
SELECT (CASE   WHEN LTOTAL.DS_UNID_INT = 'UTI 5 ANDAR' THEN 1				   
               WHEN LTOTAL.DS_UNID_INT = 'UTI 6 ANDAR' THEN 2
               WHEN LTOTAL.DS_UNID_INT = 'UTI 8 ANDAR' THEN 3 
         	   WHEN LTOTAL.DS_UNID_INT = 'UTI 9 ANDAR' THEN 4
			   WHEN LTOTAL.DS_UNID_INT = 'UTI 10 ANDAR' THEN 5
               WHEN LTOTAL.DS_UNID_INT = 'UTI 11.ANDAR' THEN 6
			   WHEN LTOTAL.DS_UNID_INT = 'UTI 15 ANDAR' THEN 7
			   WHEN LTOTAL.DS_UNID_INT = 'UPP - UTI' THEN 8
			   WHEN LTOTAL.DS_UNID_INT = 'UPP - UI' THEN 9
			   WHEN LTOTAL.DS_UNID_INT = 'UNIDADE JARDINS' THEN 10
               WHEN LTOTAL.DS_UNID_INT = '07 ANDAR - HD' THEN 11
               WHEN LTOTAL.DS_UNID_INT = '07 ANDAR - UI' THEN 12
               WHEN LTOTAL.DS_UNID_INT = '09 ANDAR' THEN 13
               WHEN LTOTAL.DS_UNID_INT = '10 ANDAR' THEN 14
               WHEN LTOTAL.DS_UNID_INT = '10 ANDAR - HD' THEN 15
               WHEN LTOTAL.DS_UNID_INT = '11 ANDAR' THEN 16
               WHEN LTOTAL.DS_UNID_INT = '12 ANDAR' THEN 17
               WHEN LTOTAL.DS_UNID_INT = '13 ANDAR' THEN 18
               WHEN LTOTAL.DS_UNID_INT = '14 ANDAR' THEN 19
 			   WHEN LTOTAL.DS_UNID_INT = '15 ANDAR' THEN 20
               WHEN LTOTAL.DS_UNID_INT = '15 ANDAR - HD' THEN 21
               WHEN LTOTAL.DS_UNID_INT = '16 ANDAR' THEN 22
               WHEN LTOTAL.DS_UNID_INT = '16.ANDAR - HD' THEN 23
                END) ORDEM,
       LTOTAL.CD_UNID_INT , 
       LTOTAL.DS_UNID_INT,
       nvl(ROUND((LOC.LEITO/(LTOTAL.LEITOT/100))),0)||'%' PERCENTAGEM_OCUPACAO 
FROM
(SELECT COUNT(L.CD_LEITO) LEITO, U.DS_UNID_INT, L.CD_UNID_INT FROM  LEITO L , UNID_INT U
WHERE L.CD_UNID_INT = U.CD_UNID_INT
AND   U.TP_UNID_INT = 'I'
AND   L.TP_OCUPACAO IN ('O','I','R','A')
--AND   L.SN_EXTRA = 'N'
AND  l.tp_situacao = 'A'
--AND  L.cd_unid_int IN ( 45,  38,  3,5, 25, 7,  26,  27,  31, 34, 16, 30,37,28,23,39,44,29,36 ) -- unidades  
GROUP BY  U.DS_UNID_INT , L.CD_UNID_INT ) LOC,

(SELECT COUNT(L.CD_LEITO) LEITOT, U.DS_UNID_INT, L.CD_UNID_INT FROM  LEITO L , UNID_INT U
WHERE L.CD_UNID_INT = U.CD_UNID_INT
AND   U.TP_UNID_INT = 'I'
--AND   L.SN_EXTRA = 'N'
AND l.tp_situacao = 'A'
--AND  L.cd_unid_int IN ( 45,  38,  3,5, 25, 7,  26,  27,  31, 34, 16, 30,37,28,23,39,44,29,36 ) -- unidades -- comentando em 05/06/22 
GROUP BY  U.DS_UNID_INT , L.CD_UNID_INT) LTOTAL

WHERE LOC.CD_UNID_INT (+) = LTOTAL.CD_UNID_INT
ORDER BY 1
)