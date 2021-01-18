
const knex = require('../database');

module.exports = {
    async index(req, res) {
        const results = await knex('users')
            .where('deleted_at', null)//nao mostra os usuarios deletados delete soft
        return res.json(results);
    },
    async create(req, res, next) {
        try{
            const {username} = req.body;
            await knex('users').insert({username});
            return res.status(201).send();
        }
        catch(e){
            next(e);
        }
    }, 
    async update(req, res, next){
        try{
            const {username} = req.body;
            const {id} = req.params;
            await knex('users')
                .update({username})
                .where({id});
            

            return res.send();
        }
        catch(e){
            next(e);
        }
    },
    async delete(req, res, next){
        try{
            const {id} = req.params;

            await knex('users')
                .where({id: id})
                //.del();  => aqui deleta o usuário (esse é o delete hard)
                .update('deleted_at', new Date()); // aqui só da um delete soft setando na coluna

            res.send();
        }
        catch(e){
            next(e);
        }
    }
}