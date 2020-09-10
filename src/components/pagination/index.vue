<template>
  <div class="pagination">
    <button :disabled='Currentpage===1'  @click="$emit('changePageNum',Currentpage - 1)">上一页</button>
    <button v-show="startEnd.start>1"  @click="$emit('changePageNum', 1)"  >1</button>
    <button v-show="startEnd.start>2">···</button>

   
    <button 
    v-for=" page in startEnd.end" 
    :key="page" 
     v-if="page >= startEnd.start"  
     @click="$emit('changePageNum',page)"
     :class="{active:Currentpage===page}">{{page}}</button>

    <button v-show="startEnd.end<totalPageNum-1">···</button>
    <button v-show="startEnd.end<totalPageNum"  @click="$emit('changePageNum',totalPageNum)">{{totalPageNum}}</button>
    <button :disabled='Currentpage===totalPageNum'  @click="$emit('changePageNum',Currentpage +1)">下一页</button>

    <button >共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  props:['Currentpage','Displaynumber','total','continuitypage'],
  computed:{
    //计算最大页数，向上取整
    totalPageNum(){
      return Math.ceil(this.total/ this.Displaynumber)
    },
    //然后计算中间的显示的数字也就是起始和结束
    startEnd(){
       //先声明几个变量
       let start,end,Difference
       //首先判断连续显示的页面是否大于最大的显示页面数
       if (this.continuitypage>this.totalPageNum) {
          //说明大于那么起始位置为1，结束位置为最大显示页面数
          start = 1
          end =this.totalPageNum
       }else{
         //说明不大于
         //这是正常的时候显示
         start = this.Currentpage - Math.floor(this.continuitypage/2)  
         end =  this.Currentpage + Math.floor(this.continuitypage/2)  
         //不正常的时候，比如当前页面就是1
         if (start<=1) {
            Difference = 1 - start
            start += Difference
            end +=Difference
         }
         
         //如果结束的页面大于最大页面
         if (end >= this.totalPageNum) {
            Difference = end - this.totalPageNum
            start -= Difference
            end -=Difference
         }
     
       }
       //最后把起始位置和结束位置暴露出去
             return {start,end}
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>