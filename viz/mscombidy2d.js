import MSDyBaseCartesian from'./msdybasecartesian';import ColumnDataset from'../_internal/datasets/column';import AreaDataset from'../_internal/datasets/area';import LineDataset from'../_internal/datasets/line';import SplineAreaDataset from'../_internal/datasets/mssplinearea';import SplineLineDataset from'../_internal/datasets/msspline';import ColumnGroup from'../_internal/datasets/groups/column.multiseries';import{HUNDREDSTRING,preDefStr}from'../_internal/lib/lib';import datasetFactory from'../_internal/factories/combi-dual-y-dataset';let UNDEF,SEVENTYSTRING=preDefStr.SEVENTYSTRING;class MSCombidy2D extends MSDyBaseCartesian{static getName(){return'MSCombidy2D'}constructor(){super(),this.isDual=!0,this.registerFactory('dataset',datasetFactory,['vCanvas'])}getName(){return'MSCombidy2D'}__setDefaultConfig(){super.__setDefaultConfig();let a=this.config;a.friendlyName='Multi-series Dual Y-Axis Combination Chart',a.sDefaultDatasetType='line',a.defaultDatasetType='column',a.enablemousetracking=!0,a.isdual=1,a.anchorborderthickness=1,a.anchorimageurl=UNDEF,a.anchorimagepadding=1,a.anchorsides=1,a.anchoralpha=UNDEF,a.anchorbgalpha=HUNDREDSTRING,a.anchorimagealpha=HUNDREDSTRING,a.anchorimagescale=100,a.anchorstartangle=90,a.anchorshadow=0,a.anchorbgcolor=UNDEF,a.anchorbordercolor=UNDEF,a.anchorradius=3,a.showvalues=1,a.plotfillalpha=SEVENTYSTRING,a.linedashlen=5,a.linedashgap=4,a.linedashed=UNDEF,a.linealpha=HUNDREDSTRING,a.linethickness=2,a.drawfullareaborder=1,a.connectnulldata=0,a.showzeroplaneontop=0}getDSdef(a){if('splinearea'===a)return SplineAreaDataset;return'spline'===a?SplineLineDataset:'area'===a?AreaDataset:'line'===a?LineDataset:ColumnDataset}getDSGroupdef(a){return'column'===a?ColumnGroup:UNDEF}getDSType(a=''){if('splinearea'===a.toLowerCase())return'splinearea';return'spline'===a.toLowerCase()?'spline':'area'===a.toLowerCase()?'area':'line'===a.toLowerCase()?'line':'column'}}export default MSCombidy2D;