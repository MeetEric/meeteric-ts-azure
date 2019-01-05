export class ServiceBusConfig {
    private readonly namespace: string;
    private readonly keyName: string;
    private readonly key: string;
    private readonly topic: string;
    private readonly identifier: string;
    private readonly subscription: string;

    constructor(namespace: string, topic: string, keyName: string, key: string, subscription: string = null) {
        this.namespace = namespace;
        this.topic = topic;
        this.key = key;
        this.keyName = keyName;

        let localId = `'${this.namespace}' - ${this.topic}'`;

        if (subscription) {
            this.subscription = subscription;
            localId = `${localId} (${this.subscription})`;
        }

        this.identifier = localId;
    }

    public static Parse(config: any): ServiceBusConfig {
        return new ServiceBusConfig(
            config.namespace,
            config.topic,
            config.keyName,
            config.key,
            config.subscription
        );
    }

    public AsConnectionString(): string {
        return `Endpoint=sb://${this.namespace}.servicebus.windows.net/;SharedAccessKeyName=${this.keyName};SharedAccessKey=${this.key};`;
    }

    public Identifier(): string {
        return this.identifier;
    }

    public Topic(): string {
        return this.topic;
    }

    public Subscription() : string {
        return this.subscription;
    }

    public IsValid(): boolean {
        return this.key !== undefined;
    }
}