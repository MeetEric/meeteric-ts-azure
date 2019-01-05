
class AzureSeriveBusBrokeredProperties {
    public readonly DeliveryCount: number;
    public readonly EnqueuedSequenceNumber: number;
    public readonly EnqueuedTimeUtc: string;
    public readonly LockToken: string;
    public readonly LockedUntilUtc: string;
    public readonly MessageId: string;
    public readonly PartitionKey: string;
    public readonly SequenceNumber: number;
    public readonly State: string;
    public readonly TimeToLive: number;
}

class AzureServiceBusBrokeredMessage {
    public readonly body: any;
    public readonly brokeredProperties: AzureSeriveBusBrokeredProperties;
}
