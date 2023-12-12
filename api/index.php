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
$app->put('/curtidas/{id}', 'getCurtidas');
$app->post('/cadastro', 'getCadastrar');
$app->get('/usuarios', 'getUsuarios');
$app->get('/noticias', 'getNoticias');
$app->post('/agendar', 'getAgendar');
$app->post('/AdicionarPet', 'getAdicionarPet');
$app->post('/vacinas', 'getVacina');
$app->post('/inserirNoticia', 'getInserirNoticia');


$app->put('/updateEmail/{cd_cliente}', 'updateEmail');
$app->put('/updateTelefone/{cd_cliente}', 'updateTelefone');




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

function getNoticias(Request $request, Response $response, array $args) {
    $sql = "SELECT * FROM tb_noticias";
    $stmt = getConn()->query($sql);
    $noticias = $stmt->fetchAll(PDO::FETCH_OBJ);
    $response->getBody()->write(json_encode($noticias));
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
};
function getInserirNoticia(Request $request, Response $response, array $args) {

    $dataNoticia = $request->getParsedBody();    
    if (empty($dataNoticia['noticia']) || empty($dataNoticia['imagem'])) {
        // Retorna uma resposta com erro caso um dos campos esteja vazio ou nulo
        return $response->withStatus(400)->withJson(['error' => 'Campos "noticia" ou "imagem" não podem estar vazios']);
    }

    $db = getConn();
    $stmt = $db->prepare('INSERT INTO tb_noticias (ds_noticia, img_noticia) VALUES (:noticia, :imagem)');
    $stmt->execute([
        ':noticia' => $dataNoticia['noticia'],
        ':imagem' => $dataNoticia['imagem'],
    ]);
    return $response->withStatus(200)->withJson(['message' => 'Dados inseridos com sucesso']);
};
function getAdicionarPet(Request $request, Response $response, array $args) {

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

function getcadastrarPizza(Request $request, Response $response, array $args)
{
    try {
        $uploadedFiles = $request->getUploadedFiles();
        $uploadedFile = $uploadedFiles['imagem'];

        // Verifique se um arquivo foi realmente enviado
        if ($uploadedFile->getError() !== UPLOAD_ERR_OK) {
            return $response->withJson(['error' => 'Erro no upload de imagem'], 500);
        }

        $uploadPath = 'C:\Users\Aluno\Documents\GitHub\PizzaRuth\src\assets';

        // Verifique se o diretório de upload existe, se não, crie-o
        if (!is_dir($uploadPath)) {
            mkdir($uploadPath, 0755, true);
        }

        // Use o nome original do arquivo
        $filename = $uploadedFile->getClientFilename();
        $uploadedFile->moveTo($uploadPath . DIRECTORY_SEPARATOR . $filename);

        $db = getConn();
        $data = $request->getParsedBody();

        $stmt = $db->prepare('INSERT INTO pizzas (sabor, descricao, imagem, preco, categoria) VALUES (:sabor, :descricao, :imagem, :preco, :categoria)');
        $stmt->bindParam(':sabor', $data['sabor']);
        $stmt->bindParam(':descricao', $data['descricao']);
        $stmt->bindParam(':imagem', $filename);
        $stmt->bindParam(':preco', $data['preco']);
        $stmt->bindParam(':categoria', $data['categoria']); // Nova linha para a categoria

        if ($stmt->execute()) {
            return $response->withJson(['message' => 'Produto cadastrado com sucesso']);
        } else {
            return $response->withJson(['error' => 'Erro ao cadastrar produto - Falha na execução da instrução SQL'], 500);
        }
    } catch (PDOException $e) {
        return $response->withJson(['error' => 'Erro ao cadastrar produto - ' . $e->getMessage()], 500);
    }
}


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