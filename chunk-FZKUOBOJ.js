import{c as S,o as E,q as P}from"./chunk-QOWN2DIG.js";import{u as z,v as T}from"./chunk-GAOM2PKF.js";import{$a as I,Ab as x,Cb as f,Ma as n,Na as B,Ta as L,Xa as c,Y as C,Ya as g,Za as M,_a as y,ba as _,ca as b,eb as a,fb as l,gb as p,hb as k,mb as u,nb as h,sb as r,ta as v,ub as m,yb as w,zb as F}from"./chunk-RO2LFIGP.js";function j(t,e){t&1&&p(0,"app-loading-spinner")}var H=t=>["/blog",t];function N(t,e){if(t&1&&(a(0,"div",2)(1,"div",3)(2,"div",4)(3,"h2",5),r(4),l()(),a(5,"div",6)(6,"span",7)(7,"time",8),r(8),x(9,"date"),l()()(),a(10,"div",9)(11,"p",10),r(12),l()(),a(13,"div",11)(14,"span",7)(15,"time",8),r(16),x(17,"date"),l()()()(),p(18,"div",12),l(),c(19,j,1,0,"app-loading-spinner")),t&2){let s=e.$implicit,i=h();L("routerLink",F(12,H,s.slug)),n(4),m(" ",s.title," "),n(4),m(" ",f(9,6,s.created,"mediumDate")," "),n(4),m(" ",s.description," "),n(4),m(" ",f(17,9,s.created,"mediumDate")," "),n(3),g(19,i.loading?19:-1)}}function R(t,e){t&1&&p(0,"app-placeholder-message",13)}function V(t,e){if(t&1){let s=k();a(0,"button",14),u("click",function(){_(s);let o=h();return b(o.loadMoreBlogs())}),r(1," Load More "),l()}}function W(t,e){t&1&&p(0,"app-placeholder-message",15)}var Q=(()=>{let e=class e{constructor(i){this.blogService=i,this.blogs=[],this.hasMoreBlogs=!0,this.loading=!0,this.maxLoadMoreCount=0,this.startIndex=0,this.loadCount=6,this.currentFilter="latest"}ngOnInit(){this.adjustLoadCount(),this.loadBlogs()}onFilterChange(i){this.currentFilter=i,this.resetLoading()}loadBlogs(){let i=this.blogService.getFilteredBlogs(this.currentFilter,this.startIndex,this.loadCount);this.blogs=[...this.blogs,...i],this.startIndex+=this.loadCount,this.hasMoreBlogs=i.length===this.loadCount,this.loading=!1}onResize(){this.adjustLoadCount()}loadMoreBlogs(){this.maxLoadMoreCount+=1,this.loadCount=window.innerWidth>768?4:2,this.loadBlogs()}resetLoading(){this.blogs=[],this.startIndex=0,this.maxLoadMoreCount=2,this.loadBlogs()}adjustLoadCount(){this.loadCount=window.innerWidth>768?6:4}};e.\u0275fac=function(o){return new(o||e)(B(T))},e.\u0275cmp=C({type:e,selectors:[["app-blog-posts"]],hostBindings:function(o,d){o&1&&u("resize",function(D){return d.onResize(D)},!1,v)},standalone:!0,features:[w],decls:6,vars:2,consts:[[1,"mt-2","lg:mt-5"],["class","btn btn-primary mt-4"],[1,"transition","ease-in-out","duration-150","hover:cursor-pointer","hover:opacity-75",3,"routerLink"],[1,"w-full","flex","flex-col","lg:grid","lg:grid-cols-3","gap-4","pl-2.5","md:pl-3","lg:pl-5"],[1,"lg:col-span-2","break-words"],[1,"line-clamp-3","lg:line-clamp-2","text-2xl","font-bold"],[1,"hidden","lg:block","text-right","pr-5"],[1,"text-sm","lg:text-md"],[1,"text-xs","text-secondary"],[1,"lg:col-span-3","break-all"],[1,"line-clamp-2","lg:line-clamp-3","text-base","lg:text-lg"],[1,"block","lg:hidden","text-right","pr-5"],[1,"divider"],["icon","bootstrapEmojiDizzy","message","No blogs found."],[1,"btn","btn-primary","mt-4",3,"click"],["icon","bootstrapEmojiDizzy","message","No more blogs found."]],template:function(o,d){o&1&&(a(0,"section",0),y(1,N,20,14,null,null,M,!1,R,1,0),c(4,V,2,0,"button",1)(5,W,1,0),l()),o&2&&(n(1),I(d.blogs),n(3),g(4,d.maxLoadMoreCount<=8&&d.hasMoreBlogs?4:5))},dependencies:[z,P,S,E]});let t=e;return t})();export{Q as BlogPostsComponent};