public with sharing class CarsController {

    @AuraEnabled(cacheable=true)
    public static List<Car__c> getCars() {
        return [
            SELECT Id, Name, Description__c, Image_Url__c, Color__c
            FROM Car__c
            WITH USER_MODE
	    ORDER BY CreatedDate
            LIMIT 10
        ];
    }
}
