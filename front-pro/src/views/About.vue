<template>
<div class="hello">
  <div style="display:flex;">
    <div class="btn" :disabled="index<1" @click="changeIndex(null, -1)">上一页</div>
    <input type="text" v-model="index" @change="changeIndex" />
    <div class="btn" @click="changeIndex(null, 1)">下一页</div>
  </div>
  <div>
    <h1 id="content">{{title}}</h1>
    <div id="contents" v-html="content"></div>
  </div>
</div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      title: "",
      content: "",
      index: Number(localStorage.getItem('aboutIndex')),
    };
  },
  methods: {
    changeIndex(ev, index) {
      ev && (this.index = Number(ev.target.value));
      !ev && (this.index += index);
      this.getContent(this.index);
      localStorage.setItem("aboutIndex", this.index);
    },
    getContent(index) {
      axios
        .get(`/api/txt?index=${index}`)
        .then((res) => {
          return res;
        })
        .then((ret) => {
          console.log(ret);
          this.title = ret.data.title;
          this.content = ret.data.content.replaceAll('。', '<br />');
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.hello {
  background: #333;
  color: #eee;
}

.btn {
  padding: 5px 8px;
  border: 1px solid #eee;
  border-radius: 3px;
  margin: 0 20px;
  flex: 1
}
#contents{
word-spacing: 5px;
line-height: 35px;
font-size: 16px;
}
</style>
