(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3cb50659"],{3851:function(t,n,c){"use strict";var o=c("7bd5"),u=c.n(o);u.a},"7bd5":function(t,n,c){},"847f":function(t,n,c){"use strict";c.r(n);var o=function(){var t=this,n=t.$createElement,c=t._self._c||n;return c("div",[c("div",{staticClass:"product"},[c("div",{staticClass:"product-inner"},t._l(t.products,(function(n){return c("SingleProduct",t._b({key:n.id},"SingleProduct",n,!1))})),1)])])},u=[],e=c("1c82"),a=c("bc3a"),i=c.n(a),r=c("58ed"),s={components:{SingleProduct:e["a"]},data:function(){return{products:[]}},mounted:function(){var t=this;i.a.get("/api/products").then((function(n){console.log(n),t.products=n.data.default})).catch((function(){console.log("mocking!",r["a"]),t.products=r["a"]}))}},d=s,l=(c("3851"),c("2877")),p=Object(l["a"])(d,o,u,!1,null,"7ec902ae",null);n["default"]=p.exports}}]);
//# sourceMappingURL=chunk-3cb50659.2a24f101.js.map