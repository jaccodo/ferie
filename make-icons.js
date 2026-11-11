// Genera le icone PNG dell'app (sole su sfondo verde) senza librerie: node make-icons.js
const fs = require('fs'), zlib = require('zlib');
function crc32(b){ let c, t=[]; for(let n=0;n<256;n++){ c=n; for(let k=0;k<8;k++) c = c&1 ? 0xEDB88320^(c>>>1) : c>>>1; t[n]=c>>>0; }
  let x=0xFFFFFFFF; for(const v of b) x = t[(x^v)&0xFF]^(x>>>8); return (x^0xFFFFFFFF)>>>0; }
function chunk(type, data){ const len=Buffer.alloc(4); len.writeUInt32BE(data.length); const td=Buffer.concat([Buffer.from(type), data]); const c=Buffer.alloc(4); c.writeUInt32BE(crc32(td)); return Buffer.concat([len, td, c]); }
function png(S){
  const raw = Buffer.alloc(S*(S*4+1));
  const bg=[31,61,43], sun=[240,176,64], hill=[86,140,96];
  for(let y=0;y<S;y++){ raw[y*(S*4+1)]=0; for(let x=0;x<S;x++){
    const u=x/S, v=y/S; let c=bg;
    const dx=u-0.5, dy=v-0.47, r=Math.hypot(dx,dy);
    if(r<0.2) c=sun;
    else { const a=Math.atan2(dy,dx); if(r>0.25 && r<0.33 && Math.abs(((a/(Math.PI/4))%1+1)%1-0.5)<0.16) c=sun; }
    if(v > 0.72 - 0.08*Math.cos((u-0.5)*3)) c=hill;
    const o=y*(S*4+1)+1+x*4; raw[o]=c[0]; raw[o+1]=c[1]; raw[o+2]=c[2]; raw[o+3]=255; } }
  const ih=Buffer.alloc(13); ih.writeUInt32BE(S,0); ih.writeUInt32BE(S,4); ih[8]=8; ih[9]=6;
  return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]), chunk('IHDR',ih), chunk('IDAT',zlib.deflateSync(raw)), chunk('IEND',Buffer.alloc(0))]);
}
fs.writeFileSync(__dirname+'/icons/icon-192.png', png(192));
fs.writeFileSync(__dirname+'/icons/icon-512.png', png(512));
