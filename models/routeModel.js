const db = require('./db');

const RouteModel = {
  getAllRoutes(callback) {
    db.all("SELECT * FROM routes", callback);
  },

  getRouteById(id, callback) {
    db.get("SELECT * FROM routes WHERE id = ?", [id], callback);
  },

  createRoute(route, callback) {
    const { name, price, seats } = route;
    db.run("INSERT INTO routes (name, price, seats) VALUES (?, ?, ?)", [name, price, seats], callback);
  },

  updateRoute(id, updatedRoute, callback) {
    const { name, price, seats } = updatedRoute;
    db.run(
      "UPDATE routes SET name = ?, price = ?, seats = ? WHERE id = ?",
      [name, price, seats, id],
      callback
    );
  },

  deleteRoute(id, callback) {
    db.run("DELETE FROM routes WHERE id = ?", [id], callback);
  }
};

module.exports = RouteModel;
