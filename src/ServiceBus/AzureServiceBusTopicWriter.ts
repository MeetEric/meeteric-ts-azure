import azure = require('azure-sb');
import { IEventBusWriter } from 'meeteric-ts';
import { ServiceBusConfig } from './../configs';
import { AzureServiceBusTopic } from './AzureServiceBusTopic';

export class AzureServiceBusTopicWriter extends AzureServiceBusTopic implements IEventBusWriter {
    constructor(config: ServiceBusConfig) {
        super(config);
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