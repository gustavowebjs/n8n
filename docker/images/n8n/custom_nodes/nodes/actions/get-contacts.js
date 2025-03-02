"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function getContacts(context, itemIndex, returnData) {
    const response = await context.helpers.httpRequest({
        method: "GET",
        url: "http://localhost:5217/contacts",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMwY2VmMmRhLWY4MWItNDBhMC1hNGVjLTg0YTkxZGJlMmYxZiIsInVzZXJuYW1lIjoiR3VzdGF2byIsImVtYWlsIjoiZ3VzdGF2b3ZpbmlmZUBnbWFpbC5jb20iLCJ0ZW5hbnRfaWQiOiI3NmZiZTk1Yi04YTg3LTRjM2MtOWZjOC1kMDJjOTk5ZWFmMWQiLCJwZXJtaXNzaW9ucyI6InVzZXJzOnJlYWR8dXNlcnM6d3JpdGV8dXNlcnM6ZGVsZXRlfHJvbGVzOnJlYWR8cm9sZXM6d3JpdGV8cm9sZXM6ZGVsZXRlfHRlYW1zOnJlYWR8dGVhbXM6d3JpdGV8dGVhbXM6ZGVsZXRlfHRhZ3M6cmVhZHx0YWdzOndyaXRlfHRhZ3M6ZGVsZXRlfGNoYW5uZWxzOnJlYWR8Y2hhbm5lbHM6d3JpdGV8Y2hhbm5lbHM6ZGVsZXRlfGZ1bm5lbHM6cmVhZHxmdW5uZWxzOndyaXRlfGZ1bm5lbHM6ZGVsZXRlfGxvc3MtcmVhc29uczpyZWFkfGxvc3MtcmVhc29uczp3cml0ZXxsb3NzLXJlYXNvbnM6ZGVsZXRlfHByb2R1Y3RzOnJlYWR8cHJvZHVjdHM6d3JpdGV8cHJvZHVjdHM6ZGVsZXRlfGNvbnRhY3RzOnJlYWR8Y29udGFjdHM6d3JpdGV8Y29udGFjdHM6ZGVsZXRlfGRlYWxzOnJlYWR8ZGVhbHM6d3JpdGV8ZGVhbHM6ZGVsZXRlfGNvbXBhbmllczpyZWFkfGNvbXBhbmllczp3cml0ZXxjb21wYW5pZXM6ZGVsZXRlfGN1c3RvbS1maWVsZHM6cmVhZHxjdXN0b20tZmllbGRzOndyaXRlfGN1c3RvbS1maWVsZHM6ZGVsZXRlfGZpZWxkLXJlZ2lzdHJpZXM6cmVhZHxmaWVsZC1yZWdpc3RyaWVzOndyaXRlfGZpZWxkLXJlZ2lzdHJpZXM6ZGVsZXRlfGFjdGl2aXRpZXM6cmVhZHxhY3Rpdml0aWVzOndyaXRlfGFjdGl2aXRpZXM6ZGVsZXRlIiwibmJmIjoxNzQwODY1MTIyLCJleHAiOjE3NDA5MDgzMjIsImlhdCI6MTc0MDg2NTEyMn0.9f6Ywnzql_CeF_9Q9wivHvefaDjU3SxLrc0GzvjDZKk",
        },
        json: true,
    });
    // Assuming the response has data, page, attrbs
    if (response && response.data && Array.isArray(response.data)) {
        response.data.forEach((contact) => {
            returnData.push({
                json: contact,
            });
        });
    }
    else {
        // If response is a single object or unexpected format, wrap it
        returnData.push({
            json: response,
        });
    }
}
