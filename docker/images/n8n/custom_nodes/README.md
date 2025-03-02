# TaskflowCRM Node for n8n

This custom node allows you to integrate with TaskflowCRM from your n8n workflows.

## Features

### Actions

- **Get Contacts**: Retrieve a list of contacts from TaskflowCRM
- **Create Contact**: Create a new contact in TaskflowCRM

### Triggers

- **New Deal Created**: Trigger a workflow when a new deal is created in TaskflowCRM

## Setup

1. Install the node in your n8n instance
2. Configure your TaskflowCRM API credentials
3. Add the TaskflowCRM node to your workflow

## Using the New Deal Trigger

The New Deal Trigger allows you to start a workflow automatically when a new deal is created in TaskflowCRM.

### Configuration

1. Add the TaskflowCRM node to your workflow
2. Select "Trigger" as the Resource
3. Select "New Deal Created" as the Trigger
4. Configure the webhook URL (optional)

### Webhook Setup

To use the trigger, you need to configure TaskflowCRM to send webhook notifications to your n8n instance when a new deal is created. The webhook should send a POST request with the following JSON structure:

```json
{
  "event": "deal.created",
  "data": {
    "id": "deal-123",
    "name": "New Business Deal",
    "value": 10000,
    "stage": "Qualified",
    "owner": "user-456",
    "created_at": "2023-07-15T10:30:00Z"
  }
}
```

### Output

When a new deal is created, the trigger will output the following data:

- `event`: "New Deal Created"
- `dealId`: The ID of the created deal
- `dealName`: The name of the deal
- `dealValue`: The value of the deal
- `dealStage`: The stage of the deal
- `dealOwner`: The owner of the deal
- `createdAt`: The creation timestamp
- `timestamp`: The time when the webhook was received
- `rawData`: The complete deal data received from TaskflowCRM

## Development

To modify or extend this node:

1. Edit the files in the `docker/images/n8n/custom_nodes/nodes` directory
2. Rebuild your n8n instance to apply the changes
