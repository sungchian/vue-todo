<template>
  <li>
    <template v-if="!edit">
      <button class="record-btn record-type">{{records.type}}</button>
      <button class="record-btn record-date">{{records.date}}</button>
      <button class="record-btn record-category">{{records.category}}</button>
      <button class="record-btn record-cost">{{records.cost}}</button>
      <button class="record-btn record-ps">{{records.ps}}</button>
      <!-- <button class="record-btn record-edit" @click="$emit('editThis')">Edit</button>
      <button class="record-btn record-delete" @click="$emit('deleteRecord')">Delete</button> -->
    </template>
    <template v-else>
      <input type="text" v-model="editContent" v-focus="editContent" />
      <button @click="$emit('editComplete', editContent)">完成</button>
    </template>
  </li>
</template>

<script>
export default {
  props: {
    records: {
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
      transactions: [],
      editContent: ""
    };
  },
  mounted() {
    // this.editContent = this.transaction.ps;
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
    // done: {
    //   get() {
    //     return this.todo.done;
    //   },
    //   set(value) {
    //     this.$emit("check", value);
    //   }
    // }
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
* {
  list-style: none;
}

ul {
  padding: 0;
}

.record-btn {
    border: 0;
    border-radius: 5px;
    margin: 5px 10px;
    width: 100%;
    text-transform: capitalize;
}
    .record-type {
        background-color: #FFE0E5;
    }
    .record-date {
        background-color: #DAECFC;
    }
    .record-category {
        background-color: #FFF5DF;
    }
    .record-cost {
        background-color: #DDF3F2;
    }
    .record-ps {
        background-color: #EBE0FF;
    }
</style>
