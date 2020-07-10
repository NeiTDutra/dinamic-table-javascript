
// função encontrada em https://www.guj.com.br/t/somar-valores-de-uma-lista-e-apresentar-o-total-via-javascript/200770/17
// função replace em https://forum.imasters.com.br/topic/289712-c%C3%A1lculos-com-numeros-em-formato-moeda/
// função moeda em https://www.alura.com.br/artigos/formatando-numeros-no-javascript
// função moeda em http://wbruno.com.br/expressao-regular/formatar-em-moeda-reais-expressao-regular-em-javascript/

// Funcao adiciona uma nova linha na tabela

            function adicionaLinha(idTabela) {
            
                var tabela = document.getElementById(idTabela);
                var numeroLinhas = tabela.rows.length;
                var anterior = numeroLinhas - 1;
                var linha = tabela.insertRow(numeroLinhas);
                var celula1 = linha.insertCell(0);
                var celula2 = linha.insertCell(1);   
                var celula3 = linha.insertCell(2);   
                var celula4 = linha.insertCell(3);   
                var celula5 = linha.insertCell(4);
                var qtd = idTabela+'quantidade'+numeroLinhas;
                var vu = idTabela+'valorUnitario'+numeroLinhas;
                var vt = idTabela+'valorTotal'+numeroLinhas;
                var sttl = idTabela+'_sttl';
                
                celula1.innerHTML = '<input type="text" id="'+qtd+'" name="quantidade" size="5" placeholder="000x">'; 
                celula2.innerHTML = '<input type="text" name="descricao" size="40" placeholder="Descrição do serviço">'; 
// caractere de escape passando parametro para função como variavel
                celula3.innerHTML = '<input type="text" id="'+vu+'" name="valorUnitario" size="8" placeholder="0.000,00" onkeyup="k(this), calculaMult(\''+qtd+'\',\''+vu+'\',\''+vt+'\',\''+idTabela+'\')">'; 
                celula4.innerHTML = '<input type="text" id="'+vt+'" class="'+sttl+'" name="valorTotal" size="8" placeholder="0.000,00"readonly="true" onfocus="k(this)">'; 
                celula5.innerHTML =  '<button onclick="removeLinha(this,'+idTabela+')">X</button>';
            }
            
// função que formata moeda BRL para valor unitário
              
            function k(i) {

		        var v = i.value.replace(/\D/g,'');
		        v = (v/100).toFixed(2) + '';
		        v = v.replace(".", ",");
		        v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1$2$3,");
		        v = v.replace(/(\d)(\d{3}),/g, "$1$2,");
		        i.value = 'R$ '+v;

	        }
            
// funcao remove uma linha da tabela

            function removeLinha(linha,t) {
            
               var i=linha.parentNode.parentNode.rowIndex;
               t.deleteRow(i);
            }  
              
// função escreve data atual

            function pegarDataAtual(){
            
               data = new Date;
               month = data.getMonth() + 1;
               document.getElementById('p_data').innerHTML = '<input type="text" name="data" size="14" value="Data: '+data.getDate()+' / '+month+' / '+data.getFullYear()+'" readonly="true">';
            }   
            
// função imprime a div

            function printDiv() {
            
               window.print();
            }  
            
// função que multiplica valor unitario por quantidade de itens, soma valor total das tabelas e valor total do orçamento 

            function calculaMult(q,vu,vt,idt) {
            
              var n1 = parseFloat(document.getElementById(q).value, 10);
              var n2 = document.getElementById(vu).value;
              n2 = parseFloat(moedaReverse(n2));
              
              var nn = n1 * n2;
              nn.toFixed(2);
              nn = nn.toLocaleString('pt-br', {style:'currency', currency:'BRL'});
              document.getElementById(vt).value = nn;
              
              switch(idt){
              
                 case 'tbl_orc':
                 
                    var els = document.getElementsByClassName('tbl_orc_sttl');
                    var elsArray = Array.prototype.slice.call(els, 0);
                    var soma = 0;
                    elsArray.forEach(function(el) {
                        soma += parseFloat(moedaReverse(el.value));
                    });
                    soma = soma.toLocaleString('pt-br', {style:'currency', currency:'BRL'});
              
              document.getElementById('test').innerHTML = soma;
                    document.getElementById('ttl_srv').value = soma;
                 break;
                 
                 case 'tbl_mtl':
                    var els = document.getElementsByClassName('tbl_mtl_sttl');
                    var elsArray = Array.prototype.slice.call(els, 0);
                    var soma = 0;
                    elsArray.forEach(function(el) {
                        soma += parseFloat(moedaReverse(el.value));
                    });
                    soma = soma.toLocaleString('pt-br', {style:'currency', currency:'BRL'});
                    document.getElementById('ttl_mtl').value = soma;
                 break;
              }
              
              var vtc0 = document.getElementById('ttl_srv').value;
              vtc0 = moedaReverse(vtc0);
              vtc0 = parseFloat(vtc0, 10);
              
              var vtc1 = document.getElementById('ttl_mtl').value;
              vtc1 = moedaReverse(vtc1);
              vtc1 = parseFloat(vtc1, 10);
              
              var sm = vtc0 + vtc1;
              sm = sm.toLocaleString('pt-br', {style:'currency', currency:'BRL'});
              
              document.getElementById('tl_orc').value = sm;
              
            }
            
// função reverte padrão moeda BRL para calculo no padrão USA
            
            function moedaReverse(m) {
                
              var m = m.replace('R$', '');
              m = m.replace('.', '');
              m = m.replace(',', '.');
              m = m == '' ? 0 : m;
              return m;
            }
            
// função reseta campos input
            
            function reset() {
                document.getElementsByTagName('input').value = '';
            }
            
// função adiciona máscara para campo telefone, pode ser usado para qualquer máscara

	        function mascara(t, mask){

		        var i = t.value.length;
		        var saida = mask.substring(1,0);
		        var texto = mask.substring(i)

		        if (texto.substring(0,1) != saida){

			        t.value += texto.substring(0,1);
			        
		        }

	        }

