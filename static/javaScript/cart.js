$(function () {
    $(".spinner-div").inputCounter({
        settings: {

            // check the valus is within the min and max values
            checkValue: true,

        }
    });

    let isSave;
    //页面关闭时调用
    $(window).on('unload', function () {
        if(!isSave)
            storeChange();
    });

    //页面刷新时调用
    $(window).on('beforeunload', function (event) {
        storeChange();
        isSave = true;
    });

    //购物车全选
    $("#btn_check_all").off('click').on('click', function () {
        let isCheck = false;
        for (let i = 0; i < $("input[type='checkbox']").length; i++) {
            if (!$("input[type='checkbox']").eq(i).is(':checked')) {
                isCheck = true;
                break;
            }
        }
        for (let i = 0; i < $("input[type='checkbox']").length; i++) {
            $("input[type='checkbox']").eq(i).prop('checked', isCheck);
        }
    });

    //监听数值框变化 价格变化
    $('input.input_quantity').on('input propertychange',function () {
        let price = $(this).data('price');
        let quantity = $(this).val();
        $(this).parents('td:first').next().find('input:first').val(parseFloat(price*quantity).toFixed(1));
    })

    //点击购买按钮
    $('#btn_buy').on('click',function () {
        let item_list = new Array();
        for (let i = 0,input = $("input[type='checkbox']"); i < input.length; i++) {
            if (input.eq(i).is(':checked'))
                item_list.push(input.eq(i).parents('tr:first').data('item_id'));
        }
        let recipient_id = $('#sel_address').val();
        $.ajax({
            type:'POST',
            url:'/create_order',
            contentType:'application/json',
            data:JSON.stringify({item_list:item_list,recipient_id:recipient_id}),
            success:function (url) {
                window.location.href=url;
            }
        })
    });
});


//保存购物车
function storeChange() {


    let items = {};
    for (let i = 0,input=$("input.input_quantity"); i < input.length; i++) {
        let item_id = input.eq(i).data('item_id');
        let quantity = input.eq(i).val();
        items[item_id] = quantity;
    }

    $.ajax({
        type: "POST",
        contentType:"application/json",
        data: JSON.stringify(items),
        url: '/save_cart'
    });
}