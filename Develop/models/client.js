
module.exports = function(sequelize, DataTypes) {
    var clients = sequelize.define("Client", {
      text: DataTypes.STRING,
      complete: DataTypes.BOOLEAN
    });
    return clients;
  };