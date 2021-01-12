OpenSendNowDialog(n) { 
    var t, i, u, r; 
    (n.data.entity.getIsDirty() != !0 
    || confirm("There are unsaved changes that have been made to this blast - are you sure you want to continue?") != !1) 
    && (t = { height: 400, width: 400 }, i = n.getAttribute("po_mailchimp_campaignid").getValue(), 
    i || Xrm.Utility.alertDialog("Create blast on MailChimp first, to send text email."), 
    u = n.data.entity.getId(), r = encodeURIComponent("campaignId=" + i + "&blastId=" + u), 
    n.context.client.getClient() == "Outlook" ? 
    Xrm.Navigation.openWebResource("popm_/CampaignSendNow.html", t, r) 
    : Xrm.Navigation.openWebResource("popm_/CampaignSendNow.html", t, r)) }