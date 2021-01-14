function templateContainsData(primaryControl) 
{
  var formContext = primaryControl.getFormContext(); // get formContext

  var emailTemplate = formContext.getAttribute("po_mailchimptemplate").getValue();

  if (emailTemplate != null && emailTemplate != "") 
  {
    OpenSendTestDialog(primaryControl);
    alert(emailTemplate);
  } else {
    alert("No email template found on save.")
  }
}


function EnableRuleSendTestBlast(n){
  var formContext = n.getFormContext(); // get formContext
  var t=formContext.getAttribute("po_mailchimp_campaignid").getValue();return t==null||t==""?!1:formContext.getAttribute("po_campaignsent").getValue()||formContext.getAttribute("po_campaignsending").getValue()||formContext.getAttribute("po_campaignscheduled").getValue()||formContext.getAttribute("po_campaignscheduling").getValue()?!1:!0
}

function EnableRuleSendOrScheduledBlast(n){var e=n.data.entity.getId(),f=CheckUserRole("PowerMailChimp Do not allow Send and Schedule Blast",n),i,t,r,u;if(f||(i=n.getAttribute("po_mailchimp_campaignid").getValue(),i==null||i=="")||n.getAttribute("po_campaignsent").getValue()||n.getAttribute("po_campaignsending").getValue()||n.getAttribute("po_campaignmessage").getValue()||(t=GetAllMailChimpListNames(),t==null||t==""))return!1;for(nameIndex=0;nameIndex<t.length;nameIndex++)if(nameIndex>0&&(r=t[nameIndex-1],u=t[nameIndex],r!=u))return!1;return!0}

function EnableRuleSyncStat(n){var t=n,i=t.getAttribute("po_mailchimp_campaignid").getValue(),u=t.getAttribute("popm_statssyncstatus").getValue(),r=t.getAttribute("po_campaignsent").getValue();return i==null||i==""||u=="1"||r==null||r==!1?!1:!0}

function StartStatsSyncProcess(n){var t=n,i=encodeURIComponent("blastId="+t.data.entity.getId());Xrm.Navigation.openWebResource("popm_/MailChimpBlastSynchronize.html",{height:200,width:600},i)}

function GetAllMailChimpListNames(){var o=parent.Xrm.Utility.getGlobalContext().getVersion().substring(0,3),s=parent.Xrm.Utility.getGlobalContext().getClientUrl()+"/api/data/v"+o,u=null,h=null,n=new window.XMLHttpRequest,t,r,i,f,e;if(n!=null){if(t=GetMailChimpListIds(),t!=null&&t.length>0&&(u=t[0].listid),u==null)return h=null,null;for(r=[],i=0;i<t.length;i++)f=s+"/lists("+t[i].listid+")?$select=po_mailchimplist",n.open("GET",f,!1),n.setRequestHeader("X-Requested-Width","XMLHttpRequest"),n.setRequestHeader("Accept","application/json, text/javascript, */*"),n.send(null),e=eval("("+n.responseText+")"),r.push(e.po_mailchimplist);return r}return null}

function GetMailChimpListIds(){var i=parent.Xrm.Utility.getGlobalContext().getVersion().substring(0,3),t=parent.Xrm.Utility.getGlobalContext().getClientUrl()+"/api/data/v"+i,r=parent.Xrm.Utility.getPageContext().input.entityId,n;return(t+="/po_po_mailchimpcampaign_listset?$select=listid&$filter=po_mailchimpcampaignid eq ("+r+")",n=new window.XMLHttpRequest,n!=null)?(n.open("GET",t,!1),n.setRequestHeader("X-Requested-Width","XMLHttpRequest"),n.setRequestHeader("Accept","application/json, text/javascript, */*"),n.send(null),eval("("+n.responseText+")").value):null}

