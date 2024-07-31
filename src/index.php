<?php
require 'C:\wamp64\www\GEOVendas\connection.php'; 

function atualizarEstoque(PDO $pdo, string $jsonData) {
    $produtos = json_decode($jsonData, true);

    
    $selectQuery = 'SELECT id FROM estoque WHERE produto = :produto AND cor = :cor AND tamanho = :tamanho AND deposito = :deposito AND data_disponibilidade = :data_disponibilidade';
    $updateQuery = 'UPDATE estoque SET quantidade = :quantidade WHERE id = :id';
    $insertQuery = 'INSERT INTO estoque (produto, cor, tamanho, deposito, data_disponibilidade, quantidade) VALUES (:produto, :cor, :tamanho, :deposito, :data_disponibilidade, :quantidade)';

    
    $selectStmt = $pdo->prepare($selectQuery);
    $updateStmt = $pdo->prepare($updateQuery);
    $insertStmt = $pdo->prepare($insertQuery);

    try {
        $pdo->beginTransaction();

        foreach ($produtos as $produto) {
            
            $selectStmt->execute([
                ':produto' => $produto['produto'],
                ':cor' => $produto['cor'],
                ':tamanho' => $produto['tamanho'],
                ':deposito' => $produto['deposito'],
                ':data_disponibilidade' => $produto['data_disponibilidade'],
            ]);

            $row = $selectStmt->fetch(PDO::FETCH_ASSOC);

            if ($row) {
                
                $updateStmt->execute([
                    ':quantidade' => $produto['quantidade'],
                    ':id' => $row['id'],
                ]);
            } else {
                
                $insertStmt->execute([
                    ':produto' => $produto['produto'],
                    ':cor' => $produto['cor'],
                    ':tamanho' => $produto['tamanho'],
                    ':deposito' => $produto['deposito'],
                    ':data_disponibilidade' => $produto['data_disponibilidade'],
                    ':quantidade' => $produto['quantidade'],
                ]);
            }
        }

        $pdo->commit();
    } catch (Exception $e) {
        $pdo->rollBack();
        throw $e;
    }
}


$jsonData = '[
    {
        "produto": "10.01.0419",
        "cor": "00",
        "tamanho": "P",
        "deposito": "DEP1",
        "data_disponibilidade": "2023-05-01",
        "quantidade": 15
    },
    {
        "produto": "11.01.0568",
        "cor": "08",
        "tamanho": "P",
        "deposito": "DEP1",
        "data_disponibilidade": "2023-05-01",
        "quantidade": 2
    },
    {
        "produto": "11.01.0568",
        "cor": "08",
        "tamanho": "M",
        "deposito": "DEP1",
        "data_disponibilidade": "2023-05-01",
        "quantidade": 4
    },
    {
        "produto": "11.01.0568",
        "cor": "08",
        "tamanho": "G",
        "deposito": "1",
        "data_disponibilidade": "2023-05-01",
        "quantidade": 6
    },
    {
        "produto": "11.01.0568",
        "cor": "08",
        "tamanho": "P",
        "deposito": "DEP1",
        "data_disponibilidade": "2023-06-01",
        "quantidade": 8
    }
]';

atualizarEstoque($pdo, $jsonData);
?>
