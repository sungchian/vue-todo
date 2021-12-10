<template>
  <div class="record-container">
    <h2>Record</h2>
    <hr class="mb-20" style="background-color: white">
    <ul class="record-group">
        <li>123</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editContent: ""
    };
  },
  mounted() {
    this.editContent = this.todo.content;
  },
  computed: {
    // content: {
    //   get () {
    //     return this.todo.content
    //   },
    //   set (value) {
    //     this.editContent = value
    //   }
    // },
    done: {
      get() {
        return this.todo.done;
      },
      set(value) {
        this.$emit("check", value);
      }
    }
  }
  //   data () {
  //     return {
  //       editingTodo: {
  //         content: '',
  //         done: false
  //       }
  //     }
  //   },
  //   mounted () {
  //     this.editingTodo.content = this.todo.content
  //     this.editingTodo.done = this.todo.done
  //   }
};
</script>


<style>
*{
    list-style: none;
}

ul{
    padding: 0;
}
</style>