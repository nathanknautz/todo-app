var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      tasks: [],
      newTask: {
          text: "",
          completed: false
      },
      errors: []
    };
  },
  created: function() {
    axios.get("/v1/tasks").then(function(response) {
      this.tasks = response.data;
    }.bind(this));
  },
  methods: {
    addTask: function() {
      axios.post("/v1/tasks", this.newTask)
      .then(function(response) {
        this.tasks.push(response.data);
        this.newTask = {text: "", completed: false};
        this.errors = [];
      }.bind(this))
      .catch(function(error) {
        this.errors = error.response.data.errors;
      }.bind(this));
    },
    toggleTask: function(task) {
      task.completed = !task.completed;
    },
    incompleteTasks: function() {
      var count = 0;
      this.tasks.forEach(function(task) {
        if (!task.completed) {
          count += 1;
        }
      });
      return count;
    },
    deleteCompleted: function() {
      for (var index = 0; index < this.tasks.length; index ++) {
        if (this.tasks[index].completed) {
          axios.delete("/v1/tasks/" + this.tasks[index].id);
          this.tasks.splice(index,1);
        }
      }
    },
    updateTask: function(task) {
      axios.patch("/v1/tasks/" + task.id, this.newTask)
      .then(function(response) {
        var index = this.tasks.indexOf(task);
        this.tasks[index] = this.newTask;
      }.bind(this));
    }
  },
  computed: {}
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});
