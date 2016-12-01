(function(ctx){

  let allEmployees = [];

  // args is an array.
  // args = [
  //   name,
  //   array of skills as bools[true, false...],
  //   availibility = array of times,
  //   isgray = bool,
  //   numHoursPerWeek = float
  // ]
  function Employee(args) {
    this.name = args[0];
    this.skills = {
      canFry: args[1][0],
      canGrill: args[1][1],
      canBun: args[1][2],
      canTill: args[1][3],
      canLobby: args[1][4],
      canExpo: args[1][5],
      canBOH: args[1][6]
    }
    this.availibility = args[2];
    this.isGray = args[3];
    this.numHoursPerWeek = args[4];
  }
})(window)
