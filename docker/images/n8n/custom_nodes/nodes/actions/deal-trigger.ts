import {
  IDataObject,
  IWebhookFunctions,
  IWebhookResponseData,
} from "n8n-workflow";

/**
 * Process webhook data for new deal creation
 */
export async function handleNewDealTrigger(
  this: IWebhookFunctions
): Promise<IWebhookResponseData> {
  const req = this.getRequestObject();
  const bodyData = req.body as IDealWebhookData;

  // Validate that this is a deal creation event
  if (bodyData.event === "deal.created" && bodyData.data) {
    return {
      workflowData: [
        this.helpers.returnJsonArray([
          {
            event: "New Deal Created",
            dealId: bodyData.data.id,
            dealName: bodyData.data.name,
            dealValue: bodyData.data.value,
            dealStage: bodyData.data.stage,
            dealOwner: bodyData.data.owner,
            createdAt: bodyData.data.created_at || new Date().toISOString(),
            timestamp: new Date().toISOString(),
            rawData: bodyData.data,
          },
        ]),
      ],
    };
  }

  // Return empty response if not a deal creation event
  return {
    workflowData: [
      this.helpers.returnJsonArray([
        {
          success: false,
          message: "Not a deal creation event or invalid data format",
          receivedEvent: bodyData.event || "unknown",
        }
      ]),
    ],
  };
}

/**
 * Interface for the webhook data received from TaskflowCRM
 */
export interface IDealWebhookData {
  event: string;
  data?: {
    id: string;
    name: string;
    value?: number;
    stage?: string;
    owner?: string;
    created_at?: string;
    [key: string]: any;
  };
}
