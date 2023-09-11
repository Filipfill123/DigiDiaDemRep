function onBodyLoad() {
    document.getElementById('testDate').value = new Date().toDateInputValue();

}


Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});


function onSocketClose() {
    console.log("WS client: Websocket closed.");
}

function startRecording() {
    // 1
    var params = {
        topic: "startRecording"
    };
    console.log("startRecording done, showing patientIdentification");
    document.getElementById("numbersRepeating").style.display = 'block';
    document.getElementById("instructions").style.display = 'none';
    do_recognize();

}

function patientIdentificationFcn() {
    // 2
    if (document.querySelector('input[name="patientCategory"]:checked').value == "TEST") {
        var params = {
            topic: "patientIdentification",
            testDate: document.getElementById("testDate").value,
            patientCategory: document.querySelector('input[name="patientCategory"]:checked').value,
            patientId: "test",
            popac: "test",
            fname: "test",
            lname: "test",
            dateOfBirth: "test",
            residence: "test",
            educationYears: "test",
            educationCategory: "test",
            sentenceRepeating: "test",
            sentenceRemembering: "test",
            gesturesExecuting: "test",
            gesturesRemembering: "test",
            namingMistakes: "test",
            picturesRemembered: "test",
            FAQ: "test"

        };
        console.log("Sending TEST ID data to DM: ", params);
        console.log("patientIdentification done, showing numbersRepeating");
        document.getElementById("patientIdentification").style.display = 'none';
        document.getElementById("instructions").style.display = 'block';
        speechCloud.dm_send_message({ data: JSON.stringify(params) });

    }
    else if (document.getElementById("fname").value == "" || document.getElementById("lname").value == "" || document.getElementById("residence").value == "") {
        document.getElementById("upper_log2").style.visibility = 'visible';

    }
    

    else {


        var params = {
            topic: "patientIdentification",
            testDate: document.getElementById("testDate").value,
            patientCategory: document.querySelector('input[name="patientCategory"]:checked').value,
            patientId: document.getElementById("patientId").value,
            popac: document.getElementById("popac").value,
            fname: document.getElementById("fname").value,
            lname: document.getElementById("lname").value,
            dateOfBirth: document.getElementById("dateOfBirth").value,
            residence: document.getElementById("residence").value,
            educationYears: document.getElementById("educationYears").value,
            educationCategory: document.getElementById("educationCategory").value,
            sentenceRepeating: document.getElementById("sentenceRepeating").value,
            sentenceRemembering: document.getElementById("sentenceRemembering").value,
            gesturesExecuting: document.getElementById("gesturesExecuting").value,
            gesturesRemembering: document.getElementById("gesturesRemembering").value,
            namingMistakes: document.getElementById("namingMistakes").value,
            picturesRemembered: document.getElementById("picturesRemembered").value,
            FAQ: document.getElementById("FAQ").value

        };
        console.log("Sending ID data to DM: ", params);
        console.log("patientIdentification done, showing numbersRepeating");
        document.getElementById("patientIdentification").style.display = 'none';
        document.getElementById("instructions").style.display = 'block';
        speechCloud.dm_send_message({ data: JSON.stringify(params) });
        //do_recognize();
    }
}



function numbersRepeatingFcn() {
    // -1
    var params = {
        topic: "numbersRepeating"
    };
    console.log("numbersRepeating done, showing firstSentenceRepeating");
    document.getElementById("numbersRepeating").style.display = 'none';
    document.getElementById("firstSentenceRemembering").style.display = 'block';

}

function firstPicturesRememberingFcn() {
    // 3
    var params = {
        topic: "firstPicturesRemembering"
    };
    console.log("firstPicturesRemembering done, showing lakePicture");
    document.getElementById("firstPicturesRemembering").style.display = 'none';
    document.getElementById("secondPicturesRemembering").style.display = 'block';

}

function secondPicturesRememberingFcn() {
    // 4
    var params = {
        topic: "secondPicturesRemembering"
    };
    console.log("secondPicturesRemembering done, showing TODO");
    document.getElementById("secondPicturesRemembering").style.display = 'none';
    document.getElementById("animalsRemembering").style.display = 'block';

}
function firstSentenceRememberingFcn() {
    // 0
    var params = {
        topic: "firstSentenceRemembering"
    };
    console.log("firstSentenceRemembering done, showing lakePicture");
    document.getElementById("firstSentenceRemembering").style.display = 'none';
    document.getElementById("lakePicture").style.display = 'block';

}

function secondSentenceRememberingFcn() {
    // 6
    var params = {
        topic: "secondSentenceRemembering"
    };
    console.log("secondSentenceRemembering done, showing TODO");
    document.getElementById("secondSentenceRemembering").style.display = 'none';
    document.getElementById("end").style.display = 'block';

    setTimeout(function () { appResetFcn(); }, 5000);

}
function lakePictureFcn() {
    // 1
    var params = {
        topic: "lakePicture"
    };
    console.log("lakePicture done, showing pictureObjects");

    document.getElementById("lakePicture").style.display = 'none';
    document.getElementById("pictureObjects").style.display = 'block';

}

function pictureObjectsFcn() {
    // 2
    var params = {
        topic: "pictureObjects"
    };
    console.log("pictureObjects done, showing animalsRemembering");

    document.getElementById("pictureObjects").style.display = 'none';
    document.getElementById("firstPicturesRemembering").style.display = 'block';

}

