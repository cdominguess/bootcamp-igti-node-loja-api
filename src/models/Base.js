import Sequelize from "sequelize";
import PgSequelize from "../repository/adapter/pgSequelize.js";

export default class BaseModel {

    contructor(nomeModel, objAtributosModel) {
        const objSequelize = new PgSequelize();

        /**
         * Conterá a instância da conexão criada via Sequelize no adapter.
         * Servirá para fabricar novos objetos de Model, recebendo o nome da model e um objeto JSON com seus atributos a partir das classes que estenderem esta.
         */
        this.factoryModelDb = objSequelize.instanciaSequelizeDb.define(nomeModel, objAtributosModel);

        /**
         * Conterá uma instância do objeto Sequelize, que dará acesso aos tipos de dados de cada atributo das models 
         * e outras propriedades necessárias para criar uma model: Sequelize.INTEGER, Sequelize.STRING, etc.
         */
        this.factoryModelProps = Sequelize;
    }
}