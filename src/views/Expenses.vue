<template>
  <div class="container">
    <h1>Cantavit</h1>
    <hr class="mb-20" style="background-color: white">
    <div class="exp-route mb-20">
    <router-link to="/todo?filter=active" replace>Active</router-link>｜
    <router-link :to="{ name: 'Todo', query:{ filter: 'done'} }" replace>Done</router-link>
    </div>
    <input type="date" class="exp-date block mb-20">
    <!-- <ul class="exp-type-group mb-20">
        <li class="exp-type" @click="test()">飲食</li>
        <li class="exp-type">日常</li>
        <li class="exp-type">住宿</li>
        <li class="exp-type">交通</li>
        <li class="exp-type">娛樂</li>
        <li class="exp-type">醫療</li>
        <li class="exp-type">其他</li>
        <li class="exp-type">未分類</li>
    </ul> -->
    <div class="exp-type-group mb-20">
        <type-button name="options" label="飲食" :value="selectedValue" @change="changeValue"/>
        <type-button name="options" label="日常" :value="selectedValue" @change="changeValue"/>
        <type-button name="options" label="住宿" :value="selectedValue" @change="changeValue"/>
        <type-button name="options" label="交通" :value="selectedValue" @change="changeValue"/>
        <type-button name="options" label="娛樂" :value="selectedValue" @change="changeValue"/>
        <type-button name="options" label="醫療" :value="selectedValue" @change="changeValue"/>
        <type-button name="options" label="其他" :value="selectedValue" @change="changeValue"/>
        <type-button name="options" label="未分類" :value="selectedValue" @change="changeValue"/>
    </div>
    <label for="number">Cost</label>
    <input type="tel" class="exp-cost block mb-20">
    <label for="number">P.S.</label>
    <input type="text" class="exp-ps block mb-20">
    <button class="exp-submit mb-50">Submit</button>
    <Record />
  </div>
</template>

<script>
import Record from '../components/Record'
import typeButton from '../components/typeButton'
import 'bootstrap/dist/css/bootstrap.min.css';
export default {
  data () {
    return {
      filter: 'all', // all,active,done
      edit: null
    }
  },
  mounted () {
    
  },
  computed: {
    list () {
      return this.$store.getters.filterList(this.filter)
    }
  },
  watch: {
    $route: {
      //watch在進入網頁預設是不會作用
      immediate: true,
      handler: function (route) {
        this.edit = null
        // check query => redirect
        this.filter = route.query.filter || 'all'
      }
    }
  },
  methods: {
    checkHandler (tId, done) {
      this.$store.dispatch('CHECK_TODO', { tId, done })
    },
    editCompleteHandler (tId, content) {
      this.edit = null
      this.$store.dispatch('UPDATE_TODO', { tId, content })
    },
    test() {
        console.log("click");
    }
  },
  components: {
    Record,
    typeButton,
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cherry+Swash:wght@400;700&display=swap');

/* all style */
*{
    margin: 0 auto;
    padding: 0;
    text-decoration: none;
    list-style: none;
    font-family: 'Cherry Swash', cursive;
    color: var(--brown-lighter);
    background: var(--bgc);
    border: none;
    transition: ease-in .3s;
}

input {
    border-bottom: solid 1px;
}

.block {
    display: flex;
}

.mb-20 {
    margin-bottom: 20px;
}

.mb-50 {
    margin-bottom: 50px;
}

.container *{
    text-align: center;
}

.container h1 {
    font-size: 48px;
    font-weight: bold;
    padding: 30px 0px;
    letter-spacing: 10px;
}

.exp-type-group {
    display: flex;
    justify-content: space-around;
    text-align: center;
}

.exp-type-group .exp-type {
    cursor: pointer;
    border: solid 2px transparent;
}

    .exp-type-group .exp-type:hover {
        color: thistle;
        border-bottom: solid 2px thistle;
    }

.exp-submit {
    font-size: 20px;
    padding: 5px;
    border: solid 2px var(--brown-lighter);
    border-radius: 5px;
}
    .exp-submit:hover {
        color: white;
    }
</style>