function animalsRememberingFcn() {
    // 5
    var params = {
        topic: "animalsRemembering",
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        animals_understood: animals_understood,
        animals_already_understood: animals_already_understood
    };
    console.log("animalsRemembering done, showing end");

    document.getElementById("animalsRemembering").style.display = 'none';
    document.getElementById("secondSentenceRemembering").style.display = 'block';
    
    console.log("Sending animals data to DM: ", params);
    speechCloud.dm_send_message({ data: JSON.stringify(params) });


}

function appResetFcn() {
    test_idx = -1;
    numbers = ["941", "726", "583"]

    var image = document.getElementById('breh');
    if (image && image.style) {
        image.style.height = '600px';
        image.style.width = '900px';
        image.style.top = '57%';
        //image.className = 'centerImage'

    }

    document.getElementById('log1').style.display = 'none';

    var params = {
        topic: "appReset",
        animals_understood: animals_understood,
        animals_already_understood: animals_already_understood
    };
    console.log("appReset done, showing patientIdentification");

    document.getElementById("end").style.display = 'none';
    document.getElementById("patientIdentification").style.display = 'block';

    document.getElementById('testDate').value = new Date().toDateInputValue();
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("dateOfBirth").value = "1970-01-01";
    document.getElementById("residence").value = "";
    document.getElementById("abadeco").value = "";
    document.getElementById("sentenceRepeating").value = "NA";
    document.getElementById("sentenceRemembering").value = "NA";
    document.getElementById("gesturesExecuting").value = "NA";
    document.getElementById("gesturesRemembering").value = "NA";
    document.getElementById("namingMistakes").value = "NA";
    document.getElementById("picturesRemembered").value = "NA";
    document.getElementById("FAQ").value = "0";
    //speechCloud.dm_send_message({data: JSON.stringify(params)});
}


/* Logovací funkce - nevyuzito */
function hlog(text) {
    $("#log").append("<div><b>" + text + "<b><br/></div>");
}

/* Stredova logovací funkce */
function log1(text) {
    $("#log1").html("<b>" + text + "</b>");
}

/* Stredova logovací funkce */
function log2(text) {
    $("#log2").html("<b>" + text + "</b>");
}

function log3(text) {
    $("#log3").html("<b>" + text + "</b>");
}

function log4(text) {
    $("#log4").html("<b>" + text + "</b>");
}

function log5(text) {
    $("#log5").html("<b>" + text + "</b>");
}
function log6(text) {
    $("#log6").html("<b>" + text + "</b>");
}
function log7(text) {
    $("#log7").html("<b>" + text + "</b>");
}
/* Horni logovací funkce */
function upper_log(text) {
    $("#upper_log").html("<b>" + text + "</b>");
}

