<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Tuupola\Middleware\CorsMiddleware;

require './vendor/autoload.php';

$app = new \Slim\App;

$app->add(new CorsMiddleware([
    "origin" => ["http://localhost:19006", "http://localhost:8081"], // Domínio da origem permitida
    "methods" => ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
    "headers.allow" => ["Content-Type", "Authorization", "Accept"], // Headers permitidos
]));

$app->get('/comentarios', 'getComentarios');
$app->put('/curtidas/{id}', 'getCurtidas');
$app->post('/cadastro', 'getCadastrar');



function getConn()
{
    return new PDO('mysql:host=localhost:3306;dbname=ally3110',
    'root',
    '',
    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
    );
}

function getComentarios(Request $request, Response $response, array $args) {
    $sql = "SELECT * FROM tb_comentarios";
    $stmt = getConn()->query($sql);
    $comentarios = $stmt->fetchAll(PDO::FETCH_OBJ);
    $response->getBody()->write(json_encode($comentarios));
    return $response;
}

function getCurtidas(Request $request, Response $response, array $args) {
    
    $db = getConn();
    $id = $args['id'];
    $newData = $request->getParsedBody();
    $sql = "UPDATE tb_comentarios SET curtidas = :curtidas, descurtidas = :descurtidas, ok = :ok WHERE id = :id";
    $stmt = $db->prepare($sql);
    $stmt->execute([
        'id' => $id,
        ':curtidas' => $newData['curtidas'],
        ':descurtidas' => $newData['descurtidas'],
        ':ok' => $newData['ok']
    ]);
    return $response->withStatus(200)->withJson(['message' => 'Registro atualizado com sucesso']);

};

function getCadastrar(Request $request, Response $response, array $args) {

    $dataCadastro = $request->getParsedBody();    
    $db = getConn();
    $stmt = $db->prepare('INSERT INTO tb_cliente (nm_cliente, dt_nasc_cliente, email, senha, cd_cliente) VALUES (:nome, :nasc, :email, :senha, :cpf)');
    $stmt->execute([
        ':nome' => $dataCadastro['nome'],
        ':nasc' => $dataCadastro['nasc'],
        ':email' => $dataCadastro['email'],
        ':senha' => $dataCadastro['senha'],
        ':cpf' => $dataCadastro['cpf'],
    ]);
    return $response->withStatus(200)->withJson(['message' => 'Dados inseridos com sucesso']);
};


$app->run();

?>