(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ed9a2350"],{"0535":function(e,t,n){},2914:function(e,t,n){"use strict";var a=n("4da5"),i=n.n(a);i.a},"4da5":function(e,t,n){},5118:function(e,t,n){(function(e){var a="undefined"!==typeof e&&e||"undefined"!==typeof self&&self||window,i=Function.prototype.apply;function s(e,t){this._id=e,this._clearFn=t}t.setTimeout=function(){return new s(i.call(setTimeout,a,arguments),clearTimeout)},t.setInterval=function(){return new s(i.call(setInterval,a,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},s.prototype.unref=s.prototype.ref=function(){},s.prototype.close=function(){this._clearFn.call(a,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},n("6017"),t.setImmediate="undefined"!==typeof self&&self.setImmediate||"undefined"!==typeof e&&e.setImmediate||this&&this.setImmediate,t.clearImmediate="undefined"!==typeof self&&self.clearImmediate||"undefined"!==typeof e&&e.clearImmediate||this&&this.clearImmediate}).call(this,n("c8ba"))},5710:function(e,t,n){"use strict";var a=n("9e7c"),i=n.n(a);i.a},6017:function(e,t,n){(function(e,t){(function(e,n){"use strict";if(!e.setImmediate){var a,i=1,s={},o=!1,r=e.document,c=Object.getPrototypeOf&&Object.getPrototypeOf(e);c=c&&c.setTimeout?c:e,"[object process]"==={}.toString.call(e.process)?f():p()?v():e.MessageChannel?h():r&&"onreadystatechange"in r.createElement("script")?g():T(),c.setImmediate=l,c.clearImmediate=u}function l(e){"function"!==typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),n=0;n<t.length;n++)t[n]=arguments[n+1];var o={callback:e,args:t};return s[i]=o,a(i),i++}function u(e){delete s[e]}function d(e){var t=e.callback,a=e.args;switch(a.length){case 0:t();break;case 1:t(a[0]);break;case 2:t(a[0],a[1]);break;case 3:t(a[0],a[1],a[2]);break;default:t.apply(n,a);break}}function m(e){if(o)setTimeout(m,0,e);else{var t=s[e];if(t){o=!0;try{d(t)}finally{u(e),o=!1}}}}function f(){a=function(e){t.nextTick(function(){m(e)})}}function p(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=n,t}}function v(){var t="setImmediate$"+Math.random()+"$",n=function(n){n.source===e&&"string"===typeof n.data&&0===n.data.indexOf(t)&&m(+n.data.slice(t.length))};e.addEventListener?e.addEventListener("message",n,!1):e.attachEvent("onmessage",n),a=function(n){e.postMessage(t+n,"*")}}function h(){var e=new MessageChannel;e.port1.onmessage=function(e){var t=e.data;m(t)},a=function(t){e.port2.postMessage(t)}}function g(){var e=r.documentElement;a=function(t){var n=r.createElement("script");n.onreadystatechange=function(){m(t),n.onreadystatechange=null,e.removeChild(n),n=null},e.appendChild(n)}}function T(){a=function(e){setTimeout(m,0,e)}}})("undefined"===typeof self?"undefined"===typeof e?this:e:self)}).call(this,n("c8ba"),n("4362"))},"9e7c":function(e,t,n){},a9ef:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container-wrapper"},[n("Row",{staticClass:"container-title"},[n("iCol",{staticClass:"c-title-left",attrs:{span:"3"}},[n("div",{staticClass:"c-t-left-name"},[e._v(e._s(e.typename))])]),n("iCol",{staticClass:"c-title-right",attrs:{span:"21"}},[n("Row",[n("iCol",{staticClass:"c-t-right-title",attrs:{span:"20"}},[n("img",{style:{width:"44px",height:"44px",borderRadius:"20px"},attrs:{src:e.img}}),n("span",{staticClass:"r-title-span"},[e._v(e._s(e.timeName)+" ："+e._s(e.countryTimeOne))]),n("span",{staticClass:"r-title-time"},[e._v(e._s(e.countryTimeTwo))])]),n("iCol",{staticClass:"c-t-right-select",attrs:{span:"4"}},[n("Select")],1)],1)],1)],1)],1)},i=[],s=(n("28a5"),n("cebc")),o=(n("cadf"),n("551c"),n("097d"),n("5118")),r=n("cadb"),c=n("2f62"),l=n("f660"),u=n("ed08"),d={props:{typename:{type:String,default:""}},components:{Select:l["a"]},data:function(){return{timeName:"",countryTimeOne:"",countryTimeTwo:"",time:"",img:""}},computed:Object(s["a"])({},Object(c["c"])(["user_info"])),created:function(){var e=this;"undefined"==typeof Object(u["getSessionStorage"])("userInfo")||""==Object(u["getSessionStorage"])("userInfo")||null==Object(u["getSessionStorage"])("userInfo")?setTimeout(function(){e.handleTime()},1500):e.handleTime()},methods:{handleTime:function(){var e=Object(u["getSessionStorage"])("userInfo").locaTime,t=Object(r["a"])(Object(u["getSessionStorage"])("userInfo").user_country);this.img=t["img"];var n=e.split("：");this.timeName=n[0]+" ";var a="YYYY-MM-DD HH:mm:ss",i=this.$moment(n[1],a),s=this;Object(o["setInterval"])(function(){i.add(1,"s");var e=i.format(a).split(" ");s.countryTimeOne=e[0],s.countryTimeTwo=e[1]},1e3)}},destroyed:function(){clearInterval(this.time)}},m=d,f=(n("2914"),n("2877")),p=Object(f["a"])(m,a,i,!1,null,"f3ac4e9a",null);p.options.__file="common-oneTime.vue";t["a"]=p.exports},c821:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("div",[n("oneTime",{attrs:{typename:"订单报表下载"}})],1),n("div",{staticClass:"export-amazon-orderTemp"},[n("Card",{staticClass:"card-div",attrs:{bordered:!1}},[n("div",{staticClass:"search"},[n("Form",{ref:"formRef",attrs:{model:e.dataModel,inline:""}},[n("FormItem",{attrs:{label:"日期：","label-width":80}},[n("CommonDatePicker",{attrs:{time:e.dataModel.time},on:{Onchange:e.handleDatePickerOnChange}})],1),n("FormItem",{attrs:{label:"事业部：","label-width":80}},[n("y-select",{staticStyle:{width:"150px"},attrs:{clearable:"",code:"business",transfer:!0,placeholder:"请选择"},model:{value:e.dataModel.business,callback:function(t){e.$set(e.dataModel,"business",t)},expression:"dataModel.business"}})],1),n("Button",{staticClass:"but-primary",attrs:{type:"primary"},on:{click:e.handleExport}},[e._v("导 出")]),n("div",{staticClass:"tip-div"},[n("Icon",{attrs:{type:"ios-alert",color:"#FF9800",size:"20"}}),n("span",{staticClass:"tip-span"},[e._v(" 注：数据来自从亚马逊MWS-API获取的订单明细；")])],1)],1)],1)])],1)])},i=[],s=(n("cadf"),n("551c"),n("097d"),n("a9ef")),o=n("f341"),r={components:{oneTime:s["a"],CommonDatePicker:o["a"]},data:function(){return{dataModel:{time:[],business:""}}},created:function(){this.handleTime()},methods:{handleTime:function(){var e=new Date;e.setTime(e.getTime()-864e5),this.dataModel.time=[e,new Date]},handleDatePickerOnChange:function(e){this.dataModel.time=e},handleExport:function(){}}},c=r,l=(n("d254"),n("2877")),u=Object(l["a"])(c,a,i,!1,null,"3e13fa32",null);u.options.__file="index.vue";t["default"]=u.exports},d254:function(e,t,n){"use strict";var a=n("0535"),i=n.n(a);i.a},f341:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"date-picker-wrapper"},[n("DatePicker",{attrs:{value:e.time,format:"yyyy-MM-dd",type:"daterange",placement:"bottom-end",transfer:!0,placeholder:"Select date",options:e.options},on:{"on-change":e.handleOnchange}})],1)},i=[],s={props:{time:{type:Array,default:function(){return[]}}},data:function(){return{options:{shortcuts:[{text:"昨天",value:function(){var e=new Date;return e.setTime(e.getTime()-864e5),[e,e]},onClick:function(e){}},{text:"本周",value:function(){var e=new Date,t=new Date,n=t.getDay();return t.setDate(t.getDate()-n),e.setDate(e.getDate()+5),[t,e]}},{text:"本月",value:function(){var e=new Date,t=new Date;return t.setDate(1),e.setTime(e.getTime()-864e5),[t,e]}},{text:"最近7天",value:function(){var e=new Date;e.setTime(e.getTime()-864e5);var t=new Date;return t.setTime(t.getTime()-6048e5),[t,e]}},{text:"30天",value:function(){var e=new Date,t=new Date;return t.setTime(t.getTime()-2592e6),[t,e]}},{text:"60天",value:function(){var e=new Date,t=new Date;return t.setTime(t.getTime()-5184e6),[t,e]}},{text:"90天",value:function(){var e=new Date,t=new Date;return t.setTime(t.getTime()-7776e6),[t,e]}}]}}},methods:{handleOnchange:function(e){this.$emit("Onchange",e)}}},o=s,r=(n("5710"),n("2877")),c=Object(r["a"])(o,a,i,!1,null,"37156e6a",null);c.options.__file="common-datePicker.vue";t["a"]=c.exports}}]);