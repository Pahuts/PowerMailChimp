function VerifyListsAndSendBlast() { 
    var t, i; if (ShowProgress(), t = GetUrlParameter("blastId"), t = t.replace("{", "").replace("}", ""), 
    i = GetUrlParameter("campaignId"), i == "" || i == null) 
    { $("#p_message").text("Campaign hasn't created in MailChimp. Please create the campaign and try again.");
     return } $("#p_message").text("Starting process to send blast. Please wait..."); 
     var n = new XMLHttpRequest, r = Xrm.Utility.getGlobalContext().getClientUrl(),
      u = Xrm.Utility.getGlobalContext().getVersion().substring(0, 3); 
      n.open("GET", r + "/api/data/v" + 
      u + 
      "/po_powerchimpconfigurations?$select=po_name,po_value&$filter=po_name eq 'VarifyListsAndSendBlast' and  po_value eq 'blastId=" + t + "|campaignId=" + i + "'", !0); 
      n.setRequestHeader("OData-MaxVersion", "4.0"); n.setRequestHeader("OData-Version", "4.0"); n.setRequestHeader("Accept", "application/json"); n.setRequestHeader("Content-Type", "application/json; charset=utf-8"); 
      n.setRequestHeader("Prefer", 'odata.include-annotations="*"'); n.onreadystatechange = function () { var i, t, u, r; if (this.readyState === 4) if (n.onreadystatechange = null, this.status === 200) 
        for (i = JSON.parse(this.response), t = 0; t < i.value.length; t++)u = i.value[t].po_name, 
        r = i.value[t].po_value, $("#p_message").text(r), HideProgress(), $("#btnSendPMCBlast").hide(); 
        else { $("#p_message").text(this.statusText); HideProgress(); return } }; n.send() } 