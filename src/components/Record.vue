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
      <select class="edit-mode edit-type" name="" v-model="editType">
        <option value="expenditure">Expenditure</option>
        <option value="revenue">Revenue</option>
      </select>
      <input class="edit-mode edit-date" type="date" v-model="editDate" />
      <template v-if="records.type === 'expenditure'">
        <select
          class="edit-mode edit-category"
          id="edit-category"
          aria-label="選擇下拉選單"
          v-model="editCategory"
        >
          <option
            v-for="category in this.$store.state.expenditureTypes"
            :key="category.en"
            :name="category.en"
            :value="category.en"
            >{{ category.ch }}</option
          >
        </select>
      </template>
      <template v-else>
        <select
          class="edit-mode edit-category"
          id="edit-category"
          aria-label="選擇下拉選單"
          v-model="editCategory"
        >
          <option
            v-for="category in this.$store.state.revenueTypes"
            :key="category.en"
            :name="category.en"
            :value="category.en"
            >{{ category.ch }}</option
          >
        </select>
      </template>

      <input class="edit-mode edit-cost" type="number" v-model.lazy="editCost" />
      <input class="edit-mode edit-ps" type="text" v-model.lazy="editPs" />
      <button
        class="edit-mode edit-complete"
        @click="
          $emit('editComplete', {
            editType,
            editDate,
            editCategory,
            editCost,
            editPs,
          })
        "
      >
        完成
      </button>
      <button class="edit-mode" @click="edit = false">取消</button>
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
      editType: this.records.type,
      editDate: "",
      editCategory: "",
      editCost: this.records.cost,
      editPs: "",
    };
  },
  mounted() {
    this.editType = this.records.type;
    this.editDate = this.records.date;
    this.editCategory = this.records.category;
    this.editCost = this.records.cost;
    this.editPs = this.records.ps;
  },
  watch: {
    editType: {
      handler(newval, oldval) {
        console.log(newval);
        this.editType = newval;
        this.records.type = newval;
        if (this.records.type === "expenditure") {
          this.editCategory = "e-undefined";
        } else {
          this.editCategory = "r-undefined";
        }
      },
      immediate: false
    },
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

.exp-route .router-link-exact-active {
  font-weight: bold;
  color: var(--gold-light);
}

.record-btn {
  border: 0;
  border-radius: 5px;
  margin: 5px 10px;
  width: 100%;
  text-transform: capitalize;
  cursor: default !important;
}
.record-btn.record-type {
  background-color: #ffe0e5;
}
.record-btn.record-date {
  background-color: #daecfc;
}
.record-btn.record-category {
  background-color: #fff5df;
}
.record-btn.record-cost {
  background-color: #ddf3f2;
}
.record-btn.record-ps {
  background-color: #ebe0ff;
}
.record-btn.record-edit {
  cursor: pointer !important;
}
.record-btn.record-delete {
  cursor: pointer !important;
}

.edit-mode {
  border: 0;
  border-radius: 5px;
  margin: 5px 10px;
  width: 100%;
  text-align: center;
}

.edit-complete {
  /* width: 150%; */
}
</style>
