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

        /**
         * Armazena uma instâcia recebida da Model a ser utilizada pelos métodos padrão abaixo
         */
        this.instanciaModel = objModel;
    }

    async buscar() {
        console.log("VOU BUSCAR via Sequelize");
    }

    async buscarPorId(id) {
        console.log("VOU BUSCAR por ID via Sequelize");
    }

    async criar(obj) {
        console.log("VOU CRIAR via Sequelize", obj);
    }

    async atualizar(obj, id) {
        console.log("VOU ATUALIZAR via Sequelize o obj e id", obj, id);
    }

    async excluir(id) {
        console.log("VOU EXCLUIR via Sequelize", id);
    }


}