var test_idx = -1; //mel by byt od 0, zatim nechat na -1
let numbers = ["941", "726", "583"]
//let numbers = ["941"] 
var recognizing = false;
//let handled_numbers = false;
var animals_understood = 0;
const animals_already_understood = [];
//let picturesIds = [5,4,3,2,1]
let picturesIds = [20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1]
const animals = ["mamut", "kráva", "aberdeen", "aberdín", "aberdýn", "adax", "chrt", "afrička", "agama", "agapornis", "aguti", "erdelteriér", "teriér", "akita", "akita inu", "akita_inu", "alexandr", "aligátor", "malamut", "alka", "alkoun", "brakýř", "alter real", "amazoňan", "jestřáb", "los", "prase", "kobylka", "kozlíček", "vodomil", "amazónek", "babirusa", "plochuska", "makadlovka", "amejva", "buldok", "kůň", "pony", "poník", "klusák", "kokršpaněl", "stafordšírský teriér", "amroksky", "voláč", "anakonda", "anatolský pastevecký pes", "anatol", "pes", "andulka", "beran", "plnokrevník", "setr", "špringršpaněl", "toy teriér", "holub", "angloarab", "koza", "králík", "slepice", "anoa", "anolis", "anténovec", "antilopa", "vousáči", "vousáč", "vousáč", "appaloosa", "salašnický pes", "salaš", "ara", "arara", "arasari", "aratinga", "araukany", "argali", "doga", "baset", "slepice", "australky", "kelpie", "ohař", "axis", "axolotl", "aymara", "ajmara", "skot", "azavak", "azteca", "azteka", "babočka", "bahnivec", "kočka", "bandikut", "bantamky", "banteng", "barbet", "boloňáček", "baribal černý", "baribal", "barnard", "barneveldky", "basenži", "baset", "batolec", "bavlnice", "barvář", "teplokrevník", "bazilišek", "bázlivec", "bažant", "bearded kolie", "bírdid kolie", "kolie", "beauceron", "bejlomorka", "bekasína", "bekyně", "belásek", "belgické modrobílé", "grifonek", "belgický obr", "ovčák", "bělokaz", "bělokur", "bělopásek", "bělořit", "bělozubka", "běluha", "bércoun", "bernardýn", "bublák", "berneška", "salašnický pes", "salaš", "varan", "beruška", "běžník", "bičochvost", "bičovka", "bígl", "bichir", "binturong", "birma", "bišonek", "bizon", "blatnice", "blecha", "bloodhound", "bladhaund", "blýskáček", "bobr", "bobruška", "bobtail", "bobtejl", "bodalka", "bodlín", "bodlok", "bojga", "bojovnice", "bolen", "boloňský psík", "boloň", "bonobo", "doga", "border kolie", "bordérka", "bourovčík", "bourovec", "lýkožrout", "alexandr", "psohlavec", "korela", "delfín", "mrož", "kavka", "chroust", "brabantík", "brahmánky", "bramborníček", "bráněnka", "fila", "brhlík", "briard", "brkoslav", "brumby", "grifonek", "bruslařka", "břehouě", "břehule", "budníček", "bukač", "bukáček", "bulbul", "bulmastif", "chladnokrevník", "bulteriér", "burunduk", "buřňáček", "buřňák", "buvol", "buvolec", "bzikavka", "bzučivka", "bzunka jecna", "cairn", "candát", "cejn", "cejnek", "cikáda", "cistovník", "hnšdák", "coton de tuléar", "criollo", "retrívr", "cvrček", "cvrčilka", "chachalaka", "chaluha", "chameleon", "chápan", "charmozín", "charolais", "charza", "chesapeake bay", "chluponožka", "chobotnice", "chocholatka", "chocholouš", "chrobák", "chrostík", "chroust", "chrouster", "chřástal", "chřestýš", "chvostan", "křeček", "džungar", "liška", "kobylka", "kozlíček", "čalounice", "čáp", "čau čau", "čečetka", "čejka", "čelistnatka", "čepcol", "černopáska", "černoproužka", "červenka", "červotoč", "bagdeta", "vlčák", "albín", "holub", "stavák", "skot", "čichavec", "činčila", "čipmank", "čírka", "čivava", "čížek", "čmelák", "čolek", "čukvala", "ďábel", "dalmatín", "daman", "damascén", "daněk", "datel", "datlík", "deerhound", "dírhaund", "delfínec", "delfínovec", "dhoul", "dikdik", "dikobraz", "dingo", "diviznáček", "dlask", "dlouhohlávka", "dlouhokrčka", "dlouhoretka", "dlouhošíjka", "dlouhozobka", "dobrman", "donsky kun", "drabčík", "dragoun", "drakoun velky", "drápatečka", "drápatka", "drop", "eklektus", "elo", "emu", "eurasier", "falabella", "faraón", "faverolky", "felsuma", "felzuma", "fenek", "field španěl", "španěl", "chladnokrevník", "špic", "flanderský bouvier", "flander", "bouvier", "forverky", "fosa", "foxhound", "foxteriér", "buldoček", "klusák", "honič", "frček", "frederiksborg", "fret", "fryna", "furioso", "galiceňo", "galloway", "gaur", "gaviál", "gazela", "gekon", "gekončík", "gepard", "gibon lar", "gidran", "gigant", "glosofága", "gordonsetr", "gorila", "gottingen", "grizon", "guan", "gueréza", "hackney", "hakny", "hafling", "halančík", "hamburčanka", "barvář", "psík", "havran", "hedvábnička", "hempšírky", "hereford", "hlavatka", "hlavec", "hlodoun", "hnedopáska", "hnojník", "hohol", "hoholka", "hoko", "koza", "králík", "pudl", "holokrčky", "holoubek", "racek", "holub", "hořavka duhova", "hovawart", "hrabáč", "hrabalka", "hrabatka", "hraboš", "hrabošík", "hrachovka ricni", "hrbáč", "hrdlička", "hrobařík", "hroch", "hrošík", "hrotař", "hrotnokřídlec", "hrouzek", "hroznýš", "hroznýšek", "hroznýšovec", "hryzec", "hřbetozubec", "hřbenule", "hucul", "hudánky", "hulman", "husa", "myš", "plymutka", "lori", "ovce", "hyl", "zákeřnice", "zlatoočka", "husice", "hutia konga", "hutia", "hvízdák", "hyena", "hyenka", "hýl", "ibis", "ibizský podengo", "podengo", "impala", "indián", "indicky běžec", "indri", "irbis", "irena", "setr", "hunter", "vlkodav", "chrtík", "spinone", "jack russell teriér", "jaguár", "jaguarundi", "jak", "japonky čabo", "čabo", "bobtail", "čin", "špic", "jasoň", "jazyk", "jehlanka", "jehlice", "jehlozobka", "jelec", "jelen", "jelenec", "jepice", "skot", "jeřáb", "jeřábek", "jeseter", "jespak", "ještěrka", "jěštěrkovec", "jetelovka", "jezevčík", "jezevec", "ježdík", "ježek", "ježura", "jiřička", "kabar", "kahau", "kachna", "kachnička", "kajka", "kajman", "kajmánek", "kajmanka", "kakadu", "katalanka", "krecek dzungarsky", "liska obecna", "varan ostnoocasy", "jestrab kratkoprsty", "los evropsky", "vietnamske prase", "vietnamske prase", "kobylka zelena", "kozlicek dazule", "kakadu", "kakapo", "kakariki", "kalandra", "kaloň", "kalous", "kameňáček", "kamzík", "kančík", "kančil", "káně", "kanic", "kapr", "kapustňák", "kapybara", "karakal", "karas obecny", "karetka", "kariér", "kastorex", "katalánka", "kavče", "kavka", "keporkak", "kerry", "king", "kladivoun", "klešťanka", "katalanka", "klikoroh", "klínatka", "klíněnka", "klístě", "klokan", "klokánek", "klokanomyš", "klopuška", "kněžice", "knírač", "koala", "kobra", "skřivan", "kobylka", "kočinky", "kočkodan", "kodulka", "kogie", "kogna", "kohoutek", "kojot", "kokrháč", "kolie", "koliha", "koljuška", "kolpík", "komár", "komba", "komondor", "konipas", "konopka", "kooikerhondje", "kopřivka", "korálovka", "korat", "korela", "kormorán", "kornyška", "koroptev", "korovnice", "katalanka", "grifon", "kos", "kosatka", "kosman", "kotul", "kovařík", "kovolesklec", "koza", "kozlíček", "kozorožec", "kozojed", "krahujec", "krajník", "krajta", "krakatice", "králíček", "králík", "krasec", "kraska", "krátkonožka", "krevkérka", "krkavec", "krocan", "krokodýl", "kromforländer", "kromforlander", "krtek", "krtonožka", "kruhochvost", "krunýřovec", "krůta", "krutihlav", "krysa", "krytonosec", "kreček", "křečík", "křepelka", "křísek", "křivka", "křižák", "ksukol", "kuandu", "kubalaje", "kudlanka", "kudrnáč", "kudu", "kukačka", "kuklice", "kulík", "kulíšek", "kulohlavec", "kuna", "kuňka", "kunovec", "kuska", "kuskus", "kusu", "kutilka", "kuvas", "kvakoš", "květilka", "květolib", "květomil", "kyjatka", "kynkažu", "", "labrador", "labuť", "laflešky", "lachtan", "lakeland", "lejklend", "lakenfeldky", "lejkenfeltky", "lalokonosec", "lama", "landseer", "lendsír", "langšanka", "langur", "lasice", "latam", "ledňáček", "ledňák", "leghornka", "leguán", "leguánek", "lejsek", "lelek", "lemur", "lenec", "lenochod", "leonberger", "lepoještěr", "leskoptev", "lesoň", "létavec", "létavka", "letoun", "letucha", "lev", "levhart", "lhasa apso", "lín", "linduška", "linsang", "lipan", "lipicán", "listokaz", "listonos", "listopas", "listovnice", "lišaj", "liška", "loděnka", "lodivod", "lopatonos", "lori", "loríček", "lorikul", "los", "losos", "lovčík", "lumčík", "lumek", "lumík", "luňák", "luněc", "luptouš", "lusitano", "luskoun", "bojovnice", "lvíček", "lýkohub", "lýkožrout", "lyska", "lyskonoh", "lžičák", "máčka", "mada", "maikong", "majka", "makak", "mak", "mákovka", "makrela", "malajka", "maločlenec", "malpa", "psík", "mandelík", "mandelinka", "mandril", "mangabej", "mangalarga", "mangusta", "mantela", "mara", "maransky", "maremmano", "martináč", "masařka", "mastif", "matamata", "mečoun", "mečovka", "medojed", "medosavka", "medovnice", "medvěd", "megaderma", "mera", "naháč", "mihule", "bulteriér", "minorky", "mirikina", "missouri fox trotter", "mločík", "mlok", "mlynařík", "mník", "mníšek", "mnohonožka", "mnohopilák", "modena", "modenka", "modrásek", "baset", "gaskoň", "moloch", "molovka", "momot", "monden", "mops", "morčák", "morče", "morgan", "moták", "motýlice", "motýl", "moudivláček", "moucha", "mravencojed", "mravenec", "mravenečník", "mravkolev", "mrchožrout", "mrož", "mršník", "mřenka", "mšice", "mudi", "muflon", "muchnice", "muntžak", "můřice", "mustang", "myš", "myšák", "myšice", "myšivka", "myška", "mýval", "nahur", "nandej", "nandu", "nártoun", "narval", "mastin", "boxer", "křepelák", "pinc", "špic", "neoféma", "neonka", "nestor", "nesytka", "netopýr", "netopýrek", "new forest pony", "ňů forest pouny", "nilgau", "noháč", "nonius", "norek", "kob", "norník", "lundehund", "nosál", "nosatčík", "nosatec", "nosorožec", "nosorožík", "novozélandský červený", "nutrie", "nyala", "obaleč", "ocelot", "octomilka", "okáč", "okapi", "okenáč", "okoun", "okounek", "oliheň", "olingo", "ondatra", "opice", "opičí pinč", "pinč", "orangutan", "oravky", "orcela", "orebice", "orel", "oribi", "orlík", "orlosup", "orlovec", "orlovky", "klusák", "orpingtonky", "ořešník", "osel", "osenice", "osmák", "ostralka", "ostroretka", "ostruháček", "ostruhák", "ostruhovník", "ostrucha", "ostříž", "otakárek", "ouhorlík", "ouklej", "ouklejka", "outloň", "ovád", "ovce", "ovíječ", "pablatnice nosata", "pačolek", "paduánky", "pagekon", "páchník", "paint horse", "pejnt hors", "paještěrka", "paježura", "paka", "pakudlanka", "pakůň", "paličatka", "pancéřníček", "panda", "paovce", "papillon a phaléne", "papoušek", "papoušíček", "papuchalk", "parma", "parosnička", "parukář", "paso fino", "pásovec", "páteříček", "páv", "pavián", "peja", "pekari", "pelikán", "pěnice", "pěnkava", "penkavák", "pěnodějka", "perepel", "perleťovec", "perleťovka", "perlička", "perlín", "perlorodka", "perlovka", "arab", "péřovka", "pestrokrovečník", "pestrokřídlec", "pestruška", "pestřenec", "pestřenka", "pěvec", "pěvuška", "píďalka", "pika", "pilatka", "pilořitka", "pilous", "pipa", "pisík", "pisila", "pískomil", "pískorypka", "piskoř pruhovany", "pišťucha", "pižmoň", "plameňák", "plamenoskvrnka", "plejtvák", "plejtvákovec", "plch", "plískavice", "plodomorka", "plochojester", "plochuška", "makadlovka", "ploskohřbetka", "ploskorep", "ploskoroh", "ploskoroh", "plotice obecna", "plšík", "plymutka", "podoustev nosák", "podoustev", "nosák", "pointer", "pokoutník", "polák", "poletucha", "poletuška", "polník", "zelenonožky", "ogar", "podengo", "possum", "poštolka", "pošvatka", "potápka", "potáplice", "potápník", "potemníček", "potemník", "potkan", "poto", "pottok", "pouzdrovníček", "pralesnička", "prase", "divočák", "rejdič", "promyka", "prskavec", "přástevník", "předivka", "přímorožec", "psohlavec", "psoun", "pstruh", "pštros", "ptakopysk", "pták", "pudl", "pudlpointer", "puchýřník", "puklice", "puli", "puma", "pumi", "puštík", "mastin", "pyrura", "pytlonoš", "racek", "ragdoll", "rájovec", "rak", "rákosníček", "rákosnička", "rákosník", "raroh", "ratufa", "redkap", "rehek", "rejnok", "rejsec", "rejsek", "rejskovec", "ridgeback", "rocky mountain", "rodajlendka", "roháč", "roháček", "rohatka", "ropucha", "rorýs", "rosela", "rosnice", "rosnička", "rosomák", "rotvajler", "ruměnice", "rus", "rušník", "rybák", "rybenka", "rýhonosec", "rypoš", "rypouš", "rys", "říman", "sajga", "salerno", "sambar", "sametka", "samojed", "saranče", "sasexky", "satyr", "scink", "sebritky", "sedmihlásek", "sekáč", "sekavec", "sekavka", "sépie", "serval", "shiba", "schi tzu", "siamang", "husky", "sifaka maly", "síh", "sitatunga", "síťnatka", "siven", "skalára", "skalník", "skálolez", "sklípkan", "skokan", "skorec", "skřivan", "skrivánek", "skunk", "skvrnopasník", "slavík", "slepec", "slepýš", "slíďák", "slípka", "slizoun", "slon", "sloughi", "čuvač", "kopov", "slučka", "sluka", "slunéčko", "slunečnice", "slunka", "smolák", "smrtník", "smrtonoš", "sněhule", "sněžnice", "sob", "sobol", "sojka", "sojkovec", "sokol", "sorraia", "sosnokaz", "soumračník", "sova", "sovice", "splešťule", "srnec", "srpice", "srpokřídlec", "srstín", "sršeň", "bulterier", "stehlík", "stepnice", "stepník", "stepokur", "stonožka", "straka", "strakáč", "strakapoud", "strnad", "stromovnice", "střechatka", "střevle", "střevlíček", "střevlík", "střízlík", "stužkonoska", "sulmtálky", "sultánky", "sumec", "sumeček", "sup", "surikata", "svštluška", "svinka", "sviňucha", "svišť", "svižník", "sýc", "sýček", "sýkora", "sýkořice", "sysel", "šakal", "šarpej", "šeltie", "šídélko", "šídlo", "šimpanz", "šiperka", "širokohlavec", "škeble", "škvor", "barevnohlávek", "šoupalek", "špaček", "galgo", "štětconoš", "štětinatec", "štětkoun", "štika", "štír", "štírek", "štítenka", "štítonoš", "štítovec", "brakýř", "šumavanky", "šváb", "tadarida", "tahr", "tamarín", "kalimiko", "tana", "tangalunga", "tangara", "tapír", "tarbík", "tarbíkomyš", "taricha", "tarpan", "teju", "tenkozobec", "mimochodník", "terej", "tesařík", "tetra", "tetřev", "tetřívek", "tchoř", "tchořík", "tilikva", "tiplice", "tirika", "titi", "tlamovec", "tmavoskvrnáč", "toko", "tomistoma", "travařka", "tricha", "trnorep", "kropenka", "truběnka", "třásněnka", "ťuhýk", "tui", "tukan", "tuleň", "tuňák", "tuponosec", "turako", "banánovec", "angora", "turpan", "tygr", "uakari", "úhoř", "upír", "urzon", "ústřičník", "úžovka", "vačice", "vačínek", "vakokrt", "vakomyš", "vakonoš", "vakoplch", "vakoplšík", "vakorejsek", "vakovec", "vakoveverka", "varan", "vaza", "vážka", "včela", "včelojed", "vejcožrout", "vějířovka", "velbloud", "veleštír", "velevrub", "velryba", "velsumky", "velškorgi cardigan", "velškorgi kardigan", "velššpringršpaněl", "velšteriér", "veš", "veverka", "rejdič", "vidloroh", "víkonos", "vini", "vipet", "vírník", "viskača", "činčila", "vlaška", "vlaštovka", "vlček", "vlha", "vlk", "vlnatka", "vodomil", "vodouch", "vodouš", "voduška", "bublák", "volavka", "vombat", "vorvaň", "vorvaňovec", "vosa", "vosík", "vousák", "vrabec", "vrána", "vranka", "vranohlávky", "vrápenec", "vrbař", "vroubenka", "vrtalka", "vrubozubec", "vřešťan", "vřetenuška", "všenka", "vydra", "vydrař", "vychuchol", "výr", "výreček", "vyza", "vztyčnořitka", "wäller", "veler", "pembroke", "pembrouk", "wyandotka", "zajíc", "zákeřnice", "beran", "lajka", "zavíječ", "závojnatka", "zdobenec", "zdobnatka", "zebra", "zedníček", "zelenuška", "zlatěnka", "zlatohlávek", "zlatokrt", "zlatoočka", "retrívr", "zmije", "znakoplavka", "zobec", "zoborožec", "zorila", "zrnokaz", "zrzohlávka", "zubr", "zvonek", "zvonohlík", "žahalka", "žako", "žebrovník", "želva", "ženetka", "žerzejstí obři", "žirafa", "živorodka", "žlabatka", "žluna", "žluťásek", "žluva", "žralok"];

