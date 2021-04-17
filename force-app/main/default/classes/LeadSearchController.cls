public with sharing class LeadSearchController {
    
    @AuraEnabled(cacheable=true)
    public static List<Lead> searchLeads( string searchTerm ){
        List<Lead> leads = new List<Lead>();
        if(string.isNotBlank(searchTerm)){
            List<List<SObject>> searchResults = [
                FIND :searchTerm
                RETURNING Lead(
                    Id, Name, Title, Company,
                    Street, City,
                    State, Postalcode,
                    ORDER BY Name
                    LIMIT 10
                )
            ];
            leads = searchResults[0];
            
        }
        return leads;
    }
}
