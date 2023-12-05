<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Slim\Http\UploadedFile;
use Tuupola\Middleware\CorsMiddleware;

require './vendor/autoload.php';

$app = new \Slim\App;

$app->add(new CorsMiddleware([
    "origin" => ["*"], // Domínio da origem permitida
    "methods" => ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
    "headers.allow" => ["Content-Type", "Authorization", "Accept"], // Headers permitidos
]));

$container = $app->getContainer();
$container['upload_directory'] = __DIR__ . '/uploads';


$app->get('/', function (Request $request, Response $response, array $args) {

    $response->getBody()->write("API");

    return $response;
});

$app->get('/hello/{name}', function (Request $request, Response $response, array $args) {

    $name = $args['name'];
    $response->getBody()->write("Hello, $name");

    return $response;
});

$app->get('/produtos', 'getProdutos');
$app->get('/produto/{id}', 'getProduto');
$app->get('/pizza', 'getPizza');
$app->get('/usuario', 'getUsuario');
$app->post('/inserir', 'getInserir');
$app->post('/cadastrarProdutos', 'getCadastrarProdutos');
$app->post('/cadastrar', 'getCadastrar');
$app->post('/upload', 'getUpload');
$app->delete('/deletar/{id}', 'getDeletar');
$app->put('/alterar/{id}', 'getAlterar');
$app->get('/comentarios', 'getComentarios');
$app->put('/curtidas/{id}', 'getCurtidas');


function getConn()
{
    return new PDO(
        'mysql:host=localhost:3306;dbname=slimprodutos',
        'root',
        '',
        array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
    );
}

function getProdutos(Request $request, Response $response, array $args)
{
    $sql = "SELECT * FROM Produto";
    $stmt = getConn()->query($sql);
    $produtos = $stmt->fetchAll(PDO::FETCH_OBJ);
    $response->getBody()->write(json_encode($produtos));
    return $response;
}

function getProduto(Request $request, Response $response, array $args)
{
    $id = $args['id'];
    $conn = getConn();
    $sql = "SELECT * FROM produto WHERE ID=:id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam("id", $id);
    $stmt->execute();
    $produto = $stmt->fetchObject();

    $response->getBody()->write(json_encode($produto));
    return $response;
}

function getPizza(Request $request, Response $response, array $args)
{
    $sql = "SELECT * FROM pizzas";
    $stmt = getConn()->query($sql);
    $pizzas = $stmt->fetchAll(PDO::FETCH_OBJ);
    $response->getBody()->write(json_encode($pizzas));
    return $response;
}

function getUsuario(Request $request, Response $response, array $args)
{
    $sql = "SELECT * FROM usuarios";
    $stmt = getConn()->query($sql);
    $usuarios = $stmt->fetchAll(PDO::FETCH_OBJ);
    $response->getBody()->write(json_encode($usuarios));
    return $response;
}

function getInserir(Request $request, Response $response, array $args)
{
    $data = $request->getParsedBody(); // Obtenha os dados enviados na solicitação POST

    // Conecte-se ao banco de dados usando PDO ou outro método de sua escolha
    $db = new PDO(
        'mysql:host=localhost:3306;dbname=slimprodutos',
        'root',
        ''
    );

    // Execute a inserção no banco de dados
    $stmt = $db->prepare('INSERT INTO produto (NOME) VALUES (:valor1)');
    $stmt->bindParam(':valor1', $data['valor1']);

    if ($stmt->execute()) {
        return $response->withJson(['message' => 'Dados inseridos com sucesso']);
    } else {
        return $response->withJson(['error' => 'Erro ao inserir dados'], 500);
    }
}
;

