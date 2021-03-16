"use strict"; var _slicedToArray = function () { return function (e, t) { if (Array.isArray(e)) return e; if (Symbol.iterator in Object(e)) return function sliceIterator(e, t) { var n = [], a = !0, r = !1, i = void 0; try { for (var u, o = e[Symbol.iterator](); !(a = (u = o.next()).done) && (n.push(u.value), !t || n.length !== t); a = !0); } catch (e) { r = !0, i = e } finally { try { !a && o.return && o.return() } finally { if (r) throw i } } return n }(e, t); throw new TypeError("Invalid attempt to destructure non-iterable instance") } }(), _createClass = function () { function defineProperties(e, t) { for (var n = 0; n < t.length; n++) { var a = t[n]; a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a) } } return function (e, t, n) { return t && defineProperties(e.prototype, t), n && defineProperties(e, n), e } }(); function _possibleConstructorReturn(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t } function _inherits(e, t) { if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t); e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t) } function _classCallCheck(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") } var am = require("dfa.js"), StateNumSequence = am.StateNumSequence, State = am.State, Fragment = am.Fragment, NFA = am.NFA, CharInput = am.CharInput, Sentence = function () { function Sentence(e) { var t = this; if (_classCallCheck(this, Sentence), null === e || void 0 === e) throw "Parameter 'text' is required"; this.text = e; return this.kanas = Object.freeze(function toKanaArray(e) { var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null; switch (e.length) { case 0: return []; default: var a = function tailKana(e, n) { if (e.length > 1) { var a = e.slice(-2); if (Kana.mapping[a]) return [new Kana.Double(t, a), e.slice(0, -2)] } var r = e.slice(-1), i = e.slice(0, -1); switch (r) { case "ッ": return [new Kana.Ltu(t, n), i]; case "ン": return [new Kana.N(t, n), i];case "ん": return [new Kana.N(t, n), i]; default: return [new Kana.Single(t, r), i] } }(e, n), r = _slicedToArray(a, 2), i = r[0]; return toKanaArray(r[1], i).concat(i) } }(e)), Object.freeze(this) } return _createClass(Sentence, [{ key: "newChallenge", value: function newChallenge() { return new Challenge(this) } }, { key: "getDefaultRoman", value: function getDefaultRoman() { return this.kanas.reduce(function (e, t) { return e + t.getDefaultRoman() }, "") } }, { key: "getDefaultRomanAfter", value: function getDefaultRomanAfter(e) { return this.kanas.slice(this.kanas.indexOf(e) + 1).reduce(function (e, t) { return e + t.getDefaultRoman() }, "") } }, { key: "getKanaIterator", value: function getKanaIterator() { return new KanaIterator(this) } }, { key: "getDFA", value: function getDFA() { var e = Fragment.concatAll(this.kanas.map(function (e) { return e.getNFAFragment() })).toUnacceptable().toLastAcceptable(), t = new NFA; return t.addStartState(new State(StateNumSequence.newSequence().next(), [])), t.appendFragment(e, t.start.num), t.toDFA() } }]), Sentence }(), KanaIterator = function () { function KanaIterator(e) { _classCallCheck(this, KanaIterator), this._sentence = e, this._index = 0 } return _createClass(KanaIterator, [{ key: "next", value: function next() { if (!this.hasNext()) throw "No more kana in the sentence"; return this._sentence.kanas[this._index++] } }, { key: "hasNext", value: function hasNext() { return this._index < this._sentence.kanas.length } }]), KanaIterator }(); Sentence.test = function (e) { var t = new Sentence(e); return [t.getDefaultRoman()].concat(t.kanas.map(function (e) { return e.getDefaultRomanAfterThis() })) }; var Kana = function () { function Kana(e) { _classCallCheck(this, Kana), this.sentence = e } return _createClass(Kana, [{ key: "getDefaultRoman", value: function getDefaultRoman() { throw "unsupported operation" } }, { key: "getDefaultRomanAfterThis", value: function getDefaultRomanAfterThis() { return this.sentence.getDefaultRomanAfter(this) } }, { key: "getNFAFragment", value: function getNFAFragment() { throw "getNFAFragment() must be implemented by subclasses." } }, { key: "getDFA", value: function getDFA() { var e = new NFA; return e.addStartState(new State(StateNumSequence.newSequence().next(), [])), e.appendFragment(this.getNFAFragment(), e.start.num), e.toDFA() } }], [{ key: "tails", value: function tails(e) { return function _tails(e) { switch (e.length) { case 0: return []; default: return [e].concat(_tails(e.slice(1))) } }(e) } }, { key: "romanToFragment", value: function romanToFragment(e) { var t = StateNumSequence.newSequence(), n = new State(t.next(), []).toAcceptable(e), a = Kana.tails(e).reduce(function (e, a) { var r = new am.Edge(new am.CharLabel.Single(a.charAt(0)), n.num), i = new State(t.next(), [r], { tail: a }); if (e.length > 0) { var u = e[e.length - 1]; e[e.length - 1] = u.changeEdgesDest(n.num, i.num) } return e.concat(i) }, []); return new Fragment(a.concat(n)) } }]), Kana }(); Kana.Single = function (e) { function Kana_Single(e, t) { _classCallCheck(this, Kana_Single); var n = _possibleConstructorReturn(this, (Kana_Single.__proto__ || Object.getPrototypeOf(Kana_Single)).call(this, e)); return n.ch = t, n.romans = Object.freeze(Kana.mapping[t]), _possibleConstructorReturn(n, Object.freeze(n)) } return _inherits(Kana_Single, Kana), _createClass(Kana_Single, [{ key: "getDefaultRoman", value: function getDefaultRoman() { return this.romans[0] } }, { key: "getNFAFragment", value: function getNFAFragment() { var e = this.romans.map(function (e) { return Kana.romanToFragment(e) }); return Fragment.mergeAll(e) } }]), Kana_Single }(), Kana.Double = function (e) { function Kana_Double(e, t) { _classCallCheck(this, Kana_Double); var n = _possibleConstructorReturn(this, (Kana_Double.__proto__ || Object.getPrototypeOf(Kana_Double)).call(this, e)); return n.chs = t, n.romans = Kana.mapping[t], n } return _inherits(Kana_Double, Kana), _createClass(Kana_Double, [{ key: "getDefaultRoman", value: function getDefaultRoman() { return this.romans[0] } }, { key: "getNFAFragment", value: function getNFAFragment() { var e = this.romans.map(function (e) { return Kana.romanToFragment(e) }), t = Fragment.mergeAll(Kana.mapping[this.chs[1]].map(function (e) { return Kana.romanToFragment(e) })), n = Kana.mapping[this.chs[0]].map(function (e) { return Kana.romanToFragment(e).concat(t) }); return Fragment.mergeAll(e.concat(n)).toUnacceptable().toLastAcceptable() } }]), Kana_Double }(), Kana.Ltu = function (e) { function Kana_Ltu(e, t) { _classCallCheck(this, Kana_Ltu); var n = _possibleConstructorReturn(this, (Kana_Ltu.__proto__ || Object.getPrototypeOf(Kana_Ltu)).call(this, e)); return n.prev = t, n.romans = Object.freeze(["ltu", "xtu", "ltsu", "xtsu"]), _possibleConstructorReturn(n, Object.freeze(n)) } return _inherits(Kana_Ltu, Kana), _createClass(Kana_Ltu, [{ key: "getDefaultRoman", value: function getDefaultRoman() { if (this.prev) { var e = this.prev.getDefaultRoman().charAt(0); if (!"aiueon".includes(e)) return e } return this.romans[0] } }, { key: "getNFAFragment", value: function getNFAFragment() { var e = []; if (this.prev) { var t = this.prev.getDefaultRoman().charAt(0); "aiueon".includes(t) || e.push(Kana.romanToFragment(t)) } return Fragment.mergeAll(e.concat(this.romans.map(function (e) { return Kana.romanToFragment(e) }))) } }]), Kana_Ltu }(), Kana.N = function (e) { function Kana_N(e, t) { _classCallCheck(this, Kana_N); var n = _possibleConstructorReturn(this, (Kana_N.__proto__ || Object.getPrototypeOf(Kana_N)).call(this, e)); return n.prev = t, n.allowSingleN = t && !"aiueony".includes(t.getDefaultRoman().charAt(0)), _possibleConstructorReturn(n, Object.freeze(n)) } return _inherits(Kana_N, Kana), _createClass(Kana_N, [{ key: "getDefaultRoman", value: function getDefaultRoman() { return this.allowSingleN ? "n" : "nn" } }, { key: "getNFAFragment", value: function getNFAFragment() { return this.allowSingleN ? Fragment.mergeAll(["n", "nn"].map(function (e) { return Kana.romanToFragment(e) })).toUnacceptable().toLastAcceptable() : Kana.romanToFragment("nn") } }]), Kana_N }(); var Challenge = function () { function Challenge(e) { _classCallCheck(this, Challenge), this._sentence = e, this._transitions = e.kanas.map(function (e) { return e.getDFA().startNewTransition() }), this._pointer = 0, this._typedRoman = [], this._typingCount = 0, this._mistypingCount = 0 } return _createClass(Challenge, [{ key: "input", value: function input(e) { if (this.isCleared()) throw "Challenge has been cleared"; var input = new CharInput(e); if (this._currentTransition.move(input)) return this._typedRoman.push(e), this._typingCount++, !0; var t = this._transitions[this._pointer + 1]; return this._currentTransition.isAcceptable() && t && t.move(input) ? (this._typedRoman.push(e), this._typingCount++, this._pointer++, !0) : (this._mistypingCount++, !1) } }, { key: "isCleared", value: function isCleared() { return this._transitions[this._transitions.length - 1].isAcceptable() } }, { key: "text", get: function get() { return this._sentence.text } }, { key: "roman", get: function get() { return this._sentence.getDefaultRoman() } }, { key: "typedRoman", get: function get() { return this._typedRoman.join("") } }, { key: "remainingRoman", get: function get() { if (this.isCleared()) return ""; var e = this._currentTransition.current.attrs.tail; return (!this._currentTransition.isAcceptable() && e && e.length > 0 ? e[0] : "") + this._sentence.getDefaultRomanAfter(this._currentKana) } }, { key: "typingCount", get: function get() { return this._typingCount } }, { key: "mistypingCount", get: function get() { return this._mistypingCount } }, { key: "_currentTransition", get: function get() { return this._transitions[this._pointer] } }, { key: "_currentKana", get: function get() { return this._sentence.kanas[this._pointer] } }]), Challenge }(); Kana.DEFAULT_KANA_MAPPING = Object.freeze({
    "ア": ["a"],
    "イ": ["i"],
    "ウ": ["u", "wu", "whu"],
    "エ": ["e"],
    "オ": ["o"],
    "カ": ["ka", "ca"],
    "キ": ["ki"],
    "ク": ["ku", "cu", "qu"],
    "ケ": ["ke"],
    "コ": ["ko", "co"],
    "サ": ["sa"],
    "シ": ["si", "shi", "ci"],
    "ス": ["su"],
    "セ": ["se", "ce"],
    "ソ": ["so"],
    "タ": ["ta"],
    "チ": ["ti", "chi"],
    "ツ": ["tu", "tsu"],
    "テ": ["te"],
    "ト": ["to"],
    "ナ": ["na"],
    "ニ": ["ni"],
    "ヌ": ["nu"],
    "ネ": ["ne"],
    "ノ": ["no"],
    "ハ": ["ha"],
    "ヒ": ["hi"],
    "フ": ["hu", "fu"],
    "ヘ": ["he"],
    "ホ": ["ho"],
    "マ": ["ma"],
    "ミ": ["mi"],
    "ム": ["mu"],
    "メ": ["me"],
    "モ": ["mo"],
    "ヤ": ["ya"],
    "ユ": ["yu"],
    "ヨ": ["yo"],
    "ラ": ["ra"],
    "リ": ["ri"],
    "ル": ["ru"],
    "レ": ["re"],
    "ロ": ["ro"],
    "ワ": ["wa"],
    "ヲ": ["wo"],
    "ガ": ["ga"],
    "ギ": ["gi"],
    "グ": ["gu"],
    "ゲ": ["ge"],
    "ゴ": ["go"],
    "ザ": ["za"],
    "ジ": ["zi", "ji"],
    "ズ": ["zu"],
    "ゼ": ["ze"],
    "ゾ": ["zo"],
    "ダ": ["da"],
    "ヂ": ["di"],
    "ヅ": ["du"],
    "デ": ["de"],
    "ド": ["do"],
    "バ": ["ba"],
    "ビ": ["bi"],
    "ブ": ["bu"],
    "ベ": ["be"],
    "ボ": ["bo"],
    "パ": ["pa"],
    "ピ": ["pi"],
    "プ": ["pu"],
    "ペ": ["pe"],
    "ポ": ["po"],
    "ヴ": ["vu"],
    "ー": ["-"],
    "ァ": ["la", "xa"],
    "ィ": ["li", "xi", "lyi", "xyi"],
    "ゥ": ["lu", "xu"],
    "ェ": ["le", "xe", "lye", "xye"],
    "ォ": ["lo", "xo"],
    "ヵ": ["lka", "xka"],
    "ヶ": ["lke", "xke"],
    "ヮ": ["lwa", "xwa"],
    "ャ": ["lya", "xya"],
    "ュ": ["lyu", "xyu"],
    "ョ": ["lyo", "xyo"],
    "キャ": ["kya"],
    "キィ": ["kyi"],
    "キュ": ["kyu"],
    "キェ": ["kye"],
    "キョ": ["kyo"],
    "シャ": ["sya", "sha"],
    "シィ": ["syi"],
    "シュ": ["syu", "shu"],
    "シェ": ["sye", "she"],
    "ショ": ["syo", "sho"],
    "チャ": ["tya", "cha", "cya"],
    "チィ": ["tyi", "cyi"],
    "チュ": ["tyu", "chu", "cyu"],
    "チェ": ["tye", "che", "cye"],
    "チョ": ["tyo", "cho", "cyo"],
    "ニャ": ["nya"],
    "ニィ": ["nyi"],
    "ニュ": ["nyu"],
    "ニェ": ["nye"],
    "ニョ": ["nyo"],
    "ヒャ": ["hya"],
    "ヒィ": ["hyi"],
    "ヒュ": ["hyu"],
    "ヒェ": ["hye"],
    "ヒョ": ["hyo"],
    "ミャ": ["mya"],
    "ミィ": ["myi"],
    "ミュ": ["myu"],
    "ミェ": ["mye"],
    "ミョ": ["myo"],
    "リャ": ["rya"],
    "リィ": ["ryi"],
    "リュ": ["ryu"],
    "リェ": ["rye"],
    "リョ": ["ryo"],
    "ギャ": ["gya"],
    "ギィ": ["gyi"],
    "ギュ": ["gyu"],
    "ギェ": ["gye"],
    "ギョ": ["gyo"],
    "ジャ": ["ja", "jya", "zya"],
    "ジィ": ["jyi", "zyi"],
    "ジュ": ["ju", "jyu", "zyu"],
    "ジェ": ["je", "jye", "zye"],
    "ジョ": ["jo", "jyo", "zyo"],
    "ビャ": ["bya"],
    "ビィ": ["byi"],
    "ビュ": ["byu"],
    "ビェ": ["bye"],
    "ビョ": ["byo"],
    "ピャ": ["pya"],
    "ピィ": ["pyi"],
    "ピュ": ["pyu"],
    "ピェ": ["pye"],
    "ピョ": ["pyo"],
    "イェ": ["ye"],
    "ウァ": ["wha"],
    "ウィ": ["whi", "wi"],
    "ウェ": ["whe", "we"],
    "ウォ": ["who"],
    "クァ": ["qa", "kwa"],
    "クィ": ["qi"],
    "クェ": ["qe"],
    "クォ": ["qo"],
    "ツァ": ["tsa"],
    "ツィ": ["tsi"],
    "ツェ": ["tse"],
    "ツォ": ["tso"],
    "テャ": ["tha"],
    "ティ": ["thi"],
    "テュ": ["thu"],
    "テェ": ["the"],
    "テョ": ["tho"],
    "トァ": ["twa"],
    "トィ": ["twi"],
    "トゥ": ["twu"],
    "トェ": ["twe"],
    "トォ": ["two"],
    "ファ": ["fa"],
    "フィ": ["fi"],
    "フェ": ["fe"],
    "フォ": ["fo"],
    "フャ": ["fya"],
    "フュ": ["fyu"],
    "フョ": ["fyo"],
    "グァ": ["gwa"],
    "グィ": ["gwi"],
    "グゥ": ["gwu"],
    "グェ": ["gwe"],
    "グォ": ["gwo"],
    "ヂャ": ["dya"],
    "ヂィ": ["dyi"],
    "ヂュ": ["dyu"],
    "ヂェ": ["dye"],
    "ヂョ": ["dyo"],
    "デャ": ["dha"],
    "ディ": ["dhi"],
    "デュ": ["dhu"],
    "デェ": ["dhe"],
    "デョ": ["dho"],
    "ドァ": ["dwa"],
    "ドィ": ["dwi"],
    "ドゥ": ["dwu"],
    "ドェ": ["dwe"],
    "ドォ": ["dwo"],
    "ヴァ": ["va"],
    "ヴィ": ["vi", "vyi"],
    "ヴェ": ["ve", "vye"],
    "ヴォ": ["vo"],
    "ヴャ": ["vya"],
    "ヴュ": ["vyu"],
    "ヴョ": ["vyo"],
    "あ": ["a"],
    "い": ["i"],
    "う": ["u", "wu", "whu"],
    "え": ["e"],
    "お": ["o"],
    "か": ["ka", "ca"],
    "き": ["ki"],
    "く": ["ku", "cu", "qu"],
    "け": ["ke"],
    "こ": ["ko", "co"],
    "さ": ["sa"],
    "し": ["si", "shi", "ci"],
    "す": ["su"],
    "せ": ["se", "ce"],
    "そ": ["so"],
    "た": ["ta"],
    "ち": ["ti", "chi"],
    "つ": ["tu", "tsu"],
    "て": ["te"],
    "と": ["to"],
    "な": ["na"],
    "に": ["ni"],
    "ぬ": ["nu"],
    "ね": ["ne"],
    "の": ["no"],
    "は": ["ha"],
    "ひ": ["hi"],
    "ふ": ["hu", "fu"],
    "へ": ["he"],
    "ほ": ["ho"],
    "ま": ["ma"],
    "み": ["mi"],
    "む": ["mu"],
    "め": ["me"],
    "も": ["mo"],
    "や": ["ya"],
    "ゆ": ["yu"],
    "よ": ["yo"],
    "ら": ["ra"],
    "り": ["ri"],
    "る": ["ru"],
    "れ": ["re"],
    "ろ": ["ro"],
    "わ": ["wa"],
    "を": ["wo"],
    "が": ["ga"],
    "ぎ": ["gi"],
    "ぐ": ["gu"],
    "げ": ["ge"],
    "ご": ["go"],
    "ざ": ["za"],
    "じ": ["zi", "ji"],
    "ず": ["zu"],
    "ぜ": ["ze"],
    "ぞ": ["zo"],
    "だ": ["da"],
    "ぢ": ["di"],
    "づ": ["du"],
    "で": ["de"],
    "ど": ["do"],
    "ば": ["ba"],
    "び": ["bi"],
    "ぶ": ["bu"],
    "べ": ["be"],
    "ぼ": ["bo"],
    "ぱ": ["pa"],
    "ぴ": ["pi"],
    "ぷ": ["pu"],
    "ぺ": ["pe"],
    "ぽ": ["po"],
    "ぁ": ["la", "xa"],
    "ぃ": ["li", "xi", "lyi", "xyi"],
    "ぅ": ["lu", "xu"],
    "ぇ": ["le", "xe", "lye", "xye"],
    "ぉ": ["lo", "xo"],
    "ゎ": ["lwa", "xwa"],
    "ゃ": ["lya", "xya"],
    "ゅ": ["lyu", "xyu"],
    "ょ": ["lyo", "xyo"],
    "きゃ": ["kya"],
    "きぃ": ["kyi"],
    "きゅ": ["kyu"],
    "きぇ": ["kye"],
    "きょ": ["kyo"],
    "しゃ": ["sya", "sha"],
    "しぃ": ["syi"],
    "しゅ": ["syu", "shu"],
    "しぇ": ["sye", "she"],
    "しょ": ["syo", "sho"],
    "ちゃ": ["tya", "cha", "cya"],
    "ちぃ": ["tyi", "cyi"],
    "ちゅ": ["tyu", "chu", "cyu"],
    "ちぇ": ["tye", "che", "cye"],
    "ちょ": ["tyo", "cho", "cyo"],
    "にゃ": ["nya"],
    "にぃ": ["nyi"],
    "にゅ": ["nyu"],
    "にぇ": ["nye"],
    "にょ": ["nyo"],
    "ひゃ": ["hya"],
    "ひぃ": ["hyi"],
    "ひゅ": ["hyu"],
    "ひぇ": ["hye"],
    "ひょ": ["hyo"],
    "みゃ": ["mya"],
    "みぃ": ["myi"],
    "みゅ": ["myu"],
    "みぇ": ["mye"],
    "みょ": ["myo"],
    "りゃ": ["rya"],
    "りぃ": ["ryi"],
    "りゅ": ["ryu"],
    "りぇ": ["rye"],
    "りょ": ["ryo"],
    "ギャ": ["gya"],
    "ギィ": ["gyi"],
    "ギュ": ["gyu"],
    "ギェ": ["gye"],
    "ギョ": ["gyo"],
    "じゃ": ["ja", "jya", "zya"],
    "じぃ": ["jyi", "zyi"],
    "じゅ": ["ju", "jyu", "zyu"],
    "じぇ": ["je", "jye", "zye"],
    "じょ": ["jo", "jyo", "zyo"],
    "びゃ": ["bya"],
    "びぃ": ["byi"],
    "びゅ": ["byu"],
    "びぇ": ["bye"],
    "びょ": ["byo"],
    "ぴゃ": ["pya"],
    "ぴぃ": ["pyi"],
    "ぴゅ": ["pyu"],
    "ぴぇ": ["pye"],
    "ぴょ": ["pyo"],
    "いぇ": ["ye"],
    "うぁ": ["wha"],
    "うぃ": ["whi", "wi"],
    "うぇ": ["whe", "we"],
    "うぉ": ["who"],
    "くぁ": ["qa", "kwa"],
    "くぃ": ["qi"],
    "くぇ": ["qe"],
    "くぉ": ["qo"],
    "つぁ": ["tsa"],
    "つぃ": ["tsi"],
    "つぇ": ["tse"],
    "つぉ": ["tso"],
    "てゃ": ["tha"],
    "てぃ": ["thi"],
    "てゅ": ["thu"],
    "てぇ": ["the"],
    "てょ": ["tho"],
    "とぁ": ["twa"],
    "とぃ": ["twi"],
    "とぅ": ["twu"],
    "とぇ": ["twe"],
    "とぉ": ["two"],
    "ふぁ": ["fa"],
    "ふぃ": ["fi"],
    "ふぇ": ["fe"],
    "ふぉ": ["fo"],
    "ふゃ": ["fya"],
    "ふゅ": ["fyu"],
    "ふょ": ["fyo"],
    "ぐぁ": ["gwa"],
    "ぐぃ": ["gwi"],
    "ぐぅ": ["gwu"],
    "ぐぇ": ["gwe"],
    "ぐぉ": ["gwo"],
    "ぢゃ": ["dya"],
    "ぢぃ": ["dyi"],
    "ぢゅ": ["dyu"],
    "ぢぇ": ["dye"],
    "ぢょ": ["dyo"],
    "でゃ": ["dha"],
    "でぃ": ["dhi"],
    "でゅ": ["dhu"],
    "でぇ": ["dhe"],
    "でょ": ["dho"],
    "どぁ": ["dwa"],
    "どぃ": ["dwi"],
    "どぅ": ["dwu"],
    "どぇ": ["dwe"],
    "どぉ": ["dwo"],
    "ヴぁ": ["va"],
    "ヴぃ": ["vi", "vyi"],
    "ヴぇ": ["ve", "vye"],
    "ヴぉ": ["vo"],
    "ヴゃ": ["vya"],
    "ヴゅ": ["vyu"],
    "ヴょ": ["vyo"],
    "A": ["a", "A"],
    "B": ["b", "B"],
    "C": ["c", "C"],
    "D": ["d", "D"],
    "E": ["e", "E"],
    "F": ["f", "F"],
    "G": ["g", "G"],
    "H": ["h", "H"],
    "I": ["i", "I"],
    "J": ["j", "J"],
    "K": ["k", "K"],
    "L": ["l", "L"],
    "M": ["m", "M"],
    "N": ["n", "N"],
    "O": ["o", "O"],
    "P": ["p", "P"],
    "Q": ["q", "Q"],
    "R": ["r", "R"],
    "S": ["s", "S"],
    "T": ["t", "T"],
    "U": ["u", "U"],
    "V": ["v", "V"],
    "W": ["w", "W"],
    "X": ["x", "X"],
    "Y": ["y", "Y"],
    "Z": ["z", "Z"],
    "a": ["a"],
    "b": ["b"],
    "c": ["c"],
    "d": ["d"],
    "e": ["e"],
    "f": ["f"],
    "g": ["g"],
    "h": ["h"],
    "i": ["i"],
    "j": ["j"],
    "k": ["k"],
    "l": ["l"],
    "m": ["m"],
    "n": ["n"],
    "o": ["o"],
    "p": ["p"],
    "q": ["q"],
    "r": ["r"],
    "s": ["s"],
    "t": ["t"],
    "u": ["u"],
    "v": ["v"],
    "w": ["w"],
    "x": ["x"],
    "y": ["y"],
    "z": ["z"]
}), Kana.mapping = Object.assign({}, Kana.DEFAULT_KANA_MAPPING), module.exports = { Sentence: Sentence, KanaIterator: KanaIterator, Kana: Kana, Challenge: Challenge };