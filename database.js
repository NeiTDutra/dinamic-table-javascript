
// bloco-0 retirado de https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Storage

/*  Components.utils.import("resource://gre/modules/Services.jsm");
    Components.utils.import("resource://gre/modules/FileUtils.jsm"); 

    let file = FileUtils.getFile("ProfD", ["my_db_file_name.sqlite"]);
    let dbConn = Services.storage.openDatabase(file);
    
    dbConn.executeSimpleSQL("CREATE TEMP TABLE table_name (column_name INTEGER)");
    
    var statement = dbConn.createStatement("SELECT * FROM table_name WHERE column_name = :parameter");
    
    var statement = dbConn.createStatement("SELECT * FROM table_name WHERE id = :row_id");
    statement.params.row_id = 1234;
    
    let stmt = dbConn.createStatement("INSERT INTO table_name (value) VALUES(:value)");
    let params = stmt.newBindingParamsArray();
    for (let i = 0; i < 10; i++) {
      let bp = params.newBindingParams();
      bp.bindByName("value", i);
      params.addParams(bp);
    }
    stmt.bindParameters(params);
    
    statement.executeAsync({
      handleResult: function(aResultSet) {
        for (let row = aResultSet.getNextRow();
             row;
             row = aResultSet.getNextRow()) {

          let value = row.getResultByName("column_name");
        }
      },

      handleError: function(aError) {
        print("Error: " + aError.message);
      },

      handleCompletion: function(aReason) {
        if (aReason != Components.interfaces.mozIStorageStatementCallback.REASON_FINISHED)
          print("Query canceled or aborted!");
      }
    });
    
    while (statement.executeStep()) {
      let value = statement.row.column_name;
    }
    
    var statement = dbConn.createStatement("SELECT * FROM table_name");
    try {
      while (statement.step()) {
        // Use the results...
      }
    }
    finally {
      statement.reset();
    } */
    
    

// fim bloco-0 
//##############################################################

/* bloco-1 retirado de https://developer.mozilla.org/en-US/docs/Mozilla/Thunderbird/Thunderbird_extensions/HowTos///Common_Thunderbird_Extension_Techniques///Use_SQLite */

/*    const Cc = Components.classes;
    const Ci = Components.interfaces;

    var tbirdsqlite = {

      onLoad: function() {
        // initialization code
        this.initialized = true;
        this.dbInit();
      },

      dbConnection: null,

      dbSchema: {
         tables: {
           attachments:"id           INTEGER PRIMARY KEY, \
                        name         TEXT \
                        encoded      TEXT NOT NULL"
        }
      },

      dbInit: function() {
        var dirService = Cc["@mozilla.org/file/directory_service;1"].
          getService(Ci.nsIProperties);

        var dbFile = dirService.get("ProfD", Ci.nsIFile);
        dbFile.append("tbird.sqlite");

        var dbService = Cc["@mozilla.org/storage/service;1"].
          getService(Ci.mozIStorageService);

        var dbConnection;

        if (!dbFile.exists())
          dbConnection = this._dbCreate(dbService, dbFile);
        else {
          dbConnection = dbService.openDatabase(dbFile);
        }
        this.dbConnection = dbConnection;
      },

      _dbCreate: function(aDBService, aDBFile) {
        var dbConnection = aDBService.openDatabase(aDBFile);
        this._dbCreateTables(dbConnection);
        return dbConnection;
      },

      _dbCreateTables: function(aDBConnection) {
        for(var name in this.dbSchema.tables)
          aDBConnection.createTable(name, this.dbSchema.tables[name]);
      },
    };
    window.addEventListener("load", function(e) { tbirdsqlite.onLoad(e); }, false); */
    
// fim bloco-1 
//##############################################################

/* bloco-2 retirado de https://developer.mozilla.org/en-US/docs/Mozilla/Thunderbird/Thunderbird_extensions/HowTos///Common_Thunderbird_Extension_Techniques///Use_SQLite */

/*    var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
    var msg;
    db.transaction(function (tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
      tx.executeSql('INSERT INTO LOGS (id, log) VALUES (1, "foobar")');
      tx.executeSql('INSERT INTO LOGS (id, log) VALUES (2, "logmsg")');
      msg = '<p>Log message created and row inserted.</p>';
      document.querySelector('#status').innerHTML =  msg;
    });

    db.transaction(function (tx) {
      tx.executeSql('SELECT * FROM LOGS', [], function (tx, results) {
       var len = results.rows.length, i;
       msg = "<p>Found rows: " + len + "</p>";
       document.querySelector('#status').innerHTML +=  msg;
       for (i = 0; i < len; i++){
         msg = "<p><b>" + results.rows.item(i).log + "</b></p>";
         document.querySelector('#status').innerHTML +=  msg;
       }
     }, null);
    }); */

// fim bloco-2
//##############################################################

/* bloco-3 retirado de https://www.youtube.com/watch?v=7znA5k7gJqQ */ 

