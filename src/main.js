const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.lastLi')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
{ logo:'A',url:'https://www.acfun.cn'},
{logo:'B',url:'https://www.bilibili.com'},
]

const simplifyUrl = (url) => {
    return url.replace('https://','')
        .replace('http://','')
        .replace('www.','')
        .replace(/\/.*/,'')
}

const render = ()=>{
    $siteList.find('li:not(.lastLi)').remove()     /*唯独不找最后一个li*/
    hashMap.forEach((node,index)=>{
        console.log(index);
        const $li = $(`<li>
                <div class="site">
                    <div class="logo">${node.logo[0]}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">×</div>
                </div>
</li>`).insertBefore($lastLi)
        $li.on('click',()=>{
            window.open(node.url)
        })
        $li.on('click','.close',(e)=>{
            e.stopPropagation()     //阻止冒泡
            hashMap.splice(index,1) //点击删除网站，删去数组中的此项索引
            render()
        })
    })
}
render()
//
$('.addSite')
    .on('click',()=>{
        let url = window.prompt('请问您想要添加的网站是什么？')
        if(url.indexOf('http') !== 0){
            url = 'https://' + url;
        }
        console.log(url)
        hashMap.push({logo: simplifyUrl(url)[0].toUpperCase(),logoType: 'text',url:url})
        // const $li = $(`<li>
        //     <a href="${url}">
        //         <div class="site">
        //             <div class="logo">${url[8]}</div>
        //             <div class="link">${url}</div>
        //         </div>
        //     </a>
        // </li>`).insertBefore($lastLi)
       render()
    })

window.onbeforeunload = () =>{
    console.log('页面要关闭了')
    const string = JSON.stringify(hashMap)
    window.localStorage.setItem('x',string)
}

$(document).on('keypress',(e)=>{       //键盘事件

    const {key}=e;      //等价于key=e.key
    const control_target = e.target.toString().split('L')[1]

    if(control_target === 'InputElement]'){
    } else {
        for(let i = 0;i < hashMap.length; i++){
            if (hashMap[i].logo === key.toUpperCase()) {
                window.open(hashMap[i].url)
            }
        }
    }
})
