var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      tasks: [],
      newTask: {
          text: "",
          completed: false
      }
    };
  },
  created: function() {
    axios.get("/v1/tasks").then(function(response) {
      this.tasks = response.data;
    }.bind(this));
  },
  methods: {
    addTask: function() {
      if (this.newTask.text !== "") {

        this.tasks.push(this.newTask);
        this.newTask = {text: "", completed: false};
      }
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
          this.tasks.splice(index,1);
        }
      }
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
