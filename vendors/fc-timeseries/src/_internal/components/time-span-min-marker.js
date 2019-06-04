import{SmartRenderer}from'../../../../fc-core/src/component-interface';import{utcMillisecond,utcSecond,utcMinute,utcHour,utcDay,utcWeek,utcMonth,utcYear}from'../../../../fc-utils/src/time-intervals/utc';import{timeMillisecond,timeSecond,timeMinute,timeHour,timeDay,timeWeek,timeMonth,timeYear}from'../../../../fc-utils/src/time-intervals';import{pluckNumber,pluck,BLANKSTRING,parseUnsafeString}from'../../../../fc-core/src/lib';import TimeConverter from'../../../../fc-utils/src/time-converter';const GUTTER_2=2,GUTTER_5=5,GUTTER_8=8,GUTTER_14=14;function isValidUnit(a){return!('year'!==a&&'quarter'!==a&&'month'!==a&&'week'!==a&&'day'!==a&&'hour'!==a&&'minute'!==a&&'second'!==a&&'millisecond'!==a)}function getInterVal(a,b){return'year'===a?b?utcYear:timeYear:'quarter'===a?b?utcMonth:timeMonth:'month'===a?b?utcMonth:timeMonth:'week'===a?b?utcWeek:timeWeek:'day'===a?b?utcDay:timeDay:'hour'===a?b?utcHour:timeHour:'minute'===a?b?utcMinute:timeMinute:'second'===a?b?utcSecond:timeSecond:'millisecond'===a?b?utcMillisecond:timeMillisecond:void 0}function isWithinMarker(a,b,c,d){let e,f,g,h,j=!1,k=d.markerDim;for(g=0,h=k.length;g<h;g++)if(b>=k[g].x&&b<=k[g].x+k[g].width&&c>=k[g].y&&c<=k[g].y+k[g].height){j=!0,a.config.previouslyHoveredIndex=d.index,e=k[g];break}return f={pointIndex:d.index,hovered:j,pointObj:{hoveredMarkerDim:e,index:j&&g,type:d.type},previouslyHoveredIndex:a.config.previouslyHoveredIndex,component:a},f}function isValidMarker(a,b,c,d){return!!(a>=c&&a<=d||b<=d&&b>=c||c>=a&&d<=b)}class TimeSpanMinMarker extends SmartRenderer{__setDefaultConfig(){super.__setDefaultConfig();let a=this.config;a.defaultStyle={text:{fill:'#808080',opacity:1,"font-size":'10px',"font-weight":'normal',"font-style":'normal',"text-anchor":'middle',"fill-opacity":1,"stroke-opacity":1},marker:{fill:'#62b58f',opacity:.2,"fill-opacity":1,"stroke-opacity":1,"border-thickness":0,"border-padding":1,"border-radius":0,"border-dash":'none',"stroke-width":1,"stroke-dasharray":'none',stroke:'none'}},a.hoveredIndex=void 0,a.previouslyHoveredIndex=void 0,a.hoveredOpacity=.5,a.valueArr=[],a.textArr=[],a.styleArr=[],a.domainArr=[],a.markerDetails=[],a.type='minimal'}getHoveredMarker(a,b){let c,d,e=this,f=e.config,g=e.getLinkedParent(),h=g.getTranslation(),j=f.markerDetails;for(a-=h.x,b-=h.y,d=j.length-1;0<=d&&(c=isWithinMarker(e,a,b,j[d]),!c.hovered);d--);return c}setHoverInEffect(a){let b=this,c=b.getFromEnv('chart');b.setData({hoveredIndex:a},!0),c.fireEvent('timeSpanMinMarkerHovered',{senderTimeMarker:b,hoveredIndex:a,hoveredFromOutside:!0})}setHoverOutEffect(){let a=this,b=a.getFromEnv('chart');a.setData({hoveredIndex:void 0},!0),b.fireEvent('timeSpanMinMarkerHovered',{senderTimeMarker:a,hoveredIndex:void 0,hoveredFromOutside:!0})}getToolTextConfiguration(a,b){let c,d=this,{header:e,body:f}=d.getFromEnv('tooltipStyle'),g=40,h=26,i=d.getFromEnv('smartLabel');return i.setStyle({"font-size":e['font-size'],"font-family":e['font-family'],"font-weight":e['font-weight']}),c=i.getOriSize(a[0]),g+=c.width,h+=c.height,a[1]?(i.setStyle({"font-size":f['font-size'],"font-family":f['font-family'],"font-weight":f['font-weight']}),c=i.getOriSize(a[1]),h+=c.height,g=Math.max(g,c.width),{header:`<div style='margin: 5px;'>${a[0]}</div>`,body:`<div style='margin: 5px;'>${a[1]}</div>`,dimensions:{width:g,height:'full'===b?0:h}}):{header:`<div style='padding: 5px;'>${a[0]}</div>`,body:'',dimensions:{width:g,height:'full'===b?0:h}}}getMarkerAndLabelConfiguration(a,b){let c,d,e,f,g,h,i,j,k,l,m=this,n=m.config,o=m.getLinkedParent().config,p=o.padding,q=p.left,r=p.right,s=p.top,t=p.bottom,u=m.config.xScale,v=u.getDomain(),w=n.valueArr[a],x=w.repeat;return c=u.getRangeValue(w.start),l=u.getRangeValue(w.end),f=w.type,e='full'===f?o.canvasTop+GUTTER_2+s:o.canvasTop+o.canvasHeight-GUTTER_2-s+t,g='full'===f?o.canvasTop-o.padding.top:o.canvasTop+o.canvasHeight-(b+4)-s+t,h='full'===f?o.canvasHeight:b+4,n.markerDetails[a].markerDim=[],n.domainArr[a]=[],n.markerDetails[a].index=a,!x&&isValidMarker(+w.start,+w.end,+v[0],+v[1])?(n.domainArr[a].push({start:w.start,end:w.end}),n.markerDetails[a].markerDim.push({x:c-q+r,y:g,width:l-c,height:h}),d=c-q+r,j=w.start,k=w.end):x&&(n.domainArr[a]=i=m.getAllValidDomains(w.start,w.end,w.repeat),i.length&&(d=u.getRangeValue(i[0].start)-q+r,j=i[0].start,k=i[0].end,i.forEach(b=>{c=u.getRangeValue(b.start),l=u.getRangeValue(b.end),n.markerDetails[a].markerDim.push({x:c-q+r,y:g,width:l-c,height:h}),0>x.multiplier&&(d=c-q+r,j=b.start,k=b.end)}))),n.markerDetails[a].type=f,{labelConfiguration:{x:d,y:e,width:l-c-4,startDomain:j,endDomain:k}}}getAllValidDomains(a,b,c){let d=this,e=d.config.xScale,f=e.getDomain(),g=[];if(+a<+f[0]&&0<c.multiplier)for(;!isValidMarker(+a,+b,+f[0],+f[1])&&+a<=+f[1];)a=c.interval.offset(a,c.multiplier),b=c.interval.offset(b,c.multiplier);for(;isValidMarker(+a,+b,+f[0],+f[1]);)g.push({start:a,end:b}),a=c.interval.offset(a,c.multiplier),b=c.interval.offset(b,c.multiplier);return g}configureAttributes(a={}){super.configureAttributes(a);let b,c,d,e,f,g,h,j,k,l,m,n,o=this,p=o.config,q=[],r=[],s=o.getFromEnv('isUTC'),t=[],u=o.getFromEnv('getStyleDef'),v=o.getFromEnv('textStyle'),w=o.getFromEnv('baseTextStyle'),x=a.timeMarker||[],y=Object.assign({},v,p.defaultStyle.text,w);for(x.sort((c,a)=>+new Date(c.start)-+new Date(a.start)),h=0,j=x.length;h<j;h++)(k=x[h],k.start&&k.start!==BLANKSTRING)&&(e=pluck(k.timeformat,a.defaultFormat),c=s?TimeConverter.utcParser(e):TimeConverter.parser(e),d=c.parse(k.start),f=c.parse(k.end),d&&f)&&(+d>+f&&([d,f]=[f,d]),b={start:d,end:f,startString:k.start,endString:k.end,timeFormat:e,type:k.type||p.type},k.repeat&&k.repeat.unit&&0!==Math.floor(+k.repeat.multiplier)&&isValidUnit(g=k.repeat.unit.toLowerCase())&&(b.repeat={interval:getInterVal(g,s),multiplier:('quarter'===g?3:1)*pluckNumber(k.repeat.multiplier,1)}),n=k.style||{},m=Object.assign({},y,{"vertical-align":'full'===b.type?'top':'bottom'},u(n.text)),l=Object.assign({},p.defaultStyle.marker,u(n.marker)),t.push(b),q.push({text:m,"text:hover":Object.assign({},m,u(n['text:hover'])),marker:l,"marker:hover":Object.assign({},l,u(n['marker:hover']))}),r.push(pluck(k.label,'')));a.xScale&&(p.xScale=a.xScale),p.hoveredIndex=a.hoveredIndex,a.timeMarker&&(p.valueArr=t,p.styleArr=q,p.textArr=r)}getAllLabelsProps(a,b){let c,d,e,f,g,h,j,k,l,m=this,n=m.config,o=m.getFromEnv('smartLabel'),p=n.valueArr,q=n.domainArr[a],r=n.markerDetails[a],s=m.getFromEnv('isUTC'),t=b.x,u=b.y,v=b.width,w=o._lineHeight,x=[],y=n.textArr[a];for(y&&(f=o.getSmartText(parseUnsafeString(y),v,w),x.push({dim:{x:t+v/2+GUTTER_2,y:u-GUTTER_2},text:parseUnsafeString(f.text)})),d=p[a].timeFormat,(k=0,l=q.length);k<l;k++)j=[],c=q[k],e=r.markerDim[k],h=s?TimeConverter.utcFormatter(d):TimeConverter.formatter(d),g=h.format(c.start)+' - '+h.format(c.end),j.push(g),y&&j.push(f.oriText),e.toolTextArr=j;return x}createGroup(){let a=this,b=a.getLinkedParent().config,c=b.padding,d=b.canvasBGLeft-c.left,e=b.canvasBGTop-c.top,f=b.canvasBGWidth,g=b.canvasBGHeight,h=[`M${d},${e}`,`L${d+f},${e}`,`L${d+f},${e+g}`,`L${d},${e+g}Z`];a.addGraphicalElement({el:'group',container:{id:'thermo',label:'group',isParent:!0},component:a,label:'timeMarker',attr:{name:'time-marker-min-group',"clip-path":h},id:'timeMarker'})}drawAllLabels(a,b){let c=this;a.forEach((a,d)=>{c.addGraphicalElement({el:'text',attr:{text:a.text,x:a.dim.x,y:a.dim.y,opacity:b.opacity},css:b,container:{label:'timeMarker'},id:'time-marker-label-'+d,component:c,label:'label'})})}draw(){let a,b,c,d,e,f,g,h,k,l,m=this,n=m.config,o=m.getFromEnv('smartLabel'),p=n.valueArr,q=n.styleArr;for(m.createGroup(),n.markerDetails=[],(e=0,l=p.length);e<l;e++)if(g=e===n.hoveredIndex,n.markerDetails[e]={},h=g?q[e]['text:hover']:q[e].text,k=g?q[e]['marker:hover']:q[e].marker,o.setStyle({"font-size":h['font-size']||q[e].text['font-size'],"font-family":h['font-family']||q[e].text['font-family'],"font-weight":h['font-weight']||q[e].text['font-weight']}),o.getOriSize(n.textArr[e]),b=m.getMarkerAndLabelConfiguration(e,n.textArr[e]?o._lineHeight:13),c=n.markerDetails[e].markerDim,d=b.labelConfiguration,c.length){for(a=m.getAllLabelsProps(e,d),f=0;f<c.length;f++)m.addGraphicalElement({el:'rect',attr:{x:c[f].x,y:c[f].y,width:c[f].width,height:c[f].height,opacity:k.opacity},container:{label:'timeMarker'},css:k,id:'time-span-marker-'+e+f,component:m,label:'line'});m.drawAllLabels(a,h)}}getType(){return'timeMarker'}getName(){return'timeSpanMinMarker'}}export default TimeSpanMinMarker;