APP = typeof APP !== 'undefined' ? APP : {};

(function(app) {
  APP.employees = [
    {
      id: 1,
      name: 'George',
      age: 25,
      salary: 80000
    }, {
      id: 2,
      name: 'Mary',
      age: 35,
      salary: 100000
    }
  ];
})(APP);
