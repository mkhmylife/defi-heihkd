(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{329:function(t,e,n){(function(e){var n=function(t){return t&&t.Math==Math&&t};t.exports=n("object"==typeof globalThis&&globalThis)||n("object"==typeof window&&window)||n("object"==typeof self&&self)||n("object"==typeof e&&e)||function(){return this}()||Function("return this")()}).call(this,n(48))},330:function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},331:function(t,e,n){var r=n(347),o={}.hasOwnProperty;t.exports=function(t,e){return o.call(r(t),e)}},332:function(t,e,n){var r=n(330);t.exports=!r((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},333:function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},334:function(t,e,n){var r=n(333);t.exports=function(t){if(!r(t))throw TypeError(String(t)+" is not an object");return t}},335:function(t,e,n){var r=n(329),o=n(343),c=n(331),f=n(348),l=n(349),d=n(366),v=o("wks"),h=r.Symbol,m=d?h:h&&h.withoutSetter||f;t.exports=function(t){return c(v,t)&&(l||"string"==typeof v[t])||(l&&c(h,t)?v[t]=h[t]:v[t]=m("Symbol."+t)),v[t]}},336:function(t,e,n){var r=n(332),o=n(337),c=n(346);t.exports=r?function(object,t,e){return o.f(object,t,c(1,e))}:function(object,t,e){return object[t]=e,object}},337:function(t,e,n){var r=n(332),o=n(361),c=n(334),f=n(345),l=Object.defineProperty;e.f=r?l:function(t,e,n){if(c(t),e=f(e,!0),c(n),o)try{return l(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(t[e]=n.value),t}},338:function(t,e,n){"use strict";(function(t){var r=n(34),o=(n(368),n(373),n(83),n(46));e.a={name:"TokenSwap",data:function(){return{fromDai:10,fromHeihkd:10}},computed:{needsToApproveFromDaiToHeihkd:function(){return parseFloat(this.$store.getters["wallet/daiAllowanceFormatted"])<this.fromDai},needsToApproveFromHeihkdToDai:function(){return parseFloat(this.$store.getters["wallet/heihkdAllowanceFormatted"])<this.fromHeihkd},canSwapFromDaiToHeihkd:function(){return this.$store.getters["heihkdToken/heihkdBalanceFormatted"]>this.toHeihkd},canSwapFromHeihkdToDai:function(){return this.$store.getters["heihkdToken/daiBalanceFormatted"]>this.toDai},sellRate:function(){return this.$store.state.heihkdToken.sellRate},buyRate:function(){return this.$store.state.heihkdToken.buyRate},toHeihkd:function(){return this.fromDai*this.buyRate},toDai:function(){return this.fromHeihkd/this.sellRate}},methods:{approve:function(e){var n=this;return Object(r.a)(regeneratorRuntime.mark((function r(){var c,f,l,d,v;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return c=n.$store.state.heihkdToken.contract,f=n.$store.state.daiToken.contract,r.next=4,Object(o.c)();case 4:l=r.sent,d=c.connect(l),v=f.connect(l),r.prev=7,r.t0=e,r.next="toHeihkd"===r.t0?11:"toDai"===r.t0?14:17;break;case 11:return r.next=13,v.approve(t.env.heihkdContractAddress,Object(o.d)(n.$store.getters["wallet/daiBalanceFormatted"]));case 13:return r.abrupt("break",17);case 14:return r.next=16,d.approve(t.env.heihkdContractAddress,Object(o.d)(n.$store.getters["wallet/heihkdBalanceFormatted"]));case 16:return r.abrupt("break",17);case 17:r.next=21;break;case 19:r.prev=19,r.t1=r.catch(7);case 21:case"end":return r.stop()}}),r,null,[[7,19]])})))()},swap:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,c,f;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.$store.state.heihkdToken.contract,n.next=3,Object(o.c)();case 3:c=n.sent,f=r.connect(c),n.t0=t,n.next="toHeihkd"===n.t0?8:"toDai"===n.t0?17:26;break;case 8:return n.prev=8,n.next=11,f.swapDaiForHeihkd(Object(o.d)(e.fromDai.toString()));case 11:n.next=16;break;case 13:n.prev=13,n.t1=n.catch(8),console.error(n.t1);case 16:return n.abrupt("break",26);case 17:return n.prev=17,n.next=20,f.swapHeihkdForDai(Object(o.d)(e.fromHeihkd.toString()));case 20:n.next=25;break;case 22:n.prev=22,n.t2=n.catch(17),console.error(n.t2);case 25:return n.abrupt("break",26);case 26:case"end":return n.stop()}}),n,null,[[8,13],[17,22]])})))()}}}}).call(this,n(106))},339:function(t,e,n){var r={};r[n(335)("toStringTag")]="z",t.exports="[object z]"===String(r)},340:function(t,e,n){var r=n(329),o=n(344),c="__core-js_shared__",f=r[c]||o(c,{});t.exports=f},341:function(t,e,n){var r=n(329),o=n(336),c=n(331),f=n(344),l=n(352),d=n(367),v=d.get,h=d.enforce,m=String(String).split("String");(t.exports=function(t,e,n,l){var d,v=!!l&&!!l.unsafe,k=!!l&&!!l.enumerable,y=!!l&&!!l.noTargetGet;"function"==typeof n&&("string"!=typeof e||c(n,"name")||o(n,"name",e),(d=h(n)).source||(d.source=m.join("string"==typeof e?e:""))),t!==r?(v?!y&&t[e]&&(k=!0):delete t[e],k?t[e]=n:o(t,e,n)):k?t[e]=n:f(e,n)})(Function.prototype,"toString",(function(){return"function"==typeof this&&v(this).source||l(this)}))},343:function(t,e,n){var r=n(360),o=n(340);(t.exports=function(t,e){return o[t]||(o[t]=void 0!==e?e:{})})("versions",[]).push({version:"3.13.0",mode:r?"pure":"global",copyright:"© 2021 Denis Pushkarev (zloirock.ru)"})},344:function(t,e,n){var r=n(329),o=n(336);t.exports=function(t,e){try{o(r,t,e)}catch(n){r[t]=e}return e}},345:function(t,e,n){var r=n(333);t.exports=function(input,t){if(!r(input))return input;var e,n;if(t&&"function"==typeof(e=input.toString)&&!r(n=e.call(input)))return n;if("function"==typeof(e=input.valueOf)&&!r(n=e.call(input)))return n;if(!t&&"function"==typeof(e=input.toString)&&!r(n=e.call(input)))return n;throw TypeError("Can't convert object to primitive value")}},346:function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},347:function(t,e,n){var r=n(363);t.exports=function(t){return Object(r(t))}},348:function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++n+r).toString(36)}},349:function(t,e,n){var r=n(364),o=n(330);t.exports=!!Object.getOwnPropertySymbols&&!o((function(){return!String(Symbol())||!Symbol.sham&&r&&r<41}))},350:function(t,e,n){var path=n(365),r=n(329),o=function(t){return"function"==typeof t?t:void 0};t.exports=function(t,e){return arguments.length<2?o(path[t])||o(r[t]):path[t]&&path[t][e]||r[t]&&r[t][e]}},351:function(t,e){t.exports={}},352:function(t,e,n){var r=n(340),o=Function.toString;"function"!=typeof r.inspectSource&&(r.inspectSource=function(t){return o.call(t)}),t.exports=r.inspectSource},353:function(t,e,n){var r=n(343),o=n(348),c=r("keys");t.exports=function(t){return c[t]||(c[t]=o(t))}},354:function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},355:function(t,e,n){var content=n(376);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(84).default)("37035213",content,!0,{sourceMap:!1})},360:function(t,e){t.exports=!1},361:function(t,e,n){var r=n(332),o=n(330),c=n(362);t.exports=!r&&!o((function(){return 7!=Object.defineProperty(c("div"),"a",{get:function(){return 7}}).a}))},362:function(t,e,n){var r=n(329),o=n(333),c=r.document,f=o(c)&&o(c.createElement);t.exports=function(t){return f?c.createElement(t):{}}},363:function(t,e){t.exports=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t}},364:function(t,e,n){var r,o,c=n(329),f=n(369),l=c.process,d=l&&l.versions,v=d&&d.v8;v?o=(r=v.split("."))[0]<4?1:r[0]+r[1]:f&&(!(r=f.match(/Edge\/(\d+)/))||r[1]>=74)&&(r=f.match(/Chrome\/(\d+)/))&&(o=r[1]),t.exports=o&&+o},365:function(t,e,n){var r=n(329);t.exports=r},366:function(t,e,n){var r=n(349);t.exports=r&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},367:function(t,e,n){var r,o,c,f=n(370),l=n(329),d=n(333),v=n(336),h=n(331),m=n(340),k=n(353),y=n(351),x="Object already initialized",w=l.WeakMap;if(f||m.state){var S=m.state||(m.state=new w),D=S.get,T=S.has,H=S.set;r=function(t,e){if(T.call(S,t))throw new TypeError(x);return e.facade=t,H.call(S,t,e),e},o=function(t){return D.call(S,t)||{}},c=function(t){return T.call(S,t)}}else{var j=k("state");y[j]=!0,r=function(t,e){if(h(t,j))throw new TypeError(x);return e.facade=t,v(t,j,e),e},o=function(t){return h(t,j)?t[j]:{}},c=function(t){return h(t,j)}}t.exports={set:r,get:o,has:c,enforce:function(t){return c(t)?o(t):r(t,{})},getterFor:function(t){return function(e){var n;if(!d(e)||(n=o(e)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return n}}}},368:function(t,e,n){var r=n(339),o=n(341),c=n(371);r||o(Object.prototype,"toString",c,{unsafe:!0})},369:function(t,e,n){var r=n(350);t.exports=r("navigator","userAgent")||""},370:function(t,e,n){var r=n(329),o=n(352),c=r.WeakMap;t.exports="function"==typeof c&&/native code/.test(o(c))},371:function(t,e,n){"use strict";var r=n(339),o=n(372);t.exports=r?{}.toString:function(){return"[object "+o(this)+"]"}},372:function(t,e,n){var r=n(339),o=n(354),c=n(335)("toStringTag"),f="Arguments"==o(function(){return arguments}());t.exports=r?o:function(t){var e,n,r;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=function(t,e){try{return t[e]}catch(t){}}(e=Object(t),c))?n:f?o(e):"Object"==(r=o(e))&&"function"==typeof e.callee?"Arguments":r}},373:function(t,e,n){"use strict";var r=n(341),o=n(334),c=n(330),f=n(374),l="toString",d=RegExp.prototype,v=d.toString,h=c((function(){return"/a/b"!=v.call({source:"a",flags:"b"})})),m=v.name!=l;(h||m)&&r(RegExp.prototype,l,(function(){var t=o(this),p=String(t.source),e=t.flags;return"/"+p+"/"+String(void 0===e&&t instanceof RegExp&&!("flags"in d)?f.call(t):e)}),{unsafe:!0})},374:function(t,e,n){"use strict";var r=n(334);t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},375:function(t,e,n){"use strict";n(355)},376:function(t,e,n){var r=n(82)(!1);r.push([t.i,"",""]),t.exports=r},383:function(t,e,n){"use strict";n.r(e);var r=n(338).a,o=(n(375),n(72)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h3",{staticClass:"mb-3"},[t._v("Token Swap")]),t._v(" "),n("b-card",{staticClass:"mb-4"},[n("b-form",[n("div",{staticClass:"mb-3"},[t._v("Rate: 1 DAI = "+t._s(t.buyRate)+" HEIHKD")]),t._v(" "),n("div",{staticClass:"\n          d-block d-sm-flex\n          justify-content-between\n          align-items-center\n          mb-4\n        "},[n("b-form-group",{staticClass:"w-100 mb-0"},[n("b-input-group",{attrs:{append:"DAI"}},[n("b-form-input",{attrs:{type:"number",min:"1"},model:{value:t.fromDai,callback:function(e){t.fromDai=e},expression:"fromDai"}})],1)],1),t._v(" "),n("div",{staticClass:"mx-5 text-center my-2 my-sm-0"},[t._v("To")]),t._v(" "),n("b-form-group",{staticClass:"w-100 mb-0"},[n("b-input-group",{attrs:{append:"HEIHKD"}},[n("b-form-input",{attrs:{type:"number",readonly:""},model:{value:t.toHeihkd,callback:function(e){t.toHeihkd=e},expression:"toHeihkd"}})],1)],1)],1),t._v(" "),n("div",{staticClass:"text-center"},[t.needsToApproveFromDaiToHeihkd?n("b-button",{attrs:{variant:"dark",block:""},on:{click:function(e){return t.approve("toHeihkd")}}},[t._v("Approve")]):n("b-button",{attrs:{disabled:!t.canSwapFromDaiToHeihkd,variant:"dark",block:""},on:{click:function(e){return t.swap("toHeihkd")}}},[t._v("Swap")])],1)])],1),t._v(" "),n("b-card",[n("b-form",[n("div",{staticClass:"mb-3"},[t._v("Rate: 1 HEIHKD = "+t._s(t.sellRate)+" DAI")]),t._v(" "),n("div",{staticClass:"\n          d-block d-sm-flex\n          justify-content-between\n          align-items-center\n          mb-4\n        "},[n("b-form-group",{staticClass:"w-100 mb-0"},[n("b-input-group",{attrs:{append:"HEIHKD"}},[n("b-form-input",{attrs:{type:"number",min:"1"},model:{value:t.fromHeihkd,callback:function(e){t.fromHeihkd=e},expression:"fromHeihkd"}})],1)],1),t._v(" "),n("div",{staticClass:"mx-5 text-center my-2 my-sm-0"},[t._v("To")]),t._v(" "),n("b-form-group",{staticClass:"w-100 mb-0"},[n("b-input-group",{attrs:{append:"DAI"}},[n("b-form-input",{attrs:{type:"number",readonly:""},model:{value:t.toDai,callback:function(e){t.toDai=e},expression:"toDai"}})],1)],1)],1),t._v(" "),n("div",{staticClass:"text-center"},[t.needsToApproveFromHeihkdToDai?n("b-button",{attrs:{variant:"dark",block:""},on:{click:function(e){return t.approve("toDai")}}},[t._v("Approve")]):n("b-button",{attrs:{disabled:!t.canSwapFromHeihkdToDai,variant:"dark",block:""},on:{click:function(e){return t.swap("toDai")}}},[t._v("Swap")])],1)])],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);