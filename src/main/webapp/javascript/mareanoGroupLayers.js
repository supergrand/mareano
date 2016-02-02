//Global vars
var layers = [];
var generelleLayers = [];
var generelleLayerNames = {};
var OLRecord;

var hovedtemaer=[];  //Non generelle and non background
var generelle=[];
var bakgrunn=[]; 


//TODO discuss how background layers should be flagged
var backgroundGroupName ="background";
var backgroundSeaGroupName ="backgroundSea";
var backgroundPolarName = "backgroundPolar";

var hovedtema,gruppe;

/**
 * Creates layers for background layers.
 * This could be merged into generic function that createLayerRecord could use
 * to create layer part of layer record. Would need to check extra atttributes that
 * createLayerRecord adds are valid for background layers as well
*/
function createBackgroundLayerObject(layer) {
    return  {
        source: "ol",
        type: "OpenLayers.Layer.WMS",
        group: layer.gruppe,
        args: [
            layer.title,
            layer.url,
            {
                layers: layer.layers,
                format: layer.format,
                transparent: true,
                isBaseLayer: true
            },{
            metadata: {
                keyword: layer.keyword,
                'kartlagId': layer.id,
                'kartlagTitle': layer.title
            },
            singleTile:false
        }
    ]};
}


function createLayerRecord(panelGroup,isVisible,layer){
    return gxp.plugins.OLSource.prototype.createLayerRecord({
        source: "ol",
        type: "OpenLayers.Layer.WMS",
        group: panelGroup,
        queryable: layer.queryable,
        visibility: isVisible,
        properties: "mareano_wmslayerpanel",            
        args: [
        layer.title,
        layer.url,
            {layers: layer.layers, format: layer.format, transparent: true},
            {
                opacity: 1,
                metadata: {
                    keyword: layer.keyword,
                    'kartlagId': ''+layer.id,
                    'kartlagTitle': layer.title 
                },
                minScale: layer.scalemax*(96/0.0254),
                maxScale: (layer.scalemin > 0) ? layer.scalemin*(96/0.0254) : 0.001,
                units: "m",
                maxExtent: [
                    layer.exGeographicBoundingBoxWestBoundLongitude,
                    layer.exGeographicBoundingBoxSouthBoundLatitude,
                    layer.exGeographicBoundingBoxEastBoundLongitude,
                    layer.exGeographicBoundingBoxNorthBoundLatitude
                ],
                singleTile:true,
                buffer: 0, //getting no boarder around image - so panning will get a new image.
                ratio: 1 //http://dev.openlayers.org/releases/OpenLayers-2.12/doc/apidocs/files/OpenLayers/Layer/Grid-js.html#OpenLayers.Layer.Grid.ratio                                        
            }
        ]
    });
}

function addLayersToHovedTemaOrBackgroundLayer(alleHovedtemaer, projection) {
    for ( var i=0; i < alleHovedtemaer.length; i++ ) {
        hovedtema=alleHovedtemaer[i];
    
        //Split into three groups so have lists of each type of layers for later use
        //Test is a bit sloppy as it assumes each tema does not have mix of groups
        if (hovedtema.bilder[0].gruppe == backgroundGroupName ) {
           bakgrunn.push(hovedtema);
        } else if (hovedtema.bilder[0].gruppe == "generelle") {
           generelle.push(hovedtema);
        } else {
            hovedtemaer.push(hovedtema);
        }
        
        for (var j=0; j < hovedtema.bilder.length; j++) {
            gruppe=hovedtema.bilder[j];
            for (var k=0; k < gruppe.kart.length; k++) {
                layer = gruppe.kart[k];
                
                if ( (gruppe.gruppe == backgroundGroupName || gruppe.gruppe == backgroundSeaGroupName) && projection == "epsg:32633") {
                    if (app.map) { // If map does not exist at this point then GeoExplorer is loading saved map
                        app.map.layers.push(createBackgroundLayerObject(layer));
                    }
                } else if (gruppe.gruppe == backgroundPolarName && projection == "epsg:3575") {
                    if (app.map) { // If map does not exist at this point then GeoExplorer is loading saved map
                        app.map.layers.push(createBackgroundLayerObject(layer));
                    }
                } else if ( gruppe.gruppe != backgroundGroupName && gruppe.gruppe != backgroundSeaGroupName && gruppe.gruppe != backgroundPolarName ) {
                    OLRecord = createLayerRecord(gruppe.gruppe,gruppe.visible,layer);
                    if (gruppe.gruppe == "generelle") {
                        generelleLayers.push(OLRecord);
                        generelleLayerNames[layer.title]=true;
                    } else {
                        layers.push(OLRecord);
                    }
                }
            }
        }
    }
    
    var store = new GeoExt.data.LayerStore();
    store.add(layers);   
    store.add(generelleLayers);
    return store;
}