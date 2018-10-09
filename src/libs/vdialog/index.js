import Vue from 'vue';
import Dialog from './Dialog.vue';

const vdialog = {
    install : function(){
        // Vue.component('my-dialog', boxShow);
        Vue.prototype.$toast = (opt = {}) => {

          let defaultOpt = {
            msg: '提示',
            type: 'warnning',
            duration: 800
          };

          opt = {
            ...defaultOpt,
            ...opt
          };

          let Dialogs = Vue.extend(Dialog, opt);
          let vm = new Dialogs({el: document.createElement('div')});

          Object.assign(vm, opt)

          document.body.appendChild(vm.$el);
          this.vm = vm;

          console.log(vm);

          vm.$on('close', () => {
            document.body.removeChild(vm.$el);
            vm.$destroy();
            this.vm = null;
          })
        };
        console.log("Installed!");
    }
};
export default vdialog;