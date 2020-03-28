const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

/* 
    Métodos HTTP:

    GET: Buscar/listar uma informação do back-end
    POST: Criar uma informação no back-end
    PUT: Alterar uma informação no back-end
    DELETE: Deletar uma informação no backend
*/

/**
 * Tipos de Parâmetros:
 * 
 * Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, Paginação)
 * Route Params: Parâmetros utilizados para identificar recursos
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
 */
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());


module.exports = app;