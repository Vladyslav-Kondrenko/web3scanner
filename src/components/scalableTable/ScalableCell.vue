<template>
    <td>
      <template v-if="isText">
        <p>{{ text }}</p>
      </template>
      <template v-else>
        <router-link :to="routerLinkUrl">{{ text }}</router-link>
      </template>
    </td>
  </template>
  
  <script>
  export default {
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
    },
  };
  </script>