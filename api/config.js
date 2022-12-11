'use strict'

//realizando as importacoes
const dotenv = require('dotenv');
const assert = require('assert');

//configurando o dotenv
dotenv.config();

//criando o objeto que ira conter as variaveis de ambiente
const {
    PORT,
    HOST,
    HOST_URL,
    SECRET_KEY,
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID
} = process.env

//definindo obrigatoriedade de parametros
assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');

//exportando o modulo 
module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    secretKey: SECRET_KEY,
    firebaseConfig: {
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGING_SENDER_ID,
        appId: APP_ID,
    },
}