APP = typeof APP !== 'undefined' ? APP : {};

(function(app) {
  // Models & Collections
  //

  // Views & Layouts
  //
  var FilterView = Marionette.ItemView.extend({
    tagName: 'form',
    className: 'search-by-name-filter search-filter form-inline',
    template: '#filter-template',
    ui: {
      submitBtn: 'input[type="submit"]',
      resetBtn: '.reset-filter'
    },
    triggers: {
      'submit': 'filter:submitted'
    },
    onShow: function() {
    }
  });

  var EmployeeView = Marionette.ItemView.extend({
    tagName: 'li',
    template: '#employee-template',
    ui: {
      'employee-link': 'h3 > a'
    },
    triggers: {
      'click @ui.employee-link': 'employee:clicked'
    }
  });

  var EmployeesView = Marionette.CollectionView.extend({
    childView: EmployeeView,
    tagName: 'ul',
    className: 'vlist',
    onChildviewEmployeeClicked: function(childView) {
      console.log(childView);
      var EmpView = Marionette.ItemView.extend({
        template: '#employee-details-template',
        className: 'details'
      });
      var emp = new EmpView({ model: childView.model});
      new app.Dialog({ view: emp });
    }
  });

  var EmptyView = Marionette.ItemView.extend({
    tagName: 'p',
    template: '#empty-template'
  });

  var PageLayout = Marionette.LayoutView.extend({
    el: '.main-page',
    template: false,
    regions: {
      filter: '.filter',
      results: '.results'
    }
  });

  // Bootstrap object
  app.SearchByNameObject = Marionette.Object.extend({
    initialize: function(options) {
      var employees = options.employees || [];
      var layout = new PageLayout();
      layout.render();

      var filterView = new FilterView();
      this.listenTo(filterView, 'filter:submitted', function() {
        var resultsView = new EmployeesView({
          collection: new Backbone.Collection(employees)
        });
        layout.showChildView('results', resultsView);
      });
      layout.showChildView('filter', filterView);
    }
  });
})(APP);
