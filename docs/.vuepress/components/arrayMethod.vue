<template>
  <table>
    <thead>
    <tr>
      <th v-for="thead in type">{{ thead }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(tds,tdsI) in changeArray">
      <td :rowspan="changeArray.length" v-if="tdsI === 0">改变原数组的方法({{ changeArray.length }}个)➡️</td>
      <td v-for="(td,k) in tds">
        <span v-if="k === 'code'"><code>{{ td }}</code></span>
        <span v-else>{{ td }}</span>
      </td>
    </tr>
    <tr v-for="(tds,tdsI) in originArray">
      <td :rowspan="originArray.length" v-if="tdsI === 0">不改变原数组的方法({{ originArray.length }}个)➡️</td>
      <td v-for="(td,k) in tds">
        <span v-if="k === 'code'"><code>{{ td }}</code></span>
        <span v-else>{{ td }}</span>
      </td>
    </tr>
    <tr v-for="(tds,tdsI) in loopArray">
      <td :rowspan="loopArray.length" v-if="tdsI === 0">遍历的方法({{ loopArray.length }}个)</td>
      <td v-for="(td,k) in tds">
        <span v-if="k === 'code'"><code>{{ td }}</code></span>
        <span v-else>{{ td }}</span>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import { type, loopArray, originArray, changeArray, createArray } from './arrayMethod'

export default {
  name: 'arrayMethod',
  data() {
    return {
      type, loopArray, originArray, changeArray, createArray
    }
  }
}
</script>

<style scoped>
table td, table th {
  /*width: auto;*/
  max-width: none;
}
</style>
