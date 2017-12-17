/*
 * @Author: 万少爷宝宝 
 * @Date: 2017-10-12 10:09:39 
 * @Last Modified by: 万少爷宝宝
 * @Last Modified time: 2017-10-13 17:02:41
 */

$(function () {
  $('#fullpage').fullpage({
    // 内容不要垂直居中 
    verticalCentered: false,
    // 是否显示导航
    navigation: true,
    // 滚动到某一屏幕后触发执行
    afterLoad: function (link, index) {
      // 到了第二屏的时候 执行// 好评显示

      if (index == 2) {
        /* 
        1 空的搜索 往坐边位移
        2 沙发两个子开始显示 
        3 图片切换  沙发和空的搜索框   和 带有沙发文字的 搜索框 切换显示
        4 带有沙发文字的 搜索框 往右上角进行  位移 
        5 同时  多沙发的图片 开始变大 
        6 
         */

        //  animate:参数   1 配置对象   2 持续时间 单位毫秒 3 回调函数
        //  jq 的 animate 不支持 转换 transform 
        //  transform 一般是配合 过渡来使用的
        $(".s2_search_empty").animate({
          right: "50%",
          marginRight: "-111px"
        }, 1000, "easeOutBack", function () {
          // $(".s2_search_empty").hide();

          // 淡入 
          $(".s2_sf_font").fadeIn(1000, function () {
            $(".s2_search_empty,.s2_sf_font").hide();
            $(".s2_search_full").show().animate({
              bottom: 451,
              left: "69%",
              height: 30
            }, 1000);

            // 带有多少沙发的图片开始显示
            $(".s2_sfs").show().animate({
              width: 441
            }, 1000);

            $(".s2_title1").fadeOut(1000);
            $(".s2_title2").fadeIn(1000);

            // $(".s2_title1,.s2_title2").fadeToggle(1000);

          });
        });
      }

      if (index == 5) {
        /* 
        1 手往上显示
        1.5 鼠标切换显示
        2 沙发从上面掉下来
        3 银行卡的账单 从卡堆往上显示
        4 文字提示 旋转显示
         */

        //  1 手
        $(".s5_hand").animate({
          bottom: 0
        }, 1000, function () {
          // 1.5 鼠标切换显示
          $(".s5_mouse").hide();
          // ctrl+d
          $(".s5_mouse02").show();

          // 2 
          $(".s5_sf").animate({
            bottom: "15%"
          }, 1000, function () {
            // 3 
            $(".s5_bill").animate({
              bottom: "57%"
            }, 1000, function () {
              // 4 
              /* 
              transform 和 jq animate 不可一起搭配 没有效果
              transform  和谁搭配 过渡 

              如果 show()和过渡出现bug的时候 可以考虑 隐藏的效果 替换成 透明度的改变
               */
              $(".s5_title1").addClass("s5_title_rotate");
            })
          });
        });
      }

      if (index == 7) {
        // 星星显示 ⭐ 
        //  鲁冰花 天上的星星 参北斗
        $(".s7_star").animate({
          width: 102
        }, 2000, function () {
          // 好评显示
          $(".s7_good_comment").fadeIn(1000);
        })
      }

      if (index == 8) {
        // 绑定鼠标移动事件
        $(document.body).on("mousemove", function (e) {
          // console.log(e);
          /* 
          1 获取鼠标的位置 left top 
          2 要值 赋给  手 图片 
           */

          //   clentx 是相对于整个屏幕的 手相对于 版心的 需要减去版心距离屏幕最左边的距离

          var clientX = e.clientX;
          var clientY = e.clientY;

          var hand_top = clientY + 20;
          // 最大的top值
          var maxTop = $(".s8").height() - 449;
          if (hand_top < maxTop) {
            hand_top = maxTop;
          }
          var distance = $(".section_content").offset().left;
          $(".s8_hand").css({
            // 68 是手的图片 的最左边距离 食指的距离
            left: clientX - distance - 68,
            top: hand_top
          });

        })

        // 重来一次
        $(".s8_again").click(function () {
          // 跳回第一屏
          $.fn.fullpage.moveTo(1);
          // 要考虑的问题 是 动画如何再来一遍
          // 加上动画效果的本质 用animate-> 标签的style里面写属性 
          // 重置动画的本质 去掉 标签的style 样式 

          $(".section *").attr("style", "");
          $(".s6").css({
            backgroundPositionX: "25%"
          });
        })
      }
    },

    // 一离开就触发
    onLeave: function (index, nextIndex, direction) {
      // 方向
      // console.log(direction);
      // alert(1);
      if (index == 2 && nextIndex == 3) {
        // 离开2 进入3  
        $(".s2_wrap").show();

        $(".s3_sf").show().animate({
          bottom: "34%",
          left: "26%",
          width: 207
        }, 2000, function () {
          $(".s3_black_size,.s3_black_car").fadeOut(1000);
          $(".s3_white_size,.s3_white_car").fadeIn(1000);
        });
      }

      if (index == 3 && nextIndex == 4) {
        // 离开3 走到4 

        // 获取屏幕的高度
        var height = $(".s4").height();

        var ownBottom = parseInt($(".s4_qx_sf").css("bottom"));
        // -38px
        var bottom = ownBottom + height + 400;
        $(".s4_qx_sf").css({
          bottom: bottom,
          left: -38
        });

        //  隐藏 s3 的沙发
        $(".s3_sf").hide();
        $(".s4_qx_sf").animate({
          bottom: 176,
          left: 134
        }, 2000, function () {
          // 车和沙发一起移动 父元素移动就可以了

          // offset  相当于页面 
          var x = $(".s4_full_car").offset().left;
          var leftMargin = $(".s4").width() - x;

          $(".s4_full_car").animate({
            marginLeft: leftMargin
          }, 3000, "easeInOutElastic", function () {
            // 两张文字提示  切换显示
            $(".s4_title1").fadeOut(1000);
            $(".s4_title2").fadeIn(1000);

            $(".s4_adress").fadeIn(1000);
          });
        });
        // 
        // bottom: 176px;
        // left: 134px;
      }

      if (index == 5 && nextIndex == 6) {
        /* 
        1 第5屏隐藏 6屏的沙发显示 同时 
        2 6-沙发往下掉  盒子移动位置
        3 沙发隐藏  盒子往下掉
         */

        $(".s5_sf").hide();
        $(".s6_box").animate({
          left: "25%"
        }, 1500);
        $(".s6_sf_move").show().animate({
          width: 50,
          left: "28%",
          bottom: "70%"
        }, 2000, function () {
          // 盒子下掉  沙发隐藏
          $(".s6_sf_move").hide();
          $(".s6_box").animate({
            bottom: "4%"
          }, 1000, function () {
            //  文字提示显示
            $(".s6_title1").animate({
              left: "25%"
            }, 1000, "easeInCirc");
            //  遵义88号牌子显示
            $(".s6_zy88").show();


            // 汽车走动🚕  其实 背景图片滚动 
            $(".s6").animate({
              // 背景位置的设置 要 有X 或者Y
              backgroundPositionX: "100%"
            }, 2000, function () {
              // 男孩长大了
              $(".s6_boys").animate({
                width: 252,
                left: "23%",
                bottom: "16%"
              }, 1000, function () {
                /* 
                1 男孩往右边移动
                2 门打开
                3 女孩出来 
                4 请收货
                 */

                $(".s6_boys").animate({
                  left: "43%"
                }, 1000, function () {
                  // 门打开
                  $(".s6_door").show();

                  // 👧 女孩出来领快递
                  $(".s6_girl").show().animate({
                    width: 87,
                    right: 358
                  }, 1000, function () {
                    // 牌子显示
                    $(".s6_recive").fadeIn(1000);
                  })
                })
              })
            });

          });
        });
      }
    }


  });


  // 只绑定一次 
  $(".nextSection").click(function () {
    // 下一屏跳转
    // moveSectionDown
    $.fn.fullpage.moveSectionDown();
  })
});