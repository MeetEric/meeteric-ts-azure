export class ServiceBusConfig {
    private readonly namespace: string;
    private readonly keyName: string;
    private readonly key: string;
    private readonly topic: string;
    private readonly identifier: string;

    constructor(namespace: string, topic: string, keyName: string, key: string) {
        this.namespace = namespace;
        this.topic = topic;
        this.key = key;
        this.keyName = keyName;
        this.identifier = `'${this.namespace}' - ${this.topic}'`;
    }

    public static Parse(config: any) : ServiceBusConfig {
        return new ServiceBusConfig(
            config.namespace,
            config.topic,
            config.keyName,
            config.key
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

    public IsValid(): boolean {
        return this.key !== undefined;
    }
}