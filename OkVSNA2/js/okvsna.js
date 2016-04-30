$(function() {

  Parse.$ = jQuery;
  Parse.initialize("i1r8DgIlgGjAydvKkwuhkYPDJiMwfOHH8Cixt1xt",
                   "3xxfSDNK0PKUBlj49lP0UnMzeK1pPZxPLbKoSIau");

  // This is the transient application state, not persisted on Parse
  var AppState = Parse.Object.extend("AppState", {
    defaults: {
      filter: "all"
    }
  });

  // The Application
  // ---------------

  // The main view that lets a user manage their todo items
  var ManageTodosView = Parse.View.extend({

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "click .log-out": "logOut",
      "click ul#filters a": "selectFilter"
    },

    el: ".content",

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved to Parse.
    initialize: function() {
      var self = this;

      _.bindAll(this, 'render', 'logOut');

      // Main todo management template
      this.$el.html(_.template($("#manage-todos-template").html()));

      state.on("change", this.filter, this);
      this.render();
    },

    // Logs out the user and shows the login view
    logOut: function(e) {
      Parse.User.logOut();
      new LogInView();
      this.undelegateEvents();
      delete this;
    },

    render: function() {
      this.delegateEvents();
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

      console.log("running this shit");
      console.log(filterValue);

      if (filterValue === "all") {
        this.$("#profile").show();
        this.$("#matches").hide();
        this.$("#msgs").hide();
        //this.addAll();
      } else if (filterValue === "active") {
        this.$("#profile").hide();
        this.$("#matches").hide();
        this.$("#msgs").show();
        ///this.addSome(function(item) { return item.get('done') });
      } else if (filterValue === "conversation") {
        this.$("#profile").show();
        this.$("#matches").hide();
        this.$("#msgs").hide();
      } else {
        this.$("#profile").hide();
        this.$("#matches").show();
        this.$("#msgs").hide();
      }
    },
    });

  var LogInView = Parse.View.extend({
    events: {
      "submit form.login-form": "logIn",
      "submit form.signup-form": "signUp"
    },

    el: ".content",
    
    initialize: function() {
      _.bindAll(this, "logIn", "signUp");
    },

    logIn: function(e) {
      var self = this;
      var username = this.$("#login-username").val();
      var password = this.$("#login-password").val();
      
      Parse.User.logIn(username, password, {
        success: function(user) {
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
      
      Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
        success: function(user) {
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
      console.log("trying to render");
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
        new ManageTodosView();

        var rte = ""
        var url = window.location.href
        if (url.length > url.split('#')[0].length + 1)
          rte = url.split('#')[1]

        console.log(rte);
        if (rte == "active" || rte == "completed") {
          state.set({ filter: rte });
        }
        else {
          Parse.history.navigate("all");
        }
      } else {
        console.log("at least doing this");
        new LogInView().render();
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
  Parse.history.start();
  new AppView;
});
