import {
  INodeType,
  INodeTypeDescription,
  NodeConnectionType,
  IExecuteFunctions,
  INodeExecutionData,
  IDataObject,
  IWebhookFunctions,
  IWebhookResponseData,
} from "n8n-workflow";
import { createContact } from "./actions/create-contact";
import { handleNewDealTrigger } from "./actions/deal-trigger";

export class TaskflowCRM implements INodeType {
  description: INodeTypeDescription = {
    displayName: "TaskflowCRM",
    name: "taskflowCRM",
    group: ["transform"],
    version: 1,
    description: "Simple TaskflowCRM Node",
    defaults: {
      name: "TaskflowCRM",
      color: "#772244",
    },
    inputs: [{ type: "main" as NodeConnectionType }],
    outputs: [{ type: "main" as NodeConnectionType }],
    // Add trigger property to indicate this node can be used as a trigger
    triggerPanel: {
      header: 'Trigger on:',
    },
    properties: [
      {
        displayName: "Resource",
        name: "resource",
        type: "options",
        noDataExpression: true,
        options: [
          {
            name: "Action",
            value: "action",
          },
          {
            name: "Trigger",
            value: "trigger",
          },
        ],
        default: "action",
      },
      // Action properties
      {
        displayName: "Action",
        name: "action",
        type: "options",
        options: [
          {
            name: "Get Contacts",
            value: "getContacts",
            description: "Retrieve a list of contacts",
          },
          {
            name: "Create Contact",
            value: "createContact",
            description: "Create a new contact in TaskflowCRM",
          },
        ],
        default: "getContacts",
        required: true,
        displayOptions: {
          show: {
            resource: ["action"],
          },
        },
      },
      // Fields for Create Contact action
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            resource: ["action"],
            action: ["createContact"],
          },
        },
        description: "The name of the contact",
      },
      {
        displayName: "Email",
        name: "email",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            resource: ["action"],
            action: ["createContact"],
          },
        },
        description: "The email address of the contact",
      },
      {
        displayName: "Phone",
        name: "phone",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            resource: ["action"],
            action: ["createContact"],
          },
        },
        description: "The phone number of the contact",
      },
      // Trigger properties
      {
        displayName: "Trigger",
        name: "trigger",
        type: "options",
        options: [
          {
            name: "New Deal Created",
            value: "newDealCreated",
            description: "Trigger when a new deal is created",
          },
        ],
        default: "newDealCreated",
        required: true,
        displayOptions: {
          show: {
            resource: ["trigger"],
          },
        },
      },
      // Webhook properties for the trigger
      {
        displayName: "Webhook URL",
        name: "webhookUrl",
        type: "string",
        default: "",
        placeholder: "http://your-webhook-url.com",
        description: "The URL to receive webhook notifications when a new deal is created",
        displayOptions: {
          show: {
            resource: ["trigger"],
            trigger: ["newDealCreated"],
          },
        },
      },
    ],
    webhooks: [
      {
        name: "default",
        httpMethod: "POST",
        responseMode: "onReceived",
        path: "webhook",
        isFullPath: false,
        restartWebhook: true,
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    const resource = this.getNodeParameter("resource", 0) as string;

    if (resource === "action") {
      const action = this.getNodeParameter("action", 0) as string;

      for (let i = 0; i < items.length; i++) {
        try {
          switch (action) {
            case "createContact":
              await createContact(this, i, returnData);
              break;
            case "getContacts":
              returnData.push({
                json: { message: "Get Contacts not implemented yet" },
              });
              break;
            default:
              throw new Error(`Unknown action: ${action}`);
          }
        } catch (error) {
          if (this.continueOnFail()) {
            returnData.push({
              json: { error: (error as Error).message },
            });
            continue;
          }
          throw error;
        }
      }
    }

    return [returnData];
  }

  // Add webhook methods for trigger functionality
  async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
    const resource = this.getNodeParameter("resource") as string;
    const trigger = this.getNodeParameter("trigger") as string;

    if (resource === "trigger" && trigger === "newDealCreated") {
      return handleNewDealTrigger.call(this);
    }

    return {
      workflowData: [
        this.helpers.returnJsonArray([{ message: "Webhook received but not processed" }]),
      ],
    };
  }
}
