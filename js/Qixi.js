        //太阳公转
        $("#sun").addClass('rotation');

        //太阳公转
        $(".cloud:first").addClass('cloud1Anim');
        $(".cloud:last").addClass('cloud2Anim');

        /////////
        //右边飞鸟 //
        /////////
        var bird={
            elem:$(".bird"),
            fly:function(){
                this.elem.addClass('birdFly')
                this.elem.transition({
                    right:container.width()
                },15000,'linear');
            }
        }; 



        //修正小女孩位置
        //girl.setPosition(); 

        ///////////
        //loge动画 //
        ///////////
        var logo = {
            elem: $('.logo'),
            run: function() {
                this.elem.addClass('logolightSpeedIn')
                    .on(animationEnd, function() {
                        $(this).addClass('logoshake').off();
                    });
            }
        };

    ///////
    //飘雪花 //
    /////// 
    var snowflakeURl = [
        'http://img.mukewang.com/55adde120001d34e00410041.png',
        'http://img.mukewang.com/55adde2a0001a91d00410041.png',
        'http://img.mukewang.com/55adde5500013b2500400041.png',
        'http://img.mukewang.com/55adde62000161c100410041.png',
        'http://img.mukewang.com/55adde7f0001433000410041.png',
        'http://img.mukewang.com/55addee7000117b500400041.png'
    ];

    function snowflake() {
        // 雪花容器
        var $flakeContainer = $('#snowflake');

        // 随机六张图
        function getImagesName() {
            return snowflakeURl[[Math.floor(Math.random() * 6)]];
        }
        // 创建一个雪花元素
        function createSnowBox() {
            var url = getImagesName();
            return $('<div class="snowbox" />').css({
                'width': 41,
                'height': 41,
                'position': 'absolute',
                'backgroundSize': 'cover',
                'zIndex': 100000,
                'top': '-41px',
                'backgroundImage': 'url(' + url + ')'
            }).addClass('snowRoll');
        }
        // 开始飘花
        setInterval(function() {
            // 运动的轨迹
            var startPositionLeft = Math.random() * visualWidth - 100,
                startOpacity    = 1,
                endPositionTop  = visualHeight - 40,
                endPositionLeft = startPositionLeft - 100 + Math.random() * 500,
                duration        = visualHeight * 10 + Math.random() * 5000;

            // 随机透明度，不小于0.5
            var randomStart = Math.random();
            randomStart = randomStart < 0.5 ? startOpacity : randomStart;

            // 创建一个雪花
            var $flake = createSnowBox();

            // 设计起点位置
            $flake.css({
                left: startPositionLeft,
                opacity : randomStart
            });

            // 加入到容器
            $flakeContainer.append($flake);

            // 开始执行动画
            $flake.transition({
                top: endPositionTop,
                left: endPositionLeft,
                opacity: 0.7
            }, duration, 'ease-out', function() {
                $(this).remove() //结束后删除
            });
            
        }, 200);
    }

    //动画结束事件
    var animationEnd=(function(){
        var explorer=navigator.userAgent;
        if(~explorer.indexOf('webkit')){
            return 'webkitAnimationEnd';
        }
        return 'animationend';
    })();

    //亮灯灭灯动画
        var lamp={
            bright:function(){
                //添加换背景图的样式
                $(".b_background").addClass('lamp-bright')
            },
            dark:function(){
                $(".b_background").removeClass('lamp-bright')
            }
        };

        var container = $("#content");
        var swipe = Swipe(container);
        visualWidth=container.width();
        visualHeight=container.height();

        //页面滚动到指定的位置
        function scrollTo(time,proportionX){
            var distX=visualWidth*proportionX;
            swipe.scrollTo(distX,time);
        }

        // 获取数据
        var getValue = function(className) {
            var $elem = $('' + className + '')
            // 走路的路线坐标
            return {
                height: $elem.height(),
                top: $elem.position().top
            };
        };     

        // 桥的Y轴
        var bridgeY = function() {
            var data = getValue('.c_background_middle');
            return data.top;
        }();

        ////////
        //小女孩 //
        ////////
        var girl = {
            elem: $('.girl'),
            getHeight: function() {
                return this.elem.height();
            },
            setOffset: function() {
                this.elem.css({
                    'left': visualWidth / 2,
                    'top': bridgeY - this.getHeight()
                });
            }
        };   

        // 修正小女孩位置
        girl.setOffset();

     function doorAction(left,right,time){
            var $door=$(".door");
            var doorLeft=$(".door-left");
            var doorRight=$(".door-right");
            var defer=$.Deferred();
            var count=2;
            //等待开门完成
            //当执行第一个回调后会减1，只有当二个回调执行的时候，这个defer.resolve才会执行
            var complete=function(){
                if(count==1){
                    defer.resolve();
                    return;
                }
                count--;
            };
            doorLeft.transition({
                'left':left
            },time,complete);

            doorRight.transition({
                'left':right
            },time,complete);

            return defer;
    }    

        //开门
        function openDoor(){
            return doorAction('-50%','100%',2000);     
        }

        //关门
        function shutDoor(){
            return doorAction('0%','50%',2000);
        }

        var instanceX;

    /**
     * 小孩走路
     * @param {[type]} container [description]
     */
     function BoyWalk(){

      var container=$("#content");
      //页面可视区域
        var visualWidth = container.width();
        var visualHeight = container.height();

       //var swipe = Swipe(container);
       /*
        $('button').click(function() {
            // 调用接口
            swipe.scrollTo($("#content").width()*2,8000);
        }); 
        */
        //获取中间路的高度和top距离
        var getValue=function(className){
            var elem=$(''+className+'');
            return{
                height:elem.height(),
                top:elem.position().top
            };
        };
        //路的Y轴 
        var pathY=function (){
            var data=getValue(".a_background_middle");
            return data.top+data.height/2;
        }();

        //获取小男孩的高度
        var $boy=$("#boy");
        var boyWidth=$boy.width();
        var boyHeight=$boy.height();
        //修正男孩的位置，路的位置减去男孩高度，25是个修正值
        $boy.css({
            top:pathY-boyHeight+25
        })

        // ==========================
        //     增加精灵动画
        // ==========================
        //
        // $('button').click(function(){
        //     //增加走路的css3关键帧规则
        //    $boy.css({
        //         'left': $("#content").width() + 'px',
        //         'transition': 'all 10s linear 0s'
        //     });
        // })

         // 开始
    	// $("button:first").click(function() {
     //    	$boy.addClass('slowWalk').stop().transition({
     //        	'left': $("#content").width() + 'px',
     //    	}, 10000).removeClass("pauseWalk");
    	// });

     //    //暂停
     //    $("button:last").click(function(){
     //    	//强制改变男孩的left，动画是要运行10秒，所以此时动画还没结束，只是暂停了
     //    	var left=$boy.css("left");
     //    	$boy.css("left",left);
     //    	$boy.addClass("pauseWalk")
     //    })

    // 暂停走路
    function pauseWalk() {
        $boy.addClass('pauseWalk');
    }

     //恢复走路
    function restoreWalk(){
        $boy.removeClass("pauseWalk");
    }

    // css3的动作变化 人物慢走
    function slowWalk(){
        $boy.addClass('showWalk');
    }

    //用transition做运动
    function startRun(options,runTime){
        //回调函数解释http://www.ruanyifeng.com/blog/2011/08/a_detailed_explanation_of_jquery_deferred_object.html
        var dfdPlay=$.Deferred();
        //恢复走路
        restoreWalk();
        //运动的属性
        $boy.transition(
            options,runTime,'linear',function(){dfdPlay.resolve();});
            return dfdPlay;       
    }

    //开始走路
    function walkRun(time,dist,disY){
        time=time||3000;
        slowWalk();
        var d1=startRun({
            'left':dist + 'px',
            'top':disY?disY:undefined
        },time);
        return d1;
    }

    //走进商店
    function walkToShop(runTime){
        var defer=$.Deferred();
        var doorObj=$('.door');
        //门的坐标
        var offsetDoor=doorObj.offset();
        var doorOffsetLeft=offsetDoor.left;
        var doorOffsetTop=offsetDoor.top;
        //小孩当前的坐标
        var posBoy=$boy.position();
        var boyPoxLeft=posBoy.left;
        var boyPoxTop=posBoy.top;

        //中间位置
        var boyMiddle=$boy.width()/2;
        var doorMiddle=doorObj.width()/2;
        var doorTopMiddle=doorObj.height()/2;

        //当前需移动的坐标
        instanceX=(doorOffsetLeft+doorObj.width()/2)-(boyPoxLeft+$boy.width()/2)
        
        //top=人物底部的top - 门中见的top值
        instanceY=boyPoxTop + boyHeight - doorOffsetTop + (doorTopMiddle);
        
        //开始走路
        var walkPlay=startRun({
            transform:'translateX('+instanceX+'px),scale(0.3,0.3)',opacity:0.1
        },2000);
        //走路完毕
        walkPlay.done(function(){
            $boy.css({
                opacity:0
            })
            defer.resolve();
        })
        return defer;
    }

    //走出商店
    function walkOutShop(runTime){
        var defer = $.Deferred();
        restoreWalk();
        //开始走路
        var walkPlay = startRun({
                transform: 'translateX(' + instanceX + 'px),scale(1,1)',
                opacity: 1
        }, runTime);
        //走路完毕
        walkPlay.done(function() {
            defer.resolve();
        });
        return defer;  
    }

    //取花
    function talkFlower(){
        //增加延时等待效果
        var defer=$.Deferred();
        setTimeout(function(){
            //取花
            $boy.addClass('slowFlowerWalk');
            defer.resolve();          
        },1000);         
        return defer;     
    }

    //计算移动距离 宽或高各除一半
    function calculateDist(direction,proportion){
        return(direction == "x" ? visualWidth:visualHeight)*proportion;
    }
   
    return{
        //开始走路
        walkTo:function(time,proportionX,proportionY){
            var distX=calculateDist('x',proportionX)
            var distY=calculateDist('y',proportionY)
            return walkRun(time,distX,distY);
        },
        // 走进商店
        toShop: function() {
            return walkToShop.apply(null, arguments);
        },
        // 走出商店
        outShop: function() {
            return walkOutShop.apply(null, arguments);
        }, 
        //停止走路
        stopWalk:function(){
            pauseWalk();
        },
        setColoer:function(value){
            $boy.css("background-color",value)
        },
        //获取男孩的宽度
        getWidth:function(){
            return $boy.width();
        },
        //复位初始状态
        resetOriginal:function(){
            this.stopWalk();
            $boy.removeClass('slowWalk slowFlolerWalk').addClass('boyOriginal');
        },
        rotate:function(callback){
            restoreWalk();
            $boy.addClass('boy-rotate');
            //监听转身完毕
            if(callback){
                $boy.on(animationEnd,function(){
                    callback();
                    $(this).off();
                })
            }
        },
        // 取花
        talkFlower: function() {
           talkFlower();
        }
    }
}

    // 音乐配置
   /* var audioConfig = {
        enable: true, // 是否开启音乐
        playURl: 'http://www.imooc.com/upload/media/happy.wav', // 正常播放地址
        cycleURL: 'http://www.imooc.com/upload/media/circulation.wav' // 正常循环播放地址
    };

    /////////////
    //背景音乐 //
    ////////////
    function Hmlt5Audio(url, isloop) {
        var audio = new Audio(url);//创建一个音频对象并传入地址
        audio.autoPlay = true;//是否自动播放
        audio.loop = isloop || false;//是否循环
        audio.play();//开始播放
        return {
            end: function(callback) {
                audio.addEventListener('ended', function() {
                    callback();
                }, false);
            }
        };
    }*/