<script setup>
import { ref, watch } from 'vue'
import { useChatStore } from '@/stores/aichat'
import { useChatDataStore } from '@/stores/ChatData'
import VueMarkdown from 'vue-markdown-render'
import '@/assets/markdown.css'
const ChatStore = useChatStore()
const ChatData = useChatDataStore()
const skippedFirstScroll = ref(false)

const scrollToBottom = () => {
  setTimeout(() => {
    if (skippedFirstScroll.value) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      })
    } else {
      skippedFirstScroll.value = true
    }
  }, 100)
}

watch(ChatData.ChatList, scrollToBottom)
</script>

<template>
  <div v-if="ChatStore.isChatOpened" id="chat-box">
    <div
      v-for="chatText in ChatData.ChatList"
      :key="chatText"
      :class="chatText.byMan ? 'text-by-man' : 'text-by-ai'"
    >
      <span v-if="!chatText.byMan" class="markdown-content">
        <!-- <span v-if="chatText.text.type === 'str'">{{ chatText.text.text }} </span>

        <VueMarkdown
          v-if="chatText.text.type === 'md'"
          :source="chatText.text.text"
          :options="options"
        /> -->

        <VueMarkdown :source="chatText.text.text" :options="options" />
      </span>
      <span v-else>{{ chatText.text }}</span>
    </div>
    <div v-if="ChatStore.ProcessingAi" class="text-by-ai">...</div>
  </div>
</template>

<style scoped>
.markdown-content {
  font-family: 'Alef', sans-serif;
  font-weight: 400;
  font-style: normal;
  color: #d7c2be;
  background: none !important;
  margin-bottom: 10vh !important;
}
.text-by-ai {
  padding: 10px;
  margin: 5px;
  margin-bottom: 10px;
  transition: all 1s ease-in-out;
  /* border: #828a9c 1px solid; */
  border-radius: 10px;
  background-color: #222a40;
  align-self: flex-start;
  max-width: 75%;
  animation: slideInFromLeft 1s forwards;
  color: #d7c2be;
  font-family: 'Alef', sans-serif;
  font-weight: 400;
  font-style: normal;
  word-wrap: break-word;
}
.text-by-man {
  word-wrap: break-word;
  font-family: 'Alef', sans-serif;
  font-weight: 400;
  font-style: normal;
  color: #d7c2be;
  max-width: 75%;
  padding: 10px 5px;
  margin: 5px;
  transition: all 1s ease-in-out;
  /* border: #828a9c 1px solid; */
  border-radius: 10px;
  background-color: #222a40;
  align-self: flex-end;
  animation: slideOutToRight 1s forwards;
}
#chat-box {
  font-family: 'Alef', sans-serif;
  font-weight: 400;
  font-style: normal;
  overflow-x: hidden;

  min-height: 70vh;
  width: 70vw;

  transition: all 1s ease-in-out;

  display: flex;
  /* align-items: center; */
  justify-content: start;
  flex-direction: column;
  border-radius: 10px;
  /* background-color: #161c2e; */
  margin: 0% auto;
  margin-top: 3vh;
  /* margin-bottom: 18vh; */
  margin-bottom: 10vh;
  padding-bottom: 8vh;
  z-index: 10;
}

@keyframes slideInFromLeft {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Keyframes for exiting to the right */
@keyframes slideOutToRight {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  #chat-box {
    width: calc(100vw - 30px);
  }
  .text-by-man,
  .text-by-ai {
    padding: 10px;
    max-width: 93%;
  }
}
</style>