function getCadastrar(Request $request, Response $response, array $args)
{
    $data = $request->getParsedBody(); // Obtenha os dados enviados na solicitação POST

    // Conecte-se ao banco de dados usando PDO ou outro método de sua escolha
    $db = new PDO(
        'mysql:host=localhost:3306;dbname=slimprodutos',
        'root',
        ''
    );

    // Execute a inserção no banco de dados
    $stmt = $db->prepare('INSERT INTO usuarios (email, senha) VALUES (:email, :senha)');
    $stmt->bindParam(':email', $data['email']);
    $stmt->bindParam(':senha', $data['senha']);

    if ($stmt->execute()) {
        return $response->withJson(['message' => 'Dados inseridos com sucesso']);
    } else {
        return $response->withJson(['error' => 'Erro ao inserir dados'], 500);
    }
}
;
function getCadastrarProdutos(Request $request, Response $response, array $args)
{
    $data = $request->getParsedBody();
    $db = new PDO(
        'mysql:host=localhost:3306;dbname=slimprodutos',
        'root',
        ''
    );
    $stmt = $db->prepare('INSERT INTO produtos (produto, preco, tipo, descricao, imagem) VALUES (:produto, :preco, :tipo, :descricao, :imagem)');
    $stmt->bindParam(':produto', $data['produto']);
    $stmt->bindParam(':preco', $data['preco']);
    $stmt->bindParam(':tipo', $data['tipo']);
    $stmt->bindParam(':descricao', $data['descricao']);
    $stmt->bindParam(':imagem', $data['imagem']);
    if ($stmt->execute()) {
        return $response->withJson(['message' => 'Dados inseridos com sucesso']);
    } else {
        return $response->withJson(['error' => 'Erro ao inserir dados'], 500);
    }
};

function getUpload(Request $request, Response $response, array $args)
{
    $directory = $this->get('upload_directory');
    $uploadedFiles = $request->getUploadedFiles();  
    $uploadedFile = $uploadedFiles['example1'];
}


function getDeletar(Request $request, Response $response, array $args)
{

    $db = new PDO(
        'mysql:host=localhost:3306;dbname=slimprodutos',
        'root',
        ''
    );
    $id = $args['id'];
    $sql = "DELETE FROM produto WHERE ID = :id";
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':id', $id);
    $stmt->execute();

    return $response->withStatus(200)->withJson(['message' => 'Registro excluído com sucesso']);
};

function getAlterar(Request $request, Response $response, array $args)
{

    $db = new PDO(
        'mysql:host=localhost:3306;dbname=slimprodutos',
        'root',
        ''
    );
    $id = $args['id'];
    $newData = $request->getParsedBody(); // Dados de atualização
    $sql = "UPDATE produto SET NOME = :nome WHERE id = :id";
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':nome', $newData['nome']);
    $stmt->execute();

    return $response->withStatus(200)->withJson(['message' => 'Registro atualizado com sucesso']);

}
;

function getComentarios(Request $request, Response $response, array $args)
{
    $sql = "SELECT * FROM Comentarios";
    $stmt = getConn()->query($sql);
    $comentarios = $stmt->fetchAll(PDO::FETCH_OBJ);
    $response->getBody()->write(json_encode($comentarios));
    return $response;
}

function getCurtidas(Request $request, Response $response, array $args)
{

    $db = new PDO(
        'mysql:host=localhost:3306;dbname=slimprodutos',
        'root',
        ''
    );
    $id = $args['id'];
    $newData = $request->getParsedBody(); // Dados de atualização
    $sql = "UPDATE comentarios SET curtidas = :curtidas, descurtidas = :descurtidas, ok = :ok WHERE id = :id";
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':curtidas', $newData['curtidas']);
    $stmt->bindParam(':descurtidas', $newData['descurtidas']);
    $stmt->bindParam(':ok', $newData['ok']);
    $stmt->execute();
    return $response->withStatus(200)->withJson(['message' => 'Registro atualizado com sucesso']);
};

function moveUploadedFile($directory, UploadedFile $uploadedFile)
{
    $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
    $basename = bin2hex(random_bytes(8)); // see http://php.net/manual/en/function.random-bytes.php
    $filename = sprintf('%s.%0.8s', $basename, $extension);

    $uploadedFile->moveTo($directory . DIRECTORY_SEPARATOR . $filename);

    return $filename;
}


$app->run();

?>