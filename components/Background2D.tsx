import React, { useEffect, useRef, useCallback } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  targetSize: number;
  hue: number;
  targetHue: number;
  opacity: number;
  targetOpacity: number;
  life: number;
  maxLife: number;
  type: 'orb' | 'trail' | 'line' | 'pulse';
  baseSpeed: number;
  baseSize: number;
  baseOpacity: number;
  clusterId: number | null;
  relationships: Set<number>;
  history: { x: number; y: number }[];
  parentId: number | null;
  generation: number;
  mutationRate: number;
  seed: number;
}

const PHI = (1 + Math.sqrt(5)) / 2;
const FIBONACCI = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

const seededRandom = (seed: number): number => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const fibonacciMod = (n: number, mod: number): number => FIBONACCI[n % FIBONACCI.length];
const goldenRatio = (n: number): number => (n * PHI) % 1;
const phi分布 = (seed: number, n: number): number => (seed + n * PHI) % 1;

let particleIdCounter = 0;
const uniqueId = () => ++particleIdCounter;

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
const clamp = (val: number, min: number, max: number): number => Math.max(min, Math.min(max, val));
const distance = (x1: number, y1: number, x2: number, y2: number): number => 
  Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

const PI_DIGITS = '314159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196442881475665823756081908302203460252662827788174896112800065123562509401672096048414660952392019381380472000565327665451160148107102134091224081697123868437151908460165002691891402384802652356642670435518761768606900318579274929802553588793075061475221618706057741078181531171236263004931243531019402173831831296209392630549833009607027005385113091869787118793122465349804495024883243728850587786523512034652131509256933990342810520885516527652710284887822446475779838051751203758202613375209947088255253743861296531170912397009093385771713490017753933533092042969310295762452190409739520757155795591983512145706021007957228941287235263256564065854738957417601056252925995482091141370309038332561171486488924392128061155460179929885102664821903210299644060859203998374896084772768547532884321174011254556932805857242492951830568306215110826282865440552211275744042601058490526520418008393181090190451870555644491555352660504885772552791346544379247709830257362190109708083104120420918496957917500642425130819309673254038733612740992888516980529875418387233805395113267984304627930042422787878840326125282346296846446950961048823841196280962610555963059499621887159305453671967766774066988651367695828268825030441676428064450606230764934166530237524587552707510333572662021391927456294976984521263041204375787028855927066519935552650141012562602336472980340012764766784280130722019752542549262878111951231857358469849824821531967970530591592024536465005002984201199004221255489401817571301945948553845790055068033485102010290411431348595704967126151054504801618628564960698119881629628427488812270785789911501880595285281433497563230888028327498991291636191275385202338982102532524931665405774078426584837272765083688577772352975420689037174509259486025901629628109488311422206479108090230776846896820441714988169560538930181972788454012134968941514582005726024294910123691552081619757903570091229053945551604366796110553628111759551378232532710968955484767502972587250544981332001009921453421026233608218358134983379318010906926515888455522266202835932754789069927557478164395343132535700501508955561807068185290559321554078700000560301831919680421984173362394059915980004515946945728710916628021285630088902518442787944895646513655231048076182007824231917992410565110662616388401525010049893524054869659728507713993576552402437125062546535957698408812494561761809670817771700650652383193564995862663548036402928530134889863783101907138322655888436839979567663556344043910178610787627292810415039740292991870436079993087961552472067868036892074798109880470270053002002477797783371883282577524252957443803430725044196000431922625113640703887581552524529191820142135713055978812003009777497209314031265200498725091832467208826504898906521552310023883114889342543856867531053018268784610852691833678976536752016072630327067563081632011850507019366002207545509807992690471047905491725862105182532434534056357011555636343660542424069300656720646070318847752644609207530939281795823929660998600365413810017922857789573916006672192850451680773522791762589182372588922086410080267348198601817205982608752437670958162909947401608298942568844062256982935526019156220372932575274131731998867113455969802056532018652491165210453690995321699314920697008627450259987917542471383461254993265840907746884022850566468545489091879005525477932688263167650298728776323918690701816356365650759409960201658636162425422560710023786768960497486906178837625847965842451832965385349243220096188691509288455457667184034980285112907467823402363496379667895166096769491802254756292453512043908175550071867600566722835699734738734618470580632004500450617917604368935782873036029922329387589671237235234941811575960952041708031858754646517310314402769380315422564352932970832849369194008960787788626288458820121902083214412362252573946370229490031606665362933154560729363979564751778254799917390038622239188325044184143024620775257610563437770275324329332196349746760867601316361857374965490982902051283778866999999772929380938227446552793489172412326612952875476982582523128037920539837561943469362393258621551255881494588744995024304007986198345861890475037519528047912559956153132115261102814233487919652700033867042656519918069430108967766370060012633144248409030658218450384310428227552512039462250016021745313645112187495506552531194732150361006660042258552532319965206246053226724102018737067961982790743659362046219401451527604644210728852818547971924826582989917638521840321692717906807348871272983197839024539033889960907770561415972640065855162156482249934083406318406297345477842059958864547517294005431755792000452048550381275920023029055229486376666571440997249713432534114730366802066666666982992404709838044554382415262201470752962267575712141890659752299692698715784546546629836065573328809761876768072413528842691788305163006987608448530085067360659684783817700985650946591751950028790481551787596424033286119250219257927863880878014076914882480528030682416129499824782084018759136791058050753953555304349912819664422474912263681852383656331534520967674369621154711696950200560082926650572228901887642275578185321198384003802041652763573456534052917342534093101878684660494884051769547163057142084637253045567960885061646523036529222744293552555555030123615798383081820201009032440229340797291952858632243020499807598832800008741859812104276595329653443091688473534586568084918210772634442419580202765071848823351652556553532972045095767530952060335218201058666844373935188641916588222068286208907010380007196326325411625338877917941822808337804697439772935652181155202924707439140367497010557992528381627437295373995362850959212383353252776596500203046017552520048226008508542066416383370282941789962129282883005611188992044042820470310381539021951864788519160040235692970302529090139692202952707441210409673904081647689211934576519078561812782384878917965829030680910292237538529775100520870327936312507812685777091072969599582797106415227742493918802194294812523400877626025556078762482683417010055143017861579542976051958065133603344603420660892572520793815295985020375523705045707572254508128217232229211314825912739840310455524691258930583136542076437217312312051960787421337976000102908092060992425476198310802967507876071004802000987037544040509655472524056320524687772995009957956981730917957813576657818155625626574988024001027422015572236129253254322923991838117622502105565247082930952426034613112466476625035852436197935510593525422775658923955384671832885044125440826747002520008764604078566917363359538401840640059711362610210495431071570152695632955216691601443934181906598045475914031491784515789878008575718796919501857517307826939561578552730587446767871877500464952732542031056256896772955697422976235649005950171997360368844252800604855254985802650000939673037919595956253802097253439585267720364641652426214255565085097016252203055657594761252969241030920321921626732046974524636236974955968776016972553950960428249392917450968741896413522993671061219329999444748888947609326245605048312260534062690754210552510541977100958788412683788112051707001643760236610252544189594178824890250635044005100682787443790141865583485119184197802454416600536765562950778510523609588755253765557195401367527011751218444003100552505717178810097453482437138434033895253132296744773667772371516578256993365878052803965825627555455282040917828468646952081870838156576992965946083063630233796821048649018917073555569280885003329524990854048446425632066633952012829020960225914929058589572667184744998915042077081066103162210516097901849577807948704109697565677955414934961089900950075592846667252547793522471282062966730224061664321091826125280348821070680200422258727948325532522079995684878495987912545818797316369542002482900986598765955912905822317960484729036007261882552791752960022918762266442919812620402710647066888004483292900008608080778331970918021762455539154864097555878874155560081770387588201997446779238990286045705038508562919900391370571049766854839352768695918300788047914066395356548513310120541555366249140429403600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
const PI_LENGTH = PI_DIGITS.length;

