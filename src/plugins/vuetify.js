// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import * as labsComponents from "vuetify/labs/components";
// import colors from 'vuetify/lib/util/colors'

// Vuetify
import { createVuetify } from "vuetify";

export default createVuetify({
  options: { customProperties: true },
  components: {
    ...labsComponents,
  },
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          background: "#1E1E1E",   // Темно-серый фон
          surface: "#333333",      // Темно-серая поверхность
          primary: "#FF6347",      // Темно-красный (новый primary)
          secondary: "#00CED1",    // Темно-бирюзовый (новый secondary)
          error: "#B22222",        // Огненно-красный
          info: "#4682B4",         // Стальной синий
          success: "#228B22",      // Темно-зеленый
          warning: "#FFD700",      // Золотистый
        },
      },
    },
  },
});
