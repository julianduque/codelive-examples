public with sharing class ReadCustomerId {

    @InvocableMethod(label='Read Customer Id from Payload' description='Returns Customer Id from Data Object')
    public static List<String> fromPayload(List<String> currentPayloads) {
        List<String> customerIds = new List<String>();

        for (String payload : currentPayloads) {
            // Parse JSON payload
            Payload p = (Payload)JSON.deserialize(payload, Payload.class);

            // Extract Customer Id
            String customerId = p.customerId;

            // Return it back to the Flow
            customerIds.add(customerId);
        }
        return customerIds;
    }

    public class Payload {
        String customerId;
    }
}