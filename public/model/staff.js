(function(ctx){

  const Staff = {}
  Staff.allEmployees = [];
  Staff.names = [];

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


  Staff.getEmployeeData = function(){
    //var userId = firebase.auth().currentUser.uid; NOTE: This is for authorization

    return firebase.database().ref('staff/').once('value').then(function(snapshot) {
      return snapshot.val();
    })

  };

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



    console.log(Staff.names);



    // EMPLOYEE EXISTS
    console.log();
    if ((Staff.names.indexOf((Staff.e.currentTarget.name.value).toLowerCase())) !== -1) {
      console.log('EMPLOYEE EXISTS');
    }
    // EMPLOYEE DOES NOT EXIST
    else {
      console.log('EMPLOYEE DOES NOT EXIST. CREATING NEW EMPLOYEE.');
      Employee = new employee(args);
      Staff.writeEmployeeData(args);
      Staff.numStaff++;
    }


    Staff.allEmployees = [];
    Staff.names = [];

    Staff.getEmployeeData().then(function(people){
      people.forEach((e) => {
        Staff.allEmployees.push(e)
        Staff.names.push((e['name']).toLowerCase());
      })
      Staff.numStaff = Staff.allEmployees.length;
    });
  }

  Staff.getEmployeeData().then(function(people){
    people.forEach((e) => {
      Staff.allEmployees.push(e)
      Staff.names.push((e['name']).toLowerCase());
    })
    Staff.numStaff = Staff.allEmployees.length;
  });


  $('#newEmployeeForm').on('submit', Staff.addEmployee);
  ctx.Staff = Staff;
})(window)
