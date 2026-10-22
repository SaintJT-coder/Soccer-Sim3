const { chromium, devices } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({headless:true});
  const errors=[];
  const viewports=[
    {name:'iphone-se',device:{...devices['iPhone SE'],defaultBrowserType:'chromium'}},
    {name:'iphone-13',device:{...devices['iPhone 13'],defaultBrowserType:'chromium'}},
    {name:'android',device:{...devices['Pixel 7'],defaultBrowserType:'chromium'}},
    {name:'tablet',device:{...devices['iPad Mini'],defaultBrowserType:'chromium'}}
  ];
  const groups={
    Club:['Dashboard','Roster','Tactics','Front Office','Finances'],
    Competitions:['Leagues','Schedule','Standings','Postseason','Match Center'],
    Recruitment:['Player Market','Draft','Youth Academy','League Squads'],
    Legacy:['Awards','Player Stats','League History','Retirement Hall']
  };
  for(const {name,device} of viewports){
    const context=await browser.newContext({...device,serviceWorkers:'block'});
    const page=await context.newPage();
    page.on('pageerror',e=>errors.push(name+': '+e.message));
    page.on('dialog',d=>d.accept());
    await page.goto('http://127.0.0.1:8765/',{waitUntil:'domcontentloaded'});
    await page.locator('#app .club-hero').waitFor();
    for(const [group,tabs] of Object.entries(groups)){
      await page.locator('#navCategories button[data-group="'+group+'"]').click();
      for(const tab of tabs){
        await page.locator('#nav button[data-tab="'+tab+'"]').click();
        assert.ok(await page.locator('#app').innerText(),name+' '+tab+' empty');
        const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
        assert.ok(overflow<=3,name+' '+tab+' has horizontal page overflow '+overflow+'px');
      }
    }
    await page.locator('#navCategories button[data-group="Club"]').click();
    await page.screenshot({path:'qa-'+name+'.png',fullPage:true});
    await context.close();
  }
  const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
  const page=await context.newPage();
  page.on('pageerror',e=>errors.push('season: '+e.message));
  page.on('dialog',d=>d.accept());
  await page.goto('http://127.0.0.1:8765/');
  await page.locator('#navCategories button[data-group="Recruitment"]').click();
  await page.locator('#nav button[data-tab="Draft"]').click();
  for(let i=0;i<2;i++)await page.locator('[data-act^="draft:"]:not([disabled])').first().click();
  await page.locator('#navCategories button[data-group="Club"]').click();
  await page.locator('#nav button[data-tab="Dashboard"]').click();
  await page.locator('[data-act="begin"]').click();
  for(let i=0;i<14;i++){
    const btn=page.locator('[data-act="round"]');
    if(!(await btn.count()))break;
    await btn.click();
  }
  assert.equal(errors.length,0,'Browser errors: '+errors.join('; '));
  await browser.close();
  console.log('Mobile tab navigation, overflow and season smoke checks passed');
})().catch(e=>{console.error(e);process.exitCode=1});
