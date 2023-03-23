public with sharing class AccountUtilsAction {

    @InvocableMethod(label='Get Account Info' description='Get Contacts and Opportunities' iconName='slds:standard:account_info')
    public static List<ActionResult> getContactsAndOppty(List<ActionRequest> inputs) {
        List<ActionResult> results = new List<ActionResult>();
        for(ActionRequest request : inputs) {
            results.add(invoke(request));
        }
        return results;
    }

    private static ActionResult invoke(ActionRequest input) {
        List<Contact> contacts = [
            SELECT Id, Name
            FROM Contact
            WHERE AccountId = :input.accountId
            WITH SECURITY_ENFORCED
            LIMIT 10
        ];
        List<Opportunity> opportunities = [
            SELECT Id, Name, Amount
            FROM Opportunity
            WHERE AccountId = :input.accountId
            WITH SECURITY_ENFORCED
            LIMIT 10
        ];

        ActionResult result = new ActionResult();
        result.contacts = contacts;
        result.opportunities = opportunities;
        return result;
    }

    public class ActionRequest {
        @InvocableVariable(label='Account Id' required=true)
        public Id accountId;
    }

    public class ActionResult {
        @InvocableVariable(label='List of contacts')
        public List<Contact> contacts;
        @InvocableVariable(label='List of opportunities')
        public List<Opportunity> opportunities;
    }
}