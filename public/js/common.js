APP = typeof APP !== 'undefined' ? APP : {};

(function(app, global) {

  var DialogLayout = Marionette.LayoutView.extend({
    template: '#dialog-template',
    regions: {
      body: '.dialog-body'
    }
  });

  app.Dialog = Marionette.Object.extend({
    initialize: function(options) {
      var view = options.view,
      _this = this;

      this.layout = new DialogLayout();
      this.layout.render();

      this.layout.showChildView('body', view);

      $modal = $('#modal-dialog');
      $modal.addClass('blanket');

      $modal.one('click', function() {
        _this.destroy();
      });

      $mwrap = $('<div></div>');
      $mwrap.addClass('modal-dlg-wrap')
        .append(this.layout.$el);

      $mwrap.addClass('invisible');

      $modal.after($mwrap);

      var a = $mwrap.width();
      $mwrap.css('left', -(a / 2));
      $mwrap.removeClass('invisible');
    },

    destroy: function() {
      this.layout.destroy();
      $mwrap = $('.modal-dlg-wrap');
      $mwrap.remove();

      $modal = $('#modal-dialog');
      $modal.removeClass('blanket');
    }
  });
})(APP, window)
