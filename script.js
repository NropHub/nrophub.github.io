var imgCount = 0
var fab
var img
var currentId = 0

function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const range = max - min + 1;
    return Math.floor(Math.random() * range) + min;
}
function refresh() {
    fab.html('<div class="mdui-spinner"></div>').attr('disabled', true)
    mdui.updateSpinners()
    currentId = rand(1, imgCount)
    img.attr('src', '.img/'+currentId+'.jpg')
}

function init() {
    fab = $('.fab-refresh')
    img = $('.img')
    fab.attr('disabled', true)
    $.get('data.json', (r)=> {
        if (typeof r == 'string') r = JSON.parse(r)
        imgCount = r.count
        fab.animate({
            bottom: '+=48px'
        }, 'fast')
        setTimeout(()=> {
            mdui.snackbar({
                message: '已加载 ' + imgCount + '张图片',
                onClose: ()=> {
                    fab.animate({
                        bottom: '-=48px'
                    }, 'fast')
                }
            })
        }, 200)
        fab.html('<i class="mdui-icon material-icons">refresh</i>')
        refresh()
    })
    img[0].onload = ()=> {
        fab.html('<span>#'+currentId+'</span>').attr('disabled',
            false)
    }
    img[0].onerror = refresh
}