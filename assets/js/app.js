/*
MIT License
Copyright (c) 2025 Georgalas Thanasis (info@cited.gr)
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

// Copied from your working file (unchanged logic), adjusted only to be external.

// Define helper early
function $(id){ return document.getElementById(id); }

document.addEventListener('DOMContentLoaded',function(){
  const el={
    scoreBtn:$('scoreBtn'),helpBtn:$('helpBtn'),
    playersMinus:$('playersMinus'),playersPlus:$('playersPlus'),
    impostorsMinus:$('impostorsMinus'),impostorsPlus:$('impostorsPlus'),
    playerCount:$('playerCount'),impostorCount:$('impostorCount'),
    playerCountValue:$('playerCountValue'),impostorCountValue:$('impostorCountValue'),
    maximpostors:$('maximpostors'),suggestedimpostors:$('suggestedimpostors'),
    namesToggle:$('namesToggle'),namesToggleBtn:$('namesToggleBtn'),namesSection:$('namesSection'),toggleIcon:$('toggleIcon'),playerInputs:$('playerInputs'),
    studioToggle:$('studioToggle'),studioToggleBtn:$('studioToggleBtn'),studio:$('studio'),toggleStudioIcon:$('toggleStudioIcon'),
    studioSearch:$('studioSearch'),groupFilter:$('groupFilter'),chipbar:$('chipbar'),
    studioTitle:$('studioTitle'),studioMeta:$('studioMeta'),
    catNameEdit:$('catNameEdit'),catGroupEdit:$('catGroupEdit'),resetCatBtn:$('resetCatBtn'),removeCatBtn:$('removeCatBtn'),
    wordsTextarea:$('wordsTextarea'),inlineWordInput:$('inlineWordInput'),inlineAddBtn:$('inlineAddBtn'),
    saveCatBtn:$('saveCatBtn'),saveAllBtn:$('saveAllBtn'),newCatBtn:$('newCatBtn'),
    exportJsonBtn:$('exportJsonBtn'),importJsonBtn:$('importJsonBtn'),configFileInput:$('configFileInput'),
    toggleGroupsManagerBtn:$('toggleGroupsManagerBtn'),groupsManager:$('groupsManager'),groupsList:$('groupsList'),saveGroupsBtn:$('saveGroupsBtn'),newGroupName:$('newGroupName'),addNewGroupBtn:$('addNewGroupBtn'),
    newCategoryForm:$('newCategoryForm'),createCatBtn:$('createCatBtn'),cancelCatBtn:$('cancelCatBtn'),
    newCatName:$('newCatName'),newCatGroup:$('newCatGroup'),newCatWords:$('newCatWords'),
    categorySelect:$('category'),helperMode:$('helperMode'),helperStats:$('helperStats'),
    startBtn:$('startBtn'),categoryName:$('categoryName'),progress:$('progress'),playerName:$('playerName'),
    screen2Card:$('card'),nextBtn:$('nextBtn'),
    orderPrimaryBtn:$('orderPrimaryBtn'),viewOrderBtn:$('viewOrderBtn'),orderList:$('orderList'),
    votingGrid:$('votingGrid'),finishVotingBtn:$('finishVotingBtn'),
    resultMessage:$('resultMessage'),revealWord:$('revealWord'),revealimpostor:$('revealimpostor'),voteDetails:$('voteDetails'),
    helperInfo:$('helperInfo'),revealHelper:$('revealHelper'),
    scoresDiv:$('scores'),playAgainBtn:$('playAgainBtn'),backSetupBtn:$('backSetupBtn'),
    helpModal:$('helpModal'),helpClose:$('helpClose'),helpFooterClose:$('helpFooterClose'),
    scoresModal:$('scoresModal'),scoresClose:$('scoresClose'),scoresFooterClose:$('scoresFooterClose'),
    scoresModalList:$('scoresModalList'),exportScoresBtn:$('exportScoresBtn'),clearScoresBtn:$('clearScoresBtn'),
  };

  if(!el.scoreBtn || !el.helpBtn || !el.startBtn){
    console.error('Critical UI elements not found. Check IDs in HTML.');
    return;
  }

  const defaultWords={prog:['Αλγόριθμος (Algorithm),βήματα','Συνάρτηση (Function),κλήση','Μεταβλητή (Variable),τιμή','Βρόχος (Loop),επανάληψη','Πίνακας (Array),στοιχεία','Κλάση (Class),αντικείμενο','Μέθοδος (Method),συνάρτηση','Παράμετρος (Parameter),είσοδος'],
    net:['Δρομολογητής (Router),πακέτα','Πρωτόκολλο (Protocol),κανόνες','Τείχος Προστασίας (Firewall),ασφάλεια','Διακομιστής (Server),υπηρεσία','Πύλη (Gateway),σύνδεση','Υποδίκτυο (Subnet),μάσκα'],
    db:['Πίνακας (Table),γραμμές','Ερώτημα (Query),SELECT','Πρωτεύον Κλειδί (Primary Key),μοναδικό','Συνένωση (Join),συσχέτιση','Σχήμα (Schema),δομή','Ευρετήριο (Index),γρηγορότερο'],
    sec:['Κρυπτογράφηση (Encryption),κλειδί','Κωδικός Πρόσβασης (Password),μυστικό','Ιός (Virus),κακόβουλο','Πίσω Πόρτα (Backdoor),παράκαμψη','Τείχος Προστασίας (Firewall),φραγή','Πιστοποίηση (Authentication),ταυτότητα'],
    hw:['Επεξεργαστής (CPU),πυρήνες','Μνήμη (RAM),πρόσβαση','Σκληρός Δίσκος (Hard Drive),αποθήκευση','Κάρτα Γραφικών (GPU),εικόνα','Μητρική Πλακέτα (Motherboard),υποδοχές','Τροφοδοτικό (Power Supply),ρεύμα'],
    web:['Ιστοσελίδα (Website),σελίδες','Διακομιστής (Server),HTTP','Φυλλομετρητής (Browser),πλοήγηση','Σύνδεσμος (Link),url','Φόρμα (Form),υποβολή','Μενού (Menu),πλοήγηση'],
    tech:['Ρομπότ (Robot),αυτόματο','Αισθητήρας (Sensor),μέτρηση','Κινητήρας (Motor),κίνηση','Γρανάζι (Gear),μετάδοση','Μοχλός (Lever),μοχλεύση','Τροχαλία (Pulley),σχοινί'],
    general:['Μήλο,φρούτο','Μπανάνα,φρούτο','Σκύλος,τετράποδο','Γάτα,αιλουροειδές','Αυτοκίνητο,όχημα','Ποδόσφαιρο,άθλημα','Πίτσα,φαγητό','Κιθάρα,όργανο','Βιβλίο,ανάγνωση','Ήλιος,αστέρι','Δέντρο,φύση','Θάλασσα,νερό']};
  const defaultCategoryNames={prog:'Προγραμματισμός',net:'Δίκτυα',db:'Βάσεις Δεδομένων',sec:'Ασφάλεια',hw:'Υλικό',web:'Ιστός',tech:'Τεχνολογία',general:'🎉 Ελεύθερο Θέμα'};
  let activeWords=JSON.parse(JSON.stringify(defaultWords));
  let categoryNames=JSON.parse(JSON.stringify(defaultCategoryNames));
  const defaultGroups={cs:'Πληροφορική',tech:'Τεχνολογία',general:'🎉 Ελεύθερο Θέμα'};
  const defaultCatToGroup={prog:'cs',net:'cs',db:'cs',sec:'cs',hw:'cs',web:'cs',tech:'tech',general:'general'};
  const KEY_CUSTOM_WORDS='impostorCustomWords',KEY_CUSTOM_CAT_NAMES='impostorCustomCategoryNames',KEY_CUSTOM_ADDED='impostorCustomAddedCategories',KEY_GROUPS='impostorGroups',KEY_GROUP_ORDER='impostorGroupOrder',KEY_CAT_TO_GROUP='impostorCatToGroup',KEY_WORD_BAGS='impostorWordBags',KEY_impostor_BAG='impostorBag',KEY_HELPER_MODE='impostorHelperMode';

  let groups={},groupOrder=[],catToGroup={},wordBags={};
  let players=6,currentPlayer=0,impostors=[],word='',helperWord='',hasRevealed=false;
  let votes={},scores={},playerNames=[],randomOrder=[],votingInitialized=false;
  try{scores=JSON.parse(localStorage.getItem('impostorScores')||'{}');}catch(e){scores={};}

  function randInt(max){if(crypto?.getRandomValues){const b=new Uint32Array(1);crypto.getRandomValues(b);return Math.floor((b[0]/(0xFFFFFFFF+1))*max);}return Math.floor(Math.random()*max);}
  function shuffle(a){for(let i=a.length-1;i>0;i--){const r=randInt(i+1);[a[i],a[r]]=[a[r],a[i]]}return a;}
  function parseWord(raw){if(typeof raw!=='string')return{main:String(raw||''),helper:''};const i=raw.indexOf(',');return i===-1?{main:raw.trim(),helper:''}:{main:raw.slice(0,i).trim(),helper:raw.slice(i+1).trim()};}

  function loadCustomConfig(){try{const w=JSON.parse(localStorage.getItem(KEY_CUSTOM_WORDS)||'{}');for(const k in w){if(Array.isArray(w[k])&&w[k].length)activeWords[k]=w[k];}}catch(e){} try{const n=JSON.parse(localStorage.getItem(KEY_CUSTOM_CAT_NAMES)||'{}');for(const k in n){if(typeof n[k]==='string'&&n[k].trim())categoryNames[k]=n[k].trim();}}catch(e){} try{const added=JSON.parse(localStorage.getItem(KEY_CUSTOM_ADDED)||'[]');added.forEach(k=>{if(!activeWords[k])activeWords[k]=[];if(!categoryNames[k])categoryNames[k]=k;});}catch(e){}}
  function loadGroups(){groups={...defaultGroups}; groupOrder=Object.keys(defaultGroups); catToGroup={...defaultCatToGroup}; try{const g=JSON.parse(localStorage.getItem(KEY_GROUPS)||'{}');const o=JSON.parse(localStorage.getItem(KEY_GROUP_ORDER)||'[]');const m=JSON.parse(localStorage.getItem(KEY_CAT_TO_GROUP)||'{}');for(const id in g){groups[id]=g[id];if(!groupOrder.includes(id))groupOrder.push(id);} if(Array.isArray(o)&&o.length){const all=new Set([...o,...Object.keys(groups)]);groupOrder=Array.from(all).filter(id=>groups[id]);} for(const c in m){if(m[c])catToGroup[c]=m[c];}}catch(e){} Object.keys(activeWords).forEach(c=>{if(!catToGroup[c])catToGroup[c]='cs';});}
  function loadWordBags(){try{wordBags=JSON.parse(localStorage.getItem(KEY_WORD_BAGS)||'{}');}catch(e){wordBags={};}}
  function saveWordBags(){localStorage.setItem(KEY_WORD_BAGS,JSON.stringify(wordBags));}
  function loadHelperMode(){el.helperMode.checked=localStorage.getItem(KEY_HELPER_MODE)==='1';}
  function storeHelperMode(){localStorage.setItem(KEY_HELPER_MODE,el.helperMode.checked?'1':'0');}

  function rebuildCategorySelect(){
    const sel=el.categorySelect; const cur=sel.value; sel.innerHTML='';
    const byGroup={}; Object.keys(activeWords).forEach(cat=>{const gid=catToGroup[cat]||'cs';(byGroup[gid]||(byGroup[gid]=[])).push(cat);});
    groupOrder.forEach(gid=>{
      const cats=(byGroup[gid]||[]).slice().sort((a,b)=>(categoryNames[a]||a).localeCompare(categoryNames[b]||b,'el'));
      if(!cats.length)return;
      const og=document.createElement('optgroup'); og.label=groups[gid]||gid;
      cats.forEach(cat=>{const opt=document.createElement('option');opt.value=cat;opt.textContent=categoryNames[cat]||cat;og.appendChild(opt);});
      sel.appendChild(og);
    });
    const all=Array.from(sel.querySelectorAll('option')).map(o=>o.value);
    sel.value=all.includes(cur)?cur:(all[0]||'');
    updateHelperStats();
  }
  function updateHelperStats(){
    const cat=el.categorySelect.value;
    if(!cat||!activeWords[cat]?.length){el.helperStats.textContent='Καμία λέξη';return;}
    const total=activeWords[cat].length;
    const helpers=activeWords[cat].filter(w=>String(w).includes(',')).length;
    el.helperStats.textContent=`Βοηθητικές: ${helpers}/${total}`;
  }

  function buildGroupsEditor(){
    const div=el.groupsList; div.innerHTML='';
    groupOrder.forEach(gid=>{
      const name=groups[gid]||gid;
      const count=Object.keys(activeWords).filter(c=>catToGroup[c]===gid).length;
      const row=document.createElement('div'); row.className='group-item';
      row.innerHTML=`<input type="text" data-group-id="${gid}" value="${name}" />
        <div class="group-meta">Κατηγορίες: ${count}</div>
        <button type="button" class="btn btn-danger btn-small" ${['cs','tech','general'].includes(gid)?'disabled':''} data-remove="${gid}">🗑️</button>`;
      div.appendChild(row);
    });
    div.querySelectorAll('button[data-remove]').forEach(b=>{
      b.addEventListener('click',()=>removeGroup(b.getAttribute('data-remove')));
    });
  }
  function populateGroupSelect(sel,selectedId){
    if(!sel)return; sel.innerHTML='';
    groupOrder.forEach(gid=>{const opt=document.createElement('option');opt.value=gid;opt.textContent=groups[gid]||gid;sel.appendChild(opt);});
    sel.value=(groups[selectedId]?selectedId:(groupOrder[0]||'cs'));
  }
  function saveGroups(){
    el.groupsList.querySelectorAll('input[data-group-id]').forEach(inp=>{
      const gid=inp.dataset.groupId; groups[gid]=inp.value.trim()||gid;
    });
    localStorage.setItem(KEY_GROUPS,JSON.stringify(groups));
    localStorage.setItem(KEY_GROUP_ORDER,JSON.stringify(groupOrder));
    localStorage.setItem(KEY_CAT_TO_GROUP,JSON.stringify(catToGroup));
    rebuildCategorySelect(); renderChipbar(); buildGroupsEditor(); alert('✅ Ομάδες αποθηκεύτηκαν.');
  }
  function addNewGroup(){
    const name=(el.newGroupName.value||'').trim(); if(!name){alert('Δώστε όνομα ομάδας.');return;}
    let gid=name.toLowerCase().replace(/[^a-z0-9_]+/g,'_'); if(!gid)gid='grp_'+Math.random().toString(36).slice(2,8);
    const base=gid; let i=1; while(groups[gid]){gid=base+'_'+i;i++;}
    groups[gid]=name; groupOrder.push(gid);
    localStorage.setItem(KEY_GROUPS,JSON.stringify(groups)); localStorage.setItem(KEY_GROUP_ORDER,JSON.stringify(groupOrder));
    buildGroupsEditor(); populateGroupSelect(el.catGroupEdit,'cs'); rebuildCategorySelect(); el.newGroupName.value=''; alert('✅ Προστέθηκε ομάδα: '+name);
  }
  function removeGroup(gid){
    if(['cs','tech','general'].includes(gid)){alert('Δεν διαγράφεται προεπιλεγμένη ομάδα.');return;}
    const assigned=Object.keys(catToGroup).filter(c=>catToGroup[c]===gid);
    if(assigned.length){alert('Υπάρχουν '+assigned.length+' κατηγορίες στην ομάδα. Μετακινήστε πρώτα.');return;}
    delete groups[gid]; groupOrder=groupOrder.filter(x=>x!==gid);
    localStorage.setItem(KEY_GROUPS,JSON.stringify(groups)); localStorage.setItem(KEY_GROUP_ORDER,JSON.stringify(groupOrder));
    buildGroupsEditor(); populateGroupSelect(el.catGroupEdit,'cs'); rebuildCategorySelect(); alert('🗑️ Η ομάδα διαγράφηκε.');
  }

  let currentCatKey=null, dirty=false;
  function markDirty(){ dirty=true; }
  function renderChipbar(){
    const bar=el.chipbar; bar.innerHTML='';
    const q=(el.studioSearch.value||'').toLowerCase();
    const gf=(el.groupFilter.value||'');
    const cats=Object.keys(activeWords).sort((a,b)=>(categoryNames[a]||a).localeCompare(categoryNames[b]||b,'el'));
    cats.forEach(cat=>{
      if(gf && (catToGroup[cat]||'cs')!==gf) return;
      const name=categoryNames[cat]||cat;
      const words=activeWords[cat]||[];
      const helpers=words.filter(w=>String(w).includes(',')).length;
      const hay=(name+' '+words.join(' ')).toLowerCase();
      if(q && !hay.includes(q)) return;
      const chip=document.createElement('button');
      chip.type='button'; chip.className='chip';
      chip.innerHTML=`${name} <span class="count">${words.length}•${helpers}</span>`;
      chip.addEventListener('click',()=>openCategory(cat));
      if(currentCatKey===cat) chip.classList.add('active');
      bar.appendChild(chip);
    });
    if(!bar.children.length){
      const p=document.createElement('div'); p.textContent='Δεν βρέθηκαν κατηγορίες.'; p.style.color='#667'; p.style.fontSize='13px';
      bar.appendChild(p);
    }
  }
  function openCategory(cat){
    if(dirty && currentCatKey && !confirm('Υπάρχουν μη αποθηκευμένες αλλαγές. Να συνεχίσω;')) return;
    currentCatKey=cat; dirty=false; renderChipbar(); renderStudioCard();
  }
  function renderStudioCard(clear=false){
    if(clear || !currentCatKey){
      el.studioTitle.textContent='Επιλέξτε κατηγορία'; el.studioMeta.textContent='—';
      el.catNameEdit.value=''; el.wordsTextarea.value=''; el.inlineWordInput.value='';
      populateGroupSelect(el.catGroupEdit,'cs'); return;
    }
    const name=categoryNames[currentCatKey]||currentCatKey; const words=activeWords[currentCatKey]||[];
    el.studioTitle.textContent='Επεξεργασία: '+name;
    el.studioMeta.textContent=`${words.length} λέξεις • ${words.filter(w=>String(w).includes(',')).length} βοηθητικές`;
    el.catNameEdit.value=name; populateGroupSelect(el.catGroupEdit,catToGroup[currentCatKey]||'cs');
    el.wordsTextarea.value=words.join('\n'); el.inlineWordInput.value='';
  }
  function updateStudioMeta(){
    const txt=(el.wordsTextarea.value||'');
    const lines=txt.split('\n').map(l=>l.trim()).filter(Boolean);
    const helpers=lines.filter(l=>l.includes(',')).length;
    el.studioMeta.textContent=`${lines.length} λέξεις • ${helpers} βοηθητικές`;
  }
  function inlineAddWord(){
    const v=(el.inlineWordInput.value||'').trim(); if(!v) return;
    el.wordsTextarea.value = el.wordsTextarea.value ? (el.wordsTextarea.value+'\n'+v) : v;
    el.inlineWordInput.value=''; updateStudioMeta(); markDirty();
  }
  function newCategoryQuick(){
    const panel=el.newCategoryForm;
    const showing=panel && !panel.classList.contains('hidden');
    if(!panel) return;
    if(showing){
      panel.classList.add('hidden');
    }else{
      populateGroupSelect(el.newCatGroup,'cs');
      el.newCatName.value=''; el.newCatWords.value='';
      panel.classList.remove('hidden');
      el.newCatName.focus();
    }
  }
  function createCategoryFromForm(){
    const name=(el.newCatName.value||'').trim();
    const gid=el.newCatGroup.value||'cs';
    if(!name){alert('Δώστε όνομα κατηγορίας.'); return;}
    let key=name.toLowerCase().replace(/[^a-z0-9_]+/g,'_'); if(!key) key='cat_'+Math.random().toString(36).slice(2,8);
    const base=key; let i=1; while(activeWords[key]||defaultWords[key]){key=base+'_'+i;i++;}
    const lines=(el.newCatWords.value||'').split('\n').map(l=>l.trim()).filter(Boolean);
    activeWords[key]=lines.length?lines:['Προσθέστε λέξεις'];
    categoryNames[key]=name; catToGroup[key]=gid;

    const added=JSON.parse(localStorage.getItem(KEY_CUSTOM_ADDED)||'[]'); if(!added.includes(key)){added.push(key); localStorage.setItem(KEY_CUSTOM_ADDED,JSON.stringify(added));}
    const w=JSON.parse(localStorage.getItem(KEY_CUSTOM_WORDS)||'{}'); w[key]=activeWords[key]; localStorage.setItem(KEY_CUSTOM_WORDS,JSON.stringify(w));
    const n=JSON.parse(localStorage.getItem(KEY_CUSTOM_CAT_NAMES)||'{}'); n[key]=name; localStorage.setItem(KEY_CUSTOM_CAT_NAMES,JSON.stringify(n));
    localStorage.setItem(KEY_CAT_TO_GROUP,JSON.stringify(catToGroup));
    wordBags[key]=[]; saveWordBags();

    currentCatKey=key;
    renderChipbar(); renderStudioCard(); rebuildCategorySelect();
    alert('✅ Δημιουργήθηκε η κατηγορία: '+name);
    el.newCategoryForm.classList.add('hidden');
  }

  function saveCurrentCategory(){
    if(!currentCatKey){ alert('Επιλέξτε κατηγορία από πάνω.'); return; }
    const name=(el.catNameEdit.value||'').trim() || currentCatKey;
    categoryNames[currentCatKey]=name;
    catToGroup[currentCatKey]=el.catGroupEdit.value || 'cs';
    const lines=(el.wordsTextarea.value||'').split('\n').map(l=>l.trim()).filter(Boolean);
    activeWords[currentCatKey]=lines.length?lines:['Προσθέστε λέξεις'];
    const wordsSave=JSON.parse(localStorage.getItem(KEY_CUSTOM_WORDS)||'{}');
    const namesSave=JSON.parse(localStorage.getItem(KEY_CUSTOM_CAT_NAMES)||'{}');
    wordsSave[currentCatKey]=activeWords[currentCatKey]; namesSave[currentCatKey]=categoryNames[currentCatKey];
    localStorage.setItem(KEY_CUSTOM_WORDS,JSON.stringify(wordsSave));
    localStorage.setItem(KEY_CUSTOM_CAT_NAMES,JSON.stringify(namesSave));
    localStorage.setItem(KEY_CAT_TO_GROUP,JSON.stringify(catToGroup));
    wordBags[currentCatKey]=[]; saveWordBags();
    dirty=false; renderChipbar(); rebuildCategorySelect(); updateStudioMeta();
    alert('✅ Η κατηγορία αποθηκεύτηκε.');
  }
  function saveAllWords(){ saveCurrentCategory(); }
  function resetCurrentCategory(){
    if(!currentCatKey) return;
    if(defaultWords[currentCatKey]){
      activeWords[currentCatKey]=defaultWords[currentCatKey].slice();
      categoryNames[currentCatKey]=defaultCategoryNames[currentCatKey];
      catToGroup[currentCatKey]=defaultCatToGroup[currentCatKey]||'cs';
    }else{
      activeWords[currentCatKey]=[]; categoryNames[currentCatKey]=currentCatKey; delete catToGroup[currentCatKey];
    }
    const w=JSON.parse(localStorage.getItem(KEY_CUSTOM_WORDS)||'{}'); const n=JSON.parse(localStorage.getItem(KEY_CUSTOM_CAT_NAMES)||'{}');
    delete w[currentCatKey]; delete n[currentCatKey];
    localStorage.setItem(KEY_CUSTOM_WORDS,JSON.stringify(w)); localStorage.setItem(KEY_CUSTOM_CAT_NAMES,JSON.stringify(n));
    localStorage.setItem(KEY_CAT_TO_GROUP,JSON.stringify(catToGroup));
    renderStudioCard(); renderChipbar(); rebuildCategorySelect(); alert('↩️ Επαναφορά ολοκληρώθηκε.');
  }
  function removeCurrentCategory(){
    if(!currentCatKey) return;
    const cat=currentCatKey;
    if(defaultWords[cat]){ alert('Δεν μπορείτε να αφαιρέσετε προεπιλεγμένη κατηγορία.'); return; }
    if(!confirm('🗑️ Διαγραφή κατηγορίας "'+(categoryNames[cat]||cat)+'";')) return;
    delete activeWords[cat]; delete categoryNames[cat]; delete catToGroup[cat];
    const added=(JSON.parse(localStorage.getItem(KEY_CUSTOM_ADDED)||'[]')||[]).filter(k=>k!==cat);
    localStorage.setItem(KEY_CUSTOM_ADDED,JSON.stringify(added));
    const w=JSON.parse(localStorage.getItem(KEY_CUSTOM_WORDS)||'{}'); delete w[cat]; localStorage.setItem(KEY_CUSTOM_WORDS,JSON.stringify(w));
    const n=JSON.parse(localStorage.getItem(KEY_CUSTOM_CAT_NAMES)||'{}'); delete n[cat]; localStorage.setItem(KEY_CUSTOM_CAT_NAMES,JSON.stringify(n));
    wordBags[cat]=[]; saveWordBags();
    currentCatKey=null; renderStudioCard(true); renderChipbar(); rebuildCategorySelect(); alert('🗑️ Η κατηγορία διαγράφηκε.');
  }

  function exportConfig(){
    try{
      const payload={version:3,groups,groupOrder,categories:Object.keys(activeWords).map(k=>({key:k,name:categoryNames[k]||k,words:activeWords[k],group:catToGroup[k]||'cs'}))};
      const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
      const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='impostor_config_'+new Date().toISOString().slice(0,10)+'.json'; a.click();
    }catch(err){ alert('❌ Αποτυχία εξαγωγής JSON.'); console.error(err); }
  }
  function triggerImport(){el.configFileInput.value=''; el.configFileInput.onchange=importConfig; el.configFileInput.click();}
  function importConfig(e){
    const file=e.target.files && e.target.files[0]; if(!file) return;
    const reader=new FileReader();
    reader.onload=function(){
      try{
        const data=JSON.parse(reader.result);
        const replace=confirm('Εισαγωγή ρυθμίσεων:\nOK = Αντικατάσταση όλων\nCancel = Συγχώνευση με υπάρχουσες');
        if(replace){ activeWords={}; categoryNames={}; catToGroup={}; groups={}; groupOrder=[]; }
        if(data?.groups){ for(const gid in data.groups){ groups[gid]=data.groups[gid]; if(!groupOrder.includes(gid)) groupOrder.push(gid); } }
        if(Array.isArray(data?.groupOrder) && data.groupOrder.length){
          const all=new Set([...data.groupOrder, ...Object.keys(groups)]); groupOrder=Array.from(all).filter(id=>groups[id]);
        } else if (replace){ groupOrder=Object.keys(groups); }
        if(Array.isArray(data?.categories)){
          data.categories.forEach(c=>{ if(!c?.key) return;
            activeWords[c.key]=Array.isArray(c.words)?c.words.slice():[];
            categoryNames[c.key]=c.name||c.key; catToGroup[c.key]=c.group||'cs';
          });
        }
        const ws={},ns={},added=[];
        Object.keys(activeWords).forEach(k=>{
          const arr=activeWords[k]; if(!defaultWords[k] || JSON.stringify(arr)!==JSON.stringify(defaultWords[k])) ws[k]=arr;
          const nm=categoryNames[k]||k; if(!defaultCategoryNames[k] || nm!==defaultCategoryNames[k]) ns[k]=nm;
          if(!defaultWords[k]) added.push(k);
        });
        localStorage.setItem(KEY_CUSTOM_WORDS,JSON.stringify(ws));
        localStorage.setItem(KEY_CUSTOM_CAT_NAMES,JSON.stringify(ns));
        localStorage.setItem(KEY_CUSTOM_ADDED,JSON.stringify(added));
        localStorage.setItem(KEY_GROUPS,JSON.stringify(groups));
        localStorage.setItem(KEY_GROUP_ORDER,JSON.stringify(groupOrder));
        localStorage.setItem(KEY_CAT_TO_GROUP,JSON.stringify(catToGroup));
        localStorage.removeItem(KEY_WORD_BAGS); localStorage.removeItem(KEY_impostor_BAG); loadWordBags();
        renderChipbar(); renderStudioCard(); rebuildCategorySelect();
        alert('✅ Εισαγωγή ολοκληρώθηκε.');
      }catch(err){ alert('❌ Αποτυχία ανάγνωσης JSON.'); console.error(err); }
    };
    reader.readAsText(file,'utf-8');
  }

  function suggestedimpostorsForPlayers(p){return Math.max(1,Math.round(p/4));}
  function onPlayersChange(v){v=Math.max(3,Math.min(20,parseInt(v)||6)); el.playerCount.value=v; el.playerCountValue.textContent=v; updateimpostorMax(); updatePlayerInputs();}
  function onimpostorsChange(v){const max=parseInt(el.impostorCount.max)||1; v=Math.max(1,Math.min(max,parseInt(v)||1)); el.impostorCount.value=v; el.impostorCountValue.textContent=v;}
  function updateimpostorMax(){const p=parseInt(el.playerCount.value)||6; const maxImp=Math.max(1,Math.floor(p/2)); el.impostorCount.max=String(maxImp); el.maximpostors.textContent=maxImp; el.suggestedimpostors.textContent=suggestedimpostorsForPlayers(p); let v=parseInt(el.impostorCount.value)||1; if(v>maxImp)v=maxImp; if(v<1)v=1; el.impostorCount.value=v; el.impostorCountValue.textContent=v;}
  function updatePlayerInputs(){const count=parseInt(el.playerCount.value); const container=el.playerInputs; container.innerHTML=''; for(let i=0;i<count;i++){const div=document.createElement('div'); div.className='player-input'; div.innerHTML='<span>Παίκτης '+(i+1)+':</span><input type="text" id="pname'+i+'" placeholder="Όνομα (προαιρετικό)" value="'+(playerNames[i]||'')+'">'; container.appendChild(div);}}
  function getPlayerNames(){const count=parseInt(el.playerCount.value)||6; playerNames=[]; for(let i=0;i<count;i++){const input=document.getElementById('pname'+i); const name=input?input.value.trim():''; playerNames.push(name || 'Παίκτης '+(i+1));}}
  try{scores=JSON.parse(localStorage.getItem('impostorScores')||'{}');}catch(e){scores={};}
  function updateScoreCount(){const count=Object.keys(scores).length; el.scoreBtn.textContent='📊 Βαθμολογία'+(count?` (${count})`:'');}
  function showScreen(target){['screen1','screen2','screenOrder','screen3','screen4'].forEach(id=>{ const elx=document.getElementById(id); if(id===target) elx.classList.remove('hidden'); else elx.classList.add('hidden'); });}

  function pickWordFromBag(cat){const list=activeWords[cat]||[]; if(!Array.isArray(wordBags[cat]))wordBags[cat]=[]; wordBags[cat]=wordBags[cat].filter(w=>list.includes(w)); if(wordBags[cat].length===0)wordBags[cat]=shuffle(list.slice()); const w=wordBags[cat].pop(); saveWordBags(); return w||list[randInt(Math.max(1,list.length))];}
  function loadimpostorBag(){try{return JSON.parse(localStorage.getItem(KEY_impostor_BAG)||'{}');}catch(e){return {};}}
  function saveimpostorBag(obj){localStorage.setItem(KEY_impostor_BAG,JSON.stringify(obj||{}));}
  function pickimpostorsFromBag(total,count){let bag=loadimpostorBag(); if(bag.players!==total||!Array.isArray(bag.bag)){bag.players=total;bag.bag=shuffle(Array.from({length:total},(_,i)=>i));} while(bag.bag.length<count){bag.bag=bag.bag.concat(shuffle(Array.from({length:total},(_,i)=>i)));} const chosen=bag.bag.splice(0,count); saveimpostorBag(bag); return chosen;}

  function startGame(e){
    e?.preventDefault();
    players=parseInt(el.playerCount.value)||6;
    if(players<3||players>20){alert('Επιλέξτε 3–20 παίκτες.');return;}
    updateimpostorMax();
    const impCount=parseInt(el.impostorCount.value)||1;
    const maxImp=Math.floor(players/2); if(impCount<1||impCount>maxImp){alert('impostors: 1 έως '+maxImp);return;}
    getPlayerNames();
    const cat=el.categorySelect.value;
    if(!cat || !activeWords[cat]?.length){ alert('Η κατηγορία είναι κενή ή δεν υπάρχει.'); rebuildCategorySelect(); return; }
    const raw=pickWordFromBag(cat); const parsed=parseWord(raw);
    word=parsed.main; helperWord=parsed.helper;
    impostors=pickimpostorsFromBag(players,impCount);
    for(let i=0;i<players;i++){ if(typeof scores[playerNames[i]]==='undefined') scores[playerNames[i]]=0; }
    currentPlayer=0; hasRevealed=false; votingInitialized=false; randomOrder=[];
    el.categoryName.textContent=categoryNames[cat];
    showScreen('screen2'); updateCard();
  }
  function updateCard(){el.playerName.textContent=playerNames[currentPlayer]; el.progress.textContent='Παίκτης '+(currentPlayer+1)+' από '+players; $('cardText').textContent='👆 Πατήστε για να δείτε'; el.screen2Card.className='card'; hasRevealed=false; el.nextBtn.textContent=currentPlayer===players-1?'Τέλος Μοιράσματος →':'Επόμενος →';}
  function showWord(){if(hasRevealed) return; const isImp=impostors.indexOf(currentPlayer)!==-1; const helperMode=el.helperMode.checked; if(isImp){$('cardText').textContent=(helperMode&&helperWord)?('🤫 '+helperWord):'❌ impostor'; el.screen2Card.className='card revealed impostor';}else{$('cardText').textContent=word; el.screen2Card.className='card revealed';} hasRevealed=true;}
  function nextCard(){if(!hasRevealed){alert('Πρώτα πατήστε την κάρτα.');return;} currentPlayer++; if(currentPlayer>=players) showOrderScreen(); else updateCard();}
  function generateRandomOrder(){const arr=Array.from({length:players},(_,i)=>i); for(let i=arr.length-1;i>0;i--){ const r=randInt(i+1); [arr[i],arr[r]]=[arr[r],arr[i]]; } return arr; }
  function showOrderScreen(){if(randomOrder.length===0) randomOrder=generateRandomOrder(); el.orderList.innerHTML=''; randomOrder.forEach(idx=>{ const li=document.createElement('li'); li.textContent=playerNames[idx]; el.orderList.appendChild(li); }); el.orderPrimaryBtn.textContent=!votingInitialized?'🗳️ Προχώρα σε Ψηφοφορία':'⬅️ Πίσω στη Ψηφοφορία'; showScreen('screenOrder');}
  function startVoting(){votingInitialized=true; showScreen('screen3'); el.votingGrid.innerHTML=''; votes={}; for(let i=0;i<players;i++){votes[i]=0; const btn=document.createElement('button'); btn.className='vote-btn'; btn.innerHTML=playerNames[i]+'<span class="vote-count" id="vc'+i+'">0</span>'; btn.addEventListener('click',()=>{ votes[i]++; $('vc'+i).textContent=votes[i]; $('vc'+i).style.display='flex'; }); el.votingGrid.appendChild(btn);}}
  function finishVoting(){let total=0; for(const k in votes) total+=votes[k]; if(total===0){alert('Καμία ψήφος.');return;} let max=-1,sus=0; for(let i=0;i<players;i++){ if(votes[i]>max){max=votes[i];sus=i;} } const isImp=impostors.indexOf(sus)!==-1; showScreen('screen4'); if(isImp){ el.resultMessage.className='result win'; el.resultMessage.textContent='🎉 ΝΙΚΗ! Βρήκατε impostor!'; for(let i=0;i<players;i++){ if(!impostors.includes(i)) scores[playerNames[i]]=(scores[playerNames[i]]||0)+10; } } else { el.resultMessage.className='result lose'; el.resultMessage.textContent='😈 Οι impostors Κέρδισαν!'; impostors.forEach(idx=>{ scores[playerNames[idx]]=(scores[playerNames[idx]]||0)+20; }); } el.revealWord.textContent=word; el.revealimpostor.textContent=impostors.map(i=>playerNames[i]).join(', '); let list=''; for(let i=0;i<players;i++){ if(votes[i]>0) list+=playerNames[i]+': '+votes[i]+' ψήφοι, '; } const status=isImp?' (impostor ✓)':' (Αθώος ✗)'; el.voteDetails.textContent='Ψηφίστηκε: '+playerNames[sus]+status+' ('+votes[sus]+' ψήφοι) - Όλες: '+list; if(el.helperMode.checked && helperWord){ el.helperInfo.style.display='block'; el.revealHelper.textContent=helperWord; } else { el.helperInfo.style.display='none'; } localStorage.setItem('impostorScores', JSON.stringify(scores)); updateScoreCount(); showScores();}
  function showScores(){const div=el.scoresDiv; div.innerHTML=''; const arr=[]; for(const n in scores) arr.push([n,scores[n]]); arr.sort((a,b)=>b[1]-a[1]); if(!arr.length){ div.innerHTML='<p style="text-align:center;color:#999;font-size:13px;">Δεν υπάρχουν βαθμοί</p>'; return; } arr.forEach((row,i)=>{const item=document.createElement('div'); item.style.display='flex'; item.style.justifyContent='space-between'; item.style.padding='9px 10px'; item.style.background='#fff'; item.style.margin='6px 0'; item.style.borderRadius='8px'; item.style.borderLeft='4px solid #667eea'; item.innerHTML='<span>'+(i===0?'👑 ':'')+row[0]+'</span><span>'+row[1]+' πόντοι</span>'; div.appendChild(item);});}

  function openScoresModal(){ updateScoresModalList(); el.scoresModal.classList.add('active'); document.body.classList.add('modal-open'); }
  function closeScoresModal(){ el.scoresModal.classList.remove('active'); document.body.classList.remove('modal-open'); }
  function updateScoresModalList(){const div=el.scoresModalList; div.innerHTML=''; const arr=[]; for(const n in scores) arr.push([n,scores[n]]); arr.sort((a,b)=>b[1]-a[1]); if(!arr.length){ div.innerHTML='<p style="text-align:center;color:#999;padding:8px;">Δεν υπάρχουν αποθηκευμένοι βαθμοί</p>'; return; } arr.forEach((row,i)=>{const item=document.createElement('div'); item.style.display='flex'; item.style.justifyContent='space-between'; item.style.padding='9px 10px'; item.style.background='#fff'; item.style.margin='6px 0'; item.style.borderRadius='8px'; item.style.borderLeft='4px solid #667eea'; item.innerHTML='<span>'+(i===0?'👑 ':'')+row[0]+'</span><span>'+row[1]+' πόντοι</span>'; div.appendChild(item);});}
  function exportScores(){if(!Object.keys(scores).length){alert('Δεν υπάρχουν βαθμοί!');return;} let csv='Όνομα,Πόντοι\n'; for(const n in scores){csv+='"'+n+'",'+scores[n]+'\n';} const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'}); const link=document.createElement('a'); link.href=URL.createObjectURL(blob); link.download='impostor_scores_'+new Date().toISOString().slice(0,10)+'.csv'; link.click(); alert('✅ Η βαθμολογία εξήχθη επιτυχώς!');}
  function clearScores(){if(!Object.keys(scores).length){alert('Δεν υπάρχουν βαθμοί!');return;} if(confirm('⚠️ Θέλετε σίγουρα να διαγράψετε όλους τους βαθμούς;')){scores={}; localStorage.removeItem('impostorScores'); updateScoreCount(); updateScoresModalList(); alert('✅ Οι βαθμοί διαγράφηκαν επιτυχώς!');}}

  function openHelpModal(){ el.helpModal.classList.add('active'); document.body.classList.add('modal-open'); }
  function closeHelpModal(){ el.helpModal.classList.remove('active'); document.body.classList.remove('modal-open'); }

  // Bindings
  el.scoreBtn.addEventListener('click',openScoresModal);
  el.scoresClose.addEventListener('click',closeScoresModal);
  el.scoresFooterClose.addEventListener('click',closeScoresModal);
  el.exportScoresBtn.addEventListener('click',exportScores);
  el.clearScoresBtn.addEventListener('click',clearScores);
  el.scoresModal.addEventListener('click',e=>{ if(e.target===e.currentTarget) closeScoresModal(); });

  el.helpBtn.addEventListener('click',openHelpModal);
  el.helpClose.addEventListener('click',closeHelpModal);
  el.helpFooterClose.addEventListener('click',closeHelpModal);
  el.helpModal.addEventListener('click',e=>{ if(e.target===e.currentTarget) closeHelpModal(); });

  document.addEventListener('keydown',e=>{ if(e.key==='Escape'){ closeHelpModal(); closeScoresModal(); } });

  el.playersMinus.addEventListener('click',()=>onPlayersChange((parseInt(el.playerCount.value)||6)-1));
  el.playersPlus.addEventListener('click',()=>onPlayersChange((parseInt(el.playerCount.value)||6)+1));
  el.impostorsMinus.addEventListener('click',()=>onimpostorsChange((parseInt(el.impostorCount.value)||1)-1));
  el.impostorsPlus.addEventListener('click',()=>onimpostorsChange((parseInt(el.impostorCount.value)||1)+1));
  el.playerCount.addEventListener('input',e=>onPlayersChange(e.target.value));
  el.impostorCount.addEventListener('input',e=>onimpostorsChange(e.target.value));

  el.namesToggle.addEventListener('click',e=>{ if(e.target!==el.namesToggleBtn){ const active=el.namesSection.classList.toggle('active'); el.toggleIcon.textContent=active?'▼':'▶'; if(active){ updatePlayerInputs(); } } });
  el.namesToggleBtn.addEventListener('click',()=>{ const active=el.namesSection.classList.toggle('active'); el.toggleIcon.textContent=active?'▼':'▶'; if(active){ updatePlayerInputs(); } });

  el.studioToggle.addEventListener('click',e=>{ if(e.target!==el.studioToggleBtn){ const active=el.studio.classList.toggle('active'); el.toggleStudioIcon.textContent=active?'▼':'▶'; if(active){ renderChipbar(); populateGroupSelect(el.catGroupEdit,(currentCatKey?catToGroup[currentCatKey]:'cs')); const first=document.querySelector('#chipbar .chip'); if(first){ first.click(); } } } });
  el.studioToggleBtn.addEventListener('click',()=>{ const active=el.studio.classList.toggle('active'); el.toggleStudioIcon.textContent=active?'▼':'▶'; if(active){ renderChipbar(); populateGroupSelect(el.catGroupEdit,(currentCatKey?catToGroup[currentCatKey]:'cs')); const first=document.querySelector('#chipbar .chip'); if(first){ first.click(); } } });

  el.studioSearch.addEventListener('input',()=>{renderChipbar();renderStudioCard();});
  el.groupFilter.addEventListener('change',()=>{renderChipbar(); if(!currentCatKey){ renderStudioCard(true); }});
  el.catNameEdit.addEventListener('input',markDirty);
  el.catGroupEdit.addEventListener('change',markDirty);
  el.wordsTextarea.addEventListener('input',()=>{updateStudioMeta();markDirty();});
  el.inlineAddBtn.addEventListener('click',inlineAddWord);
  el.saveCatBtn.addEventListener('click',saveCurrentCategory);
  el.saveAllBtn.addEventListener('click',saveAllWords);
  el.resetCatBtn.addEventListener('click',resetCurrentCategory);
  el.removeCatBtn.addEventListener('click',removeCurrentCategory);

  el.newCatBtn.addEventListener('click',newCategoryQuick);
  el.createCatBtn.addEventListener('click',createCategoryFromForm);
  el.cancelCatBtn.addEventListener('click',()=>{ el.newCategoryForm.classList.add('hidden'); });

  el.exportJsonBtn.addEventListener('click',exportConfig);
  el.importJsonBtn.addEventListener('click',triggerImport);

  el.toggleGroupsManagerBtn.addEventListener('click',()=>{ el.groupsManager.classList.toggle('hidden'); if(!el.groupsManager.classList.contains('hidden')){ buildGroupsEditor(); } });
  el.saveGroupsBtn.addEventListener('click',saveGroups);
  el.addNewGroupBtn.addEventListener('click',addNewGroup);

  el.helperMode.addEventListener('change',storeHelperMode);
  el.startBtn.addEventListener('click',startGame);
  el.screen2Card.addEventListener('click',showWord);
  el.nextBtn.addEventListener('click',nextCard);
  el.orderPrimaryBtn.addEventListener('click',()=>{ if(!votingInitialized){ startVoting(); } else { showScreen('screen3'); } });
  el.viewOrderBtn.addEventListener('click',showOrderScreen);
  el.finishVotingBtn.addEventListener('click',finishVoting);
  el.playAgainBtn.addEventListener('click',()=>startGame());
  el.backSetupBtn.addEventListener('click',()=>{ showScreen('screen1'); updateScoreCount(); updateHelperStats(); });

// Add near the end of DOMContentLoaded, after existing bindings:
  // Mobile: hide title on scroll (keep it when page is at top)
  function handleScrollTitleToggle(){
    if (window.matchMedia('(max-width: 480px)').matches) {
      if (window.scrollY > 0) {
        document.documentElement.classList.add('scrolled');  // use <html> element
      } else {
        document.documentElement.classList.remove('scrolled');
      }
    } else {
      // Ensure title remains visible on larger screens
      document.documentElement.classList.remove('scrolled');
    }
  }
  // Initialize and bind
  handleScrollTitleToggle();
  window.addEventListener('scroll', handleScrollTitleToggle);
  window.addEventListener('resize', handleScrollTitleToggle);
//END
  loadCustomConfig(); loadGroups(); loadWordBags(); loadHelperMode();
  updateScoreCount();
  onPlayersChange(el.playerCount.value); onimpostorsChange(el.impostorCount.value);
  updatePlayerInputs(); rebuildCategorySelect(); updateHelperStats();

  const gf=el.groupFilter;
  gf.innerHTML='<option value="">Όλες οι ομάδες</option>';
  groupOrder.forEach(gid=>{ const opt=document.createElement('option'); opt.value=gid; opt.textContent=groups[gid]||gid; gf.appendChild(opt); });
  populateGroupSelect(el.catGroupEdit,'cs');
  if(el.newCatGroup){ populateGroupSelect(el.newCatGroup,'cs'); }
});