const getPIDigit = (index: number): number => {
  index = Math.floor(index) % PI_LENGTH;
  index = index < 0 ? index + PI_LENGTH : index;
  return parseInt(PI_DIGITS[index], 10);
};

const PI_VALUES = new Map<number, number>();
const getPIValue = (index: number, decimalPlaces: number = 4): number => {
  if (PI_VALUES.has(index)) return PI_VALUES.get(index)!;
  let result = 0;
  let scale = 1;
  for (let i = 0; i < decimalPlaces; i++) {
    result += getPIDigit(index + i) / scale;
    scale *= 10;
  }
  PI_VALUES.set(index, result);
  return result;
};

const piProbabilities = (seed: number, index: number, total: number): number => {
  const piValue = getPIValue(index, 5);
  const normalized = (piValue * seed * PHI) % 1;
  return Math.abs(normalized);
};

export const InfiniteProcedural2D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const clustersRef = useRef<Map<number, number[]>>(new Map());
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const scrollRef = useRef({ x: 0, y: 0 });
  const spaceRef = useRef({ width: 0, height: 0, scrollX: 0, scrollY: 0 });
  const mouseRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const targetActivityRef = useRef(0);
  const currentActivityRef = useRef(0);
  const idleTimeRef = useRef(0);

  const createParticle = useCallback((canvas: HTMLCanvasElement, activityMultiplier: number, index: number = 0): Particle => {
    const types: Particle['type'][] = ['orb', 'trail', 'line', 'pulse'];
    const typeWeights = [0.4, 0.35, 0.15, 0.1];
    const piRand = piProbabilities(canvas.width * canvas.height, index, 1000);
    const rand = piRand;
    let selectedType: Particle['type'] = 'orb';
    let cumulative = 0;
    for (let i = 0; i < types.length; i++) {
      cumulative += typeWeights[i];
      if (rand < cumulative) { selectedType = types[i]; break; }
    }
    
    const piRandX = piProbabilities(canvas.width, index * 2, 1000);
    const piRandY = piProbabilities(canvas.height, index * 2 + 1, 1000);
    const x = spaceRef.current.scrollX + piRandX * canvas.width;
    const y = spaceRef.current.scrollY + piRandY * canvas.height;
    const baseSpeed = selectedType === 'pulse' ? 0.3 : selectedType === 'trail' ? 0.5 : 0.8;
    const baseSize = Math.random() * 2 + 0.5;
    const seed = Math.random() * 10000;
    
    return {
      id: uniqueId(),
      x, y,
      vx: (Math.random() - 0.5) * baseSpeed * activityMultiplier,
      vy: (Math.random() - 0.5) * baseSpeed * activityMultiplier,
      size: baseSize,
      targetSize: baseSize,
      hue: Math.random() > 0.7 ? Math.random() * 60 + 340 : 0,
      targetHue: 0,
      opacity: Math.random() * 0.4 + 0.1,
      targetOpacity: Math.random() * 0.4 + 0.1,
      life: 0,
      maxLife: Math.random() * 400 + 200,
      type: selectedType,
      baseSpeed,
      baseSize: 1,
      baseOpacity: 1,
      clusterId: null,
      relationships: new Set(),
      history: [],
      parentId: null,
      generation: 0,
      mutationRate: 0.1,
      seed
    };
  }, []);

  const createDescendant = useCallback((
    parent: Particle, 
    canvas: HTMLCanvasElement, 
    activityMultiplier: number,
    childGeneration: number
  ): Particle => {
    const childSeed = parent.seed * PHI + childGeneration;
    const r1 = seededRandom(childSeed);
    const r2 = seededRandom(childSeed * 2);
    const r3 = seededRandom(childSeed * 3);
    const r4 = seededRandom(childSeed * 4);
    const r5 = seededRandom(childSeed * 5);
    
    const mutationFactor = parent.mutationRate * goldenRatio(childGeneration);
    const mutated = r1 < parent.mutationRate;
    
    const types: Particle['type'][] = ['orb', 'trail', 'line', 'pulse'];
    const piTypeProb = piProbabilities(parent.id, childGeneration, types.length);
    const typeIndex = mutated 
      ? Math.floor(piTypeProb * types.length) 
      : types.indexOf(parent.type);
    const selectedType = types[Math.max(0, Math.min(typeIndex, types.length - 1))];
    
    const fibOffset = fibonacciMod(childGeneration, 12);
    const piAngle = getPIValue(childGeneration * 10, 5) * Math.PI * 2;
    const angle = piAngle * goldenRatio(childGeneration);
    const parentDist = parent.size * (fibOffset + 1);
    
    const piX = piProbabilities(parent.x, childGeneration, canvas.width);
    const piY = piProbabilities(parent.y, childGeneration, canvas.height);
    const x = parent.x + Math.cos(angle) * parentDist * (mutated ? piX : 0.5);
    const y = parent.y + Math.sin(angle) * parentDist * (mutated ? piY : 0.5);
    
    const speedMutate = mutated ? (r5 - 0.5) * 2 * mutationFactor : 1;
    const baseSpeed = (selectedType === 'pulse' ? 0.3 : selectedType === 'trail' ? 0.5 : 0.8) * speedMutate;
    const sizeMutate = mutated ? 1 + (r1 - 0.5) * mutationFactor : 1;
    const baseSize = parent.baseSize * sizeMutate * goldenRatio(childGeneration);
    
    const hueMutation = mutated ? (r2 - 0.5) * 60 * mutationFactor : 0;
    const hue = parent.hue > 0 ? (parent.hue + hueMutation) % 360 : (r3 > 0.7 ? r4 * 60 + 340 : 0);
    
    const velocityInherit = mutated ? 0.5 : 0.8;
    const vx = parent.vx * velocityInherit + (r5 - 0.5) * baseSpeed * activityMultiplier * mutationFactor;
    const vy = parent.vy * velocityInherit + (r1 - 0.5) * baseSpeed * activityMultiplier * mutationFactor;
    
    const lifeMutate = mutated ? r2 * 0.5 : 1;
    const maxLife = parent.maxLife * lifeMutate * goldenRatio(childGeneration);
    
    return {
      id: uniqueId(),
      x, y,
      vx, vy,
      size: Math.max(0.3, baseSize),
      targetSize: Math.max(0.3, baseSize),
      hue,
      targetHue: hue,
      opacity: Math.max(0.05, parent.opacity * (mutated ? r3 : 0.9)),
      targetOpacity: Math.max(0.05, parent.opacity * (mutated ? r4 : 0.9)),
      life: 0,
      maxLife: Math.max(50, maxLife),
      type: selectedType,
      baseSpeed,
      baseSize: Math.max(0.3, baseSize),
      baseOpacity: parent.baseOpacity * (mutated ? r5 : 1),
      clusterId: parent.clusterId,
      relationships: new Set(),
      history: [{ x: parent.x, y: parent.y }],
      parentId: parent.id,
      generation: childGeneration,
      mutationRate: Math.min(0.5, parent.mutationRate * (1 + mutationFactor)),
      seed: childSeed
    };
  }, []);

  const calculateActivityLevel = useCallback((): number => {
    const mouseVelocity = Math.sqrt(mouseRef.current.vx ** 2 + mouseRef.current.vy ** 2);
    const timeSinceInteraction = idleTimeRef.current;
    const interactionDecay = Math.exp(-timeSinceInteraction / 2000);
    const velocityBoost = clamp(mouseVelocity / 15, 0, 1);
    return clamp(velocityBoost * 0.7 + interactionDecay * 0.3, 0, 1);
  }, []);

  const getSpawnRate = useCallback((activity: number): number => lerp(8, 3, activity), []);
  
  const getEntityMultiplier = useCallback((activity: number, time: number, index: number) => {
    const noise = seededRandom(index + time * 0.1);
    const wave1 = Math.sin(time * 2 + index) * 0.3;
    const wave2 = Math.cos(time * 1.5 + index * 0.5) * 0.2;
    return {
      speed: 1.0 + noise * 1.5 + wave1,
      size: 0.5 + noise * 1.0 + wave2,
      opacity: 0.5 + noise * 0.8 + wave1 * 0.3,
      life: 1.2 + noise * 1.2
    };
  }, []);

  const updateRelationships = useCallback((particles: Particle[]) => {
    const relationshipRadius = 80;
    const maxRelationships = 4;
    
    particles.forEach(p1 => {
      if (p1.relationships.size >= maxRelationships) return;
      
      particles.forEach(p2 => {
        if (p1.id === p2.id || p1.relationships.has(p2.id)) return;
        if (p1.relationships.size >= maxRelationships) return;
        
        const dist = distance(p1.x, p1.y, p2.x, p2.y);
        
        if (dist < relationshipRadius) {
          const affinity = 1 - (dist / relationshipRadius);
          
          if (Math.random() < affinity * 0.1) {
            p1.relationships.add(p2.id);
            p2.relationships.add(p1.id);
          }
        }
      });
    });
  }, []);

  const applyRelationshipForces = useCallback((particles: Particle[], activity: number) => {
    const cohesionStrength = lerp(0.0005, 0.005, 1 - activity);
    const separationDist = 30;
    const separationStrength = 0.05;
    
    particles.forEach(p1 => {
      if (p1.relationships.size === 0) return;
      
      let avgX = 0, avgY = 0, count = 0;
      
      particles.forEach(p2 => {
        if (!p1.relationships.has(p2.id)) return;
        
        const dist = distance(p1.x, p1.y, p2.x, p2.y);
        
        if (dist > 0 && dist < separationDist) {
          p1.vx += ((p1.x - p2.x) / dist) * separationStrength;
          p1.vy += ((p1.y - p2.y) / dist) * separationStrength;
        }
        
        avgX += p2.x;
        avgY += p2.y;
        count++;
      });
      
      if (count > 0) {
        avgX /= count;
        avgY /= count;
        
        p1.vx += (avgX - p1.x) * cohesionStrength;
        p1.vy += (avgY - p1.y) * cohesionStrength;
      }
    });
  }, []);

  const drawRelationships = useCallback((ctx: CanvasRenderingContext2D, particles: Particle[], activity: number) => {
    const lineOpacity = lerp(0.15, 0.4, 1 - activity);
    
    particles.forEach(p1 => {
      if (p1.relationships.size === 0) return;
      
      particles.forEach(p2 => {
        if (!p1.relationships.has(p2.id)) return;
        if (p2.id <= p1.id) return;
        
        const dist = distance(p1.x, p1.y, p2.x, p2.y);
        const maxDist = 150;
        
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * lineOpacity;
          
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(255, 100, 100, ${alpha})`;
          ctx.lineWidth = lerp(0.5, 2, 1 - activity);
          ctx.stroke();
        }
      });
    });
  }, []);

  const drawTrail = useCallback((ctx: CanvasRenderingContext2D, particle: Particle, activity: number) => {
    const scale = lerp(0.3, 0.6, activity);
    const radius = particle.size * scale;
    const trailLength = 3 + activity * 4;
    
    ctx.beginPath();
    ctx.moveTo(particle.x, particle.y);
    ctx.lineTo(particle.x - particle.vx * trailLength, particle.y - particle.vy * trailLength);
    ctx.strokeStyle = `rgba(255, 100, 100, ${particle.opacity * 0.5})`;
    ctx.lineWidth = radius * 0.5;
    ctx.lineCap = 'round';
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 150, 150, ${particle.opacity})`;
    ctx.fill();
  }, []);

  const drawOrb = useCallback((ctx: CanvasRenderingContext2D, particle: Particle, activity: number) => {
    const scale = lerp(0.2, 0.4, activity);
    const radius = particle.size * scale;
    
    const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, radius * 2);
    const hue = particle.hue % 360;
    
    gradient.addColorStop(0, `hsla(${hue}, 70%, 60%, ${particle.opacity * 0.6})`);
    gradient.addColorStop(0.5, `hsla(${hue}, 60%, 50%, ${particle.opacity * 0.2})`);
    gradient.addColorStop(1, 'transparent');
    
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, radius * 2, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }, []);

  const drawPulse = useCallback((ctx: CanvasRenderingContext2D, particle: Particle, time: number, activity: number) => {
    const pulseSpeed = lerp(0.5, 2, 1 - activity);
    const pulsePhase = (particle.life / particle.maxLife) * Math.PI * 2;
    const radius = particle.size * 5 * (0.5 + Math.sin(pulsePhase + time * pulseSpeed) * 0.5);
    const alpha = particle.opacity * (1 - particle.life / particle.maxLife);
    
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(239, 68, 68, ${alpha})`;
    ctx.lineWidth = lerp(0.5, 1.5, 1 - activity);
    ctx.stroke();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => { 
      canvas.width = window.innerWidth; 
      canvas.height = window.innerHeight;
      spaceRef.current.width = canvas.width * 3;
      spaceRef.current.height = canvas.height * 10;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleScroll = () => {
      scrollRef.current.x = window.scrollX;
      scrollRef.current.y = window.scrollY;
      spaceRef.current.scrollX = scrollRef.current.x;
      spaceRef.current.scrollY = scrollRef.current.y;
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.vx = (e.clientX - lastMouseRef.current.x);
      mouseRef.current.vy = (e.clientY - lastMouseRef.current.y);
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
      idleTimeRef.current = 0;
      targetActivityRef.current = 1;
    };

    const handleKeyDown = () => { idleTimeRef.current = 0; targetActivityRef.current = 1; };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);

    let time = 0;
    let spawnTimer = 0;

    const animate = () => {
      time += 0.016;
      timeRef.current = time;
      
      idleTimeRef.current += 16;
      targetActivityRef.current = 1;
      
      currentActivityRef.current = lerp(currentActivityRef.current, targetActivityRef.current, 0.1);
      const activity = currentActivityRef.current;
      const mult = getEntityMultiplier(activity, time, particlesRef.current.length);
      
      ctx.fillStyle = 'rgba(2, 6, 23, 0.15)';
      ctx.save();
      ctx.translate(-spaceRef.current.scrollX, -spaceRef.current.scrollY);
      ctx.fillRect(spaceRef.current.scrollX, spaceRef.current.scrollY, canvas.width, canvas.height);

      const spawnRate = getSpawnRate(activity);
      spawnTimer += spawnRate;
      const maxParticles = Math.floor(lerp(60, 160, activity));
      
      while (particlesRef.current.length < maxParticles && spawnTimer >= 1) {
        const index = particlesRef.current.length;
        particlesRef.current.push(createParticle(canvas, mult.speed, index));
        spawnTimer = 0;
      }

      updateRelationships(particlesRef.current);
      applyRelationshipForces(particlesRef.current, activity);

      particlesRef.current.forEach((particle, index) => {
        particle.life++;
        particle.x += particle.vx * mult.speed * 0.1;
        particle.y += particle.vy * mult.speed * 0.1;

        if (Math.random() < 0.005) {
          particle.vx += (Math.random() - 0.5) * 0.3;
          particle.vy += (Math.random() - 0.5) * 0.3;
        }

        const dx = mouseRef.current.x - (particle.x + spaceRef.current.scrollX);
        const dy = mouseRef.current.y - (particle.y + spaceRef.current.scrollY);
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        const repulsionRadius = lerp(80, 200, activity);
        const repulsionForce = lerp(0.02, 0.2, activity);
        
        if (distToMouse < repulsionRadius && distToMouse > 0) {
          particle.vx -= (dx / distToMouse) * repulsionForce;
          particle.vy -= (dy / distToMouse) * repulsionForce;
        }

        particle.vx *= 0.998;
        particle.vy *= 0.998;

        const maxLifeMult = mult.life;
        const worldLeft = spaceRef.current.scrollX;
        const worldRight = spaceRef.current.scrollX + canvas.width;
        const worldTop = spaceRef.current.scrollY;
        const worldBottom = spaceRef.current.scrollY + canvas.height;
        if (particle.life > particle.maxLife * maxLifeMult || 
            particle.x < worldLeft - 200 || particle.x > worldRight + 200 ||
            particle.y < worldTop - 200 || particle.y > worldBottom + 200) {
          particlesRef.current.splice(index, 1);
          return;
        }

        switch(particle.type) {
          case 'orb': drawOrb(ctx, particle, activity); break;
          case 'trail': drawTrail(ctx, particle, activity); break;
          case 'pulse': drawPulse(ctx, particle, time, activity); break;
          case 'line':
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle.x + particle.vx * 10 * mult.speed, particle.y + particle.vy * 10 * mult.speed);
            ctx.strokeStyle = `rgba(239, 68, 68, ${particle.opacity})`;
            ctx.lineWidth = lerp(0.3, 0.8, activity);
            ctx.stroke();
            break;
        }
      });

      drawRelationships(ctx, particlesRef.current, activity);
      ctx.restore();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animationRef.current);
    };
  }, [
    createParticle,
    getSpawnRate,
    getEntityMultiplier,
    updateRelationships,
    applyRelationshipForces,
    drawRelationships,
    drawTrail,
    drawOrb,
    drawPulse
  ]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

export default InfiniteProcedural2D;