function do_recognize() {
    /*if(!recognizing){
        console.log("starting ASR for test: ", test_idx);
        speechCloud.asr_recognize();
        recognizing = true;
    }*/

    switch (test_idx) {
        case -1:

            handled_recog_min_1 = false;
            document.getElementById('log1').style.display = 'block';

            text_to_say = "Abyste se seznámili s fungováním aplikace a zároveň si ověřili Váš sluch, začneme jednoduchou instrukcí. Budete opakovat tato trojciferná čísla.";
            do_tts(text_to_say);

            text_to_log = "Abyste se seznámili s fungováním aplikace a zároveň si ověřili Váš sluch, začneme jednoduchou instrukcí. Budete opakovat tato trojciferná čísla.";
            log1(text_to_log); //TODO struktura stranky kvuli textu a obrazku -> SOLVED text misto countdownu, pote text none a countdown block

            speechCloud.on('tts_done', function (msg) {
                if (!handled_recog_min_1) {

                    document.getElementById('log1').style.display = 'none';

                    handled_recog_min_1 = true;

                    handle_numbers();

                }
            })
            break;
        case 0:

            handled_recog_0 = false;
            
            //text_to_say = "Před měsícem starší muž potkal známou ženu po sedmnácti letech. Teď Vy";
            text_to_say = "Nyní Vám řeknu jednu krátkou větu pouze jedenkrát. Snažte se ji zapamatovat. Já se na ni za chvíli znovu zeptám. Zapamatujte si a zopakujte přesně tuto větu. Před měsícem starší muž potkal známou ženu po sedmnácti letech. Teď Vy";
            do_tts(text_to_say);


            speechCloud.on('tts_done', function (msg) {
                if (!handled_recog_0) {
                    document.getElementById('log6').style.display = 'block';
                    log6("Zopakujte větu.")
                    handled_recog_0 = true;

                    speechCloud.asr_recognize();
                    recognizing = true;

                }
            })
            break;
        case 1:
            handled_recog_1 = false;

            document.getElementById('breh').style.display = 'block';
            document.getElementById('upper_log').style.display = 'block';

            text_to_say = "Nyní vidíte před sebou obrázek na břehu rybníka. Na obrázku je několik osob a děje se tam celá řada činností. Zkuste je nyní prosím co nejvíce popsat.";
            do_tts(text_to_say);

            text_to_log = "Nyní vidíte před sebou obrázek na břehu rybníka. <br> Na obrázku je několik osob a děje se tam celá řada činností. <br> Zkuste je nyní prosím co nejvíce popsat.";
            upper_log(text_to_log); //TODO struktura stranky kvuli textu a obrazku -> SOLVED text misto countdownu, pote text none a countdown block
            speechCloud.on('tts_done', function (msg) {

                if (!handled_recog_1) {
                    // zapnuti asr_recognize()
                    speechCloud.asr_recognize();
                    recognizing = true;
                    document.getElementById('upper_log').style.display = 'none';
                    document.getElementById('countdown_1').style.display = 'block';
                    var image = document.getElementById('breh');
                    if (image && image.style) {
                        image.style.height = '800px';
                        image.style.width = '1400px';
                        image.style.top = '50%';
                    }

                    var countdown_position = document.getElementById('countdown_1');
                    if (countdown_position && countdown_position.style) {
                        countdown_position.style.left = '35px';
                    }
                    startTimer();

                    handled_recog_1 = true;
                }


            })
            break;
        case 2:
                handled_recog_2 = false;

                document.getElementById('log2').style.display = 'block';

                text_to_say = "Nyní vyjmenujte co nejrychleji všechny živé tvory, rostliny, věci, předměty a podobně, které jste právě na obrázku viděli. Budete mít na to 60 vteřin.";
                do_tts(text_to_say);
                text_to_log = "Nyní vyjmenujte co nejrychleji všechny živé tvory, rostliny, věci, předměty a podobně, které jste právě na obrázku viděli. Budete mít na to 60 vteřin.";
                log2(text_to_log);

                speechCloud.on('tts_done', function (msg) {

                    if (!handled_recog_2) {
                        speechCloud.asr_recognize();
                        recognizing = true;
                        document.getElementById('countdown_2').style.display = 'block';
                        document.getElementById('log2').style.display = 'none';

                        startTimer();

                        handled_recog_2 = true;
                    }


                })
            break;
        case 3:

                handled_recog_3 = false;
                document.getElementById('log3').style.display = 'block';

                text_to_say = "Za chvíli před sebou uvidíte postupně 20 jednotlivých černobílých obrázků. Každý obrázek pojmenujete nahlas jedním slovem.";
                do_tts(text_to_say);

                text_to_log = "Za chvíli před sebou uvidíte postupně 20 jednotlivých černobílých obrázků. Každý obrázek pojmenujete NAHLAS jedním slovem.";
                log3(text_to_log); //TODO struktura stranky kvuli textu a obrazku -> SOLVED text misto countdownu, pote text none a countdown block

                speechCloud.on('tts_done', function (msg) {
                    if (!handled_recog_3) {

                        handled_recog_3 = true;

                        document.getElementById('log3').style.display = 'none';

                        handle_pictures();

                    }
                })
                break;
        case 4:
                handled_recog_4 = false;
                document.getElementById('log4').style.display = 'block';

                text_to_say = "A nyní mi řekněte co NEJVÍCE názvů obrázků, které si pamatujete. Na jejich pořadí nezáleží. Máte na to půl minuty. Můžeme začít? Teď!";
                do_tts(text_to_say);

                text_to_log = "A nyní mi řekněte co NEJVÍCE názvů obrázků, které si pamatujete. Na jejich pořadí nezáleží. Máte na to půl minuty. Můžeme začít? Teď!";
                log4(text_to_log); //TODO struktura stranky kvuli textu a obrazku -> SOLVED text misto countdownu, pote text none a countdown block

                speechCloud.on('tts_done', function (msg) {
                    if (!handled_recog_4) {

                        handled_recog_4 = true;
                        document.getElementById('log4').style.display = 'none';
                        speechCloud.asr_recognize();
                        recognizing = true;

                        document.getElementById('countdown_4').style.display = 'block';

                        startTimer();


                    }
                })
            break;
        case 5:
                handled_recog_5 = false;

                document.getElementById('log5').style.display = 'block';

                text_to_say = "Nyní budete mít za úkol vyjmenovat co NEJRYCHLEJI co NEJVÍCE ZVÍŘAT, tedy živočichů, kteří žijí na souši, ve vodě, ve vzduchu nebo i hmyz. Prostě jakékoliv zvíře, které Vás napadne. Zkouška je na čas, buďte tedy co nejrychlejší. Máte na to půl minuty. Připravte se a začínáme. Teď!";
                do_tts(text_to_say);
                text_to_log = "Nyní budete mít za úkol vyjmenovat co NEJRYCHLEJI co NEJVÍCE ZVÍŘAT, <br> tedy živočichů, kteří žijí na souši, ve vodě, ve vzduchu nebo i hmyz. <br> Prostě jakékoliv zvíře, které Vás napadne. <br> Zkouška je na čas, buďte tedy co nejrychlejší. Máte na to půl minuty. Připravte se a začínáme. <br> Teď!";
                log5(text_to_log);

                speechCloud.on('tts_done', function (msg) {

                    if (!handled_recog_5) {
                        speechCloud.asr_recognize();
                        recognizing = true;
                        document.getElementById('countdown_3').style.display = 'block';
                        document.getElementById('log5').style.display = 'none';

                        startTimer();

                        handled_recog_5 = true;
                    }


                })
            break;
        case 6:

                handled_recog_6 = false;

                text_to_say = "Teď si zkuste vybavit větu, kterou jste si měli zapamatovat a zopakujte ji.";
                do_tts(text_to_say);

                speechCloud.on('tts_done', function (msg) {
                    if (!handled_recog_6) {

                        handled_recog_6 = true;

                        document.getElementById('log7').style.display = 'block';
                        log7("Zopakujte větu.")
                        speechCloud.asr_recognize();
                        recognizing = true;

                    }
                })
            break;
            
             
        
        
        
        
    }
}

