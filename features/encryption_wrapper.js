
// features/encryption_wrapper.js - AES-GCM wrapper
const EncryptionFeature = (function(){
  async function deriveKeyFromPass(pass, saltBytes){
    const salt = saltBytes || crypto.getRandomValues(new Uint8Array(16));
    const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(pass), {name:'PBKDF2'}, false, ['deriveKey']);
    const key = await crypto.subtle.deriveKey({name:'PBKDF2', salt, iterations:200000, hash:'SHA-256'}, base, {name:'AES-GCM', length:256}, false, ['encrypt','decrypt']);
    return {key, salt};
  }
  async function encryptJSON(obj, key){
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const data = new TextEncoder().encode(JSON.stringify(obj));
    const cipher = await crypto.subtle.encrypt({name:'AES-GCM', iv}, key, data);
    return {iv: Array.from(iv), data: Array.from(new Uint8Array(cipher))};
  }
  async function decryptJSON(blob, key){
    const iv = new Uint8Array(blob.iv);
    const data = new Uint8Array(blob.data).buffer;
    const plain = await crypto.subtle.decrypt({name:'AES-GCM', iv}, key, data);
    return JSON.parse(new TextDecoder().decode(plain));
  }
  return {deriveKeyFromPass, encryptJSON, decryptJSON};
})();
