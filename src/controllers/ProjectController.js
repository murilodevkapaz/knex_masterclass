
const { limit } = require('../database');
const knex = require('../database');

module.exports = {
    async index(req, res, next) {
        try {
            const {user_id, page = 1} = req.query;

            const query = knex('projects')
                .limit(5) // para fazer paginação
                .offset((page - 1) *5)
            //http://localhost:3333/projects?page=2

            const countObj = knex('projects').count();

            if(user_id) {
                query
                    .where({user_id: user_id})
                    .join('users', 'users.id', '=', 'projects.user_id')
                    .select('projects.*', 'users.username')
                    .where('users.deleted_at', null)//só traz os projetos dos usuários que não estap deletados com deleted soft 
                //faz um join com a tabela users buscando o nome do user

                countObj
                    .where({user_id})
            }

            //para mostrar o total de páginas
            const [count] = await countObj;

            //para aparecer o numero de registros no header na requisição
            res.header('X-Total-Count', count["count"]);

            const results = await query;
            
            return res.json(results);   

            //http://localhost:3333/projects?user_id=1 assim chama só um projeto especifico se quiser
            //http://localhost:3333/projects assim chama todos 
        }
        catch (e) {
            next(e);
        }
    },

    async create(req, res, next){
        try{
            const {title, user_id} = req.body;
            await knex('projects').insert({title, user_id});
            return res.status(201).send(); 
        }
        catch(e){
            next(e);
        }
    }
}