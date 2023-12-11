<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Tuupola\Middleware\CorsMiddleware;

require './vendor/autoload.php';

$app = new \Slim\App;

$app->add(new CorsMiddleware([
    "origin" => ["*"], // Domínio da origem permitida
    "methods" => ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
    "headers.allow" => ["Content-Type", "Authorization", "Accept"], // Headers permitidos
]));

$app->get('/comentarios', 'getComentarios');
$app->get('/usuarios', 'getUsuarios');
$app->get('/reservas', 'getReservas');
$app->get('/pets/{cd_cliente}', 'getPets');
$app->put('/curtidas/{id}', 'getCurtidas');
$app->put('/atualizaCadastro/{cd_cliente}', 'getAtualizaCadastro');
$app->put('/atualizaReserva/{cd_cliente}', 'getAtualizaReserva');
$app->put('/atualizaPets/{cd_cliente}', 'getAtualizaPets');
$app->post('/cadastro', 'getCadastrar');
$app->post('/agendar', 'getAgendar');
$app->post('/AdicionarPet', 'getAdicionarPet');
$app->post('/vacinas', 'getVacina');

$app->put('/updateEmail/{cd_cliente}', 'updateEmail');
$app->put('/updateTelefone/{cd_cliente}', 'updateTelefone');




function getConn()
{
    return new PDO(
        'mysql:host=localhost:3306;dbname=ally_db',
        'root',
        '',
        array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
    );
}
;

function getComentarios(Request $request, Response $response, array $args)
{
    $sql = "SELECT * FROM tb_comentarios";
    $stmt = getConn()->query($sql);
    $comentarios = $stmt->fetchAll(PDO::FETCH_OBJ);
    $response->getBody()->write(json_encode($comentarios));
    return $response;
}
;
function getReservas(Request $request, Response $response, array $args)
{
    $sql = "SELECT * FROM tb_servico";
    $stmt = getConn()->query($sql);
    $servicos = $stmt->fetchAll(PDO::FETCH_OBJ);
    $response->getBody()->write(json_encode($servicos));
    return $response;
}
;

function getCurtidas(Request $request, Response $response, array $args)
{

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

}
;
function getAtualizaCadastro (Request $request, Response $response, array $args)
{

    $db = getConn();
    $id = $args['cd_cliente'];
    $newData = $request->getParsedBody();
    $sql = "UPDATE tb_cliente SET nm_cliente = :nome, dt_nasc_cliente = :nasc, email = :email, cpf = :cpf, telefone = :telefone WHERE cd_cliente = :cd_cliente";
    $stmt = $db->prepare($sql);
    $stmt->execute([
        'cd_cliente' => $id,
        ':nome' => $newData['nome'],
        ':nasc' => $newData['nascBanco'],
        ':email' => $newData['email'],
        ':cpf' => $newData['cpf'],
        ':telefone' => $newData['telefone'],
    ]);
    return $response->withStatus(200)->withJson(['message' => 'Registro atualizado com sucesso']);

}
;
function getAtualizaReserva (Request $request, Response $response, array $args)
{

    $db = getConn();
    $id = $args['cd_cliente'];
    $newData = $request->getParsedBody();
    $sql = "UPDATE tb_servico SET statusReserva = :statusReserva WHERE cd_cliente = :cd_cliente";
    $stmt = $db->prepare($sql);
    $stmt->execute([
        'cd_cliente' => $id,
        ':statusReserva' => $newData['statusReserva'],
    ]);
    return $response->withStatus(200)->withJson(['message' => 'Registro atualizado com sucesso']);

}
;

function getAtualizaPets (Request $request, Response $response, array $args)
{

    $db = getConn();
    $id = $args['cd_cliente'];
    $newData = $request->getParsedBody();
    $sql = "UPDATE tb_cao SET nm_cao = :nomePet, ds_pelagem = :pelagem, nm_raca = :raca, ds_peso = :peso, ic_antirrabica = :antirrabica, ic_v8_v10 = :v8, ic_gripe = :gripe, ic_giardia = :giardia WHERE cd_cliente = :cd_cliente";
    $stmt = $db->prepare($sql);
    $stmt->execute([
        'cd_cliente' => $id,
        ':nomePet' => $newData['nomePet'],
        ':pelagem' => $newData['pelagem'],
        ':raca' => $newData['raca'],
        ':peso' => $newData['peso'],
        ':antirrabica' => $newData['antirrabica'],
        ':v8' => $newData['v8'],
        ':gripe' => $newData['gripe'],
        ':giardia' => $newData['giardia'],
    ]);
    return $response->withStatus(200)->withJson(['message' => 'Registro atualizado com sucesso']);

}
;

