const pathData={
  course:{situation:'课程听不懂、作业无思路、考前需要系统梳理',action:'发送课程大纲、题目要求与截止时间，先评估知识缺口',service:'课程与学业辅导'},
  appeal:{situation:'收到学校警告、考虑撤课、需要回复学术诚信或成绩问题',action:'保存学校邮件与政策链接，按时间线整理已发生的事实',service:'学校事务与申诉'},
  apply:{situation:'选校方向不清、材料表达薄弱、硕博申请时间紧张',action:'列出目标地区、专业、成绩背景和已有材料，先做差距分析',service:'升学与研究支持'},
  career:{situation:'简历投递无反馈、岗位方向模糊、面试表达不够完整',action:'提供目标岗位与现有简历，先判断定位和材料问题',service:'实习与求职准备'}
};

document.querySelectorAll('.path-tab').forEach(tab=>tab.addEventListener('click',()=>{
  document.querySelectorAll('.path-tab').forEach(item=>{item.classList.remove('active');item.setAttribute('aria-selected','false')});
  tab.classList.add('active');tab.setAttribute('aria-selected','true');
  const data=pathData[tab.dataset.target];
  document.querySelector('#path-situation').textContent=data.situation;
  document.querySelector('#path-action').textContent=data.action;
  document.querySelector('#path-link').dataset.service=data.service;
}));

const serviceSelect=document.querySelector('#service-select');
function chooseService(service){serviceSelect.value=service;document.querySelector('#consult').scrollIntoView({behavior:'smooth'});}
document.querySelectorAll('.select-service').forEach(button=>button.addEventListener('click',()=>chooseService(button.dataset.service)));
document.querySelector('#path-link').addEventListener('click',event=>{const service=event.currentTarget.dataset.service||'课程与学业辅导';serviceSelect.value=service;});

const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('#main-nav');
menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));

const form=document.querySelector('#consult-form');
const result=document.querySelector('#form-result');
const resultText=document.querySelector('#result-text');
form.addEventListener('submit',event=>{
  event.preventDefault();
  const lines=[
    '【倍美教育咨询摘要｜演示】',
    `咨询方向：${serviceSelect.value}`,
    `所在地区：${document.querySelector('#region').value||'未填写'}`,
    `最近截止：${document.querySelector('#deadline').value||'未填写'}`,
    `情况说明：${document.querySelector('#situation').value}`,
    '',
    '注：此摘要由本地演示页面生成，尚未提交。'
  ];
  resultText.textContent=lines.join('\n');result.hidden=false;result.scrollIntoView({behavior:'smooth',block:'nearest'});
});
document.querySelector('#copy-result').addEventListener('click',async event=>{
  try{await navigator.clipboard.writeText(resultText.textContent);event.currentTarget.textContent='已复制';setTimeout(()=>event.currentTarget.textContent='复制',1600)}
  catch{event.currentTarget.textContent='请手动复制'}
});
