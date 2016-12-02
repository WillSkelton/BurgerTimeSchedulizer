(function(ctx){

  const Staff = {}
  Staff.allEmployees = [];
  Staff.numStaff = Staff.allEmployees.length;

  // args is an array.
  // args = [
  //   name,
  //   array of skills as bools[true, false...],
  //   availibility = array of times (but now is just the string "availibility"),
  //   isgray = bool,
  //   fullTime = float
  // ]
  function employee(args) {
    this.empNum = args[0];
    this.name = args[1];
    this.skills = {
      canFry: args[2][0],
      canGrill: args[2][1],
      canBun: args[2][2],
      canTill: args[2][3],
      canLobby: args[2][4],
      canExpo: args[2][5],
      canBOH: args[2][6]
    }
    this.availibility = args[3];
    this.isGray = args[4];
    this.fullTime = args[5];
  }

  Staff.getEmployeeData = function() {
    Staff.numStaff = Staff.allEmployees.length;
  }

  Staff.writeEmployeeData = function(args) {
    firebase.database().ref('staff/' + args[0]).set({
      empNum: args[0],
      name: args[1],
      skills: {
        canFry: args[2][0],
        canGrill: args[2][1],
        canBun: args[2][2],
        canTill: args[2][3],
        canLobby: args[2][4],
        canExpo: args[2][5],
        canBOH: args[2][6]
      },
      availibility: args[3],
      isGray: args[4],
      fullTime: args[5]
    });
  }


  Staff.addEmployee = function(event) {
    event.preventDefault();
    Staff.e = event;
    console.log(Staff.e.currentTarget);
    let args = [
      Staff.numStaff,
      Staff.e.currentTarget.name.value,
      // Skills
      [
        $('input[name="fries"]:checked').val(),
        $('input[name="grill"]:checked').val(),
        $('input[name="buns"]:checked').val(),
        $('input[name="till"]:checked').val(),
        $('input[name="lobby"]:checked').val(),
        $('input[name="expo"]:checked').val(),
        $('input[name="boh"]:checked').val()
      ],
      'availibility',
      $('input[name="manager"]').is(':checked'),
      $('input[name="fullTime"]').is(':checked')
    ];
    // console.log(args);
    // console.log(args[2][0]);

    Employee = new employee(args);
    Staff.writeEmployeeData(args);
    Staff.numStaff++;
  }



  $('#newEmployeeForm').on('submit', Staff.addEmployee);
  ctx.Staff = Staff;
})(window)
