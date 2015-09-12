// An example Parse.js Backbone application based on the todo app by
// [Jérôme Gravel-Niquet](http://jgn.me/). This demo uses Parse to persist
// the todo items and provide user authentication and sessions.

$(function() {

  Parse.$ = jQuery;

  // Initialize Parse with your Parse application javascript keys
  Parse.initialize("BeYZxSllTAa0uompCH7V49osUz0MZlpMHTrtqLpG",
                   "pGpQ1ERlCRDO8rX59aCG2q6rT6uK3RlQbq3uWLX1");

  // Todo Model
  // ----------

  // Our basic Todo model has `content`, `order`, and `done` attributes.
  var Todo = Parse.Object.extend("Todo", {
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

  // Our basic Todo model has `content`, `order`, and `done` attributes.
  var User = Parse.Object.extend("User", {
    // Default attributes for the todo.
    defaults: {
      //content: "empty todo...",
      //done: false
    },

    // Ensure that each todo created has `content`.
    initialize: function() {
      //if (!this.get("content")) {
      //  this.set({"content": this.defaults.content});
      //}
    },

    // Toggle the `done` state of this todo item.
    toggle: function() {
      console.log("toggle code for match");
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



  var MatchList = Parse.Collection.extend({

    // Reference to this collection's model.
    model: User,

    // Filter down the list of all todo items that are finished.
    //done: function() {
    //  return this.filter(function(todo){ return todo.get('done'); });
    //},

    // Filter down the list to only todo items that are still not finished.
    //remaining: function() {
    //  return this.without.apply(this, this.done());
    //},

    // Todos are sorted by their original insertion order.
    comparator: function(match) {
      return match.get('createdAt');
    }

  });

  var MatchView = Parse.View.extend({

    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    template: _.template($('#match-template').html()),

    // The DOM events specific to an item.
    events: {
      "click .toggle"              : "toggleDone",
      "dblclick label.todo-content" : "edit",
      "keypress .edit"      : "updateOnEnter"
    },

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a Todo and a TodoView in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      _.bindAll(this, 'render');
      this.model.bind('change', this.render);
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

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },
  });

  // Todo Item View
  // --------------

  // The DOM element for a todo item...
  var TodoView = Parse.View.extend({

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

  var ProfileView = Parse.View.extend({

    // Our template for the line of statistics at the bottom of the app.
    navTemplate: _.template($('#navigation-template').html()),

    events: {
      "click .log-out": "logOut",
      "click ul#filters a": "selectFilter",
      "dblclick label.todo-content" : "edit",
      "click .todo-destroy"   : "clear",
      "keypress .edit"      : "updateOnEnter",
      "blur .edit"          : "close"
    },

    el: ".content",

    initialize: function() {
      _.bindAll(this, "logOut"); //, "addAll", "addOne");
      this.render();

      // Create our collection of Todos
      this.todos = new TodoList;//MatchList;

      // Setup the query for the collection to look for todos from the current user
      this.todos.query = new Parse.Query(Todo);
      this.todos.query.notEqualTo("user", Parse.User.current());
      this.todos.bind('add',     this.addOne);
      this.todos.bind('reset',   this.addAll);
      this.todos.bind('all',     this.render);

      // Fetch all the todo items for this user
      this.todos.fetch();

var bar
for (bar in this.todos)
{
    console.log("Foo has property " + bar);
}
      console.log("fetched: " + this.todos.length);

      state.on("change", this.filter, this);
    },

    // Logs out the user and shows the login view
    logOut: function(e) {
      Parse.User.logOut();
      new LogInView();
      this.undelegateEvents();
      delete this;
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
      //this.$("ul#filters a").removeClass("selected");
      //this.$("ul#filters a#" + filterValue).addClass("selected");
      if (filterValue === "all") {
        console.log("msg 1: profile for me");
      } else if (filterValue === "completed") {
        console.log("msg 2: messages");
        //this.addAll();
      } else {
        console.log("msg 3: matches");
        //this.addSome(function(item) { return !item.get('done') });
      }
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function(e) {
      var el = $(e.target);
      $(el).addClass("editing");
      $(el).parent().find('.edit').focus();
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


    // Close the `"editing"` mode, saving changes to the todo.
    close: function() {
      console.log("caught event 2");
      //this.model.save({content: this.input.val()});
      //$(this.el).removeClass("editing");
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function(e) {
      console.log("caught event 3");
      //if (e.keyCode == 13) this.close();
    },

    // Remove the item, destroy the model.
    clear: function() {
      console.log("caught event 4");
      //this.model.destroy();
    },
/*
    // Add all items in the Todos collection at once.
    addAll: function(collection, filter) {
      this.$("#match-list").html("");
      this.todos.each(this.addOne);
    },

    addOne: function(todo) {
      var view = new MatchView({model: todo});
      this.$("#match-list").append(view.render().el);
    },
*/
    render: function() {
      this.$el.html(_.template($("#profile-template").html()));

      this.$('#nav').html(this.navTemplate({}));
      this.$('#matches').html(_.template($("#matches-template").html()))

      this.delegateEvents();
    }
  });

  // The main view that lets a user manage their todo items
  var ManageTodosView = Parse.View.extend({

    // Our template for the line of statistics at the bottom of the app.
    statsTemplate: _.template($('#stats-template').html()),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "keypress #new-todo":  "createOnEnter",
      "click #clear-completed": "clearCompleted",
      "click #toggle-all": "toggleAllComplete",
      "click .log-out": "logOut",
      "click ul#filters a": "selectFilter"
    },

    el: ".content",

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved to Parse.
    initialize: function() {
      var self = this;

      _.bindAll(this, 'addOne', 'addAll', 'addSome', 'render', 'toggleAllComplete', 'logOut', 'createOnEnter');

      // Main todo management template
      this.$el.html(_.template($("#manage-todos-template").html()));
      
      this.input = this.$("#new-todo");
      this.allCheckbox = this.$("#toggle-all")[0];

      // Create our collection of Todos
      this.todos = new TodoList;

      // Setup the query for the collection to look for todos from the current user
      this.todos.query = new Parse.Query(Todo);
      this.todos.query.equalTo("user", Parse.User.current());
      this.todos.bind('add',     this.addOne);
      this.todos.bind('reset',   this.addAll);
      this.todos.bind('all',     this.render);

      // Fetch all the todo items for this user
      this.todos.fetch();

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

      this.delegateEvents();

      //this.allCheckbox.checked = !remaining;
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
        this.addAll();
      } else if (filterValue === "completed") {
        this.addSome(function(item) { return item.get('done') });
      } else {
        this.addSome(function(item) { return !item.get('done') });
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

    // Clear all done todo items, destroying their models.
    clearCompleted: function() {
      _.each(this.todos.done(), function(todo){ todo.destroy(); });
      return false;
    },

    toggleAllComplete: function () {
      var done = this.allCheckbox.checked;
      this.todos.each(function (todo) { todo.save({'done': done}); });
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

                new ProfileView();//ManageTodosView();
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
        new ProfileView();//ManageTodosView();
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
