/////////
//页面滑动 
//封装为函数
/////////

 function Swipe(container){
        //var container = $("#content");
        //滑动对象       
        var swipe={};
        // 获取第一个子节点(获取ul=整个道路)
        var element = container.find(":first");
        // li页面数量(遍历li=有多少章)
        var slides = element.find(">");
        // 获取容器尺寸
        var width = container.width();
        var height = container.height();
        // 设置li页面总宽度
        element.css({
            width  : (slides.length * width) + 'px',
            height : height + 'px'
        });
        // 设置每一个页面li的宽度 each()遍历
        $.each(slides, function(index) {
            var slide = slides.eq(index); //获取到每一个li元素    
            //设置li样式，宽高=container的宽高
            slide.css({
                width  : width+ 'px',
                height : height + 'px'
            });
        });

         //监控完成与移动 scrollTo() 方法可把内容滚动到指定的坐标
        swipe.scrollTo=function(x,speed){
            //给ul添加滑动
            element.css({
                //transition: property duration timing-function delay
                //transition：属性名 时间 速度曲线 延长开始的时间
                'transition-timing-function':'linear',
                'transition-duration':speed+'ms',
                'transform':'translate3d(-'+x+'px,0px,0px)'
            });
            return this;
        }   
        return swipe;
    }

