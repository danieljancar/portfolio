import{b as C,c as I,f as y,w as _}from"./chunk-7XZBS33U.js";import{$a as u,Fa as p,Ma as l,Na as s,Ta as g,Y as c,Za as f,_a as b,eb as o,fb as r,gb as d,nb as h,sb as a,ub as v,vb as x,yb as S}from"./chunk-RO2LFIGP.js";function R(t,e){if(t&1&&(o(0,"a",6),a(1),r()),t&2){let m=e.$implicit,n=h();g("href","https://www.google.com/search?q="+n.encodeURIComponent(m),p),l(1),v("#",m,"")}}function T(t,e){t&1&&(o(0,"p",7),a(1,"No recommended tags"),r())}var A=(()=>{let e=class e{constructor(n){this.blogService=n,this.encodeURIComponent=encodeURIComponent}ngOnInit(){this.recommendedTags=this.blogService.getRecommendedTags()}};e.\u0275fac=function(i){return new(i||e)(s(_))},e.\u0275cmp=c({type:e,selectors:[["app-blog-sidebar"]],standalone:!0,features:[x([],[C({bootstrapBoxArrowUpRight:y})]),S],decls:11,vars:1,consts:[[1,"lg:ml-5","lg:border-l-2","lg:border-solid","lg:border-neutral","lg:pl-4","min-h-full"],[1,"lg:hidden","divider"],[1,"pl-4","lg:pl-0"],[1,"text-2xl","font-bold"],["name","bootstrapBoxArrowUpRight",1,"text-lg"],[1,"mt-1.5","flex-wrap","flex"],["target","_blank","rel","noopener noreferrer",1,"badge","badge-accent","badge-outline","mr-2","mb-2","transition","duration-150","ease-in-out","hover:opacity-75",3,"href"],[1,"text-neutral-500"],["target","_blank","rel","noopener noreferrer","class","badge badge-accent badge-outline mr-2 mb-2 transition duration-150 ease-in-out hover:opacity-75",3,"href"]],template:function(i,w){i&1&&(o(0,"section",0),d(1,"div",1),o(2,"div",2)(3,"div")(4,"h1",3),a(5," Recommended tags "),d(6,"ng-icon",4),r(),o(7,"div",5),b(8,R,2,2,"a",8,f,!1,T,2,0),r()()()()),i&2&&(l(8),u(w.recommendedTags))},dependencies:[I]});let t=e;return t})();export{A as BlogSidebarComponent};
