Vue.component('List', {
  props: {
    model: { type: Array, required: true},
    fields: { type: Array, required: true},
    headers: { type: Array, required: true},
    max: { required: false, default() { return 5; }},
  },
  computed: {
    limitedItems() {
      return this.model.slice(this.start,this.end);
    },
    createPagination() {
      return Math.round(this.totalPage = this.model.length / this.max);
    },
    fieldCound() {
      return this.fields.length;
    }
  },
  data: function () {
      return {
          start: 0,
          end: 10,
          currentPage: 1,
          totalPage: 0
      }
  },
  methods: {
    changePage(page) {
      this.start = this.max * page - this.max;
      this.end   = this.max * page;

      console.log(page, this.totalPage);

    }
  },
  created() {
     this.start = 0;
     this.end = this.max;
     this.totalPage = Math.round(this.model.length / this.max);
  },
  template: `
  <table class="ui celled table">
    <thead>
      <tr>
      <th v-for="item in headers">{{item}}</th>
    </tr>
    </thead>
    <tbody
      <tr v-for="(item, index) in limitedItems">
        <field v-for="i in fields" :value="i" :item=item ></field>
      </tr>
    </tbody>
    <tfoot>
      <tr><th :colspan="fieldCound">
        <div class="ui right floated pagination menu">
          <a class="item" v-for="page in createPagination" @click="changePage(page)">{{page}}</a>
        </div>
      </th>
    </tr></tfoot>
  </table>
  `
});

Vue.component('Field', {
  props: ['value','item'],
  template : `
    <td>{{findValue}}</td>
  `,
  computed: {
    findValue() {
      var index = Object.keys(this.item).indexOf(this.value);
      var val;
      if (index > -1) {
        val = this.item[this.value];
      }
      return val;
    }
  }
});

window.addEventListener('load',() => {
  console.log('...');

  window.vue = new Vue({
    el: "#app",
    name: "test",
    data: {
      isLoading: true,
      users: [],
      fields: []
    },
    created() {
      fetch("./data.json")
      .then((res) => { return res.json() })
      .then((res) => {
        this.isLoading = false;
        this.users = res.users;
      });
      this.fields  = ["id","username","name",'email'];
      this.headers = ["ID","USERNAME","NAME","EMAİL"];
    }
  });
});