/*    window.addEventListener('load', carregado);

    var db = openDatabase("myDB", "1.0", "TiPS Database Example", 2 * 1024 * 1024);
    
    function carregado(){    
        
        document.getElementById('btn-salvar').addEventListener('click', salvar);
        document.getElementById('btn-deletar').addEventListener('click', deletar);
        
        db.transaction(function(tx) {
            //tx.executeSql("DROP TABLE myTable" );
            tx.executeSql("CREATE TABLE IF NOT EXISTS myTable ( id INTEGER PRIMARY KEY,nome TEXT,senha TEXT, email TEXT)" );
            //tx.executeSql('INSERT INTO myTable ( nome,senha,email) VALUES ("a", "b", "c")');
        });
        
        mostrar();
        
    }   

    function salvar(){
        var id = document.getElementById('field-id').value;
        var nome = document.getElementById('field-name').value;
        var pass = document.getElementById('field-pass').value;
        var mail = document.getElementById('field-mail').value;

        db.transaction(function(tx) {
            if(id){
                tx.executeSql('UPDATE myTable SET nome=?, senha=?, email=? WHERE id=?', [nome,pass,mail,id],null);
            }else{
                tx.executeSql('INSERT INTO myTable ( nome,senha,email) VALUES (?, ?, ?)', [nome,pass,mail]);
            }
        });

        mostrar();
        limpaCampo();
        inputSHOW(false);
    }

    function mostrar(){        
        var table = document.getElementById('tbody-register');

        db.transaction(function(tx) {
            tx.executeSql('SELECT * FROM myTable', [], function (tx, resultado) {
                var rows = resultado.rows;
                var tr = '';
                for(var i = 0; i < rows.length; i++){
                        tr += '<tr>';
                        tr += '<td onClick="atualizar(' + rows[i].id + ')">' + rows[i].nome + '</td>';
                        tr += '<td>' + rows[i].senha + '</td>';
                        tr += '<td>' + rows[i].email + '</td>';
                        tr += '</tr>';                   
                }
                    table.innerHTML = tr; 

            }, null);
        });
    }

    function atualizar(_id){   
        
        var id = document.getElementById('field-id');
        var nome = document.getElementById('field-name');
        var pass = document.getElementById('field-pass');
        var mail = document.getElementById('field-mail');
        
        id.value = _id;
        
        db.transaction(function(tx) {
            tx.executeSql('SELECT * FROM myTable WHERE id=?', [_id], function (tx, resultado) {
                var rows = resultado.rows[0];

                nome.value = rows.nome ;
                pass.value = rows.senha ;
                mail.value = rows.email ;
            });
        });
        inputSHOW(true);
    }

    function deletar(){
        
        var id = document.getElementById('field-id').value;
        
        db.transaction(function(tx) {
            tx.executeSql("DELETE FROM myTable WHERE id=?", [id]);
        });
        
        mostrar();
        limpaCampo();
        inputSHOW(false);
    } */

// fim bloco-3
//##############################################################

// Meu bloco

    window.addEventListener('load', carregando);


    db = openDatabase('.serv', '1.0', 'database', 40000000);
    
     
    db.transaction(function(tx){
        tx.executeSql('CREATE TABLE IF NOT EXISTS orcamentos ( id_cliente INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, nome_cliente TEXT NOT NULL, fone_cliente TEXT NOT NULL, end_cliente TEXT NOT NULL, data TEXT NOT NULL )');
    });
    
    function carregando(){
    
        document.getElementById('btn_salvar').addEventListener('click', salvar);
        document.getElementById('btn_excluir_tudo').addEventListener('click', excluiDados);
        document.getElementById('btn_consultar').addEventListener('click', consultar);
    }
    
    function salvar(){
        
        var cli_nome = document.getElementById('nome_cliente').value;
        var fone_cliente = document.getElementById('fone_cliente').value;
        var end_cliente = document.getElementById('endereco_cliente').value;
        var data = new Date().toDateString();
        
        db.transaction(function(tx){
            tx.executeSql('INSERT INTO orcamentos ( nome_cliente, fone_cliente, end_cliente, data ) VALUES ( ?, ?, ?, ? )', [cli_nome, fone_cliente, end_cliente, data] );
        });
    }
    
    function drop(){
    
        db.transaction(function(dr){
            dr.executeSql('DROP TABLE orcamentos');
        });
    }
    
    function consultar(){
    
        db.transaction(function(cs){
            cs.executeSql('SELECT * FROM orcamentos', [], function(cs, result){
                var rows = result.rows;
                var tr = '';
                for(var i=0; i<rows.length; i++){
                    tr += rows[i].id_cliente+'-';
                    tr += rows[i].nome_cliente+'-';
                    tr += rows[i].fone_cliente+'-';
                    tr += rows[i].end_cliente+'-';
                    tr += rows[i].data;
                    tr += '\n';
                    
                }
                alert(tr);
            }, null);
        });
    }
    
    function excluiDados(){
        db.transaction(function(dl){
            dl.executeSql('DELETE FROM orcamentos');
        });
    }
    
// fim Meu bloco





























