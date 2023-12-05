<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require './vendor/autoload.php';

$app = new \Slim\App;

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

$app->get('/comentarios', 'getComentarios');
$app->put('/curtidas/{id}', 'getCurtidas');
$app->post('/cadastro', 'getCadastrar');
$app->get('/usuarios', 'getUsuarios');
$app->post('/agendar', 'getAgendar');
$app->post('/AdicionarPet', 'getAdicionarPet');



function getConn()
{
    return new PDO('mysql:host=localhost:3306;dbname=ally_db',
    'root',
    '',
    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
    );
};

function getComentarios(Request $request, Response $response, array $args) {
    $sql = "SELECT * FROM tb_comentarios";
    $stmt = getConn()->query($sql);
    $comentarios = $stmt->fetchAll(PDO::FETCH_OBJ);
    $response->getBody()->write(json_encode($comentarios));
    return $response;
};

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
    $stmt = $db->prepare('INSERT INTO tb_cliente (nm_cliente, dt_nasc_cliente, email, senha, cpf, fotoPerfil, telefone) VALUES (:nome, :nasc, :email, :senha, :cpf, :fotoPerfil, :telefone)');
    $stmt->execute([
        ':nome' => $dataCadastro['nome'],
        ':nasc' => $dataCadastro['nasc'],
        ':email' => $dataCadastro['email'],
        ':senha' => $dataCadastro['senha'],
        ':cpf' => $dataCadastro['cpf'],
        ':fotoPerfil' => $dataCadastro['fotoPerfil'],
        ':telefone' => $dataCadastro['telefone'],
    ]);
    return $response->withStatus(200)->withJson(['message' => 'Dados inseridos com sucesso']);
};
function getAdicionarPet(Request $request, Response $response, array $args) {

    $dataAdicionarPet = $request->getParsedBody();    
    $db = getConn();
    $stmt = $db->prepare('INSERT INTO tb_cao (nm_cao, nm_raca, ds_porte, ds_pelagem, ds_peso) VALUES (:nome, :raca, :porte, :cor, :peso)');
    $stmt->execute([
        ':nome' => $dataAdicionarPet['nome'],
        ':raca' => $dataAdicionarPet['raca'],
        ':porte' => $dataAdicionarPet['porte'],
        ':cor' => $dataAdicionarPet['cor'],
        ':peso' => $dataAdicionarPet['peso'], 
    ]);
    return $response->withStatus(200)->withJson(['message' => 'Dados inseridos com sucesso']);
};


function getUsuarios(Request $request, Response $response, array $args) {
    $sql = "SELECT * FROM tb_cliente";
    $stmt = getConn()->query($sql);
    $usuarios = $stmt->fetchAll(PDO::FETCH_OBJ);
    $response->getBody()->write(json_encode($usuarios));
    return $response;
};

function getAgendar(Request $request, Response $response, array $args) {
    $db = getConn();
    $dataReserva = $request->getParsedBody();
    $sql = 'INSERT INTO tb_servico (dt_checkin, dt_checkout) VALUES (:dt_checkin, :dt_checkout)';
    $stmt = $db->prepare($sql);
    $stmt->execute([
        ':dt_checkin' => $dataReserva['dt_checkin'],
        ':dt_checkout' => $dataReserva['dt_checkout'],
    ]);
    return $response->withStatus(200)->withJson(['message' => 'Dados inseridos com sucesso']);
};

$app->run();

?>