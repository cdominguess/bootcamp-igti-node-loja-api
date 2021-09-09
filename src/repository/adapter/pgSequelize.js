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
        try {
            const objCriar = this._converterParaLowerCamelCase(obj);
            const objCriado = await this.instanciaModel.create(objCriar);

            return objCriado;
        } catch (err) {
            throw err;
        }
    }

    async atualizar(obj, id) {
        try {
            const objAtualizar = this._converterParaLowerCamelCase(obj);

            await this.instanciaModel.update(objAtualizar, {
                where: { clienteId: id }
            });

            return await this.instanciaModel.findByPk(id);
        } catch (err) {
            throw err;
        }
    }

    async excluir(id) {
        try {
            await this.instanciaModel.destroy({
                where: { clienteId: id }
            });
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