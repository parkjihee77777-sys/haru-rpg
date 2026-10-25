// Japanese and Russian for every word the game teaches: key:[ja, ru]. Loaded after all data files.
// ja: the everyday word a Japanese child uses, in kana; ru: nominative, singular unless the thing is naturally plural.
const JA_RU={
 // Day 1
 dog:['こいぬ','щенок'],mom:['ママ','мама'],notebook:['ノート','тетрадь'],table:['テーブル','стол'],chair:['いす','стул'],
 fridge:['れいぞうこ','холодильник'],box:['はこ','коробка'],shoes:['くつ','кроссовки'],pcase:['ふでばこ','пенал'],pencil:['えんぴつ','карандаш'],
 // Day 2 shared words
 handkerchief:['ハンカチ','платок'],chalk:['チョーク','мел'],umbrella:['かさ','зонтик'],ball:['ボール','мяч'],flag:['はた','флаг'],
 cup:['コップ','стакан'],bread:['パン','хлеб'],apple:['りんご','яблоко'],bag:['リュック','рюкзак'],bench:['ベンチ','скамейка'],
 // Day 2 friends
 radio:['ラジオ','радио'],battery:['でんち','батарейка'],lid:['ふた','крышка'],eraser:['けしゴム','ластик'],pillow:['まくら','подушка'],
 curtain:['カーテン','штора'],tray:['トレー','поднос'],chopsticks:['おはし','палочки'],stopwatch:['ストップウォッチ','секундомер'],bandage:['ほうたい','бинт'],
 sketchbook:['スケッチブック','альбом'],sharpener:['えんぴつけずり','точилка'],trash_can:['ごみばこ','мусорное ведро'],milk_carton:['ぎゅうにゅうパック','пакет молока'],
 hoodie:['パーカー','толстовка'],sheet_music:['がくふ','ноты'],tape:['テープ','скотч'],blackboard:['こくばん','доска'],magnifying_glass:['むしめがね','лупа'],
 ice:['こおり','лёд'],locker:['ロッカー','шкафчик'],mechanical_pencil:['シャーペン','механический карандаш'],cocoon:['さなぎ','куколка'],cart:['カート','тележка'],
 straw:['ストロー','трубочка'],thread:['いと','нитка'],highlighter:['けいこうペン','маркер'],wheelchair:['くるまいす','инвалидная коляска'],wheel:['タイヤ','колесо'],
 whistle:['ふえ','свисток'],
 // Day 3 friends
 goalpost:['ゴール','ворота'],alarm_clock:['めざましどけい','будильник'],lunch_box:['おべんとうばこ','ланчбокс'],tissue:['ティッシュ','бумажные платочки'],
 water_bottle:['すいとう','бутылка'],crayon:['クレヨン','мелки'],clip:['クリップ','зажим'],glue_stick:['スティックのり','клей-карандаш'],coin:['コイン','монетка'],
 earphones:['イヤホン','наушники'],headphones:['ヘッドホン','большие наушники'],payphone:['こうしゅうでんわ','телефон-автомат'],flashlight:['かいちゅうでんとう','фонарик'],
 wallet:['さいふ','кошелёк'],napkin:['ナプキン','салфетка'],scissors:['はさみ','ножницы'],flowerpot:['うえきばち','цветочный горшок'],watering_can:['じょうろ','лейка'],
 fan:['せんぷうき','вентилятор'],bookmark:['しおり','закладка'],cushion:['ざぶとん','сидушка'],speaker:['スピーカー','колонка'],earmuffs:['イヤーマフ','тёплые наушники'],
 colored_pencil:['いろえんぴつ','цветной карандаш'],basket:['かご','корзина'],palette:['パレット','палитра'],paintbrush:['ふで','кисточка'],shelf:['たな','полка'],
 dictionary:['じしょ','словарь'],test_paper:['テスト','контрольная'],drawer:['ひきだし','ящик'],
 // Minho's scenes
 desk:['つくえ','парта'],cat:['ねこ','кошка'],envelope:['ふうとう','конверт'],broom:['ほうき','веник'],paper:['かみ','бумага'],big_dog:['いぬ','собака'],
 milk:['ぎゅうにゅう','молоко'],picture:['え','рисунок'],door:['ドア','дверь'],apron:['エプロン','фартук'],
 // Sua's scenes
 stairs:['かいだん','лестница'],clock:['とけい','часы'],hand:['て','рука'],bowl:['おわん','миска'],glue:['のり','клей'],water:['みず','вода'],window:['まど','окно'],
 // Hangyeol's scenes
 name_tag:['なふだ','бейдж'],line:['れつ','ряд'],hat:['ぼうし','кепка'],rice_cake:['もち','рисовый пирожок'],mask:['おめん','маска'],
 sticker:['シール','наклейка'],hair_tie:['ヘアゴム','резинка'],magnet:['じしゃく','магнит'],spoon:['スプーン','ложка'],poster:['ポスター','плакат'],
 // Siwoo's scenes (ep_siwoo.js)
 ruler:['じょうぎ','линейка'],bean:['まめ','фасоль'],butterfly:['ちょうちょ','бабочка'],calendar:['カレンダー','календарь'],hourglass:['すなどけい','песочные часы'],
 mirror:['かがみ','зеркало'],map:['ちず','карта'],recorder:['リコーダー','блокфлейта'],card:['カード','карточка'],
 moon:['つき','луна'],note:['メモ','записка'],tofu:['とうふ','тофу'],ladle:['おたま','половник'],photo:['しゃしん','фотография'],book:['ほん','книга'],bus:['バス','автобус'],board:['けいじばん','доска объявлений'],
 // Jiho's scenes (ep_jiho.js)
 tape_measure:['メジャー','рулетка'],pen:['ボールペン','ручка'],wrist:['てくび','запястье'],roof:['やね','крыша'],foot:['あし','нога'],
 jump_rope:['なわとび','скакалка'],finger:['ゆび','палец'],knee:['ひざ','колено'],
 // Hyeeun's scenes (ep_hyeeun.js)
 glove:['てぶくろ','перчатка'],key:['かぎ','ключ'],gym_clothes:['たいそうふく','спортивная форма'],toilet:['トイレ','туалет'],soup:['スープ','суп'],school_gate:['こうもん','школьные ворота'],
 // Haneul's scenes (ep_haneul.js); drawer and paintbrush are listed above
 pocket:['ポケット','карман'],tv:['テレビ','телевизор'],textbook:['きょうかしょ','учебник'],cloud:['くも','облако'],paints:['えのぐ','краски'],
 // Junho's scenes (ep_junho.js)
 sock:['くつした','носок'],ankle:['あしくび','лодыжка'],goal:['ゴール','ворота'],bed:['ベッド','кровать'],towel:['タオル','полотенце'],wall:['かべ','стена'],vest:['ビブス','манишка'],band_aid:['ばんそうこう','пластырь'],
 // Yuna's scenes (ep_yuna.js); textbook is listed above
 swing:['ブランコ','качели'],drawing_paper:['がようし','альбомный лист'],tangerine:['みかん','мандарин'],indoor_shoes:['うわばき','сменная обувь']
};
{for(const[k,[ja,ru]]of Object.entries(JA_RU)){LANGS.ja.words[k]=ja;LANGS.ru.words[k]=ru;const w=typeof D2WORDS!=='undefined'&&D2WORDS[k];if(w){w.ja=ja;w.ru=ru}}
 const miss=Object.keys(LANGS.ko.words).concat(Object.keys(LANGS.en.words)).filter(k=>!JA_RU[k]);if(miss.length)console.warn('ja/ru words missing:',[...new Set(miss)])}
