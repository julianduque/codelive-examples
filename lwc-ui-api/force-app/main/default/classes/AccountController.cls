public with sharing class AccountController {

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        try {
            return [SELECT
                Id,
                Name,
                AnnualRevenue
            FROM Account
            WITH SECURITY_ENFORCED
            LIMIT 10];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


    @AuraEnabled
    public static Account createAccount(String accountName, Decimal annualRevenue){
        try {
            Account account = new Account();
            account.Name = accountName;
            account.AnnualRevenue = annualRevenue;
            insert account;
            return account;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}