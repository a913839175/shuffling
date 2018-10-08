;(function($, window, document, undefined) {
    var pluginName = "shuffling",
        defaults = {
           index:0,
           min:0,
           max:0,
           timer2:null,
           width:0,
           pauseOnAction:true,
           animationSpeed: 1000, //动画时间
           slideshowSpeed: 3000, //停留时间 
           autoplay:true,  
        };
    function Rili(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._name = pluginName;
        this.init();
    }
    Rili.prototype = {
        init: function() {
    		var _this= this.settings;
            var that = this;
            that.chu();
            that.BindEvent();
        },
        chu:function(){
            var _this= this.settings;
            var that = this;
            _this.max = parseInt($('.bannerimg_ul li').length - 1);
            _this.width = $('.J_trigger_line').width();
            if(_this.autoplay == false){

            }else{
                that.automatic();
            }
            if(_this.pauseOnAction == false){
                $('.left').hide();
                $('.right').hide();
            }
        },
        automatic:function(){
            var _this= this.settings;
            var that = this;
            _this.timer2 = setTimeout(function() { 
                console.log(_this.index)
                if(_this.index == _this.max){
                    _this.index = _this.min;
                }else{
                    _this.index = _this.index + 1;
                } 
               that.bannerselect();
               that.automatic();
            },_this.slideshowSpeed); 
        },
        bannerselect: function(){
            var _this= this.settings;
            var that = this;
            $(".bannerimg_ul li img").fadeOut(_this.animationSpeed);
            $(".bannerimg_ul li img").eq(_this.index).fadeIn(_this.animationSpeed);
            $('.J_trigger_line').css('left',parseInt(_this.index) * _this.width)
        },
        BindEvent:function(){
            var _this= this.settings;
            var that = this;
            $(document).on('click','.select_ul li',function(){
                var index = $(this).index();
                _this.index = index;
                that.bannerselect();
            })
            $(document).on('click','.left',function(){
                if(_this.index == _this.min){
                    _this.index = _this.max;
                }else{
                    _this.index = _this.index - 1;
                }
                that.bannerselect();
            })
            $(document).on('click','.right',function(){
                if(_this.index == _this.max){
                    _this.index = _this.min;
                }else{
                    _this.index = _this.index + 1;
                }
                that.bannerselect();
            })
            $(document).on('mouseover','.banner_wrap',function(){
                clearTimeout(_this.timer2)
            })
            $(document).on('mouseout','.banner_wrap',function(){
                that.automatic();
            })
        }
    };
    $.fn[pluginName] = function(options) {
        this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Rili(this, options));
            }
        });
        return this;
    };

})(jQuery, window, document);


