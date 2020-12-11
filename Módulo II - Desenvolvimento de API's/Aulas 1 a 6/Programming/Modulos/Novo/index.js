import op1 from './operacoes1.js';
import op2 from './operacoes2.js';

import {divisao, resto} from './operacoesNomeadas.js';

console.log(op1.soma(1, 3));
console.log(op1.subtracao(1, 3));
console.log(op1.nada);
console.log(op2(1, 3));

// nomeada
console.log(divisao(3, 3));
console.log(resto(3, 3));