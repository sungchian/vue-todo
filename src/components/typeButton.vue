<template>
    <label class="radio">
        <input type="radio" :value="label" :name="name" v-model="radioButtonValue">
        <span>{{ label }}</span>
    </label>
</template>

<script>
export default {
    props: {
    name: {
      type: String,
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
  computed: {
      radioButtonValue: {
            get: function() {
                return this.value
            },
            set: function() {
                // Communicate the change to parent component so that selectedValue can be updated
                this.$emit("change", this.label)
            }
        }
  }
}
</script>