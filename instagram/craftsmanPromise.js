// TODO: Switch .live() with .on(). It's not as simple as just doing a find/replace and I'm not sure why.

$(document).ready(function(){

var ajaxPromise,
    cbpHandtoolsMainCarousel,
    cbpPowertoolsMainCarousel,
    cbplawnGardenMainCarousel,
    cbpStorageGarageMainCarousel,
    cbpGearMainCarousel,
    failCallBack,
    emptyDivs,
    createCarousel,
    currentCarousel,
    currentNodes,
    carLen,
    p,
    i,
    cbpHandtoolsProductNodes,
    cbpPowertoolsProductNodes,
    cbpLawnGardenProductNodes,
    cbpStorageGarageProductNodes,
    cbpGearProductNodes,
    cbpHandtoolsBanner,
    cbpPowertoolsBanner,
    cbpLawnGardenBanner,
    cbpStorageGarageBanner,
    cbpGearBanner,
    cbpHandtoolsSecCarousel,
    cbpPowertoolsSecCarousel,
    cbpLawnGardenSecCarousel,
    cbpStorageGarageSecCarousel,
    cbpGearSecCarousel,
    topSellerHandToolsPromise;

$('div.shcCarousel .button').live('click', function(){
	return false;
});

failCallback = function ( jqXHR, textStatus, errorThrown ) {
};

createCarousel = function() {
	$('#cbpMainCarousel').shcCarousel();
};

createSecCarousel = function() {
	$('#cbpSecondaryCarousel').shcCarousel();
};

emptyDivs = function() {
	$('#cbpMainCarousel, #cbpMainBanner, #contentSet1').empty();
	$('#cbpMainCarousel').append('<ul>');
};

emptyDivsSec = function() {
	$('#cbpSecondaryCarousel').empty();
	$('#cbpSecondaryCarousel').append('<img src="/ue/home/sbpTopSellerHeading.png" alt="Top Sellers" style="padding-bottom: 5px;" /><ul></ul>');
};

ajaxPromise = $.ajax({
	url: '/ue/home/cbp.data7.json',
	dataType: 'json'
});

topSellerHandToolsPromise = $.ajax({
	url: 'http://api.developer.sears.com/v1/TopSellers',
	data : {
              store : 'Sears',
              catalogId : '12605',
              verticalName: 'Tools',
              subCategoryName: 'View All',
              categoryName: 'Hand Tools',
              filter: "Brand|Craftsman",          
              appID : 'Facebook_Registry',
              authID : 'nmktplc0A8B0014AD58170B3526C1C1D6BF4F8705192011',
              contentType: 'json',
              apikey: 'e8e781548a28fe558ef69b96ce1c6c7b',
              jsonp: false, 
              jsonpCallback: 'topSeller',
              startIndex: 1,
              endIndex: 20
          },
          dataType:  'jsonp'
});

topSellerPowerToolsPromise = $.ajax({
	url: 'http://api.developer.sears.com/v1/TopSellers',
	data : {
              store : 'Sears',
              catalogId : '12605',
              verticalName: 'Tools',
              subCategoryName: 'View All',
              categoryName: 'Cordless Handheld Power Tools',
              filter: "Brand|Craftsman",           
              appID : 'Facebook_Registry',
              authID : 'nmktplc0A8B0014AD58170B3526C1C1D6BF4F8705192011',
              contentType: 'json',
              apikey: 'e8e781548a28fe558ef69b96ce1c6c7b',
              jsonp: false, 
              jsonpCallback: 'topSeller',
              startIndex: 1,
              endIndex: 20
          },
          dataType:  'jsonp'
});

topSellerLawnGardenPromise = $.ajax({
	url: 'http://api.developer.sears.com/v1/TopSellers',
	data : {
              store : 'Sears',
              catalogId : '12605',
              verticalName: 'Lawn & Garden',
              subCategoryName: 'View All',
              //categoryName: 'Handheld Power Tools', // No longer appears to exist. Taxo change?
              categoryName: 'Chain Saws',
              filter: "Brand|Craftsman",          
              appID : 'Facebook_Registry',
              authID : 'nmktplc0A8B0014AD58170B3526C1C1D6BF4F8705192011',
              contentType: 'json',
              apikey: 'e8e781548a28fe558ef69b96ce1c6c7b',
              jsonp: false, 
              jsonpCallback: 'topSeller',
              startIndex: 1,
              endIndex: 20
          },
          dataType:  'jsonp'
});

topSellerStorageGaragePromise = $.ajax({
	url: 'http://api.developer.sears.com/v1/TopSellers',
	data : {
              store : 'Sears',
              catalogId : '12605',
              verticalName: 'Tools',
              subCategoryName: 'View All',
              categoryName: 'Garage Organization & Shelving',
              filter: "Brand|Craftsman",           
              appID : 'Facebook_Registry',
              authID : 'nmktplc0A8B0014AD58170B3526C1C1D6BF4F8705192011',
              contentType: 'json',
              apikey: 'e8e781548a28fe558ef69b96ce1c6c7b',
              jsonp: false, 
              jsonpCallback: 'topSeller',
              startIndex: 1,
              endIndex: 20
          },
          dataType:  'jsonp'
});

topSellerGearPromise = $.ajax({
	url: 'http://api.developer.sears.com/v1/TopSellers',
	data : {
              store : 'Sears',
              catalogId : '12605',
              verticalName: 'Tools',
              subCategoryName: 'View All',
              categoryName: 'Workwear & Work Boots',
              filter: "Brand|Craftsman|DieHard",           
              appID : 'Facebook_Registry',
              authID : 'nmktplc0A8B0014AD58170B3526C1C1D6BF4F8705192011',
              contentType: 'json',
              apikey: 'e8e781548a28fe558ef69b96ce1c6c7b',
              jsonp: false, 
              jsonpCallback: 'topSeller',
              startIndex: 1,
              endIndex: 20
          },
          dataType:  'jsonp'
});

// Load products for Secondary Carousel
cbpLoadProds = function (apiResp) {
  var prods = apiResp.mercadoresult.products.product[1],
      card = [],
      i,
      length;
  for (i = 0, length = prods.length; i < length; i += 1) {
    card.push('<li><div class="cbpSecSlide group"><img src="');
    card.push(prods[i].imageurl);
    card.push('?hei=183&wid=183&op_sharpen=1&res_mode=sharp"><div class="cbpSlideText"><div class="cbpPadding">');
    card.push(prods[i].name);
    card.push('</div></div><div class="cbpPrice">$');
    card.push(prods[i].displayprice);
    card.push('</div><a class="CTARed" href="/shc/s/ProductOptionsOrderItemAddCmd');
    card.push('?langId=-1&storeId=10153&catalogId=12605&URL=OrderItemDisplay&quantity_1=1&itemPartNumber=');
    card.push(prods[i].partnumber.replace('P', ''));
    card.push('">Add to Cart</a></div></li>');
    $('#cbpSecondaryCarousel ul').append(card.join(''));
  }
};

//Top Carousel
cbpHandtoolsMainCarousel = function(json) {
	currentCarousel = json.handtools.cbpMainCarousel;
	carLen = currentCarousel.length;
	for (i = 0; i < carLen; i += 1) {
		$('#cbpMainCarousel ul').append('<li><a href="'+ currentCarousel[i].imgUrl +'"><img src="'+ currentCarousel[i].imgSrc +'" alt="'+ currentCarousel[i].imgAlt +'" /></a></li>');
	}
};

cbpPowertoolsMainCarousel = function(json) {
	currentCarousel = json.powertools.cbpMainCarousel;
	carLen = currentCarousel.length;
	for (i = 0; i < carLen; i += 1) {
		$('#cbpMainCarousel ul').append('<li><a href="'+ currentCarousel[i].imgUrl +'"><img src="'+ currentCarousel[i].imgSrc +'" alt="'+ currentCarousel[i].imgAlt +'" /></a></li>');
	}
};

cbplawnGardenMainCarousel = function(json) {
	currentCarousel = json.lawnGarden.cbpMainCarousel;
	carLen = currentCarousel.length;
	for (i = 0; i < carLen; i += 1) {
		$('#cbpMainCarousel ul').append('<li><a href="'+ currentCarousel[i].imgUrl +'"><img src="'+ currentCarousel[i].imgSrc +'" alt="'+ currentCarousel[i].imgAlt +'" /></a></li>');
	}
};

cbpStorageGarageMainCarousel = function(json) {
	currentCarousel = json.storageGarage.cbpMainCarousel;
	carLen = currentCarousel.length;
	for (i = 0; i < carLen; i += 1) {
		$('#cbpMainCarousel ul').append('<li><a href="'+ currentCarousel[i].imgUrl +'"><img src="'+ currentCarousel[i].imgSrc +'" alt="'+ currentCarousel[i].imgAlt +'" /></a></li>');
	}
};

cbpGearMainCarousel = function(json) {
	currentCarousel = json.gear.cbpMainCarousel;
	carLen = currentCarousel.length;
	for (i = 0; i < carLen; i += 1) {
		$('#cbpMainCarousel ul').append('<li><a href="'+ currentCarousel[i].imgUrl +'"><img src="'+ currentCarousel[i].imgSrc +'" alt="'+ currentCarousel[i].imgAlt +'" /></a></li>');
	}
};

//Banners 
cbpHandtoolsBanner = function(json) {
	currentCarousel = json.handtools.cbpMainBanner;
		$('#cbpMainBanner').append('<a href="'+currentCarousel[0].imgUrl+'"><img src="'+currentCarousel[0].imgSrc+'" alt="'+currentCarousel[0].imgAlt+'" /></a>');
};

cbpPowertoolsBanner = function(json) {
	currentCarousel = json.powertools.cbpMainBanner;
		$('#cbpMainBanner').append('<a href="'+currentCarousel[0].imgUrl+'"><img style="float: left;" src="'+currentCarousel[0].imgSrc+'" alt="'+currentCarousel[0].imgAlt+'" /></a><a href="'+currentCarousel[1].imgUrl+'"><img style="float: left;" src="'+currentCarousel[1].imgSrc+'" alt="'+currentCarousel[1].imgAlt+'" /></a>');
};

cbpLawnGardenBanner = function(json) {
	currentCarousel = json.lawnGarden.cbpMainBanner;
		$('#cbpMainBanner').append('<a href="'+currentCarousel[0].imgUrl+'"><img src="'+currentCarousel[0].imgSrc+'" alt="'+currentCarousel[0].imgAlt+'" /></a>');
};

cbpStorageGarageBanner = function(json) {
	currentCarousel = json.storageGarage.cbpMainBanner;
		$('#cbpMainBanner').append('<a href="'+currentCarousel[0].imgUrl+'"><img src="'+currentCarousel[0].imgSrc+'" alt="'+currentCarousel[0].imgAlt+'" /></a>');
};

cbpGearBanner = function(json) {
	currentCarousel = json.gear.cbpMainBanner;
		$('#cbpMainBanner').append('<a href="'+currentCarousel[0].imgUrl+'"><img src="'+currentCarousel[0].imgSrc+'" alt="'+currentCarousel[0].imgAlt+'" /></a>');
};

//Product Nodes
cbpHandtoolsProductNodes = function(json) {
	currentNodes = json.handtools.cbpMainProducts;
	$('#contentSet1').append('<div class="col1"><div class="smNode"><a href="'+currentNodes.cbpProductsSmall[0].imgUrl+'"><div class="imgWrap"><img border="0" '+currentNodes.cbpProductsSmall[0].imgInfo+' alt="'+currentNodes.cbpProductsSmall[0].imgAlt+'" src="'+currentNodes.cbpProductsSmall[0].imgSrc+'" style="opacity: 1;"></div><div '+currentNodes.cbpProductsSmall[0].divInfo+'><span class="nodeCopy">'+currentNodes.cbpProductsSmall[0].nodeCopy+'</span></div></a><a href="'+currentNodes.cbpProductsSmall[0].btnUrl+'" '+currentNodes.cbpProductsSmall[0].btnInfo+'>'+currentNodes.cbpProductsSmall[0].btnCopy+'</a></div><div class="smNode"><a href="'+currentNodes.cbpProductsSmall[1].imgUrl+'"><div class="imgWrap"><img border="0" '+currentNodes.cbpProductsSmall[1].imgInfo+' alt="'+currentNodes.cbpProductsSmall[1].imgAlt+'" src="'+currentNodes.cbpProductsSmall[1].imgSrc+'" style="opacity: 1;"></div><div '+currentNodes.cbpProductsSmall[1].divInfo+'><span class="nodeCopy">'+currentNodes.cbpProductsSmall[1].nodeCopy+'</span></div></a><a href="'+currentNodes.cbpProductsSmall[1].btnUrl+'" '+currentNodes.cbpProductsSmall[1].btnInfo+'>'+currentNodes.cbpProductsSmall[1].btnCopy+'</a></div></div><div class="col2"><div class="lgNode"><a href="'+currentNodes.cbpProductsLarge[0].imgUrl+'"><div class="imgWrap"><img border="0" alt="'+currentNodes.cbpProductsLarge[0].imgAlt+'" src="'+currentNodes.cbpProductsLarge[0].imgSrc+'" style="opacity: 1;"></div><div '+currentNodes.cbpProductsLarge[0].divInfo+'><span class="nodeCopy">'+currentNodes.cbpProductsLarge[0].nodeCopy+'</span></div></a><a href="'+currentNodes.cbpProductsLarge[0].btnUrl+'" '+currentNodes.cbpProductsLarge[0].btnInfo+'>'+currentNodes.cbpProductsLarge[0].btnCopy+'</a></div></div><div class="col3"><div class="smNode"><a href="'+currentNodes.cbpProductsSmall[2].imgUrl+'"><div class="imgWrap"><img border="0" '+currentNodes.cbpProductsSmall[2].imgInfo+' alt="'+currentNodes.cbpProductsSmall[2].imgAlt+'" src="'+currentNodes.cbpProductsSmall[2].imgSrc+'" style="opacity: 1;"></div><div '+currentNodes.cbpProductsSmall[2].divInfo+'><span class="nodeCopy">'+currentNodes.cbpProductsSmall[2].nodeCopy+'</span></div></a><a href="'+currentNodes.cbpProductsSmall[2].btnUrl+'" '+currentNodes.cbpProductsSmall[2].btnInfo+'>'+currentNodes.cbpProductsSmall[2].btnCopy+'</a></div><div class="smNode"><a href="'+currentNodes.cbpProductsSmall[3].imgUrl+'"><div class="imgWrap"><img border="0" '+currentNodes.cbpProductsSmall[3].imgInfo+' alt="'+currentNodes.cbpProductsSmall[3].imgAlt+'" src="'+currentNodes.cbpProductsSmall[3].imgSrc+'" style="opacity: 1;"></div><div '+currentNodes.cbpProductsSmall[3].divInfo+'><span class="nodeCopy">'+currentNodes.cbpProductsSmall[3].nodeCopy+'</span></div></a><a href="'+currentNodes.cbpProductsSmall[3].btnUrl+'" '+currentNodes.cbpProductsSmall[3].btnInfo+'>'+currentNodes.cbpProductsSmall[3].btnCopy+'</a></div></div></div><div class="col4"><div class="lgNode"><a href="'+currentNodes.cbpProductsLarge[1].imgUrl+'"><div class="imgWrap"><img border="0" alt="'+currentNodes.cbpProductsLarge[1].imgAlt+'" src="'+currentNodes.cbpProductsLarge[1].imgSrc+'" style="opacity: 1;"></div><div '+currentNodes.cbpProductsLarge[1].divInfo+'><span class="nodeCopy">'+currentNodes.cbpProductsLarge[1].nodeCopy+'</span></div></a><a href="'+currentNodes.cbpProductsLarge[1].btnUrl+'" '+currentNodes.cbpProductsLarge[1].btnInfo+'>'+currentNodes.cbpProductsLarge[1].btnCopy+'</a></div></div>');
};

cbpPowertoolsProductNodes = function(json) {
	currentNodes = json.powertools.cbpMainProducts;
	$('#contentSet1').append('<div class="col1"><div class="smNode"><a href="'+currentNodes.cbpProductsSmall[0].imgUrl+'"><div class="imgWrap"><img border="0" '+currentNodes.cbpProductsSmall[0].imgInfo+' alt="'+currentNodes.cbpProductsSmall[0].imgAlt+'" src="'+currentNodes.cbpProductsSmall[0].imgSrc+'" style="opacity: 1;"></div><div '+currentNodes.cbpProductsSmall[0].divInfo+'><span class="nodeCopy">'+currentNodes.cbpProductsSmall[0].nodeCopy+'</span></div></a><a href="'+currentNodes.cbpProductsSmall[0].btnUrl+'" '+currentNodes.cbpProductsSmall[0].btnInfo+'>'+currentNodes.cbpProductsSmall[0].btnCopy+'</a></div><div class="smNode"><a href="'+currentNodes.cbpProductsSmall[1].imgUrl+'"><div class="imgWrap"><img border="0" '+currentNodes.cbpProductsSmall[1].imgInfo+' alt="'+currentNodes.cbpProductsSmall[1].imgAlt+'" src="'+currentNodes.cbpProductsSmall[1].imgSrc+'" style="opacity: 1;"></div><div '+currentNodes.cbpProductsSmall[1].divInfo+'><span class="nodeCopy">'+currentNodes.cbpProductsSmall[1].nodeCopy+'</span></div></a><a href="'+currentNodes.cbpProductsSmall[1].btnUrl+'" '+currentNodes.cbpProductsSmall[1].btnInfo+'>'+currentNodes.cbpProductsSmall[1].btnCopy+'</a></div></div><div class="col2"><div class="lgNode"><a href="'+currentNodes.cbpProductsLarge[0].imgUrl+'"><div class="imgWrap"><img border="0" alt="'+currentNodes.cbpProductsLarge[0].imgAlt+'" src="'+currentNodes.cbpProductsLarge[0].imgSrc+'" style="opacity: 1;"></div><div '+currentNodes.cbpProductsLarge[0].divInfo+'><span class="nodeCopy">'+currentNodes.cbpProductsLarge[0].nodeCopy+'</span></div></a><a href="'+currentNodes.cbpProductsLarge[0].btnUrl+'" '+currentNodes.cbpProductsLarge[0].btnInfo+'>'+currentNodes.cbpProductsLarge[0].btnCopy+'</a></div></div><div class="col3"><div class="smNode"><a href="'+currentNodes.cbpProductsSmall[2].imgUrl+'"><div class="imgWrap"><img border="0" '+currentNodes.cbpProductsSmall[2].imgInfo+' alt="'+currentNodes.cbpProductsSmall[2].imgAlt+'" src="'+currentNodes.cbpProductsSmall[2].imgSrc+'" style="opacity: 1;"></div><div '+currentNodes.cbpProductsSmall[2].divInfo+'><span class="nodeCopy">'+currentNodes.cbpProductsSmall[2].nodeCopy+'</span></div></a><a href="'+currentNodes.cbpProductsSmall[2].btnUrl+'" '+currentNodes.cbpProductsSmall[2].btnInfo+'>'+currentNodes.cbpProductsSmall[2].btnCopy+'</a></div><div class="smNode"><a href="'+currentNodes.cbpProductsSmall[3].imgUrl+'"><div class="imgWrap"><img border="0" '+currentNodes.cbpProductsSmall[3].imgInfo+' alt="'+currentNodes.cbpProductsSmall[3].imgAlt+'" src="'+currentNodes.cbpProductsSmall[3].imgSrc+'" style="opacity: 1;"></div><div '+currentNodes.cbpProductsSmall[3].divInfo+'><span class="nodeCopy">'+currentNodes.cbpProductsSmall[3].nodeCopy+'</span></div></a><a href="'+currentNodes.cbpProductsSmall[3].btnUrl+'" '+currentNodes.cbpProductsSmall[3].btnInfo+'>'+currentNodes.cbpProductsSmall[3].btnCopy+'</a></div></div></div><div class="col4"><div class="lgNode"><a href="'+currentNodes.cbpProductsLarge[1].imgUrl+'"><div class="imgWrap"><img border="0" alt="'+currentNodes.cbpProductsLarge[1].imgAlt+'" src="'+currentNodes.cbpProductsLarge[1].imgSrc+'" style="opacity: 1;"></div><div '+currentNodes.cbpProductsLarge[1].divInfo+'><span class="nodeCopy">'+currentNodes.cbpProductsLarge[1].nodeCopy+'</span></div></a><a href="'+currentNodes.cbpProductsLarge[1].btnUrl+'" '+currentNodes.cbpProductsLarge[1].btnInfo+'>'+currentNodes.cbpProductsLarge[1].btnCopy+'</a></div></div>');
};

cbpLawnGardenProductNodes = function(json) {
	currentNodes = json.lawnGarden.cbpMainProducts;
	$('#contentSet1').append('<div class="col1"><div class="smNode"><a href="'+currentNodes.cbpProductsSmall[0].imgUrl+'"><div class="imgWrap"><img border="0" '+currentNodes.cbpProductsSmall[0].imgInfo+' alt="'+currentNodes.cbpProductsSmall[0].imgAlt+'" src="'+currentNodes.cbpProductsSmall[0].imgSrc+'" style="opacity: 1;"></div><div '+currentNodes.cbpProductsSmall[0].divInfo+'><span class="nodeCopy">'+currentNodes.cbpProductsSmall[0].nodeCopy+'</span></div></a><a href="'+currentNodes.cbpProductsSmall[0].btnUrl+'" '+currentNodes.cbpProductsSmall[0].btnInfo+'>'+currentNodes.cbpProductsSmall[0].btnCopy+'</a></div><div class="smNode"><a href="'+currentNodes.cbpProductsSmall[1].imgUrl+'"><div class="imgWrap"><img border="0" '+currentNodes.cbpProductsSmall[1].imgInfo+' alt="'+currentNodes.cbpProductsSmall[1].imgAlt+'" src="'+currentNodes.cbpProductsSmall[1].imgSrc+'" style="opacity: 1;"></div><div '+currentNodes.cbpProductsSmall[1].divInfo+'><span class="nodeCopy">'+currentNodes.cbpProductsSmall[1].nodeCopy+'</span></div></a><a href="'+currentNodes.cbpProductsSmall[1].btnUrl+'" '+currentNodes.cbpProductsSmall[1].btnInfo+'>'+currentNodes.cbpProductsSmall[1].btnCopy+'</a></div></div><div class="col2"><div class="lgNode"><a href="'+currentNodes.cbpProductsLarge[0].imgUrl+'"><div class="imgWrap"><img border="0" alt="'+currentNodes.cbpProductsLarge[0].imgAlt+'" src="'+currentNodes.cbpProductsLarge[0].imgSrc+'" style="opacity: 1;"></div><div '+currentNodes.cbpProductsLarge[0].divInfo+'><span class="nodeCopy">'+currentNodes.cbpProductsLarge[0].nodeCopy+'</span></div></a><a href="'+currentNodes.cbpProductsLarge[0].btnUrl+'" '+currentNodes.cbpProductsLarge[0].btnInfo+'>'+currentNodes.cbpProductsLarge[0].btnCopy+'</a></div></div><div class="col3"><div class="smNode"><a href="'+currentNodes.cbpProductsSmall[2].imgUrl+'"><div class="imgWrap"><img border="0" '+currentNodes.cbpProductsSmall[2].imgInfo+' alt="'+currentNodes.cbpProductsSmall[2].imgAlt+'" src="'+currentNodes.cbpProductsSmall[2].imgSrc+'" style="opacity: 1;"></div><div '+currentNodes.cbpProductsSmall[2].divInfo+'><span class="nodeCopy">'+currentNodes.cbpProductsSmall[2].nodeCopy+'</span></div></a><a href="'+currentNodes.cbpProductsSmall[2].btnUrl+'" '+currentNodes.cbpProductsSmall[2].btnInfo+'>'+currentNodes.cbpProductsSmall[2].btnCopy+'</a></div><div class="smNode"><a href="'+currentNodes.cbpProductsSmall[3].imgUrl+'"><div class="imgWrap"><img border="0" '+currentNodes.cbpProductsSmall[3].imgInfo+' alt="'+currentNodes.cbpProductsSmall[3].imgAlt+'" src="'+currentNodes.cbpProductsSmall[3].imgSrc+'" style="opacity: 1;"></div><div '+currentNodes.cbpProductsSmall[3].divInfo+'><span class="nodeCopy">'+currentNodes.cbpProductsSmall[3].nodeCopy+'</span></div></a><a href="'+currentNodes.cbpProductsSmall[3].btnUrl+'" '+currentNodes.cbpProductsSmall[3].btnInfo+'>'+currentNodes.cbpProductsSmall[3].btnCopy+'</a></div></div></div><div class="col4"><div class="lgNode"><a href="'+currentNodes.cbpProductsLarge[1].imgUrl+'"><div class="imgWrap"><img border="0" alt="'+currentNodes.cbpProductsLarge[1].imgAlt+'" src="'+currentNodes.cbpProductsLarge[1].imgSrc+'" style="opacity: 1;"></div><div '+currentNodes.cbpProductsLarge[1].divInfo+'><span class="nodeCopy">'+currentNodes.cbpProductsLarge[1].nodeCopy+'</span></div></a><a href="'+currentNodes.cbpProductsLarge[1].btnUrl+'" '+currentNodes.cbpProductsLarge[1].btnInfo+'>'+currentNodes.cbpProductsLarge[1].btnCopy+'</a></div></div>');
};

cbpStorageGarageProductNodes = function(json) {
	currentNodes = json.storageGarage.cbpMainProducts;
	$('#contentSet1').append('<div class="col1"><div class="smNode"><a href="'+currentNodes.cbpProductsSmall[0].imgUrl+'"><div class="imgWrap"><img border="0" '+currentNodes.cbpProductsSmall[0].imgInfo+' alt="'+currentNodes.cbpProductsSmall[0].imgAlt+'" src="'+currentNodes.cbpProductsSmall[0].imgSrc+'" style="opacity: 1;"></div><div '+currentNodes.cbpProductsSmall[0].divInfo+'><span class="nodeCopy">'+currentNodes.cbpProductsSmall[0].nodeCopy+'</span></div></a><a href="'+currentNodes.cbpProductsSmall[0].btnUrl+'" '+currentNodes.cbpProductsSmall[0].btnInfo+'>'+currentNodes.cbpProductsSmall[0].btnCopy+'</a></div><div class="smNode"><a href="'+currentNodes.cbpProductsSmall[1].imgUrl+'"><div class="imgWrap"><img border="0" '+currentNodes.cbpProductsSmall[1].imgInfo+' alt="'+currentNodes.cbpProductsSmall[1].imgAlt+'" src="'+currentNodes.cbpProductsSmall[1].imgSrc+'" style="opacity: 1;"></div><div '+currentNodes.cbpProductsSmall[1].divInfo+'><span class="nodeCopy">'+currentNodes.cbpProductsSmall[1].nodeCopy+'</span></div></a><a href="'+currentNodes.cbpProductsSmall[1].btnUrl+'" '+currentNodes.cbpProductsSmall[1].btnInfo+'>'+currentNodes.cbpProductsSmall[1].btnCopy+'</a></div></div><div class="col2"><div class="lgNode"><a href="'+currentNodes.cbpProductsLarge[0].imgUrl+'"><div class="imgWrap"><img border="0" alt="'+currentNodes.cbpProductsLarge[0].imgAlt+'" src="'+currentNodes.cbpProductsLarge[0].imgSrc+'" style="opacity: 1;"></div><div '+currentNodes.cbpProductsLarge[0].divInfo+'><span class="nodeCopy">'+currentNodes.cbpProductsLarge[0].nodeCopy+'</span></div></a><a href="'+currentNodes.cbpProductsLarge[0].btnUrl+'" '+currentNodes.cbpProductsLarge[0].btnInfo+'>'+currentNodes.cbpProductsLarge[0].btnCopy+'</a></div></div><div class="col3"><div class="smNode"><a href="'+currentNodes.cbpProductsSmall[2].imgUrl+'"><div class="imgWrap"><img border="0" '+currentNodes.cbpProductsSmall[2].imgInfo+' alt="'+currentNodes.cbpProductsSmall[2].imgAlt+'" src="'+currentNodes.cbpProductsSmall[2].imgSrc+'" style="opacity: 1;"></div><div '+currentNodes.cbpProductsSmall[2].divInfo+'><span class="nodeCopy">'+currentNodes.cbpProductsSmall[2].nodeCopy+'</span></div></a><a href="'+currentNodes.cbpProductsSmall[2].btnUrl+'" '+currentNodes.cbpProductsSmall[2].btnInfo+'>'+currentNodes.cbpProductsSmall[2].btnCopy+'</a></div><div class="smNode"><a href="'+currentNodes.cbpProductsSmall[3].imgUrl+'"><div class="imgWrap"><img border="0" '+currentNodes.cbpProductsSmall[3].imgInfo+' alt="'+currentNodes.cbpProductsSmall[3].imgAlt+'" src="'+currentNodes.cbpProductsSmall[3].imgSrc+'" style="opacity: 1;"></div><div '+currentNodes.cbpProductsSmall[3].divInfo+'><span class="nodeCopy">'+currentNodes.cbpProductsSmall[3].nodeCopy+'</span></div></a><a href="'+currentNodes.cbpProductsSmall[3].btnUrl+'" '+currentNodes.cbpProductsSmall[3].btnInfo+'>'+currentNodes.cbpProductsSmall[3].btnCopy+'</a></div></div></div><div class="col4"><div class="lgNode"><a href="'+currentNodes.cbpProductsLarge[1].imgUrl+'"><div class="imgWrap"><img border="0" alt="'+currentNodes.cbpProductsLarge[1].imgAlt+'" src="'+currentNodes.cbpProductsLarge[1].imgSrc+'" style="opacity: 1;"></div><div '+currentNodes.cbpProductsLarge[1].divInfo+'><span class="nodeCopy">'+currentNodes.cbpProductsLarge[1].nodeCopy+'</span></div></a><a href="'+currentNodes.cbpProductsLarge[1].btnUrl+'" '+currentNodes.cbpProductsLarge[1].btnInfo+'>'+currentNodes.cbpProductsLarge[1].btnCopy+'</a></div></div>');
};

cbpGearProductNodes = function(json) {
	currentNodes = json.gear.cbpMainProducts;
	$('#contentSet1').append('<div class="col1"><div class="smNode"><a href="'+currentNodes.cbpProductsSmall[0].imgUrl+'"><div class="imgWrap"><img border="0" '+currentNodes.cbpProductsSmall[0].imgInfo+' alt="'+currentNodes.cbpProductsSmall[0].imgAlt+'" src="'+currentNodes.cbpProductsSmall[0].imgSrc+'" style="opacity: 1;"></div><div '+currentNodes.cbpProductsSmall[0].divInfo+'><span class="nodeCopy">'+currentNodes.cbpProductsSmall[0].nodeCopy+'</span></div></a><a href="'+currentNodes.cbpProductsSmall[0].btnUrl+'" '+currentNodes.cbpProductsSmall[0].btnInfo+'>'+currentNodes.cbpProductsSmall[0].btnCopy+'</a></div><div class="smNode"><a href="'+currentNodes.cbpProductsSmall[1].imgUrl+'"><div class="imgWrap"><img border="0" '+currentNodes.cbpProductsSmall[1].imgInfo+' alt="'+currentNodes.cbpProductsSmall[1].imgAlt+'" src="'+currentNodes.cbpProductsSmall[1].imgSrc+'" style="opacity: 1;"></div><div '+currentNodes.cbpProductsSmall[1].divInfo+'><span class="nodeCopy">'+currentNodes.cbpProductsSmall[1].nodeCopy+'</span></div></a><a href="'+currentNodes.cbpProductsSmall[1].btnUrl+'" '+currentNodes.cbpProductsSmall[1].btnInfo+'>'+currentNodes.cbpProductsSmall[1].btnCopy+'</a></div></div><div class="col2"><div class="lgNode"><a href="'+currentNodes.cbpProductsLarge[0].imgUrl+'"><div class="imgWrap"><img border="0" alt="'+currentNodes.cbpProductsLarge[0].imgAlt+'" src="'+currentNodes.cbpProductsLarge[0].imgSrc+'" style="opacity: 1;"></div><div '+currentNodes.cbpProductsLarge[0].divInfo+'><span class="nodeCopy">'+currentNodes.cbpProductsLarge[0].nodeCopy+'</span></div></a><a href="'+currentNodes.cbpProductsLarge[0].btnUrl+'" '+currentNodes.cbpProductsLarge[0].btnInfo+'>'+currentNodes.cbpProductsLarge[0].btnCopy+'</a></div></div><div class="col3"><div class="smNode"><a href="'+currentNodes.cbpProductsSmall[2].imgUrl+'"><div class="imgWrap"><img border="0" '+currentNodes.cbpProductsSmall[2].imgInfo+' alt="'+currentNodes.cbpProductsSmall[2].imgAlt+'" src="'+currentNodes.cbpProductsSmall[2].imgSrc+'" style="opacity: 1;"></div><div '+currentNodes.cbpProductsSmall[2].divInfo+'><span class="nodeCopy">'+currentNodes.cbpProductsSmall[2].nodeCopy+'</span></div></a><a href="'+currentNodes.cbpProductsSmall[2].btnUrl+'" '+currentNodes.cbpProductsSmall[2].btnInfo+'>'+currentNodes.cbpProductsSmall[2].btnCopy+'</a></div><div class="smNode"><a href="'+currentNodes.cbpProductsSmall[3].imgUrl+'"><div class="imgWrap"><img border="0" '+currentNodes.cbpProductsSmall[3].imgInfo+' alt="'+currentNodes.cbpProductsSmall[3].imgAlt+'" src="'+currentNodes.cbpProductsSmall[3].imgSrc+'" style="opacity: 1;"></div><div '+currentNodes.cbpProductsSmall[3].divInfo+'><span class="nodeCopy">'+currentNodes.cbpProductsSmall[3].nodeCopy+'</span></div></a><a href="'+currentNodes.cbpProductsSmall[3].btnUrl+'" '+currentNodes.cbpProductsSmall[3].btnInfo+'>'+currentNodes.cbpProductsSmall[3].btnCopy+'</a></div></div></div><div class="col4"><div class="lgNode"><a href="'+currentNodes.cbpProductsLarge[1].imgUrl+'"><div class="imgWrap"><img border="0" alt="'+currentNodes.cbpProductsLarge[1].imgAlt+'" src="'+currentNodes.cbpProductsLarge[1].imgSrc+'" style="opacity: 1;"></div><div '+currentNodes.cbpProductsLarge[1].divInfo+'><span class="nodeCopy">'+currentNodes.cbpProductsLarge[1].nodeCopy+'</span></div></a><a href="'+currentNodes.cbpProductsLarge[1].btnUrl+'" '+currentNodes.cbpProductsLarge[1].btnInfo+'>'+currentNodes.cbpProductsLarge[1].btnCopy+'</a></div></div>');
};

//Load page
ajaxPromise.done(emptyDivs, cbpHandtoolsMainCarousel, cbpHandtoolsProductNodes, cbpHandtoolsBanner, createCarousel).fail(failCallBack);
topSellerHandToolsPromise.done(emptyDivsSec, cbpLoadProds, createSecCarousel).fail(failCallBack);

//Top Navigation
$('#handTools_button').live('click', function(){	
	$('#cbpContainer').removeClass();
	$('#cbpContainer').addClass('cbpHandtools');
	ajaxPromise.done(emptyDivs, cbpHandtoolsMainCarousel, cbpHandtoolsProductNodes, cbpHandtoolsBanner, createCarousel);
	topSellerHandToolsPromise.done(emptyDivsSec, cbpLoadProds, createSecCarousel).fail(failCallBack);
	return false;
});

$('#powerTools_button').live('click', function(){	
	$('#cbpContainer').removeClass();
	$('#cbpContainer').addClass('cbpPowertools');
	ajaxPromise.done(emptyDivs, cbpPowertoolsMainCarousel, cbpPowertoolsProductNodes, cbpPowertoolsBanner, createCarousel);
	topSellerPowerToolsPromise.done(emptyDivsSec, cbpLoadProds, createSecCarousel).fail(failCallBack);
	return false;
});

$('#lawnandGarden_button').live('click', function(){	
	$('#cbpContainer').removeClass();
	$('#cbpContainer').addClass('cbpLawnGarden');
	ajaxPromise.done(emptyDivs, cbplawnGardenMainCarousel, cbpLawnGardenProductNodes, cbpLawnGardenBanner, createCarousel);
	topSellerLawnGardenPromise.done(emptyDivsSec, cbpLoadProds, createSecCarousel).fail(failCallBack);
	return false;
});

$('#storageandGarage_button').live('click', function(){	
	$('#cbpContainer').removeClass();
	$('#cbpContainer').addClass('cbpStorageGarage');
	ajaxPromise.done(emptyDivs, cbpStorageGarageMainCarousel, cbpStorageGarageProductNodes, cbpStorageGarageBanner, createCarousel);
	topSellerStorageGaragePromise.done(emptyDivsSec, cbpLoadProds, createSecCarousel).fail(failCallBack);
	return false;
});

$('#cratfsGears_button').live('click', function(){	
	$('#cbpContainer').removeClass();
	$('#cbpContainer').addClass('cbpGear');
	ajaxPromise.done(emptyDivs, cbpGearMainCarousel, cbpGearProductNodes, cbpGearBanner, createCarousel);
	topSellerGearPromise.done(emptyDivsSec, cbpLoadProds, createSecCarousel).fail(failCallBack);
	return false;
});

//rollover triggers
$('.lgNode img').live('mouseenter', function(){	
	$(this).stop().animate({opacity: '0.8'}, 500);
});
$('.lgNode img').live('mouseleave', function(){	
	$(this).stop().animate({opacity: '1'}, 200);
});

$('.smNode').live('mouseenter', function(){	
	$('img', this).stop().animate({opacity: '0.8'}, 500);
	$('.textContainer', this).stop().animate({height: '65px'}, 500);
});
$('.smNode').live('mouseleave', function(){	
	$('img', this).stop().animate({opacity: '1'}, 500);
	$('.textContainer', this).stop().animate({height: '0px'}, 200);
});
	
//end	
});