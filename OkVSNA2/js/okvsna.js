$(function() {

  Parse.$ = jQuery;
  Parse.initialize("BeYZxSllTAa0uompCH7V49osUz0MZlpMHTrtqLpG",
                   "pGpQ1ERlCRDO8rX59aCG2q6rT6uK3RlQbq3uWLX1");

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

    initialize: function() {
      var self = this;

      _.bindAll(this, 'render', 'logOut');

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
      this.$('#interested-in').append(this.profileItemTemplateMC({
        label: "min_age",
        field_name: "Min age",
        opts: [
          "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28",
          "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39",
          "40", "41", "42", "43", "44", "45", "46", "47", "48", "49"
          ]
     }));
      this.$('#interested-in').append(this.profileItemTemplateMC({
        label: "max_age",
        field_name: "Max age",
        opts: [
          "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28",
          "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39",
          "40", "41", "42", "43", "44", "45", "46", "47", "48", "49"
          ]
      }));
      this.$('#interested-in').append(this.profileItemTemplateMC({
        label: "max_distance",
        field_name: "Max distance",
        opts: ["Near", "Far", "Wherever you are"]
      }));
      this.$('#settings').append(this.profileItemTemplate({
        label: "contact_email",
        field_name: "Contact email"
      }));

      state.on("change", this.filter, this);
      this.render();
    },

    // Logs out the user and shows the login view
    logOut: function(e) {
      Parse.User.logOut();
      new LogInView().render();
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
          Parse.history.navigate("all");
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
          Parse.history.navigate("all");
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
