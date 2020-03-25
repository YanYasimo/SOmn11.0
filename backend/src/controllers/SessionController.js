const connection = require('../database/connection');

module.exports = {
    async create (request, response){
        const { id } = request.body;
        
        const ong = await connection('ongs').where('id', id).select('name').first();

        if (!ong) {
            return response.status(400).json({ error: 'No ONG found with this ID' });
        }

        return response.json(ong);
    }
}

// const connection = require('../database/connection');

// module.exports = {
//   async create(req, res) {
//     const { id } = req.body;

//     const ong = await connection('ongs')
//       .where('id', id)
//       .select('name')
//       .first();

//     if (!ong) {
//       return res.status(400).json({ error: 'ONG não encontrada' })
//     };

//     return res.status(200).json(ong);
//   }

// }