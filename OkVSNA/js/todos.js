$(function() {

  Parse.$ = jQuery;

  // Initialize Parse with your Parse application javascript keys
  Parse.initialize("BeYZxSllTAa0uompCH7V49osUz0MZlpMHTrtqLpG",
                   "pGpQ1ERlCRDO8rX59aCG2q6rT6uK3RlQbq3uWLX1");

  // Todo Model
  // ----------

  // Our basic Todo model has `content`, `order`, and `done` attributes.
  var Todo = Parse.Object.extend("User", {
    // Default attributes for the todo.
    defaults: {
      content: "empty todo...",
      done: false
    },

    // Ensure that each todo created has `content`.
    initialize: function() {
      if (!this.get("content")) {
        this.set({"content": this.defaults.content});
      }
    },

    // Toggle the `done` state of this todo item.
    toggle: function() {
      this.save({done: !this.get("done")});
    }
  });

  // Our basic Todo model has `content`, `order`, and `done` attributes.
  var Todo2 = Parse.Object.extend("Todo2", {
    // Default attributes for the todo.
    defaults: {
      content: "empty todo...",
      done: false
    },

    // Ensure that each todo created has `content`.
    initialize: function() {
      if (!this.get("content")) {
        this.set({"content": this.defaults.content});
      }
    },

    // Toggle the `done` state of this todo item.
    toggle: function() {
      this.save({done: !this.get("done")});
    }
  });

  // Our basic Todo model has `content`, `order`, and `done` attributes.
  var Todo3 = Parse.Object.extend("Todo3", {
    // Default attributes for the todo.
    defaults: {
      content: "empty todo...",
      done: false
    },

    // Ensure that each todo created has `content`.
    initialize: function() {
      if (!this.get("content")) {
        this.set({"content": this.defaults.content});
      }
    },

    // Toggle the `done` state of this todo item.
    toggle: function() {
      this.save({done: !this.get("done")});
    }
  });

  // This is the transient application state, not persisted on Parse
  var AppState = Parse.Object.extend("AppState", {
    defaults: {
      filter: "all"
    }
  });

  // Todo Collection
  // ---------------
  var TodoList = Parse.Collection.extend({

    // Reference to this collection's model.
    model: Todo,

    // Filter down the list of all todo items that are finished.
    done: function() {
        return this.filter(function(todo){ return todo.get('done'); });
    },

    // Filter down the list to only todo items that are still not finished.
    remaining: function() {
        return this.without.apply(this, this.done());
    },

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
        if (!this.length) return 1;
        return this.last().get('order') + 1;
    },

    // Todos are sorted by their original insertion order.
    comparator: function(todo) {
        return todo.get('order');
    }
  });


  // Todo Item View
  // --------------

  // The DOM element for a todo item...
  var TodoView = Parse.View.extend({

    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    template: _.template($('#match-template').html()),

    // The DOM events specific to an item.
    events: {
      "click .toggle"              : "toggleDone",
      "dblclick label.todo-content" : "edit",
      "click .todo-destroy"   : "clear",
      "keypress .edit"      : "updateOnEnter",
      "blur .edit"          : "close"
    },

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a Todo and a TodoView in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      _.bindAll(this, 'render', 'close', 'remove');
      this.model.bind('change', this.render);
      this.model.bind('destroy', this.remove);
    },

    // Re-render the contents of the todo item.
    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      this.input = this.$('.edit');
      return this;
    },

    // Toggle the `"done"` state of the model.
    toggleDone: function() {
      this.model.toggle();
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
      $(this.el).addClass("editing");
      this.input.focus();
    },

    // Close the `"editing"` mode, saving changes to the todo.
    close: function() {
      this.model.save({content: this.input.val()});
      $(this.el).removeClass("editing");
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },

    // Remove the item, destroy the model.
    clear: function() {
      this.model.destroy();
    }

  });



  // Todo Collection
  // ---------------
  var TodoList2 = Parse.Collection.extend({

    // Reference to this collection's model.
    model: Todo2,

    // Filter down the list of all todo items that are finished.
    done: function() {
        return this.filter(function(todo){ return todo.get('done'); });
    },

    // Filter down the list to only todo items that are still not finished.
    remaining: function() {
        return this.without.apply(this, this.done());
    },

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
        if (!this.length) return 1;
        return this.last().get('order') + 1;
    },

    // Todos are sorted by their original insertion order.
    comparator: function(todo) {
        return todo.get('order');
    }
  });


  // Todo Item View
  // --------------

  // The DOM element for a todo item...
  var TodoView2 = Parse.View.extend({

    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    template: _.template($('#item-template').html()),

    // The DOM events specific to an item.
    events: {
      "click .toggle"              : "toggleDone",
      "dblclick label.todo-content" : "edit",
      "click .todo-destroy"   : "clear",
      "keypress .edit"      : "updateOnEnter",
      "blur .edit"          : "close"
    },

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a Todo and a TodoView in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      _.bindAll(this, 'render', 'close', 'remove');
      this.model.bind('change', this.render);
      this.model.bind('destroy', this.remove);
    },

    // Re-render the contents of the todo item.
    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      this.input = this.$('.edit');
      return this;
    },

    // Toggle the `"done"` state of the model.
    toggleDone: function() {
      this.model.toggle();
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
      $(this.el).addClass("editing");
      this.input.focus();
    },

    // Close the `"editing"` mode, saving changes to the todo.
    close: function() {
      this.model.save({content: this.input.val()});
      $(this.el).removeClass("editing");
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },

    // Remove the item, destroy the model.
    clear: function() {
      this.model.destroy();
    }

  });


  // Todo Collection
  // ---------------
  var TodoList3 = Parse.Collection.extend({

    // Reference to this collection's model.
    model: Todo3,

    // Filter down the list of all todo items that are finished.
    done: function() {
        return this.filter(function(todo){ return todo.get('done'); });
    },

    // Filter down the list to only todo items that are still not finished.
    remaining: function() {
        return this.without.apply(this, this.done());
    },

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
        if (!this.length) return 1;
        return this.last().get('order') + 1;
    },

    // Todos are sorted by their original insertion order.
    comparator: function(todo) {
        return todo.get('order');
    }
  });


  // Todo Item View
  // --------------

  // The DOM element for a todo item...
  var TodoView3 = Parse.View.extend({

    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    template: _.template($('#item-template').html()),

    // The DOM events specific to an item.
    events: {
      "click .toggle"              : "toggleDone",
      "dblclick label.todo-content" : "edit",
      "click .todo-destroy"   : "clear",
      "keypress .edit"      : "updateOnEnter",
      "blur .edit"          : "close"
    },

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a Todo and a TodoView in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      _.bindAll(this, 'render', 'close', 'remove');
      this.model.bind('change', this.render);
      this.model.bind('destroy', this.remove);
    },

    // Re-render the contents of the todo item.
    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      this.input = this.$('.edit');
      return this;
    },

    // Toggle the `"done"` state of the model.
    toggleDone: function() {
      this.model.toggle();
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
      $(this.el).addClass("editing");
      this.input.focus();
    },

    // Close the `"editing"` mode, saving changes to the todo.
    close: function() {
      this.model.save({content: this.input.val()});
      $(this.el).removeClass("editing");
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },

    // Remove the item, destroy the model.
    clear: function() {
      this.model.destroy();
    }

  });


  // The Application
  // ---------------
  // The main view that lets a user manage their todo items
  var ManageTodosView = Parse.View.extend({

    // Our template for the line of statistics at the bottom of the app.
    statsTemplate: _.template($('#stats-template').html()),
    statsTemplate2: _.template($('#stats-template2').html()),
    navTemplate: _.template($('#navigation-template').html()),
    profileItemTemplate: _.template($('#profile-item-template').html()),
    profileItemTemplateMC: _.template($('#profile-item-template-mc').html()),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "keypress #new-todo":  "createOnEnter",
      "keypress #new-todo2":  "createOnEnter2",
      "dblclick .profile-label" : "editField",
      "click .profile-field-pencil"   : "editField",
      "click #submit_new": "submitNewPhoto",
      "keypress .editProfileField" : "updateField",
      "change .editProfileFieldMC" : "updateFieldMC",
      "blur .editProfileField" : "closeField",
      "blur .editProfileFieldMC" : "closeFieldMC",
      "click #clear-completed": "clearCompleted",
      "click #clear-completed2": "clearCompleted2",
      "click #toggle-all": "toggleAllComplete",
      "click #toggle-all2": "toggleAllComplete2",
      "click .log-out": "logOut",
      "click ul#filters a": "selectFilter"
    },

    el: ".content",

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved to Parse.
    initialize: function() {
      var self = this;

      _.bindAll(this, 'addOne', 'addOne2', 'addAll', 'addAll2', 'addSome', 'addSome2', 'render', 'toggleAllComplete', 'toggleAllComplete2', 'logOut', 'createOnEnter', 'createOnEnter2', 'editField', 'submitNewPhoto');

      // Main todo management template
      this.$el.html(_.template($("#manage-todos-template").html()));

      this.$('#public-profile').append(this.profileItemTemplateMC({
        label: "gender",
        field_name: "Gender",
        opts: [
          "Male",
          "Female"
        ]
      }));
      this.$('#public-profile').append(this.profileItemTemplateMC({
        label: "birth_day",
        field_name: "Birth Day",
        opts: [
          "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", 
          "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24",
          "25", "26", "27", "28", "29", "30", "31"
        ]
      }));
      this.$('#public-profile').append(this.profileItemTemplateMC({
        label: "birth_month",
        field_name: "Birth Month",
        opts: [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ]
      }));
      this.$('#public-profile').append(this.profileItemTemplateMC({
        label: "birth_year",
        field_name: "Birth Year",
        opts: [
          "1970", "1971", "1972", "1973", "1974", "1975", "1976", "1977",
          "1978", "1979", "1980", "1981", "1982", "1983", "1984", "1985",
          "1986", "1987", "1988", "1989", "1990", "1991", "1992", "1993",
          "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001"
        ]     }));
      this.$('#public-profile').append(this.profileItemTemplate({
        label: "zip_code",
        field_name: "Zip Code"
      }));
      this.$('#public-profile').append(this.profileItemTemplate({
        label: "about_me",
        field_name: "About me"
      }));
      this.$('#public-profile').append(this.profileItemTemplate({
        label: "occupation",
        field_name: "Occupation"
      }));
      this.$('#public-profile').append(this.profileItemTemplateMC({
        label: "diet",
        field_name: "Diet",
        opts: [
          "Vegan",
          "Vegetarian",
          "Mostly Vegetarian",
          "Mostly Anything"
        ]
      }));
      this.$('#interested-in').append(this.profileItemTemplate({
        label: "min_age",
        field_name: "Min age"
      }));
      this.$('#interested-in').append(this.profileItemTemplate({
        label: "max_age",
        field_name: "Max age"
      }));
      this.$('#interested-in').append(this.profileItemTemplate({
        label: "max_distance",
        field_name: "Max distance"
      }));
//      this.$('#interested-in').append(this.profileItemTemplateMC({
//        label: "max_distance",
//        field_name: "Diet",
//        opts: [
//          "Vegan",
//          "Vegetarian",
//          "Mostly Vegetarian",
//          "Mostly Anything"
//        ]
//      }));
      this.$('#settings').append(this.profileItemTemplate({
        label: "contact_email",
        field_name: "Contact email"
      }));


      this.input = this.$("#new-todo");
      this.input2 = this.$("#new-todo2");
      this.allCheckbox2 = this.$("#toggle-all2")[0];

      // Create our collection of Todos
      this.todos = new TodoList;

      // Setup the query for the collection to look for todos from the current user
      //this.todos.query = new Parse.Query(Todo);
      //this.todos.query.notEqualTo("objectId", Parse.User.current().id);
      //this.todos.bind('add',     this.addOne);
      //this.todos.bind('reset',   this.addAll);
      //this.todos.bind('all',     this.render);

      // Fetch all the todo items for this user
      //this.todos.fetch();

      // Create our collection of Todos
      this.todos2 = new TodoList2;

      // Setup the query for the collection to look for todos from the current user
      this.todos2.query = new Parse.Query(Todo2);
      this.todos2.query.equalTo("user", Parse.User.current());
      this.todos2.bind('add',     this.addOne2);
      this.todos2.bind('reset',   this.addAll2);
      this.todos2.bind('all',     this.render);

      // Fetch all the todo items for this user
      this.todos2.fetch();

      // Create our collection of Todos
      this.todos3 = new TodoList3;

      // Setup the query for the collection to look for todos from the current user
      this.todos3.query = new Parse.Query(Todo3);
      this.todos3.query.equalTo("user", Parse.User.current());
      this.todos3.bind('add',     this.addOne3);
      this.todos3.bind('reset',   this.addAll3);
      this.todos3.bind('all',     this.render);

      // Fetch all the todo items for this user
      this.todos3.fetch();

      state.on("change", this.filter, this);
    },

    // Logs out the user and shows the login view
    logOut: function(e) {
      Parse.User.logOut();
      new LogInView();
      this.undelegateEvents();
      delete this;
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      var done = this.todos.done().length;
      var remaining = this.todos.remaining().length;

      this.$('#todo-stats').html(this.statsTemplate({
        total:      this.todos.length,
        done:       done,
        remaining:  remaining
      }));

      var done2 = this.todos2.done().length;
      var remaining2 = this.todos2.remaining().length;

      this.$('#todo-stats2').html(this.statsTemplate2({
        total:      this.todos2.length,
        done:       done2,
        remaining:  remaining2
      }));


      this.$('#nav').html(this.navTemplate({
        remaining:  remaining2
      }));
      this.delegateEvents();

      this.allCheckbox2.checked = !remaining2;
    },

    // Filters the list based on which type of filter is selected
    selectFilter: function(e) {
      var el = $(e.target);
      var filterValue = el.attr("id");
      state.set({filter: filterValue});
      Parse.history.navigate(filterValue);
    },

    filter: function() {
      var filterValue = state.get("filter");
      this.$("ul#filters a").removeClass("selected");
      this.$("ul#filters a#" + filterValue).addClass("selected");
      if (filterValue === "all") {
        this.$("#profile").show();
        this.$("#matches").hide();
        this.$("#messages").hide();
        //this.addAll();
      } else if (filterValue === "completed") {
        this.$("#profile").hide();
        this.$("#matches").hide();
        this.$("#messages").show();
        ///this.addSome(function(item) { return item.get('done') });
      } else {
        this.$("#profile").hide();
        this.$("#matches").show();
        this.$("#messages").hide();
        //this.addSome(function(item) { return !item.get('done') });
        /*
        this.todos = new TodoList;

        var d1 = new Date();
        var d2 = new Date();
        var youngest = 18;
        if (Parse.User.current().escape("min_age").length > 0) {
          youngest = Number(Parse.User.current().escape("min_age"));
        }
        var oldest = 100;
        if (Parse.User.current().escape("max_age").length > 0) {
          oldest = Number(Parse.User.current().escape("max_age"));
        }
        d1.setFullYear(d1.getFullYear() - oldest)
        d2.setFullYear(d2.getFullYear() - youngest)


        // Setup the query for the collection to look for todos from the current user
        this.todos.query = new Parse.Query(Todo);
        this.todos.query.notEqualTo("objectId",     Parse.User.current().id);
        this.todos.query.greaterThan("birthdate",   d1)  ;
        this.todos.query.lessThan("birthdate",      d2);
        this.todos.bind('add',     this.addOne);
        this.todos.bind('reset',   this.addAll);
        this.todos.bind('all',     this.render);
  
        // Fetch all the todo items for this user
        this.todos.fetch();
        this.addAll(); */
      }
    },

    // Resets the filters to display all todos
    resetFilters: function() {
      this.$("ul#filters a").removeClass("selected");
      this.$("ul#filters a#all").addClass("selected");
      this.addAll();
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(todo) {
      var view = new TodoView({model: todo});
      this.$("#todo-list").append(view.render().el);
    },

    // Add all items in the Todos collection at once.
    addAll: function(collection, filter) {
      this.$("#todo-list").html("");
      this.todos.each(this.addOne);
    },

    // Only adds some todos, based on a filtering function that is passed in
    addSome: function(filter) {
      var self = this;
      this.$("#todo-list").html("");
      this.todos.chain().filter(filter).each(function(item) { self.addOne(item) });
    },

    addOne2: function(todo2) {
      var view = new TodoView2({model: todo2});
      this.$("#todo-list2").append(view.render().el);
    },

    // Add all items in the Todos collection at once.
    addAll2: function(collection, filter) {
      this.$("#todo-list2").html("");
      this.todos2.each(this.addOne2);
    },

    // Only adds some todos, based on a filtering function that is passed in
    addSome2: function(filter) {
      var self = this;
      this.$("#todo-list2").html("");
      this.todos2.chain().filter(filter).each(function(item) { self.addOne2(item) });
    },

    updateField: function(e) {
      if (e.keyCode == 13) {
        $(e.target).blur();
      }
    },

    updateFieldMC: function(e) {
      $(e.target).blur();
    },

    closeField: function(e) {
      var el = $(e.target);
      var fieldName = el.attr("id").split("-")[0];
      var oldFieldVal = this.$("#"+fieldName).html();
      var fieldVal = this.$("#"+fieldName+"-input").val();
      this.$("#"+fieldName).html(fieldVal)
      Parse.User.current().set(fieldName, fieldVal);
      Parse.User.current().save(null, {
        success: function(user) {
          Parse.User.current().fetch();
        },
        error: function(user) {
          $("#"+fieldName).html(oldFieldVal)
          $("#"+fieldName+"-input").val(oldFieldVal)
          console.log("failed to save");
        }
      });
    },

    closeFieldMC: function(e) {
      var el = $(e.target);
      var fieldName = el.attr("id");
      var label = fieldName.split("-")[0];
      var oldFieldVal = Parse.User.current().escape(label);
      var fieldVal = this.$("#"+fieldName).find(":selected").text();

      Parse.User.current().set(label, fieldVal);
      if (label.indexOf("birth") > -1) {
        month_map = {"January": 1, "February": 2, "March": 3, "April": 4, 
                     "May": 5, "June": 6, "July": 7, "August": 8,
                     "September": 9, "October": 10, "November": 11, 
                     "December": 12}
        var y = Number(Parse.User.current().escape("birth_year"));
        var m = month_map[Parse.User.current().escape("birth_month")];
        var d = Number(Parse.User.current().escape("birth_day"));
        var date = new Date(y, m, d, 0, 0, 0, 0);
        Parse.User.current().set("birthdate", date);
      }
      Parse.User.current().save(null, {
        success: function(user) {
          Parse.User.current().fetch();
        },
        error: function(user) {
          $('option:selected', 'select[name=fieldName]').removeAttr('selected');
          $('select[name=fieldName]').find('option:contains(oldFieldVal)').attr("selected",true);
          console.log("fail");
        }
      });
    },

    // If you hit return in the main input field, create new Todo model
    createOnEnter: function(e) {
      var self = this;
      if (e.keyCode != 13) return;

      this.todos.create({
        content: this.input.val(),
        order:   this.todos.nextOrder(),
        done:    false,
        user:    Parse.User.current(),
        ACL:     new Parse.ACL(Parse.User.current())
      });
      this.input.val('');
      this.resetFilters();
    },

    editField: function(e) {
      var el = $(e.target);
      var fieldName = el.attr("id");
      if (fieldName.indexOf("pencil") > -1) fieldName = fieldName.substring(0,fieldName.length-7);
      this.$("#"+fieldName+"-input").focus();
    },

    submitNewPhoto: function(e) {
      console.log("changing photo code executes now...")
      var fileUploadControl = $("#profilePhotoFileUpload")[0];
      if (fileUploadControl.files.length > 0) {
        var file = fileUploadControl.files[0];
        var name = "photo.jpg";
        var parseFile = new Parse.File(name, file);
      }

      parseFile.save().then(function() {
      // The file has been saved to Parse.
        Parse.User.current().set("profile_pic", parseFile);
        Parse.User.current().set("profile_pic_url", parseFile.url());
        Parse.User.current().save(null, {
          success: function(user) {
            Parse.User.current().fetch();
            $("#profile_pic")[0].src = Parse.User.current().get("profile_pic_url");
          },
          error: function(user) {
            console.log("fail");
          }
        });
      }, function(error) {
      // The file either could not be read, or could not be saved to Parse.
      });
    },

    // Clear all done todo items, destroying their models.
    clearCompleted: function() {
      _.each(this.todos.done(), function(todo){ todo.destroy(); });
      return false;
    },

    toggleAllComplete: function () {
      var done = this.allCheckbox.checked;
      this.todos.each(function (todo) { todo.save({'done': done}); });
    },

    // If you hit return in the main input field, create new Todo model
    createOnEnter2: function(e) {
      var self = this;
      if (e.keyCode != 13) return;

      this.todos2.create({
        content: this.input2.val(),
        order:   this.todos2.nextOrder(),
        done:    false,
        user:    Parse.User.current(),
        ACL:     new Parse.ACL(Parse.User.current())
      });

      this.input2.val('');
      this.resetFilters();
    },

    // Clear all done todo items, destroying their models.
    clearCompleted2: function() {
      _.each(this.todos2.done(), function(todo2){ todo2.destroy(); });
      return false;
    },

    toggleAllComplete2: function () {
      var done = this.allCheckbox2.checked;
      this.todos2.each(function (todo) { todo.save({'done': done}); });
    }
  });

  var LogInView = Parse.View.extend({
    events: {
      "submit form.login-form": "logIn",
      "submit form.signup-form": "signUp"
    },

    el: ".content",
    initialize: function() {
      _.bindAll(this, "logIn", "signUp");
      this.render();
    },

    logIn: function(e) {
      var self = this;
      var username = this.$("#login-username").val();
      var password = this.$("#login-password").val();
      
      Parse.User.logIn(username, password, {
        success: function(user) {
          if (Parse.User.current().escape("profile_pic_url").length < 1) {
            Parse.User.current().set("profile_pic_url", "images/default_person.jpg");
          }
          new ManageTodosView();
          self.undelegateEvents();
          delete self;
        },

        error: function(user, error) {
          self.$(".login-form .error").html("Invalid username or password. Please try again.").show();
          self.$(".login-form button").removeAttr("disabled");
        }
      });

      this.$(".login-form button").attr("disabled", "disabled");

      return false;
    },

    signUp: function(e) {
      var self = this;
      var username = this.$("#signup-username").val();
      var password = this.$("#signup-password").val();

      var userACL = new Parse.ACL();
      userACL.setPublicReadAccess(true);

      Parse.User.signUp(username, password, { ACL: userACL }, {
        success: function(user) {
          Parse.User.current().set("profile_pic_url", "images/default_person.jpg");
          new ManageTodosView();
          self.undelegateEvents();
          delete self;
        },

        error: function(user, error) {
          self.$(".signup-form .error").html(_.escape(error.message)).show();
          self.$(".signup-form button").removeAttr("disabled");
        }
      });

      this.$(".signup-form button").attr("disabled", "disabled");

      return false;
    },

    render: function() {
      this.$el.html(_.template($("#login-template").html()));
      this.delegateEvents();
    }
  });

  // The main view for the app
  var AppView = Parse.View.extend({
    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#todoapp"),

    initialize: function() {
      this.render();
    },

    render: function() {
      if (Parse.User.current()) {
        new ManageTodosView(); //ProfileView();//ManageTodosView();
        console.log(window.location.href);
        var rte = ""
        var url = window.location.href
        if (url.length > url.split('#')[0].length + 1) 
          rte = url.split('#')[1]
        if (rte == "active" || rte == "completed") {
          state.set({ filter: rte });
        }
        else Parse.history.navigate("all");
      } else {
        new LogInView();
      }
    }
  });

  var AppRouter = Parse.Router.extend({
    routes: {
      "all": "all",
      "active": "active",
      "completed": "completed"
    },

    initialize: function(options) {
      //Parse.history.navigate("all");
    },

    all: function() {
      state.set({ filter: "all" });
    },

    active: function() {
      state.set({ filter: "active" });
    },

    completed: function() {
      state.set({ filter: "completed" });
    }
  });

  var state = new AppState;

  new AppRouter;
  Parse.history.start(); //({pushState: true})
  new AppView;
});
