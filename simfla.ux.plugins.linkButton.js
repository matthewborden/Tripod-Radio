Ext.ns('simfla.ux.plugins');

simfla.ux.plugins.fireEvent = function (obj,evt){
                    var fireOnThis = obj;
                    if( document.createEvent ) {
                      var evObj = document.createEvent('MouseEvents');
                      evObj.initEvent( evt, true, false );
                      fireOnThis.dispatchEvent(evObj);
                    } else if( document.createEventObject ) {
                      fireOnThis.fireEvent('on'+evt);
                        }
                    }

simfla.ux.plugins.linkButton = Ext.extend(Ext.util.Observable, {

                    init: function(cmp){
                                        this.cmp = cmp;
                                        
                                        if(cmp.url && cmp.linkId){
                                                            cmp.html = '<a id="' +  cmp.linkId + '" style="position:absolute; width: 0px; height: 0px; opacity: 0;" href="' + cmp.url + '">&nbsp;</a>';
                                                            cmp.handler = function(){simfla.ux.plugins.fireEvent(document.getElementById(cmp.linkId),'click');}
                                        }
    }
});
    

Ext.preg('editableList', simfla.ux.plugins.linkButton);