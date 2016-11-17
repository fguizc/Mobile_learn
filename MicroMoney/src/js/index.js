$(function(){



  //新闻图标hover改变当前标题显示
  let primaryTit = $('.active_news_icon').attr('data-name');
  $('.news_icon>i').hover(function(){
    $('.news_title>h4').html($(this).attr('data-name'));
  },function(){
    $('.news_title>h4').html(primaryTit);
  })


  $('.news_icon>i').click(function(){
    const currIndex = $(this).index();
    $(this).addClass('active_news_icon').siblings().removeClass('active_news_icon');
    primaryTit = $('.active_news_icon').attr('data-name');
    $('.news_content>ul').eq(currIndex).show().siblings().hide();
  })




  //back to top
  $('.m_backTop').click(function(){
    $('body').animate({'scrollTop':0}, 300, function(){
      console.log('回到顶部完成!');    })
  })


})
