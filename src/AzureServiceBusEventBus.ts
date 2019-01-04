import azure = require('azure-sb');
import { IEventBus } from 'meeteric-ts';
import { ServiceBusConfig } from './configs';

export class AzureServiceBusEventBus implements IEventBus {
    private readonly identifier: string;
    private readonly serviceBus: azure.ServiceBusService;
    private readonly topic: string;

    constructor(config: ServiceBusConfig) {
        this.serviceBus = azure.createServiceBusService(config.AsConnectionString());
        this.topic = config.Topic();
        this.identifier = `Azure Service Bus ${config.Identifier()}`;
    }

    public Identifier(): string {
        return this.identifier;
    }

    public async SendEvent(contents: any): Promise<void> {
        const message = {
            body: JSON.stringify(contents)
        };

        await new Promise<void>((resolve, reject) => {
            this.serviceBus.sendTopicMessage(this.topic, message, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }
}