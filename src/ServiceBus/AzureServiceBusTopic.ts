import azure = require('azure-sb');
import { ServiceBusConfig } from './../configs';

export class AzureServiceBusTopic {
    private readonly identifier: string;
    protected readonly topic: string;
    protected readonly serviceBus: azure.ServiceBusService;

    constructor(config: ServiceBusConfig) {
        this.serviceBus = azure.createServiceBusService(config.AsConnectionString());
        this.topic = config.Topic();
        this.identifier = `Azure Service Bus ${config.Identifier()}`;
    }

    public Identifier(): string {
        return this.identifier;
    }
}
