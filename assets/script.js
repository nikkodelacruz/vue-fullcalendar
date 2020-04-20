
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li v-if="todo.id==1">{{ todo.id }}</li>'
})

const app = new Vue({
	el : '#app',
	data : {
		message : 'hello world',
		seen: true,
		todos: [
	      { id: 0, text: 'Vegetables' },
	      { id: 1, text: 'Cheese' },
	      { id: 2, text: 'Whatever else humans are supposed to eat' }
	    ]
	}
});