function CheckUserRole(n,t){var u;try{var e=t.context,i=!1,r=t.context.getUserRoles(),f=FetchUserRoleIdWithName(n);for(u in r)if(jQuery.inArray(r[u],f)!=-1){i=!0;break}return i}catch(o){}}function FetchUserRoleIdWithName(n){var i,u,r;try{i=Xrm.Utility.getGlobalContext().getClientUrl();i.charAt(i.length-1)!="/"&&(i+="/");var f=[],t=new XMLHttpRequest,e=Xrm.Utility.getGlobalContext().getVersion().substring(0,3),o=Xrm.Utility.getGlobalContext().getClientUrl()+"/api/data/v"+e,s=o+"/roles?$select=roleid&$filter=name eq '"+n+"'";if(t.open("GET",s,!1),t.setRequestHeader("Accept","application/json"),t.setRequestHeader("Content-Type","application/json; charset=utf-8"),t.send(null),t.readyState==4&&t.status==200)for(u=JSON.parse(t.responseText).value,r=0;r<u.length;r++)f.push(u[r].roleid);return f}catch(h){return h.message}}function GetViewId(n){var f=parent.Xrm.Utility.getGlobalContext().getVersion().substring(0,3),u=parent.Xrm.Utility.getGlobalContext().getClientUrl()+"/api/data/v"+f,r,t,i;return u+="/savedqueries?$select=name,savedqueryid&$filter=name eq '"+n+"'",r="",t=new window.XMLHttpRequest,t!=null?(t.open("GET",u,!1),t.setRequestHeader("X-Requested-Width","XMLHttpRequest"),t.setRequestHeader("Accept","application/json, text/javascript, */*"),t.send(null),i=eval("("+t.responseText+")").value,i!=null&&i.length>0&&(r=i[0].savedqueryid),r):void 0}function EnableRuleUnScheduledBlast(n){var t=n.getAttribute("po_mailchimp_campaignid").getValue();return t==null||t==""?!1:n.getAttribute("po_campaignscheduled").getValue()}function CheckMailChimpListID(n){var i=n.getAttribute("po_mailchimplistid"),t;return i==null?!1:(t=i.getValue(),t!=null&&t!=""&&t.toString().length!=0?!0:!1)}function isSurveyInstalled(n){var o=n,i=!1,r;try{var u=parent.Xrm.Utility.getGlobalContext().getVersion().substring(0,3),f=parent.Xrm.Utility.getGlobalContext().getClientUrl()+"/api/data/v"+u,t=new XMLHttpRequest;t.open("GET",f+"/po_satisfactionsurveys?$select=po_name",!1);t.setRequestHeader("Accept","application/json");t.setRequestHeader("Content-Type","application/json; charset=utf-8");t.send(null);t.readyState==4&&(t.status==200?i=!0:t.status==404&&(i=!1))}catch(e){r="Function Name: isGetSurveyURLEnabled.\n\n";r+="Error description: "+e.description+"\n";Xrm.Navigation.openAlertDialog(r)}return i}

function OpenSendTestDialog(n){
  var formContext = n.getFormContext(); // get formContext
  var r,i,t,u;try{if(formContext.data.entity.getIsDirty()==!0&&confirm("There are unsaved changes that have been made to this blast - are you sure you want to continue?")==!1)return;r={height:400,width:400};i=formContext.getAttribute("po_mailchimp_campaignid").getValue();i||Xrm.Navigation.openAlertDialog("Create blast on MailChimp first, to send text email.");t=formContext.getAttribute("po_campaignscheduling");t&&t.getValue()==!0&&Xrm.Navigation.openAlertDialog("Blast is already in scheduling process. Can't send blast email for testing.");t=formContext.getAttribute("po_campaignscheduled");t&&t.getValue()==!0&&Xrm.Navigation.openAlertDialog("Blast is already scheduled. Can't send blast email for testing.");t=formContext.getAttribute("po_campaignsent");t&&t.getValue()==!0&&Xrm.Navigation.openAlertDialog("Blast is already sent. Can't send blast email for testing.");t=formContext.getAttribute("po_campaignsending");t&&t.getValue()==!0&&Xrm.Navigation.openAlertDialog("Blast is in sending process. Can't send blast email for testing.");u=encodeURIComponent("campaignId="+i);Xrm.Navigation.openWebResource("popm_/CampaignSendTest.html",r,u)}catch(f){Xrm.Navigation.openAlertDialog(f.message)}}

function OpenSendNowDialog(n){var t,i,u,r;(n.data.entity.getIsDirty()!=!0||confirm("There are unsaved changes that have been made to this blast - are you sure you want to continue?")!=!1)&&(t={height:400,width:400},i=n.getAttribute("po_mailchimp_campaignid").getValue(),i||Xrm.Navigation.openAlertDialog("Create blast on MailChimp first, to send text email."),u=n.data.entity.getId(),r=encodeURIComponent("campaignId="+i+"&blastId="+u),n.context.client.getClient()=="Outlook"?Xrm.Navigation.openWebResource("popm_/CampaignSendNow.html",t,r):Xrm.Navigation.openWebResource("popm_/CampaignSendNow.html",t,r))}

