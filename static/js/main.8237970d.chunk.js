(this["webpackJsonpxtf-web-app"]=this["webpackJsonpxtf-web-app"]||[]).push([[0],{372:function(e,t,n){},376:function(e,t,n){},379:function(e,t,n){},380:function(e,t){},403:function(e,t){},410:function(e,t){},429:function(e,t){},431:function(e,t){},498:function(e,t){},500:function(e,t){},511:function(e,t){},513:function(e,t){},538:function(e,t){},540:function(e,t){},541:function(e,t){},547:function(e,t){},560:function(e,t){},572:function(e,t){},575:function(e,t){},580:function(e,t){},590:function(e,t){},683:function(e,t){},741:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n.n(r),a=n(358),s=n.n(a),i=(n(372),n(363)),o=n(17),l=n(16),j=n(750),d=n(749),u=n(744),b=n(743),h=n(2);var O=function(e){return Object(h.jsx)("div",{style:{position:"absolute",top:10,right:0,zIndex:999,width:500},children:Object(h.jsxs)(b.a,{variant:"danger",show:e.show,onClose:function(){return e.setShowAlert(!1)},className:"alert-slide-right",dismissible:!0,children:[Object(h.jsx)(b.a.Heading,{children:e.title}),Object(h.jsx)("p",{children:e.body})]})})},x=(n(376),[{name:"Home",href:"/xtf-web-app/",current:!1},{name:"About Us",href:"/xtf-web-app/#/about-us",current:!1},{name:"Journey",href:"/xtf-web-app/#/journey",current:!1},{name:"Blog",href:"/xtf-web-app/#/blog",current:!1}]);function p(e){var t=Object(r.useState)(null),n=Object(l.a)(t,2),c=n[0],a=n[1],s=Object(r.useState)({show:!1,title:"",body:""}),i=Object(l.a)(s,2),o=i[0],b=i[1];Object(r.useEffect)((function(){if(x)for(var t in x)x[t].name===e.currentNode?x[t].current=!0:x[t].current=!1}));var p=function(){window.ethereum?window.ethereum.request({method:"eth_requestAccounts"}).then((function(e){a(e[0])})):b({show:!0,title:"Error Message",body:"Install Metamask"})};return Object(h.jsxs)("div",{children:[Object(h.jsx)(O,{show:o.show,title:o.title,body:o.body,setShowAlert:function(e){console.log("something"),b({show:!1,title:"",body:""})}}),Object(h.jsx)(d.a,{collapseOnSelect:!0,expand:"lg",bg:"primary",variant:"dark",className:"navbar-custom",children:Object(h.jsxs)(u.a,{children:[Object(h.jsx)(d.a.Brand,{href:"/xtf-web-app/",children:"XTF"}),Object(h.jsx)(d.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),Object(h.jsxs)(d.a.Collapse,{id:"responsive-navbar-nav",children:[Object(h.jsx)(j.a,{className:"me-auto",children:x.map((function(e){return Object(h.jsx)(j.a.Link,{href:e.href,children:e.name},e.name)}))}),(window.ethereum&&window.ethereum.request({method:"eth_accounts"}).then((function(e){e.length?(console.log("You're connected to: ".concat(e[0])),a(e[0])):console.log("Metamask is not connected")})),c?Object(h.jsx)(j.a,{children:Object(h.jsx)(j.a.Link,{href:"/xtf-web-app/#/profile",children:"Profile"})}):Object(h.jsx)(j.a,{children:Object(h.jsx)(j.a.Link,{onClick:p,children:"Sign in"})}))]})]})})]})}var f=function(){return Object(h.jsxs)("div",{children:[Object(h.jsx)(p,{}),"About US"]})};var m=function(){return Object(h.jsxs)("div",{children:[Object(h.jsx)(p,{currentNode:"Blog"}),Object(h.jsx)("h1",{children:"Blog"})]})},v=n(753),g=n(745),y=n.p+"static/media/dydx_exchange.8f876a5b.png",w=[{title:"dydx Exchange",href:"/xtf-web-app/#/trade/dydx",description:"A powerful and professional exchange for trading perpetuals.\n    While trading on our platform, traders enjoy the security, privacy,\n    and decentralization benefits of Starkware zero-knowledge proofs."}];var S=function(e){var t;return Object(h.jsx)("div",{children:Object(h.jsxs)(v.a,{border:"info",style:{width:"18rem",margin:"20px"},children:[Object(h.jsx)(v.a.Img,{variant:"top",src:y}),Object(h.jsxs)(v.a.Body,{children:[Object(h.jsx)(v.a.Title,{children:"dydx Exchange"}),Object(h.jsx)(v.a.Text,{children:"A powerful and professional exchange for trading perpetuals. While trading on our platform, traders enjoy the security, privacy, and decentralization benefits of Starkware zero-knowledge proofs."}),Object(h.jsx)(g.a,{variant:"primary",href:null===(t=w.find((function(e){return"dydx Exchange"==e.title})))||void 0===t?void 0:t.href,children:"Trade"})]})]})})};var k=function(){return Object(h.jsxs)("div",{children:[Object(h.jsx)(p,{}),Object(h.jsx)(S,{})]})};var T=function(){return Object(h.jsxs)("div",{children:[Object(h.jsx)(p,{}),"Page Not Found"]})},I=n(364);n(379);var A=function(){var e=Object(r.useState)(""),t=Object(l.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(""),s=Object(l.a)(a,2),i=s[0],o=s[1],j=Object(r.useState)(""),d=Object(l.a)(j,2),u=d[0],b=d[1],O=function(e){var t;c(e),t=e,window.ethereum.request({method:"eth_getBalance",params:[t,"latest"]}).then((function(e){o(I.a.utils.formatEther(e))})).catch((function(e){b(e.message)}))};return window.ethereum?window.ethereum.request({method:"eth_requestAccounts"}).then((function(e){O(e[0])})):b("Install Metamask"),Object(h.jsxs)("div",{children:[Object(h.jsx)(p,{}),Object(h.jsxs)("div",{className:"jumbotron",children:[u,Object(h.jsx)("h1",{className:"display-4",children:"Hello!"}),Object(h.jsx)("p",{className:"lead",children:"Here are the information we found about you from MetaMask"}),Object(h.jsx)("hr",{className:"my-4"}),Object(h.jsxs)("p",{children:["Account Address ",n," ",Object(h.jsx)("br",{})," Balance ",i]})]})]})},L=n(5),C=n(37),M=n(362),N=n(66),B=n(752),E=n(748),K=n(747),F=n(361),P=n(754),_=n(751),U=n(50),G=n.n(U),R="https://api.stage.dydx.exchange";var H=function(e){var t=Object(r.useState)(!1),n=Object(l.a)(t,2),c=n[0],a=n[1],s=Object(r.useState)("BUY"),i=Object(l.a)(s,2),o=i[0],j=i[1],d=Object(r.useState)("LIMIT"),u=Object(l.a)(d,2),b=(u[0],u[1]),O=Object(r.useState)("FALSE"),x=Object(l.a)(O,2),p=x[0],f=x[1],m=Object(r.useState)(0),v=Object(l.a)(m,2),y=v[0],w=v[1],S=Object(r.useState)(0),k=Object(l.a)(S,2),T=k[0],I=k[1],A=Object(r.useState)(0),M=Object(l.a)(A,2),U=M[0],H=M[1],D=function(){var t=Object(C.a)(Object(L.a)().mark((function t(){return Object(L.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:window.ethereum&&window.ethereum.request({method:"eth_accounts"}).then((function(t){if(t.length){var n=new N.DydxClient(R,{apiTimeout:3e3,networkId:5,web3:new G.a(window.ethereum)}),r=G.a.utils.toChecksumAddress(t[0]);n.onboarding.deriveStarkKey(r,N.SigningMethod.MetaMask).then(function(){var e=Object(C.a)(Object(L.a)().mark((function e(t){var c,a;return Object(L.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!localStorage.getItem(r+"_key")){e.next=2;break}return e.abrupt("return",JSON.parse(localStorage.getItem(r+"_key")||""));case 2:return e.prev=2,e.next=5,n.onboarding.recoverDefaultApiCredentials(r,N.SigningMethod.MetaMask);case 5:return c=e.sent,e.abrupt("return",{APIKey:c,StarkKey:t});case 9:return e.prev=9,e.t0=e.catch(2),e.next=13,n.onboarding.createUser({starkKey:t.publicKey,starkKeyYCoordinate:t.publicKeyYCoordinate,country:"SG"},r,null,N.SigningMethod.MetaMask);case 13:return a=e.sent,e.abrupt("return",{APIKey:a.apiKey,StarkKey:t});case 15:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(t){return e.apply(this,arguments)}}()).then(function(){var t=Object(C.a)(Object(L.a)().mark((function t(n){var c,a;return Object(L.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return localStorage.setItem(r+"_key",JSON.stringify(n)),c=new N.DydxClient(R,{apiTimeout:3e3,networkId:5,web3:new G.a(window.ethereum),apiKeyCredentials:n.APIKey,starkPrivateKey:n.StarkKey.privateKey}),t.prev=2,t.next=5,c.private.createOrder({market:e.market,side:"BUY"===o?N.OrderSide.BUY:N.OrderSide.SELL,type:N.OrderType.LIMIT,timeInForce:N.TimeInForce.GTT,postOnly:"FALSE"!==p,size:"0.1",price:"1",limitFee:"0.015",expiration:"2023-01-30T21:30:20.200Z"},"1");case 5:a=t.sent,console.log("Got Response from create order action"),console.log(a),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(2),console.log(t.t0);case 13:case"end":return t.stop()}}),t,null,[[2,10]])})));return function(e){return t.apply(this,arguments)}}())}}));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("button",{type:"button",className:"btn btn-primary btn-sm",onClick:function(){return a(!0)},children:"Transact"}),Object(h.jsxs)(B.a,{show:c,onHide:function(){return a(!1)},children:[Object(h.jsx)(B.a.Header,{closeButton:!0,children:Object(h.jsx)(B.a.Title,{children:e.market})}),Object(h.jsxs)(B.a.Body,{children:[Object(h.jsxs)(E.a.Group,{className:"mb-3",controlId:"formBasicText",children:[Object(h.jsx)(E.a.Label,{children:"Side"}),Object(h.jsxs)(E.a.Select,{"aria-label":"Order Side",onChange:function(e){return j(e.target.value)},children:[Object(h.jsx)("option",{children:"Order Side"}),Object(h.jsx)("option",{value:"BUY",selected:!0,children:"BUY"}),Object(h.jsx)("option",{value:"SELL",children:"SELL"})]})]}),Object(h.jsxs)(E.a.Group,{className:"mb-3",controlId:"formBasicText",children:[Object(h.jsx)(E.a.Label,{children:"Type"}),Object(h.jsxs)(E.a.Select,{"aria-label":"Type",onChange:function(e){return b(e.target.value)},children:[Object(h.jsx)("option",{children:"Type"}),Object(h.jsx)("option",{value:"MARKET",children:"MARKET"}),Object(h.jsx)("option",{value:"LIMIT",selected:!0,children:"LIMIT"}),Object(h.jsx)("option",{value:"STOP_LIMIT",children:"STOP_LIMIT"}),Object(h.jsx)("option",{value:"TRAILING_STOP",children:"TRAILING_STOP"}),Object(h.jsx)("option",{value:"TAKE_PROFIT",children:"TAKE_PROFIT"})]})]}),Object(h.jsxs)(E.a.Group,{className:"mb-3",controlId:"formBasicText",children:[Object(h.jsx)(E.a.Label,{children:"Type"}),Object(h.jsxs)(E.a.Select,{"aria-label":"Post only",onChange:function(e){return f(e.target.value)},children:[Object(h.jsx)("option",{children:"Post Only"}),Object(h.jsx)("option",{value:"TRUE",children:"TRUE"}),Object(h.jsx)("option",{value:"FALSE",selected:!0,children:"FALSE"})]}),Object(h.jsx)(E.a.Text,{className:"text-muted",children:"Whether the order should be canceled if it would fill immediately on reaching the matching-engine."})]}),Object(h.jsxs)(E.a.Group,{className:"mb-3",controlId:"formBasicEmail",children:[Object(h.jsx)(E.a.Label,{children:"Amount"}),Object(h.jsxs)(K.a,{children:[Object(h.jsx)(F.a,{children:Object(h.jsxs)(P.a,{className:"mb-3",children:[Object(h.jsx)(E.a.Control,{type:"number",name:"price",step:".0001",value:T,onChange:function(e){return I(parseFloat(e.target.value))}}),Object(h.jsx)(P.a.Text,{id:"basic-addon1",children:e.market.split("-")[0]})]})}),Object(h.jsx)(F.a,{children:Object(h.jsxs)(P.a,{className:"mb-3",children:[Object(h.jsx)(E.a.Control,{type:"number",name:"price",step:".0001",value:y,onChange:function(e){return w(parseFloat(e.target.value))}}),Object(h.jsx)(P.a.Text,{id:"basic-addon1",children:e.market.split("-")[1]})]})})]})]}),Object(h.jsxs)(E.a.Group,{className:"mb-3",controlId:"formBasicEmail",children:[Object(h.jsx)(E.a.Label,{children:"Price"}),Object(h.jsxs)(P.a,{className:"mb-3",children:[Object(h.jsx)(E.a.Control,{type:"number",name:"price",step:".0001",value:U,onChange:function(e){return H(parseFloat(e.target.value))}}),Object(h.jsx)(P.a.Text,{id:"basic-addon1",children:"USD"})]}),Object(h.jsx)(E.a.Text,{className:"text-muted",children:"Worst accepted price of the base asset in USD."})]}),Object(h.jsx)(_.a,{defaultActiveKey:"0",children:Object(h.jsxs)(_.a.Item,{eventKey:"0",children:[Object(h.jsx)(_.a.Header,{children:"Advance"}),Object(h.jsx)(_.a.Body,{children:"Good Till Time will be by default set to 1 Day"})]})})]}),Object(h.jsxs)(B.a.Footer,{children:[Object(h.jsx)(g.a,{variant:"secondary",onClick:function(){return a(!1)},children:"Close"}),Object(h.jsx)(g.a,{variant:"primary",onClick:function(){return D()},children:"Save changes"})]})]})]})};var D=function(){var e=Object(r.useState)([]),t=Object(l.a)(e,2),n=t[0],c=t[1],a=function(){var e=Object(C.a)(Object(L.a)().mark((function e(){var t;return Object(L.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=new N.DydxClient("https://api.stage.dydx.exchange",{apiTimeout:3e3,starkPrivateKey:"01234abcd..."}),n.length<=0&&t.public.getMarkets().then((function(e){console.log(e);var t=[];for(var n in e.markets)t.push(e.markets[n]);c(t)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(r.useEffect)((function(){a()})),Object(h.jsxs)("div",{children:[Object(h.jsx)(p,{}),Object(h.jsx)("h4",{children:"Markets"}),n.length>0?Object(h.jsxs)(M.a,{striped:!0,bordered:!0,hover:!0,children:[Object(h.jsx)("thead",{children:Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:"Market"}),Object(h.jsx)("th",{children:"Base Asset"}),Object(h.jsx)("th",{children:"type"}),Object(h.jsx)("th",{children:"volume24H"}),Object(h.jsx)("th",{children:"Action"})]})}),Object(h.jsx)("tbody",{children:n.map((function(e){return Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{children:e.market}),Object(h.jsx)("td",{children:e.baseAsset}),Object(h.jsx)("td",{children:e.type}),Object(h.jsx)("td",{children:e.volume24H}),Object(h.jsx)("td",{children:Object(h.jsx)(H,{market:e.market})})]},e.id)}))})]}):"Loading..."]})};var Y=function(){return Object(h.jsx)("div",{children:Object(h.jsx)(i.a,{children:Object(h.jsxs)(o.c,{children:[Object(h.jsx)(o.a,{path:"/",element:Object(h.jsx)(k,{})}),Object(h.jsx)(o.a,{path:"/about-us",element:Object(h.jsx)(f,{})}),Object(h.jsx)(o.a,{path:"/profile",element:Object(h.jsx)(A,{})}),Object(h.jsx)(o.a,{path:"/blog",element:Object(h.jsx)(m,{})}),Object(h.jsx)(o.a,{path:"/trade",element:Object(h.jsx)(S,{})}),Object(h.jsx)(o.a,{path:"/trade/dydx",element:Object(h.jsx)(D,{})}),Object(h.jsx)(o.a,{path:"*",element:Object(h.jsx)(T,{})})]})})})},q=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,755)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),r(e),c(e),a(e),s(e)}))};n(739);s.a.createRoot(document.getElementById("root")).render(Object(h.jsx)(c.a.StrictMode,{children:Object(h.jsx)(Y,{})})),q()}},[[741,1,2]]]);
//# sourceMappingURL=main.8237970d.chunk.js.map