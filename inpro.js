const apps = [
{id: 'pg', img: './svg/pg.svg', name: 'PG模拟器', url: './tea1.html', cat: 'gemes'},
{id: 'pp', img: './svg/pp.svg', name: 'PP模拟器', url: './pptest.html', cat: 'gemes'},
{id: 'hackmnq', img: './svg/pg.svg', name: 'HS模拟器', url: './hacksaw.html', cat: 'gemes'},
{id: 'mg', img: './svg/mg.svg', name: 'MG模拟器', url: './mg.html', cat: 'gemes'},
{id: 'ap', img: './svg/ap.svg', name: 'AP模拟器', url: './ap.html', cat: 'gemes'},
{id: 'bbin', img: './svg/bbin.svg', name: 'BBIN模拟器', url: './bbin.html', cat: 'gemes'},
{id: 'bymnq', img: './svg/by.svg', name: '捕鱼模拟器', url: './by.html', cat: 'gemes'},
{id: 'ps', img: './svg/ps.svg', name: 'PS模拟器', url: './ps.html', cat: 'gemes'},
{id: 'qp', img: './png/null.png', name: '棋牌模拟器', url: './zy.html', cat: 'gemes'},
{id: 'cg', img: './svg/cg.svg', name: 'cg模拟器', url: 'https://demo.cg11pro.com/index_m.php', cat: 'gemes'},
{id: 'sgmnq', img: './svg/sg.svg', name: 'SG模拟器', url: 'https://sgslot.com/', cat: 'gemes'},
{id: 'vtmnq', img: './svg/pg.svg', name: 'VT模拟器', url: './vt.html', cat: 'gemes'},
{id: 'ka', img: './png/nullb.png', name: 'KA模拟器', url: 'https://www.kaga88.com/', cat: 'gemes'},
{id: 'gr', img: './svg/gr.svg', name: 'GR模拟器', url: 'https://grdemoweb.richgaming.net/', cat: 'gemes'},
{id: 'bjl', img: './png/qt.png', name: '百家乐模拟器', url: 'https://www.ab8888.games:8888/?loginType=2&amp;trial=true&amp;language=zh_CN', cat: 'gemes'},
{id: 'tymn', img: './png/fb.png', name: '体育模拟器', url: 'https://test.f66b88sport.com/h5/index.html#/', cat: 'gemes'},
{id: 'cpmn', img: './png/cp.png', name: '彩票模拟器', url: 'https://pc.obcp.live/redirect.html', cat: 'gemes'},
{id: 'oy', img: './svg/oy.svg', name: '欧易', url: 'https://www.vmutkhamuut.com/join/40221549', cat: 'bths'},
{id: 'ba', img: './svg/ba.svg', name: '币安', url: 'https://www.maxweb.academy/referral/earn-together/refer-in-hotsummer/claim?hl=zh-CN&ref=GRO_20338_SI463&utm_source=default', cat: 'bths'},
{id: 'xnb', img: './png/npc.png', name: '虚拟币入门', url: './xnb.html', cat: 'bths'},
{id: 'ggy', img: './png/ggy.png', name: '脉动vpn(狗云)', url: 'https://maidongvpn.com/#/register?code=V5fllz2y', cat: 'tools'},
{id: 'dkd', img: './png/dkd.png', name: '杜卡迪vpn', url: 'https://www.dukadi.xyz/#/register?code=ZrNq0rDZ', cat: 'tools'},
{id: 'dm', img: './png/vpn.png', name: '大麦VPN', url: 'https://666.damai222.cc/#/register?code=JGQT6iHz', cat: 'tools'},
{id: 'jryw', img: './png/nullb.png', name: '今日要闻', url: 'https://60s.lylme.com/', cat: 'tools'},
{id: 'hwid', img: './svg/id.svg', name: '海外ID', url: 'https://id.ali-door.top/share/damai', cat: 'tools'},
{id: 'rjdq', img: './png/rjdq.png', name: '软件大全', url: 'https://52qfx.lanzouw.com/b01jdki3a', cat: 'tools'},
{id: 'dxjm', img: './svg/dxjm.svg', name: '短信接码', url: 'http://www.eomsg.com/appweb/signUp.html?inviter=1o0je3kd', cat: 'tools'},
{id: 'htyw', img: './png/nullb.png', name: '花体英文', url: 'https://1000tool.com/text/penmanship/', cat: 'tools'},
{id: 'jable', img: './svg/jable.svg', name: 'jable', url: 'https://jable.tv/', cat: 'tools'},
{id: 'you', img: './svg/you.svg', name: 'youporn', url: 'https://www.youporn.com/', cat: 'tools'},
{id: 'njav', img: './svg/njav.svg', name: 'njav', url: 'https://njav.tv/', cat: 'tools'},
{id: 'phub', img: './svg/phub.svg', name: 'pornhub', url: 'https://pornhub.com', cat: 'tools'},
{id: 'air', img: './png/air.png', name: 'air', url: 'https://tv-skyairav.cc/', cat: 'tools'}
];

const categoryContainers = {
    gemes: document.getElementById('ges'),
    bths: document.getElementById('bth'),
    tools: document.getElementById('toos')
};

function renderApps() {
    apps.forEach(app => {
        const container = categoryContainers[app.cat];
        if (!container) return;

        const li = document.createElement('li');
        li.className = 'app-item';
        li.id = app.id;

        li.innerHTML = `
            <div class="app-icon">
                <img src="${app.img}" alt="${app.name}">
            </div>
            <div class="app-name">${app.name}</div>
        `;
        li.addEventListener('click', () => {
            window.open(app.url, '_blank', 'noopener,noreferrer');
        });

        container.appendChild(li);
    });
}
renderApps();
document.getElementById("52").innerHTML="🔥PG模拟器大全";
document.getElementById("54").innerHTML="虚拟币";
document.getElementById("55").innerHTML="其他分享&VPN-打不开的网站请开VPN";
document.getElementById("56").innerHTML="如遇本站功能无法正常使用，请点击下载VPN，即可突破网络封锁正常使用";
