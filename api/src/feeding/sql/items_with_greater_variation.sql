--////////////////////////////////////////////////////////////////////////////
  --Query Consumo - Itens com maior variação                                --
  --Autor: Adiel Junior                                                     --
  --Data: 12/06/2022                                                        --
--////////////////////////////////////////////////////////////////////////////
---------------------------------------
select rownum rank,nm_produto, quantitativo, ultimos_pedidos, ordem, setor1, solic1, status1, setor2, solic2, status2, solic_media 
from (
select	
        NM_PRODUTO
      , QUANTITATIVO
      , ULTIMOS_PEDIDOS
      , rank() over (partition by nm_produto order by ultimos_pedidos desc) ordem
      , SETOR1
      , SOLIC1
      , STATUS1
      , SETOR2
      , SOLIC2
      , STATUS2
      , SOLIC_MEDIA 
from (
SELECT  NM_PRODUTO
      , QUANTITATIVO
      , max(ULTIMOS_PEDIDOS)ULTIMOS_PEDIDOS
      , SETOR1
      , SOLIC1
      , STATUS1
      , SETOR2
      , SOLIC2
      , STATUS2
      , SOLIC_MEDIA 
FROM (
SELECT

------- CARD ESQUERDA ------------
 NM_PRODUTO
,QUANTITATIVO
,QUANTITATIVO_ABAIXO ULTIMOS_PEDIDOS
-----------------------------------
------- CARD DIREITA --------------
,SETOR_ACIMA SETOR1
,SOLIC_ACIMA SOLIC1
,CASE WHEN SOLIC_MEDIA < SOLIC_ACIMA THEN 'SETA VERMELHA'  ELSE NULL END STATUS1
,SETOR_ABAIXO SETOR2
,SOLIC_ABAIXO SOLIC2
,CASE WHEN SOLIC_MEDIA < SOLIC_ABAIXO THEN 'SETA VERMELHA' ELSE NULL END STATUS2
,SOLIC_MEDIA
---------------------------------
FROM(
SELECT
MES_ATUAL.SOLICITACOES    SOLIC_ACIMA
,MES_ATUAL.QT_SOLIC       QUANTITATIVO
,MES_ATUAL.NM_SETOR       SETOR_ACIMA
,MES_ATUAL.DS_PRODUTO     NM_PRODUTO
,MES_ATUAL.MES            MES
,'-'                      DIVISOR
,MES_PASSADO.SOLICITACOES SOLIC_ABAIXO
,MES_PASSADO.QT_SOLIC     QUANTITATIVO_ABAIXO
,MES_PASSADO.NM_SETOR     SETOR_ABAIXO
,(MES_ATUAL.SOLICITACOES+MES_PASSADO.SOLICITACOES)/2 SOLIC_MEDIA
FROM
PRODUTO
,
(
--MES_ATUAL
  SELECT 
       COUNT(SOLSAI_PRO.CD_SOLSAI_PRO) SOLICITACOES
      ,Sum(ITSOLSAI_PRO.QT_SOLICITADO) QT_SOLIC
      ,PRODUTO.DS_PRODUTO
      ,PRODUTO.CD_PRODUTO
      ,ESTOQUE.DS_ESTOQUE  NM_SETOR
      ,'ATUAL' MES  
  FROM 
       SOLSAI_PRO
      ,ITSOLSAI_PRO
      ,PRODUTO
      ,SETOR
      ,ESTOQUE
  WHERE
       SOLSAI_PRO.CD_SOLSAI_PRO = ITSOLSAI_PRO.CD_SOLSAI_PRO
  AND ITSOLSAI_PRO.CD_PRODUTO  = PRODUTO.CD_PRODUTO
  AND SOLSAI_PRO.CD_SETOR = SETOR.CD_SETOR
  AND SOLSAI_PRO.CD_ESTOQUE_SOLICITANTE = ESTOQUE.CD_ESTOQUE
  AND SOLSAI_PRO.CD_ESTOQUE = 1
  AND PRODUTO.SN_PADRONIZADO = 'S'
  AND SOLSAI_PRO.TP_SOLSAI_PRO  = 'E'
  AND PRODUTO.TP_ATIVO = 'S'
 
  AND SOLSAI_PRO.DT_SOLSAI_PRO BETWEEN to_date(to_char(add_months(sysdate,0),'YYYYMM'),'YYYYMM') AND SYSDATE
  GROUP BY PRODUTO.DS_PRODUTO,PRODUTO.CD_PRODUTO,ESTOQUE.DS_ESTOQUE
) MES_ATUAL
,
(
--MES_PASSADO
  SELECT  
       COUNT(SOLSAI_PRO.CD_SOLSAI_PRO) SOLICITACOES
      ,Sum(ITSOLSAI_PRO.QT_SOLICITADO) QT_SOLIC
      ,PRODUTO.DS_PRODUTO
      ,PRODUTO.CD_PRODUTO
      ,ESTOQUE.DS_ESTOQUE  NM_SETOR
      ,'PASSADO' MES  
  FROM 
       SOLSAI_PRO
      ,ITSOLSAI_PRO
      ,PRODUTO
      ,SETOR
      ,ESTOQUE

  WHERE
      SOLSAI_PRO.CD_SOLSAI_PRO = ITSOLSAI_PRO.CD_SOLSAI_PRO
  AND ITSOLSAI_PRO.CD_PRODUTO  = PRODUTO.CD_PRODUTO
  AND SOLSAI_PRO.CD_SETOR = SETOR.CD_SETOR
  AND SOLSAI_PRO.CD_ESTOQUE_SOLICITANTE = ESTOQUE.CD_ESTOQUE
  AND SOLSAI_PRO.CD_ESTOQUE = 1
  AND PRODUTO.SN_PADRONIZADO = 'S'
  AND SOLSAI_PRO.TP_SOLSAI_PRO  = 'E'
  AND PRODUTO.TP_ATIVO = 'S'
 
  AND SOLSAI_PRO.DT_SOLSAI_PRO BETWEEN TO_DATE(TO_CHAR(ADD_MONTHS(SYSDATE,-1),'YYYYMM'),'YYYYMM') AND (TO_DATE(TO_CHAR(ADD_MONTHS(SYSDATE,0),'YYYYMM'),'YYYYMM')-1)
  GROUP BY PRODUTO.DS_PRODUTO,PRODUTO.CD_PRODUTO,ESTOQUE.DS_ESTOQUE
)MES_PASSADO                                                           
        
WHERE PRODUTO.CD_PRODUTO = MES_ATUAL.CD_PRODUTO
  AND PRODUTO.CD_PRODUTO = MES_PASSADO.CD_PRODUTO
  --AND MES_ATUAL.SOLICITACOES > MES_PASSADO.SOLICITACOES
ORDER BY SOLIC_ACIMA DESC,QUANTITATIVO DESC
)
WHERE QUANTITATIVO > QUANTITATIVO_ABAIXO
--AND ROWNUM BETWEEN 1 AND 10
ORDER BY ROWNUM
) WHERE STATUS2 IS NULL

group by NM_PRODUTO
      , QUANTITATIVO
      --, max(ULTIMOS_PEDIDOS)ULTIMOS_PEDIDOS
      , SETOR1
      , SOLIC1
      , STATUS1
      , SETOR2
      , SOLIC2
      , STATUS2
      , SOLIC_MEDIA 

order by quantitativo desc
) order by quantitativo desc 
) where ordem = 1
	and rownum between 1 and 10