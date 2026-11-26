// 조영민 — scenes by meeting (Day N = the Nth meeting with Youngmin; meeting 1 = Day 2). Source: 검수/영민재구성/제미나이_다듬은판.md (새 방향판 11/21, made by 검수/tools/md2ep.py 영민; pictures = 새대본_검토/영민.html)
// Same format as ep_junho.js (loaded after ep_yuna.js). Replaces Youngmin's calendar Day 2 scene.
// Flags (11/21 new script): M05_way (meeting 5 A·D: his blank-space way) / M05_B (5 B: I called it babyish) -> Day 16R;
// M08_wait (8 A·B·D: I let him finish his words) -> Day 16R; M09 (9 A·D: I said I was in a hurry / waited) -> Day 15.
// Places: the classroom (the fish tank on the window sill: Day 3, 11, 12, 13), the library (Day 7, 14), the playground (Day 15 end).
// My own things come out of my bag (tray): notice book (Day 2, 16R), notebook (5), book (7), scissors (10), water bottle (11), colored pencil (12).
window.EP=window.EP||{};
EP.youngmin=[
// ■ Day 2 — 천천히랑 급해 (1)
{title:'천천히랑 급해',scene:'youngmin_n_ym01_lid',place:'class',at:[330,262],with:[['yena',580,330],['jihoon',660,250]],
 pre:[
  {pic:'youngmin_n_ym01_count'},['nar','','아침이다. 아직 수업 전이라 교실이 시끌시끌하다.'],['nar','','그런데 창가 쪽만 조용하다. 창가 낮은 장 위에 작은 어항이 있고, 그 앞에 영민이가 서 있다.'],
  ['youngmin','smile','하나, 둘, 셋, 넷…… 다섯.'],{k:'finger',goal:'「{x}」 보기',bag:['finger','hand','foot','ear','eye']},{pic:'youngmin_n_ym01_count'}, // (11/26 교육과정 어휘) 초급 찾기 추가
  ['nar','','영민이는 어항 유리에 손가락을 대고 {@fish|를} 하나씩 짚으며 세고 있었다. 나도 옆에 가서 섰다.'],
  {k:'fish',goal:'「{x}」 들여다보기',bag:['fish','bucket','cup','water_bottle','book']},
  {pic:'youngmin_n_ym01_count'},['me','surprised','네가 {@fish} 당번이야?'],['youngmin','smile','응. 아침마다 다섯 마리 다 있는지 세. 그리고 밥 줘.'],
  ['youngmin','smile','저기 쟤는 「천천히」. 쟤는 「급해」. 꼬리 짧은 애는 아직 이름이 없어.'],
  {pic:'youngmin_n_ym01_count'},['nar','','어항을 보니 「천천히」가 제일 빨리 쌩쌩 헤엄친다. 「급해」는 물풀 뒤에 숨어서 눈만 껌뻑인다.'],['me','sad','어? 이름이 반대 아니야?'],
  ['youngmin','smile','……거꾸로 지으면 웃기잖아.'],['nar','','나는 그만 웃음이 터졌다. 영민이도 소리 없이 어깨를 들썩였다.'],['youngmin','smile','이제 밥 줄 시간이야. 오늘은 같이 줄래?'],
  ['nar','','영민이가 {@fish} 밥통을 건넸다. 나는 {@lid|을} 오른쪽으로 힘껏 돌렸다. 꼼짝도 안 한다. 두 손으로 꽉 쥐고 또 돌렸다. 그래도 안 열린다.'],
  {pic:'youngmin_n_ym01_lid'},['youngmin','smile','{@lid|은} 「급해」랑 닮았어. 힘만 주면 안 열려.'],['me','surprised','그럼 천천히 돌려야 돼?'],['youngmin','smile','아니, 거꾸로. 반대로 돌려 봐.'],
  ['nar','','나는 왼쪽으로 돌렸다. 딸깍! 한 번에 열렸다.'],
  // (11/25 교육과정 어휘 정비) lid 찾기 뺌: 이야기 단어
  {pic:'youngmin_n_ym01_lid'},['me','smile','열렸다! {@lid}까지 거꾸로네!'],['youngmin','smile','밥은 통 옆을 손가락으로 톡톡톡. 딱 세 번만 쳐. 많이 주면 물이 금방 더러워져.']],
 ask:'어떻게 같이 할까?',
 choices:[
  {k:'A',text:'「내가 밥 줄게. 네가 이름 불러 주고, 다 먹으면 세어 줘.」',pts:{youngmin:2},r:[
   {pic:'youngmin_n_ym01_feed'},['youngmin','smile','좋아. 「천천히」!'],['nar','','영민이가 이름을 부르자 내가 통을 톡 쳤다. 「천천히」가 제일 먼저 쌩 올라왔다. 영민이는 다섯까지 세고 고개를 끄덕였다.']]},
  {k:'B',text:'「내가 다 줄게! 너는 옆에서 구경해.」',pts:{youngmin:1},r:[
   {pic:'youngmin_n_ym01_feed'},['youngmin','smile','그래. 근데 세는 건 당번인 내가 할게. 그래야 다 먹었는지 알 수 있거든.'],['nar','','내가 밥을 주는 동안 영민이가 하나하나 눈으로 셌다. 「다섯 마리 다 먹었어.」'],
   ['think','smile','(신나서 영민이 일까지 다 가져갈 뻔했네. 다음엔 같이 하자고 해야지.)']]},
  {k:'C',text:'「세 번씩 언제 해. 그냥 한꺼번에 부어 버리자!」',pts:{youngmin:0},r:[
   {pic:'youngmin_n_ym01C_yellow_lid'},['nar','','나는 밥통을 확 기울였다.'],
   {pic:'youngmin_n_ym01C_yellow_lid'},['think','smile','(큰일 났다! 물고기들이 다 도망갔어.)'],['me','sad','미안, 내가 너무 급했어. 어떡해?'],
   ['youngmin','smile','괜찮아. 물 위에 뜬 걸 작은 숟가락으로 건지자. 어디 있는지 내가 알려 줄게.'],['nar','','영민이가 「거기, 조금 왼쪽」 하고 차분하게 알려 줬다. 나는 가루를 하나씩 건져 냈다.']]},
  {k:'D',text:'「이름 없는 애한테 이름 지어 주자. 거꾸로! 네가 먼저 해.」',pts:{youngmin:2},r:[
   {pic:'youngmin_n_ym01_feed'},['youngmin','smile','꼬리가 짧으니까…… 「길어」.'],['me','smile','그럼 저기 등 돌린 애는 「안녕」! 인사를 안 하니까.'],
   ['nar','','영민이가 또 소리 없이 웃었다. 우리는 「길어」와 「안녕」에게 밥을 먼저 줬다.']]}],
 post:[
  {only:['A','D'],lines:[{pic:'youngmin_n_ym01_friends_lid'}]},
  {only:['B','C'],lines:[{pic:'youngmin_n_ym01_friends_lid'}]},
  ['nar','','그때 예나와 지훈이가 어항 쪽으로 다가왔다.'],['yena','smile','우와, 물고기다! 얘네 이름도 있어?'],['youngmin','smile','응. 저기 제일 빠른 애가…… 「천천히」야.'],['yena','laugh','하하, 완전 거꾸로네!'],
  ['nar','','모두 영민이가 말을 끝낼 때까지 기다렸다가 같이 웃었다.'],
  {only:['A','D'],lines:[['nar','','우리는 예나와 지훈이에게 {@fish} 이름을 하나씩 알려 주었다.']]},
  {only:['B','C'],lines:[['nar','','물풀 뒤에 있던 「급해」가 맨 마지막으로 나와 밥을 먹었다. 영민이가 작게 말했다. 「끝.」']]}],
 eve:{lead:[['me','smile','{m}, 오늘 영민이가 {@fish} 이름을 거꾸로 지었어. 제일 빠른 애가 「천천히」야!'],['mom','smile','하하, 정말 재밌다. 영민이랑 뭐 했어?']],
  A:[['me','smile','영민이가 이름 부르고 내가 밥 줬어.'],['mom','smile','둘이 일을 나눠서 하니까 더 재밌었겠네.']],
  B:[['me','smile','내가 밥을 다 줬어. 영민이는 옆에서 {@fish} 다섯 마리가 다 먹었는지 셌어.'],['mom','smile','영민이도 하고 싶은 게 있지 않았을까?']],
  C:[['me','smile','밥을 확 부어서 물고기들이 놀랐어. 영민이가 건지는 법을 알려 줘서 같이 건졌어.'],['mom','smile','급하면 손이 먼저 나가기도 하지. 영민이는 당번이라 {@fish|를} 아끼는데, 그때 깜짝 놀랐겠다. 같이 건져서 다행이야.']],
  D:[['me','smile','우리도 거꾸로 지었어. 꼬리 짧은 애는 영민이가 「길어」, 인사 안 하는 애는 내가 「안녕」.'],['mom','smile','하하, 둘이 똑같이 거꾸로 이름을 지었네.']]}},

// ■ Day 3 — 힌트는 하나만 (2)
{title:'힌트는 하나만',scene:'youngmin_n_ym08_point_empty',place:'class',at:[400,870],
 pre:[
  {pic:'youngmin_08a'},['nar','','점심을 먹고 교실로 돌아왔다. 아이들은 거의 다 운동장에 나가 있었다.'],['nar','','빈 교실에 영민이만 앉아 수학 익힘책을 펴고 있었다. 오늘 해 가야 하는 숙제다.'],
  {pic:'youngmin_n_ym08_ask_empty'},['youngmin','smile','……있잖아.'],['nar','','영민이가 나를 먼저 불렀다. 처음이었다. 나는 반가워서 얼른 다가갔다.'],['youngmin','surprised','이거 어떻게 풀어?'],
  ['nar','','익힘책에 {@clock} 그림이 네 개 그려져 있었다. 「몇 시 몇 분인가요?」'],
  {k:'desk',goal:'「{x}」 붙이기',bag:['desk','chair','bag','notebook','book']},
  {pic:'youngmin_n_ym08_ask_empty'},['nar','','나는 내 {@desk|을} 영민이 {@desk} 옆에 딱 붙이고 앉았다.'],
  {pic:'youngmin_n_ym08_point_empty'},['youngmin','surprised','짧은 바늘이 3이랑 4 사이에 있어. 긴 바늘은 8. 근데 이게 3시야, 4시야?'],['youngmin','smile','방과후 교실에서 배웠는데 또 까먹었어.'],
  ['me','smile','나도 한국어 {@clock} 말은 맨날 까먹어. 까먹어도 다시 하면 돼.'],['think','surprised','(나는 답을 바로 알아. 근데 영민이는 「답이 뭐야?」가 아니라 「어떻게 풀어?」라고 물었어.)']],
 ask:'어떻게 같이 할까?',
 choices:[
  {k:'A',text:'「3시 40분. 다음은 6시 15분.」 하고 답만 알려 준다.',pts:{youngmin:1},r:[
   {pic:'youngmin_n_ym08_point_empty'},['nar','','영민이가 그대로 받아 적었다. 금방 끝났다.'],['youngmin','smile','고마워. ……근데 다음 건 내가 풀어 보고 싶어.'],
   ['me','smile','아, 그렇구나! 그럼 짧은 바늘부터 같이 보자. 긴 바늘은 숫자 하나에 5분이야.']]},
  {k:'B',text:'「힌트 하나만 줄게. 짧은 바늘부터 봐.」',pts:{youngmin:2},r:[
   {pic:'youngmin_n_ym08B_workbook_clock'},['youngmin','smile','3이랑 4 사이. 아직 4에 안 닿았으니까…… 3시.'],['youngmin','smile','긴 바늘은 숫자 하나에 5분이랬어. 5, 10, 15…… 40. 3시 40분!'],
   ['nar','','나는 그다음 문제는 말하지 않았다. 대신 내 {@book|을} 펴고 읽었다. 영민이 손은 쳐다보지 않았다.']]},
  {k:'C',text:'「에이, 이것도 몰라? 엄청 쉬운데.」 하고 웃는다.',pts:{youngmin:0},r:[
   {pic:'youngmin_08_C'},['youngmin','sad','……나는 어려워.'],['nar','','영민이가 익힘책을 가슴에 안고 일어나 문 쪽으로 걸어갔다.'],['think','smile','(아차, 내가 웃어 버렸어.)'],
   ['me','sad','잠깐만! 미안해. 나도 한국어 {@clock} 말은 어려운데, 괜히 그렇게 말했어.'],['youngmin','sad','……그럼 다시 같이 해.'],['me','smile','응. 긴 바늘은 숫자 하나에 5분이야.']]},
  {k:'D',text:'「첫 번째 {@clock|는} 내가 소리 내서 풀어 볼게. 두 번째는 네가 해 봐.」',pts:{youngmin:2},r:[
   {pic:'youngmin_n_ym08_D_empty'},['nar','','나는 첫 번째 {@clock|를} 손가락으로 짚으며 한국어로 말했다. 한국어로 말하니까 나도 말이 천천히 나왔다.'],
   ['me','smile','짧은 바늘이 3이랑 4 사이. 그럼 3시. 긴 바늘 8은 5분씩 세면 40분.'],['youngmin','smile','짧은 바늘이 6이랑 7 사이. 6시. 긴 바늘은 3이니까…… 15분.'],
   ['nar','','영민이는 고개를 끄덕이더니 세 번째 {@clock|로} 넘어갔다. 나한테 묻지 않고 혼자 풀었다.']]}],
 post:[
  {only:['A'],lines:[{pic:'youngmin_n_ym08_point_empty'}]},
  {only:['B'],lines:[{pic:'youngmin_n_ym08B_workbook_clock'}]},
  {only:['C'],lines:[{pic:'youngmin_08_C'}]},
  {only:['D'],lines:[{pic:'youngmin_n_ym08_D_empty'}]},
  ['nar','','점심시간이 거의 끝나 갔다. 창밖 운동장에서 아이들이 떠드는 소리가 들렸다.'],
  {pic:'youngmin_08c'},['youngmin','surprised','지금 저 {@clock}, 내가 읽어 봐도 돼?'],['nar','','영민이가 교실 앞 벽시계를 올려다보다가 딱 멈췄다.'],
  ['youngmin','smile','아까 그거…… 긴 바늘 숫자 하나에 몇 분이었지? ……또 물어봐도 돼?'],['me','smile','응. 여러 번 물어봐도 돼. 나도 한국어는 맨날 다시 물어봐.'],
  ['youngmin','sad','……5분. 아, 이제 생각났다! 나는 여러 번 들어야 내 거가 돼.'],
  {k:'clock',goal:'「{x}」 같이 올려다보기',bag:['clock','calendar','window','blackboard','alarm_clock']},
  {pic:'youngmin_08c'},
  {only:['B','D'],lines:[['youngmin','smile','짧은 바늘 12랑 1 사이. 긴 바늘 10. 12시 50분! 나 진짜 {@clock} 읽었다.']]},
  {only:['A','C'],lines:[['youngmin','smile','짧은 바늘 12랑 1 사이. 긴 바늘 10. 12시 50분! 휴, 다시 해 보니까 되네.']]},
  ['me','smile','근데 나는 「3시 40분」을 한국어로 어떻게 읽는지 헷갈려.'],['youngmin','smile','세 시 사십 분. 시는 하나, 둘, 셋으로 읽고, 분은 일, 이, 삼으로 읽어.'],['me','smile','세 시…… 사십 분!'],
  ['youngmin','smile','맞아. 너는 바늘 보는 법, 나는 읽는 법. 하나씩 알려 줬다.']],
 eve:{lead:[['me','smile','{m}, 오늘 영민이가 나한테 {@clock} 보는 법을 물어봤어. 또 물어봐도 되냐고 해서 여러 번 물어봐도 된다고 했어.'],['mom','smile','참 따뜻한 말이네. 그래서 어떻게 도와줬어?']],
  A:[['me','smile','답만 알려 줬더니 다음 건 자기가 풀고 싶대.'],['mom','smile','영민이가 하고 싶은 걸 딱 말해 줬네.']],
  B:[['me','smile','힌트만 줬더니 손가락으로 세면서 혼자 풀었어.'],['mom','smile','힌트 하나면 스스로 해낼 수 있었구나.']],
  C:[['me','sad','「이것도 몰라?」 하고 웃었다가 미안하다고 했어. 그리고 다시 같이 풀었어.'],['mom','smile','너한텐 쉬워 보였구나. 그런데 영민이는 처음으로 너한테 물어본 거였잖아. 그런 말을 들으면 다음엔 묻기가 어려워져. 다시 같이 풀어서 다행이야.']],
  D:[['me','smile','내가 한국어로 천천히 소리 내서 풀었어.'],['mom','smile','둘이 속도를 맞추니까 더 편했겠다.']],
  common:[['me','smile','그리고 나는 영민이한테 한국어로 시간 읽는 법을 배웠어. 세 시 사십 분!'],['mom','smile','둘이 하나씩 주고받았네.']]}},

// ■ Day 4 — 한꺼번에 말고 하나씩 (3)
{title:'한꺼번에 말고 하나씩',scene:'youngmin_03b',place:'class',at:[830,560],with:[['junho',640,470],['haeun',764,0,{top:448}]],
 pre:[
  {pic:'youngmin_n_ym03_group'},['nar','','과학 시간이다. 오늘은 모둠끼리 {@magnet} 실험을 한다. 우리 모둠은 나, 영민이, 하은이, 준호다.'],
  ['nar','','선생님: 「물건에 {@magnet|을} 대 봐요. 붙으면 「붙는다」 칸에, 안 붙으면 「안 붙는다」 칸에 이름을 써요. 다 한 물건은 바구니에 넣고, 기록지에 모둠 이름을 써서 내요. 시간은 15분이에요.」'],
  ['nar','','선생님은 한 번에 쭉 말씀하시고 모둠마다 물건 여덟 개를 나눠 주셨다.'],
  // (11/25 교육과정 어휘 정비) magnet 찾기 뺌: 이야기 단어
  {pic:'youngmin_n_ym03_group'},['nar','','하은이가 {@magnet|을} 집어 클립에 댔다. 철컥! 단번에 붙었다.'],['haeun','smile','클립 붙는다! 영민아, 써!'],
  ['nar','','영민이가 {@pencil|을} 들고 기록지를 내려다봤다.'],['youngmin','smile','잠깐. 「클립」이라고 써, 아니면 「붙는다」라고 써?'],['haeun','smile','아까 선생님이 말했잖아! 「붙는다」 칸에 「클립」이라고!'],
  ['junho','smile','야, 옆 모둠은 벌써 여섯 개나 했대!'],['haeun','smile','우리 완전 늦었어! 내가 다 쓸게, 이리 줘!'],
  {pic:'youngmin_03b'},['nar','','하은이가 영민이 앞에 있던 기록지를 휙 잡아당겼다. {@pencil|이} 또르르 굴러 바닥에 떨어졌다.'],
  {"lay":[["pencil","@youngmin",-70,40,40]]},
  {k:'pencil',goal:'「{x}」 주워 주기'},
  {pic:'youngmin_03b'},
  {"clear":["pencil"]},
  ['nar','','나는 얼른 떨어진 {@pencil|을} 주웠다.'],['youngmin','smile','잠깐. 나는 한꺼번에 들으면 헷갈려. 하나씩 하면 잘해.'],
  ['youngmin','smile','하은아, 너는 {@magnet|을} 대 보고 크게 불러 줘. 나는 듣고 쓸게. 준호는 다음 물건을 건네줘.'],['haeun','smile','내가 쓰는 게 더 빠른데…….'],
  ['youngmin','smile','한 사람이 대 보고, 부르고, 쓰기까지 하면 더 헷갈려.'],['think','smile','(영민이는 자기가 어떻게 하면 잘하는지 알고 있구나.)']],
 ask:'어떻게 같이 할까?',
 choices:[
  {k:'A',text:'주운 {@pencil|을} 영민이에게 건네며 「좋아, 영민이 말대로 나눠서 하자.」',pts:{youngmin:2},r:[
   {pic:'youngmin_n_ym03_work'},['youngmin','smile','고마워. 그럼 시작하자.'],['haeun','sad','……알았어. 클립, 붙는다!']]},
  {k:'B',text:'「나는 뭐 하지……. 그냥 보고 있을게.」 하고 {@pencil|을} 영민이 쪽 {@desk}에 놓는다.',pts:{youngmin:1},r:[
   {pic:'youngmin_03b'},['haeun','smile','그럼 너는 다 쓴 물건을 바구니에 넣어 줘.'],['me','sad','……응.'],['think','smile','(나도 할 일을 먼저 말해 볼걸.)']]},
  {k:'C',text:'「시간 없으니까 하은이가 혼자 다 써.」',pts:{youngmin:0},r:[
   {pic:'youngmin_03b'},['nar','','하은이가 혼자 {@magnet|을} 대고, 부르고, 썼다. 너무 서두르다가 칸이 한 줄씩 밀려 버렸다.'],['haeun','smile','어? 나무젓가락이 왜 「붙는다」에 있지?'],
   ['youngmin','smile','그래서 나누자고 한 거야.'],['me','sad','미안해. 영민이가 정한 걸 내가 바꿔 버렸어. 영민이가 쓰자.']]},
  {k:'D',text:'{@clock|를} 보고 「5분마다 내가 시간 알려 줄게.」',pts:{youngmin:2},r:[
   {pic:'youngmin_03b'},['junho','smile','오, 좋다! 그럼 물건은 내가 건넬게!'],['haeun','smile','그럼 내가 대 보고 부를게.']]}],
 post:[
  {pic:'youngmin_n_ym03_work'},['nar','','하은이가 부르면 영민이가 썼다. 한 번에 하나씩. 기록지가 한 줄씩 차곡차곡 찼다.'],['nar','','그러다 영민이가 {@eraser} 칸에 「붙는다」를 잘못 썼다.'],
  ['youngmin','smile','어, 내가 틀렸네. {@eraser|는} 안 붙어. 고칠게.'],{k:'eraser',goal:'「{x}」 건네기',bag:['eraser','pencil','scissors','glue','paper']},{pic:'youngmin_n_ym03_work'}, // (11/26 교육과정 어휘) 초급 찾기 추가
  ['nar','','우리 모둠은 다른 모둠보다 조금 늦게 끝났다. 그래도 틀린 칸은 하나도 없었다.'],
  ['haeun','sad','영민아, 기록지 휙 당긴 거 미안해. 「아까 말했잖아」 한 것도.'],['youngmin','smile','응. 내가 다시 물어보면, 한 번만 더 말해 줘. 그럼 돼.'],['haeun','smile','알았어. 다음엔 시작하기 전에 누가 뭘 할지 정하자.']],
 eve:{lead:[['me','smile','{m}, 과학 시간에 선생님이 실험 방법을 한 번에 쭉 말씀하셨어. 영민이가 뭐라고 쓰냐고 다시 물었는데, 하은이가 「아까 말했잖아!」 하고 기록지를 가져갔어.'],['mom','smile','저런. 영민이는 어떻게 했어?'],
   ['me','smile','영민이는 한꺼번에 들으면 헷갈린대. 그래서 하은이가 부르고 자기가 쓰자고 했어.'],['mom','smile','자기한테 맞는 방법을 알고 말했구나.']],
  A:[['me','smile','나는 {@pencil|을} 주워 주고, 영민이 말대로 나누자고 했어.'],['mom','smile','영민이가 정한 걸 같이 밀어 줬구나.']],
  B:[['me','smile','나는 뭘 할지 몰라서 그냥 보고 있었어. 하은이가 바구니 정리를 시켜서 그것만 했어.'],['mom','smile','할 일이 안 보이면 멈칫하게 되지. 다음엔 「나는 뭐 할까?」 하고 먼저 물어봐.']],
  C:[['me','sad','시간이 없어서 하은이 혼자 쓰라고 했어. 그랬더니 칸이 밀렸어. 미안하다고 하고 영민이가 쓰기로 했어.'],['mom','smile','급해서 그랬구나. 그런데 영민이가 맡겠다고 한 일을 네가 바꿔 버린 거잖아. 다시 돌려줘서 다행이야.']],
  D:[['me','smile','내가 5분마다 시간을 알려 줬어.'],['mom','smile','네가 할 일을 스스로 찾았구나.']]}},

// ■ Day 5 — 나머지는 나중에 (4)
{title:'나머지는 나중에',scene:'youngmin_04b',place:'class',at:[400,870],with:[['jihoon',1480,260]],
 pre:[
  {pic:'youngmin_04b'},['nar','','수학 시간에 새로 배운 방법으로 {@notebook}에 문제 네 개를 풀었다. 그런데 다 풀기 전에 땡, 종이 울렸다.'],['nar','','선생님: 「다 못 푼 사람은 쉬는 시간에 해도 되고, 나중에 해도 돼요.」'],
  {k:'notebook',goal:'「{x}」 펴기',bag:['pcase','notebook','notice_book','textbook','water_bottle']},
  {pic:'youngmin_04b'},['nar','','나는 내 {@notebook|을} 폈다. 네 문제를 겨우 다 풀었다.'],
  ['nar','','반 아이들은 거의 다 풀었다. 옆자리 영민이 {@notebook}에는 두 문제가 반듯하게 쓰여 있었다. 셋째 문제부터는 새 방법이 아직 헷갈리는 것 같았다.'],['nar','','아이들은 벌써 우르르 운동장으로 뛰어나갔다.'],
  ['junho','smile','영민아, 구름사다리 가자! 오늘은 줄 하나도 없어! 빨리!'],['yena','smile','같이 가자! 밖이 엄청 시원해!'],
  ['nar','','영민이는 {@notebook|을} 한 번 보고, 창밖 운동장도 한 번 보았다. 지금 풀까, 나중에 풀까 고민하는 얼굴이었다.'],['youngmin','smile','새로 배운 거, 나는 아직 잘 모르겠어. 지금 안 하면 까먹을까 봐.'],
  ['youngmin','smile','근데 구름사다리도 타고 싶어. 어떻게 할지 잠깐 생각할게.'],['think','sad','(나는 다 풀었으니까 지금 당장 뛰어나가고 싶은데…….)']],
 ask:'어떻게 같이 할까?',
 choices:[
  {k:'A',text:'「어떻게 할래? 풀 거면 기다리고, 나갈 거면 같이 나갈게.」',pts:{youngmin:2},r:[
   {pic:'youngmin_04b'},['nar','','영민이가 {@notebook|을} 한 번 내려다보더니, 숨을 한 번 골랐다.']]},
  {k:'B',text:'「나는 구름사다리 타고 싶어서 먼저 갈게. 정하면 나와.」',pts:{youngmin:2},r:[
   {pic:'youngmin_04b'},['youngmin','smile','응. 금방 나갈 수도 있어. 내가 정하고 나갈게.']]},
  {k:'C',text:'「나중에 하면 되지. 가자!」 하고 영민이 {@notebook|을} 덮는다.',pts:{youngmin:0},r:[
   {pic:'youngmin_04b'},['youngmin','sad','……그건 내 {@notebook|이야}. 내가 정할게.'],['think','smile','(아차, 내가 너무 급했다. 같이 놀고 싶어서 그랬는데.)'],['me','sad','어…… 미안해. 다시 열어 줄게.']]},
  {k:'D',text:'같이 가고 싶은데 말은 못 하고, 문 쪽을 자꾸 보며 영민이 옆에 서 있다.',pts:{youngmin:1},r:[
   {pic:'youngmin_04b'},['youngmin','smile','너 자꾸 문 쪽 보네. 나가고 싶으면 말해도 돼.'],['think','smile','(들켰다. 그냥 말할걸.)'],['me','smile','응…… 사실 빨리 나가고 싶었어.']]}],
 post:[
  {pic:'youngmin_04b'},['nar','','영민이가 세 번째 문제를 {@pencil} 끝으로 톡톡 쳤다. 그리고 고개를 들었다.'],['youngmin','smile','나머지는 나중에. 문제는 다리가 없어서 안 도망가.'],
  ['youngmin','smile','점심 먹고 두 문제 풀 거야. 지금은 구름사다리!'],['youngmin','smile','점심에 풀다가 모르는 게 나오면, 화요일 방과후 교실에서 물어보면 돼.'],
  {only:['A','C','D'],lines:[{pic:'youngmin_n_ym04_bookmark'}]},
  {only:['B'],lines:[{pic:'youngmin_n_ym04_bookmark'}]},
  ['nar','','영민이가 다음에 풀 곳에 거북이 책갈피를 쏙 끼우고 웃었다.'],
  {k:'chair',goal:'「{x}」 밀어 넣기',bag:['chair','desk','bag','pcase','water_bottle']},
  {pic:'youngmin_n_ym04_bookmark'},
  {only:['A','C','D'],lines:[['nar','','영민이도 나도 {@chair|를} {@desk} 안으로 쓱 밀어 넣었다.'],['youngmin','smile','가자!']]},
  {only:['B'],lines:[['nar','','나는 {@chair|를} {@desk} 안으로 쓱 밀어 넣고 먼저 나갔다.']]},
  {only:['A','C','D'],lines:[{pic:'youngmin_n_ym04d_tall'},['nar','','영민이가 나보다 먼저 운동장으로 뛰어나갔다.']]},
  {only:['B'],lines:[{pic:'youngmin_n_ym04d_tall'},['nar','','조금 뒤, 영민이도 {@chair|를} 밀어 넣고 운동장으로 뛰어나왔다.']]},
  {pic:'youngmin_n_ym04_monkeybars'},['nar','','운동장 구름사다리 앞에 준호와 예나가 기다리고 있었다.'],['nar','','영민이는 긴 팔로 구름사다리를 성큼성큼 건넜다. 「하나, 둘……」 예나도 옆에서 신나게 같이 셌다.'],
  {only:['A'],lines:[['youngmin','smile','다음엔 {@notebook} 먼저 끝내고 올지도 몰라. 그건 그때 가서 내가 정할게.'],['me','smile','응. 그땐 내가 기다릴게.']]},
  {only:['D'],lines:[['me','smile','다음엔 나가고 싶으면 바로 말할게.'],['youngmin','smile','응. 그래야 나도 알아.']]},
  {pic:'youngmin_n_ym04_lunch'},['nar','','점심을 먹고 교실에 돌아오니, 영민이가 벌써 {@notebook|을} 펴고 있었다. 거북이 책갈피를 끼워 둔 곳이었다.'],
  ['nar','','영민이는 세 번째 문제를 차근차근 풀었다. 그런데 네 번째 문제에서 {@pencil|이} 딱 멈췄다.'],['youngmin','smile','이건 모르겠어. 동그라미 쳐 두고 화요일에 물어볼래.'],
  ['youngmin','smile','하나는 풀었고, 하나는 물어볼 거야. ……끝.'],
  {only:['A','D'],lines:[['nar','','영민이가 푸는 동안, 나는 옆자리에서 내 {@book|을} 읽고 있었다.']]},
  {only:['B','C'],lines:[['me','smile','와, 진짜 점심때 푸네.'],['youngmin','smile','내가 정한 거니까.']]}],
 eve:{lead:[['me','smile','{m}, 영민이가 새로 배운 수학이 아직 헷갈려서 문제를 반만 풀었어. 그래도 운동장에 나가서 놀았어. 그리고 점심때 진짜로 풀었어! 모르는 한 문제는 화요일에 물어본대.'],
   ['mom','smile','스스로 정하고, 정한 대로 했구나. 모르는 건 물어보면 되고.']],
  A:[['me','smile','어떻게 할 거냐고 물었더니 「나중에」 했어.'],['mom','smile','먼저 물어보니까 영민이가 정할 수 있었네.']],
  B:[['me','smile','나는 구름사다리 타고 싶다고 하고 먼저 나갔어. 영민이는 정하고 나왔어.'],['mom','smile','네가 하고 싶은 건 말하고, 정하는 건 영민이한테 맡겼구나. 그래서 둘 다 하고 싶은 걸 했네.']],
  C:[['me','sad','내가 {@notebook|을} 덮었더니 영민이가 「내가 정할게」 했어. 같이 놀고 싶었거든. 그래서 미안하다고 하고 다시 열어 줬어.'],
   ['mom','smile','같이 놀고 싶었던 건 알아. 그래도 {@notebook|을} 덮을지 말지는 영민이가 정하는 거야. 다시 열어 줘서 영민이도 안심했겠다.']],
  D:[['me','smile','나가고 싶었는데 말을 못 하고 문만 봤어. 영민이가 먼저 알아챘어.'],['mom','smile','영민이를 두고 가기 미안했구나. 너도 나가고 싶다고 말해도 돼.']]}},

// ■ Day 6 — 이번엔 내가 (5)
{title:'이번엔 내가',scene:'youngmin_n_ym05_stuck',place:'class',at:[400,870],with:[['jihoon',1150,600],['sua',800,430],['junho',900,700],['yena',1300,450]],flag:{M05_way:{A:1,D:1},M05_B:{B:1}},
 pre:[
  {pic:'youngmin_n_ym05b_tall'},['nar','','국어 시간이다. 선생님이 {@desk}보다 훨씬 긴 {@paper} 한 장을 들고 오셨다.'],['nar','','선생님: 「오늘은 우리 반이 다 같이 이야기 하나를 만들어요.」'],
  ['nar','','선생님: 「첫 문장은 선생님이 썼어요. 「우리 반 어항에 {@fish} 다섯 마리가 산다.」」'],['nar','','선생님: 「{@paper|가} 오면 앞 사람 글을 읽고, 이어지는 문장을 하나 써요. 그리고 옆 사람에게 넘겨요.」'],
  {k:'paper',goal:'「{x}」 받기',bag:['paper','notebook','book','eraser','pencil']},
  {pic:'youngmin_n_ym05b_tall'},['nar','','긴 {@paper|가} {@desk}에서 {@desk|으로} 돌았다. 이야기가 한 줄씩 길어졌다.'],
  ['nar','','영민이 차례가 왔다. 영민이는 앞사람 글을 손가락으로 짚으며 두 번 읽었다. 그리고 「「천천히」가 제일 먼저 헤엄쳐 왔다.」라고 반듯하게 썼다. 그리고 작게 「끝.」 하고 나에게 넘겼다.'],
  ['nar','','이제 내 차례다. 나는 「물고기들이 밥을 먹으러 위로……」 하고 이어 쓰고 싶었다.'],['think','sad','(「올라왔다」라고 쓰고 싶은데…… 한국어 글자가 생각이 안 나!)'],
  {pic:'youngmin_n_ym05_stuck'},['nar','','내 {@pencil|이} {@paper} 위에서 딱 멈췄다. 뒤에 서 있는 아이들이 {@paper|를} 보며 기다렸다.'],['junho','smile','어떡해? 시간 없는데 그냥 건너뛰자!'],
  ['yena','smile','맞아, 다음 사람 먼저 줘!'],['think','sad','(다들 나를 보고 있어. 손에 땀이 나…….)'],['youngmin','smile','잠깐.'],
  ['youngmin','smile','빈칸 남기고 나중에 써도 돼. 나도 맞는 말이 늦게 떠오를 때가 많아. 그럴 때 그렇게 해.'],['me','surprised','빈칸?'],
  ['youngmin','smile','응. 모르는 글자는 동그라미만 그리고 넘겨. {@paper|가} 한 바퀴 돌고 오면 그때 {@eraser|로} 지우고 쓰면 돼.']],
 ask:'어떻게 같이 할까?',
 choices:[
  {k:'A',text:'「영민아, 어떻게 하는지 보여 줄래?」',pts:{youngmin:2},r:[
   {pic:'youngmin_n_ym05A_scroll'},['youngmin','smile','응. {@pencil|로} 작게, 이만큼.'],['nar','','영민이가 {@paper} 귀퉁이에 동그라미를 작게 그려 보였다. 나도 내 칸에 똑같이 따라 그렸다.']]},
  {k:'B',text:'「동그라미? 그건 아기들이나 하는 거야.」 하고 고개를 돌린다.',pts:{youngmin:0},r:[
   {pic:'youngmin_n_ym05_stuck'},['youngmin','sad','……나는 그렇게 해.'],['nar','','영민이 목소리가 작아졌다. 내 얼굴이 확 뜨거워졌다.'],['think','smile','(아차, 내가 너무 심하게 말했어.)'],
   ['me','sad','미안해. 글자를 몰라서 창피했어. ……나도 동그라미 그려 볼게.']]},
  {k:'C',text:'「나 이 글자 모르겠어. 속상해. 그냥 건너뛰자.」 하고 {@paper|를} 옆으로 민다.',pts:{youngmin:1},r:[
   {pic:'youngmin_n_ym05_stuck'},['youngmin','sad','속상하겠다. 건너뛰어도 돼.'],['youngmin','smile','근데 빈칸을 남기면 네 자리가 남아. 나중에 쓸 수 있어.'],['me','sad','……그럼 동그라미 그릴게.']]},
  {k:'D',text:'「조금만 기다려 줘. 빈칸 만들고 나중에 채울게.」',pts:{youngmin:2},r:[
   {pic:'youngmin_n_ym05_stuck'},['junho','smile','오, 그래! 그럼 나 먼저 쓸게.'],['youngmin','smile','나중에 내 {@eraser} 빌려줄게.']]}],
 post:[
  {pic:'youngmin_n_ym05e_brush_junho'},['nar','','나는 동그라미를 하나 쓱 그리고 {@paper|를} 넘겼다.'],
  ['nar','','{@paper|가} 교실을 한 바퀴 도는 동안, 나는 친구들이 읽는 문장을 귀 기울여 들었다. 누군가 「올라왔다」라고 크게 읽었다. 바로 그 낱말이었다!'],
  {k:'eraser',goal:'「{x}」 꺼내기',bag:['eraser','pencil','pcase','paper','book']},{pic:'youngmin_n_ym05e_brush_junho'}, // (11/26 교육과정 어휘) 초급 찾기 추가
  ['nar','','{@paper|가} 다시 내 앞에 왔다. 나는 동그라미를 {@eraser|로} 쓱쓱 지우고 「올라왔다」를 꼭꼭 눌러 썼다.'],['think','smile','(내가 쓴 거야. 내 글자야!)'],
  ['nar','','영민이와 나는 {@eraser} 가루를 손으로 모아 같이 쓰레기통에 털었다.'],['nar','','{@paper|가} 한 바퀴 더 돌아 영민이 차례가 다시 왔다. 영민이가 {@pencil|을} 멈추고 잠깐 고민했다.'],
  ['me','smile','아까 네가 알려 준 것처럼 빈칸 남기고 나중에 써.'],['youngmin','sad','……응. 그러면 되지.'],['junho','sad','아까 건너뛰자고 해서 미안해.'],
  {only:['A','B','D'],lines:[['me','sad','응. 그때 좀 속상했어.']]},
  {only:['C'],lines:[['me','smile','나도 건너뛰자고 했는걸. 괜찮아.']]},
  {only:['A','D'],lines:[['junho','smile','다음엔 기다릴게.']]},
  {only:['B','C'],lines:[['nar','','영민이가 {@eraser|를} 반으로 뚝 잘라 나에게 줬다. 「다음에 빈칸 지울 때 써.」']]},
  {pic:'youngmin_n_ym05d_tall'},['nar','','긴 {@paper|가} 글씨로 꽉 찼다. 선생님이 우리 반 이야기를 처음부터 소리 내어 읽으셨다. 교실에 웃음소리가 퍼졌다.']],
 eve:{lead:[['me','smile','{m}, 오늘 반 친구들이랑 긴 {@paper}에 이야기를 이어 썼어. 내 차례에 글자가 안 떠올라서 딱 멈췄어.'],['mom','smile','그때 어땠어?']],
  A:[['me','smile','얼굴이 뜨거웠어. 그래서 영민이한테 보여 달라고 했어. 영민이가 모르는 글자는 동그라미만 그려 두고 나중에 쓰면 된대. 그렇게 했어.'],['mom','smile','모를 때 부탁하는 건 부끄러운 게 아니야.']],
  B:[['me','sad','영민이가 모르는 글자는 동그라미만 그려 두라고 했는데, 내가 아기들이나 하는 거라고 했어. 창피해서 그랬어. 바로 미안하다고 했어.'],
   ['mom','smile','창피할 땐 그런 말이 나오기도 하지. 그런데 영민이는 자기 방법을 알려 주려다 그 말을 들었잖아. 미안하다고 하고 너도 해 봤으니, 영민이도 네 마음을 알았을 거야.']],
  C:[['me','sad','속상해서 건너뛰자고 했어. 영민이가 「속상하겠다」 해 줬어.'],['mom','sad','영민이가 네 속상한 마음부터 알아 줬구나.']],
  D:[['me','smile','조마조마했어. 그래서 기다려 달라고 하고 나중에 채웠어.'],['mom','smile','기다려 달라고 말하는 것도 큰 용기야.']],
  common:[['me','smile','나중에 영민이가 쓰다가 멈췄을 때, 「동그라미 그리고 넘겨」 하고 내가 다시 말해 줬어.'],['mom','smile','영민이한테 배운 걸 영민이한테 다시 알려 줬구나.']]}},

// ■ Day 7 — 그 책 또 빌려 (6)
{title:'그 책 또 빌려',scene:'youngmin_06b',place:'library',at:[700,420],with:[['jiho',860,560]],
 pre:[
  {pic:'youngmin_06a'},['nar','','도서관 수업이다. 다 읽은 {@book|을} 돌려주고, 새 {@book|을} 빌리는 시간이다.'],
  {k:'book',goal:'「{x}」 반납 상자에 넣기',bag:['book','notebook','pcase','water_bottle','notice_book']},
  {pic:'youngmin_06a'},['nar','','나는 다 읽은 그림책을 반납 상자에 넣었다. 그리고 새 {@book|을} 고르러 {@bookshelf} 사이로 걸어갔다.'],
  ['nar','','영민이가 맨 아래 칸 앞에 쪼그려 앉아 있었다. 손에는 「우주로 간 거북이」가 들려 있었다.'],['youngmin','smile','이거 또 빌릴 거야. 벌써 세 번째.'],
  ['youngmin','smile','나는 한 번 읽으면 다 생각이 안 나. 두 번째에 무슨 이야기인지 알았어. 세 번째가 제일 재밌어.'],['nar','','영민이 독서 기록장을 보니, 같은 제목이 두 줄이나 반듯하게 적혀 있었다.'],
  {pic:'youngmin_06'},['nar','','그때 지호가 {@bookshelf} 사이로 쑥 들어왔다. 지호가 영민이 기록장을 들여다봤다.'],['jiho','surprised','어? 영민아, 그 {@book} 또 빌려? 아예 네 이름 써 놓지 그래?'],
  {pic:'youngmin_06b'},['jiho','smile','그거 2학년 {@book} 아니야? 표지에 거북이 그려져 있잖아.'],['nar','','옆 칸 아이 둘이 킥킥거렸다. 영민이가 {@book|을} 가슴에 꼭 안았다. 귀까지 빨개졌다.'],
  ['youngmin','sad','……세 번째 맞아. 좋은 {@book|은} 몇 학년 책이든 상관없어.'],['jiho','smile','에이, 뭐야. 그래도 이제 다른 {@book} 읽어.'],
  ['youngmin','smile','나는 이 {@book|이} 좋아. 좋아하는 {@book|은} 여러 번 읽어도 돼.'],['think','smile','(영민이 얼굴이 빨개졌어. 세 번이나 빌리면, 정말 좋은 책인가 봐.)']],
 ask:'어떻게 같이 할까?',
 choices:[
  {k:'A',text:'「세 번이나 빌릴 만큼 좋아? 어디가 제일 좋아?」',pts:{youngmin:2},r:[
   {pic:'youngmin_n_ym06C_tall'},['youngmin','sad','……여기. 거북이가 우주선 창문 밖을 보는 장면.'],['youngmin','smile','다른 동물은 다 금방 돌아왔어. 거북이만 끝까지 갔어.'],
   ['youngmin','smile','이번엔 그림도 보려고 빌려. 이 페이지에 별이 백열두 개야.'],['jiho','smile','헉, 백열두 개?'],['youngmin','smile','하나씩 다 세어 봤어.']]},
  {k:'B',text:'「지호야, 그만해!」 하고 큰 소리로 말한다.',pts:{youngmin:1},r:[
   {pic:'youngmin_n_ym06B_tall'},['nar','','사서 선생님: 「쉿! 도서관에서는 조용히 해요.」'],['nar','','도서관 아이들이 다 우리 쪽을 쳐다봤다. 내 얼굴이 화끈거렸다.'],
   ['youngmin','sad','……나도 말할 수 있었어. 그래도 고마워.']]},
  {k:'C',text:'지호 말에 같이 킥킥 웃는다. 「진짜 또 그거야?」',pts:{youngmin:0},r:[
   {pic:'youngmin_06b'},['nar','','영민이가 {@book|을} 더 꼭 안았다. 고개가 푹 숙여졌다.'],['youngmin','sad','……너도 웃어?'],
   ['think','smile','(아차. 영민이는 이 {@book|이} 정말 좋은데, 나까지 같이 웃어 버렸어.)'],['me','sad','미안해. 웃으면 안 되는 거였어. 나도 좋아하는 {@book|은} 여러 번 읽어.'],['youngmin','smile','……응.']]},
  {k:'D',text:'「나도 그 {@book} 읽어 볼래. 한국어 {@book|은} 아직 그림 많은 게 좋아.」',pts:{youngmin:2},r:[
   {pic:'youngmin_06_D'},['youngmin','sad','……나 읽는 데 오래 걸려. 다 읽을 때까지 기다려야 해.'],['me','smile','응, 기다릴게. 다 읽으면 말해 줘. 그다음에 내가 빌릴게.'],
   ['jiho','smile','어, 나도 그다음에 빌려도 돼? 보니까 표지 거북이 좀 귀엽다.']]}],
 post:[
  {pic:'youngmin_n_ym06c_jiho_line'},['nar','','빌릴 {@book|을} 고른 아이들이 사서 선생님 {@desk} 앞에 줄을 섰다. 영민이가 거북이 {@book|을} 내밀었다.'],
  ['nar','','사서 선생님: 「세 번째구나. 이 {@book|이} 정말 좋은가 보네.」'],['nar','','영민이 귀가 또 빨개졌다. 그래도 입꼬리는 슬쩍 올라가 있었다.'],
  {k:'bookshelf',goal:'「{x}」 정리하기',bag:['bookshelf','desk','chair','book','bag']},
  {pic:'youngmin_n_ym06c_jiho_line'},['nar','','나가기 전에 나는 꺼냈던 {@book|을} {@bookshelf}에 반듯하게 꽂아 두었다.'],['nar','','도서관을 나오는데 지호가 영민이 옆으로 슬쩍 다가왔다.'],
  ['jiho','smile','영민아, 아까 미안해. 나는 생각하기 전에 말이 먼저 나와. 그 {@book|은} 놀릴 일이 아니었어.'],['youngmin','sad','……응. 근데 「2학년 {@book}」이라고 한 건 좀 그랬어.'],
  ['jiho','sad','알았어. 진짜 미안해.']],
 eve:{lead:[['me','smile','{m}, 도서관에서 영민이가 같은 {@book|을} 세 번째 빌렸어. 지호가 놀렸는데 영민이가 차분하게 자기 생각을 말했어.'],['mom','smile','좋아하는 {@book|을} 놀리면 속상하지. 그때 너는 어떻게 했어?']],
  A:[['me','smile','어디가 좋냐고 물었더니 {@book} 한 페이지에 별이 백열두 개래. 다 세어 봤대!'],['mom','laugh','좋아하는 걸 물어봐 주면 신나게 말하게 되지.']],
  B:[['me','smile','지호한테 「그만해!」 하고 크게 말했더니 사서 선생님이 쉿 했어.'],['mom','smile','영민이 편을 들어 주고 싶었구나. 도서관에서는 어떻게 말하면 좋았을까?']],
  C:[['me','sad','지호 말에 나도 같이 웃었어. 「진짜 또 그거야?」 했어. 영민이가 「너도 웃어?」 해서 미안하다고 했어.'],['mom','sad','다들 웃으니까 너도 따라 웃었구나. 그런데 영민이는 너까지 웃어서 더 속상했을 거야. 바로 미안하다고 해서 다행이야.']],
  D:[['me','smile','나도 그 {@book} 읽고 싶다고 했어.'],['mom','smile','네 말 듣고 영민이가 참 기뻤겠다.']]}},

// ■ Day 8 — 내가 읽을게 (7)
{title:'내가 읽을게',scene:'youngmin_n_ym07n_jiho_reads',place:'class',at:[400,870],with:[['jiho',600,760]],
 pre:[
  {pic:'youngmin_n_ym07_piles'},['nar','','수학 시간이다. 오늘은 {@clock} 문제를 푼다. 선생님이 교탁 위에 {@worksheet|를} 세 더미 올려 두셨다.'],
  ['nar','','선생님: 「그림이 많은 것, 문장으로 된 것, 그리고 도전 문제예요. 마음에 드는 걸 골라 가요.」'],['nar','','선생님: 「{@clock} 긴바늘이 4에 오면 끝이에요.」'],
  {k:'worksheet',goal:'「{x}」 고르기',bag:['worksheet','paper','notebook','book','notice_book']},
  {pic:'youngmin_n_ym07_piles'},['nar','','나는 그림이 큰 {@worksheet|를} 골랐다. 영민이는 문장으로 된 걸 집었다.'],['youngmin','smile','거북이 이야기가 나와서 골랐어.'],
  ['jiho','smile','나는 무조건 도전! 별 그려진 거!'],
  {k:'clock',goal:'「{x}」 보기',bag:['clock','calendar','window','blackboard','alarm_clock']},
  {pic:'youngmin_n_ym07_piles'},['nar','','나는 {@blackboard} 위 {@clock|를} 올려다보았다. 긴바늘은 아직 12 근처였다.'],
  {pic:'youngmin_n_ym07n_jiho_reads'},['nar','','교실이 조용해졌다. 사각사각 {@pencil} 소리만 들렸다.'],['nar','','영민이는 문제를 손가락으로 한 줄씩 짚으며 읽었다. 한 줄을 읽고, 다시 처음으로 돌아가 또 읽었다.'],
  ['nar','','긴바늘이 2에 왔을 때, 지호가 다 푼 {@worksheet|를} 들고 영민이 자리로 왔다.'],['jiho','smile','다 했다! 영민아, 너 아직 1번이야? 내가 읽어 줄게.'],
  ['jiho','smile','「거북이가 2시 40분에 집을 나와서 30분 동안 걸었습니다. 몇 시에 도착했을까요?」'],['nar','','지호는 아주 빠르게 읽었다. 영민이 손가락이 줄 한가운데에서 멈췄다.'],['youngmin','sad','……잠깐. 지금 어디까지 했어?'],
  ['think','smile','(지호는 도와주려는 건데, 영민이 얼굴이 굳었어.)']],
 ask:'어떻게 같이 할까?',
 choices:[
  {k:'A',text:'지호한테 「잠깐, 영민이한테 먼저 물어보자.」',pts:{youngmin:2},r:[
   {pic:'youngmin_n_ym07n_jiho_reads'},['me','surprised','영민아, 지호가 읽어 주는 거 괜찮아?'],['youngmin','smile','아니. 내가 읽을게. 읽다가 모르면 그때 물어볼게.'],
   ['jiho','smile','아, 그래? 알았어. 모르면 불러!']]},
  {k:'B',text:'아무 말 없이 영민이와 지호를 번갈아 본다.',pts:{youngmin:1},r:[
   {pic:'youngmin_n_ym07n_jiho_reads'},['nar','','지호는 2번까지 읽어 버렸다. 영민이가 {@pencil|을} 내려놓았다.'],['youngmin','smile','지호야, 나 혼자 읽고 싶어. 너무 빨라서 하나도 못 알아들었어.'],
   ['jiho','sad','어, 미안! 몰랐어.'],['think','smile','(나도 「잠깐」 한마디 해 볼걸.)']]},
  {k:'C',text:'「맞아, 지호가 다 읽어 주면 빨리 끝나겠다!」',pts:{youngmin:0},r:[
   {pic:'youngmin_n_ym07n_jiho_reads'},['youngmin','sad','……빨리 끝내려는 게 아니야. 내가 알고 싶은 거야.'],['think','smile','(아차. 영민이가 할 일을 내가 지호한테 넘겨 버렸어.)'],
   ['me','sad','미안해. 네가 읽어. 나는 내 거 할게.']]},
  {k:'D',text:'지호한테 「너 다 했으면, 내 {@clock} 문제 같이 봐 줄래?」',pts:{youngmin:2},r:[
   {pic:'youngmin_n_ym07n_jiho_reads'},['jiho','smile','좋아! 어디 봐.'],['nar','','지호가 내 자리로 왔다. 영민이 손가락이 다시 줄을 따라 움직였다.']]}],
 post:[
  {pic:'youngmin_n_ym07c_jiho_front'},['nar','','영민이는 처음부터 다시 한 줄씩 읽었다. 그리고 {@worksheet} {@clock} 그림에 긴바늘을 30분만큼 그려 넣었다.'],
  ['youngmin','smile','2시 40분에서…… 3시 10분!'],['nar','','긴바늘이 딱 4에 왔다. 영민이는 다섯 문제 중 세 문제를 풀었다.'],
  ['nar','','선생님: 「{@worksheet|는} 사람마다 골라서 풀어요. 몇 개 했는지는 말하지 않아도 돼요.」'],['nar','','선생님: 「그리고 모르면 여러 번 물어봐도 돼요. 선생님도 얼마 전에 복사기 쓰는 법을 세 번이나 물어봤어요.」'],
  ['nar','','아이들이 킥킥 웃었다. 영민이가 {@worksheet} 끝을 반듯하게 맞춰 내고 작게 「끝.」 했다.'],
  {only:['A','B','C'],lines:[['jiho','sad','영민아, 아까 막 읽어서 미안. 다음엔 먼저 물어볼게.'],['youngmin','smile','응. 나는 내가 읽어야 머리에 들어와.']]},
  {only:['D'],lines:[['youngmin','smile','아까 지호 데려가 줘서 고마워. 혼자 읽고 싶었거든.']]}],
 eve:{lead:[['dad','smile','오늘 수학 시간은 어땠어?'],['me','smile','{@clock} 문제였어. 영민이는 문장으로 된 {@worksheet|를} 손가락으로 짚으면서 읽고 있었어. 그런데 다 푼 지호가 와서 아주 빨리 대신 읽어 줬어.'],
   ['dad','smile','지호는 도와주고 싶었나 보네. 영민이는 어땠어?']],
  A:[['me','smile','영민이 얼굴이 굳어서, 내가 먼저 영민이한테 물어보자고 했어. 영민이가 자기가 읽겠대.'],['dad','smile','도와주기 전에 먼저 물어봤구나.']],
  B:[['me','smile','나는 가만히 있었어. 영민이가 너무 빨라서 못 알아들었다고, 혼자 읽고 싶다고 말했어.'],['dad','smile','어떻게 해야 할지 몰랐구나. 다음엔 「영민이한테 물어보자」 한마디 해도 돼.']],
  C:[['me','sad','내가 「다 읽어 주면 빨리 끝나겠다」 했어. 영민이가 빨리 끝내려는 게 아니래. 미안하다고 했어.'],['dad','smile','빨리 끝나는 게 좋아 보였구나. 그런데 영민이는 자기 힘으로 알고 싶었던 거야. 바로 미안하다고 해서 다행이다.']],
  D:[['me','smile','지호한테 내 문제를 같이 보자고 했어. 영민이는 혼자 다 읽었어.'],['dad','smile','영민이가 자기 속도로 읽을 수 있게 해 줬구나.']],
  common:[['me','smile','선생님도 복사기 쓰는 법을 세 번 물어봤대!'],['dad','smile','하하, 아빠도 회사에서 자주 물어봐.']]}},

// ■ Day 9 — 내 말 아직 안 끝났어 (8)
{title:'내 말 아직 안 끝났어',scene:'youngmin_n_ym02_board',place:'class',at:[400,870],with:[['jiho',860,260],['jihoon',1150,600]],flag:{M08_wait:{A:1,B:1,D:1}},
 pre:[
  {pic:'youngmin_01a'},['nar','','마지막 시간이 끝났다. 집에 가기 전에 {@notice_book|을} 쓰는 시간이다.'],
  ['nar','','선생님이 {@blackboard}에 내일 할 일과 준비물을 다섯 줄 쓰셨다. 우리는 그걸 보고 {@notice_book}에 옮겨 쓴다.'],
  ['nar','','선생님: 「다 쓴 사람은 {@bag} 싸요. 이번 주 {@blackboard} 당번은 지호죠? 다들 다 쓰고 나면 지워 줘요.」'],['jiho','smile','네! {@eraser} 들고 딱 기다릴게요!'],
  {k:'notice_book',goal:'「{x}」 꺼내기',bag:['pcase','notice_book','notebook','water_bottle','textbook']},
  {pic:'youngmin_01a'},['nar','','나도 {@notice_book|을} 꺼내 한 글자씩 따라 썼다. 받침이 많아서 {@blackboard|을} 두 번씩 올려다봤다.'],
  ['nar','','옆 줄 영민이는 손가락으로 {@blackboard} 줄을 짚으며 썼다. 한 낱말 쓰고 {@blackboard|을} 보고, 또 한 낱말 쓰고 {@blackboard|을} 봤다. 줄을 놓치면 처음부터 다시 짚었다. 글씨는 {@book}에 찍힌 것처럼 반듯했다.'],
  {pic:'youngmin_n_ym02_teacher_hand'},['nar','','그런데 지호가 벌써 {@blackboard} 앞에 섰다. {@eraser|를} 들고 왼쪽부터 쓱쓱 지웠다.'],['jiho','smile','다 썼지? 다음 줄 지운다!'],
  ['nar','','다른 아이들은 벌써 {@bag|을} 싸고 있었다. 영민이는 아직 넷째 줄을 쓰고 있었다. 영민이가 {@pencil|을} 멈추고 손을 번쩍 들었다.'],
  {pic:'youngmin_n_ym02_board'},['youngmin','smile','잠깐. 오른쪽 두 줄 남았어.'],['jiho','sad','어, 미안! 다 쓴 줄 알았어. 왼쪽만 먼저 지울게!'],
  {k:'blackboard',goal:'「{x}」 가리키기'},
  {pic:'youngmin_n_ym02_board'},['nar','','나는 {@blackboard}에 남은 두 줄을 가리켜 보았다. 그중 한 줄이 「준비물」이었다.'],['nar','','영민이는 마지막 글자까지 다 쓰고 손을 내렸다. 그제야 지호가 남은 줄을 쓱쓱 지웠다.'],
  ['nar','','그때 예나와 지훈이가 영민이 {@desk|으로} 뛰어왔다. 둘은 {@blackboard|이} 지워질 때 준비물 줄을 놓쳤다.'],['yena','smile','영민아, 준비물이 뭐였어? 나 방금 못 봤어!'],
  ['youngmin','smile','준비물은…… 큰 {@paper} 한 장이랑……'],['jihoon','smile','큰 {@paper|랑} {@colored_pencil}! 맞지, 맞지?'],['nar','','영민이가 입을 꾹 다물었다. 나오려던 말이 뚝 끊겼다.'],
  ['think','sad','(어? 영민이가 아직 말하고 있었는데…….)']],
 ask:'어떻게 같이 할까?',
 choices:[
  {k:'A',text:'영민이를 보며 가만히 기다린다.',pts:{youngmin:2},r:[
   {pic:'youngmin_n_ym02_yena_jihoon'},['youngmin','sad','……내 말 아직 안 끝났어.'],['jihoon','sad','어, 미안! 나 또 먼저 말했네. 계속해.'],
   ['youngmin','sad','큰 {@paper} 한 장이랑 {@pencil} 세 자루. {@colored_pencil|은} 아니야.']]},
  {k:'B',text:'영민이를 한 번 보고, 아무 말 없이 내 {@notice_book}만 만지작거린다.',pts:{youngmin:1},r:[
   {pic:'youngmin_n_ym02_yena_jihoon'},['nar','','지훈이는 「{@colored_pencil} 맞지?」 하고 계속 떠들었다. 영민이가 숨을 한 번 쉬었다.'],['youngmin','sad','……내 말 아직 안 끝났어.'],
   ['jihoon','sad','어, 미안! 계속해.'],['youngmin','sad','큰 {@paper} 한 장이랑 {@pencil} 세 자루. {@colored_pencil|은} 아니야.'],['think','smile','(나도 「잠깐」 하고 한마디 해 볼걸.)']]},
  {k:'C',text:'「{@colored_pencil} 맞아!」 하고 나도 지훈이 말에 끼어든다.',pts:{youngmin:0},r:[
   {pic:'youngmin_n_ym02_yena_jihoon'},['youngmin','sad','……내 말 아직 안 끝났어. 너도.'],['think','smile','(얼굴이 뜨겁다. 영민이가 말하고 있었는데, 나까지 끼어들었어.)'],
   ['me','sad','아, 미안해. 네가 말하고 있었는데 내가 끊었어.'],['youngmin','smile','응. 내가 말하던 거니까 끝까지 할게.'],
   ['youngmin','sad','큰 {@paper} 한 장이랑 {@pencil} 세 자루. {@colored_pencil|은} 아니야.']]},
  {k:'D',text:'친구들한테 「영민이 말, 끝까지 듣자.」 하고 말한다.',pts:{youngmin:2},r:[
   {pic:'youngmin_n_ym02_yena_jihoon'},['jihoon','sad','어, 맞다. 미안! 영민아, 계속 말해.'],['youngmin','smile','큰 {@paper} 한 장이랑 {@pencil} 세 자루.']]}],
 post:[
  {pic:'youngmin_n_ym02_yena_jihoon'},['nar','','예나와 지훈이가 {@notice_book}에 준비물을 받아 적고 자리로 돌아갔다.'],['nar','','영민이가 {@notice_book} 끝을 반듯하게 맞춰 덮었다.'],
  {only:['A','B','D'],lines:[['nar','','영민이 얼굴이 편해 보였다. 영민이가 작게 말했다. 「끝.」']]},
  {only:['C'],lines:[['youngmin','smile','다음에도 내 말, 끝까지 들어 줘.'],{"lay":[["board_eraser",960,112,38]]},{"clear":["board_eraser"]},['me','smile','응. 꼭 그럴게.']]},
  ['nar','','{@bag|을} 싸려고 보니, 내 {@notice_book}에 한 줄이 비어 있었다. 지호가 왼쪽을 먼저 지울 때 다 못 쓴 줄이었다.'],['me','smile','영민아, 나 둘째 줄을 못 썼어.'],
  ['youngmin','smile','내 거 보고 써. 그리고 손가락으로 줄을 짚으면서 써 봐. 그럼 줄을 안 놓쳐.'],['nar','','영민이 {@notice_book|은} 글씨가 반듯해서 한눈에 읽혔다. 나도 손가락으로 짚으며 따라 썼다.']],
 eve:{lead:[['me','smile','{m}, 오늘 지호가 {@blackboard|을} 너무 빨리 지웠어. 영민이가 「잠깐, 두 줄 남았어」 하니까 지호가 바로 멈췄어.'],['mom','smile','영민이가 할 말을 딱 했구나.']],
  A:[['me','smile','영민이가 예나한테 준비물을 알려 주는데, 지훈이가 중간에 「{@colored_pencil} 맞지?」 하고 끼어들었어. 내가 가만히 기다렸더니 영민이가 끝까지 말했어.'],['mom','smile','기다려 주니까 끝까지 말할 수 있었네.']],
  B:[['me','smile','영민이가 예나한테 준비물을 알려 주는데, 지훈이가 중간에 「{@colored_pencil} 맞지?」 하고 끼어들었어. 나는 {@notice_book}만 만지작거렸어. 영민이가 혼자 「내 말 안 끝났어」 했어.'],
   ['mom','smile','어떻게 해야 할지 몰라서 가만히 있었구나. 영민이가 스스로 말해서 다행이다. 다음엔 너도 「잠깐」 한마디 해 줄 수 있겠네.']],
  C:[['me','sad','영민이가 예나한테 준비물을 알려 주는데, 지훈이가 「큰 {@paper|랑} {@colored_pencil}! 맞지?」 하고 끼어들었어. 나도 「{@colored_pencil} 맞아!」 하고 같이 끼어들었어. 근데 {@colored_pencil|은} 준비물이 아니었어. 영민이가 「내 말 아직 안 끝났어. 너도.」 해서 미안하다고 했어.'],
   ['mom','sad','영민이는 말하다가 두 번이나 끊겨서 속상했을 거야. 끊은 걸 바로 미안하다고 하고 끝까지 들어 줘서 영민이가 마저 말할 수 있었네.']],
  D:[['me','smile','영민이가 예나한테 준비물을 알려 주는데, 지훈이가 끼어들었어. 그래서 내가 「영민이 말, 끝까지 듣자.」 했어.'],['mom','smile','영민이가 끝까지 말할 수 있게 해 줬구나.']],
  common:[['me','smile','나는 한 줄을 못 써서 영민이 {@notice_book} 보고 썼어. 손가락으로 짚으면서 쓰면 줄을 안 놓친대.'],['mom','smile','오늘은 둘이 서로 도와줬네.']]}},

// ■ Day 10 — 갑자기 바뀌면 (9)
{title:'갑자기 바뀌면',scene:'youngmin_n_ym09n_freeze',place:'class',at:[1230,250],flag:{M09:{A:1,D:1}},
 pre:[
  {pic:'youngmin_09a'},['nar','','쉬는 시간이 되자 선생님이 모둠 그림 여섯 장을 들고 오셨다.'],['nar','','선생님: 「영민이랑 둘이, 이거 뒤 게시판에 붙여 줄래요? 점심 먹고 천천히 붙여도 돼요.」'],
  ['youngmin','smile','점심 먹고. 알겠습니다.'],['nar','','영민이는 그림 여섯 장을 {@desk} 위에 반듯하게 쌓아 두었다.'],
  {k:'tape',goal:'「{x}」 가져오기',bag:['tape','glue','scissors','ruler','paper']},
  {pic:'youngmin_09a'},['nar','','나는 선생님 {@desk}에서 {@tape|를} 가져왔다.'],
  {k:'scissors',goal:'「{x}」 건네주기',bag:['pencil','eraser','scissors','colored_pencil','glue']},
  {pic:'youngmin_09a'},['nar','','나는 필통에서 {@scissors|를} 꺼내 영민이에게 건넸다.'],['nar','','그때 선생님이 교실 문을 열고 다시 들어오셨다.'],
  ['nar','','선생님: 「얘들아, 미안해요! 다른 반 선생님이 이번 쉬는 시간에 그림 보러 오신대요. 지금 붙여 줄 수 있어요?」'],['me','smile','지금요? 네!'],
  {pic:'youngmin_n_ym09n_freeze'},['nar','','나는 그림을 들고 게시판으로 뛰어갔다. 그런데 영민이는 {@scissors|를} 든 채 그 자리에 서 있었다.'],['youngmin','sad','……점심 먹고라고 했는데.'],
  ['nar','','영민이 눈이 그림이랑 게시판이랑 {@clock|를} 왔다 갔다 했다.'],['think','smile','(쉬는 시간이 8분밖에 없어! 빨리 해야 하는데!)']],
 ask:'어떻게 같이 할까?',
 choices:[
  {k:'A',text:'「나 시간이 모자랄까 봐 걱정돼. 우리 어떻게 할지 같이 정할까?」',pts:{youngmin:2},r:[
   {pic:'youngmin_n_ym09n_freeze'},['youngmin','smile','응. 근데 잠깐만. 갑자기 바뀌면 나는 순서부터 다시 정해야 해.'],['me','smile','알았어. 기다릴게.']]},
  {k:'B',text:'아무 말 없이 혼자 그림을 들고 게시판에 댄다. 「휴우……」 한숨이 새어 나온다.',pts:{youngmin:1},r:[
   {pic:'youngmin_n_ym09n_freeze'},['youngmin','sad','……나 지금 생각하는 중이야. 한숨 쉬니까 더 헷갈려.'],['me','sad','아, 미안. 나 혼자 마음이 급했어.'],['think','smile','(처음부터 말로 할걸.)']]},
  {k:'C',text:'「빨리 좀 해. 너 때문에 늦겠어.」',pts:{youngmin:0},r:[
   {pic:'youngmin_n_ym09n_freeze'},['nar','','영민이 손이 딱 굳었다.'],['youngmin','sad','……갑자기 바뀌어서 그래. 그렇게 말하면 더 생각이 안 나.'],
   ['think','smile','(아차. 급한 건 난데, 영민이 탓을 해 버렸어.)'],['me','sad','미안해. 내가 급해서 그런 거야. 너 때문 아니야.']]},
  {k:'D',text:'「잠깐 생각해도 돼. 정하면 말해 줘.」 하고 기다린다.',pts:{youngmin:2},r:[
   {pic:'youngmin_n_ym09n_freeze'},['nar','','영민이가 눈을 감고 숨을 한 번 쉬었다.'],['youngmin','smile','고마워. 금방 정할게.']]}],
 post:[
  {pic:'youngmin_n_ym09n_freeze'},['nar','','영민이가 쌓아 둔 그림을 한 번 보고 고개를 들었다.'],['youngmin','smile','정했어. 너는 그림만 붙여. 나는 {@tape|를} 미리 다 잘라 놓을게.'],
  ['youngmin','smile','손가락 두 마디씩, 스물네 개. 그럼 팔 들고 기다리지 않아도 돼.'],
  {pic:'youngmin_09b'},['nar','','영민이가 {@tape|를} 싹둑싹둑 잘라 {@desk} 가장자리에 줄줄이 붙여 두었다. 길이가 자로 잰 것처럼 똑같았다. 나는 하나씩 톡 떼어 그림을 착착 붙였다.'],
  {pic:'youngmin_09c'},['nar','','종이 울리기 전에 그림 여섯 장이 다 붙었다. 다른 반 선생님이 담임 선생님과 같이 들어오셨다.'],['nar','','다른 반 선생님: 「어머, 그림이 하나도 안 삐뚤어졌네요! {@tape} 길이도 다 똑같아요.」'],
  ['nar','','담임 선생님: 「갑자기 바꿔서 미안했어요. 둘이 고마워요.」'],['youngmin','smile','처음엔 깜짝 놀랐어. 순서를 정하니까 괜찮아졌어.'],
  {only:['A','D'],lines:[['me','smile','나도 같이 정하길 잘했어.'],['youngmin','smile','나는 갑자기 바뀌면 잠깐 멈춰야 돼. 오늘은 네가 기다려 줬어.']]},
  {only:['B','C'],lines:[['me','sad','아까 한숨 쉬고 재촉한 거, 다시 미안해.'],['youngmin','smile','응. 다음엔 「나 급해」라고만 해 줘. 그럼 나도 알아.']]},
  ['nar','','영민이가 작게 말했다. 「끝.」']],
 eve:{lead:[['me','smile','{m}, 오늘 영민이랑 게시판에 그림을 붙였어. 선생님이 점심 먹고 붙이라고 하셨다가, 갑자기 지금 붙이라고 하셨어. 영민이가 깜짝 놀라서 잠깐 멈췄어.'],['mom','smile','갑자기 바뀌면 누구라도 놀라지. 그래서 어떻게 했어?']],
  A:[['me','smile','시간이 모자랄까 봐 걱정된다고 말하고, 같이 정하자고 했어.'],['mom','smile','네 마음을 말하고, 영민이가 정할 시간도 줬구나.']],
  B:[['me','smile','말은 안 하고 혼자 붙이면서 한숨을 쉬었어. 영민이가 더 헷갈린대.'],['mom','smile','급한데 말이 잘 안 나왔구나. 다음엔 「나 급해」 한마디면 돼.']],
  C:[['me','sad','「너 때문에 늦겠어」 했어. 급한 건 나였는데. 그래서 바로 미안하다고 했어.'],['mom','sad','시간이 모자라서 마음이 급했구나. 그런데 영민이는 갑자기 바뀐 걸 정리하던 중이었잖아. 네 탓이라는 말에 속상했을 거야.']],
  D:[['me','smile','생각해도 된다고 하고 기다렸어. 영민이가 금방 방법을 정했어.'],['mom','smile','기다려 주니까 영민이가 좋은 방법을 찾았네.']],
  common:[['me','smile','영민이는 갑자기 바뀌면 순서부터 다시 정해야 된대.'],['mom','smile','사람마다 그런 게 하나씩 있지. 엄마는 길이 바뀌면 꼭 헤매.']]}},

// ■ Day 11 — 젖은 알림장 (10)
{title:'젖은 알림장',scene:'youngmin_10_B',place:'class',at:[400,870],with:[['sua',520,560]],
 pre:[
  {pic:'youngmin_10a'},['nar','','아침이다. 자리에 앉아 {@bag|을} 열었다. 그런데 {@bag} 바닥이 축축했다.'],
  {k:'water_bottle',goal:'「{x}」 꺼내기',bag:['textbook','water_bottle','notice_book','pcase','notebook']},
  {pic:'youngmin_10a'},['nar','','{@water_bottle} {@lid|이} 덜 닫혀 있었다. 내 실수다. 물이 {@bag} 안에 다 샜다.'],
  {pic:'youngmin_10b'},['nar','','{@notice_book}도 흠뻑 젖었다. 써 둔 글씨가 파란 물감처럼 번져서 하나도 안 보인다.'],['nar','','그때 반장 수아가 교실 앞에서 큰 소리로 말했다.'],
  ['sua','smile','얘들아, 주목! 오늘 1교시에 수학 숙제 검사한대!'],['think','sad','(수학 숙제?! 몇 쪽이었지? {@notice_book|이} 안 보여! 수업까지 7분밖에 안 남았는데!)'],
  ['nar','','나는 자꾸 교실 {@clock|를} 올려다봤다.'],
  {pic:'youngmin_10_B'},['nar','','옆 줄 영민이가 내 젖은 {@notice_book|을} 보았다.'],['youngmin','sad','……물 샜어? 내 {@notice_book} 읽어 줄게. 우리 같은 거 썼잖아.'],
  ['nar','','영민이가 자기 {@notice_book|을} 펴고 손가락으로 한 줄씩 짚었다. 「일. 준비물. 색…… {@paper}…….」'],['me','sad','색…… 뭐라고? 미안, 한 번만 더 말해 줘.'],
  ['youngmin','smile','색종이. 여러 번 물어봐도 돼.'],['nar','','영민이는 1번부터 차근차근 읽었다. 숙제는 3번에 있었다.'],['think','sad','(빨리 3번! 숙제 몇 쪽인지 알아야 해! ……그래도 영민이는 1번부터 순서대로 읽는구나.)']],
 ask:'어떻게 같이 할까?',
 choices:[
  {k:'A',text:'「고마워!」 하고 영민이 {@notice_book|을} 내 쪽으로 쭉 당겨 3번을 읽는다.',pts:{youngmin:0},r:[
   {pic:'youngmin_10_A'},['me','smile','「수학 익힘책 34쪽」! 찾았다!'],['youngmin','sad','……4번도 있었는데.'],['me','surprised','어? 4번은 뭐야?'],
   ['youngmin','smile','체육복, 금요일. 끝까지 들으면 다 알 수 있었어.'],['think','sad','(아차, 영민이가 읽어 주고 있었는데.)'],['me','sad','……미안해. 네가 읽어 주던 건데 내가 확 가져갔어.']]},
  {k:'B',text:'「영민아, 나 숙제가 급해. 숙제 줄부터 먼저 읽어 줄래?」',pts:{youngmin:2},r:[
   {pic:'youngmin_10_B'},['youngmin','smile','응. 숙제는 3번이야. 수학 익힘책 삼십사 쪽.'],['youngmin','smile','4번도 들어. 체육복, 금요일.'],['me','smile','34쪽! 고마워. 바로 시작할 수 있겠다.']]},
  {k:'C',text:'「네 {@notice_book}, 내가 잠깐 봐도 돼?」',pts:{youngmin:2},r:[
   {pic:'youngmin_10_B'},['youngmin','smile','응. 근데 4번까지 다 봐.'],['nar','','영민이가 {@notice_book|을} 내 쪽으로 밀어 주었다. 나는 3번과 4번을 얼른 읽었다.'],['me','smile','34쪽이랑 체육복! 고마워.']]},
  {k:'D',text:'{@clock|를} 자꾸 보면서도, 아무 말 없이 영민이가 다 읽을 때까지 기다린다.',pts:{youngmin:1},r:[
   {pic:'youngmin_10_B'},['youngmin','smile','삼. 숙제. 수학 익힘책 삼십사 쪽. 사. 체육복. 금요일.'],['me','smile','34쪽…… 고마워.'],['nar','','{@clock|를} 보니 수업이 2분밖에 안 남았다.'],
   ['think','smile','(급하다고 먼저 말할걸.)']]}],
 post:[
  {only:['A'],lines:[{pic:'youngmin_10_A'}]},
  {only:['B','C','D'],lines:[{pic:'youngmin_10_B'}]},
  ['nar','','나는 얼른 익힘책 34쪽을 폈다. 문제가 여덟 개나 됐다. 종이 울릴 때까지 세 개밖에 못 풀었다.'],['nar','','1교시가 시작되고 선생님이 내 자리에 오셨다.'],
  ['me','smile','선생님, {@water_bottle|이} 새서 {@notice_book|이} 젖었어요. 숙제가 뭔지 몰랐어요.'],['nar','','선생님: 「어머, {@bag|이} 다 젖었네. 남은 건 쉬는 시간에 해요. {@notice_book|은} 창가에서 말려요.」'],
  {k:'notice_book',goal:'「{x}」 창가에 말리기',bag:['notice_book','notebook','book','textbook','worksheet']},
  {only:['A','D'],lines:[{pic:'youngmin_n_ym10_glasses'}]},
  {only:['B','C'],lines:[{pic:'youngmin_n_ym10_glasses'}]},
  ['nar','','나는 젖은 {@notice_book|을} 펴서 창가 어항 옆에 올려 두었다.'],
  {only:['B','C'],lines:[['youngmin','smile','마르면 새로 써. 내 거 보고. 내 글씨 따라 써도 돼.']]},
  {only:['A','D'],lines:[['youngmin','smile','……체육복. 금요일. 4번. 그것도 꼭 써.'],['me','smile','나 사실 {@clock} 보면서 마음이 급했어.'],['youngmin','smile','알아. 너 자꾸 {@clock} 봤잖아.']]},
  ['youngmin','smile','나도 {@water_bottle} 샌 적 있어. 그땐 교과서가 다 젖었어.']],
 eve:{lead:[['me','smile','{m}, 오늘 {@water_bottle|이} 새서 {@notice_book|이} 다 번졌어. 숙제가 안 보여서 영민이가 자기 {@notice_book|을} 읽어 줬어.'],
   ['mom','surprised','아이고, 큰일 날 뻔했네. 다음엔 {@water_bottle} {@lid|을} 딸깍 소리 날 때까지 꼭 닫자.']],
  A:[['me','sad','급해서 영민이 {@notice_book|을} 내가 당겨 갔어. 내가 못 본 숙제 4번은 영민이가 다시 알려 줬어. 미안하다고 했어.'],
   ['mom','sad','숙제 때문에 마음이 급했구나. 그런데 영민이는 너한테 끝까지 읽어 주고 있었잖아. 중간에 뺏겨서 서운했을 거야. 4번까지 다시 알려 준 걸 보니 영민이가 너를 많이 생각하나 봐.']],
  B:[['me','smile','숙제가 급하다고, 숙제 줄부터 읽어 달라고 했어. 영민이가 4번까지 알려 줬어.'],['mom','smile','급한 걸 말하니까 영민이도 맞춰 줄 수 있었네.']],
  C:[['me','smile','영민이한테 {@notice_book} 봐도 되냐고 물어봤어. 영민이가 4번까지 다 보래.'],['mom','smile','먼저 물어보니까 영민이가 선뜻 보여 줬구나.']],
  D:[['me','smile','급했는데 말을 못 하고 다 읽을 때까지 기다렸어. 숙제할 시간이 별로 없었어.'],['mom','smile','영민이 마음을 생각해서 기다렸구나. 그런데 급할 땐 「숙제 줄부터 읽어 줄래?」 하고 말해도 돼.']]}},

// ■ Day 12 — 진짜 예술이다 (11)
{title:'진짜 예술이다',scene:'youngmin_n_ym11n_jihoon_tease',place:'class',at:[400,870],
 pre:[
  {pic:'youngmin_n_ym11n_fish_draw'},['nar','','미술 시간이다. 오늘은 「우리 반에 있는 것」을 그린다.'],['nar','','영민이는 망설이지 않고 어항을 그리기로 했다.'],
  ['youngmin','smile','「천천히」 그릴 거야. 초록 {@colored_pencil} 있어? 물풀 칠하려고.'],
  {k:'colored_pencil',goal:'「{x}」 빌려주기',bag:['pencil','colored_pencil:colored_pencil_green','eraser','scissors','ruler']},
  {pic:'youngmin_n_ym11n_fish_draw'},['nar','','나는 필통에서 초록 {@colored_pencil|을} 꺼내 영민이에게 건넸다.'],['nar','','그런데 영민이는 {@fish}까지 초록색으로 칠했다. 몸도, 지느러미도, 꼬리도 전부 초록색이었다.'],
  ['me','surprised','{@fish|가} 초록색이야?'],['youngmin','smile','응. 「천천히」는 물풀이랑 제일 친해. 그래서 초록색으로 했어.'],
  {pic:'youngmin_n_ym11n_jihoon_tease'},['nar','','그때 지훈이가 영민이 {@desk} 옆으로 왔다.'],['jihoon','smile','우와~ 영민아, 초록 {@fish}! 진짜 예술이다. 미술관에 걸어야겠네~'],
  ['nar','','지훈이 목소리가 이상하게 길게 늘어졌다. 뒤에서 아이 둘이 킥킥 웃었다.'],['youngmin','smile','진짜? 고마워! 이거 「천천히」야.'],['jihoon','smile','응응, 진~짜 최고야.'],
  ['nar','','아이들이 더 크게 웃었다. 영민이는 웃는 아이들을 보다가 고개를 갸웃했다.'],['youngmin','surprised','……왜 웃어?'],['think','sad','(지훈이는 놀린 건데……. 영민이는 진짜 칭찬인 줄 알아.)']],
 ask:'어떻게 같이 할까?',
 choices:[
  {k:'A',text:'영민이한테만 작게 「지훈이 장난친 거야. 나는 네 {@fish} 진짜 좋아.」',pts:{youngmin:2},r:[
   {pic:'youngmin_n_ym11n_jihoon_tease'},['youngmin','sad','……장난이었어? 몰랐어.'],['nar','','영민이가 도화지를 잠깐 내려다봤다.'],['youngmin','smile','그래도 너는 진짜로 좋은 거지?'],
   ['me','smile','응. 진짜로.']]},
  {k:'B',text:'지훈이한테 「그거 놀리는 거잖아. 영민이는 열심히 그린 거야.」',pts:{youngmin:2},r:[
   {pic:'youngmin_n_ym11n_jihoon_tease'},['jihoon','sad','……장난이었어. 그렇게 크게 웃을 줄 몰랐어.'],['youngmin','smile','아, 놀린 거였어? 나는 진짜인 줄 알았어.'],['nar','','영민이 귀가 빨개졌다.']]},
  {k:'C',text:'아무 말 없이 영민이 옆에 앉아 내 그림만 그린다.',pts:{youngmin:1},r:[
   {pic:'youngmin_n_ym11n_jihoon_tease'},['nar','','웃음소리가 잦아들 때까지 나는 고개를 숙이고 있었다.'],['youngmin','sad','……방금 다들 왜 웃은 거야?'],['me','smile','지훈이가 장난친 거였어. 나는 웃기지 않았어.']]},
  {k:'D',text:'「영민아, 지훈이 말 진짜 아니야! 놀린 거야!」 하고 다 들리게 크게 말한다.',pts:{youngmin:0},r:[
   {pic:'youngmin_n_ym11n_jihoon_tease'},['nar','','교실이 조용해졌다. 다들 영민이를 쳐다봤다.'],['youngmin','sad','……그걸 왜 크게 말해.'],['nar','','영민이가 도화지를 엎어 놓았다.'],
   ['think','smile','(아차. 알려 주려던 건데, 다들 보는 데서 영민이를 더 창피하게 만들었어.)'],['me','sad','미안해. 너한테만 말할걸.']]}],
 post:[
  {pic:'youngmin_n_ym11n_jihoon_tease'},['nar','','조금 뒤, 지훈이가 머리를 긁으며 다시 왔다.'],['jihoon','sad','영민아, 아까 「예술이다~」는 놀린 거였어. 미안해.'],
  ['youngmin','smile','나는 그런 말을 잘 몰라. 말속에 숨은 뜻을 늦게 알아.'],['youngmin','smile','그러니까 나한테는 진짜만 말해 줘.'],['jihoon','sad','……알았어. 사실 초록 {@fish}, 좀 멋있어.'],
  {pic:'youngmin_11c'},['nar','','쉬는 시간에 우리는 어항 앞으로 갔다.'],
  {k:'fish',goal:'「{x}」 같이 세기',bag:['fish','bucket','cup','water_bottle','book']},
  {pic:'youngmin_11c'},['youngmin','smile','하나, 둘, 셋, 넷, 다섯.'],['me','smile','진짜 「천천히」는 초록색이 아니네!'],['youngmin','smile','응. 그래도 내 그림에서는 초록이야. 물풀이랑 친하니까.'],
  ['nar','','나는 그만 웃음이 터졌다. 이번 웃음은 영민이도 같이 웃었다.']],
 eve:{lead:[['dad','smile','오늘 미술 시간에 뭐 그렸어?'],['me','smile','어항! 그런데 지훈이가 영민이 초록 {@fish} 그림 보고 「진짜 예술이다~」 하고 놀렸어. 영민이는 진짜 칭찬인 줄 알고 「고마워!」 했어. 애들이 막 웃었어.'],
   ['dad','smile','저런. 영민이가 놀린 걸 몰랐구나.']],
  A:[['me','smile','영민이한테만 작게 장난이었다고 말해 줬어. 그리고 나는 진짜 좋다고 했어.'],['dad','smile','영민이가 창피하지 않게 살짝 알려 줬구나.']],
  B:[['me','smile','지훈이한테 놀리는 거라고 말했어. 지훈이가 장난이었대.'],['dad','smile','친구 대신 할 말을 해 줬구나.']],
  C:[['me','smile','나는 그냥 내 그림만 그렸어. 나중에 영민이가 물어봐서 알려 줬어.'],['dad','smile','어떻게 할지 몰랐구나. 그래도 물어봤을 때 솔직하게 말해 줬네.']],
  D:[['me','sad','다 들리게 「놀린 거야!」 하고 크게 말했어. 영민이가 왜 크게 말하냐고 했어. 미안하다고 했어.'],['dad','smile','알려 주고 싶었던 마음은 알아. 그런데 다들 보는 데서 들으면 영민이가 더 창피했을 거야.']],
  common:[['me','smile','영민이는 말속에 숨은 뜻을 늦게 안대. 그래서 진짜만 말해 달래.'],['dad','smile','그럼 영민이한테는 마음을 그대로 말하면 되겠네.']]}},

// ■ Day 13 — 붓는 건 내가 (12)
{title:'붓는 건 내가',scene:'youngmin_n_ym12_yena',place:'class',at:[330,262],with:[['sua',800,262],['haeun',920,262],['yena',520,262],['junho',600,340],['jiho',600,450]],
 pre:[
  ['nar','','아침에 옆 반 아이가 우리 교실 문 앞에 찾아왔다.'],['nar','','옆 반 아이: 「우리 반 어항 구피가 두 마리 죽었어. 너네는 어떻게 키워?」'],['jiho','smile','영민이한테 물어봐! 우리 반 {@fish} 당번이라 다 알아.'],
  ['youngmin','smile','……물은 하루 받아 뒀다가 써. 그리고 유리에 대고 천천히 부어야 해.'],['youngmin','smile','나는 물 갈기를 열 번도 넘게 해 봐서 순서를 다 알아.'],['nar','','옆 반 아이가 고개를 끄덕이고 돌아갔다.'],
  {pic:'youngmin_n_ym12a_sua'},['nar','','오후 체험활동 시간. 선생님이 교실 앞에 큰 {@bucket|를} 놓으셨다.'],['nar','','선생님: 「오늘은 어항 물을 반만 새 물로 갈아요. 이 물은 선생님이 하루 받아 둔 물이에요.」'],
  {k:'bucket',goal:'「{x}」 들여다보기',bag:['bucket','cup','water_bottle','fish','broom']},
  {pic:'youngmin_n_ym12a_sua'},['nar','','나는 {@bucket} 안의 맑은 물을 들여다봤다.'],['nar','','선생님: 「할 일은 네 가지예요. 헌 물 덜기, 유리 닦기, 새 물 붓기, {@fish} 세기.」'],
  ['nar','','선생님: 「반장 수아랑, 너. 둘이 누가 뭘 할지 나눠 줄래요?」'],
  {pic:'youngmin_12b'},['nar','','수아가 바로 {@blackboard} 앞으로 나가 쓱쓱 빠르게 썼다. 「헌 물 덜기 — 준호, 예나 / 유리 닦기 — 지호, 하은 / 새 물 붓기 — 수아, 나」'],
  ['sua','smile','영민이는 {@fish} 세기 해. 금방 끝나서 덜 힘들 거야.'],['youngmin','smile','어, 나…… 새 물 붓고 싶어.'],['nar','','수아는 또각또각 분필 소리 때문에 영민이 말을 못 들었다.'],
  ['sua','smile','다들 자기 일 알지? 자, 빨리 시작하자!'],
  {pic:'youngmin_n_ym12_yena'},['yena','surprised','어, 영민아! 방금 뭐라고 했어?'],['nar','','예나는 영민이 말이 다 끝날 때까지 가만히 기다렸다.'],
  ['youngmin','smile','……새 물 붓기. 나도 하고 싶어. 천천히 부어야 {@fish|가} 안 놀라거든.'],['think','sad','(어떡하지? 새 물 붓기는 나도 재밌어 보이는데. {@blackboard}에도 내 이름이 적혀 있고…….)']],
 ask:'어떻게 같이 할까?',
 choices:[
  {k:'A',text:'「수아야, 영민이가 새 물 붓고 싶대. 천천히 부어야 {@fish|가} 안 놀란대.」',pts:{youngmin:2},r:[
   {pic:'youngmin_n_ym12_yena'},['sua','smile','어? 시간 없는데……. 아, {@fish|가} 놀란다고? 그렇구나, 영민이 말이 맞네!']]},
  {k:'B',text:'「나도 붓고 싶어. 우리 같이 하자! 영민이가 먼저 해.」',pts:{youngmin:2},r:[
   {pic:'youngmin_n_ym12_yena'},['youngmin','sad','……좋아. 내가 먼저 천천히 보여 줄게. 그다음에 네가 부어.'],['me','smile','수아야, 새 물 붓기는 영민이랑 내가 할게!']]},
  {k:'C',text:'「좋아. 수아 말대로 빨리 하자.」 하고 내 자리로 간다.',pts:{youngmin:1},r:[
   {pic:'youngmin_n_ym12_spill_sua'},['nar','','헌 물을 덜고 나서, 수아가 양동이째 물을 기울였다. 물이 철퍽 쏟아졌다. 바닥 돌이 우르르 흔들렸다.'],['youngmin','smile','……천천히.'],
   ['nar','','영민이 목소리가 작았다. 수아는 물소리 때문에 못 들었다. 나는 들었다.'],['me','smile','수아야, 잠깐! 영민이가 천천히 부어야 한대!']]},
  {k:'D',text:'「새 물 붓기는 내가 할게!」 하고 영민이 말을 듣고도 손을 번쩍 든다.',pts:{youngmin:0},r:[
   {pic:'youngmin_n_ym12_spill_me'},['nar','','헌 물을 덜고 나서, 내가 양동이째 물을 부었다. 물이 철퍽 쏟아져 바닥 돌이 우르르 흔들렸다.'],['think','smile','(큰일 났다! 물고기들이 깜짝 놀라서 다 숨었어!)'],
   ['youngmin','smile','잠깐, 천천히! 그리고 나도 그거 하고 싶다고 말했잖아. 같이 하자.'],['me','sad','아…… 나도 너무 하고 싶어서 먼저 말했어. 미안해. 우리 나눠서 할까?']]}],
 post:[
  {only:['A','B'],lines:[{pic:'youngmin_n_ym12_yena'}]},
  {only:['C'],lines:[{pic:'youngmin_n_ym12_spill_sua'}]},
  {only:['D'],lines:[{pic:'youngmin_n_ym12_spill_me'}]},
  {only:['A','B'],lines:[['nar','','수아가 {@blackboard} 글씨를 얼른 고쳤다. 「새 물 붓기 — 영민, 나」']]},
  {only:['C','D'],lines:[['yena','smile','수아야, 영민이 아까 새 물 붓기 하고 싶다고 했어.']]},
  ['sua','sad','내가 너무 빨리 정했네. 영민이 말도 못 들었어. 미안해!'],
  {only:['A','B'],lines:[['nar','','헌 물은 반쯤 덜어 냈다. 이제 새 물은 {@cup|으로} 조금씩 부을 차례였다.']]},
  {only:['C','D'],lines:[['nar','','남은 새 물은 {@cup|으로} 조금씩 붓기로 했다.']]},
  {k:'cup',goal:'「{x}」 가져다 놓기',bag:['cup','bucket','water_bottle','spoon','fish']},
  {only:['A','B'],lines:[{pic:'youngmin_n_ym12_yena'}]},
  {only:['C'],lines:[{pic:'youngmin_n_ym12_spill_sua'}]},
  {only:['D'],lines:[{pic:'youngmin_n_ym12_spill_me'}]},
  ['nar','','나는 선생님 {@desk}에서 {@cup|을} 가져와 {@bucket} 옆에 놓았다.'],
  {only:['A','B'],lines:[{pic:'youngmin_12c'},['nar','','영민이가 {@cup}에 물을 떠서 어항 유리에 대고 천천히 부었다. 물이 유리를 타고 쪼르륵 흘렀다. 바닥 돌이 하나도 안 움직였다. 나도 옆에서 따라 부었다.'],['youngmin','smile','좀 더 천천히. 응, 바로 그거야.']]},
  {only:['C','D'],lines:[{pic:'youngmin_n_ym12_cup'},['nar','','선생님: 「양동이째 부으면 {@fish|가} 깜짝 놀라요. {@cup|으로} 조금씩 부어요.」'],['nar','','선생님이 마지막 {@cup|을} 영민이 손에 조용히 건네셨다. 영민이가 유리에 대고 천천히 부었다.']]},
  ['nar','','물이 다시 맑아졌다. 영민이가 어항 앞에 서서 셌다.'],['youngmin','smile','하나, 둘, 셋, 넷, 다섯. ……끝.'],
  {only:['A','B'],lines:[['yena','smile','영민아, 끝까지 들어 보길 잘했다! 네 말이 맞았어.']]},
  {only:['C','D'],lines:[['youngmin','smile','……다음엔 나 붓기 할래. 그땐 처음부터 크게 말할 거야.']]},
  ['haeun','smile','나도 알려 줘! 다음엔 나도 부어 볼래.'],['youngmin','smile','천천히 하면 돼.']],
 eve:{lead:[['me','smile','{m}, 오늘 어항 물을 갈았어. 영민이가 새 물 붓고 싶다고 했는데, 수아가 일을 빨리 나누다가 그 말을 못 들었어. 예나는 끝까지 기다려 줬어!'],['mom','smile','영민이도 하고 싶은 일이 있었구나. 그때 너는 어떻게 했어?']],
  A:[['me','smile','수아한테 영민이 말을 다시 전해 줬어.'],['mom','smile','영민이 말을 수아한테 잘 전해 줬구나.']],
  B:[['me','smile','나도 붓고 싶다고 했어. 영민이가 먼저 하고 나도 했어.'],['mom','smile','너도 하고 싶다고 말하고, 둘이 같이 정했네.']],
  C:[['me','smile','영민이가 작게 「천천히 부어야 해」 했는데 내가 들었어. 그래서 수아한테 크게 말해 줬어.'],['mom','smile','작은 목소리도 놓치지 않았네.']],
  D:[['me','sad','내가 하겠다고 하고 물을 세게 부었어. 영민이가 먼저 하고 싶다고 했었는데. 그래서 미안하다고 하고 같이 나눠서 했어.'],
   ['mom','smile','너도 정말 하고 싶었구나. 그런데 영민이가 먼저 하고 싶다고 말했잖아. 그래도 나눠서 하자고 해서 영민이도 할 수 있었네.']]}},

// ■ Day 14 — 다 읽었어 (13)
{title:'다 읽었어',scene:'youngmin_13b',place:'library',at:[900,700],with:[['jiho',1130,700],['jihoon',1030,750],['yena',1300,700]],
 pre:[
  {pic:'youngmin_13a'},['nar','','점심시간이다. 나는 다 읽은 그림책을 돌려주러 도서관에 왔다. 도서관은 조용했다.'],
  ['nar','','저쪽에서 영민이가 아주 두꺼운 {@book|을} 두 손으로 들고 걸어왔다. 「거북이, 바다 밑으로」. 영민이가 세 번 빌린 「우주로 간 거북이」의 다음 권이다.'],['nar','','지난 {@book}보다 두 배는 더 두껍다. 그림도 몇 장에 하나뿐이다.'],
  ['youngmin','smile','……있잖아.'],
  {pic:'youngmin_13'},['nar','','영민이가 {@book} 맨 뒷장을 펼쳐 내 앞에 내밀었다. 「끝」.'],['youngmin','smile','다 읽었어. 혼자. 드디어 마지막 장을 넘겼어.'],
  ['nar','','영민이 목소리가 평소보다 컸다. 얼굴도 빨갰다. 창피해서 빨개진 게 아니었다.'],['youngmin','smile','딱 한 달 걸렸어. ……근데 결말은 좀 마음에 안 들어. 왜 그런지는 비밀이야.'],
  {pic:'youngmin_13b'},['nar','','도서관에는 다른 아이들도 있었다. 그런데 영민이는 나만 보고 있었다. 나한테 제일 먼저 말해 준 거였다.'],
  ['think','sad','(한 달 동안 혼자 이렇게 두꺼운 {@book|을}! 정말 대단해. ……근데 영민이는 다른 애들 말고 나한테만 와서 말했어.)']],
 ask:'어떻게 같이 할까?',
 choices:[
  {k:'A',text:'도서관 아이들에게 「얘들아! 영민이 이 {@book} 다 읽었대! 혼자!」 하고 크게 말한다.',pts:{youngmin:0},r:[
   {pic:'youngmin_13_A'},['jihoon','smile','오, 영민이가? 드디어~ 다 읽었네!'],['nar','','아이들이 우르르 몰려와 {@book|을} 들춰 봤다. 영민이가 고개를 푹 숙였다.'],['youngmin','sad','……나는 너한테만 말한 건데.'],
   ['think','smile','(아차, 내가 너무 크게 말해 버렸어.)'],['me','sad','미안해. 내가 너무 기뻐서 그만 크게 말했어.']]},
  {k:'B',text:'「결말이 어떻게 돼? 거북이가 바다 밑에서 뭐 찾았어?」',pts:{youngmin:2},r:[
   {pic:'youngmin_13_B'},['youngmin','laugh','말하면 안 돼. 너도 읽을 거잖아.'],['me','smile','아, 맞다! 그럼 앞부분만 얘기해 줘.'],
   ['youngmin','smile','거북이가 우주에서 돌아왔어. 근데 다들 「우주 갔다 온 거북이」라고만 불러. 그래서 이번엔 아무도 안 가 본 바다 맨 밑으로 가려고 해.'],['nar','','영민이는 한 장면씩 순서대로 차근차근 말했다. 나는 끝까지 들었다.'],
   ['youngmin','smile','……그다음은 비밀.']]},
  {k:'C',text:'「와, 진짜? 너도 이런 두꺼운 {@book} 읽을 수 있구나!」',pts:{youngmin:1},r:[
   {pic:'youngmin_13_C'},['nar','','영민이가 웃다가 딱 멈췄다. {@book|을} 가슴에 꼭 안았다.'],['youngmin','sad','……나도 읽을 수 있어. 오래 걸리는 거지, 못 읽는 거 아니야.'],
   ['think','sad','(칭찬하려고 했는데……. 「너도」라는 말이 이상하게 들렸나 봐.)'],['me','smile','아, 그 말이 아니라……. 이렇게 두꺼운 걸 다 읽어서 놀랐어.']]},
  {k:'D',text:'「축하해! 우리 하이파이브 할래?」',pts:{youngmin:2},r:[
   {pic:'youngmin_n_ym13D_highfive'},['nar','','짝. 도서관이라 아주 작은 소리가 났다.'],['me','smile','나는 한국어로 이렇게 두꺼운 {@book|은} 아직 한 번도 끝까지 못 읽어 봤어.'],
   ['youngmin','smile','……그럼 네가 처음 끝까지 읽으면, 내가 제일 먼저 축하해 줄게.']]}],
 post:[
  {only:['A'],lines:[{pic:'youngmin_13_A'}]},
  {only:['B'],lines:[{pic:'youngmin_13_B'}]},
  {only:['C'],lines:[{pic:'youngmin_13_C'}]},
  {only:['D'],lines:[{pic:'youngmin_n_ym13D_highfive'}]},
  ['nar','','영민이가 {@book|을} 돌려주러 사서 선생님 {@desk|으로} 갔다. 나도 옆에 따라갔다.'],['me','smile','나도 언젠가 이렇게 두꺼운 {@book} 끝까지 읽어 볼래.'],
  ['youngmin','smile','그럼 「우주로 간 거북이」부터 읽어. 그림이 많아. 모르는 말 나오면 나한테 물어봐. 나는 세 번 읽어서 다 알아.'],
  {k:'book',goal:'「{x}」 반납 책상에 올리기',bag:['book','notebook','notice_book','textbook','bag']},
  {only:['A'],lines:[{pic:'youngmin_13_A'}]},
  {only:['B'],lines:[{pic:'youngmin_13_B'}]},
  {only:['C'],lines:[{pic:'youngmin_13_C'}]},
  {only:['D'],lines:[{pic:'youngmin_n_ym13D_highfive'}]},
  ['nar','','나는 내 그림책을 반납 {@desk}에 올렸다. 영민이는 두꺼운 {@book|과} 독서 기록장을 같이 내밀었다.'],['nar','','사서 선생님: 「와, 이 {@book} 다 읽었니? 한 달 동안 몇 번이나 다시 빌려 갔지. 선생님이 다 봤어.」'],
  ['nar','','사서 선생님: 「기록장에 {@stamp} 찍어 줄게. 거기 {@stamp} 좀 줄래?」'],
  {k:'stamp',goal:'「{x}」 건네기',bag:['stamp','pencil','eraser','book','scissors']},
  {only:['A'],lines:[{pic:'youngmin_13_A'}]},
  {only:['B'],lines:[{pic:'youngmin_13_B'}]},
  {only:['C'],lines:[{pic:'youngmin_13_C'}]},
  {only:['D'],lines:[{pic:'youngmin_n_ym13D_highfive'}]},
  ['nar','','나는 {@desk} 끝에 놓인 「다 읽었어요」 {@stamp|을} 선생님께 건넸다.'],
  {only:['A'],lines:[{pic:'youngmin_n_ym13c_librarian'}]},
  {only:['B','D'],lines:[{pic:'youngmin_n_ym13c_librarian'}]},
  {only:['C'],lines:[{pic:'youngmin_n_ym13c_librarian'}]},
  ['nar','','선생님이 기록장에 별 {@stamp|을} 쾅 찍으셨다. 영민이가 기록장을 한참 들여다봤다.'],['youngmin','smile','나는 이해하는 데 오래 걸려. 세 번은 읽어야 다 알아.'],
  ['youngmin','smile','나는 키가 크고, 너는 한국어가 아직 서툴잖아. 그거랑 똑같아. 그냥 그런 거야.'],
  {only:['B','D'],lines:[['youngmin','sad','이 {@book}, 너 읽을 거면 다음에 빌려. 나도 한 달 걸렸어.']]},
  {only:['A'],lines:[['nar','','도서관을 나오는데 지훈이가 뒤따라왔다.'],['jihoon','sad','영민아, 아까 「드디어」라고 한 거. 그 말 진짜 별로였어. 미안해.'],['youngmin','sad','……응.']]},
  {only:['C'],lines:[['youngmin','smile','아까 「너도」라고 한 건 좀 그랬어.'],['me','sad','미안해. {@book|이} 너무 두꺼워서 놀란 거였어.'],['youngmin','smile','……응. 두껍긴 해.']]}],
 eve:{lead:[['me','smile','{m}! 영민이가 두꺼운 {@book|을} 한 달 만에 혼자 다 읽었어. 나한테 제일 먼저 말해 줬어. 근데 결말은 마음에 안 든대!'],['mom','smile','너를 믿으니까 제일 먼저 말해 줬구나.']],
  A:[['me','sad','도서관에서 크게 알렸더니 영민이는 나한테만 말한 거래. 미안하다고 했어.'],['mom','smile','너무 기뻐서 다 같이 알았으면 했구나. 그런데 영민이는 너한테만 살짝 말하고 싶었던 거야. 영민이 마음을 알고 바로 미안하다고 해서 다행이야.']],
  B:[['me','smile','결말을 물었더니 비밀이래. 앞부분만 얘기해 줬어.'],['mom','smile','영민이가 이야기를 차근차근 잘 들려줬네.']],
  C:[['me','sad','칭찬하려고 「너도 이런 두꺼운 {@book} 읽을 수 있구나!」 했는데, 「너도」라는 말에 영민이가 속상해했어. 나중에 미안하다고 했어.'],['mom','smile','놀라서 한 말이어도 영민이한테는 다르게 들렸구나. 그래도 사과했네.']],
  D:[['me','smile','하이파이브 했어. 나는 두꺼운 {@book|을} 아직 못 읽었다고 했어.'],['mom','smile','네 이야기도 해 주니까 더 친해졌겠다.']],
  common:[['me','smile','나도 두꺼운 {@book} 끝까지 읽어 볼래!'],['mom','smile','그래. 다 읽으면 영민이한테 제일 먼저 말해 줘.']]}},

// ■ Day 15 — 먼저 가도 돼 (14)
{title:'먼저 가도 돼',scene:'youngmin_n_ym14_junho_door',place:'class',at:[400,870],with:[['junho',1460,250],['jiho',1380,300]],
 pre:[
  ['nar','','종례가 끝났다. 아이들이 우르르 교실을 빠져나갔다.'],
  {k:'bag',goal:'「{x}」 메기',bag:['bag','pcase','water_bottle','lunch_box','notebook']},
  ['nar','','나는 교과서랑 필통, {@water_bottle|을} {@bag}에 넣었다. {@water_bottle} {@lid|은} 딸깍 소리 날 때까지 꼭 닫았다. {@bag} 지퍼를 닫고 어깨에 멨다.'],
  {pic:'youngmin_14a'},['nar','','옆 줄 영민이는 {@notice_book|을} 펴 놓고, 준비물을 손가락으로 하나씩 짚으며 {@bag}에 넣고 있었다. 「교과서, 필통, 체육복……」 영민이는 잘 까먹어서 집에 가기 전에 꼭 이렇게 확인한다.'],
  ['nar','','영민이 {@bag} 옆에는 축구공이 끼워져 있었다. {@ball}에 반듯한 글씨로 「조영민」이라고 적혀 있었다.'],
  {pic:'youngmin_14b'},['nar','','교실 문 앞에서 준호와 지호가 손을 흔들며 나를 불렀다.'],['junho','smile','야, 빨리 나와! 운동장 골대 지금 딱 비었어!'],
  ['jiho','smile','지금 다섯 명이야! 너 오면 딱 여섯 명. 삼 대 삼!'],['nar','','영민이 손가락은 이제 {@notice_book} 셋째 줄에 있었다. 아직 네 줄이 남았다.'],['youngmin','sad','……먼저 가.'],
  ['me','surprised','응?'],['youngmin','smile','나는 하나씩 확인해야 안 까먹어. 다 하고 나갈게. 먼저 가도 돼.'],
  {pic:'youngmin_n_ym14_junho_door'},['nar','','영민이 얼굴이 아주 편해 보였다. 억지로 하는 말이 아니라 진짜 마음이었다.'],['junho','smile','영민이도 같이 하자! 근데 빨리 와야 해. 안 그러면 골대 뺏겨!'],
  ['nar','','영민이 손가락이 잠깐 빨라졌다. 그러다 줄을 놓쳤다. 「어, 어디까지 했지?」 영민이가 첫 줄부터 다시 짚었다.'],
  {flag:'M09',is:1,lines:[['think','smile','(지난번 게시판 붙일 때는 말로 해서 같이 방법을 찾았지. 이번에도 말하면 돼.)']]},
  {flag:'M09',is:0,lines:[['think','smile','(지난번 게시판 때는 급한 마음을 제대로 말 못 했지. 나도 지금 급한데 어떻게 말하지.)']]},
  ['think','surprised','(나도 축구 하고 싶어! 영민이는 먼저 가도 된대. 정말 먼저 가도 될까?)']],
 ask:'어떻게 같이 할까?',
 choices:[
  {k:'A',text:'「나 먼저 갈게. 나 지금 축구 하고 싶어. 다음엔 같이 가자.」',pts:{youngmin:2},r:[
   {pic:'youngmin_14_A'},['youngmin','smile','응, 잘 가. 다음엔 같이 가자.'],['me','smile','응! 그때는 내가 기다릴게.'],
   ['nar','','영민이 손가락이 다시 {@notice_book} 줄을 따라갔다. 나는 준호와 지호를 따라 운동장으로 뛰어나갔다.']]},
  {k:'B',text:'「괜찮아, 기다릴게……」 하고 문 옆에서 {@clock|를} 본다.',pts:{youngmin:1},r:[
   {pic:'youngmin_14_B'},['nar','','준호와 지호가 먼저 뛰어갔다. 나는 창밖을 봤다가, {@clock|를} 봤다가, 또 창밖을 봤다.'],['youngmin','smile','{@clock} 보면서 기다리면 나 불편해. 진짜 먼저 가도 돼.'],
   ['me','sad','……사실 나 조금 급했어. 미안해.']]},
  {k:'C',text:'「준호야, 먼저 가 있어. 나 영민이랑 같이 갈게.」 하고 {@shoes|을} 갈아 신는다.',pts:{youngmin:2},r:[
   {pic:'youngmin_14_C'},['nar','','나는 영민이를 쳐다보지 않았다. 실내화를 벗고 운동화 끈을 묶었다. 풀어서 다시 묶었다. 이번엔 리본을 아주 크게 만들었다.'],
   ['nar','','그사이 영민이가 {@bag|을} 다 쌌다. 영민이도 운동화 끈을 반듯하게 묶었다.'],['youngmin','smile','……끝. 가자.'],['me','smile','응! 나도 딱 지금 다 묶었어. (정말이었다. 내 큰 리본도 막 끝났다.)']]},
  {k:'D',text:'「{@bag} 정리는 집에서 해! 빨리 가자!」 하고 영민이 {@bag} 지퍼를 대신 닫는다.',pts:{youngmin:0},r:[
   {pic:'youngmin_14_D'},['youngmin','smile','어, 그거…… 내 {@bag|이야}. 아직 다 확인 안 했어.'],['nar','','영민이는 남은 교과서를 손에 든 채 뛰었다. {@bag|은} 삐뚤게 메고, {@shoes|은} 뒤꿈치를 구겨 신었다.'],
   ['nar','','운동장에 나왔지만, 영민이는 교과서를 둘 데가 없어서 {@ball|을} 차지 못했다.'],['think','smile','(아차, 내가 {@bag|을} 억지로 닫아서 영민이가 놀지도 못하네.)'],
   ['me','sad','……미안해. 같이 놀고 싶어서 내가 너무 급했어.']]}],
 post:[
  {go:'field'},
  {only:['A'],lines:[{pic:'youngmin_14_A'}]},
  {only:['B'],lines:[{pic:'youngmin_14_B'}]},
  {only:['C'],lines:[{pic:'youngmin_14_C'}]},
  {only:['D'],lines:[{pic:'youngmin_14_D'}]},
  {only:['A'],lines:[['nar','','삼 대 삼 경기를 하고 있는데, 영민이가 {@ball|을} 안고 운동장으로 걸어 나왔다. {@bag|은} 반듯하고 {@shoes} 끈도 깔끔하게 묶여 있었다.'],['youngmin','surprised','나 다 했다. ……나도 껴도 돼?'],['jiho','smile','오, 왔다! 그럼 사 대 삼! 영민이 우리 편!']]},
  {only:['B','C','D'],lines:[['nar','','운동장에 모여 있을 때 영민이가 {@bag} 옆에 끼운 {@ball|을} 꺼냈다.'],['junho','sad','우와, 영민이 {@ball}이다! 이름도 반듯하게 써 놨네. 아까는 골대 생각만 해서 재촉했어. 미안! 영민이도 같이 하자.']]},
  {pic:'youngmin_n_ym14c_tall'},['youngmin','smile','이걸로 해도 돼. 내 {@ball|이야}.'],
  {k:'shoes',goal:'「{x}」 끈 다시 묶기',bag:['shoes','sock','hand','pocket','indoor_shoes']},
  {pic:'youngmin_n_ym14c_tall'},
  {only:['A','B','C'],lines:[['nar','','{@ball|을} 차기 전에, 나는 풀린 {@shoes} 끈을 다시 묶었다. 영민이는 옆에서 자기 {@shoes} 끈을 내려다봤다. 아주 반듯했다.']]},
  {only:['D'],lines:[['nar','','{@ball|을} 차기 전에, 나는 풀린 {@shoes} 끈을 다시 묶었다. 영민이는 옆에서 구겨 신은 {@shoes|을} 고쳐 신었다.']]},
  {only:['A','C'],lines:[['youngmin','smile','있잖아. 아까 「먼저 가」라고 한 건 진짜였어.'],['me','relieved','알아. 네 얼굴이 편해 보였거든.'],['youngmin','smile','……너 이제 내 얼굴만 봐도 아는구나.']]},
  {only:['B','D'],lines:[['youngmin','smile','다음엔 진짜 먼저 가도 돼. {@bag|은} 나 혼자 싸는 게 편해.'],['me','smile','……응. 알았어.']]}],
 eve:{lead:[['me','relieved','{m}, 종례 끝나고 애들이 축구하자고 했어. 영민이는 아직 {@bag} 싸는 중이었는데 먼저 가도 된대. 얼굴이 아주 편해 보였어.'],['mom','smile','얼굴 보고 진심인 줄 알았구나.']],
  A:[['me','relieved','먼저 갔어. 조금 있다가 영민이가 {@ball} 들고 나왔어.'],['mom','smile','영민이 말을 그대로 믿어 줬구나.']],
  B:[['me','smile','기다린다고 해 놓고 {@clock|를} 계속 봤어. 영민이가 불편하대.'],['mom','smile','가고 싶을 땐 가고 싶다고 말해도 괜찮아.']],
  C:[['me','smile','{@shoes} 끈 묶으면서 기다렸다가 같이 갔어.'],['mom','smile','둘 다 편하게 같이 갔구나.']],
  D:[['me','smile','영민이 {@bag|을} 물어보지도 않고 닫았어. 영민이가 교과서를 들고 뛰느라 {@ball|을} 못 찼어. 그래서 미안하다고 했어.'],
   ['mom','smile','같이 놀고 싶어서 급했구나. 그런데 영민이는 하나씩 확인하던 중이었잖아. 다음엔 「기다릴게, 같이 가자」 하고 말하면 되겠다.']],
  common:[{only:['B','D'],lines:[['me','smile','영민이는 {@bag} 혼자 싸는 게 편하대. 다음엔 「먼저 가」 하면 그 말을 믿을래.']]},
   {only:['A','C'],lines:[['me','smile','영민이 「먼저 가」는 진짜였대. 이제 얼굴만 봐도 진짜인지 알아.']]},
   ['mom','smile','기다려 줄 날도 있고, 먼저 가도 되는 날도 있지.']]}},

// ■ Day 16R — 지워도 돼 (15)
{title:'지워도 돼',scene:'youngmin_15',place:'class',at:[400,870],with:[['jiho',600,760],['jihoon',470,890]],
 pre:[
  {pic:'youngmin_15a'},['nar','','마지막 수업이 끝났다. 선생님이 {@blackboard}에 {@notice_book|을} 다섯 줄 쓰셨다.'],['nar','','선생님: 「다 쓴 사람은 {@bag} 싸요. 이번 주 {@blackboard} 당번은 누구죠?」'],
  ['me','smile','저요!'],['nar','','이번 주 {@blackboard} 지우기는 내 차례다. 나는 칠판지우개를 {@desk}에 올려놓고 {@notice_book}부터 꺼냈다.'],
  {k:'notice_book',goal:'「{x}」 꺼내기',bag:['notice_book','notebook','pcase','textbook','water_bottle']},
  {pic:'youngmin_15a'},['nar','','다섯 줄을 따라 썼다. 받침 많은 줄은 두 번 봤다. 처음보다 조금 빨라졌다. 아주, 아주 조금.'],['nar','','옆 줄 영민이는 넷째 줄을 쓰고 있었다. 손가락으로 {@blackboard} 줄을 하나씩 짚으면서.'],
  {pic:'youngmin_n_ym15b_jihoon'},['nar','','아이들이 하나둘 {@bag|을} 쌌다. 지호가 내 옆을 지나가다 영민이 쪽을 봤다.'],['jiho','surprised','영민이 아직 쓰고 있어. 지우지 마! 너 당번이지?'],
  ['nar','','지호가 먼저 말했다. 예전에 {@blackboard|을} 제일 빨리 지우던 그 지호가.'],['jihoon','surprised','영민아, 몇 줄 남았어?'],['youngmin','smile','한 줄 반.'],
  {pic:'youngmin_15'},['nar','','그때 영민이가 {@pencil|을} 멈추고 나를 봤다.'],['youngmin','smile','지워도 돼.'],['me','surprised','어?'],
  ['youngmin','smile','네 {@notice_book} 보고 쓸게. 너 {@blackboard} 지워야 집에 가잖아.'],['youngmin','sad','진짜야. 네 글씨 보고 쓰면 돼.'],['nar','','영민이 얼굴은 편했다. 목소리도 작지 않았다.'],
  {flag:'M08_wait',is:1,lines:[['think','smile','({@notice_book} 쓰던 날, 영민이가 「잠깐, 두 줄 남았어」 했었지. 오늘은 영민이가 먼저 「지워도 돼」 해.)']]},
  {flag:'M08_wait',is:0,lines:[['think','smile','({@notice_book} 쓰던 날, 나는 영민이 말을 끊었었지. 오늘은 영민이가 먼저 자기 생각을 말해.)']]},
  {flag:'M05_way',is:1,lines:[['think','smile','(이야기 이어 쓰기 때 영민이가 빈칸 방법을 알려 줬지. 오늘은 영민이가 어떻게 할지 스스로 정했어.)']]},
  {flag:'M05_B',is:1,lines:[['think','smile','(이야기 이어 쓰기 때 나는 영민이 방법을 아기 같다고 했었지. 오늘은 영민이가 먼저 자기 생각을 말해.)']]},
  {flag:'M05_way',is:0,lines:[{flag:'M05_B',is:0,lines:[['think','smile','(이야기 이어 쓰기 때 나는 건너뛰자고 했었지. 영민이는 「속상하겠다」 해 줬어.)']]}]},
  ['think','sad','(기다려 줄까? 아니면 영민이 말을 믿을까? 집에는 빨리 가고 싶은데.)']],
 ask:'어떻게 할까?',
 choices:[
  {k:'A',text:'「아니야, 기다릴게. 다 쓸 때까지 안 지울 거야.」 하고 {@blackboard} 앞에 선다.',pts:{youngmin:1},r:[
   {pic:'youngmin_n_ym15_board_lines'},['youngmin','smile','……나 진짜 괜찮은데.'],['me','smile','괜찮아. 나 기다리는 거 잘해.'],
   ['nar','','영민이가 다시 썼다. 그런데 {@blackboard} 앞에 선 나를 자꾸 봤다. {@pencil} 끝이 조금 빨라졌다.'],['youngmin','smile','……너 집에 늦게 가잖아.'],
   ['think','smile','(기다려 주려고 했는데, 영민이가 나를 걱정하고 있네. 영민이는 지워도 된다고 했는데.)']]},
  {k:'B',text:'「알았어. 내 {@notice_book} 여기 둘게.」 하고 영민이 {@desk}에 펴 두고 {@blackboard|을} 지운다.',pts:{youngmin:2},r:[
   {pic:'youngmin_15_B'},['youngmin','smile','응.'],['nar','','영민이가 내 {@notice_book|을} 손가락으로 짚으며 넷째 줄을 이어 썼다. 나는 {@blackboard|을} 왼쪽부터 쓱쓱 지웠다. 뒤돌아보지 않았다.'],
   ['nar','','다 지우고 돌아서자, 영민이는 다섯째 줄을 쓰고 있었다. 하나도 서두르지 않았다.']]},
  {k:'C',text:'「그럼 다른 줄부터 지울게. 네가 쓰는 줄은 맨 마지막에 지워도 돼?」',pts:{youngmin:2},r:[
   {pic:'youngmin_n_ym15C_board_lines'},['youngmin','smile','응. 그게 더 좋아. 다섯째 줄은 네 거 보고 쓸게. 넷째 줄만 남겨 줘.'],
   ['nar','','나는 넷째 줄만 남기고 다 지웠다. {@blackboard} 한가운데에 한 줄만 덩그러니 남았다.'],['jiho','surprised','{@blackboard}에 한 줄만 있네! 무슨 비밀 암호야?'],
   ['nar','','영민이가 넷째 줄을 다 쓰고 {@pencil|로} {@blackboard|을} 가리켰다.'],['youngmin','smile','이제 지워.']]},
  {k:'D',text:'「그럼 내가 불러 줄게! 받아 써!」 하고 {@eraser|를} 든 채 빠르게 불러 준다.',pts:{youngmin:0},r:[
   {pic:'youngmin_15_D'},['me','smile','넷째 줄, 수학 익힘책 40쪽까지! 다섯째 줄, 체육복 챙기기!'],['youngmin','smile','어, 잠깐. 넷째 줄 아직……'],
   ['nar','','내 목소리가 영민이 손보다 빨랐다. 영민이가 {@pencil|을} 멈추고 나를 봤다.'],['youngmin','smile','네 거 보고 쓴다고 했잖아. 불러 주면 더 바빠.'],
   ['me','sad','아…… 미안. 빨리 지우고 싶어서 그랬어. {@notice_book} 여기 둘게.'],['nar','','나는 내 {@notice_book|을} 영민이 {@desk}에 펴 두었다. 영민이는 다시 자기 속도로 썼다.']]}],
 post:[
  {only:['A'],lines:[{pic:'youngmin_n_ym15_board_lines'}]},
  {only:['B'],lines:[{pic:'youngmin_15_B'}]},
  {only:['C'],lines:[{pic:'youngmin_n_ym15C_board_lines'}]},
  {only:['D'],lines:[{pic:'youngmin_15_D'}]},
  {only:['B','C'],lines:[['nar','','영민이가 마지막 글자를 쓰고 {@notice_book} 모서리를 맞춰 덮었다. 「……끝.」']]},
  {only:['A','D'],lines:[['nar','','영민이가 다 쓰고 {@notice_book|을} 덮었다. 「……끝.」 그리고 나를 한 번 봤다.']]},
  {k:'blackboard',goal:'「{x}」 깨끗하게 닦기'},
  {only:['A'],lines:[{pic:'youngmin_n_ym15_board_lines'}]},
  {only:['B'],lines:[{pic:'youngmin_15_B'}]},
  {only:['C'],lines:[{pic:'youngmin_n_ym15C_board_lines'}]},
  {only:['D'],lines:[{pic:'youngmin_15_D'}]},
  ['nar','','나는 {@blackboard}에 남은 {@eraser} 자국을 위에서 아래로 한 번 더 닦았다. 분필 가루가 퐁 날렸다.'],
  {pic:'youngmin_15c'},['nar','','영민이가 {@bag|을} 메고 내 옆에 섰다.'],['youngmin','smile','있잖아. 오늘 아침에 「급해」가 제일 먼저 밥 먹었어. 처음이야.'],['me','surprised','진짜? 「급해」가?'],
  ['youngmin','laugh','응. 근데 다음엔 또 늦게 먹을 거야.'],['me','smile','그래도 다 먹지.'],['youngmin','smile','응. 그래도 다 먹어.'],
  {only:['B','C'],lines:[['youngmin','smile','기다려 주는 친구한테 「지워도 돼」 한 거, 오늘이 처음이야.'],['me','smile','나도 오늘은 네 말 믿고 지웠어.'],['youngmin','smile','……그것도 좋더라.']]},
  {only:['A','D'],lines:[['youngmin','smile','다음엔 내가 「지워도 돼」 하면 그냥 지워. 진짜일 때만 그렇게 말할게.'],['me','smile','응. 다음엔 네 말 믿고 지울게.']]},
  {only:['A'],lines:[{pic:'youngmin_n_ym15_jiho_door'}]},
  {only:['B','C','D'],lines:[{pic:'youngmin_n_ym15_jiho_door'}]},
  ['nar','','「급해」 이야기를 듣던 지호가 교실 문 앞에서 돌아봤다.'],['jiho','smile','영민아, {@fish} 밥 주는 거 나도 해 보고 싶어.'],['youngmin','smile','톡톡톡, 세 번만. 다음에 같이 줘 보자.'],
  ['nar','','우리는 같이 복도로 나왔다. 영민이 {@bag} 옆에서 {@ball|이} 흔들렸다.'],['youngmin','smile','너 두꺼운 {@book} 끝까지 읽으면 말해. 축하해 줄게.'],['me','smile','오래 걸릴 거야.'],
  ['youngmin','smile','괜찮아. 나 기다리는 거 잘해.'],
  {only:['B','C','D'],lines:[['nar','','나도 영민이한테 똑같이 말해 주고 싶었다.']]},
  {only:['A'],lines:[['nar','','그건 아까 내가 영민이한테 한 말이었다.']]},
  ['think','smile','(나는 한국어가 느리고, 영민이는 이해가 느리다. 준호는 기다리는 게 어렵고, 지호는 말이 먼저 나온다. 다 다르다. 그래서 각자 자기 방법이 있다.)']],
 eve:{lead:[['me','relieved','{m}, 오늘 내가 {@blackboard} 당번이었어. 영민이가 아직 {@notice_book|을} 쓰는데, 지호가 먼저 「지우지 마」 했어. 그런데 영민이는 「지워도 돼, 네 거 보고 쓸게」 했어.'],
   ['mom','smile','지호가 먼저 챙겨 줬구나. 영민이는 어떤 얼굴이었어?'],['me','smile','편한 얼굴이었어. 진짜로 괜찮은 얼굴.']],
  A:[['me','smile','그래도 기다린다고 했어. 영민이가 오히려 나 늦게 갈까 봐 걱정했어.'],['mom','smile','기다려 주는 게 늘 좋은 건 아니구나. 영민이가 괜찮다고 하면 그 말을 믿어 줘도 돼.']],
  B:[['me','smile','내 {@notice_book} 펴 두고 지웠어. 영민이는 안 서두르고 다 썼어.'],['mom','laugh','영민이 말을 믿었구나. 영민이도 마음 편했겠다.']],
  C:[['me','smile','영민이 줄만 남기고 지웠어. 영민이가 「이제 지워」 했어.'],['mom','smile','언제 지울지 영민이가 정하게 했네.']],
  D:[['me','sad','{@blackboard} 글을 내가 빨리 불러 줬더니 영민이가 더 바쁘대. 그래서 미안하다고 하고 {@notice_book|을} 펴 줬어.'],
   ['mom','smile','빨리 끝내 주고 싶었구나. 그런데 영민이는 「네 거 보고 쓸게」 하고 방법을 먼저 말했잖아. 그 말대로 {@notice_book|을} 펴 주니까 영민이가 편하게 썼지.']],
  common:[['me','sad','영민이가 「나 기다리는 거 잘해」 했어. 그리고 영민이는 싫으면 싫다고 말해. 그래서 나도 그냥 물어보면 돼.'],['mom','smile','서로 기다려 주는 사이가 됐구나.']]}}
];

