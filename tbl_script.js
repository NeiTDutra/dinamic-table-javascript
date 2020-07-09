//Funcao adiciona uma nova linha na tabela
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
                var sttl = idTabela+'sttl';
                
                celula1.innerHTML = '<input type="text" id="'+qtd+'" name="quantidade" size="5" placeholder="000x">'; 
                celula2.innerHTML = '<input type="text" name="descricao" size="40" placeholder="Descrição do serviço">'; 
//caractere de escape passando parametro para função como variavel
                celula3.innerHTML = '<input type="text" id="'+vu+'" name="valorUnitario" size="8" placeholder="0.000,00" onkeyup="calculaMult(\''+qtd+'\',\''+vu+'\',\''+vt+'\',\''+idTabela+'\',\''+sttl+'\')">'; 
                celula4.innerHTML = '<input type="text" id="'+vt+'" class="'+sttl+'" name="valorTotal" size="8" placeholder="0.000,00"readonly="true">'; 
                celula5.innerHTML =  '<button onclick="removeLinha(this,'+idTabela+')">X</button>';
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
            
// função que multiplica valor unitario por quantidade de itens
            function calculaMult(q,vu,vt,idt,sttl) {
            
              var n1 = parseFloat(document.getElementById(q).value, 10);
              var n2 = parseFloat(document.getElementById(vu).value, 10);
              
              document.getElementById(vt).value = n1 * n2;
              
              switch(idt){
              
                 case 'tbl_orc':
                    var els = document.getElementsByClassName('tbl_orcsttl');
                    var elsArray = Array.prototype.slice.call(els, 0);
                    var soma = 0;
                    elsArray.forEach(function(el) {
                        soma += parseFloat(el.value);
                    });
                    document.getElementById('ttl_srv').value = soma;
                 break;
                 case 'tbl_mtl':
                    var els = document.getElementsByClassName('tbl_mtlsttl');
                    var elsArray = Array.prototype.slice.call(els, 0);
                    var soma = 0;
                    elsArray.forEach(function(el) {
                        soma += parseFloat(el.value);
                    });
                    document.getElementById('ttl_mtl').value = soma;
                 break;
              }
              
              var vtc0 = parseFloat(document.getElementById('ttl_srv').value, 10);
              var vtc1 = parseFloat(document.getElementById('ttl_mtl').value, 10);
              var sm = vtc0 + vtc1;
              
              document.getElementById('tl_orc').value = sm;
              
            }
            
            function zera() {
               
                   document.getElementById('ttl_srv').value = null;
                   document.getElementById('ttl_mtl').value = null;
                   document.getElementById('ttl_orc').value = null;
            }
              
            

