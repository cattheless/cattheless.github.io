/*!
 * Lightbox v2.9.0
 * by Lokesh Dhakar
 *
 * More info:
 * http://lokeshdhakar.com/projects/lightbox2/
 *
 * Copyright 2007, 2015 Lokesh Dhakar
 * Released under the MIT license
 * https://github.com/lokesh/lightbox2/blob/master/LICENSE
 */// Uses Node, AMD or browser globals to create a module.
(function(e,t){typeof define=="function"&&define.amd?define(["jquery"],t):typeof exports=="object"?module.exports=t(require("jquery")):e.lightbox=t(e.jQuery)})(this,function(e){function t(t){this.album=[];this.currentImageIndex=void 0;this.init();this.options=e.extend({},this.constructor.defaults);this.option(t)}t.defaults={albumLabel:"Image %1 of %2",alwaysShowNavOnTouchDevices:!1,fadeDuration:600,fitImagesInViewport:!0,imageFadeDuration:600,positionFromTop:50,resizeDuration:700,showImageNumberLabel:!0,wrapAround:!1,disableScrolling:!1,sanitizeTitle:!1};t.prototype.option=function(t){e.extend(this.options,t)};t.prototype.imageCountLabel=function(e,t){return this.options.albumLabel.replace(/%1/g,e).replace(/%2/g,t)};t.prototype.init=function(){var t=this;e(document).ready(function(){t.enable();t.build()})};t.prototype.enable=function(){var t=this;e("body").on("click","a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]",function(n){t.start(e(n.currentTarget));return!1})};t.prototype.build=function(){var t=this;e('<div id="lightboxOverlay" class="lightboxOverlay"></div><div id="lightbox" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" /><div class="lb-nav"><a class="lb-prev" href="" ></a><a class="lb-next" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>').appendTo(e("body"));this.$lightbox=e("#lightbox");this.$overlay=e("#lightboxOverlay");this.$outerContainer=this.$lightbox.find(".lb-outerContainer");this.$container=this.$lightbox.find(".lb-container");this.$image=this.$lightbox.find(".lb-image");this.$nav=this.$lightbox.find(".lb-nav");this.containerPadding={top:parseInt(this.$container.css("padding-top"),10),right:parseInt(this.$container.css("padding-right"),10),bottom:parseInt(this.$container.css("padding-bottom"),10),left:parseInt(this.$container.css("padding-left"),10)};this.imageBorderWidth={top:parseInt(this.$image.css("border-top-width"),10),right:parseInt(this.$image.css("border-right-width"),10),bottom:parseInt(this.$image.css("border-bottom-width"),10),left:parseInt(this.$image.css("border-left-width"),10)};this.$overlay.hide().on("click",function(){t.end();return!1});this.$lightbox.hide().on("click",function(n){e(n.target).attr("id")==="lightbox"&&t.end();return!1});this.$outerContainer.on("click",function(n){e(n.target).attr("id")==="lightbox"&&t.end();return!1});this.$lightbox.find(".lb-prev").on("click",function(){t.currentImageIndex===0?t.changeImage(t.album.length-1):t.changeImage(t.currentImageIndex-1);return!1});this.$lightbox.find(".lb-next").on("click",function(){t.currentImageIndex===t.album.length-1?t.changeImage(0):t.changeImage(t.currentImageIndex+1);return!1});this.$nav.on("mousedown",function(e){if(e.which===3){t.$nav.css("pointer-events","none");t.$lightbox.one("contextmenu",function(){setTimeout(function(){this.$nav.css("pointer-events","auto")}.bind(t),0)})}});this.$lightbox.find(".lb-loader, .lb-close").on("click",function(){t.end();return!1})};t.prototype.start=function(t){function s(e){n.album.push({link:e.attr("href"),title:e.attr("data-title")||e.attr("title")})}var n=this,r=e(window);r.on("resize",e.proxy(this.sizeOverlay,this));e("select, object, embed").css({visibility:"hidden"});this.sizeOverlay();this.album=[];var i=0,o=t.attr("data-lightbox"),u;if(o){u=e(t.prop("tagName")+'[data-lightbox="'+o+'"]');for(var a=0;a<u.length;a=++a){s(e(u[a]));u[a]===t[0]&&(i=a)}}else if(t.attr("rel")==="lightbox")s(t);else{u=e(t.prop("tagName")+'[rel="'+t.attr("rel")+'"]');for(var f=0;f<u.length;f=++f){s(e(u[f]));u[f]===t[0]&&(i=f)}}var l=r.scrollTop()+this.options.positionFromTop,c=r.scrollLeft();this.$lightbox.css({top:l+"px",left:c+"px"}).fadeIn(this.options.fadeDuration);this.options.disableScrolling&&e("body").addClass("lb-disable-scrolling");this.changeImage(i)};t.prototype.changeImage=function(t){var n=this;this.disableKeyboardNav();var r=this.$lightbox.find(".lb-image");this.$overlay.fadeIn(this.options.fadeDuration);e(".lb-loader").fadeIn("slow");this.$lightbox.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption").hide();this.$outerContainer.addClass("animating");var i=new Image;i.onload=function(){var s,o,u,a,f,l,c;r.attr("src",n.album[t].link);s=e(i);r.width(i.width);r.height(i.height);if(n.options.fitImagesInViewport){c=e(window).width();l=e(window).height();f=c-n.containerPadding.left-n.containerPadding.right-n.imageBorderWidth.left-n.imageBorderWidth.right-20;a=l-n.containerPadding.top-n.containerPadding.bottom-n.imageBorderWidth.top-n.imageBorderWidth.bottom-120;n.options.maxWidth&&n.options.maxWidth<f&&(f=n.options.maxWidth);n.options.maxHeight&&n.options.maxHeight<f&&(a=n.options.maxHeight);if(i.width>f||i.height>a)if(i.width/f>i.height/a){u=f;o=parseInt(i.height/(i.width/u),10);r.width(u);r.height(o)}else{o=a;u=parseInt(i.width/(i.height/o),10);r.width(u);r.height(o)}}n.sizeContainer(r.width(),r.height())};i.src=this.album[t].link;this.currentImageIndex=t};t.prototype.sizeOverlay=function(){this.$overlay.width(e(document).width()).height(e(document).height())};t.prototype.sizeContainer=function(e,t){function u(){n.$lightbox.find(".lb-dataContainer").width(s);n.$lightbox.find(".lb-prevLink").height(o);n.$lightbox.find(".lb-nextLink").height(o);n.showImage()}var n=this,r=this.$outerContainer.outerWidth(),i=this.$outerContainer.outerHeight(),s=e+this.containerPadding.left+this.containerPadding.right+this.imageBorderWidth.left+this.imageBorderWidth.right,o=t+this.containerPadding.top+this.containerPadding.bottom+this.imageBorderWidth.top+this.imageBorderWidth.bottom;r!==s||i!==o?this.$outerContainer.animate({width:s,height:o},this.options.resizeDuration,"swing",function(){u()}):u()};t.prototype.showImage=function(){this.$lightbox.find(".lb-loader").stop(!0).hide();this.$lightbox.find(".lb-image").fadeIn(this.options.imageFadeDuration);this.updateNav();this.updateDetails();this.preloadNeighboringImages();this.enableKeyboardNav()};t.prototype.updateNav=function(){var e=!1;try{document.createEvent("TouchEvent");e=this.options.alwaysShowNavOnTouchDevices?!0:!1}catch(t){}this.$lightbox.find(".lb-nav").show();if(this.album.length>1)if(this.options.wrapAround){e&&this.$lightbox.find(".lb-prev, .lb-next").css("opacity","1");this.$lightbox.find(".lb-prev, .lb-next").show()}else{if(this.currentImageIndex>0){this.$lightbox.find(".lb-prev").show();e&&this.$lightbox.find(".lb-prev").css("opacity","1")}if(this.currentImageIndex<this.album.length-1){this.$lightbox.find(".lb-next").show();e&&this.$lightbox.find(".lb-next").css("opacity","1")}}};t.prototype.updateDetails=function(){var t=this;if(typeof this.album[this.currentImageIndex].title!="undefined"&&this.album[this.currentImageIndex].title!==""){var n=this.$lightbox.find(".lb-caption");this.options.sanitizeTitle?n.text(this.album[this.currentImageIndex].title):n.html(this.album[this.currentImageIndex].title);n.fadeIn("fast").find("a").on("click",function(t){e(this).attr("target")!==undefined?window.open(e(this).attr("href"),e(this).attr("target")):location.href=e(this).attr("href")})}if(this.album.length>1&&this.options.showImageNumberLabel){var r=this.imageCountLabel(this.currentImageIndex+1,this.album.length);this.$lightbox.find(".lb-number").text(r).fadeIn("fast")}else this.$lightbox.find(".lb-number").hide();this.$outerContainer.removeClass("animating");this.$lightbox.find(".lb-dataContainer").fadeIn(this.options.resizeDuration,function(){return t.sizeOverlay()})};t.prototype.preloadNeighboringImages=function(){if(this.album.length>this.currentImageIndex+1){var e=new Image;e.src=this.album[this.currentImageIndex+1].link}if(this.currentImageIndex>0){var t=new Image;t.src=this.album[this.currentImageIndex-1].link}};t.prototype.enableKeyboardNav=function(){e(document).on("keyup.keyboard",e.proxy(this.keyboardAction,this))};t.prototype.disableKeyboardNav=function(){e(document).off(".keyboard")};t.prototype.keyboardAction=function(e){var t=27,n=37,r=39,i=e.keyCode,s=String.fromCharCode(i).toLowerCase();if(i===t||s.match(/x|o|c/))this.end();else if(s==="p"||i===n)this.currentImageIndex!==0?this.changeImage(this.currentImageIndex-1):this.options.wrapAround&&this.album.length>1&&this.changeImage(this.album.length-1);else if(s==="n"||i===r)this.currentImageIndex!==this.album.length-1?this.changeImage(this.currentImageIndex+1):this.options.wrapAround&&this.album.length>1&&this.changeImage(0)};t.prototype.end=function(){this.disableKeyboardNav();e(window).off("resize",this.sizeOverlay);this.$lightbox.fadeOut(this.options.fadeDuration);this.$overlay.fadeOut(this.options.fadeDuration);e("select, object, embed").css({visibility:"visible"});this.options.disableScrolling&&e("body").removeClass("lb-disable-scrolling")};return new t});