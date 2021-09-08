import BaseModel from "./Base.js";

export default class ClienteModel extends BaseModel {

    /**
     * Cada nova model a ser criada seguirá este padrão:
     * - Estenderá da classe Base;
     * - No constructor passará o nome da tabela e o ojbeto com as propriedades da model em si, no padrão do Sequelize;
     * - A classe base que fará o factory da Model e disponibilizará para uso, no atributo .factoryModelDb
     */
    constructor() {
        super('cliente', {
            clienteId: {
                type: this.factoryModelProps.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            nome: {
                type: this.factoryModelProps.STRING,
                allowNull: false
            },
            cpf: {
                type: this.factoryModelProps.STRING,
                allowNull: false
            },
            telefone: {
                type: this.factoryModelProps.STRING,
                allowNull: false
            },
            email: {
                type: this.factoryModelProps.STRING,
                allowNull: false
            },
            endereco: {
                type: this.factoryModelProps.STRING,
                allowNull: false
            }
        });
    }
}