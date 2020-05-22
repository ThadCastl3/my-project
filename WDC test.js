var myConnector = tableau.makeConnector();
​
myConnector.init = function(initCallback) {
    initCallback();
    tableau.submit();
};
    
(function() {
​
    // Create the connector object
    tableau.registerConnector(myConnector);
​
    var settings = {
        "url": "https://gentle-fortress-77652.herokuapp.com/https://api.insightly.com/v3.1/CustomFields/Organization",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": "Basic YjNjNzExYjMtOTc3My00NDk3LWIzMzgtOTBlNDk4NTg3MjQxOg==",
        },
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
    
​
​
    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        // Schema for magnitude and place data
        var ins_cols = 
        [{ id : "FIELD_NAME", alias : "Field Name", dataType : tableau.dataTypeEnum.string },
        { id : "FIELD_ORDER", alias : "Field Order", dataType : tableau.dataTypeEnum.string },
        { id : "FIELD_FOR", alias : "Field For", dataType : tableau.dataTypeEnum.string },
        { id : "FIELD_LABEL", alias : "Field Label", dataType : tableau.dataTypeEnum.string },
        { id : "FIELD_TYPE", alias : "Field Type", dataType : tableau.dataTypeEnum.string },
        { id : "DEFAULT_VALUE", alias : "Default Value", dataType : tableau.dataTypeEnum.string },
        { id : "EDITABLE", alias : "Editable", dataType : tableau.dataTypeEnum.string },
        { id : "VISIBLE", alias : "VISIBLE", dataType : tableau.dataTypeEnum.string },
        { id : "CUSTOM_FIELD_OPTIONS", alias : "Custom Field Options", dataType : tableau.dataTypeEnum.string },
        { id : "DEPENDENCY", alias : "Dependency", dataType : tableau.dataTypeEnum.string },
        { id : "JOIN_OBJECT", alias : "Join Object", dataType : tableau.dataTypeEnum.string }]
        
        var ins_table = {
            id: "ins_table",
            alias: "InsightlyAPI Table",
            columns: ins_cols
​
        };
​
        schemaCallback([ins_table]);
    };
​
    // Download the data                
    tableData = [];
    myConnector.getData = function(table, doneCallback) {
        var i = 0;
            if (table.tableInfo.id == "ins_table") {
                for (i = 0, len = feat.length; i < len; i++) {
                    tableData.push({
                        "FIELD_NAME": feat[i].FIELD_NAME,
                        "FIELD_ORDER": feat[i].FIELD_ORDER,
                        "FIELD_FOR": feat[i].FIELD_FOR,
                        "FIELD_LABEL": feat[i].FIELD_LABEL,
                        "FIELD_TYPE": feat[i].FIELD_TYPE,
                        "FIELD_HELP_TEXT": feat[i].FIELD_HELP_TEXT,
                        "DEFAULT_VALUE": feat[i].DEFAULT_VALUE,
                        "EDITABLE": feat[i].EDITABLE,
                        "VISIBLE": feat[i].VISIBLE,
                        "CUSTOM_FIELD_OPTIONS": feat[i].CUSTOM_FIELD_OPTIONS,
                        "DEPENDENCY": feat[i].DEPENDENCY,
                        "JOIN_OBJECT": feat[i].JOIN_OBJECT,
​
                    });
                }
            
​
                    table.appendRows(tableData);
                    doneCallback();
        };
    };
​
    
tableau.registerConnector(myConnector);
    // Create event listeners for when the user submits the form
   
    $(document).ready(function() {
         $("#getButton").click(function() {
            tableau.connectionName = "Insightly API"; // This will be the data source name in Tableau
            tableau.authType = tableau.authTypeEnum.basic;
			tableau.submit();
                
         
    });
})();
tableau.registerConnector(myConnector);
​
})