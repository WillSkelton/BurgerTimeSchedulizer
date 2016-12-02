(function(ctx){

  const Staff = {}
  Staff.allEmployees = [];

  // args is an array.
  // args = [
  //   name,
  //   array of skills as bools[true, false...],
  //   availibility = array of times,
  //   isgray = bool,
  //   fullTime = float
  // ]
  function employee(args) {
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
    this.fullTime = args[4];
  }

  Staff.writeEmployeeData = function(args) {
    firebase.database().ref('staff/' + args[0]).set({
      name: args[0],
      skills: {
        canFry: args[1][0],
        canGrill: args[1][1],
        canBun: args[1][2],
        canTill: args[1][3],
        canLobby: args[1][4],
        canExpo: args[1][5],
        canBOH: args[1][6]
      },
      availibility: args[2],
      isGray: args[3],
      fullTime: args[4]
    });
  }


  let tempArgs = [
    'will',
    [true, true, true, true, true, true, true],
    'availibility',
    false,
    28
  ]
  Staff.writeEmployeeData(tempArgs);

  ctx.Staff = Staff;
})(window)
