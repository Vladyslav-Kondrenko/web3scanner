// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import * as labsComponents from "vuetify/labs/components";

// Vuetify
import { createVuetify } from "vuetify";

export default createVuetify({
  components: {
    ...labsComponents,
  },
});
