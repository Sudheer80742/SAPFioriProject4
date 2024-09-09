sap.ui.define([
    "sap/ui/core/mvc/Controller","sap/m/MessageToast","sap/ui/model/json/JSONModel","sap/ui/core/Fragment","sap/m/MessageBox","../model/formatter"
], function (Controller,MessageToast,JSONModel,Fragment,MessageBox,formatter) {
    "use strict";

    return Controller.extend("project8.controller.View1", {
           formatter:formatter,
        onInit: function () {
            var oData = new JSONModel("/model/Em.json");
            this.getView().setModel(oData);
            var oCont=this.byId("cont1")
            Fragment.load({
                id:this.getView().getId(),
                name:"project8.fragments.add",
                controller:this
            }).then((oFrag)=>{
                oCont.addItem(oFrag)
            })
            var oCont1=this.byId("cont2")
            Fragment.load({
                id:this.getView().getId(),
                name:"project8.fragments.modi",
                controller:this
            }).then(function(oFrag){
                oCont1.addItem(oFrag);
            })
        },
        onAdd(){
            var sId=this.byId("id1");
            var sNa=this.byId("name1");
            var sAdd=this.byId("add1");
            var oId=sId.getValue();
            var oNa=sNa.getValue();
            var oAdd=sAdd.getValue();
            var oNewData={
                id:oId,
                name:oNa,
                address:oAdd
            }
            var oModel=this.getView().getModel();
            var oData=oModel.getData();
            oData.Details.push(oNewData);
            oModel.setData(oData);
            sId.setValue("");
            sNa.setValue("");
            sAdd.setValue("");
            MessageToast.show("Details Added Successfully");
        },
        onDelete(oEvent){
            var oSource=oEvent.getSource();
            var OBind=oSource.getBindingContext();
            var iObj=OBind.getObject();

            var oModel=this.getView().getModel();
            var oData=oModel.getData();

            var iIndex=oData.Details.indexOf(iObj)
                oData.Details.splice(iIndex,1);
                oModel.setData(oData);
                MessageToast.show("Deleted Successfully");
        },
        onModify(oEvent){
            var oModel=this.getView().getModel();
            var oData=oModel.getData();
            var oSou=oEvent.getSource();
            var oBind=oSou.getBindingContext();
            var oObj=oBind.getObject();
            this.iIndex=oData.Details.indexOf(oObj)
            var sId=this.byId("id2");
            var sNa=this.byId("name2");
            var sAdd=this.byId("add2");
            sId.setValue(oData.Details[this.iIndex].id);
            sNa.setValue(oData.Details[this.iIndex].name);
            sAdd.setValue(oData.Details[this.iIndex].address)
        },onModi(){
            var oModel=this.getView().getModel();
            var oData=oModel.getData();
            var sId=this.byId("id2");
            var sNa=this.byId("name2");
            var sAdd=this.byId("add2");
                oData.Details[this.iIndex].id=sId.getValue(),
                oData.Details[this.iIndex].name=sNa.getValue(),
                oData.Details[this.iIndex].address=sAdd.getValue()
            
            oModel.setData(oData);
            MessageBox.show("Updated successfully");
            sId.setValue("")
            sNa.setValue("")
            sAdd.setValue("")
        }
    });
});
