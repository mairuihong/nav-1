const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: "B", url: "https://www.bilibili.com/" },
  { logo: "C", url: "https://csstriggers.com/" },
  { logo: "D", url: "https://developer.mozilla.org/zh-CN/" },
  { logo: "I", url: "http://www.iciba.com/" },
  { logo: "I", url: "https://www.iconfont.cn/" },
  { logo: "J", url: "http://js.jirengu.com/?html,output" },
  { logo: "X", url: "https://xiedaimala.com/" },
  { logo: "P", url: "https://pixso.design/" },
];

const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
      <div class="site">
          <div class="logo">${node.logo}</div>
          <div class="link">${simplifyUrl(node.url)}</div>
          <div class="close">
            <svg class="icon">
               <use xlink:href="#icon-baseline-close-px"></use>
            </svg>
          </div>
      </div>
  </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url); // 删除 a 标签，用JS实行链接跳转
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation(); // 阻止冒泡
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("请输入要添加的网址：");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0],
    url: url,
  });
  render();
});

/* window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
}; */

/* $(document).on("keypress", (e) => {
  const { key } = e; // const key = e.key
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
}); // 首字母相同的网址，只会打开第一个网址

$(".word").on("keypress", (e) => {
  e.stopPropagation();
}); */
