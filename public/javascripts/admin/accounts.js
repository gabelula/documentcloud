dc.ui.AdminAccounts = dc.Controller.extend({

  // Keep in sync with account.rb
  ADMINISTRATOR : 1,
  CONTRIBUTOR   : 2,

  callbacks : {},

  constructor : function(options) {
    this.base(options);
  },

  render : function() {
    $(this.el).html(JST.admin_accounts({}));
    var rows = Accounts.map(function(account) {
      return (new dc.ui.AccountView({model : account, kind : 'admin'})).render().el;
    });
    this.$('tbody').append(rows);
    return this;
  },

  isAdmin : function() {
    return this.get('role') == this.ADMINISTRATOR;
  }

});