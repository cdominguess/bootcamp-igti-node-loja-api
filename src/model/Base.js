import Sequelize from "sequelize";
import config from "../config.js";

export default class BaseModel {

    /**
     * A casse base para definição de Models funciona da seguinte maneira:
     * 1 - No contructor é criada uma instância de conexão ao banco de dados utilizando o Sequelize;
     * 
     * 2 - Feito isso as novas classes de model estendem esta e em seu constructor passam:
     * 2.1 - O nome da model a ser criada pelo Sequelize;
     * 2.2 - O objeto contendo os atributos seguindo a padronização esperada pelo Sequelize;
     * 
     * 3 - É feito um factory da nova model, utilizando a conexão ao banco contida no atributo .instanciaConexaoDb 
     * 
     * 4 - Esta instância de model criada é armazenada no atributo .instanciaFactoryModel
     * 
     * @param {string} nome 
     * @param {object} atributos 
     */
    constructor(nome, atributos) {
        const objConfigDB = (process.env.NODE_ENV === 'production') ? config.dbProd : config.dbDev;

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

        this.instanciaFactoryModel = this.instanciaConexaoDb.define(nome, atributos);
    }

    getFactoryModel() {
        return this.instanciaFactoryModel;
    }
}