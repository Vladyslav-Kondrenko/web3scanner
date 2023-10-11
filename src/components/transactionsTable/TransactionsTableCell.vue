<template>
    <td>
      <template v-if="isText">
        <p>{{ text }}</p>
      </template>
      <template v-else>
        <router-link :to="routerLinkUrl">{{ text }}</router-link>
      </template>
      <copy-content v-if="contentForCopy" :contentForCopy="contentForCopy"></copy-content>
    </td>
  </template>
  
  <script>
  import CopyContent from "@/components/copyContent/CopyContent.vue";

  export default {
    components: {
      CopyContent
    },

    props: {
      content: {
        type: Object,
        required: true,
        default: () => ({}),
      },
    },
    computed: {
      isText() {
        return !!this.content['text'] && !this.content['routerLinkUrl'];
      },
      text() {
        return this.content['text'];
      },
      routerLinkUrl() {
        return this.content['routerLinkUrl'];
      },
      contentForCopy() {
        return this.content['contentForCopy'];
      },
    },
  };
  </script>