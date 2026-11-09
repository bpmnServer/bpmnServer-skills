Feature: Remote employee leave workflow

  Scenario: Manager approves a synthetic leave request
    Given a deployment-specific API base URL and authorized API keys
    And the model employee-leave-remote is imported through the documented admin endpoint
    When I start the process with employeeId EMP-TEST-001, startDate 2026-12-01, endDate 2026-12-05, and reason synthetic test
    Then the response contains an instance identifier
    And a pending user task is discoverable without exposing the API key
    When I complete the manager approval task with decision approved
    Then the instance reaches the approved end event

  Scenario: Manager rejects a synthetic leave request
    Given the same model and synthetic identity
    When I complete the manager approval task with decision rejected
    Then the instance reaches the rejected end event

  Scenario: Missing hosted contract is reported
    Given the workbench is reachable but no versioned OpenAPI document is available
    Then the agent stops before import or execution
    And the gap report names the missing contract and credentials
