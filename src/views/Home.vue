<template>
  <div>
    <h2>商品列表</h2>
    <input
      type="text"
      @blur="
        ({ target }) => {
          this.sort = target.value;
        }
      "
    />
    {{ sort }}
    <select :value="sort" @change="goto">
      <option value="desc">从高到底</option>
      <option value="asc">从低到高</option>
    </select>

    <ul class="item-list">
      <li class="head">
        <span>ID</span>
        <span>名称</span>
        <span>价格</span>
        <span>操作</span>
      </li>
      <li v-for="item of items" :key="item.id">
        <span>{{ item.id }}</span>
        <span>
          <router-link
            :to="{
              name: 'Item',
              params: {
                itemId: item.id,
              },
            }"
            >{{ item.name }}</router-link
          >
        </span>
        <span>{{ item.price }}</span>
        <span>
          <button>添加到购物车</button>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      sort: "desc",
      items: [],
    };
  },
  created() {
    this.getItems();
  },
  /* 
  如果路由变化使用时同一个组件的话，那么这个时候这个组件是不会销毁重新渲染的，而是会复用
  */
  watch: {
    $route: {
      handler() {
        this.getItems();
      },
    },
  },
  methods: {
    getItems() {
      this.sort = this.$route.query.sort || this.sort;
      axios({
        method: "get",
        url: "/api/items",
        params: {
          sort: this.sort,
        },
      }).then((res) => {
        // console.log("商品数据", res.data);
        this.items = res.data;
      });
    },
    goto({ target }) {
      this.sort = target.value;
      this.$router.push({
        name: "Home",
        query: {
          sort: this.sort,
        },
      });
    },
  },
};
</script>

<style>
ul {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

.item-list li {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  height: 30px;
  line-height: 30px;
  border-bottom: 1px dotted #333;
}

.item-list li.head {
  font-weight: bold;
}

.item-list li span {
  min-width: 200px;
}

.tip {
  position: fixed;
  left: 0;
  top: 0;
  border: 1px solid #000;
  background: #fff;
  padding: 10px;
}
</style>