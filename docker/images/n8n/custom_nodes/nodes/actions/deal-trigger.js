"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleNewDealTrigger = handleNewDealTrigger;
/**
 * Process webhook data for new deal creation
 */
async function handleNewDealTrigger() {
    const req = this.getRequestObject();
    const bodyData = req.body;
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
