import Sequelize from "sequelize";

export default class PgSequelize {

    /**
     * Constructor do adapter PgSequelize, que utilizará o Sequelize para manipular dados em banco com Models dinamicamente.
     * @param {object} objConfigDB      Objeto de configurações do banco de dados 
     * @param {object} objModel         Objeto da Model que será manipulada 
     */
    constructor(objConfigDB, objModel) {

        /**
         * Armazena uma instância da conexão do banco de dados
         */
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
    }
}