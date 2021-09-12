import { Sequelize } from "sequelize";
import config from "../../config.js";

export default class PgSequelize {

    /**
     * Constructor do adapter PgSequelize, que Objeto da Model que será manipulada.
     * Esta instância da Model terá apenas o nome e atributos para o Factory da model, que fica
     * sob a responsabilidade aqui do adapter PgSequelize
     * 
     * @param {object} objModel 
     */
    constructor(objModel) {
        const objConfigDB = (process.env.NODE_ENV === 'production') ? config.dbProd : config.dbDev;

        // Cria a conexão com o banco de dados
        this.instanciaConexaoDb = new Sequelize(
            `postgres://${objConfigDB.user}:${objConfigDB.password}@${objConfigDB.host}/${objConfigDB.database}`,
            {
                dialect: "postgres",
                define: {
                    timestamps: false,
                    freezeTableName: true,
                    underscored: true
                }
            }
        );

        // Recebe o nome e atributos do objModel e cria uma instância de Model do Sequelize que será utilizada nos métodos abaixo
        this.instanciaFactoryModel = this.instanciaConexaoDb.define(objModel.nome, objModel.atributos);
    }

    async buscar() {
        try {
            return await this.instanciaFactoryModel.findAll();
        } catch (err) {
            throw err;
        }
    }

    async buscarPorId(id) {
        try {
            return await this.instanciaFactoryModel.findByPk(id);
        } catch (err) {
            throw err;
        }
    }

    async criar(obj) {
        try {
            const objCriar = this._converterParaLowerCamelCase(obj);
            const objCriado = await this.instanciaFactoryModel.create(objCriar);

            return objCriado;
        } catch (err) {
            throw err;
        }
    }

    async atualizar(obj, id) {
        try {
            const objAtualizar = this._converterParaLowerCamelCase(obj);

            await this.instanciaFactoryModel.update(objAtualizar, {
                where: { clienteId: id }
            });

            return await this.instanciaModel.findByPk(id);
        } catch (err) {
            throw err;
        }
    }

    async excluir(id) {
        try {
            await this.instanciaFactoryModel.destroy({
                where: { clienteId: id }
            });
        } catch (err) {
            throw err;
        }
    }

    
    /**
     * Método que busca campos dinamicamente em uma tabela com base nos filtros passados
     * @param {array} arrCampos 
     * @param {array} arrValores 
     * @returns 
     */
     async filtrar(arrCampos, arrValores) {
        const conn = await this._objConexao.connect();
        try {
            console.log('falta implementar!!');
            return true;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Converte as chaves de um objeto que conter _ para o padrão lowerCamelCase
     * @param {object} obj 
     * @returns object
     */
    _converterParaLowerCamelCase(obj) {
        let arr = [];

        // Percorre as linhas do objeto
        Object.entries(obj).forEach((dadosObj, indice) => {
            let arrItemObj = [];
            let chaveItemObj = dadosObj[0];
            let valorItemObj = dadosObj[1];

            // Se tiver _ na chave de alguma linha do objeto, deve-se alterar para o padrão camelCase
            const partesChaveItemObj = chaveItemObj.split('_');
            if (partesChaveItemObj.length > 1) {
                let arrPalavraLowerCamelCase = [];
                partesChaveItemObj.forEach((palavra, indice) => {
                    if (indice > 0) arrPalavraLowerCamelCase.push(palavra[0].toUpperCase() + palavra.substr(1));
                });
                chaveItemObj = partesChaveItemObj[0] + arrPalavraLowerCamelCase.join('');
            }

            // A chave da linha do objeto Alterado para camelCase ou não, adiciona no array que recriará o objeto 
            arrItemObj.push(chaveItemObj);
            arrItemObj.push(valorItemObj);
            arr.push(arrItemObj);
        });

        return Object.fromEntries(arr);
    }
}