// the new words in Youngmin's scenes (notice book, blackboard, lid, magnet, pencil, chair, notebook, paper, eraser, book, clock, desk, tape, scissors, colored pencil, cup, bag, shoes are already in the game)
window.EP_WORDS_YM={
 fish:{ko:'물고기',en:'fish',id:'ikan',vi:'con cá',zh:'鱼',ja:'さかな',ru:'рыбка'},
 bookshelf:{ko:'책꽂이',en:'bookshelf',id:'rak buku',vi:'giá sách',zh:'书架',ja:'ほんだな',ru:'книжная полка'},
 worksheet:{ko:'학습지',en:'worksheet',id:'lembar kerja',vi:'phiếu bài tập',zh:'练习纸',ja:'プリント',ru:'листок с заданиями'},
 bucket:{ko:'양동이',en:'bucket',id:'ember',vi:'cái xô',zh:'水桶',ja:'バケツ',ru:'ведро'},
 stamp:{ko:'도장',en:'stamp',id:'stempel',vi:'con dấu',zh:'印章',ja:'はんこ',ru:'штамп'},
 water_bottle:{ko:'물통',en:'water bottle',id:'botol minum',vi:'bình nước',zh:'水壶',ja:'すいとう',ru:'бутылка'}};

// ---- what Youngmin's scenes need from the engine (on top of meet.js and the other per-friend files) ----
// a choice's reaction (r) is said as plain lines; when it holds {pic}/{lay} steps it plays at the start of post instead (runSteps handles those)
for(const e of EP.youngmin)for(const o of e.choices)if(o.r&&o.r.some(x=>!Array.isArray(x))){e.post=[{only:[o.k],lines:o.r}].concat(e.post||[]);o.r=[]}
{const add=window.EP_WORDS_YM;for(const[k,w]of Object.entries(add))if(!D2WORDS[k])D2WORDS[k]=w;d2Merge()}
for(const k of Object.keys(EP_WORDS_YM).concat(['desk']))CARDS_HAVE.add(k);
// test shortcuts: #ym5 = the morning of the day you meet Youngmin the 5th time (Day 6); #ym5eve = that evening; #ym15b = Day 16R with the flags off
{const h=location.hash.match(/^#ym(\d+)(eve|b)?$/);
 if(h)setTimeout(()=>{const k=+h[1];HEART_D1={};FOUND.add('handkerchief');MEET={youngmin:k-1};
  if(h[2]!=='b'){if(k>5)FLAGS.M05_way=true;if(k>8)FLAGS.M08_wait=true;if(k>9)FLAGS.M09=true}
  const day=k+1;
  if(h[2]!=='eve'){startDay(day);return}
  setDay(day);PICKS=['youngmin'];EPIDX.youngmin=k-1;TODAYEP.youngmin=EP.youngmin[k-1];MEET.youngmin=k;D2CHOICE.youngmin='B';
  stage='d2_after';load('class');useDoor()},101)}
// Youngmin's scenes at the fish tank (meetings 1 and 12; 11/21 new order) happen on foot: he stands at the scene's spot instead of sitting at the nearest desk.
// In meetings 1, 3 and 12 the kids the scene brings along leave their own desks and come to the scene (they are already in the classroom,
// so meet.js would otherwise leave them where they sit).
{const STAND=new Set([0,11]),GATHER=new Set([0,2,11]);
 const _dpYm=d2People;d2People=function(id){const ps=_dpYm(id),e=epNext('youngmin',EPIDX.youngmin);
  if(e&&STAND.has(EP.youngmin.indexOf(e))&&e.place===id&&!PICKS.includes('youngmin'))for(const p of ps)if(p[0]==='youngmin'){p.length=3;p[1]=e.at[0];p[2]=e.at[1];p[4]='stand'}
  return ps};
 const _dtYm=d2Talk;d2Talk=function(id){const e=id==='youngmin'&&epNext(id,EPIDX[id]);
  if(e&&GATHER.has(EP.youngmin.indexOf(e))&&!PICKS.includes(id)&&stage==='d2_class'&&PICKS.length<needToday())
   for(const w of e.with||[]){const n=npcs.find(n=>n.id===w[0]);if(n&&Math.hypot(n.x-w[1],n.y-(w[3]?w[3].top+150:w[2]))>150){n.el&&n.el.remove();npcs=npcs.filter(m=>m!==n)}}
  return _dtYm(id)}}
if(typeof HEROPIC!=='undefined')HEROPIC.add('youngmin_02_A');// (11/16 owner) I snatch Yena's fish food jar: girl/boy hero versions
