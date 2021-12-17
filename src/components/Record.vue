<template>
  <li>
    <template v-if="!edit">
      <button class="record-btn record-type">{{ records.type }}</button>
      <button class="record-btn record-date">{{ records.date }}</button>
      <button class="record-btn record-category">{{ records.category }}</button>
      <button class="record-btn record-cost">{{ records.cost }}</button>
      <button class="record-btn record-ps">{{ records.ps }}</button>
      <button class="record-btn record-edit" @click="$emit('editRecord')">
        Edit
      </button>
      <button class="record-btn record-delete" @click="$emit('deleteRecord')">
        Delete
      </button>
    </template>
    <template v-else>
      <select class="form-select" name="" id="edit-type" v-model="editType">
        <option value="expenditure">Expenditure</option>
        <option value="revenue">Revenue</option>
      </select>
      <input type="date" v-model="editDate" />
      <template v-if="records.type==='expenditure'">
        <select
          class="form-select"
          id="edit-type"
          aria-label="選擇下拉選單"
          v-model="editCategory"
        >
          <option
            v-for="category in this.$store.state.expenditureTypes"
            :key="category.en"
            :value="category.en"
            >{{ category.ch }}</option
          >
        </select>
      </template>
      <template v-else>
        <select
          class="form-select"
          id="edit-type"
          aria-label="選擇下拉選單"
          v-model="editCategory"
        >
          <option
            v-for="category in this.$store.state.revenueTypes"
            :key="category.en"
            :value="category.en"
            >{{ category.ch }}</option
          >
        </select>
      </template>

      <input type="tel" v-model="editCost" />
      <input type="text" v-model="editPs" />
      <button @click="$emit('editComplete', {editType, editDate, editCategory, editCost, editPs})">完成</button>
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
      transactions: {},
      editType: "",
      editDate: "",
      editCategory: "",
      editCost: 0,
      editPs: "you see this"
    };
  },
  mounted() {
    this.editType = this.records.type;
    this.editDate = this.records.date;
    this.editCategory = this.records.category;
    this.editCost = this.records.cost;
    this.editPs = this.records.ps;
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
  background-color: #ffe0e5;
}
.record-date {
  background-color: #daecfc;
}
.record-category {
  background-color: #fff5df;
}
.record-cost {
  background-color: #ddf3f2;
}
.record-ps {
  background-color: #ebe0ff;
}
</style>
