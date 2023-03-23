public with sharing class HttpPostAction {

    @InvocableMethod(label='Do HTTP POST Callout' callout=true)
    public static List<String> doPost (List<String> inputs) {
        List<String> results = new List<String>();
        for(String input : inputs) {
            results.add(invoke(input));
        }
        return results;
    }

    private static String invoke(String input) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:MockBin/bin/25b68e4f-540c-4239-956f-85b51d708a16');
        req.setMethod('POST');
        req.setBody(input);
        req.setHeader('content-type', 'text/plain');
        Http h = new Http();
        HttpResponse res = h.send(req);
        return res.getBody();
    }
}