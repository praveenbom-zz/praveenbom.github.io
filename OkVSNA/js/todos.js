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

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "keypress #new-todo":  "createOnEnter",
      "keypress #new-todo2":  "createOnEnter2",
      "dblclick .profile-label" : "editField",
      "keypress .editProfileField" : "updateField",
      "blur .editProfileField" : "closeField",
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

      _.bindAll(this, 'addOne', 'addOne2', 'addAll', 'addAll2', 'addSome', 'addSome2', 'render', 'toggleAllComplete', 'toggleAllComplete2', 'logOut', 'createOnEnter', 'createOnEnter2', 'editField');

      // Main todo management template
      this.$el.html(_.template($("#manage-todos-template").html()));
      this.$('#public-profile').append(this.profileItemTemplate({
        label: "first_name",
        field_name: "Display name"
      }));
      this.$('#public-profile').append(this.profileItemTemplate({
        label: "about_me",
        field_name: "About me"
      }));
      this.$('#public-profile').append(this.profileItemTemplate({
        label: "occupation",
        field_name: "Occupation"
      }));
      this.$('#public-profile').append(this.profileItemTemplate({
        label: "gender",
        field_name: "Gender"
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
      this.todos.query = new Parse.Query(Todo);
      //this.todos.query.equalTo("user", Parse.User.current());
      this.todos.bind('add',     this.addOne);
      this.todos.bind('reset',   this.addAll);
      this.todos.bind('all',     this.render);

      // Fetch all the todo items for this user
      this.todos.fetch();

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
        //this.addSome(function(item) { return item.get('done') });
      } else {
        this.$("#profile").hide();
        this.$("#matches").show();
        this.$("#messages").hide();
        //this.addSome(function(item) { return !item.get('done') });
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

    closeField: function(e) {
      var el = $(e.target);
      var fieldName = el.attr("id").split("-")[0];
      var oldFieldVal = this.$("#"+fieldName).html();
      console.log(oldFieldVal);
      var fieldVal = this.$("#"+fieldName+"-input").val();
      console.log(fieldVal);
      this.$("#"+fieldName).html(fieldVal)
      Parse.User.current().set(fieldName, fieldVal);
      Parse.User.current().save(null, {
        success: function(user) {
          Parse.User.current().fetch();
        },
        error: function(user) {
          this.$("#"+fieldName).html(oldFieldVal)
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
      this.$("#"+fieldName+"-input").focus();
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
      "submit form.login-form": "logIn"
    },

    el: ".content",
    
    initialize: function() {
      _.bindAll(this, "logIn");
      this.render();
    },

    logIn: function(e) {
      var self = this;
      var username = this.$("#login-username").val();
      var password = this.$("#login-password").val();

      Parse.FacebookUtils.logIn("public_profile,email,user_friends", {
        success: function(user) {
          if (!user.existed()) {
            FB.api("/me/?fields=email,name,age_range,bio,address,about,education,first_name,last_name,location,hometown,gender,interested_in,work,languages,birthday,likes", function(response) {
              console.log(JSON.stringify(response));

              user.set("name", response.name);
              user.set("first_name", response.first_name);
              user.set("last_name", response.last_name);
              user.set("email", response.email);
              user.set("gender", response.gender);
              user.set("fb_id", response.id);
              user.save(null, {
                success: function(user) {
                  // This succeeds, since the user was authenticated on the device
                  // Get the user from a non-authenticated method
                }
              });
            });
          } else {
            alert("User logged in through Facebook!");
          }

                new ManageTodosView();  // ProfileView();//ManageTodosView();
                Parse.history.navigate("all");
                self.undelegateEvents();
                delete self;
        },
        error: function(user, error) {
          alert("User cancelled the Facebook login or did not fully authorize.");
        }
      });

      this.$(".login-form button").attr("disabled", "disabled");

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
        Parse.history.navigate("all");
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
