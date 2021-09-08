export default class PgSequelize {

    /**
     * Constructor do adapter PgSequelize, que Objeto da Model que será manipulada.
     * Esta instância será completa, ou seja, a Model base se encarrega de criar uma conexão com o banco de dados utilizando 
     * a interface do Sequelize e feito isso já define os atributos da Model.
     * 
     * @param {object} objModel 
     */
    constructor(objModel) {
        /**
         * Armazena uma instâcia recebida da Model a ser utilizada pelos métodos padrão abaixo
         */
        this.instanciaModel = objModel.instanciaFactoryModel;
    }

    async buscar() {
        try {
            return await this.instanciaModel.findAll();
        } catch (err) {
            throw err;
        }
    }

    async buscarPorId(id) {
        try {
            return await this.instanciaModel.findByPk(id);
        } catch (err) {
            throw err;
        }
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