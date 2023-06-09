<script setup lang="ts">
import { reactive, ref } from 'vue'
import NavLink from './NavLink.vue'
import NavLinks from './NavLinks.vue'
import { NAV_DATA } from './data'
import type { NavLinkType } from './type'

const LOCAL_KEY = '__recentLinks__'

// 获取 localStorage 中的 recentLinks，如果不存在则返回空数组
const recentLinks: NavLinkType[] = ref(JSON.parse(localStorage.getItem(LOCAL_KEY)) || [])

const handleClick = (item: NavLinkType) => {
  updateRecentLinks(item)
}

// 更新 recentLinks
const updateRecentLinks = (item: NavLinkType) => {
  const index = recentLinks.value.findIndex((link) => link.link === item.link)
  if (index !== -1) {
    return
  }

  recentLinks.value.unshift(item)

  // 只保留最近的5个链接
  recentLinks.value = [...recentLinks.value].slice(0, 5)
  localStorage.setItem(LOCAL_KEY, JSON.stringify(recentLinks.value))
}

</script>

<template>
  <NavLinks title="最近使用" :items="recentLinks">
    <NavLink
      v-for="{ icon, title, desc, link } in recentLinks"
      :key="link"
      :icon="icon"
      :title="title"
      :desc="desc"
      :link="link"
    />
  </NavLinks>
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
