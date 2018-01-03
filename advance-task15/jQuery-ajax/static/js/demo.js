
/*点击加载*/
var $ct = $('#content');
var $btn = $('#loadMore');
// var cur //当前要加载的数据的序号
var len = 6 // 每次加载多少个数据
var isLoading = false //状态锁，用于判断是否在加载数据,防止用户重复点击

$btn.on('click', function(e) {
    var cur = $('#content').children().length + 1; //要加载的首序号,两个子元素所以加1为3

    if ($(this).data('isLoading')) { //获取一个状态锁,如果正在请求数据,什么也不做
        return;
    }
    $(this).data('isLoading', true) //设置一个状态锁，当isloading 为true进行以下操作
        .html('<img src="img/loading.gif" />'); //链式调用,在btn里加入img
    $.ajax({
        url: '/loadMore',//要求为String类型的参数，（默认为当前页地址）发送请求的地址。
        dataType: 'json',//要求为String类型的参数，预期服务器返回的数据类型为json类型
        type: 'get', //要求为String类型的参数，请求方式 默认为'get'
        data: { //要求为Object或String类型的参数，发送到服务器的数据。get请求中将附加在url后
            curIndex: cur,//第一次点击cur = 3
            len: len  //len = 6
        },
        success: function(json) {
            onSuccess(json);
        },
        error: function() {
            onError();
        }
    })
})

function onSuccess(json) {
    $btn.data('isLoading', false)
        .text('加载更多');
    if (1 == json.status) {
        append(json.data);  //回调函数
    } else {
        alert('获取数据失败')
    }
}

function onError() {
    $btn.data('isLoading', false)
        .text('加载更多');
    alert('系统异常');
}


function append(arr) {
    for (var i = 0; i < arr.length; i++) {
        $ct.append('<li>' + arr[i] + '</li>')
    }
}