function proceed_to_next_test() {
    console.log("stopping ASR for test: ", test_idx);
    do_pause();
    switch (test_idx) {
        
        case -1:
            //numbersRepeating
            handled_proceed_min_1 = false;
            text_to_say = "Děkujeme, teď budeme pokračovat dalším úkolem.";
            do_tts(text_to_say);

            speechCloud.on('tts_done', function () {
                if (!handled_proceed_min_1) {

                    document.getElementById('log1').style.display = 'none';
                    document.getElementById('next_test').style.display = 'block';

                    handled_proceed_min_1 = true;
                }
            })

            break;
        case 0:
            //firstSentenceRemembering

            handled_proceed_0 = false;
            document.getElementById('log6').style.display = 'none';
            text_to_say = "Děkujeme, teď budeme pokračovat dalším úkolem.";

            do_tts(text_to_say);

            speechCloud.on('tts_done', function msg() {
                if (!handled_proceed_0) {
                    
                    document.getElementById('next_test2').style.display = 'block';

                    handled_proceed_0 = true;
                }

            })
        break;

        case 1:
            //lakePicture
            handled_proceed_1 = false;
            text_to_say = "Děkujeme, teď budeme pokračovat dalším úkolem.";
            do_tts(text_to_say);


            speechCloud.on('tts_done', function () {
                if (!handled_proceed_1) {

                    document.getElementById('breh').style.display = 'none';
                    document.getElementById('countdown_1').style.display = 'none';
                    document.getElementById('next_test3').style.display = 'block';
                    handled_proceed_1 = true;

                }
            })
        break;

        case 2:
            //pictureObjects

            handled_proceed_2 = false;

            text_to_say = "Děkujeme, teď budeme pokračovat dalším úkolem.";

            do_tts(text_to_say);

            speechCloud.on('tts_done', function msg() {
                if (!handled_proceed_2) {

                    document.getElementById('countdown_2').style.display = 'none';
                    document.getElementById('next_test4').style.display = 'block';

                    handled_proceed_2 = true;
                }

            })
            break;
        case 3:
            //firstPicturesRemembering

            handled_proceed_3 = false;
            

            text_to_say = "Děkujeme, teď budeme pokračovat dalším úkolem.";

            do_tts(text_to_say);

            speechCloud.on('tts_done', function msg() {
                if (!handled_proceed_3) {
                    
                    document.getElementById('firstPicturesRememberingPicture').style.display = 'none';

                    document.getElementById('next_test5').style.display = 'block';

                    handled_proceed_3 = true;
                }

            })
        break;

        case 4:
            //secondPicturesRemembering

            handled_proceed_4 = false;

            text_to_say = "Děkujeme, teď budeme pokračovat dalším úkolem.";

            do_tts(text_to_say);

            speechCloud.on('tts_done', function msg() {
                if (!handled_proceed_4) {
                    document.getElementById('countdown_4').style.display = 'none';
                    document.getElementById('next_test6').style.display = 'block';

                    handled_proceed_4 = true;
                }

            })
        break;
        
        case 5:
            //animalsRemembering

            handled_proceed_5 = false;

            text_to_say = "Děkujeme, teď budeme pokračovat dalším úkolem.";

            do_tts(text_to_say);

            speechCloud.on('tts_done', function msg() {
                if (!handled_proceed_5) {
                    document.getElementById('countdown_3').style.display = 'none';
                    document.getElementById('next_test7').style.display = 'block';

                    handled_proceed_5 = true;
                }

            })
            break;

        case 6:
            //last test - secondSentenceRemembering

            handled_proceed_6 = false;
            document.getElementById('log7').style.display = 'none';
            text_to_say = "Děkujeme, to jsou všechny úkoly, které jsme pro vás měli připravené. Dobrá práce.";

            do_tts(text_to_say);

            speechCloud.on('tts_done', function msg() {
                if (!handled_proceed_6) {

                    secondSentenceRememberingFcn()

                    handled_proceed_6 = true;
                }

            })
            break;

        
        



    }

}
/* Obsluha tlačítka Pokracovat */
function nextTestFcn() {
    //document.getElementById('next_test').style.display = 'none';
    switch (test_idx) {
        case -1:
            document.getElementById('next_test').style.display = 'none';
            numbersRepeatingFcn();
            break;

        case 0:
            document.getElementById('next_test2').style.display = 'none';
            firstSentenceRememberingFcn();

            break;
        case 1:
            document.getElementById('next_test3').style.display = 'none';
            lakePictureFcn();

            break;
        case 2:
            document.getElementById('next_test4').style.display = 'none';
            pictureObjectsFcn();
            break;
        case 3:
            document.getElementById('next_test5').style.display = 'none';
            firstPicturesRememberingFcn();
            break;

        case 4:
            document.getElementById('next_test6').style.display = 'none';
            secondPicturesRememberingFcn();
            break;
        case 5:
            document.getElementById('next_test7').style.display = 'none';
            animalsRememberingFcn();
            break;
    }
    test_idx = test_idx + 1;

    do_recognize();

};