function OpenUnScheduledBlastDialog(n){var r={height:400,width:400},f=n.getAttribute("po_campaignscheduled").getValue(),t,u;if(!f){Xrm.Navigation.openAlertDialog("Only scheduled blasts can be un-scheduled. This blast is not scheduled yet, so can't be un-scheduled.");return}t=n.getAttribute("po_mailchimp_campaignid").getValue();u=n.context.getUserId();t||Xrm.Navigation.openAlertDialog("Create blast on MailChimp first, to send text email.");var e=n.data.entity.getId(),i="blastId="+e+"&campaignId="+t+"&userId="+u,o=n.getAttribute("po_campaignscheduledate").getValue();i+=o?"&isSchedule=true":"&isSchedule=false";n.context.client.getClient()=="Outlook"?Xrm.Navigation.openWebResource("popm_/UnScheduleBlast.html",r,encodeURIComponent(i)):Xrm.Navigation.openWebResource("popm_/UnScheduleBlast.html",r,encodeURIComponent(i))}function OpenCampaignScheduleDialog(n){var t,i,u;if(n.data.entity.getIsDirty()!=!0||confirm("There are unsaved changes that have been made to this blast - are you sure you want to continue?")!=!1){t={height:400,width:400};i=n.getAttribute("po_mailchimp_campaignid").getValue();i||Xrm.Navigation.openAlertDialog("Create blast on MailChimp first, to send text email.");var e=n.context.getUserId(),o=n.data.entity.getId(),r="blastId="+o+"&campaignId="+i+"&userId="+e,f=n.getAttribute("po_campaignscheduledate");f&&(u=f.getValue(),r+=u?"&reSchedule=true&reDate="+u.getTime():"&reSchedule=false");n.context.client.getClient()=="Outlook"?Xrm.Navigation.openWebResource("popm_/CampaignSchedule.html",t,encodeURIComponent(r)):Xrm.Navigation.openWebResource("popm_/CampaignSchedule.html",t,encodeURIComponent(r))}}function OpenSyncBlastDialog(){Xrm.Navigation.openWebResource("popm_/BlastStatistics.html",{height:400,width:600})}function OpenSurveyURLDialog(n){var t=encodeURIComponent("blastId="+n.data.entity.getId());Xrm.Navigation.openWebResource("popm_/GenerateSurveyURL.html",{height:400,width:600},t)}function OpenCloneBlastDialog(n){var t=encodeURIComponent("blastId="+n.data.entity.getId());Xrm.Navigation.openWebResource("popm_/CloneBlast.html",null,t)}function OpenMailChimpLoginWindow(){Xrm.Navigation.openUrl("https://login.mailchimp.com",{height:575,width:1020})}function OpenMailChimpSyncDialog(n){var t=encodeURIComponent("markeingListId="+n.data.entity.getId());Xrm.Navigation.openWebResource("popm_/MarketingListSynchronize.html",{height:400,width:600},t)}function AssociateMailChimpMarketingList(n,t,r){var a=r.data.entity.getId(),c,u;try{if(r.data!=null&&r.data.getEntity().getEntityName()=="po_mailchimpcampaign"){if(c=r.getControl("Marketing_List"),r.getControl("po_campaignsent").getAttribute().getValue()||r.getControl("po_campaignsending").getAttribute().getValue()||r.getControl("po_campaignscheduled").getAttribute().getValue()||r.getControl("po_campaignscheduling").getAttribute().getValue()){Xrm.Navigation.openAlertDialog("New Marketing list can't be associate to a blast which is already sent or scheduled.");return}var f=4300,e=1,o="",s="po_po_mailchimpcampaign_list",h=GetViewId("MailChimp Marketing Lists");r.context.client.getClient()=="Outlook"?(u={},u.allowMultiSelect=!0,u.defaultViewId=h,u.defaultEntityType="list",u.entityTypes=["list"],Xrm.Utility.lookupObjects(u).then(function(n){var t=Xrm.Utility.getGlobalContext().getCurrentAppUrl();t.indexOf("appid")!==-1?n&&(n={items:n},getAssociateObjectsUCI(n,r),MakeBlastDirty(r)):ValidateSeletedLists(n)&&(n={items:n},parent.AssociateObjects&&typeof parent.crmFormSubmit!="undefined"&&typeof parent.crmFormSubmit.crmFormSubmitObjectType!="undefined"&&typeof parent.crmFormSubmit.crmFormSubmitId!="undefined"?parent.AssociateObjects(parent.crmFormSubmit.crmFormSubmitObjectType.value,parent.crmFormSubmit.crmFormSubmitId.value,f,n,e==2,o,s):AssociateObjects(crmFormSubmit.crmFormSubmitObjectType.value,crmFormSubmit.crmFormSubmitId.value,f,n,e==2,o,s),MakeBlastDirty(r))},function(){})):(u={},u.allowMultiSelect=!0,u.defaultViewId=h,u.defaultEntityType="list",u.entityTypes=["list"],Xrm.Utility.lookupObjects(u).then(function(n){var u=Xrm.Utility.getGlobalContext().getCurrentAppUrl(),h=!1,t,c;if(u.indexOf("appid")!==-1){if(h=!0,n)for(i=0;i<n.length;i++)t=n[i].id,t=t.replace("{","").replace("}",""),c=Xrm.WebApi.online.retrieveRecord("list",t,"?$select=listid,listname,po_mailchimplist").then(function(n){var u=n.listid,f=n.listname,t=n.po_mailchimplist,i=GetMailChimpListName();i==null&&(t=null);i!=t?Xrm.Navigation.openAlertDialog("Marketing list can't be added to blast. All marketing lists should be associated with same MailChimp list."):(n={items:n},getAssociateObjectsUCI(n,r),MakeBlastDirty(r))},function(n){Xrm.Navigation.openAlertDialog(n.message)})}else ValidateSeletedLists(n)&&(n={items:n},parent.AssociateObjects&&typeof parent.crmFormSubmit!="undefined"&&typeof parent.crmFormSubmit.crmFormSubmitObjectType!="undefined"&&typeof parent.crmFormSubmit.crmFormSubmitId!="undefined"?parent.AssociateObjects(parent.crmFormSubmit.crmFormSubmitObjectType.value,parent.crmFormSubmit.crmFormSubmitId.value,f,n,e==2,o,s):AssociateObjects(crmFormSubmit.crmFormSubmitObjectType.value,crmFormSubmit.crmFormSubmitId.value,f,n,e==2,o,s),MakeBlastDirty(r))},function(){}))}else Marketing.List.CommandActions.addExistingFromSubGrid(n,t)}catch(l){Xrm.Navigation.openAlertDialog(l)}}function ValidateSeletedLists(n){var t="",u=[],o=GetMailChimpListName(),c,s,h,i,r,f,e;if(o!=null){try{t=n.slice()}catch(l){t=n}for(i=0;i<t.length;i++)r=JSON.parse(t[i].keyValues),f=r.po_mailchimplist.value,o!=f&&(u[u.length]=r.listname.value,c=n.indexOf(t[0]),n.splice(0,1));if(u.length>0)return e="All marketing lists should be associated with same MailChimp list. '"+u+"' can't be added.",Xrm.Navigation.openAlertDialog(e),!1}else if(o==null){s=null;h=!1;try{t=n.slice()}catch(l){t=n}for(i=0;i<t.length;i++)if(r=JSON.parse(t[i].keyValues),f=r.po_mailchimplist.value,i==0)s=r.po_mailchimplist.value;else if(s!=f){h=!0;break}if(h)return e="Marketing list can't be added to blast. All marketing lists should be assocated with same MailChimp list.",Xrm.Navigation.openAlertDialog(e),!1}return!0}function GetMailChimpListName(){var i=null,u=null,f=parent.Xrm.Utility.getGlobalContext().getVersion().substring(0,3),r=parent.Xrm.Utility.getGlobalContext().getClientUrl()+"/api/data/v"+f,n=new window.XMLHttpRequest,t;return n!=null?(t=GetMailChimpListIds(),t!=null&&t.length>0&&(i=t[0].listid),i==null)?(u=null,null):(r+="/lists("+i+") ?$select=po_mailchimplist",n.open("GET",r,!1),n.setRequestHeader("X-Requested-Width","XMLHttpRequest"),n.setRequestHeader("Accept","application/json, text/javascript, */*"),n.send(null),t=eval("("+n.responseText+")"),t.po_mailchimplist):null}function DeleteMarketingList(n,t,i){var h=i.data.entity.getId(),r,o,e;if(i.data!=null&&i.data.entity.getEntityName()=="po_mailchimpcampaign"){if(i.getAttribute("po_campaignsent").getValue()||i.getAttribute("po_campaignsending").getValue()||i.getAttribute("po_campaignscheduled").getValue()||i.getAttribute("po_campaignscheduling").getValue()){Xrm.Navigation.openAlertDialog("Existing Marketing list can't be deleted from a blast which is already sent or scheduled.");return}var s=Xrm.Utility.getGlobalContext().getCurrentAppUrl(),u=[],f=t.getGrid().getSelectedRows().get();if(s.indexOf("appid")!==-1)for(r=0;r<f.length;r++)u[r]=f[r]._entityId.guid;else for(r=0;r<f.length;r++)u[r]=f[r].$r_1.Id;for(r=0;r<u.length;r++)o=u[r].replace("{","").replace("}",""),dissociateObjects(o,i);MakeBlastDirty(i);e=GetMailChimpListIds();e!=null&&e.length>0?SetFormNotificationError(null,i):SetFormNotificationError("Blast can't be sent. No Marketing List associated with blast.",i)}else Marketing.List.CommandActions.disassociateListFromSubGrid("list",t,null)}function MakeBlastDirty(n){if(n.data!=null&&n.getAttribute("po_campaignisdirty")!=null){var t=n.getAttribute("po_campaignisdirty").getValue();t!=null&&t!=""&&t.toString().length!=0?n.getAttribute("po_campaignisdirty").setValue(""):n.getAttribute("po_campaignisdirty").setValue("Add Marketing List Clicked")}}function SetVisibilityOfStatisticsTab(n){var t=n.getFormContext(),i,r;Xrm.getParentAttribute=function(n){return t.getAttribute(n)};i=t.data.entity.attributes.get("po_mailchimp_campaignid").getValue();r=t.data.entity.attributes.get("po_sentdate").getValue();r==null?t.ui.tabs.get("tabmailchimpCampaignStatistics").setVisible(!1):i?(t.ui.tabs.get("tabmailchimpCampaignStatistics").setVisible(!0),t.ui.tabs.get("tabmailchimpCampaignStatistics").setDisplayState("collapsed")):t.ui.tabs.get("tabmailchimpCampaignStatistics").setVisible(!1)}function SetFormNotificationError(n,t){t.ui.clearFormNotification&&(t.ui.clearFormNotification("1"),n&&t.ui.setFormNotification(n,"ERROR","1"))}function SetCampaignIframesDynamicURL(n){var r=n.getFormContext(),u=r.ui.controls.get("IFRAME_StatsChart"),t=Xrm.Utility.getGlobalContext().getClientUrl(),i;t.charAt(t.length-1)!="/"&&(t+="/");i=t+"WebResources/popm_/CampaignStatsChart.html";u.setSrc(i)}function onmailchimpTabChange(n){var t=n.getFormContext();Xrm.getParentAttribute=function(n){return t.getAttribute(n)};Xrm.setParentAttribute=function(n,i){t.getAttribute(n).setValue(i)}}function DashboardTabStateChange(n){var t,o,i,r,u,f,e,s;try{t=n.getFormContext();o=Xrm.Utility.getGlobalContext().getCurrentAppUrl();o.indexOf("appid")===-1&&(i=t.ui.controls.get("Campaignbyday"),(i!=null||i!="undefined"||i!="")&&i.refresh(),r=t.ui.controls.get("EmailStatsByCampaign"),(r!=null||r!="undefined"||r!="")&&r.refresh(),u=t.ui.controls.get("Top10urls"),(u!=null||u!="undefined"||u!="")&&u.refresh(),f=t.ui.controls.get("CampaignOpens"),(f!=null||f!="undefined"||f!="")&&f.refresh(),e=t.ui.controls.get("IFRAME_StatsChart"),s=e.getSrc(),e.setSrc(null),e.setSrc(s))}catch(h){return null}}function ShowChartInMailChimpActivity(n){var u;try{var t=n.getFormContext(),f=t.data.entity.getEntityName(),r="ClicksByURL";if(f!="po_mailchimpcampaign"&&(u=t.ui.controls.get(r)._control,u.get_innerControl()==null)){ShowChartInMailChimpActivity(n);return}var e=r,o=e+"_visualizationCompositeControl",i=$find(o);IsNull(i)||i.isChartEnabled()&&i.isGridEnabled()&&i.showVisualization();t.ui.tabs.get("MailChimp")!=null&&t.ui.tabs.get("MailChimp").setDisplayState("collapsed")}catch(s){}}function SetBlastNotification(n){var i=n.getFormContext(),t=i.getAttribute("po_campaignmessage").getValue();t&&(t=t.replace("Error occurred while creating campaign.",""));SetFormNotificationError(t,i)}function ShowAndSetValueGoogleAnalyticsTitleField(n){var i=n.getFormContext(),u=i.getAttribute("po_addgoogleanalyticstracking").getValue(),f,r,t;i.ui.controls.get("po_titleforcampaigningoogleanalytics").setVisible(u);f=i.getAttribute("po_titleforcampaigningoogleanalytics").getValue();u&&(r=new Date,r=r.format("dd/M/yy h:mm tt"),t=i.getAttribute("po_name").getValue(),t?(t=t+r,t.length>50&&(t=t.substring(0,49))):t=r,i.getAttribute("po_titleforcampaigningoogleanalytics").setValue(t),i.getAttribute("po_titleforcampaigningoogleanalytics").setSubmitMode("always"))}function HideShowJumpToMailChimp(n){var t=n,i=CheckUserRole("PowerMailChimp Hide Jump to MailChimp",t);return i?!1:!0}function getSelectedSubGridRowData(n){for(var u=n.getGrid(),i={},r=n.getGrid().getSelectedRows().get(),t=0;t<r.length;t++)i[t]=r[t].entityReference.id;return i}function getAssociateObjects(n,t){var u,f;for(i=0;i<n.items.length;i++){u=n.items[i].id;u=u.replace("{","").replace("}","");f=t.data.entity.getId();f=f.replace("{","").replace("}","");var e=Xrm.Utility.getGlobalContext().getClientUrl(),o=Xrm.Utility.getGlobalContext().getVersion().substring(0,3),s={"@odata.id":e+"/api/data/v"+o+"/po_mailchimpcampaigns("+f+")"},r=new XMLHttpRequest;r.open("POST",e+"/api/data/v"+o+"/lists("+u+")/po_po_mailchimpcampaign_list/$ref",!0);r.setRequestHeader("Accept","application/json");r.setRequestHeader("Content-Type","application/json; charset=utf-8");r.setRequestHeader("OData-MaxVersion","4.0");r.setRequestHeader("OData-Version","4.0");r.onreadystatechange=function(){this.readyState===4&&(r.onreadystatechange=null,this.status===204||this.status===1223?t.data.save():Xrm.Navigation.openAlertDialog(this.statusText))};r.send(JSON.stringify(s))}}function getAssociateObjectsUCI(n,t){var u=n.items.listid,r;u=u.replace("{","").replace("}","");r=t.data.entity.getId();r=r.replace("{","").replace("}","");var f=Xrm.Utility.getGlobalContext().getClientUrl(),e=Xrm.Utility.getGlobalContext().getVersion().substring(0,3),o={"@odata.id":f+"/api/data/v"+e+"/po_mailchimpcampaigns("+r+")"},i=new XMLHttpRequest;i.open("POST",f+"/api/data/v"+e+"/lists("+u+")/po_po_mailchimpcampaign_list/$ref",!0);i.setRequestHeader("Accept","application/json");i.setRequestHeader("Content-Type","application/json; charset=utf-8");i.setRequestHeader("OData-MaxVersion","4.0");i.setRequestHeader("OData-Version","4.0");i.onreadystatechange=function(){this.readyState===4&&(i.onreadystatechange=null,this.status===204||this.status===1223?t.data.save():Xrm.Navigation.openAlertDialog(this.statusText))};i.send(JSON.stringify(o))}function dissociateObjects(n,t){var r=t.data.entity.getId();r=r.replace("{","").replace("}","");var u=Xrm.Utility.getGlobalContext().getClientUrl(),f=Xrm.Utility.getGlobalContext().getVersion().substring(0,3),i=new XMLHttpRequest;i.open("DELETE",u+"/api/data/v"+f+"/po_mailchimpcampaigns("+r+")/po_po_mailchimpcampaign_list/$ref?$id="+u+"/api/data/v9.1/lists("+n+")",!0);i.setRequestHeader("Accept","application/json");i.setRequestHeader("Content-Type","application/json; charset=utf-8");i.setRequestHeader("OData-MaxVersion","4.0");i.setRequestHeader("OData-Version","4.0");i.onreadystatechange=function(){this.readyState===4&&(i.onreadystatechange=null,this.status===204||this.status===1223?t.data.save():Xrm.Navigation.openAlertDialog(this.statusText))};i.send()}