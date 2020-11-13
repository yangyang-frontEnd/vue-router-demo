<template>
  <div>
    <template v-if="item">
      <h2>商品详情 - {{ item.name }}</h2>
      <dt>ID</dt>
      <dd>{{ item.id }}</dd>
      <dt>名称</dt>
      <dd>{{ item.name }}</dd>
      <dt>价格</dt>
      <dd>{{ item.price }}</dd>
    </template>
    <template v-else-if="isError">
      <h2>没有该商品信息</h2>
    </template>
    <template v-else>
      <h2>加载中......</h2>
    </template>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      item: null,
      isError: false,
    };
  },
  created() {
    console.log(this.$route);
    let { itemId } = this.$route.params;
    if (itemId) {
      axios({
        url: `/api/item/${itemId}`,
      })
        .then((res) => {
          console.log("商品详情数据", res.data);
          this.item = res.data;
        })
        .catch((err) => {
          this.isError = true;
        });
    }
  },
};
</script>

<style lang="scss" scoped>
</style>