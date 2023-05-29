<script setup lang="ts">
import NavLink from './NavLink.vue'
import NavLinks from './NavLinks.vue'
import { NAV_DATA } from './data'
import type { NavLinkType } from './type'


// 最近使用历史
const RECENTLY_USED: NavLinkType[] = []

const handleClick = (item: NavLinkType) => {
  console.log('handleClick', item)
}

</script>

<template>
  <NavLinks
    v-for="{title, items} in NAV_DATA"
    :title="title" :items="items">
    <NavLink
      v-for="{ icon, title, desc, link } in items"
      :key="link"
      :icon="icon"
      :title="title"
      :desc="desc"
      :link="link"
      @handleClick="handleClick({ icon, title, desc, link } )"
    />
  </NavLinks>
</template>

<style src="./index.scss"></style>
<style scoped lang="scss"></style>
