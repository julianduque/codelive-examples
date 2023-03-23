public with sharing class HelloWorldAction {

    @InvocableMethod(label='Say Hello' description='It says hello to the user')
    public static List<String> sayHello(List<String> inputs) {
        List<String> results = new List<String>();
        for (String input : inputs) {
            results.add(generateGreeting(input));
        }
        return results;
    }

    private static String generateGreeting(String input) {
        return 'Hello ' + input;
    }
}