/* Obsluha tlačítka Další číslo */
function nextNumberFcn() {
     
    speechCloud.asr_pause();
    recognizing = false;
    document.getElementById('next_number').style.display = 'none';


    handle_numbers();

};
/* Obsluha tlačítka Další obrázek */
function nextPictureFcn() {
    speechCloud.asr_pause();
    recognizing = false;
    document.getElementById('next_picture').style.display = 'none';


    handle_pictures();

};

function do_pause() {
    if (recognizing) {
        speechCloud.asr_pause();
        recognizing = false;
    }

}
function handle_numbers() {
    
    if (numbers.length != 0) {
        let numberTTS = numbers.pop()

        do_tts(numberTTS)
        //console.log("I AM HEREEEEEEEEEE")
        let handled_numbers = false;

        speechCloud.on('tts_done', function () {
            if (!handled_numbers) {
                
                handled_numbers = true;

                document.getElementById('log1').style.display = 'block';

                log1("Opakujte právě slyšené číslo")

                if (!recognizing) {
                    speechCloud.asr_recognize();
                    recognizing = true;
                }
            }

        }
        )
    }
    else {
        document.getElementById('log1').style.display = 'none';
        proceed_to_next_test();
    }
}

function handle_pictures() {
    console.log("picturesIds script", picturesIds)
    

    if (picturesIds.length != 0) {
        document.getElementById('firstPicturesRememberingPicture').style.display = "block";
        document.getElementById('firstPicturesRememberingPicture').src = `./pictures/firstPicturesRemembering/${picturesIds.pop()}.jpg`;
        
        if (!recognizing) {
            speechCloud.asr_recognize();
            recognizing = true;
        }
            

        
        
    }
    else {
        document.getElementById('firstPicturesRememberingPicture').style.display = 'none';
        proceed_to_next_test();
    }
}
/* Syntéza řeči */
function do_tts(text, voice) {
    speechCloud.tts_synthesize({
        text: text,
        voice: voice
    });
}


function startTimer() {
    switch (test_idx) {
        case 1:
            duration = 60; //60
            countdown_name = 'countdown_1';
            break;
        case 2:
            duration = 60; //60
            countdown_name = 'countdown_2';
            break;
        case 4:
            duration = 30; //30
            countdown_name = 'countdown_4';
            break;
        case 5:
            duration = 30; //30
            countdown_name = 'countdown_3';
            break;
    }

    display = document.querySelector('#' + countdown_name);
    var timer = duration, seconds;

    var countdown = setInterval(function () {
        seconds = parseInt(timer % 60, 10);

        //seconds = seconds < 10 ? "0" + seconds : seconds;
        timer = timer < 10 ? "0" + timer : timer;
        //display.textContent = seconds + "s";
        display.textContent = timer + "s";

        if (--timer < 0) {
            proceed_to_next_test();
            clearInterval(countdown);

        }
    }, 1000);
}
