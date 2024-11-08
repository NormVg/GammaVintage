import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useChatStore = defineStore('ai-chat', () => {
  const isChatOpened = ref(false)

  return { isChatOpened }
})