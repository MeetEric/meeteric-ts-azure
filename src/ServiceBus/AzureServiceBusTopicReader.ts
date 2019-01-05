import azure = require('azure-sb');
import { AzureServiceBusTopic } from './AzureServiceBusTopic';
import { ServiceBusConfig } from './../configs';

export class AzureServiceBusTopicReader extends AzureServiceBusTopic {
    private readonly subscription: string;

    constructor(config: ServiceBusConfig) {
        super(config);
        this.subscription = config.Subscription();
    }

    public async ReadMessageAndDelete(): Promise<any> {
        const doNotUsePeeklock = false;
        return await this.ReadMessageWithOptions(doNotUsePeeklock);
    }

    public async ReadMessageWithLock(): Promise<any> {
        const usePeeklock = true;
        return await this.ReadMessageWithOptions(usePeeklock);
    }

    public async ReleaseAndDeleteMessage(lockedMessage: any): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.serviceBus.deleteMessage(lockedMessage, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    private async ReadMessageWithOptions(usePeekLock: boolean): Promise<AzureServiceBusBrokeredMessage> {
        return new Promise<any>((resolve, reject) => {
            this.serviceBus.receiveSubscriptionMessage(this.topic, this.subscription, { isPeekLock: usePeekLock }, (err, message : AzureServiceBusBrokeredMessage) => {
                if (err) {
                    if (err === 'No messages to receive') {
                        resolve(null);
                    } else {
                        reject(err);
                    }
                } else {
                    resolve(message);
                }
            });
        });
    }
}