<template>
  <div class="recommend">
    <personalized-play-lists />
  </div>
</template>

<style lang="less" scoped>
  @import './recommend.less';
</style>

<script>
import PersonalizedPlayLists from '../personalizedPlayLists/personalizedPlayLists.vue';

export default {
  name: 'Recommend',
  components: {
    PersonalizedPlayLists
  }
};
</script>
