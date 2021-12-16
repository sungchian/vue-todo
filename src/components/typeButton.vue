<template>

    <label class="radio">
      <input
        type="radio"
        :value="label"
        :name="name"
        v-model="radioButtonValue"
        @change="test()"
      />
      <span>{{ label }}</span>
    </label>

</template>

<script>
export default {
  data() {
    return {
      expenditure: [
        "飲食",
        "日常",
        "住宿",
        "交通",
        "娛樂",
        "醫療",
        "其他",
        "未分類"
      ],
      revenue: ["薪水", "獎金", "兼職", "投資", "零用錢", "其他", "未分類"],
      radioButtonValue: ""
    };
  },
  props: {
    name: {
      type: String
    },
    label: {
      type: String,
      default: "undefined"
    },
    value: {
      type: String,
      default: "undefined"
    }
  },
  watch: {
    radioButtonValue(val) {
      console.log(val);
    }
  },
  computed: {
    radioButtonValue: {
      get: function() {
        return this.value;
      },
      set: function() {
        // Communicate the change to parent component so that selectedValue can be updated
        this.$emit("change", this.label);
      }
    }
  },
  methods: {
      test(){
          this.$emit("testt")
      }
  }
};
</script>
