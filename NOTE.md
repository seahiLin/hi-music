# note
> record questions and knowledge of this project

## questions
+ player.less
(问题点： div根据内部inline元素自适应宽度并撑开div.detail，第一个div正常，第二个div撑开的宽度少了一个img的宽度)
``` bash
<div class='player'>
  <div class='detail'>
    <img>
    <div>
    <div>
  </div>
</div>
.player {
  position: fixed;

  .detail {
    img {
      float: left;
    }
    div {
      white-space: nowrap;
      overflow: auto; // BFC化与float元素分离开
    }
  }
}
```

## knowledge
+ computed里不能读取dom属性值，dom未渲染
+ 异步获取的对象类型数据，需预定义要用的对象属性，否则会报错
+ background
  ``` bash 
  background: linear-gradient(#da7caa) no-repeat, #c1c2c3;
  background-size: 20% 100%;
  ```
+ z-index无效的三种情况：
  1. 父标签 position属性为relative；
  2. 问题标签无position属性（不包括static）；
  3. 问题标签含有浮动(float)属性。