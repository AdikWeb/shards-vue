<template>
  <div id="app">
    <addAddressForm :locations="locations" ref="addAddressForm"></addAddressForm>
    <showAddressBlocks :locations="locations" ref="showAddressBlocks"></showAddressBlocks>
  </div>
</template>

<script>
import axios from "axios";

import addAddressForm from "./components/addAddressForm";
import showAddressBlocks from "./components/showAddressBlocks";

export default {
  name: "App",
  components: {
    addAddressForm,
    showAddressBlocks
  },
  data: function() {
    return {
      editMode:false,
      idElement:'',
      locations: false,
      addressListToShow:false
    };
  },
  mounted() {
    this.test();
  },
  methods: {
    test: function() {
      axios
        .get(window.linkjsonserver+"/locations")
        .then(res => {
          this.locations = res.data;
        });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
