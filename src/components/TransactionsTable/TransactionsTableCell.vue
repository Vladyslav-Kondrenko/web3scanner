<template>
  <td>
    <template v-if="isText">
      <p>{{ text }}</p>
    </template>

    <template v-else>
      <copy-content v-if="contentForCopy" :contentForCopy="contentForCopy">
        <template v-slot:content>
          <router-link v-if="routerLinkUrl" :to="routerLinkUrl">{{
            text
          }}</router-link>
          <p v-if="!routerLinkUrl">{{ text }}</p>
        </template>
      </copy-content>
    </template>
  </td>
</template>
  
  <script>
import CopyContent from "@/components/CopyContent/CopyContent.vue";

export default {
  components: {
    CopyContent,
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
      return (
        !!this.content["text"] &&
        !this.content["routerLinkUrl"] &&
        !this.content["contentForCopy"]
      );
    },
    text() {
      return this.content["text"];
    },
    routerLinkUrl() {
      return this.content["routerLinkUrl"];
    },
    contentForCopy() {
      return this.content["contentForCopy"];
    },
  },
};
</script>