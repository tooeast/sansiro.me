import Vue from 'vue';
import Picture from './Picture.vue';

const vpicture = {
    install : function(){
        // Vue.component('my-dialog', boxShow);
        Vue.prototype.$show = (opt = '') => {

          let Pictures = Vue.extend(Picture, opt);
          let vm = new Pictures({el: document.createElement('div')});

          Object.assign(vm, opt);

          document.body.appendChild(vm.$el);
          this.vm = vm;

          console.log(vm);

          vm.$on('vclose', () => {
            document.body.removeChild(vm.$el);
            vm.$destroy();
            this.vm = null;
          })
        }
    }
};
export default vpicture;