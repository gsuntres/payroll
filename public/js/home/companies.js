APP = typeof APP !== 'undefined' ? APP : {};

(function(app) {
  var Company = Backbone.Model.extend({});

  var CompanyView = Marionette.ItemView.extend({
    model: Company,
    tagName: 'li',
    className: '',
    template: '#company-tpl'
  });

  var EmptyView = Marionette.ItemView.extend({
    tagName: 'p',
    template: '#empty-template'
  });

  var CompaniesView = Marionette.CollectionView.extend({
    tagName: 'ul',
    className: 'vlist',
    childView: CompanyView,
    emptyView: EmptyView
  })

  var PageLayout = Marionette.LayoutView.extend({
    el: '.main-page',
    template: false,
    regions: {
      main: '.companies-page'
    }
  });

  app.CompaniesObject = Marionette.Object.extend({
    initialize: function(options) {
      var companies = options.companies || [];
      var layout = new PageLayout();
      layout.render();

      var companiesView = new CompaniesView({
        collection: new Backbone.Collection(companies)
      });

      layout.showChildView('main', companiesView);
    }
  });
})(APP);
