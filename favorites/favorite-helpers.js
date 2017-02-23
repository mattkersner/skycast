const models = require('../db/models/index');

function findFaves(req, res, next) {
  models.sequelize.query('SELECT "Users"."username", "Favorites"."address" FROM "Users" JOIN "Favorites" ON "Favorites"."user_id" = "Users"."id" WHERE "Users"."id" = :id;', {
    replacements: { id: req.user.id },
    type: models.sequelize.QueryTypes.SELECT
  }).then((faves) => {
    res.locals.faves = faves;
    return next();
  })
}

module.exports = {
  findFaves
}
