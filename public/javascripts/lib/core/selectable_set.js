dc.model.SelectableSet = Base.extend({

  firstSelection : null,

  selectedCount : 0,

  selectAll : function() {
    this.each(function(m){ m.set({selected : true}); });
  },

  deselectAll : function() {
    this.each(function(m){ m.set({selected : false}); });
  },

  selected : function() {
    return this.select(function(m){ return m.get('selected'); });
  },

  selectedIds : function() {
    return _.pluck(this.selected(), 'id');
  },

  _resetSelection : function() {
    this.firstSelection = null;
    this.selectedCount = 0;
  },

  _add : function(model, silent) {
    if (model._attributes.selected == null) model._attributes.selected = false;
    this.base(model, silent);
    if (model.get('selected')) this.selectedCount += 1;
  },

  _remove : function(model, silent) {
    this.base(model, silent);
    if (this.selectedCount > 0 && model.get('selected')) this.selectedCount -= 1;
  },

  // We override "_onModelEvent" to fire selection changed events when models
  // change their selected state.
  _onModelEvent : function(e, model) {
    this.base(e, model);
    var sel = (e == 'model:changed' && model.hasChanged('selected'));
    if (sel) {
      var selected = model.get('selected');
      if (selected && this.selectedCount == 0) {
        this.firstSelection = model;
      } else if (!selected && this.firstSelection == model) {
        this.firstSelection = null;
      }
      this.selectedCount += selected ? 1 : -1;
      _.defer(_(this.fire).bind(this, 'model:selected', this));
    }
  }

});