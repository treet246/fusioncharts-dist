export default{"initial.dataset.candlestick":function(){return{"rect.appearing":a=>[{initialAttr:{y:a.attr.y+a.attr.height,height:0},slot:'plot'}],"group.appearing":a=>'label-group'===a.attr.name?[{initialAttr:{opacity:0},finalAttr:{opacity:1},slot:'final'}]:[{initialAttr:{opacity:1},finalAttr:{opacity:1},slot:'final'}],"*":null}},"initial.dataset.volume":function(){return{"rect.appearing":a=>[{initialAttr:{y:a.attr.y+a.attr.height,height:0},slot:'plot'}],"*":null}}};