function getCadastrar(Request $request, Response $response, array $args)
{

    $dataCadastro = $request->getParsedBody();
    $db = getConn();
    $stmt = $db->prepare('INSERT INTO tb_cliente (nm_cliente, dt_nasc_cliente, email, senha, cpf, telefone) VALUES (:nome, :nasc, :email, :senha, :cpf, :telefone)');
    $stmt->execute([
        ':nome' => $dataCadastro['nome'],
        ':nasc' => $dataCadastro['nasc'],
        ':email' => $dataCadastro['email'],
        ':senha' => $dataCadastro['senha'],
        ':cpf' => $dataCadastro['cpf'],
        ':telefone' => $dataCadastro['telefone'],
    ]);
    return $response->withStatus(200)->withJson(['message' => 'Dados inseridos com sucesso']);
}
;
function getAdicionarPet(Request $request, Response $response, array $args)
{

    $dataAdicionarPet = $request->getParsedBody();
    $db = getConn();
    $stmt = $db->prepare('INSERT INTO tb_cao (nm_cao, nm_raca, ds_porte, ds_pelagem, ds_peso, cd_cliente, ic_v8_v10, ic_antirrabica, ic_gripe, ic_giardia) VALUES (:nome, :raca, :porte, :cor, :peso, :cd_cliente, :v8, :antirrabica, :gripe, :giardia)');
    $stmt->execute([
        ':nome' => $dataAdicionarPet['nome'],
        ':raca' => $dataAdicionarPet['raca'],
        ':porte' => $dataAdicionarPet['porte'],
        ':cor' => $dataAdicionarPet['cor'],
        ':peso' => $dataAdicionarPet['peso'],
        'cd_cliente' => $dataAdicionarPet['cd_cliente'],
        ':v8' => $dataAdicionarPet['v8'],
        ':antirrabica' => $dataAdicionarPet['antirrabica'],
        ':gripe' => $dataAdicionarPet['gripe'],
        ':giardia' => $dataAdicionarPet['giardia'],
    ]);
    return $response->withStatus(200)->withJson(['message' => 'Dados inseridos com sucesso']);
}
;


function getUsuarios(Request $request, Response $response, array $args)
{
    $sql = "SELECT * FROM tb_cliente";
    $stmt = getConn()->query($sql);
    $usuarios = $stmt->fetchAll(PDO::FETCH_OBJ);
    $response->getBody()->write(json_encode($usuarios));
    return $response;
}
;

function getPets(Request $request, Response $response, array $args)
{
    $cd_cliente = $args['cd_cliente'];
    $sql = "SELECT * FROM tb_cao WHERE cd_cliente = :cd_cliente";
    $stmt = getConn()->prepare($sql);

    $stmt->execute([
        'cd_cliente' => $cd_cliente
    ]);

    $pets = $stmt->fetchAll(PDO::FETCH_OBJ);

    $response->getBody()->write(json_encode($pets));

    return $response;
}

function getAgendar(Request $request, Response $response, array $args)
{
    $db = getConn();
    $dataReserva = $request->getParsedBody();
    $sql = 'INSERT INTO tb_servico (cd_cliente, dt_checkin, dt_checkout, statusReserva) VALUES (:cd_cliente, :dt_checkin, :dt_checkout, :statusReserva)';
    $stmt = $db->prepare($sql);
    $stmt->execute([
        ':cd_cliente' => $dataReserva['cd_cliente'],
        ':dt_checkin' => $dataReserva['dt_checkin'],
        ':dt_checkout' => $dataReserva['dt_checkout'],
        ':statusReserva' => $dataReserva['statusReserva'],
    ]);
    return $response->withStatus(200)->withJson(['message' => 'Dados inseridos com sucesso']);
}
;

function updateEmail(Request $request, Response $response, array $args)
{
    $db = getConn();
    $id = $args['cd_cliente'];
    $newData = $request->getParsedBody();
    $sql = "UPDATE tb_cliente SET email = :email WHERE cd_cliente = :cd_cliente";
    $stmt = $db->prepare($sql);
    $stmt->execute([
        'cd_cliente' => $id,
        ':email' => $newData['email'],
    ]);
    return $response->withStatus(200)->withJson(['message' => 'Email atualizado com sucesso']);
}

function updateTelefone(Request $request, Response $response, array $args)
{
    $db = getConn();
    $id = $args['cd_cliente'];
    $newData = $request->getParsedBody();
    $sql = "UPDATE tb_cliente SET telefone = :telefone WHERE cd_cliente = :cd_cliente";
    $stmt = $db->prepare($sql);
    $stmt->execute([
        'cd_cliente' => $id,
        ':telefone' => $newData['telefone'],
    ]);
    return $response->withStatus(200)->withJson(['message' => 'Telefone atualizado com sucesso']);
};


$app->run();

?>