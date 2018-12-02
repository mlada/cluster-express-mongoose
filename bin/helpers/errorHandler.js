// обработчики имеют 4 параметра вместо 3 как у всех миддлваре
module.exports = function(err, req, res, next) {
  console.error(err);
  res.status(503).send(err.stack || err.message);
};
