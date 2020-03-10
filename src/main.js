
// TODO Сменить прямой url на переменную (http://localhost:3000)
// TODO Сделать зависимомти селектов
// TODO Вытащить стили в отдельный файл
// TODO Выучить js/vue
// TODO Поспать
// TODO не забыть по есть
// TODO написать тудушки в правильных местах...

import Vue from "vue";
import ShardsVue from "shards-vue";

import "bootstrap/dist/css/bootstrap.css";
import "shards-ui/dist/css/shards.css";
import App from "./App.vue";

window.linkjsonserver = 'http://localhost:3000';

Vue.use(ShardsVue);

Vue.config.productionTip = false;

new Vue({
	render: h => h(App)
}).$mount("#app");

