// ---------- one word, the thing THIS scene means (11/05) ----------
// The same word key can be a different thing from scene to scene: a {box} is a milk crate in Hyeeun's hall and a ballot box on voting day,
// a {card} is a winter card in art class and a pack of playing cards on a rainy break, a {glove} is Hyeeun's fingerless wheelchair glove
// and Junho's thick goalkeeper glove. The word (and its sound) stays the same; only the picture follows the story.
// WORDPIC[scene][key] = picture name: items/<name>.png (cut-out) and cards/<name>.jpg (card). A thing laid on the map in the scene with its
// own picture ({lay:[[k,x,y,w,'picture']]}) counts as well. A picture that is not there yet falls back to the word's own picture,
// so a scene can name its picture before it is drawn (list: 검수/다시그릴목록_1105.md 「F」).
const WORDPIC={
 minho_03:{cat:'cat_yellow'},hangyeol_10:{magnet:'magnet_board'},
 siwoo_08:{mirror:'mirror_wall'},
 hyeeun_05:{box:'milk_crate'},hyeeun_08:{box:'milk_crate'},hyeeun_07:{locker:'locker_grid'},minho_12:{box:'milk_crate'},minho_vote:{box:'ballot_box'},
 haram_09:{card:'card_greeting'},seah_08:{card:'cards_play'},
 hangyeol_08:{umbrella:'umbrella_flower'},minho_08:{umbrella:'umbrella_broken'},
 hyeeun_02:{glove:'glove_wheel'},hyeeun_03:{glove:'glove_wheel'},hyeeun_15:{glove:'glove_wheel'},junho_09:{glove:'glove_goalie'},
 hyeeun_01:{wheel:'wheel_chair'},hyeeun_13:{wheel:'wheel_chair'},
 yuna_07:{eraser:'eraser_cloud'},yuna_13:{bag:'bag_yuna'},
 yena_12:{water_bottle:'water_bottle_pink'},
 seah_04:{milk:'milk_strawberry'},
 // junho_11 bag: the plain school bag (owner 11/08: the drawstring gym bag read as a pouch, not 가방)
 junho_10:{water:'water_tap'},jiho_08:{water:'water_tap'},jihoon_11:{water:'water_drops'},
 minho_09:{paper:'paper_crumpled'},junho_07:{paper:'paper_crumpled'},
 minho_07:{ball:'ball_dodge'},siwoo_11:{ball:'ball_dodge'},hangyeol_04:{ball:'ball_dodge'},
 jiho_09:{ice:'ice_pack'},junho_05:{ice:'ice_pack'},
 sua_11:{glue:'glue_stick'},yuna_08:{glue:'glue_stick'},yuna_10:{glue:'glue_stick'},haram_09:{card:'card_greeting',glue:'glue_stick'},
 
 haram_07:{photo:'photo_grandma'},// Haram asks 'is that your grandma?': the photo shows her (owner 11/07)
 junho_04:{stairs:'stairs_down'},seah_07:{stairs:'stairs_down'},sua_01:{stairs:'stairs_down'},// going DOWN the stairs: a card that looks down the steps (owner 11/07)
 hangyeol_01:{thread:'thread_floss'},hangyeol_12:{thread:'thread_floss'}};
// which of those pictures are really there (a list, not a network probe: a missing file would show as a page error).
// When a new picture from list F is added, put its name here (items = cut-out .png, cards = card .jpg).
const PIC_ITEM=new Set(['mirror_wall','photo_grandma','locker_grid','stairs_down','magnet_board', 'cat_yellow', 'ballot_box', 'cards_play', 'glue_stick', 'milk_crate', 'paper_crumpled', 'water_bottle_pink', 'water_drops', 'glove_wheel', 'glove_goalie', 'wheel_chair', 'card_greeting', 'ball_dodge', 'ice_pack', 'umbrella_flower', 'umbrella_broken', 'eraser_cloud', 'milk_strawberry', 'bag_gym', 'water_tap', 'notebook_blue', 'notebook_gray', 'thread_floss']),PIC_CARD=new Set(['mirror_wall','photo_grandma','stairs_down','magnet_board', 'cat_yellow', 'ballot_box', 'glue_stick', 'milk_crate', 'paper_crumpled', 'cards_play', 'water_bottle_pink', 'water_drops', 'photo_cam', 'glove_wheel', 'glove_goalie', 'wheel_chair', 'card_greeting', 'ball_dodge', 'ice_pack', 'umbrella_flower', 'umbrella_broken', 'eraser_cloud', 'milk_strawberry', 'bag_gym', 'water_tap', 'notebook_blue', 'notebook_gray', 'thread_floss']);
let LAYPIC={},LAYPIC_EP=null;const DAYPIC={};
function picOf(k){if(typeof SCENE_EP==='undefined'||!SCENE_EP)return k;if(LAYPIC_EP!==SCENE_EP){LAYPIC={};LAYPIC_EP=SCENE_EP}
 const w=(WORDPIC[SCENE_EP.scene]||{})[k],v=(w&&PIC_ITEM.has(w)&&w)||LAYPIC[k];if(!v||v===k)return k;DAYPIC[k]=v;PIC_ITEM.add(v);return v}// a laid picture is there (it is on the map)
// a thing laid with its own picture: that is how this scene's {k} looks; a laid thing with no picture of its own uses the scene's picture
{const _lay=layThings;layThings=function(lay,clear){
  if(typeof SCENE_EP!=='undefined'&&SCENE_EP&&LAYPIC_EP!==SCENE_EP){LAYPIC={};LAYPIC_EP=SCENE_EP}
  lay=(lay||[]).map(t=>{const i=typeof t[1]==='string'?5:4;if(t[i]){if(t[i]!=='-')LAYPIC[t[0]]=t[i];return t}const v=picOf(t[0]);if(v===t[0])return t;const c=t.slice();while(c.length<i)c.push(undefined);c[i]=v;return c});
  return _lay(lay,clear)}}
// picture trays (my bag, close-ups, two-step finds): the scene's picture for each thing
{const _bag=bagFind;bagFind=function(k,items,goalText,done){const r=_bag(k,items,goalText,done);
  document.querySelectorAll('#mcard .zit').forEach(b=>{const q=b.dataset.k,v=picOf(q),im=b.querySelector('img');if(v===q||!im||!/items\/\w+\.png$/.test(im.getAttribute('src')||'')||im.getAttribute('src')!==`items/${q}.png`)return;
   im.onerror=()=>{im.onerror=()=>b.remove();im.src=`items/${q}.png`};im.src=`items/${v}.png`});return r}}
// cards (the day's word cards): the picture the word had today
{const _card=cardOf;cardOf=function(k){const base=_card(k);if(!base)return base;const v=(typeof SCENE_EP!=='undefined'&&SCENE_EP)?picOf(k):(DAYPIC[k]||k);
  if(v===k)return base;return PIC_CARD.has(v)?`cards/${v}.jpg`:PIC_ITEM.has(v)?`items/${v}.png`:base}}
{const _sd=startDay;startDay=function(n){for(const k in DAYPIC)delete DAYPIC[k];return _sd(n)}}
