
$(function () {
    //动态生成的标签没有回调函数，用原来的父标签来获取点击事件
    $("div.main-div").on("click", ".aj a", function () {
        let url = $(this).data('href');
        $("div.main").load(url);
        $('html ,body').animate({scrollTop: 0}, 300);
    });

});