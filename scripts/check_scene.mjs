import assert from 'node:assert/strict';
import {readFile, readdir, stat} from 'node:fs/promises';
import vm from 'node:vm';
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {MODEL_DATA} from '../src/embedded-assets.js';

// Real geometry and GLB parsing; DOM/WebGL stand-ins keep this check runnable without a browser.
const size={width:1100,height:850};
function canvasContext(){return new Proxy({calls:[],createPattern(image,repetition){this.calls.push(['createPattern',image,repetition]);return {image,repetition};}}, {get(target,key){if(key in target)return target[key];return (...args)=>target.calls.push([key,...args]);}});}
const elements=new Map();
function element(){const context=canvasContext();return {style:{},dataset:{},children:[],listeners:{},open:false,classList:{toggle(){}},appendChild(child){this.children.push(child);},querySelectorAll(){return this.children;},addEventListener(type,handler){(this.listeners[type]??=[]).push(handler);},showModal(){this.open=true;},close(){this.open=false;this.listeners.close?.forEach(handler=>handler());},getBoundingClientRect:()=>size,getContext:()=>context,toDataURL:()=> 'data:image/png;base64,test',click(){}};}
const document={getElementById(id){if(!elements.has(id))elements.set(id,element());return elements.get(id);},createElement:element,querySelectorAll:()=>[]};
let renders=0;
class Renderer{
 constructor(){this.domElement=element();this.shadowMap={};this.capabilities={getMaxAnisotropy:()=>4};}
 setPixelRatio(value){this.pixelRatio=value;} getPixelRatio(){return this.pixelRatio;}
 setSize(width,height){this.domElement.width=Math.round(width*this.pixelRatio);this.domElement.height=Math.round(height*this.pixelRatio);} render(){renders++;}
}
class Controls extends THREE.EventDispatcher{
 constructor(camera){super();this.object=camera;this.target=new THREE.Vector3();}
 update(){this.object.lookAt(this.target);this.object.updateMatrixWorld(true);}
}
const mediaQuery={matches:false,addEventListener(){}};
const sandbox={THREE:{...THREE,WebGLRenderer:Renderer},OrbitControls:Controls,GLTFLoader,MODEL_DATA,ArrayBuffer,Uint8Array,document,window:{devicePixelRatio:1.25,matchMedia:()=>mediaQuery},innerWidth:1440,ResizeObserver:class{observe(){}},requestAnimationFrame(){},atob,performance,setTimeout,console};
vm.createContext(sandbox);
let source=await readFile(new URL('../src/main.js',import.meta.url),'utf8');
source=source.replace(/^import .*;\r?\n/gm,'').replace('load().catch(', 'const loaded=load();loaded.catch(');
vm.runInContext(source+'\nglobalThis.clinic={loaded,scene,props,spaces,camera,planCamera,control,setView,resize,select,frame,sunlight,updateMobileNotice,createWatermarkTile,renderWatermarkedPng};',sandbox);
const clinic=sandbox.clinic;
await clinic.loaded;
const canvas=document.getElementById('viewport').children[0];
assert.equal(canvas.id,'scene','Canvas must receive the CSS sizing rule at non-1 device pixel ratios');
const html=await readFile(new URL('../index.html',import.meta.url),'utf8');
assert.match(html,/#scene\{[^}]*width:100%;[^}]*height:100%/,'Canvas CSS must fit its panel');
assert.doesNotMatch(html,/elora|nara/i,'Portfolio must use its own identity');
assert.match(html,/<title>Katalhys Dental Studio/);
assert.match(html,/<link rel="icon" type="image\/svg\+xml" href="assets\/brand\/favicon.svg"/);
assert.match(html,/\.watermark\{[^}]*pointer-events:none/,'Watermarks must not block controls');
assert.equal((html.match(/class="watermark" aria-hidden="true"/g)??[]).length,2,'Screen and mobile dialog need watermarks');
for(const name of ['katalhys-symbol.svg','favicon.svg','favicon.png','apple-touch-icon.png'])assert.ok((await stat(new URL('../assets/brand/'+name,import.meta.url))).size>0);
const tile=clinic.createWatermarkTile(2),tileContext=tile.getContext('2d');
assert.equal(tile.width,360);assert.equal(tile.height,220);
assert.equal(tileContext.globalAlpha,.085,'Watermark must stay subtle');
assert.ok(tileContext.calls.some(([method,text])=>method==='fillText'&&text==='Katalhys'));
const exportCanvas=clinic.renderWatermarkedPng(),exportCalls=exportCanvas.getContext('2d').calls;
assert.equal(exportCanvas.width,canvas.width);assert.equal(exportCanvas.height,canvas.height);
assert.deepEqual(exportCalls.map(([method])=>method),['drawImage','createPattern','fillRect'],'PNG must composite the watermark over the rendered model');
assert.equal(exportCalls[1][2],'repeat');
assert.deepEqual(exportCalls[2].slice(1),[0,0,canvas.width,canvas.height],'Pattern must cover the full export');
const originalCreateElement=document.createElement;
document.createElement=()=>{const el=element();el.getContext().createPattern=()=>null;return el;};
assert.throws(()=>clinic.renderWatermarkedPng(),/Ekspor dibatalkan/,'Export must not silently omit the watermark');
document.createElement=originalCreateElement;
assert.equal(clinic.scene.background.getHexString(),'eee2d1');
assert.equal(clinic.scene.fog.color.getHexString(),'eee2d1');
assert.equal(clinic.scene.getObjectByName('exterior-ground').material.color.getHexString(),'eee2d1');
const notice=document.getElementById('mobileNotice');
assert.equal(notice.open,false,'Desktop must not show the mobile notice');
mediaQuery.matches=true;clinic.updateMobileNotice();assert.equal(notice.open,true,'Narrow screens must show the notice');
mediaQuery.matches=false;clinic.updateMobileNotice();assert.equal(notice.open,false,'Desktop resize must close the notice');
mediaQuery.matches=true;clinic.updateMobileNotice();notice.close();clinic.updateMobileNotice();
assert.equal(notice.open,false,'Dismissed notice must stay closed for this visit');
const assets=clinic.props.children.filter(o=>o.userData.asset);
assert.ok(assets.length>100,'Detailed room furnishings must load');
assert.equal(Object.keys(MODEL_DATA).length,56);
const rooms=new Map(clinic.spaces.map(room=>[room.id,room]));
assert.equal(rooms.get('waiting').w,9,'Lobby must use the expanded layout');
assert.equal(rooms.get('staff').w,3,'Front partitions must follow the new layout');
assert.equal(rooms.get('xray').z,5);
assert.equal(rooms.get('unit1').z,8.5);
assert.equal(rooms.get('sterile').z,8.5);
assert.equal(clinic.spaces.reduce((area,r)=>area+r.w*r.d,0),216);
for(const [index,a] of clinic.spaces.entries())for(const b of clinic.spaces.slice(index+1)){
 const overlapWidth=Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x);
 const overlapDepth=Math.min(a.z+a.d,b.z+b.d)-Math.max(a.z,b.z);
 assert.ok(overlapWidth<=0||overlapDepth<=0,`${a.id} overlaps ${b.id}`);
}
for(const [name,roomId] of [['xray_arm','xray'],['autoclave','sterile'],['jaw_model','consult'],['staff_fridge','staff']]){
 const asset=assets.find(o=>o.name===name),room=rooms.get(roomId);
 assert.ok(asset.position.x+9>room.x&&asset.position.x+9<room.x+room.w&&asset.position.z+6>room.z&&asset.position.z+6<room.z+room.d,`${name} must move with ${roomId}`);
}
const upholstery=[];
clinic.props.traverse(o=>{if(o.isMesh)for(const material of(Array.isArray(o.material)?o.material:[o.material]))if(material.name==='teal')upholstery.push(material.color.getHexString());});
assert.ok(upholstery.length>0);
assert.ok(upholstery.every(color=>color==='a65d46'),'Furniture accents must use the portfolio palette');
for(const asset of assets){
 const box=new THREE.Box3().setFromObject(asset);
 assert.ok(Number.isFinite(box.min.x)&&!box.isEmpty(),`${asset.name}: invalid geometry`);
 assert.ok(box.min.y>=.12,`${asset.name}: below finished floor`);
}
const crossings=[];
for(const asset of assets){
 const x=asset.position.x+9,z=asset.position.z+6;
 const room=clinic.spaces.find(r=>!r.id.includes('hall')&&x>r.x&&x<r.x+r.w&&z>r.z&&z<r.z+r.d);
 if(!room)continue;
 const box=new THREE.Box3().setFromObject(asset);
 if(box.min.x+9<room.x-.08||box.max.x+9>room.x+room.w+.08||box.min.z+6<room.z-.08||box.max.z+6>room.z+room.d+.08)crossings.push(`${asset.name} in ${room.id}: ${[box.min.x+9,box.max.x+9,box.min.z+6,box.max.z+6].map(n=>n.toFixed(2))}`);
}
assert.deepEqual(crossings,[],'Furniture should stay inside its room');
for(const [width,height] of [[1100,850],[550,900],[375,450],[1800,650]]){
 Object.assign(size,{width,height});clinic.setView('3d');clinic.resize();
 for(const x of [-9.6,10.2])for(const y of [-.3,3.1])for(const z of [-6.5,6.5]){
  const p=new THREE.Vector3(x,y,z).project(clinic.camera);
  assert.ok(Math.abs(p.x)<.84&&Math.abs(p.y)<.78,`${width}x${height}: clinic cropped`);
 }
 clinic.setView('2d');clinic.resize();
 for(const x of [-9.6,10.2])for(const z of [-6.5,6.5]){
  const p=new THREE.Vector3(x,0,z).project(clinic.planCamera);
  assert.ok(Math.abs(p.x)<1&&Math.abs(p.y)<1,`${width}x${height}: floor plan cropped`);
 }
 clinic.planCamera.zoom=3;clinic.setView('2d');assert.equal(clinic.planCamera.zoom,1);
}
clinic.setView('walk');assert.ok(clinic.camera.position.y<2);
clinic.select('xray',true);clinic.frame(performance.now()+900);
assert.equal(document.getElementById('detailTitle').textContent,'Radiografi');
document.getElementById('resetBtn').onclick();
assert.ok(clinic.control.target.distanceTo(new THREE.Vector3(0,.65,0))<1e-6,'Reset must recenter');
clinic.frame(performance.now()+1000);const rendered=renders;clinic.frame(performance.now()+1100);
assert.equal(renders,rendered,'Idle scene must not render continuously');
const lights=[];clinic.scene.traverse(o=>{if(o.isLight&&o.castShadow)lights.push(o);});
assert.equal(lights.length,1,'Only sunlight should allocate a shadow map');
let triangles=0,meshes=0;
clinic.scene.traverse(o=>{if(o.isMesh){meshes++;triangles+=(o.geometry.index?.count??o.geometry.attributes.position.count)/3;}});
const models=await readdir(new URL('../assets/models/',import.meta.url));
const bytes=(await Promise.all(models.map(name=>stat(new URL('../assets/models/'+name,import.meta.url))))).reduce((sum,s)=>sum+s.size,0);
console.log(JSON.stringify({checks:'passed',models:models.length,placements:assets.length,meshes,triangles,modelBytes:bytes,bundleBytes:(await stat(new URL('../app.bundle.js',import.meta.url))).size},null,2));
