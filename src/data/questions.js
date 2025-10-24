// questions.js
// Each q: { id, mode: 'easy'|'normal'|'hard', question, options:[], answerIndex }
// Make sure hard questions have 6 options

const questions = [
  // ===== EASY (10 questions, 1 point each) =====
  { id:'e1', mode:'easy', question:'Which keyword creates block-scoped variable?', options:['var','let','const','function'], answerIndex:1 },
  { id:'e2', mode:'easy', question:'Which is used for template literals?', options:['" "','` `','< >','( )'], answerIndex:1 },
  { id:'e3', mode:'easy', question:'Ternary operator format ?', options:['cond ? a : b','cond : a ? b','if ? then : else','cond ? then'], answerIndex:0 },
  { id:'e4', mode:'easy', question:'Which method creates a new array by mapping?', options:['map()','filter()','forEach()','find()'], answerIndex:0 },
  { id:'e5', mode:'easy', question:'Which returns first element matching test?', options:['filter','find','map','reduce'], answerIndex:1 },
  { id:'e6', mode:'easy', question:'Which creates a new Promise?', options:['new promise()','new Promise()','Promise.create()','Promise()'], answerIndex:1 },
  { id:'e7', mode:'easy', question:'How to write an arrow function?', options:['function=>','() => {}','=> function()','fn => function'], answerIndex:1 },
  { id:'e8', mode:'easy', question:'Which is used to get object keys?', options:['Object.entries','Object.keys','Object.values','Object.getKeys'], answerIndex:1 },
  { id:'e9', mode:'easy', question:'Which array method changes no return (just iteration)?', options:['forEach','map','filter','reduce'], answerIndex:0 },
  { id:'e10', mode:'easy', question:'fetch() is used for ?', options:['DOM update','Networking / API','Routing','Styling'], answerIndex:1 },

  // ===== NORMAL (10 questions, 2 points each) =====
  { id:'n1', mode:'normal', question:'What is hoisting in JS?', options:['Variables move to bottom','Declarations move to top','Functions removed','Nothing'], answerIndex:1 },
  { id:'n2', mode:'normal', question:'const variable can be reassigned?', options:['Yes','No — cannot reassign','Only in functions','Only for arrays'], answerIndex:1 },
  { id:'n3', mode:'normal', question:'Spread operator syntax?', options:['...arr','..arr','spread(arr)','*arr'], answerIndex:0 },
  { id:'n4', mode:'normal', question:'Rest operator collects remaining args as ?', options:['Object','Array','String','Number'], answerIndex:1 },
  { id:'n5', mode:'normal', question:'Destructuring array: const [a,b] = arr; a gets ?', options:['first element','second element','whole array','undefined'], answerIndex:0 },
  { id:'n6', mode:'normal', question:'Destructuring object: const {x} = obj; x refers to ?', options:['obj.x property','first key','index 0','method'], answerIndex:0 },
  { id:'n7', mode:'normal', question:'Pass by reference applies to ?', options:['Primitives','Objects','Numbers only','Strings only'], answerIndex:1 },
  { id:'n8', mode:'normal', question:'Object.freeze(obj) does ?', options:['Makes read-only','Deletes object','Copies object','Converts to array'], answerIndex:0 },
  { id:'n9', mode:'normal', question:'Higher order function is ?', options:['Function taking/returning function','Function with default param','Arrow function','Method on Object'], answerIndex:0 },
  { id:'n10', mode:'normal', question:'Which array method returns index of element?', options:['findIndex','find','index','search'], answerIndex:0 },

  // ===== HARD (14 questions, 5 points each, 6 options each) =====
  { id:'h1', mode:'hard', question:'Which accurately describes "pass by value" vs "pass by reference"?',
    options:['Both are same','Primitives copied (value), objects passed by reference','Objects copied, primitives referenced','Only functions referenced','Neither used','Only arrays copied'], answerIndex:1 },

  { id:'h2', mode:'hard', question:'Which Object method returns [key, value] pairs?',
    options:['Object.keys','Object.values','Object.entries','Object.pairs','Object.items','Object.map'], answerIndex:2 },

  { id:'h3', mode:'hard', question:'Which array method reduces array to single value with accumulator?',
    options:['map','filter','forEach','reduce','find','sort'], answerIndex:3 },

  { id:'h4', mode:'hard', question:'Which is true about async/await?',
    options:['async makes function synchronous','await works only in async functions','await blocks whole thread','async returns void','await used for callbacks','async replaces promises'], answerIndex:1 },

  { id:'h5', mode:'hard', question:'Which fetch() chain returns json body correctly?',
    options:['fetch().then(res => res)','fetch().then(res => res.json())','fetch().json()','fetch().then(json => json)','fetch().then(res => res.body)','fetch().then(res => res.text())'],
    answerIndex:1 },

  { id:'h6', mode:'hard', question:'In React, useState hook returns ?',
    options:['single value','array [state, setState]','object','boolean','component','promise'], answerIndex:1 },

  { id:'h7', mode:'hard', question:'React useEffect dependency [] means ?',
    options:['run every render','run once on mount','never run','run on unmount only','run on state change','run on event'], answerIndex:1 },

  { id:'h8', mode:'hard', question:'React Router nested routing is useful for ?',
    options:['Global state','Nested UI layouts','Server rendering','Styling only','Forms','Images'], answerIndex:1 },

  { id:'h9', mode:'hard', question:'Protected route concept ?',
    options:['Route always open','Requires auth before access','Route for admins only','Route with CSS','Dynamic import','Lazy loading'], answerIndex:1 },

  { id:'h10', mode:'hard', question:'Which is true: Class Components vs Functional Components?',
    options:['Class has hooks','Functional can use hooks, Class uses lifecycle methods','Functional cannot render','Class is deprecated','Functional slower','Class supports hooks'], answerIndex:1 },

  { id:'h11', mode:'hard', question:'Material UI: which component used for layout spacing?',
    options:['Box','Style','Div','Layout','GridOnly','None'], answerIndex:0 },

  { id:'h12', mode:'hard', question:'Which array method creates filtered array based on test?',
    options:['map','filter','reduce','forEach','splice','slice'], answerIndex:1 },

  { id:'h13', mode:'hard', question:'Which is correct use of default parameter?',
    options:['function f(a=2){}','function f(a)?2','let a = default 2','const f = (a) => a ?? 2','default function f(a)','function f(a=){}'], answerIndex:0 },

  { id:'h14', mode:'hard', question:'Which is correct way to get values of object?',
    options:['Object.getValues(obj)','Object.values(obj)','obj.values()','Object.v(obj)','values(obj)','Object.valueOf(obj)'], answerIndex:1 },
];

export default questions;
