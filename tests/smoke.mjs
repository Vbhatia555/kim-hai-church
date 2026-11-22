import { chromium, devices } from 'playwright';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { mkdir } from 'node:fs/promises';
const server=spawn('python3',['-m','http.server','8787','--bind','127.0.0.1'],{stdio:'ignore'});
await delay(1200);
const browser=await chromium.launch({headless:true,args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader']});
await mkdir('test-results',{recursive:true});
async function waitFor(selector,page){await page.locator(selector).waitFor({timeout:18000})}
async function testMobile(){
 const ctx=await browser.newContext({...devices['iPhone 13'],viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true,timezoneId:'Asia/Dubai',reducedMotion:'reduce'});
 const page=await ctx.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(String(e)));
 await page.addInitScript(()=>localStorage.setItem('kh2_illustration','true'));
 await page.clock.setFixedTime(new Date('2026-11-22T18:15:00Z')); // Dubai Nov 22, Vietnam Nov 23
 await page.goto('http://127.0.0.1:8787/',{waitUntil:'domcontentloaded'});
 await waitFor('#sceneHeading',page);
 assert.equal(await page.locator('#sceneHeading').innerText(),'Bước vào bình an');
 assert.equal(await page.locator('#entranceMassTimes').count(),1);
 // gate -> church -> altar -> prayer
 await page.locator('#placesBtn').click();
 await page.locator('#placesMenu [data-go="door"]').click();
 assert.equal(await page.locator('#sceneHeading').innerText(),'Cánh cửa luôn mở');
 await page.locator('.dock [data-go="altar"]').click();
 await waitFor('.sheet.is-open',page);
 assert.match(await page.locator('#sheetTitle').innerText(),/Lời nguyện hôm nay/);
 assert.match(await page.locator('.prayer-title').innerText(),/23\/11/);
 const prayer=await page.locator('.prayer-sheet').innerText();
 assert(prayer.length>40);
 // English and small-screen overflow
 await page.locator('#langEn').click();
 assert.match(await page.locator('#sheetTitle').innerText(),/Today/);
 assert.match(await page.locator('.prayer-title').innerText(),/23\/11/);
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1));
 // candle stand, private state
 await page.locator('#sheetClose').click();
 await page.locator('.dock [data-go="candle"]').click();
 await waitFor('.sheet.is-open',page);
 let candles=page.locator('.candle-unit');assert.equal(await candles.count(),5);
 assert(!await candles.first().evaluate(el=>el.classList.contains('lit')));
 await candles.first().click();
 assert(await page.locator('.candle-unit').first().evaluate(el=>el.classList.contains('lit')));
 await page.locator('#intention').fill('A private intention for someone dear');
 await page.getByRole('button',{name:'Save privately'}).click();
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('kh2_intention'))),'A private intention for someone dear');
 // rosary progress and persistence
 await page.locator('#sheetClose').click();
 await page.locator('.dock [data-go="garden"]').click();
 await waitFor('.sheet.is-open',page);
 await page.getByRole('button',{name:/Next bead/}).click();
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('kh2_rosary'))),1);
 // schedule clear status + reference
 await page.locator('#sheetClose').click();
 await page.locator('.dock [data-go="board"]').click();
 await waitFor('.sheet.is-open',page);
 assert.match(await page.locator('#sheetContent').innerText(),/No Mass schedule has been confirmed/);
 assert.match(await page.locator('#sheetContent').innerText(),/Regular weekly Mass times/);
 await page.screenshot({path:'test-results/mobile-390.png'});
 await page.reload();
 await page.locator('.dock [data-go="candle"]').click();
 await waitFor('.sheet.is-open',page);
 assert(await page.locator('.candle-unit').first().evaluate(el=>el.classList.contains('lit')));
 assert.equal(await page.locator('#intention').inputValue(),'A private intention for someone dear');
 assert.deepEqual(errors,[]);
 await ctx.close();
}
async function testSpecial(){
 const ctx=await browser.newContext({viewport:{width:1280,height:800},timezoneId:'Asia/Dubai',reducedMotion:'reduce'});
 const page=await ctx.newPage();
 await page.addInitScript(()=>localStorage.setItem('kh2_illustration','true'));
 await page.clock.setFixedTime(new Date('2026-11-16T18:00:00Z')); // Vietnam November 17
 await page.goto('http://127.0.0.1:8787/',{waitUntil:'domcontentloaded'});
 await page.locator('.dock [data-go="altar"]').click();
 await waitFor('.sheet.is-open',page);
 assert.match(await page.locator('.prayer-title').innerText(),/Nguyễn Mộc Cát Tiên/);
 await page.screenshot({path:'test-results/desktop-1280.png'});
 await ctx.close();
}
async function test3D(){
 const ctx=await browser.newContext({viewport:{width:1280,height:800},timezoneId:'Asia/Dubai'});
 const page=await ctx.newPage();
 await page.goto('http://127.0.0.1:8787/',{waitUntil:'domcontentloaded'});
 await page.waitForTimeout(4200);
 const canvasCount=await page.locator('#webglStage canvas').count();
 if(canvasCount===0){console.warn('3D CDN/WebGL not available in CI: confirmed illustrated fallback remains visible');assert(await page.locator('#illustrationStage').isVisible())}
 else{
 assert(await page.locator('#webglStage').isVisible());
 await page.locator('.dock [data-go="altar"]').click();
 await page.waitForTimeout(4500);
 assert(await page.locator('#sheet').isVisible());
 await page.screenshot({path:'test-results/desktop-3d.png'});
 }
 await ctx.close();
}
try{
 await testMobile();
 await testSpecial();
 await test3D();
 console.log('PASS mobile, desktop, prayer, candle, rosary, Mass, timezone, fallback and optional WebGL');
}finally{await browser.close();server.kill('SIGTERM')}
